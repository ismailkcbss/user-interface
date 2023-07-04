import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { studentActions } from '../Redux/Slice/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import alertify from 'alertifyjs';
import axios from 'axios';
import { useState } from 'react';
import StudentListActions from './StudentListActions';
import Modal from 'react-modal';

function StudentsList(props) {


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const studentsData = useSelector((state) => state.student.students);

    const { page, setTotal, total} = props;
    const dispatch = useDispatch();


    const ClickEditStd = (id) => {
        setModalVisible(true);
        setSelectedId(id);
    }


    const ClickDelStd = async (id) => {
        try {
            const { data } = await axios.delete(`https://dummyjson.com/users/${id}`)
            alertify.success("Seçili Kayıt Gerçekte olmadığı için Redux dan Silindi");
            dispatch(studentActions.delete({id}));
            setTotal(total-1);
        } catch (error) {
            alertify.error(error.response.data.message);
        }
    }

    return (
        <div className="StudentsListDiv">

            <table>
                <thead>
                    <tr className="TableTitle">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="TableText">

                    {studentsData.slice((page - 1)*7, (page - 1)* 7 + 7).map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt="ProfilImg" />
                            </td>
                            <td>{item.firstName + " " + item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.domain}</td>
                            <td>{item.company.name}</td>
                            <td className='TableActions'>
                                <button onClick={() => ClickEditStd(item.id)}><EditIcon sx={{ color: '#FEAF00' }} /></button>
                                <button onClick={() => ClickDelStd(item.id)}><DeleteIcon sx={{ color: '#DD4654' }} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }} isOpen={modalVisible} onRequestClose={() => {
                setModalVisible(false);
                setSelectedId(undefined);
            }}>
                <StudentListActions visible={modalVisible} id={selectedId} setVisible={setModalVisible} />
            </Modal>

        </div>
    );
}

export default StudentsList;