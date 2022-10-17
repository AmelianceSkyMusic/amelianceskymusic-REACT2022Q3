import { BASE_GOOGLE_SHEET_URL } from './consts';

interface IGetSheetData {
  sheetId: string;
  tqx?: string;
  pageTitle?: string;
  range?: string;
}

export async function getSheetData({
  sheetId,
  tqx = 'out:json',
  pageTitle = 'sheet',
  range = undefined,
}: IGetSheetData) {
  const params: string[] = [];
  if (tqx) params.push(`tqx=${tqx}`);
  if (pageTitle) params.push(`sheet=${pageTitle}`);
  if (range) params.push(`range=${range}`);

  try {
    const response = await fetch(`${BASE_GOOGLE_SHEET_URL}${sheetId}/gviz/tq?${params.join('&')}`);

    const textData = await response.text();
    const data = JSON.parse(textData.substring(47).slice(0, -2));

    return data;
  } catch (error) {
    //  if (axios.isAxiosError(error)) {
    //    console.error('AXIOS-ERROR (getSpreadsheetData):', error);
    //  } else {
    //    console.error('ERROR (getSpreadsheetData):', error);
    //  }
  }
}
