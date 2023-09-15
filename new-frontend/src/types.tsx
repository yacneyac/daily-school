import { SelectChangeEvent } from "@mui/material";
import store from "./store";
import { GridColDef } from "@mui/x-data-grid";

export type AppDispatch = typeof store.dispatch;
export type StringOptional = string | "";
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type SelectEvent = SelectChangeEvent<string>;

interface BaseParam {
  id: number;
  name: string;
}

export interface User {
  id: number;
  db_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: number;
  address: string;
  phone: StringOptional;
  home_phone: StringOptional;
  email: StringOptional;
  group_id: number;
}

export interface Room extends BaseParam {
  available: boolean;
}

export interface Subject extends BaseParam {
  enabled: boolean;
}

export interface Time extends BaseParam {}

export interface Group extends BaseParam {
  owner_id: number;
}

export interface Week extends BaseParam {
  day_id: number;
}

///////

export interface LessonCreate {
  week_id: number;
  day_id: number;
  subject_id: number;
  room_id: number;
  group_id: number;
  time_id: number;
}

export interface MarkCreate {
  teacher_id: number;
  student_id: number;
  subject_id: number;
  mark: string;
  date: number;
  day: string;
}

export interface AuthParams {
  accessToken: StringOptional;
  refreshTocken: StringOptional;
}

export interface LessonGridRow extends GridColDef {
  db_id: number;
  id: number;
  time: string;
  subject: string;
  room: string;
  group: string;
}

interface StudentGridRow extends GridColDef {
  id: number;
  db_id: number;
  name: string;
}

//// states

interface BaseState {
  isLoading: boolean;
  error: StringOptional;
}

export interface LessonState extends BaseState {
  created: boolean;
  deleted: boolean;
  activeLesson: {
    db_id: number;
    name: string;
    date: string;
    group: string;
    students: StudentGridRow[];
  };
}

export interface UserState extends BaseState {
  user: User;
}

export interface LoginState extends BaseState {
  isAuth: boolean;
}

export interface TimeTableState extends BaseState {
  week: [{ name: string; date: string; lessons: LessonGridRow[] }] | [];
  parameters: {
    room: Room[];
    subject: Subject[];
    time: Time[];
    group: Group[];
    week: Week[];
  };
  activeWeekNumber: number | null;
}

export interface StoreState {
  login: LoginState;
  user: UserState;
  lesson: LessonState;
  timeTable: TimeTableState;
}
