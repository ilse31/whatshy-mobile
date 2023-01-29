import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { whatshyAPi } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [whatshyAPi.reducerPath]: whatshyAPi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(whatshyAPi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
