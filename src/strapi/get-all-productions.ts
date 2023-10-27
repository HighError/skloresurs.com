import type IProduction from 'src/interfaces/Production';
import axios from 'src/utils/axios-cms';

export default async function getAllProductions(
  locale: string,
): Promise<IProduction[] | null> {
  try {
    const { data } = await axios.get('/api/productions', {
      params: {
        locale,
        'populate[0]': 'video',
      },
    });
    return data.data.map((e: any) => {
      return {
        title: e.attributes.title,
        description: e.attributes.description,
        original: process.env.CMS_URL + e.attributes.video.data.attributes.url,
      };
    });
  } catch (error) {
    return null;
  }
}