import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import QueryProvide from './lib/react-query/QueryProvide';
import AuthProvider from './context/AuthContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryProvide>
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryProvide>
	</BrowserRouter>
);
