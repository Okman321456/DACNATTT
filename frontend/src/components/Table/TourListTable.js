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
import Alert from '../Notification/Alert';
import ConfirmDialog from '../Notification/ConfirmDialog';
import FilterTourList from '../Filter/FilterTourList';
import { set } from 'react-hook-form';
import { useStore, actions } from '../../store';

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
    const [param, setParam] = React.useState();
    const [search, setSearch] = React.useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, content: '' })
    const [state, dispatch] = useStore();

    useEffect(async () => {
        let paramFilter = { page: pageNumber, ...param, search: search };
        dispatch(actions.setLoading(true));
        setTimeout(() => {
            dispatch(actions.setLoading(false));
        }, 5000);
        const result = await APIClient.getResultFilter(paramFilter);

        if (result.response) {
            setTourList();
        }
        else setTourList(result);
        dispatch(actions.setLoading(false));
    }, [load, pageNumber, param, search]);

    const handleUpdate = (id) => {
        navigate(`/cap-nhat-tour/${id}`);
    };
    const handleDelete = async (id) => {
        let res = await APIClient.deleteTour(id);
        onLoad(!load);
        Alert("success", "Success! Xóa tour thành công!")
    };
    const handleClickDetail = (id) => {
        navigate(`/quan-li-ve-tour/${id}`);
    }
    const handleChangePage = (event, value) => {
        setPageNumber(value);
    };
    const handleFilterTourList = (data) => {
        setSearch('');
        let param = {
            dis: data.dis,
            region: data.region,
            min: data.price[0],
            max: data.price[1],
            type: data.type
        }
        if (param.dis === false) {
            delete param.dis;
        }
        console.log(param)
        setParam({ ...param });
    }
    const handleSearchTourList = (text) => {
        setSearch(text);
    }
    return (
        <div className='list-manager' style={{ marginTop: '120px', padding: '0 50px' }}>
            <FilterTourList handleFilter={handleFilterTourList} handleSearch={handleSearchTourList} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead style={{ backgroundColor: '#9e9e9eb3' }}>
                        <TableRow>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >STT</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} >Tên tour du lịch</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >Ngày bắt đầu</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center">Ngày kết thúc</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >Giá</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >Giảm giá</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >Miền</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" >Loại hình</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center" ></TableCell>
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
                                <TableCell align="center">{`${tour.discount * 100}%`}</TableCell>
                                <TableCell align="center">{RegionsString[tour.region]}</TableCell>
                                <TableCell align="center">{tour.typePlace}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup variant="outlined" color='primary' size="small" aria-label="outlined button group">
                                        <Button key='1' onClick={() => handleUpdate(tour._id)}>Cập nhật</Button>
                                        <Button key='2' onClick={() => setConfirmDialog({
                                            isOpen: true,
                                            content: 'Bạn có muốn xóa tour này?',
                                            onConfirm: () => { handleDelete(tour._id) }
                                        })}>Xóa</Button>
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
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            >
            </ConfirmDialog>
        </div>
    );
}