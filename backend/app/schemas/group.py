from pydantic import BaseModel
from typing import List, Optional

from app.schemas import Student, Teacher


class GroupBase(BaseModel):
    name: str
    owner_id: int


class GroupCreate(BaseModel):
    # teacher must create group
    owner_id: int
    name: str


class GroupUpdate(BaseModel):
    name: Optional[str]


class GroupInDBBase(GroupBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class GroupOut(GroupInDBBase):
    pass


# Additional properties stored in DB
class GroupInDB(GroupInDBBase):
    pass
