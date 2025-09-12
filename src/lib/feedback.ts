import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

async function getFeedbackCollection() {
  const db = await connectToDatabase();
  return db.collection('feedback');
}

export const getFeedback = async () => {
  const collection = await getFeedbackCollection();
  const feedback = await collection.find({}).toArray();
  return feedback.map(doc => ({ id: doc._id.toString(), ...doc }));
};

export const addFeedback = async (feedback: { name: string, message: string }) => {
  const collection = await getFeedbackCollection();
  const result = await collection.insertOne({ ...feedback, timestamp: new Date() });
  return result.insertedId.toString();
};

export const deleteFeedbackById = async (id: string) => {
  const collection = await getFeedbackCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
