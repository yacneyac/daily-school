from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Student(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=False)
    middle_name = Column(String(256), index=True, nullable=False)
    last_name = Column(String(256), nullable=False)

    hashed_password = Column(String, nullable=False)

    date_of_birth = Column(Integer, nullable=False)
    # sex = Column(String(10), ForeignKey("sex.id"), nullable=False)
    average_mark = Column(DECIMAL(), nullable=False)

    address = Column(String(256), nullable=False)

    email = Column(String(256), nullable=True)
    phone = Column(String(256), nullable=True)
    home_phone = Column(String(256), nullable=True)

    # group_id = Column(String(10), ForeignKey('group.id'), nullable=False)
    # group = relationship('Group', back_populates='students')
    created_ts = Column(Integer, nullable=False)