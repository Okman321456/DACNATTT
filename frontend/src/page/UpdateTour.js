import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import APIClient from '../APIs/APIClient';
import TourForm from '../components/Forms/TourForm';
import Alert from '../components/Notification/Alert';
import { actions, useStore } from '../store';

function UpdateTour(props) {
    let navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState();
    const [state, dispatch] = useStore()

    useEffect(async ()=>{
        dispatch(actions.setLoading(true));
        setTimeout(()=>{
            dispatch(actions.setLoading(false));
        },5000);
        const result = await axios(`http://localhost:3001/tour/${id}`);
        setData(result.data);
        dispatch(actions.setLoading(false));
    },[])
    const handleUpdateTour = async (data)=>{
        let formData = new FormData();
        for (let key in data) {
            if (key == 'imageUrl') {
                if(data[key].length > 0)
                formData.append('imageUrl', data[key][0])
            }
            else formData.append(key, data[key])
        }
        const res = await APIClient.updateTour(id,formData);
        navigate('/quan-li-tour');
        Alert("success", "Success! Cập nhật thông tin thành công!");
    }
    return (
        <div>
            <TourForm handleAddTour={handleUpdateTour} tour={data && data.tour}/>
        </div>
    );
}

export default UpdateTour;