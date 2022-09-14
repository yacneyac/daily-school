from app.crud.base import CRUDBase
from app.models import Room
from app.schemas.room import RoomCreate, RoomUpdate


class CRUDRoom(CRUDBase[Room, RoomCreate, RoomUpdate]):
    pass


room = CRUDRoom(Room)
