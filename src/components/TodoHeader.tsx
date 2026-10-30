import React from 'react';
import cn from 'classnames';

type Props = {
  hasTodos: boolean;
  allCompleted: boolean;
  title: string;
  isAdding: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onTitleChange: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onToggleAll: () => void;
};

export const TodoHeader: React.FC<Props> = ({
  hasTodos,
  allCompleted,
  title,
  isAdding,
  inputRef,
  onTitleChange,
  onSubmit,
  onToggleAll,
}) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: allCompleted })}
        aria-label="Toggle all todos"
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />
    )}

    <form onSubmit={onSubmit}>
      <input
        disabled={isAdding}
        ref={inputRef}
        value={title}
        onChange={event => onTitleChange(event.target.value)}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
