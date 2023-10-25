import Image from 'next/image';
import React from 'react';

import { getI18n } from '@/utils/i18nServer';
import getAllCertificates from '@/strapi/get-all-certificates';

import CertificatesGallery from './CertificatesGallery';

export default async function Certificates() {
  const certificates = await getAllCertificates();
  const t = await getI18n();
  return (
    <div
      id="certificates"
      className="relative mx-auto aspect-[2/1] max-w-6xl md:mb-20"
      data-aos="fade-up"
    >
      <Image src="/certificate-bg.png" alt="" fill className="object-cover" />
      <div className="px-6 pt-12 md:w-2/3 md:p-24">
        <h2
          className="leading-relaxed"
          data-aos="fade-right"
          data-aos-delay={100}
        >
          {t('home.certificates.title')}
        </h2>
        {certificates && <CertificatesGallery images={certificates} />}
      </div>
    </div>
  );
}
