from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Student(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=False)
    last_name = Column(String(256), index=True, nullable=False)
    second_name = Column(String(256), nullable=False)

    age = Column(Integer(), nullable=False)
    sex = Column(String(10), ForeignKey("sex.id"), nullable=False)

    address = Column(String(256), nullable=False)

    email = Column(String(256), nullable=True)
    phone = Column(String(256), nullable=True)
    home_phone = Column(String(256), nullable=True)

    submitter_id = Column(String(10), ForeignKey("user.id"), nullable=False)  # 3
    submitter = relationship("User", back_populates="recipes")
