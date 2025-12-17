# Why this file exists:
# - Task model/entity shape (ORM-first)

from sqlalchemy import Column, Integer, String, Boolean
from db import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    done = Column(Boolean, default=False)
