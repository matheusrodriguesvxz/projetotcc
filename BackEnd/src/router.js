const express = require('express');
const router = express.Router();
const eventsController = require('./controllers/eventsController');
const eventsMiddlewares = require('./middlewares/eventMiddlewares');

router.get('/eventos', eventsController.getALL)
router.post('/eventos', eventsMiddlewares.validateEvent, eventsController.createEvent)
router.delete('/eventos/:id', eventsController.deleteEvent)
router.put('/eventos/:id', eventsController.updateEvent)

module.exports = router;

