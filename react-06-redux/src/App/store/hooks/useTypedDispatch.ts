import { useDispatch } from 'react-redux';
import { store } from '../store';

export type TAppDispatch = typeof store.dispatch;
export const useTypedDispatch: () => TAppDispatch = useDispatch;
