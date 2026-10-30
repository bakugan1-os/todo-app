import React, { useEffect, useRef, useState } from 'react';

import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { UserWarning } from './UserWarning';

const ERROR_TIMEOUT = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const timerRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const showError = (message: string) => {
    clearTimeout(timerRef.current);
    setErrorMessage(message);
    timerRef.current = window.setTimeout(
      () => setErrorMessage(''),
      ERROR_TIMEOUT,
    );
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [tempTodo, todos]);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const visibleTodos = getVisibleTodos(todos, filter);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      showError('Title should not be empty');

      return;
    }

    const newTodo = {
      title: trimmedTitle,
      userId: USER_ID,
      completed: false,
    };

    setTempTodo({ ...newTodo, id: 0 });

    addTodo(newTodo)
      .then(createdTodo => {
        setTodos(currentTodos => [...currentTodos, createdTodo]);
        setTitle('');
      })
      .catch(() => showError('Unable to add a todo'))
      .finally(() => setTempTodo(null));
  };

  const handleDelete = (todoId: number) => {
    setLoadingIds(currentIds => [...currentIds, todoId]);

    deleteTodo(todoId)
      .then(() =>
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId)),
      )
      .catch(() => showError('Unable to delete a todo'))
      .finally(() =>
        setLoadingIds(prevIds => prevIds.filter(id => id !== todoId)),
      );
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setLoadingIds(currentIds => [...currentIds, updatedTodo.id]);

    return updateTodo(updatedTodo)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(error => {
        showError('Unable to update a todo');
        throw error;
      })
      .finally(() =>
        setLoadingIds(prevIds => prevIds.filter(id => id !== updatedTodo.id)),
      );
  };

  const handleToggleAll = () => {
    const newStatus = activeCount !== 0;

    todos
      .filter(todo => todo.completed !== newStatus)
      .forEach(todo =>
        handleUpdate({ ...todo, completed: newStatus }).catch(() => {}),
      );
  };

  const handleClearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(completedTodo => handleDelete(completedTodo.id));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          hasTodos={todos.length > 0}
          allCompleted={activeCount === 0}
          title={title}
          isAdding={tempTodo !== null}
          inputRef={inputRef}
          onTitleChange={setTitle}
          onSubmit={handleSubmit}
          onToggleAll={handleToggleAll}
        />

        <TodoList
          todos={visibleTodos}
          tempTodo={tempTodo}
          loadingIds={loadingIds}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {todos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            hasCompleted={todos.some(todo => todo.completed)}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
