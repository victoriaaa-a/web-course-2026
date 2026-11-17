import React from 'react';

/**
 * @param {{ 
 *   todo: {id: number, text: string, completed: boolean}, 
 *   onToggle: (id: number, status: boolean) => void, 
 *   onDelete: (id: number) => void 
 * }} props
 */
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id, todo.completed)} 
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
});

export default TodoItem;