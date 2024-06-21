import { memo } from 'react';
import styles from './index.module.scss';

export const Separator = memo(() => {
	return <div className={styles.separator}></div>;
});

Separator.displayName = 'Separator';
