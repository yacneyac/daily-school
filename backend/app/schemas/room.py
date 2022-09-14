from pydantic import BaseModel
from typing import Optional


class RoomBase(BaseModel):
    name: str
    available: Optional[bool] = True


class RoomCreate(RoomBase):
    pass


class RoomUpdate(RoomBase):
    pass


class RoomInDBBase(RoomBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Room(RoomInDBBase):
    pass

