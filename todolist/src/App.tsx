import React, { useState } from 'react'
import './App.css'
import './components/Task'

function App() {
  const [serial, setSerial] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

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

  const handleToggleCheck = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, checked: !todo.checked} : todo
      // 条件式 ? trueのときのreturn : falseのときのreturn
    ))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className='App'>
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type='text' value={inputValue} onChange={(e)=>handleChange(e)} className='inputText' />
          <input type='submit' value="create" className='submitButton' />
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.checked ? 'checked' : ''}`}>
              <input
                type='checkbox'
                checked={todo.checked}
                onChange={()=>handleToggleCheck(todo.id)}
              />
              {todo.inputValue}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
