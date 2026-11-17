function Filters({ currentFilter, onFilterChange, sortOrder, onSortChange }) {
  return (
    <div className="filters-container">
      <div className="filters">
        <button 
          className={currentFilter === 'all' ? 'active' : ''} 
          onClick={() => onFilterChange('all')}
        >
          Все
        </button>
        <button 
          className={currentFilter === 'active' ? 'active' : ''} 
          onClick={() => onFilterChange('active')}
        >
          Активные
        </button>
        <button 
          className={currentFilter === 'completed' ? 'active' : ''} 
          onClick={() => onFilterChange('completed')}
        >
          Выполненные
        </button>
      </div>
      
      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        <option value="default">По умолчанию</option>
        <option value="alpha">По алфавиту (А-Я)</option>
        <option value="date-new">Сначала новые</option>
        <option value="date-old">Сначала старые</option>
      </select>
    </div>
  );
}

export default Filters;