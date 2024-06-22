import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './components/arrow-button/ArrowButton';

import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

export const App = () => {
	// Переменная для комплекта стилей главной страницы
	const [pageStyle, setPageStyle] =
		useState<ArticleStateType>(defaultArticleState);

	// Статус меню - открыто/закрыто
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<>
			<header>
				<ArticleParamsForm setPageStyle={setPageStyle} isMenuOpen={isMenuOpen}>
					<ArrowButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
				</ArticleParamsForm>
			</header>
			<main
				className={styles.main}
				style={
					{
						'--font-family': pageStyle.fontFamilyOption.value,
						'--font-size': pageStyle.fontSizeOption.value,
						'--font-color': pageStyle.fontColor.value,
						'--container-width': pageStyle.contentWidth.value,
						'--bg-color': pageStyle.backgroundColor.value,
					} as CSSProperties
				}
				onClick={() => setIsMenuOpen(false)}>
				<Article />
			</main>
		</>
	);
};
