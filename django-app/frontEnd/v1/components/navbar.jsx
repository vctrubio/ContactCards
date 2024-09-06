import Link from 'next/link';

const struct = {
    "Home": "/home",
    "Profile": "/user",
};

const NavBar = () => {
    return (<>
    <nav className="flex gap-4 justify-center p-4 border">
            {Object.entries(struct).map(([name, url]) => (
                <Link key={name} href={url} className="text-blue-600">
                    {name}
                </Link>
            ))}
        </nav>
    </>);
}

export default NavBar;