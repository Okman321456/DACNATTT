import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useStore } from '../../store';

const styleForm = {
    flexDirection: 'column',
    alignItems: 'start',
    textAlign: 'left',
    paddingTop: '10px'
}
function ChangePassword({handleChangePassword}) {
    let navigate = useNavigate();
    const [state, dispatch] = useStore()

    const validationSchema = Yup.object().shape({
        newpass: Yup.string()
            .required('Vui lòng nhập mật khẩu')
            .min(5, 'Mật khẩu ít nhất 5 kí tự'),
        confirmpass: Yup.string()
            .required('Vui lòng xác nhận mật khẩu')
            .oneOf([Yup.ref('newpass')], 'Mật khẩu không khớp'),
        oldpass: Yup.string()
            .required('Vui lòng nhập mật khẩu')         
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm(formOptions);
    const onHandleSubmit = async (data) => {
        await handleChangePassword(data);
        reset();
    };
    return (
        <div className='change-password-form-wrapper' style={{ marginTop: '120px' }}>
            <h2 style={{ fontWeight: 'bold', color: 'orange', margin: '10px 0 auto' }}>ĐỔI MẬT KHẨU</h2>
            <div className='form-box' style={{ maxWidth: '300px', margin: 'auto' }}>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='form-group-change-password mb-2' style={styleForm}>
                        <label style={{ lineHeight: '30px', fontWeight: 'bold' }}>Mật khẩu mới: </label>
                        <input
                            name='newpass'
                            {...register("newpass")}
                            style={{ height: '30px', width: '100%' }}
                            placeholder='Mật khẩu mới...'
                            type="password"
                        />
                        {errors.newpass && <div className="alert">{errors.newpass.message}</div>}
                    </div>
                    <div className='form-group-change-password mb-2' style={styleForm}>
                        <label style={{ lineHeight: '30px', fontWeight: 'bold' }}>Xác nhận mật khẩu: </label>
                        <input 
                            {...register("confirmpass")}
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