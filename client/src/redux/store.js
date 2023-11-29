import {configureStore} from '@reduxjs/toolkit'
import questionsReducer  from './slices/questionsSlice'

export default configureStore({
    reducer: {
        questionsReducer,
    }
})