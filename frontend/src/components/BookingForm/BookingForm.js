import { Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { actions, useStore } from '../../store';
import Alert from '../Notification/Alert';
import PriceDiscount from '../RegardPrice/PriceDiscount';
import './BookingForm.css';

// const schema = yup.object().shape({
//     name: yup
//         .string()
//         .required("Vui lòng nhập tên KH")
//         .max(50, "Tên tối đa 50 ký tự"),
//     phone: yup
//         .number()
//         .required("Vui lòng nhập SĐT")
//         .max(11, "SĐT không đúng"),
//     email: yup
//         .string()
//         .required("Vui lòng nhập mật khẩu")
//         .max(20, "mật khẩu tối đa 20 ký tự")
// });
function BookingForm(props) {
    const max = 5;//Gia su so luong con lai
    const [count, setCount] = useState(1);
    const [state, dispatch] = useStore();
    console.log(state.tourInfo)
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

    const onHandleSubmit = async (data) => {
        let body = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            numberPeople: data.numberPeople
        };
        // await APIClient.postBookingInfo(state.tourID, body);
        await axios({
            method: 'post',
            url: `http://localhost:3001/tickets/book/${state.tourInfo.id}`,
            data: {
                ...body
            }
        });

        dispatch(actions.setCloseForm());
        // dispatch(actions.setShowNofify(true));
        Alert("success", "Success! Đặt tour thành công!");
        reset();
    };
    return (
        <div className='booking-form-wrapper'>
            <div className='booking-box'>
                <form action="" onSubmit={handleSubmit(onHandleSubmit)} className='booking-form-body'>
                    <h3 style={{margin:0, padding:'0', fontWeight:'bold', color:'orange'}}>PHIẾU ĐẶT TOUR</h3>
                    <div className='form-group mb-2'>
                        <label className='label-title'>Tour của bạn: </label>
                        <input type="text" value={state.tourInfo.name} disabled />
                    </div>
                    <div className='form-group mb-2'>
                        <label className='label-title'>Tên của bạn: </label>
                        <input {...register("name", {
                            required: "* Vui lòng nhập tên KH",
                            maxLength: 50
                        })} />
                    </div>
                    {errors.name && <div className="alert">{errors.name.message}</div>}
                    <div className="form-group mb-2">
                        <label className='label-title'>Số lượng: </label>
                        <Controller
                            name="numberPeople"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                                <ButtonGroup size="small" style={{ width: '100px' }}>
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
                    <div style={{ textAlign: "left" }}>
                        <PriceDiscount valuePrice={state.tourInfo.price*count} valueDiscount={state.tourInfo.discount} />
                    </div>
                    <div className="form-group mb-2">
                        <label className='label-title'>Số điện thoại: </label>
                        <input {...register("phone", {
                            required: "* Vui lòng nhập SĐT!",
                            maxLength: {
                                value: 11,
                                message: "* SĐT không đúng!"
                            },
                            minLength: {
                                value: 10,
                                message: "* SĐT không đúng!"
                            },
                        })} />
                    </div>
                    {errors.phone && <div className="alert">{errors.phone.message}</div>}
                    <div className="form-group mb-2">
                        <label className='label-title'>Email: </label>
                        <input {...register("email", {
                            required: "* Vui lòng nhập email!",
                            pattern: {
                                value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                                message: "* Email không đúng!"
                            }
                        })} />
                    </div>
                    {errors.email && <div className="alert">{errors.email.message}</div>}
                    <div className="form-group mb-2" style={{flexDirection:'row'}}>
                            <Button type="submit" variant='contained' style={{ margin: '0 10px', backgroundColor:'orange', color:'white'}}>XÁC NHẬN</Button>
                            <Button variant='contained' style={{ margin: '0 10px', backgroundColor:'orange', color:'white'}} onClick={() => { dispatch(actions.setCloseForm()) }}>HỦY</Button>
                    </div>
                </form>
            </div>
            <div className='booking-black-screen' />
        </div>
    );
}

export default BookingForm;