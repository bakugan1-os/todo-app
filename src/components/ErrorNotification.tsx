import React from 'react';
import cn from 'classnames';

type Props = {
  message: string;
  onClose: () => void;
};

// Always rendered: the message is hidden with a class so it can fade out.
export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => (
  <div
    data-cy="ErrorNotification"
    className={cn('notification is-danger is-light has-text-weight-normal', {
      hidden: !message,
    })}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      aria-label="Hide error"
      onClick={onClose}
    />
    {message}
  </div>
);
