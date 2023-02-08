from sqlalchemy import Column, Integer, String, DATETIME, BOOLEAN, UniqueConstraint

from app.db.base_class import Base


class Room(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False, unique=True)
    available = Column(BOOLEAN, default=True, nullable=False)
    UniqueConstraint('name', name='uq_room_name')
    # enabled = Column(BOOLEAN, default=True, nullable=False)

