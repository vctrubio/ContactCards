export const getAllCards = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_GET_CARD_API}`;
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
