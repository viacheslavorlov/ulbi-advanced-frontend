import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';

interface MainPageProps {
    className?: string
}

const MainPage = memo((props: MainPageProps) => {
    const { t } = useTranslation('main');

    return (
        <div className={props.className}>
            <BugButton />
            {t('Главная')}
        </div>
    );
});

export default MainPage;
