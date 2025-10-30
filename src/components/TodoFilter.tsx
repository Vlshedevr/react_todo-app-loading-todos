import { FilterBy } from '../types/Filter';
import cn from 'classnames';

type Props = {
  hasCompleteTodos: boolean;
  activeTodosCount: number;
  selectFilter: FilterBy;
  onFilter: (value: FilterBy) => void;
};

export const TodoFilter = ({
  hasCompleteTodos,
  activeTodosCount,
  selectFilter,
  onFilter,
}: Props) => {
  return (
    <footer className="todoapp__footer hidden" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectFilter === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilter(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectFilter === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilter(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectFilter === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilter(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleteTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
