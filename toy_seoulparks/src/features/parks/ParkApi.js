import axios from 'axios';

const API_KEY = '78696d6e5468776138314253567179';
const LIST_CNT = 132;
const ITEM_CNT = 1;

export const getParksXMLDataset = async () => {
  try {
    const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchParkInfoService/1/${LIST_CNT}/`);
    return response.data;
  } catch(e) {
    console.log(e);
    return e;
  }
}

export const getParksXMLData = async (parkIdx) => {
  try {
    const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchParkInfoService/1/${ITEM_CNT}/${parkIdx}`);
    return response.data;
  } catch(e) {
    console.log(e);
    return e;
  }
}