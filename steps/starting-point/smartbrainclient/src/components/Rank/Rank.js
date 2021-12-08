import React from 'react';
const Rank = ({ name, entries,rank }) => {
    console.log('today its',rank)
    return (
        <div>
            <div className='white f3 '>
                {`${name} your current entry count is ${entries}`}
            </div>
            <div className='white f1 '>
                {`Rank: #${rank}`}
            </div>
        </div>
    )
}

export default Rank;

