import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleWare().concat(shazamCoreApi.middleware),
});
