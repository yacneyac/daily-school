from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Teacher(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=False)
    last_name = Column(String(256), index=True, nullable=False)
    second_name = Column(String(256), nullable=False)

    age = Column(Integer(), nullable=False)
    # sex = Column(String(10), ForeignKey('sex.id'), nullable=False)

    start_work = Column(DateTime(), nullable=True)
    end_work = Column(DateTime(), nullable=True)

    # experience = Column(DECIMAL(), nullable=True)

    address = Column(String(256), nullable=True)
    email = Column(String(256), nullable=True)
    phone = Column(String(256), nullable=True)
    home_phone = Column(String(256), nullable=True)

    group_id = Column(String(10), ForeignKey('group.id'), nullable=False)
    group = relationship('Group', back_populates='teachers')
