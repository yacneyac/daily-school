# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.group import Group  # noqa
from app.models.group_to_teacher import Group2Teacher  # noqa
from app.models.group_to_student import Group2Student  # noqa
from app.models.student import Student  # noqa
from app.models.teacher import Teacher  # noqa