'use client';

import 'react-medium-image-zoom/dist/styles.css';

import Autoplay from 'embla-carousel-autoplay';
import { map } from 'lodash';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';

import { MdiCalendar, MdiEarth, MdiGlassdoor } from '@/components/icons/mdi';
import type IProject from '@/types/Projects';
import axios from '@/utils/axios-cache';
import { GenerateProjectLink } from '@/utils/generate-links';
import { useCurrentLocale, useI18n } from '@/utils/i18n-client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import CustomPagination from '../ui/pagination';

export default function ProjectsClient() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const query = useSearchParams();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const location = query.get('location');
  const glassCategory = query.get('glass');
  const yearFrom = query.get('year-from');
  const yearTo = query.get('year-to');
  const search = query.get('search');
  const page = query.get('page');

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    const response = await axios
      .get(GenerateProjectLink(locale, location, glassCategory, yearFrom, yearTo, search, page))
      .catch(() => null);
    if (response?.data) {
      setProjects(response.data.data);
      setProjectsCount(response.data.meta.total);
    }
    setIsLoading(false);
  }, [locale, location, glassCategory, yearFrom, yearTo, search, page]);

  useEffect(() => {
    setProjects([]);
    getProjects();
  }, [getProjects]);

  return (
    <div className='flex-1 py-2'>
      {isLoading && (
        <div className='w-full'>
          <div className='relative mx-auto aspect-square w-[400px] max-w-full'>
            <Image src='/loading.svg' alt='loading' title='loading' fill className='object-contain' />
          </div>
        </div>
      )}
      {!isLoading && projectsCount === 0 && (
        <div className='w-full'>
          <div className='relative mx-auto aspect-square w-[400px] max-w-full'>
            <Image src='/neutral-face.svg' alt='missing' title='missing' fill className='object-contain' />
          </div>
          <h2 className='text-center'>{t('projects.none')}</h2>
        </div>
      )}
      {!isLoading && projectsCount > 0 && (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {projects.map((e) => (
              <div
                className='flex break-inside-avoid-column flex-col gap-2'
                key={e.id}
                data-aos='fade-down'
                data-aos-anchor-placement='top-bottom'
              >
                <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                  <Carousel
                    className='aspect-square size-full'
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 5000,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {map(e.images, (image) => (
                        <CarouselItem>
                          <Zoom key={image}>
                            <Image
                              src={image}
                              alt={e.title}
                              title={e.title}
                              width={1024}
                              height={1024}
                              loading='eager'
                            />
                          </Zoom>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-4' />
                    <CarouselNext className='right-4' />
                  </Carousel>
                </div>
                <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                  <div className='flex flex-row items-center gap-1'>
                    <MdiEarth className='size-4 min-w-[16px]' />
                    {e.location.title}
                  </div>
                  <div className='flex flex-row items-center gap-1'>
                    <MdiGlassdoor className='size-4 min-w-[16px]' /> {e.glass}
                  </div>
                  <div className='flex flex-row items-center gap-1'>
                    <MdiCalendar className='size-4 min-w-[16px]' /> {e.year}
                  </div>
                </div>
                <h2 className='mb-2 text-base lg:text-lg '>{e.title}</h2>
              </div>
            ))}
          </div>
          <CustomPagination totalPages={Math.ceil(projectsCount / 9)} href='/projects' />
        </>
      )}
    </div>
  );
}
