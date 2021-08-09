import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase';

function Logout() {

    const firebase = useContext(FirebaseContext);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isChecked) {
            firebase.signoutUser();
        };

    }, [isChecked])

    function handleChange(e) {
        setIsChecked(e.target.checked);
    };

    return (
       <div className='logoutContainer'>
           <label className='switch'>
            <input onChange={handleChange}type="checkbox" checked={isChecked}/>
            <span className="slider round"></span>
           </label>
       </div> 
    )
};

export default Logout;