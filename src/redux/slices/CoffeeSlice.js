import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api"

export const fetchData = createAsyncThunk("coffee/fetchData" , 
     async () => {
        const response = await fetch(BASE_URL)
        const coffee = await response.json()
        console.log(coffee);
        return coffee 
     })

const coffeeSlice = createSlice({
    name: "coffee",
    initialState: {
        menu: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.pending , (state) => {
            state.isLoading = true 
        })
        .addCase(fetchData.fulfilled, (state ,  {payload}) => {
            state.isLoading = false
            state.menu = payload
        })
        .addCase(fetchData.rejected, () => {})
    }
})

export const coffeeReducer  = coffeeSlice.reducer