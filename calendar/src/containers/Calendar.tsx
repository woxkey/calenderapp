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
import {DAYS, Time, monthNames} from '../consts';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IEvent from '../interfaces/IEvent';

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
	padding: 10px 30px;

	@media (min-width: 455px) {
		padding: 10px 60px;
	}
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
	cursor: pointer;
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
	padding: 1px;
	border-radius: 50%;
	@media (min-width: 340px) {
		padding: 5px;
	}
`;

const StyledMonth = styled.p``;

const Main = styled.div`
	display: flex;
	flex-direction: column;
`;

const Box = styled.div<{changeBg: boolean}>`
	width: 100%;
	min-height: 50px;
	border: 1px solid #e6e6e6;
	border-left: none;
	cursor: pointer;
	background-color: ${(p) => (p.changeBg ? '#ebecff' : 'white')};
	&:hover {
		background-color: #ebecff;
	}
`;

interface Props {
	content: string;
}

const TimeWrapper = styled.div<Props>`
	display: flex;
	position: relative;
	&:before {
		content: '${({content}) => content}';
		font-size: 13px;
		display: flex;
		align-items: center;
	}
`;

const BoxesWrapper = styled.div``;

const Footer = styled.div`
	background-color: #f6f6f6;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 30px;
	padding: 0 40px;
`;

const TodayBtn = styled.div`
	color: #fe3e3e;
	cursor: pointer;
`;

const DeleteBtn = styled.div`
	color: #fd4545;
	cursor: pointer;
`;

const Calendar: React.FunctionComponent = (): React.ReactElement => {
	const {weekNumber, currentWeek, monthNumber, year} = useAppSelector(
		(state) => state.calendar
	);
	const dispatch = useAppDispatch();
	const [event, setEvent] = useState<IEvent>({} as IEvent);
	const [isEvent, setIsEvent] = useState<boolean>(false);
	const [showDelete, setShowDelete] = useState<boolean>(false);
	const [dayChosen, setDayChosen] = useState<string>(
		new Date().getDate().toString()
	);

	useEffect(() => {
		dispatch(setCurrentWeek());
	}, [weekNumber]);

	const handleNext = () => {
		dispatch(incrementWeek());
	};

	const handlePrev = () => {
		dispatch(decrementWeek());
	};

	const handleDay = (day: string) => {
		setDayChosen(day);
	};

	const addEvent = () => {
		const userEventTime = prompt('Enter event time:\nYYYY-MM-DD HH:mm:ss');
		if (!userEventTime) return;
		const year: number = parseInt(userEventTime.slice(0, 4));
		const month: number = parseInt(userEventTime.slice(5, 7)) - 1;
		const day: number = parseInt(userEventTime.slice(8, 10));
		const hour: number = parseInt(userEventTime.slice(11, 13));
		const myEvent: IEvent = {year, month, day, hour};
		setEvent(myEvent);
		setIsEvent(true);
	};

	const handleBoxClick = (day: number, time: string) => {
		setShowDelete(true);
	};

	const handleDelete = () => {
		setEvent({} as IEvent);
	};

	return (
		<Container>
			<Header>
				<Title>Interview Calendar</Title>
				<StyledHeaderIcon onClick={addEvent} icon={faPlus} />
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
							<Day onClick={() => handleDay(day.toString())} key={i}>
								<StyledTodaySpan>{day}</StyledTodaySpan>
							</Day>
						) : (
							<Day onClick={() => handleDay(day.toString())} key={i}>
								{day === 0 ? '' : day}
							</Day>
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
			<Main>
				<BoxesWrapper>
					{Time.map((time, i) => {
						return (
							<TimeWrapper content={time} key={i}>
								{currentWeek.map((day, i) => {
									return (
										<Box
											changeBg={
												year === event.year &&
												monthNumber === event.month &&
												day === event.day &&
												parseInt(time) === event.hour
													? isEvent
													: false
											}
											onClick={() => handleBoxClick(day, time)}
											key={i}
										/>
									);
								})}
							</TimeWrapper>
						);
					})}
				</BoxesWrapper>
			</Main>
			<Footer>
				<TodayBtn>Today</TodayBtn>
				{showDelete && <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>}
			</Footer>
		</Container>
	);
};

export default Calendar;
