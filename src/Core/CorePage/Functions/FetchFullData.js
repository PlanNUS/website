import {AcadamicYear} from '../../../Constants';

export default function FetchFullData(currentModuleCode) {
  try {
    const url = `https://api.nusmods.com/v2/${AcadamicYear}/modules/${currentModuleCode}.json`;
    // const url = `https://api.nusmods.com/v2/${AcadamicYear}/modulefasdf/${currentModuleCode}.json`;
    // const url = '';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false); //False for synchorous request
    xmlHttp.send(null);

    return JSON.parse(xmlHttp.responseText);
  } catch (err) {
    throw new Error();
  }
}
