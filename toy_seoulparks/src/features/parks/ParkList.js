import React, { useState, useEffect } from 'react';
import { ParkItem } from './ParkItem';

export function ParkList({parksList}) {
    return (
        <table>
            <caption>
                공원 목록
            </caption>
            <thead>
                <tr>
                    <th>연번</th>
                    <th>공원명</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                {parksList && parksList.map((parkItem, index) => {
                    return <ParkItem key={index} parkItem={parkItem} index={index}/>
                })}
            </tbody>
        </table>
    );
}