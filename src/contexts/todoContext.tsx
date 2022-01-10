import React, { createContext, useContext, useReducer } from 'react';
import { Todo } from '../types';

export type TodoAction = { type: 'CREATE_TODO'; todo: Todo };

export interface TodoContextInterface {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

const todoReducer = (preState: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'CREATE_TODO':
      return [...preState, action.todo];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoContext = createContext<TodoContextInterface>({
  todos: [],
  dispatch: () => {},
});
TodoContext.displayName = 'TodoContext';
const TodoProvider = TodoContext.Provider;

export const useTodo = (): TodoContextInterface => useContext(TodoContext);

export const TodoWrapper = ({
  children,
}: {
  children: JSX.Element | undefined;
}): JSX.Element => {
  const [state, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoProvider
      value={{
        todos: state,
        dispatch,
      }}
    >
      {children}
    </TodoProvider>
  );
};
