import { Text } from 'components/text';

import styles from './Button.module.scss';
import { memo } from 'react';

export const Button = memo(
	({
		title,
		onClick,
		type,
	}: {
		title: string;
		onClick?: () => void;
		type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	}) => {
		return (
			<button className={styles.button} type={type} onClick={onClick}>
				<Text weight={800} uppercase>
					{title}
				</Text>
			</button>
		);
	}
);

Button.displayName = 'Button';
