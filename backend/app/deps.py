from typing import Generator, Union, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel
from sqlalchemy.orm.session import Session


from app.db.session import SessionLocal
from app.core.config import settings
from app.core.auth import read_access_token
from app.models.student import Student
from app.models.teacher import Teacher


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f'{settings.API_V1_STR}/auth/signin')


class TokenData(BaseModel):
    username: Union[str, None] = None


def get_current_teacher(
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_scheme)):

    return __get_current_user(Teacher, db, token)


def get_current_student(
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_scheme)):

    return __get_current_user(Student, db, token)


def __get_current_user(user, db, token):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )

    in_email = read_access_token(token)
    if not in_email:
        raise credentials_exception

    user_in_db = db.query(user).filter(user.email == in_email).first()
    if not user_in_db:
        raise credentials_exception

    return user_in_db


current_user = Depends(get_current_teacher)
db_session = Depends(get_db)
