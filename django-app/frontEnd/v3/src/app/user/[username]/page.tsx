import { getUserById } from "@/lib/apiUser";

const UserUsernamePage = async ({ params }: { params: { username: string } }) => {
    const user = await getUserById(params.username);

    if (!user) return <>No User found.</>
    return (
        <>
            <div>id is {user.id}</div>
        </>
    );
}

export default UserUsernamePage;
