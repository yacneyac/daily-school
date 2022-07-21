from datetime import datetime
from sqlalchemy.orm import Session


from app.crud.base import CRUDBase
from app.models.group import Group
from app.models.group_to_teacher import Group2Teacher
from app.schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def create(self, db: Session, *, obj_in: GroupCreate) -> Group:
        db_obj = Group(
            name=obj_in.name,
            owner_id=obj_in.owner_id,
            created_ts=datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        db_obj2 = Group2Teacher(
            group_id=db_obj.id,
            teacher_id=db_obj.owner_id
        )
        db.add(db_obj2)
        db.commit()
        db.refresh(db_obj2)

        return db_obj


group = CRUDGroup(Group)
