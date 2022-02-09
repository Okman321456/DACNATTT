import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import FlightIcon from '@mui/icons-material/Flight';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import { default as React, useEffect, useState } from 'react';
import APIClient from '../APIs/APIClient';
import RegardPrice from '../components/RegardPrice/RegardPrice';
import Statistic from '../components/Table/Statistic';
import { useStore } from '../store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const months = [
    {
        value: '1', label: 'Tháng 1'
    },
    {
        value: '2', label: 'Tháng 2'
    },
    {
        value: '3', label: 'Tháng 3'
    },
    {
        value: '4', label: 'Tháng 4'
    },
    {
        value: '5', label: 'Tháng 5'
    },
    {
        value: '6', label: 'Tháng 6'
    },
    {
        value: '7', label: 'Tháng 7'
    },
    {
        value: '8', label: 'Tháng 8'
    },
    {
        value: '9', label: 'Tháng 9'
    },
    {
        value: '10', label: 'Tháng 10'
    },
    {
        value: '11', label: 'Tháng 11'
    },
    {
        value: '12', label: 'Tháng 12'
    },
]

const styleCard = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    borderRadius: '5px',
    padding: '20px'
}

const styleTitle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
}

const calTotal = (obj) => {
    let sum = 0;
    for (let i in obj) {
        sum = sum + obj[i];
    }
    return sum
}

const calTotalPeople = (arr, key) => {
    let total = 0;
    if (typeof arr === 'object')
        total = arr.reduce((sum, cur) => {
            return sum + cur[key];
        }, 0);
    return total
}
const calTotalTour = (arr, key) => {
    if (typeof arr === 'object')
        return arr.length
}
const setDataChart = (obj) => {
    const data = [];
    for (let i in obj) {
        data.push(obj[i]);
    }
    return data;
}

function StatisticPerMonth(props) {
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [state, dispatch] = useStore();

    useEffect(async () => {
        const rs = await APIClient.getStatistic(month + 1);
        setData(rs);
    }, [month]);

    useEffect(async () => {
        document.title = "Bootcamp Travel | Thống kê";
        const total = await APIClient.getTotalStatistic();
        setTotalData(total);
    }, [])

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
    }

    return (
        <div className='manage-ticket-wrapper' style={{ marginTop: '100px' }}>
            {totalData &&
                <div>
                    <Box sx={{ margin: '0 10px' }}>
                        <h2 style={{ margin: 0, color: 'cornflowerblue', padding: '10px 0' }}>THỐNG KÊ TỪ ĐẦU NĂM:  </h2>
                        <Grid container>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="div">{RegardPrice(calTotal(totalData.region))}</Typography>
                                        <Typography variant='h5' component="div">Doanh thu</Typography>
                                    </div>
                                    <PaidIcon fontSize='large' />
                                </div>
                            </Grid>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="body1">{calTotalPeople(totalData.result, 'totalPeople')}</Typography>
                                        <Typography variant='h5' component="body1">Khách hàng</Typography>
                                    </div>
                                    <PersonIcon fontSize='large' />
                                </div>

                            </Grid>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="div">{calTotalTour(totalData.result)}</Typography>
                                        <Typography variant='h5' component="body1">Tour</Typography>
                                    </div>
                                    <FlightIcon fontSize='large' />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
                        <h2 style={{ margin:'20px 0 0', color: 'cornflowerblue', padding: '10px 0' }}>TỔNG DOANH THU THEO MIỀN:  </h2>
                        <Doughnut data={{
                            maintainAspectRatio: false,
                            responsive: false,
                            labels: ["Miền bắc", "Miền trung", "Miền Nam"],
                            datasets: [
                                {
                                    data: [...setDataChart(totalData.region)],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    hoverBackgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                }
                            ],
                            borderWidth: 1,
                        }}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'right'
                                    }
                                }
                            }}
                        />
                    </Box>
                </div>
            }
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <h2 style={{ margin:0, color: 'cornflowerblue'}}>BẢNG THỐNG KÊ DOANH THU THEO:  </h2>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '30px' }}>
                        <FormControl>
                            <Select
                                labelId="select-month-label"
                                id="demo-simple-select"
                                value={month}
                                label="Age"
                                onChange={handleChangeMonth}
                                style={{ width: '140px', fontSize: '22px', color: 'cornflowerblue', fontFamily: 'Roboto Mono' }}
                            >
                                {
                                    months.map((m, index) => (
                                        <MenuItem key={index} value={`${index}`}>{m.label.toLocaleUpperCase()}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            </div>
            <Statistic
                list={data}
            />
        </div>
    );
}

export default StatisticPerMonth;