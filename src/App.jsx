import { useState } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";

function App() {
  // State to store todos
  const [todos, setTodos] = useState([]);

  // Adding functionality to addTodo method of TodoProvider
  const addTodo = (todo) => {
    // Add new todo to the list with unique id
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]); // prev gives us the previous state (it can be named anything)
  };

  // Update todo
  const updateTodo = (id, todo) => {
    setTodos(
      (prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)) // If id matches, update/replace the todo
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(
      (prev) => prev.filter((todo) => todo.id !== id) // Filter will return all todos except the one with matching id
    );
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed } // Use spread operator and override completed property
          : prevTodo
      )
    );
  };

  return (
    // Wrap the entire app with TodoProvider and pass values
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}</div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
