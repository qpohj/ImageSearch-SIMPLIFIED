import axios from "axios"

const googleApiKey = import.meta.env.VITE_GOOGLE_API;
const googleCX = import.meta.env.VITE_SEARCH_ENGINE;

export const loadImages = async (userEmail: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/img/${userEmail}`)

        return response.data;
    } catch (error) {
        console.error("error loading images from server: ", error);
        throw error;
    }
}

export const searchImages = async (searchTerm: string) => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${googleApiKey}&cx=${googleCX}&searchType=image`
		);
		return response;
	} catch (error) {
		console.error("Error searching images:", error);
		throw error;
	}
};

export const saveImageToServer = async (
	userEmail: string,
	imageURL: string
) => {
	try {
		const response = await axios.post(
			`http://localhost:3001/img/${userEmail}/save`,
			{
				imageURL,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error saving image to server:", error);
		throw error;
	}
};

export const deleteImageFromServer = async (
	userEmail: string,
	imageURL: string
) => {
	try {
		const response = await axios.post(
			`http://localhost:3001/img/${userEmail}/delete`,
			{
				imageURL,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting image from server:", error);
		throw error;
	}
};