import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import APIClient from '../../APIs/APIClient';
import { useNavigate } from 'react-router-dom';
import RegardPrice from '../RegardPrice/RegardPrice';
import { Pagination, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const RegionsString = {
    1: "Bắc",
    2: "Trung",
    3: "Nam"
}

export default function TourListTable() {
    let navigate = useNavigate();
    const [tourList, setTourList] = useState()
    const [load, onLoad] = useState(true)
    const [pageNumber, setPageNumber] = React.useState(1);

    useEffect(async () => {
        const result = await APIClient.getResultFilter({ page: pageNumber });
        console.log(result)
        setTourList(result);
    }, [load, pageNumber]);

    const handleUpdate = (id) => {
        navigate(`/cap-nhat-tour/${id}`);
    };
    const handleDelete = async (id) => {
        let res = await APIClient.deleteTour(id);
        onLoad(!load);
    };
    const handleClickDetail = (id) => {

    }
    const handleChangePage = (event, value) => {
        setPageNumber(value);
    };

    return (
        <div className='list-manager' style={{ marginTop: '120px', padding: '0 50px' }}>
            <h2>DANH SÁCH TOUR</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >STT</TableCell>
                            <TableCell >Tên tour du lịch</TableCell>
                            <TableCell align="center" >Ngày bắt đầu</TableCell>
                            <TableCell align="center">Ngày kết thúc</TableCell>
                            <TableCell align="center" >Giá</TableCell>
                            <TableCell align="center" >Miền</TableCell>
                            <TableCell align="center" >Loại hình</TableCell>
                            <TableCell align="center" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tourList && tourList.tours.map((tour, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {tour.name}
                                </TableCell>
                                <TableCell align="center">{new Date(tour.timeStart).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell align="center">{new Date(tour.timeEnd).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell align="center">{RegardPrice(tour.price)}</TableCell>
                                <TableCell align="center">{RegionsString[tour.region]}</TableCell>
                                <TableCell align="center">{tour.typePlace}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup variant="outlined" color='primary' size="small" aria-label="outlined button group">
                                        <Button key='1' onClick={() => handleUpdate(tour._id)}>Cập nhật</Button>
                                        <Button key='2' onClick={() => handleDelete(tour._id)}>Xóa</Button>
                                        <Button key='3' onClick={() => handleClickDetail(tour._id)}>Vé</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} sx={{ marginTop: '40px' }}>
                {
                    tourList && <Pagination count={Math.ceil(tourList.totalTourFilter / 6)} page={pageNumber} onChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center' }} />
                }
            </Stack>
        </div>
    );
}
