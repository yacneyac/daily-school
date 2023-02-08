from datetime import datetime as dt, timedelta
from sqlalchemy.orm import Session
from typing import List
from collections import defaultdict


from app import models
from app.crud.base import CRUDBase
from app.models.subject import Subject
from app.models.student_marks import StudentMarks
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate, Schedule as ScheduleOUT


class CRUDSchedule(CRUDBase[models.Schedule, ScheduleCreate, ScheduleUpdate]):

    def create(self, db: Session, week_number: int, obj_in: ScheduleCreate) -> List[models.Schedule]:
        objects = []

        week = db.query(
            models.WeekNumber
        ).filter(
            models.WeekNumber.number == week_number
        ).first()

        for day_id, enabled in obj_in.day_id.items():
            if not enabled:
                continue

            db_obj = models.Schedule(
                day_id=day_id,
                week_number=week_number,
                subject_id=obj_in.subject_id,
                room_id=obj_in.room_id,
                group_id=obj_in.group_id,
                time_id=obj_in.time_id,
                date=dt.fromtimestamp(week.start_ts) + timedelta(days=int(day_id)-1),
                created_ts=int(dt.timestamp(dt.now()))
            )

            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)
            objects.append(db_obj)

        return objects

    def get_multi(self, db: Session, week_number: int) -> List[dict]:
        schedule_db = db.query(
            self.model.id.label('db_id'),
            models.Week.name.label('day'),
            models.Subject.name.label('subject'),
            models.Room.name.label('room'),
            models.Group_.name.label('group'),
            models.Group_.id.label('group_id'),
            models.LessonTime.name.label('time')
        ). \
            join(models.Subject, self.model.subject_id == models.Subject.id). \
            join(models.Week, self.model.day_id == models.Week.id). \
            join(models.Room, self.model.room_id == models.Room.id).\
            join(models.Group_, self.model.group_id == models.Group_.id).\
            join(models.LessonTime, self.model.time_id == models.LessonTime.id). \
            filter(
            self.model.week_number == week_number
        ).order_by(models.LessonTime.name).all()

        return [schedule._asdict() for schedule in schedule_db]

    def get_lesson(self, lesson_id: int, db: Session) -> dict:
        lesson_db = db.query(
            self.model.id,
            self.model.date,
            self.model.group_id,
            models.Group_.name.label('group_name'),
            Subject.name,
            Subject.id.label('subject_id')
        ).join(
            Subject, self.model.subject_id == Subject.id
        ).join(
            models.Group_, self.model.group_id == models.Group_.id
        ).filter(
            self.model.id == lesson_id
        ).first()

        students_db = db.query(
            models.Student.id,
            models.Student.last_name,
            models.Student.first_name
        ).filter(
            models.Student.group_id == lesson_db.group_id
        ).order_by(
            models.Student.last_name,
            models.Student.first_name
        ).all()

        students_ids = [st[0] for st in students_db]

        marks_db = db.query(
            StudentMarks.id,
            StudentMarks.student_id,
            StudentMarks.mark,
            StudentMarks.day
        ).filter(
            StudentMarks.student_id.in_(students_ids),
            StudentMarks.subject_id == lesson_db.subject_id
        ).all()

        students = []
        marks = defaultdict(dict)

        for mark in marks_db:
            marks[mark.student_id].update({mark.day: mark.mark})

        for index, student in enumerate(students_db, 1):
            st = {
                'id': index,
                'db_id': student.id,
                'name': f'{student.last_name} {student.first_name}'
            }
            st.update(marks[student.id])

            students.append(st)

        return {
            'db_id': lesson_db.subject_id,
            'group': lesson_db.group_name,
            'name': lesson_db.name,
            'date': lesson_db.date,
            'students': students
        }


schedule = CRUDSchedule(models.Schedule)

