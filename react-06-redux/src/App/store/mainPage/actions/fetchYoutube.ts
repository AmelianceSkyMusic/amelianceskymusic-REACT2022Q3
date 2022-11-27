import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'App/api';
import { IGet } from 'App/api/google/youtube/get';

export const fetchYoutube = createAsyncThunk(
  'mainPageSlice/fetchYoutube',
  async (params: IGet, thunkAPI) => {
    try {
      const response = await api.google.youtube.get(params);
      console.log('response', response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong!  ¯\\_O_o_/¯');
    }
  }
);
