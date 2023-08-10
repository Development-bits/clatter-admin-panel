import { createSlice } from '@reduxjs/toolkit'
import { allUserAction, singleUserAction, updateProfileAction } from './userAction'


const initialState = {
    allUserData: null,
    allUserLoading: 'idle',
    allUserError: null,

    singleUserData: null,
    singleUserLoading: 'idle',
    singleUserError: null,

    updateUserData: null,
    updateUserLoading: 'idle',
    updateUserError: null,
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
        builder.addCase(singleUserAction.pending, (state, action) => {
            if (state.singleUserLoading === 'idle') {
                state.singleUserLoading = 'pending'
            }
        })
        builder.addCase(singleUserAction.fulfilled, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserData = action.payload
                state.singleUserLoading = 'idle'
            }
        })
        builder.addCase(singleUserAction.rejected, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserLoading = 'idle'
                state.singleUserError = action.payload
            }
        })
        builder.addCase(updateProfileAction.pending, (state, action) => {
            if (state.updateUserLoading === 'idle') {
                state.updateUserLoading = 'pending'
            }
        })
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            if (state.updateUserLoading === 'pending') {
                state.updateUserData = action.payload
                state.updateUserLoading = 'idle'
            }
        })
        builder.addCase(updateProfileAction.rejected, (state, action) => {
            if (state.updateUserLoading === 'pending') {
                state.updateUserLoading = 'idle'
                state.updateUserError = action.payload
            }
        })
    }
})

export default userSlice.reducer