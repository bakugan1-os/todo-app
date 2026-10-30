import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';

import { App } from './App';

import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);
