import { getCSRFToken } from "./apiUser";

export const postSubscribe = async () => {
    try{
        const csrfToken = getCSRFToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_USER_API}subscribe/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        });

        if (!response.ok) {
            console.log("🚀 ~ postSubscribe ~ response:", response)
            console.error('Failed to subscribe');
            return false
        }
        
        else
            console.log('Subscribed IS GOOD');
        return true
    }
    catch (error) {
        console.error('Error:', error);
    }

}