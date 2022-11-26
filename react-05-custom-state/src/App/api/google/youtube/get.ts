import { IYoutubeResponse } from 'App/types/IYoutubeResponse';

const API_KEY = 'AIzaSyA9YikBIyr40Kd04CdPPDGMP8lcLzthTcg';
const baseURL = 'https://www.googleapis.com/youtube/v3/search';
interface IGet {
  search: string;
  goToPageToken?: string;
  maxResults?: string;
  order?: string;
}

export async function get({
  search,
  goToPageToken,
  maxResults,
  order,
}: IGet): Promise<IYoutubeResponse | null> {
  const URLParams = new URLSearchParams();

  if (search) URLParams.append('q', search);
  if (goToPageToken) URLParams.append('pageToken', goToPageToken);
  if (maxResults) URLParams.append('maxResults', maxResults);
  if (order) URLParams.append('order', order);
  URLParams.append('type', 'video');
  URLParams.append('safeSearch', 'strict');
  URLParams.append('part', 'snippet');
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
