from fastapi import APIRouter
from sqlalchemy.orm import Session

from app import deps, crud


router = APIRouter()


@router.get('/', dependencies=[deps.current_user])
def get_teachers(db: Session = deps.db_session):
    return {
        'teacher': crud.teacher.get_multi(db),
    }


# @router.post('/teacher/schedule', status_code=201, response_model=Schedule, dependencies=[deps.current_user])
# def create_schedule(schedule_in: ScheduleCreate, db: Session = deps.db_session):
#     """ Create a new schedule in the database. """
#     try:
#         schedule = crud.schedule.create(db=db, obj_in=schedule_in)
#     except IntegrityError as err:
#         print(err)
#         raise HTTPException(
#             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#             detail='already exists')
#
#     return schedule
#
#
# @router.get('/teacher/schedule/parameters')
# def get_schedule_parameters(db: Session = deps.db_session):
#     return {
#         'room': crud.room.get_multi(db),
#         'subject': crud.subject.get_multi(db),
#         'time': crud.lesson_time.get_multi(db),
#         'group': crud.group.get_multi(db),
#         'week': crud.week.get_multi(db)
#     }
