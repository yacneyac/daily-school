from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Week(Base):
    id = Column(Integer, primary_key=True)
    day_id = Column(Integer, nullable=False, unique=True)
    name = Column(String, nullable=False, unique=True)
