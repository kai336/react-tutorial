import React, { useState } from 'react'
import './App.css'
import './components/TodoItem'
import TodoItem from './components/TodoItem';

export type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};

function App() {
  const [serial, setSerial] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // リロード回避
    const newTodo: Todo = {
      inputValue: inputValue,
      id: serial,
      checked: false
    }
    setTodos([newTodo, ...todos]);
    console.log(todos);
    setInputValue("");
    setSerial(serial+1);
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map((todo: Todo) =>
      todo.id === id ? {...todo, checked: !todo.checked} : todo
      // 条件式 ? trueのときのreturn : falseのときのreturn
    ))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }

  return (
    <div>
      <h2>Todoリスト with Typescript</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' id='todo-input' value={inputValue} onChange={handleChange} className='inputText' />
        <input type='submit' value="create" className='submitButton' />
      </form>
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.inputValue}
            checked={todo.checked}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
