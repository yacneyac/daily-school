from pydantic import BaseModel, EmailStr, SecretStr, constr, root_validator
from enum import Enum
from typing import Optional


class UserSex(str, Enum):
    male = 'male'
    female = 'female'


class User(BaseModel):
    first_name: constr(min_length=3)
    middle_name: constr(min_length=3)
    last_name: constr(min_length=3)

    date_of_birth: int  # datetime
    # sex: PersonSex

    address: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    home_phone: Optional[str] = None


class CreateUser(User):
    email: EmailStr
    password: SecretStr
    confirm_password: SecretStr  # (regex="^[a-z]$")
    is_teacher: bool = False

    @root_validator()
    def verify_password_match(cls, values):
        password = values.get('password')
        confirm_password = values.get('confirm_password')

        if password != confirm_password:
            raise ValueError('The two passwords did not match.')
        return values
