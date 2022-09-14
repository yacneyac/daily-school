from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.schemas.group import Group, GroupCreate
from app import deps, crud
# from app.core.config import settings
# from app.utils import send_new_account_email

router = APIRouter()


@router.post('/group/', status_code=201, response_model=Group)
def create_group(*, group_in: GroupCreate, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new group in the database.
    """
    group = crud.group.create(db=db, obj_in=group_in)
    # print(teacher.date_of_birth)
    return group
