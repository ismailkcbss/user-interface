import { configureStore } from '@reduxjs/toolkit'
import studentSlice from './Slice/studentSlice'

export const store = configureStore({
    reducer: {
        student: studentSlice,
    },
})