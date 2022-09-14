from pydantic import BaseModel


class LessonTimeBase(BaseModel):
    name: str


class LessonTimeCreate(LessonTimeBase):
    pass


class LessonTimeUpdate(LessonTimeBase):
    pass


class LessonTimeInDBBase(LessonTimeBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class LessonTime(LessonTimeInDBBase):
    pass

