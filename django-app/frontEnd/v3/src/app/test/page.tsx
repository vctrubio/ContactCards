import { cookies } from 'next/headers';
import { getUser } from '@/lib/apiUser';

const Test = async () => {
    const user = await getUser();
    const sessionCookie = cookies().get('sessionid');
    console.log("🚀 ~ sessionCookie:", sessionCookie)
    return (<>
        {user ? (
            <div>
                <p>Welcome {user.username}</p>
            </div>
        ) : (
            <div>
                <p>Welcome Guest</p>
            </div>
        )}
    </>);
}

export default Test;