import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid} from '@material-ui/core';
import { Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Filter.css'
function Filter() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onHandleSubmit = (data) => {
        console.log(data);
        reset();
    };
    return (
        <div className='filter-box'>
            <Container>
                <h1 style={{margin:0, marginBottom:'20px', fontFamily:"'Roboto Mono', monospace", fontWeight:'initial', color:'dimgray'}}>
                    BẠN ĐANG TÌM KIẾM?...
                </h1>
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
                                    <div className='filter-radio-item'><input type="radio" id="region" value="bac" {...register("region")}/><label for='region'>Miền Bắc</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="region" value="trung" {...register("region")}/><label for='region'>Miền Trung</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="region" value="nam" {...register("region")}/><label for='region'>Miền Nam</label></div>
                                </div>
                            </div>

                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label' for='travel-type'>Loại hình</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    <div className='filter-radio-item'><input type="radio" id="type" value="nui" {...register("type")}/><label for='type'>Núi</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="type" value="bien" {...register("type")}/><label for='type'>Biển</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="type" value="dao" {...register("type")}/><label for='type'>Đảo</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="type" value="vanhoa" {...register("type")}/><label for='type'>Đảo</label></div>
                                </div>
                            </div>
                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label' for='quantily'>Số lượng</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    <div className='filter-radio-item'><input type="radio" id="quantily" value="1" {...register("quantily")}/><label for='quantily'>1 Người</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="quantily" value="2" {...register("quantily")}/><label for='quantily'>2 Người</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="quantily" value="4" {...register("quantily")}/><label for='quantily'>4 người</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="quantily" value="5" {...register("quantily")}/><label for='quantily'>5 Người</label></div>
                                </div>
                            </div>
                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label' for='price'>Giá</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail' style={{width:'100px'}}>
                                    <div className='filter-radio-item'><input type="radio" id="price" value="1-3" {...register("price")}/><label for="price">Từ 1 - 3 tr</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="price" value="3-5" {...register("price")}/><label for="price">Từ 3 - 5 tr</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="price" value="5-10" {...register("price")}/><label for="price">Trên 5tr</label></div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='button-search' style={{cursor:'pointer'}}>Tìm kiếm</button>

                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default Filter;