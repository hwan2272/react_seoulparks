import XMLParser from 'react-xml-parser';
import { getParksXMLDataset, getParksXMLData } from './ParkApi';

const parseStr = (responseData:Object) => {
   return new XMLParser().parseFromString(responseData).children;
}

const toList = (parseDataset:Element[]) => {
    const parksList = new Array();
    for(let i = 0; i < parseDataset.length; i++) {
        if(i == 0 || i == 1) continue;
        parksList.push(dataSetToItem(parseDataset[i]));
    }
    return parksList;
}

const toItem = (parseDataset:Element[]) => {
  let parkInfo:Object = new Object();
  for(let i = 0; i < parseDataset.length; i++) {
      if(i == 0 || i == 1) continue;
      parkInfo = dataSetToItem(parseDataset[i]);
  }
  return parkInfo;
}

const dataSetToItem = (parseDatasetItem:Element) => {
  //const reactStringReplace = require('react-string-replace');
  let parkItem = 
      { 
          idx : (parseDatasetItem.children[0] as HTMLInputElement).value,
          name : (parseDatasetItem.children[1] as HTMLInputElement).value,
          address : (parseDatasetItem.children[12] as HTMLInputElement).value,
          guidance :(parseDatasetItem.children[7] as HTMLInputElement).value,
          //info : {
            open_dt : (parseDatasetItem.children[4] as HTMLInputElement).value,
            img : (parseDatasetItem.children[10] as HTMLInputElement).value,
            //content : (parseDatasetItem.children[2].value).replaceAll('. ', '.\/\r\/\n').replaceAll('/',''),
            content : (parseDatasetItem.children[2] as HTMLInputElement).value,
            admintel : (parseDatasetItem.children[14] as HTMLInputElement).value,
            visit_road : (parseDatasetItem.children[8] as HTMLInputElement).value,
            adminpart : (parseDatasetItem.children[13] as HTMLInputElement).value,
            template : (parseDatasetItem.children[19] as HTMLInputElement).value,
            zone : (parseDatasetItem.children[11] as HTMLInputElement).value,
            use_refer : (parseDatasetItem.children[9] as HTMLInputElement).value,
            main_equip : (parseDatasetItem.children[5] as HTMLInputElement).value,
            main_plants : (parseDatasetItem.children[6] as HTMLInputElement).value,
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

export const getParkDetail = async (parkIdx:number) => {
  try {
    const parseDataset = parseStr(await getParksXMLData(parkIdx));
    return toItem(parseDataset);
  } catch(e) {
    console.log(e);
    return e;
  }
}