import React, { useEffect } from 'react';
import APIClient from '../APIs/APIClient';
import ChangePassword from '../components/Forms/ChangePassword';

function ChangePasswordPage(props) {

    const handleChangePassword = async (data)=>{    
        let email;
        const info = await APIClient.checkLoginToken();
        data.email = info.email;
        const res = await APIClient.changePassword(data);
    }

    useEffect(()=>{
        document.title = "Bootcamp Travel | Thay đổi mật khẩu";
    },[]);

    return (
        <div>
            <ChangePassword handleChangePassword={handleChangePassword}/>
        </div>
    );
}

export default ChangePasswordPage;