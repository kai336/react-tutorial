import React from 'react';
import './TodoItem.css';

type TodoItemProps = {
    id: number;
    text: string;
    checked: boolean;
    onToggle: (id: number) => void; //グロ変をトグルするだけで何も返さない関数
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, checked, onToggle, onDelete }) => {
    return (
        <li className='todo-item'>
            <label className='checkbox-label'>
                <input type='checkbox' checked={checked} onChange={() => onToggle(id)} />
                {text}
            </label>
            {checked && (
                <button className='delete-button' onClick={() => onDelete(id)}>Delete</button>
            )}
            
        </li>
    )
}
export default TodoItem;