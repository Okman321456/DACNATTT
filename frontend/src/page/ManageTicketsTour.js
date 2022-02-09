import { Box, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import frLocale from 'date-fns/locale/fr';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIClient from '../APIs/APIClient';
import TicketList from '../components/Table/TicketList';
import { actions, useStore } from '../store';

function ManageTicketsTour(props) {
    const { id } = useParams();
    const [listTickets, setListTickets] = useState([]);
    const [value, setValue] = useState(null);
    const [state, dispatch] = useStore();
    const [searchValue, setSearchValue] = React.useState()

    useEffect(async () => {
        dispatch(actions.setLoading(true));
        document.title = "Bootcamp Travel | Quản lí vé";
        setTimeout(() => {
            dispatch(actions.setLoading(false));
        }, 5000);
        const rs = await APIClient.getListTicketsTour(id);
        setListTickets(rs.tickets);
        dispatch(actions.setLoading(false));
    }, []);

    const handleUpdateTicketStatus = async (idTicket, idStatus) => {
        const res = await APIClient.updateStatusTicket(idTicket, idStatus);
    }
    const handleDeleteTicket = async (id) => {
        const res = await APIClient.deleteTicket(id);
    }
    const handleChangeDate = async (newValue) => {
        // let date = new Date(newValue).toLocaleDateString('ko-KR', {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        // });
        // let dateFormat = date.replaceAll(". ", "-").slice(0, -1);
        // const res = await APIClient.filterTicketsPerDate(dateFormat);
        // console.log(res)
        // setListTickets(res.tickets);
        // setValue(newValue);
    };

    const onClickSearch = async ()=>{
        const result = await APIClient.searchTicketByPhone(searchValue);
        // console.log(result)
        setListTickets(result);
        setValue(null);
    }

    return (
        <div className='manage-ticket-wrapper' style={{ marginTop: '100px' }}>
            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, marginRight: '20px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Số điện thoại..."
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon onClick={onClickSearch} />
                    </IconButton>
                </Paper>
                <div style={{ marginRight: '30px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                        <DesktopDatePicker
                            label="Theo ngày đặt"
                            value={value}
                            format="DD-MM-YYYY"
                            onChange={(newValue) => handleChangeDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </Box>
            <h2>DANH SÁCH VÉ</h2>
            <TicketList
                listTickets={listTickets}
                updateTicketStatus={handleUpdateTicketStatus}
                deleteTicket={handleDeleteTicket}
            />
        </div>
    );
}

export default ManageTicketsTour;