import React, { useState, useEffect } from 'react';

export function List({parksData}) {
    return (
        <div>
            {parksData.list && parksData.list.map(item => {
                return <p>{item.name}</p>
            })}
        </div>
    );
}