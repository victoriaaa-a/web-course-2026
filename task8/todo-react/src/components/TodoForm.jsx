import { useState } from 'react';

/**
 * @param {{ onAdd: (text: string, isCompleted: boolean) => void }} props 
 */
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    
    onAdd(text, isCompleted);
    setText('');
    setIsCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
      />
      <select 
        value={isCompleted ? 'done' : 'todo'} 
        onChange={(e) => setIsCompleted(e.target.value === 'done')}
      >
        <option value="todo">Не выполнена</option>
        <option value="done">Выполнена</option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  );
}

export default TodoForm;