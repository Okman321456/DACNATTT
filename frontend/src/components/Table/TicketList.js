import { MenuItem, Select } from '@material-ui/core';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Notification/Alert';
import ConfirmDialog from '../Notification/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import RegardPrice from '../RegardPrice/RegardPrice';

export default function TicketList({ updateTicketStatus, deleteTicket, listTickets}) {
    let navigate = useNavigate();

    const [dataTickets, setDataTickets] = useState(listTickets);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, content: '' })

    useEffect(async () => {
        setDataTickets(listTickets);
    }, [listTickets])

    const handleChangeStatus = async (e) => {
        let index = e.target.name;
        await updateTicketStatus(dataTickets[index].id, e.target.value);
    };
    const handleDelete = async (id, index) => {
        await deleteTicket(id);
        setDataTickets([...dataTickets.slice(0, index), ...dataTickets.slice(index + 1)]);
        setConfirmDialog({ isOpen: false, content: '' });
        Alert("success", "Success! Xóa Thành công");
    };

    return (
        <div className='list-manager' style={{ padding: '0 50px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead style={{backgroundColor:'#9e9e9eb3'}}>
                        <TableRow>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>STT</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Tên tour</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Ngày đặt</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}} >Khách hàng</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}} >Số lượng</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>SĐT</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Email</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Tổng thanh toán</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}} >Trạng thái</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}} >Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTickets && dataTickets.map((ticket, index) => (
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
                                <TableCell align="center">{`₫ ${RegardPrice(ticket.totalPrice)}`}</TableCell>
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    <Select
                                        // value={status ? status[index].status : ticket.status}
                                        onChange={handleChangeStatus}
                                        name={`${index}`}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        style={{ fontSize: '12px' }}
                                        defaultValue={ticket.status}
                                    >
                                        <MenuItem value={0} style={{ fontSize: '14px' }}>Đang chờ</MenuItem>
                                        <MenuItem value={1} style={{ fontSize: '14px' }}>Đã xác nhận</MenuItem>
                                        <MenuItem value={2} style={{ fontSize: '14px' }}>Đã thanh toán</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="center">

                                    <DeleteIcon variant="outlined" style={{color:'tomato', cursor:'pointer'}} size="small" onClick={() => setConfirmDialog({
                                        isOpen: true,
                                        content: 'Bạn có muốn xóa vé này?',
                                        onConfirm: () => { handleDelete(ticket._id, index) }
                                    })}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            >
            </ConfirmDialog>
        </div>
    );
}