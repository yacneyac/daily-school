from pydantic import BaseModel


# Shared properties
class StudentMarkBase(BaseModel):
    student_id: int
    subject_id: int
    mark: str
    date: str
    day: int


# Properties to receive via API on creation
class StudentMarkCreate(StudentMarkBase):
    pass


# Properties to receive via API on update
class StudentMarkUpdate(StudentMarkBase):
    pass


class StudentMarkInDBBase(StudentMarkBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class StudentMark(StudentMarkInDBBase):
    pass
