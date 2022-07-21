from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import List, Optional, Any


class PersonSex(str, Enum):
    male = 'male'
    female = 'female'


class Person(BaseModel):
    first_name: str
    middle_name: str
    last_name: str

    date_of_birth: Any  # datetime
    # sex: PersonSex

    address: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    home_phone: Optional[EmailStr]
