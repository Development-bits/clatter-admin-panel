// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"
import { getHomeRouteForLoggedInUser } from "../../utility/Utils"


export const authAction = createAsyncThunk('users/auth', async (arg, { rejectWithValue }) => {
    try {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`${Domain}/admin-login`, arg.body, config)
        debugger
        arg.navigate(getHomeRouteForLoggedInUser(response.data.role))
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
