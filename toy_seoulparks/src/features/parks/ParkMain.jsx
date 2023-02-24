import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../../app/store'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { initMainList, getParksListAsync, conditionSearched } from '../search/searchSlice';
import { getParksList } from './ParkUtil';
import { ParkList } from './ParkList';
import { ParkCondition } from './ParkCondition';

export function ParkMain() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [parksList, setParksList] = useState([]);
    const conditions = new URLSearchParams(window.location.search).get('condition')

    useEffect(() => {
        const fetchList = async () => {
            if(parksList.length <= 0 && store.getState().search.baseList.length <= 0) {
                const fetch = await getParksList();
                dispatch(getParksListAsync());
                setParksList(fetch);
                setTimeout(() => {
                    if(conditions != null) {
                        let searchedList = store.getState().search.baseList.filter(p => p.zone === conditions);
                        if(searchedList.length > 0) {
                            const searchedPayload = {
                                condition : conditions,
                                list : searchedList,
                            };
                            dispatch(conditionSearched(searchedPayload));
                            setParksList(searchedList);
                        }
                    }
                }, 5);
            }
            else {
                if(conditions != null) {
                    let searchedList = store.getState().search.baseList.filter(p => p.zone === conditions);
                    const searchedPayload = {
                        condition : conditions,
                        list : searchedList,
                    };
                    dispatch(conditionSearched(searchedPayload));
                    setParksList(searchedList);
                }
                else {
                    setParksList(store.getState().search.baseList);
                }
            }
        }
        fetchList();
        //dispatch(initMainList());
        // if(conditions != '') {
        //     let searchedList = store.getState().search.baseList.filter(p => p.zone === conditions);
        //     const searchedPayload = {
        //         condition : conditions,
        //         list : searchedList,
        //     };
        //     dispatch(conditionSearched(searchedPayload));
        //     setParksList(searchedList);
        // }
    },[]);

    const searchZone = (e, zoneName) => {
        let searchedList = null;
        if(zoneName === '') {
            searchedList = store.getState().search.baseList;
        }
        else {
            searchedList = store.getState().search.baseList.filter(p => p.zone === zoneName);
        }
        const searchedPayload = {
            condition : zoneName,
            list : searchedList,
        };
        dispatch(conditionSearched(searchedPayload));
        setParksList(searchedList);
        if(zoneName != '') {
            navigate(`/?condition=${zoneName}`);
        }
        else {
            navigate(`/`);
        }
    }

    return (
        <section>
            {/* <h2>목록</h2> */}
            <div id="list" className="content_tb">
                <ParkCondition parksList={parksList} conditions={conditions} searchZone={searchZone}/>
                <ParkList parksList={parksList}/>
            </div>
        </section>
    )
}