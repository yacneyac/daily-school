from pydantic import BaseModel
from enum import Enum


class PersonSex(str, Enum):
    male = 'male'
    female = 'female'


class Person(BaseModel):
    f_name: str
    l_name: str
    s_name: str

    age: int
    sex: PersonSex

    address: str
    email: str
    phone: str
    home_phone: str
