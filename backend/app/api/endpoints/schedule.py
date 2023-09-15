from fastapi import APIRouter, HTTPException, status
from typing import Optional
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import datetime as dt, timedelta
from collections import defaultdict


from app import schemas, models
from app.schemas.schedule import ScheduleCreate
from app import deps, crud


router = APIRouter()


@router.post('/weeks', status_code=201, dependencies=[deps.current_user])
async def make_education_weeks(obj_in: schemas.WeekNumberCreate, db: Session = deps.db_session):
    """ Generate the weeks numbers """
    return crud.week_number.create(db, obj_in=obj_in)


# @router.post('/lesson', status_code=201, response_model=Schedule, dependencies=[deps.current_user])
@router.post('/weeks/{week_number}/lessons', status_code=201, dependencies=[deps.current_user])
async def create_lesson(week_number: int, schedule_in: ScheduleCreate, db: Session = deps.db_session):
    """ Create a new lesson in schedule """
    try:
        schedule = crud.schedule.create(db=db, week_number=week_number, obj_in=schedule_in)
    except IntegrityError as err:

        print(f'IntegrityError: "{err}"')
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail='already exists')

    print('SCHEDULE: ', schedule)
    return schedule


@router.delete('/weeks/{week_number}/lessons/{lesson_id}', status_code=204, dependencies=[deps.current_user])
async def remove_lesson(week_number: int, lesson_id: int, db: Session = deps.db_session):
    crud.schedule.remove(db=db, id_=lesson_id)
    return ''


# @router.get('/', dependencies=[deps.current_user])
@router.get('/weeks', dependencies=[deps.current_user])
@router.get('/weeks/{week_number}', dependencies=[deps.current_user])
async def get_schedule(week_number: Optional[int] = None, db: Session = deps.db_session):

    # load today week
    schedule = []
    if week_number is None:
        week_number = db.query(
            func.max(models.WeekNumber.number)
        ).filter(
            models.WeekNumber.start_ts <= dt.now().timestamp()
        ).scalar()

    week = db.query(models.WeekNumber).\
        filter(models.WeekNumber.number == week_number).\
        first()

    week_days = [(dt.fromtimestamp(week.start_ts) + timedelta(days=day)) for day in range(0, 6)]
    week_schedule = crud.schedule.get_multi(db, week_number=week_number)

    for week_day in week_days:
        day_name = week_day.strftime("%A")
        schedule.append({
            'name': day_name,
            'date': str(week_day.date()),
            'lessons': [lesson for lesson in week_schedule if lesson['day'] == day_name]
        })

    for param in schedule:
        for index, lesson in enumerate(param['lessons'], start=1):
            lesson['id'] = index
            del lesson['day']

    return {'schedule': schedule, 'activeWeekNumber': week_number}


@router.get('/parameters', dependencies=[deps.current_user])
async def get_schedule_parameters(db: Session = deps.db_session):
    """ Get all parameters for creating schedule """
    return {
        'room': crud.room.get_multi(db),
        'subject': crud.subject.get_multi(db),
        'time': crud.lesson_time.get_multi(db),
        'group': crud.group.get_multi(db),
        'week': crud.week.get_multi(db)
    }