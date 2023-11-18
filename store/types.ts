import {TimelineEventProps} from 'react-native-calendars';

export type CourseItem = {
  id: string;
  days: string;
  time: string;
  location: string;
  title: string;
  description: string; // what is COMPSCI 121? it's information retrieval
  type: 'Lec' | 'Dis' | 'Lab' | 'Sem' | string;
  section: string;
  code: string; // course code
};

export type AvailableClasses = {
  classes: CourseItem[];
};

export type CourseSchedule = {
  id: string; // unique ID for schedule
  title: string;
  courses: CourseItem[];
  appointments: TimelineEventProps[];
  modified?: string;
};

export type ScheduleState = {
  currentSchedule: CourseSchedule; // the current schedule id loaded to the schedule screen
  added: CourseSchedule[]; // all the course schedule added
};

export type CourseSearchResult = {
  deptCode: string;
  courseNumber: string;
  courseTitle: string;
  sections: {
    sectionCode: string;
    sectionType: string;
    sectionNum: string;
    units: string;
    instructors: string[];
    meetings: {
      bldg: string;
      days: string;
      time: string;
    }[];
    finalExam: string;
    maxCapacity: number;
    numCurrentlyEnrolled: {
      totalEnrolled: number;
    };
    numOnWaitlist: string;
    restrictions: string;
    status: string;
  }[];
};
