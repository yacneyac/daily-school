from pydantic import BaseModel
from typing import Optional


class WeekBase(BaseModel):
    name: str
    enabled: Optional[bool] = True


class WeekCreate(WeekBase):
    pass


class WeekUpdate(WeekBase):
    pass


class WeekInDBBase(WeekBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Week(WeekInDBBase):
    pass

