import {createSlice} from '@reduxjs/toolkit';
import {Calendar} from 'calendar';

const cal = new Calendar(1);

interface CalendarState {
	weekNumber: number;
	currentWeek: number[];
	calendar: any;
	monthNumber: number;
	year: number;
}

export const startYear = new Date().getFullYear();
export const startMonth = new Date().getMonth();
export const today = new Date().getDate();

const initialState: CalendarState = {
	weekNumber: today / 7,
	currentWeek: [],
	monthNumber: startMonth,
	calendar: cal.monthDays(startYear, startMonth),
	year: startYear,
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCurrentWeek: (state) => {
			for (let i = 0; i < state.calendar.length; i++) {
				if (state.calendar[i].includes(today)) {
					state.currentWeek = state.calendar[i];
				}
			}
		},
		incrementWeek: (state) => {
			if (state.weekNumber >= 4) {
				if (state.monthNumber >= 11) {
					state.year = state.year + 1;
					state.monthNumber = 0;
				} else {
					state.monthNumber = state.monthNumber + 1;
				}

				state.weekNumber = 0;

				state.calendar = cal.monthDays(state.year, state.monthNumber);
				return;
			}
			state.weekNumber = state.weekNumber + 1;
		},
		decrementWeek: (state) => {
			if (state.weekNumber <= 0) {
				if (state.monthNumber === 0) {
					state.year = state.year - 1;
					state.monthNumber = 11;
				} else {
					state.monthNumber = state.monthNumber - 1;
				}

				state.weekNumber = 4;

				state.calendar = cal.monthDays(state.year, state.monthNumber);
				return;
			}
			state.weekNumber = state.weekNumber - 1;
		},
	},
});

export const {setCurrentWeek, incrementWeek, decrementWeek} =
	calendarSlice.actions;

export default calendarSlice.reducer;
