import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/config/store';

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};

