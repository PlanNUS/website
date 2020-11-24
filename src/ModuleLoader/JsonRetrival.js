const acadamicYear = '2020-2021';

//This function returns the JSON for all modules data for AY2020/2021
export default function JsonRetrival() {
  const url = 'https://api.nusmods.com/v2/' + acadamicYear + '/moduleInfo.json';

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false); //False for synchorous request
  xmlHttp.send(null);

  var objNow = JSON.parse(xmlHttp.responseText);

  return objNow;
}
