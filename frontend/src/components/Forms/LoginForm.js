import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

// const schema = yup.object().shape({
//     category: yup.string().required()
//   });

const styleForm = {
    flexDirection: 'column',
    alignItems: 'start'
}
function LoginForm(props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = (data) => {
        console.log(data);
        reset();
    };
    return (
        <div className='login-form-wrapper' style={{ marginTop: '120px' }}>
            <h2 style={{ fontWeight: 'bold' }}>ĐĂNG NHẬP</h2>
            <div className='form-box' style={{ maxWidth: '300px', margin: 'auto' }}>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='form-group mb-2' style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Tên đăng nhập: </label>
                        <input {...register("username",
                            {
                                required:"* Vui lòng nhập tên đăng nhập",
                            })}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Tên đăng nhập...' />
                        {errors.username && <div className="alert">{errors.username.message}</div>}
                    </div>
                    <div className="form-group mb-2" style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Mật khẩu: </label>
                        <input
                            {...register("password",
                            {
                                required:'* Vui lòng nhập mật khẩu',
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