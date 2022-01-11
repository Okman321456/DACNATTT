import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios';
import './Form.css';


const Regions = ['Bắc', 'Trung', 'Nam'];
const Types = ["Núi", "Biển", "Đảo", "Văn Hóa", "Sông Nước"];
const Discounts = ["20%", "40%", "50%", "70%"]

function AddTourForm(props) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(new Date());
    const [imagePreview, setImagePreview] = React.useState();
    
    useEffect(()=>{
        return ()=>{
            imagePreview && URL.revokeObjectURL(imagePreview.preview);
        }
    },[imagePreview]);

    const handleChangePreview = (e)=>{
        const file = e.target.files[0];
        if(file) file.preview = URL.createObjectURL(file);
        setImagePreview(file); 
    };

    const onHandleSubmit = async (data) => {
        console.log(data);
        let formData = new FormData();
        for (let key in data) {
            if (key == 'imageUrl') {
                formData.append('imageUrl', data[key][0])
                console.log(data[key][0])
            }
            else formData.append(key, data[key])
        }
        console.log(formData.get("name"))
        await  axios.post('http://localhost:3001/create',formData)
    };
    return (
        <div className='create-tour-form-wrapper' style={{ marginTop: '120px' }}>
            <form className='create-tour-formbody' action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                <div className='form-group mb-2'>
                    <label>name: </label>
                    <input {...register("name", {
                        required: "* Nhập tên tour.",
                        maxLength: {
                            value: 100,
                            message: '* Nhập tên quá dài.'
                        }
                    })} />
                    {errors.name && <div className="alert">{errors.name.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Description: </label>
                    <textarea style={{ height: '150px' }}  {...register("description", {
                        minLength: {
                            value: 20,
                            message: "* Nhập thêm thông tin mô tả",
                        },
                        maxLength: {
                            value: 1024,
                            message: "* Mô tả quá dài!"
                        }
                    })} />
                    {errors.description && <div className="alert">{errors.description.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Price: </label>
                    <input type='text' {...register("price",
                        {
                            required: "* Nhập giá tiền",
                            min: {
                                value: 0,
                                message: "* Nhập lỗi"
                            },
                            max: {
                                value: 100000000,
                                message: "* Nhập lỗi"
                            },
                            pattern: {
                                value: /[0-9]/,
                                message: "* Nhập lỗi"
                            }
                        }
                    )} />
                    {errors.price && <div className="alert">{errors.price.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Region:</label>
                    <select {...register("region", { required: "* Chọn vùng miền" })} placeholder='category'>
                        <option value="" hidden>Choose...</option>
                        {
                            Regions.map((value, index) => (
                                <option value={index + 1} key={index}>{value}</option>
                            ))
                        }
                    </select>
                    {errors.region && <div className="alert">{errors.region.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Type:</label>
                    <select {...register("typePlace", { required: "* Chọn loại hình" })} placeholder='category'>
                        <option value="" hidden>Choose...</option>
                        {
                            Types.map((value, index) => (
                                <option value={value} key={index}>{value}</option>
                            ))
                        }
                    </select>
                    {errors.region && <div className="alert">{errors.region.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Typography sx={{ mt: 2, mb: 1 }}>Ngày bắt đầu</Typography>
                        <Controller
                            name="timeStart"
                            control={control}
                            defaultValue={start}
                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="Start"
                                    value={start}
                                    minDate={new Date()}
                                    {...field}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                        setStart(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                        <Typography sx={{ mt: 2, mb: 1 }}>Ngày kết thúc</Typography>
                        <Controller
                            name="timeEnd"
                            control={control}
                            defaultValue={end}
                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="End"
                                    value={end}
                                    minDate={start}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                        setEnd(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <div className="form-group mb-2">
                    <label>Amount: </label>
                    <input type='text' {...register("amount",
                        {
                            required: "* Nhập giá số lượng",
                            min: {
                                value: 0,
                                message: "* Nhập lỗi"
                            },
                            max: {
                                value: 50,
                                message: "* Nhập lỗi"
                            },
                            pattern: {
                                value: /[0-9]/,
                                message: "* Nhập lỗi"
                            }
                        }
                    )} />
                    {errors.amount && <div className="alert">{errors.amount.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Discount:</label>
                    <select {...register("discount", { required: "* Chọn mức giảm giá" })} placeholder='discount'>
                        <option value={0}>0%</option>
                        {
                            Discounts.map((value, index) => (
                                <option value={parseFloat(value)} key={index}>{value}</option>
                            ))
                        }
                    </select>
                    {errors.discount && <div className="alert">{errors.discount.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Hotel: </label>
                    <input {...register("hotelName", {
                        required: "* Nhập tên khách sạn!",
                        minLength: {
                            value: 0,
                            message: "* Nhập sai",
                        },
                        maxLength: {
                            value: 100,
                            message: "* Tên quá dài!"
                        }
                    })} />
                    {errors.hotelName && <div className="alert">{errors.hotelName.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Lịch trình: </label>
                    <textarea type="text" style={{ height: '150px' }} {...register("schedule", {
                        required: "* Nhập lịch trình!",
                        minLength: {
                            value: 20,
                            message: "* Thêm thông tin lịch trình",
                        },
                        maxLength: {
                            value: 1024,
                            message: "* Thông tin quá dài!"
                        }
                    })} />
                    {errors.schedule && <div className="alert">{errors.schedule.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Image: </label>
                    <input type='file' {...register("imageUrl")} onChange={handleChangePreview}/>
                    {imagePreview && <img src={imagePreview.preview} alt="" width={200} />}
                </div>
                <div className="form-group mb-2">
                    <button type='submit'>CLICK</button>
                </div>
            </form>

        </div>
    );
}

export default AddTourForm;