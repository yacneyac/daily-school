from sqlalchemy.orm import Session


from app import models
from app.crud.base import CRUDBase
from app.schemas.student_marks import StudentMarkCreate, StudentMarkUpdate


class CRUDStudentMark(CRUDBase[models.StudentMarks, StudentMarkCreate, StudentMarkUpdate]):

    def create(self, db: Session, obj_in: StudentMarkCreate) -> int:

        mark = db.query(self.model). \
            join(models.Student, models.Student.id == self.model.student_id). \
            join(models.Subject, models.Subject.id == self.model.subject_id). \
            filter(
                models.Student.id == obj_in.student_id,
                models.Subject.id == obj_in.subject_id,
                self.model.date == obj_in.date).\
            first()

        if mark:
            db.delete(mark)
            db.commit()

        mark = models.StudentMarks(**obj_in.dict())
        db.add(mark)
        db.commit()

        return mark.id


student_mark = CRUDStudentMark(models.StudentMarks)
