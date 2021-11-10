import { Alert } from '../../generated/graphql-types';
import { GetDocsFrom } from '../../utils/db-queries';

export class AlertsService {
  async getAlerts(id: string): Promise<Alert[]> {
    const alert = await GetDocsFrom<Alert>((db) =>
      db.collection(`users/${id}/alerts`)
    );
    return alert;
  }
}
