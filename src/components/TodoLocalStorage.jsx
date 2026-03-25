const todoKey = "reactTodo";

export const getLocalStorageDataTodo = () =>{
        const rawTodos = localStorage.getItem(todoKey);      //To get Todo data from local storage.

        if(!rawTodos){
            return [];
        }  //if Todo localStorage is empty then return empty array

        return JSON.parse(rawTodos);
}

export const setLocalStorageDataTodo = (task) =>{
    return localStorage.setItem(todoKey,JSON.stringify(task));
}