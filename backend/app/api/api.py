from fastapi import APIRouter

from app.api.endpoints import teacher, group, auth, schedule

api_router = APIRouter()
api_router.include_router(auth.router, prefix='/auth', tags=['auth'])
api_router.include_router(teacher.router, prefix='/teachers', tags=['teachers'])
# api_router.include_router(group.router, prefix='/groups', tags=['groups'])
api_router.include_router(schedule.router, prefix='/schedule', tags=['schedule'])
