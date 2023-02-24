import React, { useState, useEffect } from 'react';
import { store } from '../../app/store'

export function ParkCondition({parksList, conditions, searchZone}) {
    const [zoneList, setZoneList] = useState([]);

    // useEffect(() => {
    //     store.subscribe(() => {
    //         구독처리
    //     });
    // },[]);

    useEffect(() => {
        if(store.getState().search.baseList.length > 0) {
            let zoneSet = new Set();
            let zoneArr = new Array();
            store.getState().search.baseList.map(p => {
                if(p.zone != '') {
                    zoneSet.add(p.zone);
                }
            });
            zoneSet.forEach(zone =>{
                zoneArr.push(zone);
            })
            setZoneList(zoneArr);
        }
    },[parksList]);

    return (
        <select onChange={(e) => searchZone(e, e.target.value)} value={conditions != null ? conditions : ''}>
            <option key={-1} value="">지역전체</option>
            {zoneList && zoneList.map((zone, index) => {
                return <option key={index} value={zone}>{zone}</option>
            })}
        </select>
    );
}