import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";

type Props = {
	children: React.ReactNode;
	home?: boolean;
	title: string;
	name?: string;
};

const Layout = ({ children, home, title, name }: Props) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
			</Head>
			<header className={styles.header}>
				{!home && <Link href="/">Main</Link>}
				{home && <h2 className="text-black text-2xl">{name}</h2>}
			</header>
			<main>{children}</main>
			<footer></footer>
		</div>
	);
};

export default Layout;
