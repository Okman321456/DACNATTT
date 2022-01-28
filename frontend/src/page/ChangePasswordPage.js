import React from 'react';
import APIClient from '../APIs/APIClient';
import ChangePassword from '../components/Forms/ChangePassword';

function ChangePasswordPage(props) {

    const handleChangePassword = async (data)=>{    
        let email;
        const info = await APIClient.checkLoginToken();
        // if(info.response.status !== 403) email = info.email;
        data.email = info.email;
        // const res = await APIClient.changePassword(data);
        // console.log(data);
        // console.log(info);
    }

    return (
        <div>
            <ChangePassword handleChangePassword={handleChangePassword}/>
        </div>
    );
}

export default ChangePasswordPage;