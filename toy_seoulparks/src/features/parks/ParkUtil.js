import XMLParser from 'react-xml-parser'
import { getParksXMLDataset, getParksXMLData } from './ParkApi';

const parseStr = (responseData) => {
   return new XMLParser().parseFromString(responseData).children;
}

const toList = (parseDataset) => {
    const parksList = new Array();
    for(let i = 0; i < parseDataset.length; i++) {
        if(i == 0 || i == 1) continue;
        parksList.push(dataSetToItem(parseDataset[i]));
    }
    return parksList;
}

const toItem = (parseDataset) => {
  let parkInfo = new Object();
  for(let i = 0; i < parseDataset.length; i++) {
      if(i == 0 || i == 1) continue;
      parkInfo = dataSetToItem(parseDataset[i]);
  }
  return parkInfo;
}

const dataSetToItem = (parseDatasetItem) => {
  //const reactStringReplace = require('react-string-replace');
  let parkItem = 
      { 
          idx : (parseDatasetItem.children[0]).value,
          name : (parseDatasetItem.children[1]).value,
          address : (parseDatasetItem.children[12]).value,
          guidance :(parseDatasetItem.children[7]).value,
          //info : {
            open_dt : (parseDatasetItem.children[4]).value,
            img : (parseDatasetItem.children[10]).value,
            //content : (parseDatasetItem.children[2].value).replaceAll('. ', '.\/\r\/\n').replaceAll('/',''),
            content : (parseDatasetItem.children[2]).value,
            admintel : (parseDatasetItem.children[14]).value,
            visit_road : (parseDatasetItem.children[8]).value,
            adminpart : (parseDatasetItem.children[13]).value,
            template : (parseDatasetItem.children[19]).value,
            zone : (parseDatasetItem.children[11]).value,
            use_refer : (parseDatasetItem.children[9]).value,
            main_equip : (parseDatasetItem.children[5]).value,
            main_plants : (parseDatasetItem.children[6]).value,
          //}
      };
  return parkItem;
}

export const getParksList = async () => {
  try {
    const parseDataset = parseStr(await getParksXMLDataset());
    return toList(parseDataset);
  } catch(e) {
    console.log(e);
    return e;
  }
}

export const getParkDetail = async (parkIdx) => {
  try {
    const parseDataset = parseStr(await getParksXMLData(parkIdx));
    return toItem(parseDataset);
  } catch(e) {
    console.log(e);
    return e;
  }
}