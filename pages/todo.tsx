import Head from "next/head";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { GetStaticProps } from "next";
import Layout from "@/components/layout";
import TodoMasterComponent from "@/components/todoComponent";

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
			<ul className="list-none">
				{todos.map((t) => (
					<li key={t.id}>
						<TodoMasterComponent todo={t} />
					</li>
				))}
			</ul>
		</Layout>
	);
}
