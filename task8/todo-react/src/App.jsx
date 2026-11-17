import { useState, useEffect, useMemo, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import Stats from './components/Stats';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: 'Выучить React', completed: false },
      { id: 2, text: 'Сделать лабу', completed: true },
    ];
  });

  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text, isCompleted) => {
    const newTodo = { id: Date.now(), text, completed: isCompleted };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id, currentStatus) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !currentStatus } : todo
    ));
  }, []);

  const displayedTodos = useMemo(() => {
    let result = todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sortOrder === 'alpha') return a.text.localeCompare(b.text);
      if (sortOrder === 'date-new') return b.id - a.id;
      if (sortOrder === 'date-old') return a.id - b.id;
      return 0;
    });
  }, [todos, filter, sortOrder]);

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <Filters 
        currentFilter={filter} 
        onFilterChange={setFilter} 
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <Stats todos={todos} />
      <TodoList 
        todos={displayedTodos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
    </div>
  );
}

export default App;