import ProfilImg from '../IMG/avatar.png';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


function UserProfil() {


    const history = useHistory();

    const [backgroundColor1, setBackgroundColor1] = useState('');
    const [backgroundColor2, setBackgroundColor2] = useState('');
    const [originalColor1, setOriginalColor1] = useState('rgb(254, 175, 0)');
    const [originalColor2, setOriginalColor2] = useState('rgb(254, 175, 0)');
    const [isButtonClicked1, setIsButtonClicked1] = useState(false);
    const [isButtonClicked2, setIsButtonClicked2] = useState(false);
    const [lastClickedButton, setLastClickedButton] = useState(null);


    const handleHomeClick = () => {
        if (isButtonClicked1) {
            setBackgroundColor1(originalColor1);
            setIsButtonClicked1(false);
            history.push('/Dashboard');
        } else {
            setOriginalColor1(backgroundColor1);
            setBackgroundColor1('rgb(254, 175, 0)');
            setIsButtonClicked1(true);
        }
    }
    const handleStudentsClick = () => {
        if (isButtonClicked2) {
            setBackgroundColor2(originalColor2);
            setIsButtonClicked2(false);
            history.push('/StudentsLayout');
        } else {
            setOriginalColor2(backgroundColor2);
            setBackgroundColor2('rgb(254, 175, 0)');
            setIsButtonClicked2(true);
        }
    }

    const handleLogoutClick = () => {
        history.push('/');
    }

    return (
        <div className="UserLayoutDiv">
            <div className="Title">
                <p> <span> | </span> MANAGE COURSES </p>
            </div>

            <div className="UserImg">
                <img src={ProfilImg} alt="ProfilImg" />
                <p>John Doe</p>
                <span>Admin</span>
            </div>

            <div className="NavbarLayout">
                <div className='NavbarButtons'>
                    <button id='1' style={{ backgroundColor: backgroundColor1 }} onClick={handleHomeClick}><span><HomeIcon /></span>Home</button>
                    <button id='2'><span><BookmarkBorderIcon /></span>Course</button>
                    <button id='3' style={{ backgroundColor: backgroundColor2 }} onClick={handleStudentsClick}><span><SchoolIcon /></span>Students</button>
                    <button id='4'><span><AttachMoneyIcon /></span>Payment</button>
                    <button id='5'><span><DescriptionIcon /></span>Report</button>
                    <button id='6'><span><SettingsIcon /></span>Settings</button>
                </div>

                <div className='NavbarLogout'>
                    <button onClick={handleLogoutClick}>Logout <span><LogoutIcon /></span></button>
                </div>
            </div>

        </div>
    );
}

export default UserProfil;