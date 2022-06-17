import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from '../features/main/mainSlice';


import { settingSlice } from '../features/Setting/settingSlice';



import { usersSlice } from '../features/Users/usersSlice';

import { transaksiSlice } from '../features/Transaksi/transaksiSlice';


export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    
    settings: settingSlice.reducer,
    
    usersAdm: usersSlice.reducer,
  
    transaksi: transaksiSlice.reducer,

  },
});
