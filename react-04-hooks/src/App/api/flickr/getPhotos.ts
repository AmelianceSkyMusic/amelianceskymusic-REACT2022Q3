interface IGetPhotos {
  text: string;
  sort?:
    | 'date-posted-asc'
    | 'date-posted-desc'
    | 'date-taken-asc'
    | 'date-taken-asc'
    | 'date-taken-desc'
    | 'interestingness-desc'
    | 'interestingness-asc'
    | 'relevance';
  perPage?: number;
  page?: number;
}

// const API_KEY = '15d48eddb3c8b791f4eef33a8dcbfab9';
const API_KEY = 'b951f69ceb11e601ddf84b51311ea71f';

export async function getPhotos({ text, sort, perPage, page }: IGetPhotos) {
  const URLParams = new URLSearchParams();
  URLParams.append('method', 'flickr.photos.search');
  URLParams.append('api_key', API_KEY);
  if (text) URLParams.append('text', text);
  if (sort) URLParams.append('sort', sort);
  if (perPage) URLParams.append('per_page', perPage.toString());
  if (page) URLParams.append('page', page.toString());
  URLParams.append('format', 'json');
  URLParams.append('nojsoncallback', '1');
  const url = `https://www.flickr.com/services/rest/?${URLParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { ...data };
  } catch (error) {
    console.error(error);
  }
}
