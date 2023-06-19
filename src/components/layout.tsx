import Head from "next/head";
import Link from "next/link";
import { css } from "../../styled-system/css";

type Props = {
	children: React.ReactNode;
	home?: boolean;
	title: string;
	name?: string;
};

const Layout = ({ children, home, title, name }: Props) => {
	return (
		<div className={css({ maxWidth: "36rem", padding: "0 1rem", margin: "3rem auto 6rem" })}>
			<Head>
				<title>{title}</title>
			</Head>
			<header className={css({ display: "flex", flexDirection: "column", alignItems: "center" })}>
				{!home && <Link href="/">Main</Link>}
				{home && <h2 className="text-black text-2xl">{name}</h2>}
			</header>
			<div className={css({ margin: "0 auto", padding: 4 })}>{children}</div>
			<footer></footer>
		</div>
	);
};

export default Layout;
