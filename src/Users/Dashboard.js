import CardLayout from "./CardLayout";
import UserProfil from "./UserProfil";


function User() {

    return (
        <div className="UserDiv">
            <div className="UserLayout">
                <div className="LeftLayout">
                    <UserProfil />
                </div>
                <div className="RightLayout">
                    <CardLayout />
                </div>
            </div>

        </div>
    );
}

export default User;