import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

import clsx from 'clsx';
import { useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	setIsOpen?: (arg0: boolean) => void;
};

export const ArrowButton = ({ setIsOpen }: TArrowButtonProps) => {
	// Техническая переменныя
	const [openConfig, setOpenConfig] = useState<boolean>(false);

	// Настройка стилей стрелки
	const menuStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: openConfig,
	});
	const arrowStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: openConfig,
	});

	// Меняет статус открытия/закрытия окна
	const openForm = () => {
		setIsOpen?.(!openConfig);
		setOpenConfig(!openConfig);
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
};
