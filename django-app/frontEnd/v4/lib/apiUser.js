import { toast, Toaster } from 'sonner';

export const getCSRFToken = () => {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

export const handleLogOut = async ({ setUsername, setIsLoggedIn }) => {
    try {
        const csrfToken = getCSRFToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        });

        if (response.ok) {
            toast.success('Logged out successfully');
            setIsLoggedIn(false);
            setUsername('');
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.log('error:', error);
        toast.error(`Error: ${error.message}`);
    }
};

export const checkLoginStatus = async ({ setUsername, setIsLoggedIn }) => {
    try {
        const destination = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}status/`;
        const response = await fetch(destination, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.username) {
            setUsername(data.username);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
      
        return data;

    } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while checking login status');
    }
};

//must be called from a client component....
export const validateAuth = async () => {
    try {
        const param = 'auth/'
        const destination = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}${param}`;
        console.log("🚀 ~ simpleCheckLoginStatus ~ destination:", destination)
        const response = await fetch(destination, {
            method: 'GET',
            credentials: 'include',
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache',
            // },
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUser = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}user/`;
        const response = await fetch(url,
            {
                method: 'GET',
                credentials: 'include',
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUserV2 = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}user/`;
        const response = await fetch(url,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUserByIdV2 = async (userName) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_GET_USER_API}${userName}/`;
        const response = await fetch(url,
            {
                method: 'GET',
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch {
        console.log('error in getUserByIdV2')
    }
}
export const getUserById = async (userId) => {
    console.log("🚀 ~ getUserById ~ userId009:", userId)
    try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}user/${userId}/`;
        const response = await fetch(url,
            {
                method: 'GET',
                // credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getAllUsers = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_GET_USER_API}`;
        const response = await fetch(url,
            {
                method: 'GET',
                // credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}