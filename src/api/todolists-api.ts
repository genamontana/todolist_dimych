import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4874dc4c-d559-4574-8754-ba7d375822a7'
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    }

}