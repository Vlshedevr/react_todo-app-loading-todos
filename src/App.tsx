/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TodosBar } from './components/TodosBar';
import { TodoFilter } from './components/TodoFilter';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterBy } from './types/Filter';
import { AddBar } from './components/AddBar';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterBy>(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompleteTodos = todos.some(todo => todo.completed);

  const handleFilterChange = (filterBy: FilterBy) => {
    setFilter(filterBy);
  };

  const onDeleteErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const filtertTodos = useMemo<Todo[]>(() => {
    switch (filter) {
      case FilterBy.All:
        return todos;
      case FilterBy.Active:
        return todos.filter(todo => !todo.completed);
      case FilterBy.Completed:
        return todos.filter(todo => todo.completed);
    }
  }, [filter, todos]);

  useEffect(() => {
    setErrorMessage(null);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddBar />

        <TodosBar todos={filtertTodos} />

        {todos.length !== 0 && (
          <TodoFilter
            hasCompleteTodos={hasCompleteTodos}
            activeTodosCount={activeTodosCount}
            selectFilter={filter}
            onFilter={handleFilterChange}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        onDeleteErrorMessage={onDeleteErrorMessage}
      />
    </div>
  );
};
