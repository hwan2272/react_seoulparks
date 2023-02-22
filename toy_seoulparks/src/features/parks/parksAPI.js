import axios from 'axios';
import XMLParser from 'react-xml-parser';

const API_KEY = '78696d6e5468776138314253567179'

const parseStr = (responseData) => {
   return new XMLParser().parseFromString(responseData).children;
}

const toList = (parseDataset) => {
    const parksList = new Array();
    for(let i = 0; i < parseDataset.length; i++) {
        if(i == 0 || i == 1) continue;
        let item = 
            { name : parseDataset[i].children[1].value };
        parksList.push(item);
    }
    return parksList;
}

export const getParksList = async () => {
  try {
    const response = await axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchParkInfoService/1/10/`);
    const parseDatas = parseStr(response.data);
    return toList(parseDatas);
  } catch(e) {
    console.log(e);
    return e;
  }
}