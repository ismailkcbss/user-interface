import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import StudentsList from './StudentsList';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { studentActions } from '../Redux/Slice/studentSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import StudentListActions from './StudentListActions';
import Modal from 'react-modal';
import UserProfil from './UserProfil';

function StudentsLayout() {


    const [searchText, setSearchText] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    const dispatch = useDispatch();


    //Search içersisinde debounce işlemi
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        }
    }

    //Pagination işleminde kullanılacak sayfa numarasını takip etmek
    const handlePageNum = (event, value) => {
        setPage(value);
    }

    //Search inputun içeriğini takip edip apiye istek atma  
    const searchTextChange = async (event) => {
        const { value } = event.target;
        if (!value) {
            setSearchText([]);
            dispatch(studentActions.refreshList());
            return;
        }
        // endpointi kullanımı
        const { data } = await axios.get(`https://dummyjson.com/users/search?q=${value}`);
        dispatch(studentActions.search(value));

    }

    //Search inputun içerisindeki karakterlerin en son optimize edilmiş hali
    const optimisedVersiyon = useCallback(debounce(searchTextChange), [])


    //Student butonuna basınca açılan modal
    const handleAddStdClick = () => {
        setModalVisible(true);
    }

    //Students List de yer alan kullanıcıları apiden çekip redux a  gömme işlemi 
    //Pagination işlemi için de limit(Her sayfada gösterilecek veri sayısı) ve offsetleri(her sayfa başlangıcında hangi indisteki veriden başlayacağını belirler) belirtme
    const studentsData = async () => {
        try {
            const { data } = await axios.get(`https://dummyjson.com/users?limit=100`)
            dispatch(studentActions.set(data.users));
            setTotal(data.total);
        } catch (error) {
            alertify.error("Students Verileri Çekilemedi")
        }
    }


    //Sauyfanını her renderlama işleminde tekrar tekrar istek atmasını sağlamak 
    useEffect(() => {
        studentsData();
    }, [])

    return (
        <div className="StudentsLayoutDiv">
            <Modal style={{
                content: {
                    width:'30rem',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }} isOpen={modalVisible} onRequestClose={() => {
                setModalVisible(false);
            }}>
                <StudentListActions setVisible={setModalVisible} />
            </Modal>
            <div className="LeftLayout">
                <UserProfil />
            </div>
            <div className="RightLayout">
                <div className="StudentsLayoutHeader">
                    <ArrowCircleLeftIcon />
                    <NotificationsNoneIcon />
                </div>
                <div className='StudentsLayoutContainer'>
                    <div className='ContainerHeader'>

                        <div className='HeaderTitle'>
                            <p>Students List</p>
                        </div>
                        <div className='HeaderAction'>
                            <input
                                name="search"
                                type='text'
                                placeholder='Search...'
                                autoComplete="off"
                                onChange={optimisedVersiyon}
                            />
                            <button onClick={handleAddStdClick}>ADD NEW STUDENT</button>
                        </div>

                    </div>
                    <div>
                        <div className='ContainerBody'>
                            <StudentsList page={page}  total={total} setTotal={setTotal} />
                        </div>
                        <div className='ContainerFooter'>
                            <Stack spacing={2}>
                                <Pagination count={Math.ceil(total / 7)} value={page} onChange={handlePageNum} />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsLayout;