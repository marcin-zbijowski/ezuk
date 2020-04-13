import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Container } from '../models/container';

type Collections = 'containers';
type Models = Container;

if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}

const db = admin.firestore();

const handleError = (error: any): void => {
    console.warn('Firebase error: ', error);
};

const getCollection = async (name: Collections): Promise<Array<any>> => {
    let collection: Array<any> = [];
    await db
        .collection(name)
        .get()
        .then(querySnapshot => (collection = querySnapshot.docs.map(doc => ({ ...doc.data(), refId: doc.id }))))
        .catch(handleError);

    return collection;
};

const saveDoc = async (collection: Collections, doc: Models): Promise<string> => {
    const handleResponse = () => (result = 'Document successfully written!');
    const refId = doc.refId;
    delete doc.refId;

    Object.keys(doc).forEach((key: string) => {
        if (doc[key] === undefined) {
            delete doc[key];
        }
    });

    let result: string;
    if (refId) {
        await db
            .collection(collection)
            .doc(refId)
            .set(doc)
            .then(handleResponse)
            .catch(handleError);
    } else {
        await db
            .collection(collection)
            .doc()
            .set(doc)
            .then(handleResponse)
            .catch(handleError);
    }

    return result;
};

export { getCollection, saveDoc };
