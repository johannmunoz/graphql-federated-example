import { firestore } from 'firebase-admin';
import { parseAllDatesDoc } from './timestamp-parser';

export function getDataSetDatesAndId<T>(doc: firestore.DocumentSnapshot): T {
  if (!doc.exists) {
    return {} as T;
  }
  const data = doc.data();
  if (!data) {
    return {} as T;
  }
  data.id = doc.id;
  parseAllDatesDoc(data);
  return data as T;
}
