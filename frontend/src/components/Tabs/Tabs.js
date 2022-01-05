import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="body1" component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Detail = ({detail}) => {
    return (
        <div className='detail-tab' style={{padding:'0 30px'}}>
            <h5 style={{ margin: '0', textAlign: 'left' }}>LỘ TRÌNH</h5>
            <Typography gutterBottom variant="body1" component="div" align='left'>
                {detail}
            </Typography>
        </div>
    );
}

const Rating = () => {
    return (
        <div className='rating-tab' style={{padding:'0 30px'}}>
            <h5 style={{ margin: '0', textAlign: 'left' }}>ĐÁNH GIÁ</h5>
        </div>
    );
}

export default function TabDetail({detail}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="tab-detail">
                    <Tab label="CHI TIẾT" />
                    <Tab label="ĐÁNH GIÁ" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Detail detail={detail}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Rating/>
            </TabPanel>
        </Box>
    );
}
