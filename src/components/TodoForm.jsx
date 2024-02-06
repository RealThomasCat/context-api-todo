import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  // State to store a todo
  const [todo, setTodo] = useState("");

  // Destructure addTodo method from useTodo context
  const { addTodo } = useTodo();

  // Method to add todo
  const add = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!todo) return; // If todo is empty, return

    // Add todo to the list if not empty
    addTodo({ todo }); // {todo : todo} can be written as todo (ES6 syntax) because key and value names are same

    setTodo(""); // Clear the input field after adding todo (Good UX)
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
