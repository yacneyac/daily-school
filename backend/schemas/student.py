import decimal
from typing import List

from backend.schemas.person import Person


class Student(Person):
    average_mark: decimal
    parents: List[Person]
