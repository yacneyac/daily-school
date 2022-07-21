from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.schemas.teacher import Teacher, TeacherCreate
from app import deps, crud
# from app.core.config import settings
# from app.utils import send_new_account_email

router = APIRouter()


@router.post('/teacher/', status_code=201, response_model=Teacher)
def create_teacher(*, teacher_in: TeacherCreate, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new teacher in the database.
    """
    teacher = crud.teacher.create(db=db, obj_in=teacher_in)
    # print(teacher.date_of_birth)
    return teacher
