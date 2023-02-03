from datetime import datetime as dt, timedelta
from sqlalchemy.orm import Session
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from collections import namedtuple


from app import models
from app.crud.base import CRUDBase
# from app.models.schedule import Schedule
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate, Schedule as ScheduleOUT


schedule_row = namedtuple('schedule_row', ('db_id', 'day', 'subject', 'room', 'group', 'groupId', 'time'))


class CRUDSchedule(CRUDBase[models.Schedule, ScheduleCreate, ScheduleUpdate]):

    def create(self, db: Session, week_number: int, obj_in: ScheduleCreate) -> List[models.Schedule]:
        objects = []
        week = db.query(models.WeekNumber).filter(models.WeekNumber.number == week_number).first()

        # import ipdb; ipdb.set_trace()
        # breakpoint()
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
        # day_name = dt.fromtimestamp(day.created_ts).strftime("%A")

        # join(models.Week, self.model.day_id == models.Week.id).\
        schedule = db.query(self.model). \
            join(models.Subject, self.model.subject_id == models.Subject.id). \
            join(models.Week, self.model.day_id == models.Week.id). \
            join(models.Room, self.model.room_id == models.Room.id).\
            join(models.Group_, self.model.group_id == models.Group_.id).\
            join(models.LessonTime, self.model.time_id == models.LessonTime.id). \
            filter(self.model.week_number == week_number).\
            order_by(models.LessonTime.name).\
            with_entities(
                self.model.id,
                models.Week.name,
                models.Subject.name,
                models.Room.name,
                models.Group_.name,
                models.Group_.id,
                models.LessonTime.name,
            ).all()

        return [schedule_row(*sch)._asdict() for sch in schedule]

schedule = CRUDSchedule(models.Schedule)

