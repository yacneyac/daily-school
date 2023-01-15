from pydantic import BaseModel
from typing import List, Optional, Any


# Shared properties
class ScheduleBase(BaseModel):
    day_id: int  # Monday, Thursday
    subject_id: int
    room_id: int
    group_id: int
    time_id: int


# Properties to receive via API on creation
class ScheduleCreate(ScheduleBase):
    day_id: dict  # {"5":true}


# Properties to receive via API on update
class ScheduleUpdate(ScheduleBase):
    date: Optional[str] = None


class ScheduleInDBBase(ScheduleBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Schedule(ScheduleInDBBase):
    week_number: int


# Additional properties stored in DB
class ScheduleInDB(ScheduleInDBBase):
    pass
