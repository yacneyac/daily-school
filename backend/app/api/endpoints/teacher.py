from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional


from app import deps, crud
from app.schemas.group import GroupOut, GroupCreate
from app.schemas.student import Student


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

    group = crud.group.get_by_teacher(db=db, t_id=teacher_id)
    # breakpoint()
    # print(teacher.date_of_birth)
    return group


@router.get('/{teacher_id}/lessons/{lesson_id}', dependencies=[deps.current_user])
async def get_lessons(teacher_id: int, lesson_id: int, db: Session = Depends(deps.get_db)) -> dict:
    """ Get teacher's lesson """
    # group = crud.group.get_multi()
    # breakpoint()
    # print(teacher.date_of_birth)
    # return group
    return {
    "name": "Mathematics",
        # "id": lesson_id,
        # "refreshPage": f"/teachers/{teacher_id}/lessons/{lesson_id}",
    "date": "2022-01-27",
    "students":[
        {
            "name": "fname + lname",
            "dbId": 10,
            "id": 1,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 2,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 3,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 4,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 5,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 6,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 7,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        },
        {
            "name": "fname2 + lname2",
            "dbId": 11,
            "id": 8,
            "1": 2,
            "2": "N",
            "3": 3,
            "5": 3,
            "6": 3,
            "7": 3,
            "8": 3,
            "9": 3,
            "10": 3,

        }
]
}

@router.post('/{teacher_id}/groups', status_code=201, response_model=GroupOut)
async def create_group(teacher_id: int, group_in: GroupCreate, db: Session = Depends(deps.get_db)) -> dict:
    """ Create a new group in the database """
    group = crud.group.create(db=db, obj_in=group_in)
    return group
