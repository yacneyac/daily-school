from sqlalchemy import Column, Integer, UniqueConstraint, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


# many to many
class Group2Teacher(Base):
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer(), ForeignKey('group_.id'), nullable=False)
    teacher_id = Column(Integer(), ForeignKey('teacher.id'), nullable=False)

    UniqueConstraint(group_id, teacher_id, name='unique_gt')


    # teachers = relationship(
    #     'Teacher',
    #     back_populates='group',
    #     uselist=True,
    # )

    # one group to many students
    # students = relationship(
    #     'Student',
    #     back_populates='group',
    #     uselist=True,
    # )