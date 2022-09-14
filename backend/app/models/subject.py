from sqlalchemy import Column, Integer, String, BOOLEAN

from app.db.base_class import Base


class Subject(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False, unique=True)
    enabled = Column(BOOLEAN, default=True, nullable=False)
