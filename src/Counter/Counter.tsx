import React, {useState} from 'react';

const Counter = () => {

    let a = useState(5)
    let data = a[0]
    let setData = a[1]

    return (
        <div onClick={()=> setData(data+1)}>
            {data}
        </div>
    );
};

export default Counter;