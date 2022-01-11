import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import APIClient from '../../APIs/APIClient';
import { useStore, actions } from '../../store';
import { Link, useNavigate } from 'react-router-dom';

const styleForm = {
    flexDirection: 'column',
    alignItems: 'start'
}
function LoginForm(props) {
    let navigate = useNavigate();
    const [state, dispatch] = useStore()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data) => {
        const res = await APIClient.login(data);
        console.log(res.permission);
        if (res.permission == 'admin') {
            dispatch(actions.setLogin('admin'));
            navigate('/admin');
        }
        console.log(state.role)
        reset();
    };
    return (
        <div className='login-form-wrapper' style={{ marginTop: '120px' }}>
            <h2 style={{ fontWeight: 'bold' }}>ĐĂNG NHẬP</h2>
            <div className='form-box' style={{ maxWidth: '300px', margin: 'auto' }}>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='form-group mb-2' style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Email: </label>
                        <input {...register("email",
                            {
                                required: "* Vui lòng nhập email",
                                pattern: {
                                    // value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                                    message: "* Email không đúng!"
                                }
                            })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='email...' />
                        {errors.email && <div className="alert">{errors.email.message}</div>}
                    </div>
                    <div className="form-group mb-2" style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Mật khẩu: </label>
                        <input
                            type="password"
                            {...register("password",
                                {
                                    required: '* Vui lòng nhập mật khẩu',
                                })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Mật khẩu...' />
                        {errors.password && <div className="alert">{errors.password.message}</div>}
                    </div>
                    <div className="form-group mb-2">
                        <Button type='submit' variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;