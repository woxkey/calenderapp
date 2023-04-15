import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
	decrementWeek,
	incrementWeek,
	setCurrentWeek,
	startMonth,
	startYear,
	today,
} from '../store/calendarSlice';
import {DAYS, monthNames} from '../consts';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Container = styled.div`
	@media (min-width: 740px) {
		width: 740px;
		margin: 0 auto;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 20px;
`;

const Title = styled.div`
	font-weight: 400;
	font-size: 25px;
	@media (min-width: 340px) {
		font-size: 30px;
	}
`;

const StyledHeaderIcon = styled(FontAwesomeIcon)`
	color: #ff3131;
	font-size: 30px;
	cursor: pointer;
`;

const Body = styled.div`
	background-color: #f6f6f6;
	color: black;
	padding: 10px 50px;
`;

const DaysContainer = styled.div`
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	padding-bottom: 10px;
	font-size: 10px;
	@media (min-width: 340px) {
		font-size: 15px;
	}
`;

const Week = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 15px;
	align-items: center;
	height: 40px;
	@media (min-width: 340px) {
		font-size: 25px;
	}
`;

const Day = styled.div`
	width: 20px;
	text-align: center;
	@media (min-width: 340px) {
		width: 40px;
	}
`;

const ButtonsMonth = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
`;

const StyledLeftIcon = styled(FontAwesomeIcon)`
	color: #ff3131;
	cursor: pointer;
`;

const StyledTodaySpan = styled.div`
	color: white;
	background: #ff3131;
	padding: 5px;
	border-radius: 50%;
`;

const StyledMonth = styled.p``;

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
		<Container>
			<Header>
				<Title>Interview Calendar</Title>
				<StyledHeaderIcon icon={faPlus} />
			</Header>
			<Body>
				<DaysContainer>
					{DAYS.map((day, i) => {
						return <Day key={i}>{day}</Day>;
					})}
				</DaysContainer>
				<Week>
					{currentWeek.map((day, i) => {
						return today === day &&
							startMonth === monthNumber &&
							startYear === year ? (
							<Day key={i}>
								<StyledTodaySpan>{day}</StyledTodaySpan>
							</Day>
						) : (
							<Day key={i}>{day === 0 ? '' : day}</Day>
						);
					})}
				</Week>
				<ButtonsMonth>
					<StyledLeftIcon onClick={handlePrev} icon={faAngleLeft} />
					<StyledMonth>
						{monthNames[monthNumber]}
						{' ' + year}
					</StyledMonth>
					<StyledLeftIcon onClick={handleNext} icon={faAngleRight} />
				</ButtonsMonth>
			</Body>
		</Container>
	);
};

export default Calendar;
