import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ParkItem({parkItem, index}) {
    const pop = (url) => {
        window.open(url, '_blank');
    }
    return (
        <tr>
            <td>{parkItem.idx}</td>
            <td>
            <Link to={`/detail/${parkItem.idx}`}>{parkItem.name}</Link>
            &nbsp;&nbsp;
            <button onClick={() => pop(parkItem.url)}>안내도</button></td>
            <td>{parkItem.address}</td>
        </tr>
    )
}