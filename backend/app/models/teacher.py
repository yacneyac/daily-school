from sqlalchemy import Column, Integer, String, DECIMAL, DATETIME, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Teacher(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=False)
    middle_name = Column(String(256), nullable=False)
    last_name = Column(String(256), index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    date_of_birth = Column(DATETIME(), nullable=False)
    # sex = Column(String(10), ForeignKey('sex.id'), nullable=False)

    start_work = Column(DATETIME(), nullable=True)
    end_work = Column(DATETIME(), nullable=True)

    # experience = Column(DECIMAL(), nullable=True)

    address = Column(String(256), nullable=True)
    email = Column(String(256), nullable=True)
    phone = Column(String(256), nullable=True)
    home_phone = Column(String(256), nullable=True)

    group_id = Column(String(10), ForeignKey('group.id'), nullable=True)
    group = relationship('Group', back_populates='teachers')
