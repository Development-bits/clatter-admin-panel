import { createSlice } from '@reduxjs/toolkit'
import { cancelSubAction, subAction } from './subscriptionAction'


const initialState = {
    subscriptionData: null,
    subscriptionLoading: 'idle',
    subscriptionError: null,

    cancelSubData: null,
    cancelSubLoading: 'idle',
    cancelSubError: null,
}

export const subSlice = createSlice({
    name: 'subscription',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(subAction.pending, (state, action) => {
            if (state.subscriptionLoading === 'idle') {
                state.subscriptionLoading = 'pending'
            }
        })
        builder.addCase(subAction.fulfilled, (state, action) => {
            if (state.subscriptionLoading === 'pending') {
                state.subscriptionData = action.payload
                state.subscriptionLoading = 'idle'
            }
        })
        builder.addCase(subAction.rejected, (state, action) => {
            if (state.subscriptionLoading === 'pending') {
                state.subscriptionLoading = 'idle'
                state.subscriptionError = action.payload
            }
        })
        builder.addCase(cancelSubAction.pending, (state, action) => {
            if (state.cancelSubLoading === 'idle') {
                state.cancelSubLoading = 'pending'
            }
        })
        builder.addCase(cancelSubAction.fulfilled, (state, action) => {
            if (state.cancelSubLoading === 'pending') {
                state.cancelSubData = action.payload
                state.cancelSubLoading = 'idle'
            }
        })
        builder.addCase(cancelSubAction.rejected, (state, action) => {
            if (state.cancelSubLoading === 'pending') {
                state.cancelSubLoading = 'idle'
                state.cancelSubError = action.payload
            }
        })
    }
})


export default subSlice.reducer