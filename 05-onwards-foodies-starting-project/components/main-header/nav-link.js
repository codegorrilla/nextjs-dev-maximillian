'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ children, href }) {
	const path = usePathname();
	return (
		<li>
			<Link
				href={href}
				className={
					path === href
						? `${classes.link} ${classes.active}`
						: `${classes.link}`
				}
			>
				{children}
			</Link>
		</li>
	);
}
