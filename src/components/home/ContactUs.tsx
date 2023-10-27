import { ReCaptchaProvider } from 'next-recaptcha-v3';
import React from 'react';

import { getCurrentLocale } from '@/utils/i18nServer';

import I18nProvider from '../I18nProvider';
import ContactUsForm from './ContactUsForm';

// TODO: Add recaptcha
// TODO: Add response message

export default async function ContactUs() {
  const locale = getCurrentLocale();

  return (
    <div
      id="contact-us"
      className="mx-auto mt-6 flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row"
    >
      <I18nProvider locale={locale}>
        <ReCaptchaProvider>
          <ContactUsForm />
        </ReCaptchaProvider>
      </I18nProvider>
      <div className="w-full md:pl-20" data-aos="fade-left">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.5591123481963!2d25.77302537690441!3d50.39341689146838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f834aa1a7e7c7%3A0x647fedd3239403!2z0KHQmtCb0J7QoNCV0KHQo9Cg0KEsINCi0J7Qkg!5e0!3m2!1suk!2sua!4v1697707292599!5m2!1s${locale}!2sua`}
          loading="lazy"
          width="100%"
          title="Google map"
          className="h-[500px] overflow-hidden rounded-md md:h-[700px]"
        />
      </div>
    </div>
  );
}