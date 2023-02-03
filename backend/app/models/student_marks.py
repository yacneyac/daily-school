from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint

from app.db.base_class import Base


class StudentMarks(Base):
    id = Column(Integer, primary_key=True)
    student_id = Column(ForeignKey('student.id'), nullable=False)
    subject_id = Column(ForeignKey('subject.id'), nullable=False)
    mark = Column(Integer, nullable=False)
    date = Column(String)

    UniqueConstraint(student_id, subject_id, date, name='unique_schedule')
