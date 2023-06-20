import Head from "next/head";
import Link from "next/link";
import { css } from "@styles/css";

type Props = {
	children: React.ReactNode;
	home?: boolean;
	title: string;
	name?: string;
};

const Layout = ({ children, home, title, name }: Props) => {
	return (
		<div
			className={css({
				display: "grid",
				gridTemplateRows: "10rem auto 10rem",
				gridTemplateColumns: "auto",
				height: "100vh",
			})}
		>
			<Head>
				<title>{title}</title>
			</Head>
			<header className={css({ display: "flex", flexDirection: "column", alignItems: "center" })}>
				{!home && <Link href="/">Main</Link>}
				{home && <h2 className={css({ fontSize: "2xl", color: "black.700" })}>{name}</h2>}
			</header>
			<div className={css({ margin: "0 auto", padding: 4 })}>{children}</div>
			<footer className={css({ padding: [4, 5] })}>
				<ul className={css({ listStyle: "none" })}>
					<li>
						<Link href="/">Blog</Link>
					</li>
					<li>
						<Link href="/todo">Todos</Link>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Layout;
