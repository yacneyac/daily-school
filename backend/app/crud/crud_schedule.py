from datetime import datetime
from sqlalchemy.orm import Session
from psycopg2.errors import ForeignKeyViolation

from app.crud.base import CRUDBase
from app.models.schedule import Schedule
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate


class CRUDSchedule(CRUDBase[Schedule, ScheduleCreate, ScheduleUpdate]):

    def create(self, db: Session, *, obj_in: ScheduleCreate) -> Schedule:
        objects = []
        for day_id, enabled in obj_in.day_id.items():
            if not enabled:
                continue
            db_obj = Schedule(
                day_id=day_id,
                subject_id=obj_in.subject_id,
                room_id=obj_in.room_id,
                group_id=obj_in.group_id,
                time_id=obj_in.time_id,
                date=obj_in.date,
                created_ts=int(datetime.timestamp(datetime.now()))
            )

            db.add(db_obj)
            
            db.commit()
            db.refresh(db_obj)
            objects.append(db_obj)
        return objects


schedule = CRUDSchedule(Schedule)
