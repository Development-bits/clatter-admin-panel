import { createSlice } from '@reduxjs/toolkit'
import { allUserAction, userAction } from './userAction'


const initialState = {
    allUserData: null,
    allUserLoading: 'idle',
    allUserError: null,

    singleUserData: null,
    singleUserLoading: 'idle',
    singleUserError: null,
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(allUserAction.pending, (state, action) => {
            if (state.allUserLoading === 'idle') {
                state.allUserLoading = 'pending'
            }
        })
        builder.addCase(allUserAction.fulfilled, (state, action) => {
            if (state.allUserLoading === 'pending') {
                state.allUserData = action.payload
                state.allUserLoading = 'idle'
            }
        })
        builder.addCase(allUserAction.rejected, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserLoading = 'idle'
                state.singleUserError = action.payload
            }
        })
        builder.addCase(userAction.pending, (state, action) => {
            if (state.singleUserLoading === 'idle') {
                state.singleUserLoading = 'pending'
            }
        })
        builder.addCase(userAction.fulfilled, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserData = action.payload
                state.singleUserLoading = 'idle'
            }
        })
        builder.addCase(userAction.rejected, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserLoading = 'idle'
                state.singleUserError = action.payload
            }
        })
    }
})

export default userSlice.reducer