from sqlalchemy import Column, Integer, String, ForeignKey, DATETIME
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Group_(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False, unique=True)
    owner_id = Column(Integer(), ForeignKey('teacher.id'), nullable=False)

    # created_ts = Column(DATETIME(), nullable=False)
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
