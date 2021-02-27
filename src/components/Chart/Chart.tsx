import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css';

import { fetchDailyData } from '../../api';
import { ResponseData, ResponseDailyData } from '../../api/types';

interface Props {
    data: ResponseData
}

const Chart: React.FC<Props> = ({ data: { confirmed, recovered, deaths, country } }) => {
    const [ dailyData, setDailydata ] = useState<Array<ResponseDailyData>>([]);

    React.useEffect(() => {
        async function fetchAPI(): Promise<void> {
            const response = (await fetchDailyData()) as Array<ResponseDailyData>
            setDailydata(response);
        }
        
        fetchAPI();
    }, [])

    if (!dailyData || !dailyData.length) {
        return <CircularProgress />
    }

    console.log(dailyData);
    const labelsDates: string[] = dailyData.map((d) => d.reportDate) || []
    const labelsConfirmed: number[] = dailyData.map((d) => d.confirmed.total) || []
    const labelsDeaths: number[] = dailyData.map((d) => d.deaths.total) || []

    const lineChart = dailyData.length ? (
        <Line
            data = {{
                labels: labelsDates,
                datasets: [
                    {
                        data: labelsConfirmed,
                        label: 'Infected',
                        borderColor: 'rgba(0, 0, 255, .5)',
                        fill: true
                    },
                    {
                        data: labelsDeaths,
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, .5)',
                        fill: true
                    }
                ]
                
            }}
        ></Line>
    ): null

    const barChart = confirmed ? (
        <Bar data = {{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 255, 255, 1)',    
                        'rgba(255, 0, 255, 1)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }
            ]
        }}
        options = {{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` }
        }}
        />
    ): null

    

    return (
        <div className = {styles.container}> { country ? barChart : lineChart } </div>
    )
}

export default Chart;