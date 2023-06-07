from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List


from app.schemas.group import GroupOut, GroupCreate
from app import deps, crud
# from app.core.config import settings
# from app.utils import send_new_account_email

router = APIRouter()


@router.post('/', status_code=201, response_model=GroupOut)
async def create_group(*, group_in: GroupCreate, db: Session = Depends(deps.get_db)) -> dict:
    """ Create a new group in the database """
    group = crud.group.create(db=db, obj_in=group_in)
    # print(teacher.date_of_birth)
    return group


@router.get('/', response_model=List[GroupOut], dependencies=[deps.current_user])
async def get_groups(db: Session = Depends(deps.get_db)) -> dict:
    """ Get groups """
    group = crud.group.get_multi()
    # print(teacher.date_of_birth)
    return group