import { Checkbox, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import RegardPrice from '../RegardPrice/RegardPrice';
import './Filter.css';


function FilterTourList({ handleFilter, handleSearch }) {
    const [value, setValue] = React.useState()
    const minValue = 0;
    const maxValue = 20000000;
    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm();

    const onHandleSubmit = async (data) => {
        await handleFilter(data);
        reset();
    };
    const onClick = async ()=>{
        await handleSearch(value);
        setValue('');
    }
    return (
        <div style={{ marginBottom: '30px' }}>
            <Grid container justifyContent='space-evenly'>
                <Grid item md={2} xs={12}>
                    <Paper
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, margin:'auto' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tên tour..."
                            value={value}
                            onChange={(e)=>{setValue(e.target.value)}}
                        />
                        <IconButton sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon onClick={onClick} />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
                    <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <div className='filter-item-wrapper'>
                                <div className='filter-item-label'>
                                    <label className='filter-label'>Vùng miền</label>
                                    <KeyboardArrowDownIcon className='arrow' />
                                    <div className='filter-detail'>
                                        <div className='filter-radio-item'><input type="radio" id="bac" value="bac" {...register("region")} /><label htmlFor='bac'>Miền Bắc</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="trung" value="trung" {...register("region")} /><label htmlFor='trung'>Miền Trung</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="nam" value="nam" {...register("region")} /><label htmlFor='nam'>Miền Nam</label></div>
                                    </div>
                                </div>

                            </div>
                            <div className='filter-item-wrapper'>
                                <div className='filter-item-label'>
                                    <label className='filter-label'>Loại hình</label>
                                    <KeyboardArrowDownIcon className='arrow' />
                                    <div className='filter-detail'>
                                        <div className='filter-radio-item'><input type="radio" id="nui" value="Núi" {...register("type")} /><label htmlFor='nui'>Núi</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="bien" value="Biển" {...register("type")} /><label htmlFor='bien'>Biển</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="dao" value="Đảo" {...register("type")} /><label htmlFor='dao'>Đảo</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="vanhoa" value="Văn Hóa" {...register("type")} /><label htmlFor='vanhoa'>Văn hóa</label></div>
                                        <div className='filter-radio-item'><input type="radio" id="songnuoc" value="Sông Nước" {...register("type")} /><label htmlFor='songnuoc'>Sông nước</label></div>
                                    </div>
                                </div>
                            </div>
                            <div className='filter-item-wrapper'>
                                <div className='filter-item-label'>
                                    <label className='filter-label'>Giá</label>
                                    <KeyboardArrowDownIcon className='arrow' />
                                    <div className='filter-detail' style={{ width: '200px', left: '-50%', transform: 'translateX(-20%)' }}>
                                        <Controller
                                            name="price"
                                            control={control}
                                            defaultValue={[minValue, maxValue]}
                                            render={({ field }) => (
                                                <Slider
                                                    {...field}
                                                    onChange={(_, value) => {
                                                        field.onChange(value);
                                                    }}
                                                    valueLabelDisplay="auto"
                                                    valueLabelFormat={
                                                        (value) => `${RegardPrice(value)}`
                                                    }
                                                    max={maxValue}
                                                    min={minValue}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='filter-item-wrapper'>
                                <div className='filter-item-label'>
                                    <label className='filter-label' htmlFor='discountCheck'>Giảm giá</label>
                                    <section>
                                        <Controller
                                            name="dis"
                                            control={control}
                                            defaultValue={false}
                                            render={({ field }) => (
                                                <Checkbox
                                                    id='discountCheck'
                                                    name='discountCheck'
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    checked={field.value}
                                                    style={{ padding: 0, paddingLeft: '5px' }}
                                                />
                                            )}
                                        />
                                    </section>
                                </div>
                            </div>
                            <Button type='submit' variant='contained' style={{ marginLeft: '20px', backgroundColor: 'orange', height: '45px', fontWeight: 'bold', padding: '0 25px' }} className='button-search'>LỌC</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>


        </div>
    );
}

export default FilterTourList;