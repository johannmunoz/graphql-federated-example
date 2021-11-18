/* eslint-disable no-undef */
import admin from 'firebase-admin';

type Firestore = FirebaseFirestore.Firestore;
type CollectionReference = FirebaseFirestore.CollectionReference;
// type DocumentReference = FirebaseFirestore.DocumentReference;
interface DocWithId {
  id: string;
}

export async function AddDocTo<T>(
  collectionFunction: (db: Firestore) => CollectionReference,
  newDocObj: T
): Promise<T & DocWithId> {
  const db = admin.firestore();
  const collectionRef = collectionFunction(db);
  const res = await collectionRef.add(newDocObj);
  const returnObj = newDocObj as T & DocWithId;
  returnObj.id = res.id;
  return returnObj;
}

export async function UpdateDoc<T>(
  collectionFunction: (db: Firestore) => CollectionReference,
  id: string,
  obj: T
): Promise<void> {
  const db = admin.firestore();
  const collectionRef = collectionFunction(db);
  await collectionRef.doc(id).set(obj, { merge: true });
}

export async function RemoveDoc(
  collectionFunction: (db: Firestore) => CollectionReference,
  id: string
): Promise<void> {
  const db = admin.firestore();
  const collectionRef = collectionFunction(db);
  await collectionRef.doc(id).delete();
}
