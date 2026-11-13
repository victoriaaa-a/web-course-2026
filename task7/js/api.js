const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export class PostAPI {
    static async getPosts(page, limit = 10) {
        try {
            const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error; 
        }
    }
}