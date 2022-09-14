from pydantic import BaseModel


class Token(BaseModel):
    accessToken: str
    refreshToken: str
    tokenType: str


class AccessToken(BaseModel):
    accessToken: str
    tokenType: str
