import TodoItem from './TodoItem';

/**
 * @param {{ 
 *   todos: Array<{id: number, text: string, completed: boolean}>, 
 *   onToggle: (id: number, status: boolean) => void, 
 *   onDelete: (id: number) => void 
 * }} props
 */
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-message">Задач нет</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}

export default TodoList;