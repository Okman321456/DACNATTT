import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { default as React, useEffect, useState } from 'react';
import APIClient from '../APIs/APIClient';
import Statistic from '../components/Table/Statistic';
import { actions, useStore } from '../store';

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

function StatisticPerMonth(props) {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [state, dispatch] = useStore();

    useEffect(async () => {
        const rs = await APIClient.getStatistic(month + 1);
        setData(rs);
    }, [month]);

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
    }

    return (
        <div className='manage-ticket-wrapper' style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <h2 style={{ margin: 0, color: 'cornflowerblue' }}>BẢNG THỐNG KÊ DOANH THU THEO:  </h2>
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