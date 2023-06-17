import { GetStaticPaths, GetStaticProps } from "next";
import { Post, User } from "@prisma/client";
import Date from "@/components/date";
import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = (
		await prisma.post.findMany({
			where: { published: true },
			select: { id: true },
		})
	).map((p) => ({
		params: { id: `${p.id}` },
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = await prisma.post.findFirst({
		include: { author: { select: { name: true } } },
		where: { id: { equals: Number(params?.id) } },
	});
	return {
		revalidate: 10,
		props: {
			post,
		},
	};
};

export default function BlogPost({ post }: { post: Post & { author: User } }) {
	return (
		<Layout title={post.title}>
			<h2>{post.title}</h2>
			<Link rel="author" href={`/author/${post.id}`}>
				{post.author.name}
			</Link>
			<Date dateString={`${post.createdAt.toISOString()}`} />
			<article>{post.content}</article>
		</Layout>
	);
}
