from pydantic import BaseModel
from typing import Optional


class WeekNumberBase(BaseModel):
    number: int
    start_date: str


class WeekNumberCreate(BaseModel):
    start_education_date: str
    end_education_date: str


class WeekNumberUpdate(WeekNumberCreate):
    pass


class WeekNumberInDBBase(WeekNumberBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class WeekNumberOUT(WeekNumberBase):
    pass

