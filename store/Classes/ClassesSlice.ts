// import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import {RootState} from '../configureStore';
// import {AvailableClasses, CourseItem} from '../types';

// const initialState: AvailableClasses = {
//   classes: [],
// };

// export const classesSlice = createSlice({
//   name: 'classes',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     updateClasses: (state, action: PayloadAction<CourseItem[]>) => {
//       const currentClass = action.payload;
//       state.classes = currentClass;
//     },
//     clearClasses: state => {
//       state.classes = [];
//     },
//   },
// });

// export const {updateClasses, clearClasses} = classesSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCurrent = (state: RootState) => state.schedule.current;
// export const selectAdded = (state: RootState) => state.schedule.added;

// export default classesSlice.reducer;
