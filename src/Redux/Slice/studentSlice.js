import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [

        ],
        baseStudents: [],
    },
    reducers: {
        //Api den gelen önceki kullanıcıları tutmak
        set: (state, action) => {
            state.students = action.payload;
            state.baseStudents = action.payload;
        },
        //Api den gelen önceki kullanıcılarla yeni eklenen kullanıcıyı üstüne ekleme
        add: (state, action) => {
            state.students = [...state.students, action.payload];
            state.baseStudents = [...state.students, action.payload];
        },
        //Kullanıcının girilen bilgilerini güncelleme
        edit: (state, action) => {
            state.students = state.students.map((item) => {
                if (item.id == action.payload.id) {
                    return action.payload;
                }
                return { ...item };
            });
            state.baseStudents = [...state.students];

        },
        //Kullanıcı silme
        delete: (state, action) => {
            state.students = state.students.filter((item) => item.id !== action.payload.id);
            state.baseStudents = [...state.students];
        },
        // delete({id: user.id})
        search: (state, action) => {
            const searchValue = action.payload.toLowerCase();
            state.students = state.baseStudents.filter((item) => {
                if (item.id == 62) {
                    debugger;
                }
                if (
                    item.firstName.toLowerCase().includes(searchValue) ||
                    item.lastName.toLowerCase().includes(searchValue) ||
                    item.username.toLowerCase().includes(searchValue) ||
                    item.email.toLowerCase().includes(searchValue)
                    // item.address.city?.toLowerCase().includes(searchValue)
                ) {
                    return item;
                }
            });
        },
        refreshList: (state) => {
            state.students = [...state.baseStudents];
        }
    }
});

export const studentActions = studentSlice.actions;
export default studentSlice.reducer;