const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

/**
 * Project Service
 * Handles CRUD operations for projects using JSON file storage
 */

// Read projects from file
const readProjects = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Write projects to file
const writeProjects = (projects) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
};

// Get all projects
const getAll = () => {
  return readProjects();
};

// Get a single project by ID
const getById = (id) => {
  const projects = readProjects();
  return projects.find((p) => p.id === id) || null;
};

// Create a new project
const create = ({ name, port, domain }) => {
  const projects = readProjects();

  // Check for duplicate port
  if (projects.some((p) => p.port === port)) {
    throw new Error(`Port ${port} is already in use.`);
  }

  const project = {
    id: uuidv4(),
    name,
    port,
    domain,
    status: 'stopped',
    createdAt: new Date().toISOString(),
  };

  projects.push(project);
  writeProjects(projects);
  return project;
};

// Delete a project by ID
const remove = (id) => {
  let projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error('Project not found.');
  }

  const removed = projects.splice(index, 1)[0];
  writeProjects(projects);
  return removed;
};

// Update project status
const updateStatus = (id, status) => {
  const projects = readProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    throw new Error('Project not found.');
  }

  project.status = status;
  writeProjects(projects);
  return project;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  updateStatus,
};
