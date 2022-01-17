import React, { useEffect, useState } from 'react';
import APIClient from '../APIs/APIClient';
import TicketList from '../components/Table/TicketList';

function ManageTickets(props) {

    const [listTickets, setListTickets] = useState([]);
    
    useEffect(async()=>{
        const rs = await APIClient.getAllTicket();
        setListTickets(rs);
    },[]);

    return (
        <div className='manage-ticket-wrapper' style={{marginTop:'100px'}}>
            <h2>DANH SÁCH VÉ</h2>
            <TicketList listTickets={listTickets}/>
        </div>
    );
}

export default ManageTickets;