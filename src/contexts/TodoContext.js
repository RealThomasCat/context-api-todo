import { createContext, useContext } from "react"; // Importing createContext and useContext from react

// Creating a context object
export const TodoContext = createContext({
  // Todos is an array of objects
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  // addTodo methods
  addTodo: (todo) => {},
  // updateTodo methods
  updateTodo: (id, todo) => {},
  // deleteTodo methods
  deleteTodo: (id) => {},
  // toggleComplete methods
  toggleTodo: (id) => {},
  // Note: We will write the actual implementation of these methods in app.js
});

// Creating a custom hook to use the context
export const useTodo = () => {
  return useContext(TodoContext);
};

// Creating a provider component to wrap the app with the context
export const TodoProvider = TodoContext.Provider;
