const express = require('express');
const router = express.Router();
const eventsController = require('./controllers/eventsController');
const eventsMiddlewares = require('./middlewares/eventMiddlewares');
const adressController = require("./controllers/enderecoController");

// Rotas de Eventos
router.get('/eventos', eventsController.getALL)
router.post('/eventos', eventsMiddlewares.validateEvent, eventsController.createEvent)
router.delete('/eventos/:id', eventsController.deleteEvent)
router.put('/eventos/:id', eventsController.updateEvent)





// Rotas de Endereco;
router.get('/endereco', adressController.getAllAdress);
router.post('/endereco', adressController.createAdress);
router.put('/endereco/:id', adressController.updateAdress);
router.delete('/endereco/:id', adressController.deleteAdress);





module.exports = router;

