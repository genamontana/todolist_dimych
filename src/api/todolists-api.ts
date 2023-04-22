import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4874dc4c-d559-4574-8754-ba7d375822a7'
    }
}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D> = {
    resultCode: number,
    messages: string[],
    data: D
}


export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<TodolistType []>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{
            item: TodolistType
        }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
        return promise
    }

}