import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Cards from './Cards';

function CardLayout() {
    return (
        <div className="CardLayoutDiv">
            <div className="CardLayoutHeader">
                <ArrowCircleLeftIcon />
                <NotificationsNoneIcon />
            </div>
            <div className="CardLayoutBody">
                <Cards />
            </div>
        </div>
    );
}

export default CardLayout;