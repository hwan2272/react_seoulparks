import React, { useState, useEffect } from 'react';
import { getParksList } from './parksAPI';
import { List } from './List';

export function Park() {
    const [parksData, setParksData] = useState({
        list : [
            {name : 'Parks1'},
            {name : 'Parks2'}
        ]
    });

    // useEffect(() => {
    //     setParksData(getParksList());
    // },[]);

    const fetchParksData = () => {
        setParksData({
            list : getParksList()
        })
    }

    return (
        <div>
            <header>
                <h1>서울시 공원</h1>
            </header>
            <main>
                <section>
                    <h2>목록</h2>
                    <button onClick={() => fetchParksData()} value="">불러오기</button>
                    <div id="list">
                        <List parksData={parksData}/>
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
    )
}