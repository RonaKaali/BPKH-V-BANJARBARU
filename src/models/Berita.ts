 import { ObjectId } from 'mongodb';

export interface Berita {
  _id?: ObjectId;
  slug: string;
  title: string;
  date: string; // ISO 8601 format (e.g., "2025-09-22")
  image: string; // URL or path to the image
  content: string; // HTML content
  createdAt?: Date;
  updatedAt?: Date;
}
