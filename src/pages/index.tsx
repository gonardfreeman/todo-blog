import React from "react";
import Link from "next/link";
import { Post } from "@prisma/client";
import { GetStaticProps } from "next";
import prisma from "@lib/prisma";
import Layout from "@/components/layout";

type PostsMainPage = Pick<Post, "id" | "title">;

export const getStaticProps: GetStaticProps = async () => {
	const allPosts: PostsMainPage[] = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
		},
		where: {
			published: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	return {
		props: {
			allPosts,
		},
		revalidate: 10,
	};
};

function Blog({ allPosts }: { allPosts: Array<PostsMainPage> }) {
	return (
		<Layout home title="Home" name="My Blog">
			<ul className="list-none">
				{allPosts.map((p) => (
					<li key={p.id}>
						<Link href={`/posts/${p.id}`}>{p.title}</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
}

export default Blog;
