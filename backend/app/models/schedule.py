from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint

from app.db.base_class import Base


class Schedule(Base):
    id = Column(Integer, primary_key=True, index=True)
    week_number = Column(ForeignKey('weeknumber.number'), nullable=False)
    day_id = Column(Integer(), ForeignKey('week.day_id'), nullable=False)
    subject_id = Column(Integer(), ForeignKey('subject.id'), nullable=False)
    room_id = Column(Integer(), ForeignKey('room.id'), nullable=False)
    group_id = Column(Integer(), ForeignKey('group_.id'), nullable=False)
    time_id = Column(Integer(), ForeignKey('lessontime.id'), nullable=False)
    date = Column(String, nullable=False)  # TODO: day_date

    created_ts = Column(Integer, nullable=False)

    UniqueConstraint(week_number, day_id, time_id, name='unique_schedule')

    def to_dict(self):
        return {
            'subject_id': self.subject_id,
            'room_id': self.room_id,
            'group_id': self.group_id,
            'time_id': self.time_id,
        }
