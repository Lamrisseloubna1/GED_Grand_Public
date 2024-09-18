import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/doc'; // Replace with your backend URL

// Get a single document by ID
export const getDocument = async (id: number) => {
  const response = await fetch(`${BASE_URL}/get/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch document');
  }
  return await response.json();
};

// Get all documents
export const getAllDocuments = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return await response.json();
};

// Get total number of documents
export const getTotalDocuments = async () => {
  const response = await fetch(`${BASE_URL}/total`);
  if (!response.ok) {
    throw new Error('Failed to fetch total documents');
  }
  return await response.json();
};

// Get new documents this month
export const getNewDocumentsThisMonth = async () => {
  const response = await fetch(`${BASE_URL}/new-this-month`);
  if (!response.ok) {
    throw new Error('Failed to fetch new documents this month');
  }
  return await response.json();
};

// Get documents by theme
export const getDocumentsByTheme = async (idTheme: number) => {
  const response = await fetch(`${BASE_URL}/theme/${idTheme}`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents by theme');
  }
  return await response.json();
};

// Count documents by theme
export const countDocumentsByTheme = async (idTheme: number) => {
  const response = await fetch(`${BASE_URL}/theme/${idTheme}/count`);
  if (!response.ok) {
    throw new Error('Failed to count documents by theme');
  }
  return await response.json();
};

// Search documents by theme or date
export const searchDocumentsByThemeOrDate = async (theme: string, dateDepot: string) => {
  const query = new URLSearchParams({
    theme: theme || '',
    dateDepot: dateDepot || ''
  }).toString();
  const response = await fetch(`${BASE_URL}/search?${query}`);
  if (!response.ok) {
    throw new Error('Failed to search documents');
  }
  return await response.json();
};

// Sort documents by title
export const sortDocumentsByTitle = async () => {
  const response = await fetch(`${BASE_URL}/sort/title`);
  if (!response.ok) {
    throw new Error('Failed to sort documents by title');
  }
  return await response.json();
};

// Sort documents by date
export const sortDocumentsByDate = async () => {
  const response = await fetch(`${BASE_URL}/sort/date`);
  if (!response.ok) {
    throw new Error('Failed to sort documents by date');
  }
  return await response.json();
};
