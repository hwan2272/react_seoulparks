import React, { useState, useEffect } from 'react';
import { ParkItem } from './ParkItem';

export function ParkList({parksList}) {
    return (
        <table className="notice_tb">
            <caption>
                총 <span>{parksList.length}</span>개의 목록이 있습니다.
            </caption>
            <thead>
                <tr>
                    <th>연번</th>
                    <th>썸네일</th>
                    <th>공원명<br/>주소</th>
                </tr>
            </thead>
            <colgroup>
                <col width="6%"/>
                <col width="10%"/>
                <col width="*"/>
            </colgroup>
            <tbody>
                {parksList && parksList.map((parkItem, index) => {
                    return <ParkItem key={index} parkItem={parkItem} index={index}/>
                })}
            </tbody>
        </table>
    );
}