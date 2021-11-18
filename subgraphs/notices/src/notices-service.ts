import { Notice } from './graphql-types';
import { GetDocsFrom } from './utils/db-queries';

export class NoticesService {
  async  getNotices(id: string): Promise<Notice[]> {
    const notices = await GetDocsFrom<Notice>((db) =>
      db.collection(`users/${id}/notices`)
    );
    return notices;
  }
}
