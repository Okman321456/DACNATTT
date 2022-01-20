import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import frLocale from 'date-fns/locale/fr';
import './Form.css';

const Regions = ['Bắc', 'Trung', 'Nam'];
const Types = ["Núi", "Biển", "Đảo", "Văn Hóa", "Sông Nước"];
const Discounts = ["20", "40", "50", "70"]

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:3001/${url.slice(6)}`
    else return "";
}

function TourForm({ handleAddTour, tour }) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const [start, setStart] = React.useState(tour ? tour.timeStart : new Date());
    const [end, setEnd] = React.useState(tour ? tour.timeEnd : new Date());
    const [dataPrevious, setDataPrevios] = React.useState(tour);
    const [imagePreview, setImagePreview] = React.useState();
    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview.preview);
        }
    }, [imagePreview]);

    const handleChangePreview = (e) => {
        const file = e.target.files[0];
        if (file) file.preview = URL.createObjectURL(file);
        setImagePreview(file);
    };

    const onHandleSubmit = async (data) => {
        handleAddTour(data);
    };
    return (
        <div className='create-tour-form-wrapper' style={{ marginTop: '120px' }}>
            <h2 style={{fontWeight:'bold', marginBottom:'0px'}}>THÔNG TIN TOUR</h2>
            <form className='create-tour-formbody' action=" " onSubmit={handleSubmit(onHandleSubmit)} >
                <div className='form-group mb-2'>
                    <label>Tên tour: </label>
                    <input {...register("name", {
                        required: "* Nhập tên tour.",
                        maxLength: {
                            value: 100,
                            message: '* Nhập tên quá dài.'
                        }
                    })}
                        defaultValue={tour && tour.name}
                    />
                    {errors.name && <div className="alert">{errors.name.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Mô tả: </label>
                    <textarea style={{ height: '150px' }}  {...register("description", {
                        minLength: {
                            value: 20,
                            message: "* Nhập thêm thông tin mô tả",
                        },
                        maxLength: {
                            value: 1024,
                            message: "* Mô tả quá dài!"
                        }
                    })}
                        defaultValue={tour && tour.description}
                    />
                    {errors.description && <div className="alert">{errors.description.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Giá: </label>
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
                    )}
                        defaultValue={tour && tour.price}
                    />
                    {errors.price && <div className="alert">{errors.price.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Vùng miền:</label>
                    <select {...register("region", { required: "* Chọn vùng miền" })} placeholder='category' defaultValue={tour && tour.region}>
                        <option value="" hidden>Choose...</option>
                        {
                            Regions.map((value, index) => (
                                <option value={index + 1} key={index} selected={tour ? tour.region === index + 1 : false}>{value}</option>
                            ))
                        }
                    </select>
                    {errors.region && <div className="alert">{errors.region.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Loại hình:</label>
                    <select {...register("typePlace", { required: "* Chọn loại hình" })} placeholder='category' defaultValue={tour && tour.typePlace}>
                        <option value="" hidden>Choose...</option>
                        {
                            Types.map((value, index) => (
                                <option value={value} key={index} key={index} selected={tour ? tour.typePlace === value : false}>{value}</option>
                            ))
                        }
                    </select>
                    {errors.region && <div className="alert">{errors.region.message}</div>}
                </div>
                <div className="form-group-date mb-2" style={{ textAlign: 'left', margin: '0 5px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                        <Typography sx={{ mt: 2, mb: 1, color: 'cadetblue', fontWeight: 'bold' }}>Ngày bắt đầu</Typography>
                        <Controller
                            name="timeStart"
                            control={control}
                            defaultValue={start}

                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="Start"
                                    value={start}
                                    minDate={new Date()}
                                    format="DD-MM-YYYY"
                                    {...field}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                        setStart(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                        <Typography sx={{ mt: 2, mb: 1, color: 'cadetblue', fontWeight: 'bold' }}>Ngày kết thúc</Typography>
                        <Controller
                            name="timeEnd"
                            control={control}
                            defaultValue={end}
                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="End"
                                    value={end}
                                    minDate={start}
                                    format="DD-MM-YYYY"
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
                    <label>Số lượng khách: </label>
                    <input type='text' defaultValue={tour && tour.amount} {...register("amount",
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
                    <label>Giảm giá:</label>
                    <select {...register("discount", { required: "* Chọn mức giảm giá" })} placeholder='discount' defaultValue={tour && tour.discount}>
                        <option value={0}>0%</option>
                        {
                            Discounts.map((value, index) => (
                                <option value={value / 100} key={index} selected={tour ? tour.discount == value / 100 : false}>{value}%</option>
                            ))
                        }
                    </select>
                    {errors.discount && <div className="alert">{errors.discount.message}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Khách sạn: </label>
                    <input defaultValue={tour && tour.hotelName} {...register("hotelName", {
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
                    <textarea type="text" defaultValue={tour && tour.schedule} style={{ height: '150px' }} {...register("schedule", {
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
                <div className="form-group-img mb-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label>Hình ảnh: </label>
                    <input type='file' {...register("imageUrl")} onChange={handleChangePreview} />
                    {imagePreview && <img src={imagePreview.preview} alt="" style={{ width: '200px' }} />}
                    {(!imagePreview && tour) && <img src={ConvertToImageURL(tour.imageUrl)} alt="" style={{ width: '200px' }} />}
                </div>
                <div className="form-group mb-2" style={{ width: '50px' }}>
                    <Button type='submit' color="primary" variant="contained" style={{ width: '70px', backgroundColor: 'orange' }}>Lưu</Button>
                </div>
            </form>

        </div>
    );
}

export default TourForm;