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

export const getCardById = async (cardId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_GET_CARD_API}${cardId}/`;
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