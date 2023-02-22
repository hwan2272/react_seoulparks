import React, { useState, useEffect } from 'react';
import { toList, parseStr, API_KEY } from './parksAPI';
import { List } from './List';
import axios from 'axios';

export function Park() {
    const [parksData, setParksData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            //setParksData(getParksList());
            try {
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchParkInfoService/1/100/`);
                const parseDatas = parseStr(response.data);
                setParksData(toList(parseDatas));
              } catch(e) {
                console.log(e);
                return e;
              }
        }
        fetch();
    },[]);

    // const fetchParksData = () => {
    //     setParksData({
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
                    <h2>목록</h2>
                    {/* <button onClick={() => fetchParksData()} value="">불러오기</button> */}
                    <div id="list">
                        <List parksData={parksData}/>
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
    )
}