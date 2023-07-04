import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import alertify from "alertifyjs";
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { studentActions } from "../Redux/Slice/studentSlice";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useEffect } from "react";

function StudentListActions({id, setVisible}) {

    const dispatch = useDispatch();

    //Form oluşturma
    const initialForm = {
        name: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        companyName: "",
        image: "",
    }

    const [form, setForm] = useState({ ...initialForm });
    const [image, setImage] = useState(null);
    const [studentData, setStudentData] = useState([]);




    //Formda girilen verileri takip etme
    const handleChangeText = (value, key) => {
        setForm({
            ...form,
            [key]: value,
        })
    }

    //Firebase gönderilecek image nin url adresini takip etme
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    //Yeni students ekleme ve redux a gömme işlemi
    const handleSubmit = async () => {
        const imageRef = ref(storage, uuidv4());
        try {
            await uploadBytes(imageRef, image);
            const result = await getDownloadURL(imageRef);
            const { data } = await axios.post(`https://dummyjson.com/users/add`, {
                firstName: form.name,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                domain: form.website,
                image: result,
                company: {
                    name: form.companyName,
                }
            });
            debugger;
            setStudentData(data);
            dispatch(studentActions.add(data));
            setVisible(false);
            alertify.success("Std Kaydedildi");
        } catch (error) {
            alertify.error("hata");
        }

    }

    const studentsDataGet = async () => {
        if(id){
            try {
                const { data } = await axios.get(`https://dummyjson.com/users/${id}`)
                setForm(
                    {
                        name: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        website: data.domain,
                        companyName: data.company.name,
                        image: data.image,
                    }
                )
            } catch (error) {
                alertify.error("Students Verileri Çekilemedi")
            }
        }
    }

    const StudentsDataPut = async () => {
        try {
            let newFotoUrl = null;
            if (image) {
                const imageRef = ref(storage, uuidv4());
                await uploadBytes(imageRef, image);
                newFotoUrl = await getDownloadURL(imageRef);
            };
            const { data } = await axios.put(`https://dummyjson.com/users/${id}`,{
                firstName: form.name,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                website: form.domain,
                company:{
                    name: form.companyName,
                },
                image: newFotoUrl || form.image,
            })
            dispatch(studentActions.edit(data));
            debugger;

            setVisible(false);
        } catch (error) {
            alertify.error("HATA");
        }
    }

    const handleSaveClick = (event) => {
        event.preventDefault();
        if(id){
            StudentsDataPut();
        } else {
            handleSubmit();
        }
    }

    const handleCloseClick = () => {
        setVisible(false);
    }


    useEffect(() => {
        studentsDataGet();
    }, [])

    return (
        <div className="StudentModel">
            <div className="StudentModelHeader">
                <p>Students Actions</p>
                <button onClick={handleCloseClick}>X</button>
            </div>
            <div className="StudentModelBody">
                <form onSubmit={handleSaveClick}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        autoFocus
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChangeText(e.target.value, "name")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleChangeText(e.target.value, "lastName")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChangeText(e.target.value, "email")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        variant="outlined"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChangeText(e.target.value, "phone")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <TextField
                        id="website"
                        label="Website"
                        variant="outlined"
                        value={form.website}
                        onChange={(e) => handleChangeText(e.target.value, "website")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <TextField
                        id="companyName"
                        label="Company Name"
                        variant="outlined"
                        value={form.companyName}
                        onChange={(e) => handleChangeText(e.target.value, "companyName")}
                        sx={{
                            mb: 2,

                        }}
                    />
                    <p style={{fontSize:'14px', fontWeight:500, paddingBottom:5}}>Image</p>
                    <input type="file" onChange={handleImageChange} style={{ width: '12rem', marginBottom: '2rem' }} />

                    <input type="submit" value="Kaydet" style={{ width: '100%', height: '2rem',cursor:'pointer' }} />
                </form>
            </div>
        </div>
    );
}

export default StudentListActions;