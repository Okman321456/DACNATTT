import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIClient from '../APIs/APIClient';
import TicketList from '../components/Table/TicketList';

function ManageTicketsTour(props) {
    const { id } = useParams();
    const [listTickets, setListTickets] = useState([]);
    
    useEffect(async()=>{
        const rs = await APIClient.getListTicketsTour(id);
        setListTickets(rs.tickets);
    },[]);

    return (
        <div className='manage-ticket-wrapper' style={{marginTop:'100px'}}>
            <h2>DANH SÁCH VÉ</h2>
            <TicketList listTickets={listTickets}/>
        </div>
    );
}

export default ManageTicketsTour;