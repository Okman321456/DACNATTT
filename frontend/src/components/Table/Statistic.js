import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem, Select, TextField } from '@material-ui/core';
import ConfirmDialog from '../Notification/ConfirmDialog';
import RegardPrice from '../RegardPrice/RegardPrice';

export default function Statistic({list}) {
    // let navigate = useNavigate();

    const [dataStatistic, setDataStatistic] = useState(list.data);
    const [totalPrice, setTotalPrice] = useState(list.totalPrice);
    // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, content: '' })

    useEffect(async () => {
        setDataStatistic(list.data);
        setTotalPrice(list.totalPrice);
    }, [list])

    return (
        <div className='list-manager' style={{ padding: '0 50px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >STT</TableCell>
                            <TableCell >Tên khách </TableCell>
                            <TableCell >Tên tour </TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell align="center" >Ngày thanh toán</TableCell>
                            <TableCell align="center" >Số lượng</TableCell>
                            <TableCell align="center" >Trạng thái</TableCell>
                            <TableCell align="center">Tổng tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataStatistic && dataStatistic.map((data, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    Tên khách
                                    {/* {data.tourName} */}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Tên tour
                                    {/* {data.tourName} */}
                                </TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell align="center">
                                    ngày thanh toán    
                                    {/* {new Date(data.updatedAt.slice(0, 10)).toLocaleDateString("en-GB")} */}
                                </TableCell>
                                <TableCell align="center">
                                    5
                                    {/* {data.numberPeople} */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    &#10004;Đã thanh toán
                                </TableCell>
                                <TableCell align="center">
                                    {`${RegardPrice(data.price)} VNĐ`}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center"></TableCell>
                                <TableCell component="th" scope="row"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center" sx={{ minWidth: '100px', color:'orange' }}>Tổng doanh thu:</TableCell>
                                <TableCell align="center" sx={{color:'tomato'}}>
                                    {`${RegardPrice(totalPrice)} VNĐ`}
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}