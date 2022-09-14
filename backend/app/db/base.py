# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.group import Group_  # noqa
from app.models.group_to_teacher import Group2Teacher  # noqa
from app.models.group_to_student import Group2Student  # noqa
from app.models.student import Student  # noqa
from app.models.teacher import Teacher  # noqa
from app.models.lesson_time import LessonTime  # noqa
from app.models.room import Room  # noqa
from app.models.schedule import Schedule  # noqa
from app.models.subject import Subject  # noqa
from app.models.week import Week # noqa