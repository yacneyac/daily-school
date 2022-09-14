from pydantic import BaseModel
from typing import Optional


class SubjectBase(BaseModel):
    name: str
    enabled: Optional[bool] = True


class SubjectCreate(SubjectBase):
    pass


class SubjectUpdate(SubjectBase):
    pass


class SubjectInDBBase(SubjectBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Subject(SubjectInDBBase):
    pass

