import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

import clsx from 'clsx';
import { memo } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isMenuOpen: boolean;
	setIsMenuOpen: (arg0: boolean) => void;
};

export const ArrowButton = memo(
	({ isMenuOpen, setIsMenuOpen }: TArrowButtonProps) => {
		// Настройка стилей стрелки
		const menuStyle = clsx({
			[styles.container]: true,
			[styles.container_open]: isMenuOpen,
		});
		const arrowStyle = clsx({
			[styles.arrow]: true,
			[styles.arrow_open]: isMenuOpen,
		});

		// Меняет статус открытия/закрытия окна
		const openForm = () => {
			setIsMenuOpen(!isMenuOpen);
		};

		return (
			/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
			<div
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={menuStyle}
				onClick={openForm}>
				<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
			</div>
		);
	}
);

ArrowButton.displayName = 'ArrowButton';
