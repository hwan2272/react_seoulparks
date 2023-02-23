import React, { useState, useEffect } from 'react';
import { getParksList } from './ParkApi';
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
        <div>
            <header>
                <h1>서울시 공원</h1>
            </header>
            <main>
                <section>
                    {/* <h2>목록</h2> */}
                    {/* <button onClick={() => fetchParksList()} value="">불러오기</button> */}
                    <div id="list">
                        <ParkList parksList={parksList}/>
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
    )
}