from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session


from app.crud.base import CRUDBase
from app.core.security import get_password_hash
from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate, TeacherUpdate


class CRUDTeacher(CRUDBase[Teacher, TeacherCreate, TeacherUpdate]):

    @staticmethod
    def get_by_email(db: Session, *, email: str) -> Optional[Teacher]:
        return db.query(Teacher).filter(Teacher.email == email).first()

    def create(self, db: Session, *, obj_in: TeacherCreate) -> Teacher:
        db_obj = Teacher(
            first_name=obj_in.first_name,
            middle_name=obj_in.middle_name,
            last_name=obj_in.last_name,
            hashed_password=get_password_hash(obj_in.password.get_secret_value()),
            # date_of_birth=datetime.fromtimestamp(obj_in.date_of_birth),
            date_of_birth=obj_in.date_of_birth,
            address=obj_in.address,
            email=obj_in.email,
            phone=obj_in.phone,
            created_ts=int(datetime.timestamp(datetime.now()))
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


teacher = CRUDTeacher(Teacher)
