import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import APIClient from '../../APIs/APIClient';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';

export default function TicketList({ listTickets }) {
    let navigate = useNavigate();
    // const [listTickets, setListTickets] = useState()
    const [status, setStatus] = useState(false);
    
    useEffect(()=>{
        setStatus(listTickets)
        console.log(status)
    },[])

    const handleChangeStatus = (e)=>{
        e.preventDefault()
        let index = e.target.name 
        console.log(index)
        setStatus(preStatus=>[...preStatus.slice(0,index),{...preStatus[index], status: e.target.value},...preStatus.slice(index)])
    }

    return (
        <div className='list-manager' style={{ padding: '0 50px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >STT</TableCell>
                            <TableCell >Tên tour</TableCell>
                            <TableCell >Ngày đặt</TableCell>
                            <TableCell align="center" >Khách hàng</TableCell>
                            <TableCell align="center" >Số lượng</TableCell>
                            <TableCell align="center">SĐT</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center" >Trạng thái</TableCell>
                            <TableCell align="center" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listTickets && listTickets.map((ticket, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {ticket.tourName}
                                </TableCell>
                                <TableCell align="center">{new Date(ticket.createdAt).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell align="center">{ticket.name}</TableCell>
                                <TableCell align="center">{ticket.numberPeople}</TableCell>
                                <TableCell align="center">{ticket.phone}</TableCell>
                                <TableCell align="center">{ticket.email}</TableCell>
                                <TableCell align="center" sx={{minWidth:'100px'}}>
                                    <Select
                                        // value={status ? status[index].status : ticket.status}
                                        onChange={handleChangeStatus}
                                        name={`${index}`}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        style={{fontSize:'12px'}}
                                        defaultValue={ticket.status}
                                    >
                                        <MenuItem value={0} style={{fontSize:'14px'}}>Đang chờ</MenuItem>
                                        <MenuItem value={1} style={{fontSize:'14px'}}>Đã xác nhận</MenuItem>
                                        <MenuItem value={2} style={{fontSize:'14px'}}>Đã thanh toán</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color='primary' size="small">XÓA</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
