import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'

export const getAllQuestions = createAsyncThunk('ques/all', 
async () => {
    try{
        const response = await axiosClient.get('/ques/all');
        return response.data.result;
    }catch(error){
        console.log('slice error ', error);
        return Promise.reject(error);
    }
});

const questionsSlice = createSlice({
    name: 'questionsSlice',
    initialState: {
        questions: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        })
    }
})

export default questionsSlice.reducer;