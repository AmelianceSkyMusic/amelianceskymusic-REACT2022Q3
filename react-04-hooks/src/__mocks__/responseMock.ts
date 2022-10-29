import { IResponse } from 'App/types/IResponse';

export const responseMock: IResponse = {
  page: 1,
  pages: 10,
  perpage: 3,
  total: 100,
  photo: [
    {
      id: '4753020625',
      owner: '14303510@N00',
      secret: '61f0849caf',
      server: '4115',
      farm: 5,
      title: 'Smart car!',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    },
    {
      id: '16235374826',
      owner: '27844439@N05',
      secret: 'f953d28a23',
      server: '7466',
      farm: 8,
      title: '_MG_1740 car',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    },
    {
      id: '2789161277',
      owner: '62298544@N00',
      secret: '4df12f82ae',
      server: '3083',
      farm: 4,
      title: 'car_DSC03219',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    },
  ],
};
