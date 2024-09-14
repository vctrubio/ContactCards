import { getUserByIdV2 } from "@/lib/apiUser";

const UserUsernamePage = async ({ params }: { params: { username: string } }) => {
    const user = await getUserByIdV2(params.username);
    // const user = null;

    if (!user) return <>No User found...</>
    return (
        <>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );
}

export default UserUsernamePage;
