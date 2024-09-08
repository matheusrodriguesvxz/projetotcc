const eventsModels = require('../models/eventsModels');

const getALL = async (_req, res) => {

  const events = await eventsModels.getAll()
  return res.status(200).json(events)
}


const createEvent = async (req, res) => {
  const createdEvent = await eventsModels.createEvent(req.body)
  return res.status(201).json(createdEvent);
}

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  await eventsModels.deleteEvent(id);
  return res.status(204).json();
}

const updateEvent = async (req, res) => {
  const { id } = req.params;
  await eventsModels.updateEvent(id, req.body);
  return res.status(204).json();
}


module.exports = {
  getALL,
  createEvent,
  deleteEvent,
  updateEvent
}