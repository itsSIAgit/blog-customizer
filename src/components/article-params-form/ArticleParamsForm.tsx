import { Button } from 'components/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { FormEvent, ReactElement, useState } from 'react';
import { Text } from 'components/text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	children: ReactElement;
	setPageStyle: (arg0: ArticleStateType) => void;
	isMenuOpen: boolean;
};

export const ArticleParamsForm = ({
	children,
	setPageStyle,
	isMenuOpen,
}: TArticleParamsFormProps) => {
	// Технические переменные
	const [forceUpdateRadio, setForceUpdateRadio] = useState<boolean>(false);

	// Настройки полей формы
	const [newPageStyle, setNewPageStyle] =
		useState<ArticleStateType>(defaultArticleState);

	// Ф. вызываемая при нажатии кн. сброса формы
	const resetForm = (e: FormEvent) => {
		e.preventDefault();
		setPageStyle({ ...defaultArticleState });
		setNewPageStyle({ ...defaultArticleState });
		setForceUpdateRadio(!forceUpdateRadio);
	};

	// Ф. вызываемая при нажатии кн. применения полей формы
	const applyFormData = (e: FormEvent) => {
		e.preventDefault();
		setPageStyle({ ...newPageStyle });
	};

	return (
		<>
			{children}
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={applyFormData}
					onReset={resetForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={newPageStyle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setNewPageStyle((prevState) => ({
								...prevState,
								fontFamilyOption: option,
							}))
						}
						title='Шрифт'
					/>
					{/* key тут нужен, т.к. без него ломается "тыкательный" слой радио-кнопок */}
					{/* Например, если нажать 3ю -> сбросить форму -> 3я кн. будет недоступна, пока не нажать другие, хотя визуально все ок */}
					{/* Демонтируется (меняется key) при сбросе формы, в остальных случаях рендерится, при изменениях */}
					<RadioGroup
						key={forceUpdateRadio ? 'key0' : 'key1'}
						name='fontSizeButtons'
						options={fontSizeOptions}
						selected={newPageStyle.fontSizeOption}
						onChange={(option) =>
							setNewPageStyle((prevState) => ({
								...prevState,
								fontSizeOption: option,
							}))
						}
						title='Размер шрифта'
					/>
					<Select
						selected={newPageStyle.fontColor}
						options={fontColors}
						onChange={(option) =>
							setNewPageStyle((prevState) => ({
								...prevState,
								fontColor: option,
							}))
						}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={newPageStyle.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setNewPageStyle((prevState) => ({
								...prevState,
								backgroundColor: option,
							}))
						}
						title='Цвет фона'
					/>
					<Select
						selected={newPageStyle.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setNewPageStyle((prevState) => ({
								...prevState,
								contentWidth: option,
							}))
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
