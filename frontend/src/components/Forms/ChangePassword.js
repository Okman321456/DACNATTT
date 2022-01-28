import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import APIClient from '../../APIs/APIClient';
import { useStore, actions } from '../../store';
import { Link, useNavigate } from 'react-router-dom';

const styleForm = {
    flexDirection: 'column',
    alignItems: 'start',
    textAlign: 'left',
    paddingTop: '10px'
}
function ChangePassword({handleChangePassword}) {
    let navigate = useNavigate();
    const [state, dispatch] = useStore()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data) => {
        await handleChangePassword(data);
    };
    return (
        <div className='change-password-form-wrapper' style={{ marginTop: '120px' }}>
            <h2 style={{ fontWeight: 'bold', color: 'orange', margin: '10px 0 auto' }}>ĐỔI MẬT KHẨU</h2>
            <div className='form-box' style={{ maxWidth: '300px', margin: 'auto' }}>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='form-group-change-password mb-2' style={styleForm}>
                        <label style={{ lineHeight: '30px', fontWeight: 'bold' }}>Mật khẩu mới: </label>
                        <input {...register("newpass",
                            {
                                required: "* Vui lòng nhập password",
                                pattern: {
                                    // value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                                    message: "* password không đúng!"
                                }
                            })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Mật khẩu mới...'
                            type="password"
                        />
                        {errors.newpass && <div className="alert">{errors.newpass.message}</div>}
                    </div>
                    <div className='form-group-change-password mb-2' style={styleForm}>
                        <label style={{ lineHeight: '30px', fontWeight: 'bold' }}>Xác nhận mật khẩu: </label>
                        <input {...register("confirmpass",
                            {
                                required: "* Vui lòng nhập password",
                                pattern: {
                                    // value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                                    message: "* password không đúng!"
                                }
                            })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Xác nhận mật khẩu mới...'
                            type="password" />
                        {errors.confirmpass && <div className="alert">{errors.confirmpass.message}</div>}
                    </div>
                    <div className="form-group-login mb-2" style={styleForm}>
                        <label style={{ lineHeight: '30px', fontWeight: 'bold' }}> Mật khẩu cũ: </label>
                        <input
                            type="password"
                            {...register("oldpass",
                                {
                                    required: '* Vui lòng nhập mật khẩu',
                                })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Mật khẩu...' />
                        {errors.oldpass && <div className="alert">{errors.oldpass.message}</div>}
                    </div>
                    <div className="form-group-login mb-2" style={styleForm}>
                        <Button type='submit' variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                            Lưu thay đổi
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;