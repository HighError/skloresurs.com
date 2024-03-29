import type { Metadata } from 'next';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import Reporting from '@/components/Reporting';
import getReportings from '@/strapi/get-reportings';
import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/reportings',
    },
    description: t('reportings.description'),
    openGraph: {
      description: t('reportings.description'),
      title: t('reportings.title'),
      url: 'https://skloresurs.com/reportings',
    },
    title: t('reportings.title'),
  };
}

export default async function Reportings() {
  const t = await getI18n();
  const reportings = await getReportings();

  return reportings ? (
    <div className='mx-auto max-w-6xl px-5'>
      <h1 className='mb-5 text-center'>{t('reportings.title')}</h1>
      <div className='flex flex-col gap-4'>
        {reportings.map((e) => (
          <div key={e.year}>
            <h2 className='mb-3'>
              {e.year} {t('reportings.year')}
            </h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Reporting href={e.auditory} title={t('reportings.auditory')} />
              <Reporting href={e.finance} title={t('reportings.finance')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
