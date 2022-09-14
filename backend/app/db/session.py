from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# SQLALCHEMY_DATABASE_URI = "sqlite:///school.db"
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://db_user:db_pass@localhost/school"


engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    # required for sqlite
    # connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
