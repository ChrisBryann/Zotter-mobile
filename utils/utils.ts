export const setToDate = (date: Date, wantedDay: number): Date => {
  let day: number = date.getDay();
  date.setHours(-24 * (day - wantedDay));
  return date;
};

export const formatTime = (time: string) => {
  let startHours = 0;
  let startMinutes = 0;
  let endHours = 0;
  let endMinutes = 0;
  if (time.slice(-1) === 'p') {
    // indicates that the time ENDS at PM, and the time STARTS at either AM or PM
    const newTime = time.slice(0, -1);
    const [start, end] = newTime.split('-');
    const startTime = start.split(':');
    const endTime = end.split(':');
    startHours = parseInt(startTime[0], 10);
    if (!(startHours >= 10 && startHours <= 12)) {
      startHours += 12;
    }
    startMinutes = parseInt(startTime[1], 10);
    endHours = parseInt(endTime[0], 10) + (endTime[0] === '12' ? 0 : 12);
    endMinutes = parseInt(endTime[1], 10);
  } else {
    const [start, end] = time.split('-');
    const startTime = start.split(':');
    const endTime = end.split(':');
    startHours = parseInt(startTime[0], 10);
    startMinutes = parseInt(startTime[1], 10);
    endHours = parseInt(endTime[0], 10);
    endMinutes = parseInt(endTime[1], 10);
  }

  return [startHours, startMinutes, endHours, endMinutes];
};

export const DAYS: {
  [key: string]: number;
} = {
  Sun: 0,
  M: 1,
  Tu: 2,
  W: 3,
  Th: 4,
  F: 5,
  Sat: 1,
};

export const COMBINED_DAYS: {
  [key: string]: string[];
} = {
  MW: ['M', 'W'],
  MWF: ['M', 'W', 'F'],
  TuTh: ['Tu', 'Th'],
  MTuWThF: ['M', 'Tu', 'W', 'Th', 'F'],
};

export const TIME_FORMAT = 'YYYY-MM-DD';
