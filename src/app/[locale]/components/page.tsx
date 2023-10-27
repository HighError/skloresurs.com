import React from 'react';

import ComponentsClient from '@/components/ComponentsClient';
import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import getAllComponentCategories from '@/strapi/get-all-component-categories';
import getAllComponents from '@/strapi/get-all-components';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Components() {
  const t = await getI18n();
  const categories = await getAllComponentCategories(getCurrentLocale());
  const components = await getAllComponents(getCurrentLocale());
  return (
    <PageTransitionWrapper>
      <div className="mx-auto w-full max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('components.title')}</h1>
        {(!categories || !components) && <ErrorLoaded />}
        {categories && components && (
          <I18nProvider locale={getCurrentLocale()}>
            <ComponentsClient categories={categories} components={components} />
          </I18nProvider>
        )}
      </div>
    </PageTransitionWrapper>
  );
}