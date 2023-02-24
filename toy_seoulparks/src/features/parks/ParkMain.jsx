import React, { useState, useEffect } from 'react';
import { getParksList } from './ParkUtil';
import { ParkList } from './ParkList';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getParksListAsync } from '../list/listSlice';
import { store } from '../../app/store'

export function ParkMain() {
    const dispatch = useAppDispatch();
    const [parksList, setParksList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            if(parksList.length <= 0 && store.getState().list.item.length <= 0) {
                const fetch = await getParksList();
                dispatch(getParksListAsync());
                setParksList(fetch);
            }
            else {
                setParksList(store.getState().list.item);
            }
        }
        fetchList();
    },[]);

    // const fetchParksList = () => {
    //     setParksList({
    //         list : getParksList()
    //     })
    // }

    return (
        <section>
            {/* <h2>목록</h2> */}
            {/* <button onClick={() => fetchParksList()} value="">불러오기</button> */}
            <div id="list" className="content_tb">
                <ParkList parksList={parksList}/>
            </div>
        </section>
    )
}