import React from 'react';
import cn from 'classnames';

import { Status } from '../types/Status';

const filters = [
  { status: Status.All, label: 'All', href: '#/' },
  { status: Status.Active, label: 'Active', href: '#/active' },
  { status: Status.Completed, label: 'Completed', href: '#/completed' },
];

type Props = {
  value: Status;
  onChange: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({ value, onChange }) => (
  <nav className="filter" data-cy="Filter">
    {filters.map(({ status, label, href }) => (
      <a
        key={status}
        href={href}
        className={cn('filter__link', { selected: value === status })}
        data-cy={`FilterLink${label}`}
        onClick={() => onChange(status)}
      >
        {label}
      </a>
    ))}
  </nav>
);
