import { IYoutubeResponse } from 'App/types/IYoutubeResponse';

// const API_KEY = 'AIzaSyDIyDtWAe-voVSrbcPDeQrMc8YFSetqcL8'; // 1
const API_KEY = 'AIzaSyBz4WIOEenWtHPoXWYwDSqRPcpb-MCCAQ0'; // 2
// const API_KEY = 'AIzaSyA9YikBIyr40Kd04CdPPDGMP8lcLzthTcg'; // 3
const baseURL = 'https://www.googleapis.com/youtube/v3/search';

export async function get(search: string, nextPage?: string): Promise<IYoutubeResponse | null> {
  const URLParams = new URLSearchParams();

  if (search) URLParams.append('q', search);
  if (nextPage) URLParams.append('pageToken', nextPage);
  URLParams.append('type', 'video');
  URLParams.append('safeSearch', 'strict');
  URLParams.append('part', 'snippet');
  URLParams.append('maxResult', '10');
  URLParams.append('key', API_KEY);
  const url = `${baseURL}?${URLParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { ...data };
  } catch (error) {
    console.error('---ASM--->', error);
  }
  return null;
}
