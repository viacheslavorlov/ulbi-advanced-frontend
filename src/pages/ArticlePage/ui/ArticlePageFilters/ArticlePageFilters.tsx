import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types/sortOrder';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    ArticleView, ArticleSortField, ArticleType, ArticleTypeTabs,
} from '../../../../entities/Article';
import { fetchArticlesList } from '../../model/service/fetchArticles/fetchArticles';
import {
    getArticlePageOrder, getArticlePageSearch, getArticlePageSort, getArticlePageType, getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { ArticleViewSelector } from '../ArticleViewSelector/ArticleViewSelector';
import { articlePageActions } from '../../model/slice/articlesSlice';

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 600);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(sort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlePageActions.setOrder(order));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [debounceFetchData, dispatch]);

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(articlePageActions.setType(tab.value as ArticleType));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [debounceFetchData, dispatch]);

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <HStack gap="16" max justify="between">
                <ArticleSortSelector
                    order={order}
                    onChangeOrder={onChangeOrder}
                    sort={sort}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </HStack>
            <Card>
                <Input value={search} placeholder={t('Поиск')} onChange={onChangeSearch} />
            </Card>
            <ArticleTypeTabs
                onChangeType={onChangeType}
                value={type}
            />
        </VStack>
    );
});
