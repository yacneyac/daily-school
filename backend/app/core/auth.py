from typing import Optional, MutableMapping, List, Union, Any
from datetime import datetime, timedelta


from sqlalchemy.orm.session import Session
from jose import jwt

from app.models.student import Student
from app.models.teacher import Teacher
from app.core.security import verify_password
from app.core.config import settings


def authenticate(*, email: str, password: str, db: Session) -> Any:

    def _get_user(user):
        return db.query(user).filter(user.email == email).first()

    # user = list((filter(_get_user, [Student, Teacher])))

    user = _get_user(Student)
    if not user:
        user = _get_user(Teacher)
        if not user:
            return None

    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(*, sub: str) -> str:
    return _create_token(
        token_type='access_token',
        lifetime=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        sub=sub,
    )


def _create_token(token_type: str, lifetime: timedelta, sub: str) -> str:
    payload = {}
    expire = datetime.utcnow() + lifetime
    payload['type'] = token_type

    # https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
    # The "exp" (expiration time) claim identifies the expiration time on
    # or after which the JWT MUST NOT be accepted for processing
    payload["exp"] = expire

    # The "iat" (issued at) claim identifies the time at which the
    # JWT was issued.
    payload['iat'] = datetime.utcnow()

    # The "sub" (subject) claim identifies the principal that is the
    # subject of the JWT
    payload['sub'] = str(sub)
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.ALGORITHM)