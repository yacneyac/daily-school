from sqlalchemy import Column, Integer

from app.db.base_class import Base


class WeekNumber(Base):

    id = Column(Integer, primary_key=True)
    number = Column(Integer, nullable=False, unique=True, index=True)
    start_ts = Column(Integer, nullable=False, unique=True)
