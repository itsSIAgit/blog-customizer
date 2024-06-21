import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { CSSProperties, FormEvent, useState } from 'react';
import { Text } from 'components/text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	setPageStyle?: (arg0: CSSProperties) => void;
};

export const ArticleParamsForm = ({
	setPageStyle,
}: TArticleParamsFormProps) => {
	// Технические переменные
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [forceUpdateRadio, setForceUpdateRadio] = useState<boolean>(false);

	// Настройки полей формы
	const [fontFamilySelect, setFontFamilySelect] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeSelect, setFontSizeSelect] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorSelect, setFontColorSelect] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColorSelect, setBackgroundColorSelect] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidthSelect, setContentWidthSelect] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	// Создает пакет стилей для App
	const createModStyle = (isDefault: boolean) => {
		// Условная конструкция для решения проблемы, что при сбросе формы значения под useState применяются не сразу
		return {
			'--font-family': isDefault
				? defaultArticleState.fontFamilyOption.value
				: fontFamilySelect.value,
			'--font-size': isDefault
				? defaultArticleState.fontSizeOption.value
				: fontSizeSelect.value,
			'--font-color': isDefault
				? defaultArticleState.fontColor.value
				: fontColorSelect.value,
			'--bg-color': isDefault
				? defaultArticleState.backgroundColor.value
				: backgroundColorSelect.value,
			'--container-width': isDefault
				? defaultArticleState.contentWidth.value
				: contentWidthSelect.value,
		} as CSSProperties;
	};

	// Ф. вызываемая при нажатии кн. сброса формы
	const resetForm = (e: FormEvent) => {
		e.preventDefault();
		setFontFamilySelect(defaultArticleState.fontFamilyOption);
		setFontSizeSelect(defaultArticleState.fontSizeOption);
		setFontColorSelect(defaultArticleState.fontColor);
		setBackgroundColorSelect(defaultArticleState.backgroundColor);
		setContentWidthSelect(defaultArticleState.contentWidth);
		setPageStyle?.(createModStyle(true));
		setForceUpdateRadio(!forceUpdateRadio);
	};

	// Ф. вызываемая при нажатии кн. применения полей формы
	const applyFormData = (e: FormEvent) => {
		e.preventDefault();
		setPageStyle?.(createModStyle(false));
	};

	return (
		<>
			<ArrowButton setIsOpen={setIsOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					style={{ gap: 50 }}
					onSubmit={applyFormData}
					onReset={resetForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamilySelect}
						options={fontFamilyOptions}
						onChange={setFontFamilySelect}
						title='Шрифт'
					/>
					{/* key тут нужен, т.к. без него ломается "тыкательный" слой радио-кнопок */}
					{/* Например, если нажать 3ю -> сбросить форму -> 3я кн. будет недоступна, пока не нажать другие, хотя визуально все ок */}
					{/* Демонтируется (меняется key) при сбросе формы, в остальных случаях рендерится, при изменениях */}
					<RadioGroup
						key={forceUpdateRadio ? 'key0' : 'key1'}
						name='fontSizeButtons'
						options={fontSizeOptions}
						selected={fontSizeSelect}
						onChange={setFontSizeSelect}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColorSelect}
						options={fontColors}
						onChange={setFontColorSelect}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={backgroundColorSelect}
						options={backgroundColors}
						onChange={setBackgroundColorSelect}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidthSelect}
						options={contentWidthArr}
						onChange={setContentWidthSelect}
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
