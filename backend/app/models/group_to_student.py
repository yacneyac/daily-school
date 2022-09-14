from sqlalchemy import Column, Integer, UniqueConstraint, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


# many to many
class Group2Student(Base):
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer(), ForeignKey('group_.id'), nullable=False)
    student_id = Column(Integer(), ForeignKey('student.id'), nullable=False)

    UniqueConstraint(group_id, student_id, name='unique_gs')
