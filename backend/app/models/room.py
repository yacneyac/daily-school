from sqlalchemy import Column, Integer, String, DATETIME, BOOLEAN

from app.db.base_class import Base


class Room(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False, unique=True)
    available = Column(BOOLEAN, default=True, nullable=False)
    # enabled = Column(BOOLEAN, default=True, nullable=False)

