import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function ParkAroundPlaceItem({place}) {
    
    const pop = (e, url) => {
        e.preventDefault();
        window.open(url, '_blank');
    }
    
    return (
        <li className ="around_item"><a onClick={(e) => pop(e, place.place_url)} href="#">{place.place_name}</a> ({place.category_name})</li>
    )
}