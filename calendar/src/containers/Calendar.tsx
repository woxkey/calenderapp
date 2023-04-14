import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
	decrementWeek,
	incrementWeek,
	setCurrentWeek,
} from '../store/calendarSlice';
import {DAYS, monthNames} from '../consts';

const StyledContainer = styled.div`
	width: 740px;
	margin: 0 auto;
`;

const StyledTable = styled.table`
	background-color: #f6f6f6;
	color: black;

	width: 100%;
`;

const StyledTr = styled.tr`
	display: flex;
	width: 100%;
`;

const StyledDiv = styled.div`
	overflow: hidden;
`;

const StyledTbody = styled.tbody`
	display: flex;
`;

const StyledTh = styled.th`
	width: 100px;
`;

const Calendar: React.FunctionComponent = (): React.ReactElement => {
	const {weekNumber, currentWeek, monthNumber, year} = useAppSelector(
		(state) => state.calendar
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCurrentWeek());
	}, [weekNumber]);

	const handleNext = () => {
		dispatch(incrementWeek());
	};

	const handlePrev = () => {
		dispatch(decrementWeek());
	};

	return (
		<StyledContainer>
			<StyledDiv>
				<StyledTable>
					<thead>
						<StyledTr>
							{DAYS.map((day, i) => {
								return <StyledTh key={i}>{day}</StyledTh>;
							})}
						</StyledTr>
					</thead>
					<tbody>
						<StyledTr>
							{currentWeek.map((currentDay, i) => {
								return <StyledTh key={i}>{currentDay}</StyledTh>;
							})}
						</StyledTr>
					</tbody>
				</StyledTable>
				<p>{monthNames[monthNumber]}</p>
				<p>year: {year}</p>
				<button onClick={handlePrev}>Prev</button>
				<button onClick={handleNext}>Next</button>
			</StyledDiv>
		</StyledContainer>
	);
};

export default Calendar;
