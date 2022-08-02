from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any

from app.schemas.user import User


# Shared properties
class TeacherBase(User):
    # start_work: int
    pass


# Properties to receive via API on creation
class TeacherCreate(TeacherBase):
    password: str
    email: EmailStr


# Properties to receive via API on update
class TeacherUpdate(TeacherBase):
    first_name: Optional[str] = ''
    middle_name: Optional[str] = ''
    last_name: Optional[str] = ''
    date_of_birth: Optional[int] = None  # datetime

    password: Optional[str] = ''

    group_id: Optional[int] = None

    # phone: Optional[str] = ''
    # home_phone: Optional[str] = ''
    # email: Optional[EmailStr] = ''


class TeacherInDBBase(TeacherBase):
    id: int
    # group_id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Teacher(TeacherInDBBase):
    pass


# Additional properties stored in DB
class TeacherInDB(TeacherInDBBase):
    pass
