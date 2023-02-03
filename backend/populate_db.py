from datetime import datetime as dt, timedelta
from sqlalchemy.ext.declarative import declarative_base


from app.core.security import get_password_hash
from app.db.session import SessionLocal, engine
from app.deps import get_db
from app import models
from app.models.subject import Subject
from app.models.room import Room
from app.models.week import Week
from app.models.lesson_time import LessonTime
from app.models.group import Group_
from app.models.teacher import Teacher

from randomuser import RandomUser


db = SessionLocal()
for sub in ['Mathematics', 'English', 'Geography', 'Music', 'Physics', 'Biology', 'Chemistry', 'Literacy']:
    db_obj = Subject(
        name=sub,
        enabled=1,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

for room in [10, 12, 11]:
    db_obj = Room(
        name=room,
        available=1,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

for index, day in enumerate(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], start=1):
    db_obj = Week(
        name=day,
        day_id=index
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)


def _week_numbers(start_date, end_date):
    curr_date = dt.strptime(start_date, '%Y-%m-%d')
    w_number = 1
    while curr_date <= dt.strptime(end_date, '%Y-%m-%d'):
        yield w_number, curr_date.timestamp()
        curr_date = curr_date + timedelta(days=7)
        w_number += 1


# make education year by week
for week_number, start_ts in _week_numbers('2022-09-05', '2023-05-31'):
    week_num = models.WeekNumber(
        number=week_number,
        start_ts=int(start_ts)
    )

    db.add(week_num)
    db.commit()
    db.refresh(week_num)

for ltime in ['09:00', '10:00', '11:00']:
    db_obj = LessonTime(
        name=ltime
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)


db_obj = Teacher(
    first_name="Test FN",
    middle_name="Test MN",
    last_name="Test LN",
    hashed_password=get_password_hash("pass"),
    date_of_birth=123123131,
    address="test address",
    email="t@t.com",
    phone="09659544845",
    created_ts=int(dt.timestamp(dt.now()))

)
db.add(db_obj)
db.commit()
db.refresh(db_obj)

for gr in ['1-B', '2-B', '3-A']:
    db_obj = Group_(
        name=gr,
        owner_id=1

    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)


for g_id in [1, 2]:
    for user in RandomUser.generate_users(25, {'nat': 'ca'}):
        db_obj = models.Student(
            first_name=user.get_first_name(),
            middle_name=user.get_last_name(),
            last_name=user.get_last_name(),
            hashed_password=user.get_password(),
            date_of_birth=507330000, #int(dt.strptime(user.get_dob().split('T')[0], '%Y-%m-%d').timestamp()),
            # average_mark=4.5,
            address=user.get_street(),
            email=user.get_email(),
            phone=user.get_phone(),
            group_id=g_id,
            created_ts=int(dt.timestamp(dt.now()))

        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        # for sub_id in [1,2,3,4]:
        #     db_obj = models.StudentMarks(
        #         student_id=db_obj.id,
        #         subject_id=sub_id,
        #         mark='4',
        #         date='2022-05-05'
        #
        #     )
        #     db.add(db_obj)
        #     db.commit()
        #     db.refresh(db_obj)




db.close()


print('OK')
