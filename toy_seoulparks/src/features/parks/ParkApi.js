import axios from 'axios';
import XMLParser from 'react-xml-parser';

const API_KEY = '78696d6e5468776138314253567179';
const LIST_CNT = 10;

const parseStr = (responseData) => {
   return new XMLParser().parseFromString(responseData).children;
}

const toList = (parseDataset) => {
    const parksList = new Array();
    for(let i = 0; i < parseDataset.length; i++) {
        if(i == 0 || i == 1) continue;
        let parkItem = 
            { 
                idx : parseDataset[i].children[0].value,
                name : parseDataset[i].children[1].value,
                address : parseDataset[i].children[12].value,
                url :parseDataset[i].children[7].value,
            };
        parksList.push(parkItem);
    }
    return parksList;
}

export const getParksList = async () => {
  try {
    const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchParkInfoService/1/${LIST_CNT}/`);
    const parseDatas = parseStr(response.data);
    return toList(parseDatas);
  } catch(e) {
    console.log(e);
    return e;
  }
}