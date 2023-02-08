from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint

from app.db.base_class import Base


class StudentMarks(Base):
    id = Column(Integer, primary_key=True)
    student_id = Column(ForeignKey('student.id'), index=True, nullable=False)
    subject_id = Column(ForeignKey('subject.id'), index=True, nullable=False)
    mark = Column(String, nullable=False)  # TODO: make a table for marks
    date = Column(String, nullable=False)
    day = Column(Integer, nullable=False)

    UniqueConstraint(student_id, subject_id, date, name='unique_schedule')
