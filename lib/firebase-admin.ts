
import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined');
  }
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(Buffer.from(serviceAccount, 'base64').toString('utf-8'))),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();
