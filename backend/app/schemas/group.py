from pydantic import BaseModel
from typing import List, Optional

from app.schemas import Student, Teacher


class GroupBase(BaseModel):
    name: str
    owner_id: int
    teachers: Optional[List[Teacher]] = []
    students: Optional[List[Student]] = []


class GroupCreate(BaseModel):
    # teacher must create group
    owner_id: int
    name: str
    # pass


class GroupUpdate(BaseModel):
    name: Optional[str]
    teachers: Optional[List[Teacher]]
    students: Optional[List[Student]]


class GroupInDBBase(GroupBase):
    id: int
    name: str
    owner_id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Group(GroupInDBBase):
    pass


# Additional properties stored in DB
class GroupInDB(GroupInDBBase):
    pass
