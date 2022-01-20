import React from 'react';
import APIClient from '../APIs/APIClient';
import TourForm from '../components/Forms/TourForm';

function AddTour(props) {
    const handleAddTour = async (data) => {
        let formData = new FormData();
        for (let key in data) {
            if (key == 'imageUrl') {
                formData.append('imageUrl', data[key][0])
            }
            else formData.append(key, data[key])
        }
        await APIClient.createTour(formData);
    }

    return (
        <div className='add-tour-wrapper'>
            <TourForm handleAddTour={handleAddTour}/>
        </div>
    );
}

export default AddTour;