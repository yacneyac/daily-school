from fastapi import APIRouter

from app.api.endpoints import teachers #items, login, users, utils

api_router = APIRouter()
api_router.include_router(teachers.router, prefix='/teachers', tags=['teachers'])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
# api_router.include_router(items.router, prefix="/items", tags=["items"])
