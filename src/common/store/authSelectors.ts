import { RootState } from '@/config/store';

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;