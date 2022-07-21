from datetime import datetime
from sqlalchemy.orm import Session


from app.crud.base import CRUDBase
from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate, TeacherUpdate


class CRUDTeacher(CRUDBase[Teacher, TeacherCreate, TeacherUpdate]):
    def create(self, db: Session, *, obj_in: TeacherCreate) -> Teacher:
        db_obj = Teacher(
            first_name=obj_in.first_name,
            middle_name=obj_in.middle_name,
            last_name=obj_in.last_name,
            hashed_password=obj_in.password,
            date_of_birth=datetime.fromtimestamp(obj_in.date_of_birth).date(),
            address=obj_in.address,
            email=obj_in.email,
            phone=obj_in.phone,
            created_ts=datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


teacher = CRUDTeacher(Teacher)
