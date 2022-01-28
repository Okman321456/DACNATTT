import React from 'react';
import APIClient from '../APIs/APIClient';
import TourForm from '../components/Forms/TourForm';
import Alert from '../components/Notification/Alert';
import {useNavigate} from 'react-router-dom';

function AddTour(props) {
    const navigate = useNavigate();
    const handleAddTour = async (data) => {
        let formData = new FormData();
        for (let key in data) {
            if (key == 'imageUrl') {
                formData.append('imageUrl', data[key][0])
            }
            else formData.append(key, data[key])
        }
        const res = await APIClient.createTour(formData);
        if(res.response.status === 201 ){
            navigate('/quan-li-tour');
            Alert("success", "Success! Thêm tour thành công!");
        }
    }

    return (
        <div className='add-tour-wrapper'>
            <TourForm handleAddTour={handleAddTour}/>
        </div>
    );
}

export default AddTour;