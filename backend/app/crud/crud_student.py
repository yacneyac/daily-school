from typing import Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate


class CRUDStudent(CRUDBase[Student, StudentCreate, StudentUpdate]):

    @staticmethod
    def get_by_email(db: Session, *, email: str) -> Optional[Student]:
        return db.query(Student).filter(Student.email == email).first()


student = CRUDStudent(Student)
