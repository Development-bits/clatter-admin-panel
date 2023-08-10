// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"


export const allUserAction = createAsyncThunk('users/all-users', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/get-users?plan=${arg.plan}&status=${arg.status}&page=${arg.page}&limit=${arg.limit}&keyword=${arg.keyword}&subscriptionStatus=${arg.subStatus}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const singleUserAction = createAsyncThunk('users/single-user', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/user-details/${arg}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})