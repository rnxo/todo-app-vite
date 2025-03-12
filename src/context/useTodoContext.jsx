import { useContext } from "react";
import { TodoContext, TodoDispatchContext } from "./TodoProvider";

export function useTodoState() {
    return useContext(TodoContext);
}

export function useTodoDispatch() {
    return useContext(TodoDispatchContext);
}