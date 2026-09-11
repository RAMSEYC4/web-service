import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../models/authors.js';

const getAllAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('GET /authors failed', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getAuthorByIdHandler = async (req, res) => {
  const reqId = req.params.id;
  try {
    const author = await getAuthorById(reqId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json(author);
  } catch (error) {
    console.error('GET /authors/:id failed', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const createAuthorHandler = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name is required' });
  }
  try {
    const insertedId = await createAuthor(req.body);
    return res.status(201).json({ id: insertedId });
  } catch (error) {
    console.error('POST /authors failed', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const updateAuthorHandler = async (req, res) => {
  const reqId = req.params.id;
  try {
    const matchedCount = await updateAuthor(reqId, req.body);
    if (!matchedCount) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('PUT /authors/:id failed', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const deleteAuthorHandler = async (req, res) => {
  const reqId = req.params.id;
  try {
    const deletedCount = await deleteAuthor(reqId);
    if (!deletedCount) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /authors/:id failed', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export {
  getAllAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
};
