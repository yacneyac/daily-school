from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class LessonTime(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False, unique=True)
