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

export default function ManagerList() {
    let navigate = useNavigate();
    const [users, setUsers] = useState()
    const [load, onLoad] = useState(true)
    useEffect(async () => {
        const result = await APIClient.getAllManager();
        console.log(result)
        setUsers(result);
    }, [load]);

    const handleUpdate = (id) => {
        navigate(`/cap-nhat-nhan-vien/${id}`)
    };
    const handleDelete = async (id) => {
        let res = await APIClient.deleteManager(id);
        onLoad(!load);
    };

    return (
        <div className='list-manager' style={{ marginTop: '120px', padding: '0 50px' }}>
            <h2>DANH SÁCH QUẢN LÝ</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >STT</TableCell>
                            <TableCell >Tên nhân viên</TableCell>
                            <TableCell align="center" >SĐT</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup variant="outlined" color='primary' size="small" aria-label="outlined button group">
                                        <Button size="small" onClick={() => handleUpdate(user._id)}>CẬP NHẬT</Button>
                                        <Button size="small" onClick={() => handleDelete(user._id)} >XÓA</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
