import { GetStaticPaths, GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import Layout from "@/components/layout";
import { User } from "@prisma/client";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = (
		await prisma.user.findMany({
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
	const user = await prisma.user.findFirst({ where: { id: Number(params?.id) } });
	return {
		props: {
			user,
		},
		revalidate: 10,
	};
};

export default function Author({ user }: { user: User }) {
	return (
		<Layout title={user.name ?? "User"}>
			<Link href={`mailto:${user.email}`}>{user.name}</Link>
		</Layout>
	);
}
