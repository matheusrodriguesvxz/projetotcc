const convidadosModels = require("../models/convidadosModels");

const getAllGuests = async (_req, res) => {
    const guests = await convidadosModels.getAllGuests();
    return res.status(200).json(guests);
}


const deleteGuests = async (req, res) => {
    const { id } = req.params;
    const guests = await convidadosModels.deleteGuests(id);
    return res.status(204).json();
}



const createGuests = async (req, res) => {
    const createdGuests = await convidadosModels.createGuests(req.body)
    return res.status(201).json(createdGuests);
};

const updateGuests = async (req, res) => {
    const { id } = req.params;
    const updatedGuests = await convidadosModels.updateGuests(id, req.body)
    return res.status(204).json(updatedGuests);

}

module.exports = {
    createGuests,
    getAllGuests,
    deleteGuests,
    updateGuests,
}