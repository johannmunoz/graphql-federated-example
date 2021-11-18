/* eslint-disable no-undef */
import admin from 'firebase-admin';
import { getDataSetDatesAndId } from './doc-parser';

type Firestore = FirebaseFirestore.Firestore;
type CollectionReference = FirebaseFirestore.CollectionReference;
type DocumentReference = FirebaseFirestore.DocumentReference;
type Query = FirebaseFirestore.Query;

interface DocWithId {
  id: string;
}

export async function GetDocsFrom<T>(
  collectionFunction: (db: Firestore) => CollectionReference | Query
): Promise<Array<T & DocWithId>> {
  const db = admin.firestore();
  const collectionRef = collectionFunction(db);
  const collectionSnap = await collectionRef.get();
  const allDocsData = collectionSnap.docs.map((d) =>
    getDataSetDatesAndId<T & DocWithId>(d)
  );
  return allDocsData;
}

export async function GetDocFrom<T>(
  documentFunction: (db: Firestore) => DocumentReference
): Promise<T & DocWithId> {
  const db = admin.firestore();
  const docRef = documentFunction(db);
  const docSnap = await docRef.get();
  const allDocsData = getDataSetDatesAndId<T & DocWithId>(docSnap);
  return allDocsData;
}

export async function DoesDocExist(
  documentFunction: (db: Firestore) => DocumentReference
): Promise<boolean> {
  const db = admin.firestore();
  const docRef = documentFunction(db);
  const docSnap = await docRef.get();
  return docSnap.exists;
}

export async function GetDocSnapshotFrom(
  documentFunction: (db: Firestore) => DocumentReference
): Promise<FirebaseFirestore.DocumentSnapshot> {
  const db = admin.firestore();
  const docRef = documentFunction(db);
  const docSnap = await docRef.get();

  return docSnap;
}
