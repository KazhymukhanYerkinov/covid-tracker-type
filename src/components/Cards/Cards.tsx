import React from 'react';

import {
	Card,
	CardContent,
	Typography,
	Grid,
	CircularProgress
} from '@material-ui/core';

import CountUp from 'react-countup';
import cx from 'classnames';

import { ResponseData } from '../../api/types';

import styles from './Cards.module.css';


const formatDate = (date?: Date): string => {
	if (!date) {
		return ''
	}
	return new Date(date).toDateString()
}

const styled = (type: string): Array<string> => {
	switch (type) {
		case 'infected':
			return [styles.card, styles.infected]
		case 'deaths':
			return [styles.card, styles.deaths]
		default:
			return [styles.card, styles.recovered]
	}
}


interface ItemProps {
	title: string;
	type: string;
	value: number;
	date?: Date;
}
const CardFor = ({ title, type, value, date }: ItemProps): JSX.Element => {
	const formatedDate = formatDate(date || new Date());

	return (
		<Grid item component={Card} xs={12} md={3} className={cx(styled(type))}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{title}
				</Typography>
				<Typography variant="h5">
					<CountUp start={0} end={value} duration={2.5} separator=","></CountUp>
				</Typography>
				<Typography color="textSecondary">
					{formatedDate}
				</Typography>
				<Typography>
					Number of active cases of COVID-19
				</Typography>
			</CardContent>
		</Grid>
	)
}


interface Props {
	data: ResponseData
}
const Cards: React.FC<Props> = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
	if (!confirmed) {
		return <CircularProgress />
	}
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<CardFor
					title="Infected"
					type="infected"
					value={confirmed.value}
					date={lastUpdate}
				/>
				<CardFor
					title="Recovered"
					type="recovered"
					value={recovered.value}
					date={lastUpdate}
				/>
				<CardFor
					title="Deaths"
					type="deaths"
					value={deaths.value}
					date={lastUpdate}
				/>
			</Grid>
		</div>
	)
}

export default Cards;