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
        if (data.status) {
            setIsLoggedIn(true);
            setUsername(data.username || 'AnonymousUser_LocalHost'); // Assuming the API returns a 'username' field
        } else {
            setIsLoggedIn(false);
        }

    } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while checking login status');
    }
};

export const getUser = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}user/`;
        // console.log('url: ', url)
        
        const response = await fetch(url,
            {
                method: 'GET',
                credentials: 'include',
            }
        );
        // console.log('Response status:', response.status);
        // console.log('Response body:', await response.text()); // Log the response body as text

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // console.log('it was ALLLL OK')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUserById = async (userId) => {
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
        console.log('data: is good ', data)

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}