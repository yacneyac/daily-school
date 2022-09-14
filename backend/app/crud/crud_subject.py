from app.crud.base import CRUDBase
from app.models import Subject
from app.schemas.subject import SubjectCreate, SubjectUpdate


class CRUDSubject(CRUDBase[Subject, SubjectCreate, SubjectUpdate]):
    pass


subject = CRUDSubject(Subject)
