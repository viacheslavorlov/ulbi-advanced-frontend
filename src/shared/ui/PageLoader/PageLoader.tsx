import { memo } from 'react';
import { Page } from '@/widgets/Page/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => (
    <Page className={classNames(cls.PageLoader, {}, [className])}>
        <LoadingSpinner />
    </Page>
));
