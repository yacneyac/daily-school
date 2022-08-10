from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session


from app.schemas.user import CreateUser, User
from app.schemas.teacher import Teacher
from app.schemas.token import Token, AccessToken
from app.core import auth
# from app.core.auth import authenticate, create_access_token, create_refresh_token, refresh_token
from app import deps, crud


router = APIRouter()


@router.post('/signup', status_code=201, response_model=User)
async def create_user(*, user_in: CreateUser, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new user in the database.
    """
    crud_user = crud.teacher if user_in.is_teacher else crud.student

    user = crud_user.get_by_email(db=db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='The user with this email already exists',
        )

    crud_user.create(db=db, obj_in=user_in)
    return user


@router.post('/signin', response_model=Token)
async def login(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    """ Authenticate user by email and generate access and refresh tokens """
    print('RECIVE: ', form_data)
    user = auth.authenticate(email=form_data.username, password=form_data.password, db=db)
    print('USER: ', user)
    if not user:
        print('RAISE 401')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    return {
        'accessToken': auth.create_access_token(sub=user.email),
        'refreshToken': auth.create_refresh_token(sub=user.email),
        'tokenType': 'bearer',
    }


@router.post('/refresh-token', response_model=AccessToken)
async def refresh_token(token: str = Depends(deps.oauth2_scheme)):
    return {
        'accessToken': auth.refresh_token(token),
        'tokenType': 'bearer'
    }


# test token
@router.get('/user', response_model=Teacher)
def read_users_me(current_user: Teacher = Depends(deps.get_current_teacher)):
    return current_user


@router.get('/timetable')
def read_users_me(current_user: Teacher = Depends(deps.get_current_teacher)):
    return {
        'history': 'history',
        'info': 'info',
        'nextLesson': 'next lesson'
    }


@router.delete('/logout')
def read_users_me(current_user: Teacher = Depends(deps.get_current_teacher)):

    print('DELETED info')
    return 'OK'