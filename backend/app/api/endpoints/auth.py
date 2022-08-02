from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session


from app.schemas.user import CreateUser, User
from app.schemas.teacher import Teacher
from app.schemas.token import Token
from app.core.auth import authenticate, create_access_token
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
    """ Log in user """

    user = authenticate(email=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            # headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "access_token": create_access_token(sub=user.email),
        "token_type": "bearer",
    }


# test token
@router.get('/me', response_model=Teacher)
def read_users_me(current_user: Teacher = Depends(deps.get_current_teacher)):
    return current_user
