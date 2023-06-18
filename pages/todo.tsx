import Head from "next/head";
import Layout from "@/components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import TodoList from "@/components/todoList";

const queryClient = new QueryClient();

export default function TodoComponent() {
	return (
		<Layout title="Todos">
			<Head>
				<title>Todo</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<TodoList />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Layout>
	);
}
