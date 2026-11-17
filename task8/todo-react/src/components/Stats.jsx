function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  return (
    <div className="stats">
      <span>Всего: {total}</span> | 
      <span> Активных: {active}</span> | 
      <span> Выполнено: {completed}</span>
    </div>
  );
}

export default Stats;