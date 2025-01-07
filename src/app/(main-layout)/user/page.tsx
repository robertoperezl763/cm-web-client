
import { fetchUserInfo } from "@/src/actions/data";
import { useAuth } from "@/src/helpers/auth";
import { UserContainer } from "./user-container";
import UserModalOutline from "./user-modal";



const MyUserPage = async () => {
    const [user, token] = useAuth();
    const myUser = await fetchUserInfo(user.id, token);

    

    return (
        <div>
            <UserModalOutline>
                <UserContainer 
                image={''} // URL for the user's profile image
                userName={''}
                email={myUser.email}
                firstName={myUser.firstName}
                lastName={myUser.lastName}
                userID={user.id} />
            </UserModalOutline>
            
            
        </div>
    )
};


export default MyUserPage;