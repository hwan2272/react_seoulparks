import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function ParkItem({parkItem, index}) {
    const navigate = useNavigate();

    const gotoDetail = (parkName, parkIdx) => {
        navigate(`/detail/${parkIdx}`,{
            state : {
                parkName : parkName
            }
        });
    }
    const pop = (e, url) => {
        e.preventDefault();
        window.open(url, '_blank');
    }
    return (
        <tr onClick={() => gotoDetail(parkItem.name, parkItem.idx)}>
            <td>{index+1}</td>
            <td><img src={parkItem.img} width={180} height={150}/></td>
            <td className="td_address">
                {/* <Link to={`/detail/${parkItem.idx}`}>{parkItem.name}</Link> */}
                <span className="sp_name">{parkItem.name}</span>
                {/* <button onClick={(e) => pop(e, parkItem.guidance)}>안내도</button> */}
                <br/><br/>
                <span className="sp_address">{parkItem.address}</span>
            </td>
        </tr>
    )
}