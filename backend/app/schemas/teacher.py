from pydantic import BaseModel, EmailStr
from typing import List, Optional

from backend.schemas import Person


# class TeacherBase(Person):
#     pass
#
#
# class TeacherInDBBase(TeacherBase):
#     id: int
#     group_id: int
#
#     class Config:
#         orm_mode = True

# Shared properties
class TeacherBase(Person):
    # start_work: int
    pass


# Properties to receive via API on creation
class TeacherCreate(TeacherBase):
    first_name: str
    middle_name: str
    last_name: str
    age: int

    phone: Optional[str] = ''
    home_phone: Optional[str] = ''
    email: Optional[EmailStr] = ''

    # group_id: int


# Properties to receive via API on update
class TeacherUpdate(TeacherBase):
    first_name: Optional[str] = ''
    middle_name: Optional[str] = ''
    last_name: Optional[str] = ''
    age: Optional[int] = 8

    phone: Optional[str] = ''
    home_phone: Optional[str] = ''
    email: Optional[EmailStr] = ''


class TeacherInDBBase(TeacherBase):
    id: int
    group_id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Teacher(TeacherInDBBase):
    pass


# Additional properties stored in DB
class TeacherInDB(TeacherInDBBase):
    pass
