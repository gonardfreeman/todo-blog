import Head from "next/head";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { GetStaticProps } from "next";
import Layout from "@/components/layout";
import TodoMasterComponent from "@/components/todoComponent";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export const getStaticProps: GetStaticProps = async () => {
	const todos = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
	return {
		props: {
			todos,
		},
		revalidate: 10,
	};
};

export default function TodoComponent({ todos }: { todos: Array<Todo> }) {
	return (
		<Layout title="Todos">
			<Head>
				<title>Todo</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<ul className="list-none">
					{todos.map((t) => (
						<li key={t.id}>
							<TodoMasterComponent todo={t} />
						</li>
					))}
				</ul>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Layout>
	);
}
