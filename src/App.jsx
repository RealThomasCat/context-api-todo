import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import { TodoForm, TodoItem } from "./components";

function App() {
  // State to store todos
  const [todos, setTodos] = useState([]);

  // Adding functionality to addTodo method of TodoProvider
  const addTodo = (todo) => {
    // Add new todo to the list with unique id and default completed value of false
    setTodos((prev) => [
      { id: Date.now(), ...todo, completed: false },
      ...prev,
    ]); // prev gives us the previous state (it can be named anything)
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

  // LOCAL STORAGE

  // Get todos from localStorage when app loads
  useEffect(() => {
    // If we are in react (server side rendering not invloved), we can access localStorage
    const todos = JSON.parse(localStorage.getItem("todos")); // Get todos from localStorage
    // local storage returns string, so we need to convert it back to JSON (todos is an array)

    console.log(todos);

    // If todos are present in localStorage, set them to state
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save todos to localStorage when todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // setItem takes key and value, value should be string
  }, [todos]);

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
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
