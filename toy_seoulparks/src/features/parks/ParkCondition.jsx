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
        store.subscribe(() => {
            if(zoneList.length <= 0 && store.getState().search.baseList.length > 0) {
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
                zoneArr.sort();
                setZoneList(zoneArr);
            }
        });
    },[]);

    return (
        <select onChange={(e) => searchZone(e, e.target.value)} value={conditions != null ? conditions : ''}>
            {zoneList && zoneList.map((zone, index) => {
                return (
                    index == 0 ?
                        <option key={index} value="">지역전체</option>
                    :
                        <option key={index} value={zone}>{zone}</option>
                )
            })}
        </select>
    );
}