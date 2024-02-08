import admin from 'firebase-admin';

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n")
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // Sua configuração do SDK
      projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY as string),
    })
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
