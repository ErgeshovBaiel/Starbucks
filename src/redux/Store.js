import {configureStore } from "@reduxjs/toolkit"
import { coffeeReducer } from "./slices/CoffeeSlice"


export const store = configureStore({
    reducer: {
      coffee: coffeeReducer
    }
  })