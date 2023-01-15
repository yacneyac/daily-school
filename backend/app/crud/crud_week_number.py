from sqlalchemy.orm import Session
from datetime import datetime as dt, timedelta


from app import models

from app.crud.base import CRUDBase
from app.schemas.week_number import WeekNumberCreate, WeekNumberUpdate


class CRUDWeekNumber(CRUDBase[models.WeekNumber, WeekNumberCreate, WeekNumberUpdate]):

    def create(self, db: Session, *, obj_in: WeekNumberCreate) -> None:
        def _week_numbers(start_date, end_date):

            curr_date = dt.strptime(start_date, '%Y-%m-%d')
            w_number = 1
            while curr_date <= dt.strptime(end_date, '%Y-%m-%d'):
                yield w_number, curr_date.timestamp()
                curr_date = curr_date + timedelta(days=7)
                w_number += 1

        for week_number, start_ts in _week_numbers(obj_in.start_education_date, obj_in.end_education_date):
            week_num = db.query(self.model).\
                filter(self.model.number == week_number).\
                first()

            if week_num:
                db.delete(week_num)
                db.commit()

            week_num = models.WeekNumber(
                number=week_number,
                start_ts=int(start_ts)
            )

            db.add(week_num)
            db.commit()
            db.refresh(week_num)

        return None


week_number = CRUDWeekNumber(models.WeekNumber)
