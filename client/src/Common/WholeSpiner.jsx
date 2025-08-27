import React from 'react';
import { ClipLoader } from "react-spinners";

const WholeSpiner = () => {
    return (
        <div>
            <ClipLoader loading={true} size={150} color='#3B82F6' />
        </div>
        
    );
};

export default WholeSpiner;