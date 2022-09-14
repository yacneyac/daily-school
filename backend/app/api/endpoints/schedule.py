from fastapi import APIRouter, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError



from app.schemas.schedule import Schedule, ScheduleCreate
from app import deps, crud


router = APIRouter()


# @router.post('/lesson', status_code=201, response_model=Schedule, dependencies=[deps.current_user])
@router.post('/lesson', status_code=201, response_model=List[Schedule])
def create_lesson(schedule_in: ScheduleCreate, db: Session = deps.db_session):
    """ Create a new lesson in schedule """
    try:
        schedule = crud.schedule.create(db=db, obj_in=schedule_in)
    except IntegrityError as err:

        print(f'IntegrityError: "{err}"')
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='server error')

    print('SCHEDULE: ', schedule)
    return schedule


@router.get('/', dependencies=[deps.current_user])
def get_schedule(db: Session = deps.db_session):
    # TODO: get number week.
    return {
        'schedule': crud.schedule.get_multi(db),
        'info': 'info',
        'nextLesson': 'next lesson'
    }


@router.get('/parameters', dependencies=[deps.current_user])
def get_schedule_parameters(db: Session = deps.db_session):
    """ Get all parameters for creating schedule """
    return {
        'room': crud.room.get_multi(db),
        'subject': crud.subject.get_multi(db),
        'time': crud.lesson_time.get_multi(db),
        'group': crud.group.get_multi(db),
        'week': crud.week.get_multi(db)
    }