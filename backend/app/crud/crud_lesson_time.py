from app.crud.base import CRUDBase
from app.models import LessonTime
from app.schemas.lesson_time import LessonTimeCreate, LessonTimeUpdate


class CRUDLessonTime(CRUDBase[LessonTime, LessonTimeCreate, LessonTimeUpdate]):
    pass


lesson_time = CRUDLessonTime(LessonTime)
