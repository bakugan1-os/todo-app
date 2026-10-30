# Todo App

A todo list built with React, TypeScript and Vite. Every change goes through a
REST API before it reaches the screen: each item shows its own loading overlay
while its request is in flight, and a rejected request leaves the list
untouched and raises a notification.

**[Live demo](https://bakugan1-os.github.io/todo-app/)**

## Features

- Add, rename (double-click a title), toggle and delete todos
- Toggle all todos at once, and clear all completed ones
- Filter by All / Active / Completed, with the filter reflected in the URL hash
- Per-item loading overlays and an `items left` counter
- Error notifications that auto-dismiss after 3 seconds
- Inline editing with `Enter` to save, `Escape` to cancel, blur to save, and
  an emptied title deleting the todo

## Tech stack

| | |
|---|---|
| UI | React 18, TypeScript |
| Build | Vite 5 |
| Styles | SCSS (`@use` modules), Bulma for the notification and loader |
| Quality | ESLint (airbnb-typescript), Stylelint, Prettier |

## Getting started

Requires Node.js 20.

```bash
git clone https://github.com/bakugan1-os/todo-app.git
cd todo-app
npm install
npm start
```

The app talks to the Mate Academy students API and needs a user id. One is
already committed in `.env`; to use your own, grab it from the
[registration page](https://mate-academy.github.io/react_student-registration)
and set it:

```bash
# .env
VITE_USER_ID=your_id
```

Without a valid id the app renders a `UserWarning` screen instead of the list.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | Stylelint `--fix`, Prettier `--write`, then ESLint and Stylelint |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

## Project structure

```
src/
├── api/todos.ts            # REST calls for the todos resource
├── components/
│   ├── ErrorNotification.tsx
│   ├── TodoFilter.tsx      # All / Active / Completed nav
│   ├── TodoFooter.tsx      # counter + filter + clear completed
│   ├── TodoHeader.tsx      # toggle-all + new todo form
│   ├── TodoItem.tsx        # single row, incl. inline editing
│   └── TodoList.tsx
├── styles/                 # SCSS partials, composed in index.scss
├── types/                  # Todo, Status
├── utils/
│   ├── fetchClient.ts      # thin fetch wrapper
│   └── getVisibleTodos.ts  # filtering by status
├── App.tsx                 # state and request handling
└── index.tsx               # entry point
```

All server state lives in `App.tsx`; the components below it are presentational
and receive data and callbacks as props.

## License

[GPL-3.0](./LICENSE)
