import { getUserById } from "@/lib/apiUser";

const UserPage = async ({ params }) => {
    const { username } = params;

    const user = await getUserById(username);

    return (<>
        {
            user ?
                <>hello Page {user.username}</> :
                <> No user found with the username {username}</>
        }
    </>);
}

export default UserPage;