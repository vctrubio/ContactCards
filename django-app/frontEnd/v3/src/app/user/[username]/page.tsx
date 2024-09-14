import { getUserById } from "@/lib/apiUser";

const UserUsernamePage = async ({ params }: { params: { username: string } }) => {
    // Log the entire params object
    console.log("🚀 ~ UserUsernamePage ~ params:", params);
    
    // Accessing username from params
    console.log('Accessing username:', params.username);

    // Fetch the user by username
    const user = await getUserById(params.username);

    if (!user) return <>No User found.</>
    return (
        <>
            <div>id is {user.id}</div>
        </>
    );
}

export default UserUsernamePage;
