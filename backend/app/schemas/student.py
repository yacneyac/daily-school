import decimal
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from backend.schemas import Person


# Shared properties
class StudentBase(Person):
    average_mark: decimal
    # parents: List[Person]


# Properties to receive via API on creation
class StudentCreate(StudentBase):
    first_name: str
    middle_name: str
    last_name: str
    age: int

    phone: Optional[str] = ''
    home_phone: Optional[str] = ''
    email: Optional[EmailStr] = ''

    group_id: int


# Properties to receive via API on update
class StudentUpdate(StudentBase):
    first_name: Optional[str] = ''
    middle_name: Optional[str] = ''
    last_name: Optional[str] = ''
    age: Optional[int] = 8

    phone: Optional[str] = ''
    home_phone: Optional[str] = ''
    email: Optional[EmailStr] = ''


class StudentInDBBase(StudentBase):
    id: int
    group_id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Student(StudentInDBBase):
    pass


# Additional properties stored in DB
class StudentInDB(StudentInDBBase):
    pass
