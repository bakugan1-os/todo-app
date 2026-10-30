import React from 'react';

import { Status } from '../types/Status';

import { TodoFilter } from './TodoFilter';

type Props = {
  activeCount: number;
  hasCompleted: boolean;
  filter: Status;
  onFilterChange: (status: Status) => void;
  onClearCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  activeCount,
  hasCompleted,
  filter,
  onFilterChange,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <TodoFilter value={filter} onChange={onFilterChange} />

    <button
      disabled={!hasCompleted}
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);
