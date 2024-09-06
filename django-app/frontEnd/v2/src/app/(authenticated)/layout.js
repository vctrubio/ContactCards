import { NavBar } from '@/components/navbar';

export default function LoginLayout({ children }) {
    return (
        <>
            <NavBar />
                {children}
        </>
    );
}

