import type { IGlassCategory } from '@/types/Projects';
import axios from '@/utils/axios-cms';

export default async function getCategories(
  locale: string,
): Promise<IGlassCategory[] | null> {
  try {
    const { data } = await axios.get('/api/project-glass-types', {
      params: {
        locale,
        'pagination[pageSize]': 100,
        'sort[0]': 'title:asc',
      },
    });
    return data.data.map((e: any) => ({
      id: e.id,
      title: e.attributes.title,
    }));
  } catch (error) {
    return null;
  }
}
