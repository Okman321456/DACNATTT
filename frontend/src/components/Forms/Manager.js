import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';
import { Button } from '@material-ui/core';
import APIClient from '../../APIs/APIClient';
import Alert from '../Notification/Alert';

function Manager(props) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const onHandleSubmit = async (data) => {
        const res = await APIClient.createManager(data);
        if(!res.response) Alert("success","Success! Thêm nhân viên thành công");
        else Alert("error","Success! Thông tin chưa dúng");
        reset();
    };
    return (
        <div className='manager-form-wrapper' style={{ marginTop: '90px' }}>
            <form action="" onSubmit={handleSubmit(onHandleSubmit)} className='manager-form-body'>
                <h2>THÔNG TIN QUẢN LÍ</h2>
                <div className='form-group mb-2'>
                    <label className='label-title'>Tên quản lý (*): </label>
                    <input {...register("name", {
                        required: "* Vui lòng nhập quản lí",
                        maxLength: 50,
                        minLength:{
                            value: 5,
                            message:"(*) Tên quá ngắn"
                        }
                    })} />
                </div>
                {errors.name && <div className="alert">{errors.name.message}</div>} 
                <div className="form-group mb-2">
                    <label className='label-title'>SĐT (*): </label>
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
                    <label className='label-title'>Email (*): </label>
                    <input {...register("email", {
                        required: "* Vui lòng nhập email!",
                        pattern: {
                            value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                            message: "* Email không đúng!"
                        }
                    })} />
                </div>
                {errors.email && <div className="alert">{errors.email.message}</div>}
                <div className="form-group mb-2">
                    <label className='label-title'>Mật khẩu (*): </label>
                    <input type="password" {...register("password", {
                        required: "* Vui lòng nhập email!",
                        minLength:{
                            value:6,
                            message:"* Mật khẩu quá ngắn",
                        },
                        maxLength:{
                            value:14,
                            message:"* Mật khẩu quá dài",
                        }
                    })} />
                </div>
                {errors.password && <div className="alert">{errors.password.message}</div>}
                <div className="form-group mb-2" style={{justifyContent:'center'}}>
                    <div className="form-group mb-2" style={{alignItems:'center'}}>
                        <Button type='submit' color="primary" variant="contained" style={{width:'70px', backgroundColor:'orange'}}>Lưu</Button>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default Manager;