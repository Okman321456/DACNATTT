import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIClient from '../APIs/APIClient';
import TourForm from '../components/Forms/TourForm';

function UpdateTour(props) {
    const { id } = useParams();
    console.log(id)
    const [data, setData] = useState();
    useEffect(async ()=>{
        const result = await axios(`http://localhost:3001/tour/${id}`);
        console.log(result.data.tour)
        setData(result.data)
    },[])
    const handleUpdateTour = async (data)=>{
        console.log(data)
        let formData = new FormData();
        for (let key in data) {
            if (key == 'imageUrl') {
                formData.append('imageUrl', data[key][0])
                console.log(data[key][0])
            }
            else formData.append(key, data[key])
        }
        const res = await APIClient.updateTour(id,formData);
    }
    return (
        <div>
            <TourForm handleAddTour={handleUpdateTour} tour={data && data.tour}/>
        </div>
    );
}

export default UpdateTour;