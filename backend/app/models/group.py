from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Group(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)

    teachers = relationship(
        'Teacher',
        back_populates='group',
        uselist=True,
    )

    # one group to many students
    students = relationship(
        'Student',
        back_populates='group',
        uselist=True,
    )
