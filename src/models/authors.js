import { getDb } from '../db/connect.js';
import { ObjectId } from 'mongodb';

const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();
  return authors;
};

const getAuthorById = async (authorId) => {
  if (!ObjectId.isValid(authorId)) {
    return null;
  }
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ _id: new ObjectId(authorId) });
  return author;
};

const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.insertOne(author);
  return result.insertedId;
};

const updateAuthor = async (authorId, changes) => {
  if (!ObjectId.isValid(authorId)) {
    return null;
  }
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.updateOne(
    { _id: new ObjectId(authorId) },
    { $set: changes }
  );
  return result.matchedCount;
};

const deleteAuthor = async (authorId) => {
  if (!ObjectId.isValid(authorId)) {
    return null;
  }
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.deleteOne({ _id: new ObjectId(authorId) });
  return result.deletedCount;
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
