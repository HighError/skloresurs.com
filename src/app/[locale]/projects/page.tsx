import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import ProjectFilter from '@/components/projects/ProjectFilter';
import ProjectsClient from '@/components/projects/ProjectsClient';
import { Separator } from '@/components/ui/separator';
import getAllProjectGlassCategories from '@/strapi/get-all-project-glass-categories';
import getAllProjectLocations from '@/strapi/get-all-project-locations';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Projects() {
  const locale = getCurrentLocale();
  const locations = await getAllProjectLocations(locale);
  const glassCategories = await getAllProjectGlassCategories(locale);

  const t = await getI18n();
  return (
    <PageTransitionWrapper>
      {(!locations || !glassCategories) && <ErrorLoaded />}
      {locations && glassCategories && (
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-5 text-center">{t('projects.title')}</h1>
          <I18nProvider locale={locale}>
            <div className="flex h-full flex-col gap-3 md:flex-row">
              <ProjectFilter
                locations={locations}
                glassCategories={glassCategories}
              />
              <Separator
                orientation="vertical"
                className="hidden h-auto md:block"
              />
              <ProjectsClient locations={locations} />
            </div>
          </I18nProvider>
        </div>
      )}
    </PageTransitionWrapper>
  );
}
