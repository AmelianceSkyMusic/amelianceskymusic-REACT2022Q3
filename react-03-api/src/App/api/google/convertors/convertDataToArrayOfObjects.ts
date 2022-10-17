import { IGoogleSheetsData } from '../interfaces/IGoogleSheetsData';

export function convertDataToArrayOfObjects(data: IGoogleSheetsData) {
  const table = data.table;
  const tableRowsData = table.rows.slice(1);

  // get object of values from table google response data
  const colNamesValues = table.rows[0].c;

  // get col names form object values
  const objectMethods = colNamesValues.map((object) => object.v);

  const dataArr = tableRowsData.reduce((dataArray, row) => {
    const rowData = row.c;
    if (!rowData) return dataArray;

    // create tuples from first col names and array of objects values
    const dataEntries = rowData.reduce((tuplesArr, rowItemObj, i) => {
      const rowItem = rowItemObj?.v;
      if (!objectMethods[i]) return tuplesArr;
      tuplesArr.push([objectMethods[i], rowItem || null]);
      return tuplesArr;
    }, [] as [string, string | number | null][]);
    dataArray.push(Object.fromEntries(dataEntries));
    return dataArray;
  }, [] as { [key: string]: string | number | null }[]);

  return dataArr;
}
