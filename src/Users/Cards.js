import SchoolIcon from '@mui/icons-material/School';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';

function Cards() {
    return (
        <div className="CardsDiv">
            <div className="Card1">
                <p className='icon'>
                    <SchoolIcon sx={{fontSize:'48px'}}/>
                </p>
                <p className='title'>
                    Students
                </p>
                <p className='count'>
                    243
                </p>

            </div>
            <div className="Card2">
                <p className='icon'>
                    <BookmarkBorderIcon sx={{fontSize:'38px'}} />
                </p>
                <p className='title'>
                    Course
                </p>
                <p className='count'>
                    13
                </p>
            </div>
            <div className="Card3">
                <p className='icon'>
                    <AttachMoneyIcon sx={{fontSize:'35px'}}/>
                </p>
                <p className='title'>
                    Payments
                </p>
                <p className='count'>
                    556.000 <span>₺</span>
                </p>


            </div>
            <div className="Card4">
                <p className='icon'>
                    <PersonIcon sx={{fontSize:'34px'}} />
                </p>
                <p className='title'>
                    Users
                </p>
                <p className='count'>
                    3
                </p>


            </div>

        </div>
    );
}

export default Cards;