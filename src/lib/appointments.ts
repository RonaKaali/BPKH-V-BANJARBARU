
import admin from 'firebase-admin';

let db: admin.firestore.Firestore;

try {
  if (!admin.apps.length) {
    console.log('Initializing Firebase Admin SDK for appointments...');
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK for appointments Initialized successfully.');
  }
  db = admin.firestore();
} catch (e) {
  console.error('Firebase Admin SDK initialization error in appointments.ts:', e);
}

export const getAppointments = async () => {
  if (!db) {
    console.error('Firestore is not initialized in appointments.ts.');
    throw new Error('Firestore is not initialized.');
  }
  console.log('Fetching appointments from Firestore...');
  const appointmentsCol = await db.collection('appointments').get();
  console.log('Appointments fetched successfully.');
  return appointmentsCol.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addAppointment = async (appointment: { name: string, email: string, phone: string, date: string, purpose: string }) => {
  if (!db) {
    console.error('Firestore is not initialized in appointments.ts.');
    throw new Error('Firestore is not initialized.');
  }
  console.log('Adding appointment to Firestore:', appointment);
  const appointmentRef = await db.collection('appointments').add({ ...appointment, status: 'Pending', timestamp: new Date() });
  console.log('Appointment added successfully with ID:', appointmentRef.id);
  return appointmentRef.id;
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  if (!db) {
    console.error('Firestore is not initialized in appointments.ts.');
    throw new Error('Firestore is not initialized.');
  }
  console.log(`Updating appointment with ID ${id} to status ${status}`)
  await db.collection('appointments').doc(id).update({ status });
  console.log('Appointment status updated successfully.');
};
