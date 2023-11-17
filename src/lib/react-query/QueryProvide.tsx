import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryProvide = ({ children }: { children: ReactNode }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvide;
