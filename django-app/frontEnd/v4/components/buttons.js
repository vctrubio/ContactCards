'use client'
import { postSubscribe } from '../lib/apiActions';
import '../src/css/globals.css'
import { useRouter } from 'next/navigation'

export const PageSignUp = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-neutral-800">
            <h2 className="mt-5 opacity-50">
                Ready to get started?
            </h2>
            <div className="flex flex-row items-center gap-8 justify-center p-8 bg-gray-100 dark:bg-neutral-800">
                <button className="px-5 py-3 text-white bg-black border border-black rounded-lg hover:bg-gray-800"
                    onClick={handleClick}
                >
                    Log in
                </button>
                <button className="px-5 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={handleClick}
                >
                    Sign up
                </button>
            </div>
        </div>
    )
}

export const SubscribeButton = ({setUser}) => {

    const handleClick = async () => {
        const res = await postSubscribe();
        if (res.error) {
            console.error('Error:', res.error);
            return;
        }
        setUser(prevUser => ({ ...prevUser, is_staff: true }));
    }

    return (
        <button className="px-5 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-full my-2"
            onClick={handleClick}
        >
            Subscribe
        </button>
    )
}

