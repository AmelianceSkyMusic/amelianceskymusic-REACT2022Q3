import { responseMock } from '__mocks__/responseMock';
import { getPhotos } from '../getPhotos';

describe('getPhotos()', () => {
  it('should back data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(responseMock),
        }) as Promise<Response>
    ) as jest.Mock;

    const response = await getPhotos({
      text: 'Cars',
      page: 1,
      sort: 'relevance',
      perPage: 3,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject(responseMock);
  });

  it('should return correct error', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ success: false, error: 'Something bad happened' }),
        }) as Promise<Response>
    ) as jest.Mock;

    const response = await getPhotos({
      text: 'Cars',
      page: 1,
      sort: 'relevance',
      perPage: 3,
    });

    expect(response.error).toBe('Something bad happened');
  });
});
