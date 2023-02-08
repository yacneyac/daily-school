from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional


from app import deps, crud
from app.schemas.group import GroupOut, GroupCreate
from app.schemas.student import Student
from app.schemas.student_marks import StudentMarkCreate


router = APIRouter()


@router.get('/', dependencies=[deps.current_user])
async def get_teachers(db: Session = deps.db_session):
    return {
        'teachers': crud.teacher.get_multi(db),
    }


@router.get('/{teacher_id}/groups/{group_id}', response_model=List[Student], dependencies=[deps.current_user])
@router.get('/{teacher_id}/groups', response_model=List[GroupOut], dependencies=[deps.current_user])
async def get_groups(teacher_id: int, group_id: Optional[int] = None, db: Session = Depends(deps.get_db)) -> dict:
    """ Get teacher's groups """
    if group_id is not None:
        return crud.group.get(db=db, g_id=group_id)

    return crud.group.get_by_teacher(db=db, t_id=teacher_id)


@router.get('/{teacher_id}/lessons/{lesson_id}', dependencies=[deps.current_user])
async def get_lessons(teacher_id: int, lesson_id: int, db: Session = Depends(deps.get_db)) -> dict:
    """ Get teacher's lesson """
    return crud.schedule.get_lesson(lesson_id, db)


# TODO: make API for /marks
@router.post('/{teacher_id}/students/{student_id}/marks',  status_code=201)
async def mark_student(teacher_id: int, student_id: int, obj_in: StudentMarkCreate,  db: Session = Depends(deps.get_db)):
    """ Add a mark for students"""
    return crud.student_mark.create(db, obj_in)


@router.post('/{teacher_id}/groups', status_code=201, response_model=GroupOut)
async def create_group(teacher_id: int, group_in: GroupCreate, db: Session = Depends(deps.get_db)) -> dict:
    """ Create a new group in the database """
    group = crud.group.create(db=db, obj_in=group_in)
    return group
