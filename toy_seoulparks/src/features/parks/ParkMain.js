import React, { useState, useEffect } from 'react';
import { getParksList } from './ParkUtil';
import { ParkList } from './ParkList';

export function ParkMain() {
    const [parksList, setParksList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const fetch = await getParksList();
            setParksList(fetch);
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