import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetailsSelector';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types/type';
import { useSelector } from 'react-redux';
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { StateSchema } from 'app/providers/StoreProvider';

describe('articleDetailsSelector.test', () => {
    const article: DeepPartial<StateSchema> = {
        articleDetails: {
            data: {
                id: '1',
                title: 'Title fo article',
            },
        },
    };
    test('returns data', () => {
        expect(getArticleDetailsData(article as StateSchema)).toEqual({
            id: '1',
            title: 'Title fo article',
        });
    });
    test('returns error', () => {
        expect(getArticleDetailsError({
            articleDetails: {
                ...article.articleDetails,
                error: 'error',
            },
        } as StateSchema)).toEqual('error');
    });
    test('returns isLoading', () => {
        expect(getArticleDetailsIsLoading({
            articleDetails: {
                ...article.articleDetails,
                isLoading: true,
            },
        } as StateSchema)).toEqual(true);
    });
});
