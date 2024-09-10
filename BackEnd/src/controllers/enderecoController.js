const adressModel = require("../models/enderecoModels");

const getAllAdress = async (_req, res) => {

    const adress = await adressModel.getAllAdress();
    return res.status(200).json(adress);
}


const createAdress = async (req, res) => {
    const createdAdress = await adressModel.createAdress(req.body);
    return res.status(201).json(createdAdress);
}


const deleteAdress = async (req, res) => {
    const { id } = req.params;
    const deletedAdress = await adressModel.deleteAdress(id);
    return res.status(204).json({ message: "Endereco Apagado com Sucesso" });
}


const updateAdress = async (req, res) => {
    const { id } = req.params;
    const updatedAdress = await adressModel.updateAdress(req.body, id);
    return res.status(204).json(updateAdress);
}


module.exports = {
    getAllAdress,
    createAdress,
    deleteAdress,
    updateAdress
}