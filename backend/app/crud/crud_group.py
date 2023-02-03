from datetime import datetime
from sqlalchemy.orm import Session


from app.crud.base import CRUDBase
from app.models.group import Group_
from app.models.group_to_teacher import Group2Teacher
from app.schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group_, GroupCreate, GroupUpdate]):
    def create(self, db: Session, *, obj_in: GroupCreate) -> Group_:
        db_obj = Group_(
            name=obj_in.name,
            owner_id=obj_in.owner_id,
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

    # def get(self, db: Session, t_id: int, g_id: int):
    #     return db.query(self.model).filter(self.model.id == g_id).filter(self.model.owner_id == t_id).first()

    def get_by_teacher(self, db: Session, t_id: int):
        return db.query(self.model).filter(self.model.owner_id == t_id).all()


group = CRUDGroup(Group_)
