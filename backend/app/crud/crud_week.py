from app.crud.base import CRUDBase
from app.models import Week
from app.schemas.week import WeekCreate, WeekUpdate


class CRUDWeek(CRUDBase[Week, WeekCreate, WeekUpdate]):
    pass


week = CRUDWeek(Week)
