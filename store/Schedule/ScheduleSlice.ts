import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {CourseItem, ScheduleState} from '../types';
import {
  COMBINED_DAYS,
  DAYS,
  TIME_FORMAT,
  formatTime,
  setToDate,
} from '../../utils/utils';
import moment from 'moment';
import {TimelineEventProps} from 'react-native-calendars';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

const initialState: ScheduleState = {
  currentSchedule: {
    id: '', // q: id by default should be random
    title: '',
    courses: [],
    appointments: [],
  },
  added: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCurrentCourseAppointment: (state, action: PayloadAction<CourseItem>) => {
      // add to the current shown schedule the wanted courses and set the correct appointment to it

      // create a new appointment for this
      let data: CourseItem = action.payload;
      let appointments: TimelineEventProps[] = [];
      const [startHours, startMinutes, endHours, endMinutes] = formatTime(
        data.time,
      );
      // if they don't have a specific time, then don't make an appointment (q: should we create a separate tab for TBA?)
      if (data.time.trim() !== 'TBA') {
        if (data.days.trim() in COMBINED_DAYS) {
          let count = 0;
          for (const day of COMBINED_DAYS[data.days.trim()]) {
            const date = setToDate(new Date(), DAYS[day]);
            const newStartDate = new Date(date);
            newStartDate.setHours(startHours);
            newStartDate.setMinutes(startMinutes);
            console.log(newStartDate.toString);

            const start = moment(newStartDate).format('YYYY-MM-DD HH:mm:00');
            const newEndDate = new Date(date);
            newEndDate.setHours(endHours);
            newEndDate.setMinutes(endMinutes);
            const end = moment(newEndDate).format('YYYY-MM-DD HH:mm:00');
            appointments.push({
              title: `${data.title} ${data.section} - ${data.type}`,
              id: `${data.id}@${count++}`,
              start,
              end,
              summary: data.location,
            });
          }
        } else {
          const date = setToDate(new Date(), DAYS[data.days.trim()]);
          const newStartDate = new Date(date);
          newStartDate.setHours(startHours);
          newStartDate.setMinutes(startMinutes);
          const start = moment(newStartDate).format('YYYY-MM-DD HH:mm:00');
          const newEndDate = new Date(date);
          newEndDate.setHours(endHours);
          newEndDate.setMinutes(endMinutes);
          const end = moment(newEndDate).format('YYYY-MM-DD HH:mm:00');
          appointments.push({
            title: `${data.title} ${data.section} - ${data.type}`,
            id: data.id,
            start,
            end,
            summary: data.location,
          });
        }
      }

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          courses: [...state.currentSchedule.courses, action.payload],
          appointments: [
            ...state.currentSchedule.appointments,
            ...appointments,
          ],
        },
      };
    },
    deleteCurrentCourseAppointment: (state, action: PayloadAction<string>) => {
      //delete the course and appointment specified by the payload id in the current shown schedule
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          courses: state.currentSchedule.courses.filter(
            course => course.id !== action.payload,
          ),
          appointments: state.currentSchedule.appointments.filter(
            appointment =>
              appointment.id?.split('@')[0] !== action.payload.split('@')[0],
          ),
        },
      };
    },
    setCurrentSchedule: (state, action: PayloadAction<string>) => {
      // set the current schedule id obtained by loading from saved schedules
      const foundSchedule = state.added.find(
        item => item.id === action.payload,
      );
      if (foundSchedule) {
        return {
          ...state,
          currentSchedule: foundSchedule,
        };
      }
    },
    clearCurrentSchedule: state => {
      // clear the current schedule that is in the schedule tab
      return {
        ...state,
        currentSchedule: {
          id: '',
          title: '',
          courses: [],
          appointments: [],
        },
      };
    },
    saveCurrentSchedule: (state, action: PayloadAction<string>) => {
      // save the current schedule info
      // if no courses is added in current scehdule or this is a newly cleared/made schedule, don't add it to added list
      if (
        state.currentSchedule.modified === null ||
        state.currentSchedule.courses.length === 0
      ) {
        return state;
      }
      if (
        state.added.some(schedule => schedule.id === state.currentSchedule.id)
      ) {
        return {
          currentSchedule: {
            id: '',
            title: '',
            courses: [],
            appointments: [],
          },
          added: [
            ...state.added.filter(
              schedule => schedule.id !== state.currentSchedule.id,
            ),
            {
              ...state.currentSchedule,
              title: action.payload,
              modified: moment().format('MM/DD/yyyy'),
            },
          ],
        };
      }
      return {
        currentSchedule: {
          id: '',
          title: '',
          courses: [],
          appointments: [],
        },
        added: [
          ...state.added,
          {
            ...state.currentSchedule,
            id: uuid(),
            title: action.payload,
            modified: moment().format('MM/DD/yyyy'),
          },
        ],
      };
    },
    updateCurrentSchedule: state => {
      // update current schedule metadata / start and end dates
      const startOfWeek = moment()
        .startOf('week')
        .add(1, 'days')
        .format(`${TIME_FORMAT} HH:mm:00`);
      const endOfWeek = moment().endOf('week');
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          appointments: state.currentSchedule.appointments.map(schedule => {
            const oldStart = moment(schedule.start);
            const oldEnd = moment(schedule.end);
            if (
              oldStart.isBetween(startOfWeek, endOfWeek, 'days', '[]') ||
              oldEnd.isBetween(startOfWeek, endOfWeek, 'days', '[]')
            ) {
              return schedule;
            }

            const currentStart = moment()
              .startOf('week')
              .add(moment(schedule.start).day(), 'days');
            const currentEnd = moment()
              .startOf('week')
              .add(moment(schedule.end).day(), 'days');
            const startDiff = currentStart.diff(oldStart, 'days') + 1; // adding one can give offset error
            const endDiff = currentEnd.diff(oldEnd, 'days') + 1;
            const newStart = oldStart
              .add(startDiff, 'days')
              .format(`${TIME_FORMAT} HH:mm:00`);
            const newEnd = oldEnd
              .add(endDiff, 'days')
              .format(`${TIME_FORMAT} HH:mm:00`);
            return {
              ...schedule,
              start: newStart,
              end: newEnd,
            };
          }),
        },
      };
    },
    deleteCourseSchedule: (state, action: PayloadAction<string>) => {
      // delete a new/current schedule to the added list
      return {
        ...state,
        added: state.added.filter(schedule => schedule.id !== action.payload),
      };
    },
  },
});

export const {
  addCurrentCourseAppointment,
  deleteCurrentCourseAppointment,
  setCurrentSchedule,
  clearCurrentSchedule,
  saveCurrentSchedule,
  updateCurrentSchedule,
  deleteCourseSchedule,
} = scheduleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrent = (state: RootState) =>
  state.schedule.currentSchedule;
export const selectAdded = (state: RootState) => state.schedule.added;

export default scheduleSlice.reducer;
