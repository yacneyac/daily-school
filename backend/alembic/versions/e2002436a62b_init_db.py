"""init DB

Revision ID: e2002436a62b
Revises: 
Create Date: 2022-08-02 18:14:21.191422

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2002436a62b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('student',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=256), nullable=False),
    sa.Column('middle_name', sa.String(length=256), nullable=False),
    sa.Column('last_name', sa.String(length=256), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('date_of_birth', sa.DATETIME(), nullable=False),
    sa.Column('average_mark', sa.DECIMAL(), nullable=False),
    sa.Column('address', sa.String(length=256), nullable=False),
    sa.Column('email', sa.String(length=256), nullable=True),
    sa.Column('phone', sa.String(length=256), nullable=True),
    sa.Column('home_phone', sa.String(length=256), nullable=True),
    sa.Column('created_ts', sa.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_student_id'), 'student', ['id'], unique=False)
    op.create_index(op.f('ix_student_middle_name'), 'student', ['middle_name'], unique=False)
    op.create_table('teacher',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=256), nullable=False),
    sa.Column('middle_name', sa.String(length=256), nullable=False),
    sa.Column('last_name', sa.String(length=256), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('date_of_birth', sa.Integer(), nullable=False),
    sa.Column('start_work', sa.Integer(), nullable=True),
    sa.Column('end_work', sa.Integer(), nullable=True),
    sa.Column('address', sa.String(length=256), nullable=True),
    sa.Column('email', sa.String(length=256), nullable=True),
    sa.Column('phone', sa.String(length=256), nullable=True),
    sa.Column('home_phone', sa.String(length=256), nullable=True),
    sa.Column('created_ts', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_teacher_id'), 'teacher', ['id'], unique=False)
    op.create_index(op.f('ix_teacher_last_name'), 'teacher', ['last_name'], unique=False)
    op.create_table('group',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('created_ts', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['teacher.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_group_id'), 'group', ['id'], unique=False)
    op.create_table('group2student',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['student.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('group_id', 'student_id', name='unique_gs')
    )
    op.create_index(op.f('ix_group2student_id'), 'group2student', ['id'], unique=False)
    op.create_table('group2teacher',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], ),
    sa.ForeignKeyConstraint(['teacher_id'], ['teacher.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('group_id', 'teacher_id', name='unique_gt')
    )
    op.create_index(op.f('ix_group2teacher_id'), 'group2teacher', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_group2teacher_id'), table_name='group2teacher')
    op.drop_table('group2teacher')
    op.drop_index(op.f('ix_group2student_id'), table_name='group2student')
    op.drop_table('group2student')
    op.drop_index(op.f('ix_group_id'), table_name='group')
    op.drop_table('group')
    op.drop_index(op.f('ix_teacher_last_name'), table_name='teacher')
    op.drop_index(op.f('ix_teacher_id'), table_name='teacher')
    op.drop_table('teacher')
    op.drop_index(op.f('ix_student_middle_name'), table_name='student')
    op.drop_index(op.f('ix_student_id'), table_name='student')
    op.drop_table('student')
    # ### end Alembic commands ###