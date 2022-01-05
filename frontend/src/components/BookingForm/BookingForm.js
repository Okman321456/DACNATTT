import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, ButtonGroup } from '@mui/material';
import './BookingForm.css'
import { useStore, actions } from '../../store';

const schema = yup.object().shape({
    category: yup.string().required()
});
function BookingForm(props) {
    const max = 5;//Gia su so luong con lai
    const [count, setCount] = useState(1);
    const [state, dispatch] = useStore();

    const handleIncrement = (onChange) => {
        let countNext = count + 1;
        onChange(countNext);
        setCount(countNext);
    }
    const handleDecrement = (onChange) => {
        let countNext = count - 1;
        onChange(countNext);
        setCount(countNext);
    }
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(schema)
    });
    const [textValue, setTextValue] = React.useState('test');
    const onHandleSubmit = (data) => {
    console.log({...data, _id:state.tourID});
        reset();
    };
    return (
        <div className='booking-form-wrapper'>
            <div className='booking-box'>
                <form action="" onSubmit={handleSubmit(onHandleSubmit)} className='booking-form-body'>
                    <h4>PHIẾU ĐẶT TOUR</h4>
                    <div className='form-group mb-2'>
                        <label className='label-title'>Tên KH: </label>
                        <input {...register("name")} />
                    </div>
                    <div className="form-group mb-2">
                        <label className='label-title'>Số lượng: </label>
                        <Controller
                            name="numberPeople"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                                <ButtonGroup size="small">
                                    <Button disabled={count <= 1}
                                        {...field}
                                        onClick={() => handleDecrement(field.onChange)}
                                    >
                                        -</Button>
                                    <Button disabled>{count}</Button>
                                    <Button disabled={count >= max}
                                        {...field}
                                        onClick={() => handleIncrement(field.onChange)}
                                    >+</Button>
                                </ButtonGroup>
                            )}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className='label-title'>SĐT: </label>
                        <input {...register("phone")} />
                    </div>
                    <div className="form-group mb-2">
                        <label className='label-title'>Email: </label>
                        <input {...register("Email")} />
                    </div>
                    <div className="form-group mb-2">
                        <button type='submit' style={{ margin: 'auto' }}>XÁC NHẬN</button>
                        <button style={{ margin: 'auto' }} onClick={()=>{dispatch(actions.setCloseForm())}}>HỦY</button>
                    </div>
                </form>
            </div>
            <div className='booking-black-screen' />
        </div>
    );
}

export default BookingForm;