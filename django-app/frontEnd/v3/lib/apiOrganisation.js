const url = `${process.env.NEXT_PUBLIC_BACK_END_URL_ORGS}`;

export const fetchAllOrganisation = async () => {
    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


export const deleteAllOrganisation = async () => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // If the response is a 204 No Content, there's no JSON to parse
        if (response.status === 204) {
            return { message: "All organisations deleted successfully." };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export const postOrganisation = async (formData) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const fetchOrganisationById = async (id) => {
    try {
        console.log('fetchOrganisationById id: ', id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL_ORGS}${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}