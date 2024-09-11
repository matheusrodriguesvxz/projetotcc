const express = require('express');
const router = express.Router();
const eventsController = require('./controllers/eventsController');
const eventsMiddlewares = require('./middlewares/eventMiddlewares');
const adressController = require("./controllers/enderecoController");
const adressMiddlewares = require("./middlewares/enderecoMiddlewares");
const guestsController = require("./controllers/convidadosController")

// Rotas de Eventos
router.get('/eventos', eventsController.getALL);
router.post('/eventos', eventsMiddlewares.validateEvent, eventsController.createEvent);
router.delete('/eventos/:id', eventsController.deleteEvent);
router.put('/eventos/:id', eventsController.updateEvent);





// Rotas de Endereco;
router.get('/endereco', adressController.getAllAdress);
router.post('/endereco', adressMiddlewares.validateEvent, adressController.createAdress);
router.put('/endereco/:id', adressController.updateAdress);
router.delete('/endereco/:id', adressController.deleteAdress);



//Rotas de Convidados
router.get('/convidados', guestsController.getAllGuests);
router.post('/convidados', guestsController.createGuests);
router.put('/convidados/:id', guestsController.updateGuests);
router.delete('/convidados/:id', guestsController.deleteGuests);




module.exports = router;

