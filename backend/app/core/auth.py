from typing import Optional, MutableMapping, List, Union, Any
from datetime import datetime, timedelta
from fastapi import HTTPException, status

from sqlalchemy.orm.session import Session
from jose import jwt

from app.models.student import Student
from app.models.teacher import Teacher
from app.core.security import verify_password
from app.core.config import settings


ACCESS_TOKEN = 'access_token'
REFRESH_TOKEN = 'refresh_token'


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


def read_access_token(token: str):
    return __read_token(token=token, token_type=ACCESS_TOKEN)


def refresh_token(r_token: str):
    """ Read refresh token and generate a new access token """
    username = __read_token(token=r_token, token_type=REFRESH_TOKEN)
    return create_access_token(sub=username)


def __read_token(token: str, token_type: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET)
        print(f'READ {token_type}: {token}')
        if payload['type'] == token_type:
            return payload['sub']

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid type of token'
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Token expired'
        )

    except (jwt.JWTError, jwt.JWSError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token'
        )


def create_access_token(*, sub: str) -> str:
    return _create_token(
        token_type=ACCESS_TOKEN,
        lifetime=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        sub=sub
    )


def create_refresh_token(*, sub: str) -> str:
    return _create_token(
        token_type=REFRESH_TOKEN,
        lifetime=timedelta(hours=settings.REFRESH_TOKEN_EXPIRE_HOURS),
        sub=sub
    )


# TODO: add some info to token
def _create_token(token_type: str, lifetime: timedelta, sub: str) -> str:
    payload = {}
    expire = datetime.utcnow() + lifetime
    payload['type'] = token_type

    # https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
    # The "exp" (expiration time) claim identifies the expiration time on
    # or after which the JWT MUST NOT be accepted for processing
    payload['exp'] = expire

    # The "iat" (issued at) claim identifies the time at which the
    # JWT was issued.
    payload['iat'] = datetime.utcnow()

    # The "sub" (subject) claim identifies the principal that is the
    # subject of the JWT
    payload['sub'] = str(sub)

    t = jwt.encode(payload, settings.JWT_SECRET)

    print(f'MADE {token_type}: {t}')
    return t
