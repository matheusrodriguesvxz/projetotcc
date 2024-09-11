const connection = require("./connection")

const getAllGuests = async () => {
    const query = "SELECT * FROM convidados";

    const [answerGuests] = await connection.execute(query);
    return answerGuests;
}


const createGuests = async (guests) => {
    const { nome, idade, contato, sexo } = guests;
    const query = "INSERT INTO convidados(nome, idade, contato, sexo) values (?,?,?,?);";

    const [createdGuests] = await connection.execute(query, [nome, idade, contato, sexo]);

    return { insertId: createdGuests.insertId };
}


const deleteGuests = async (Id) => {
    const query = "delete from convidados where id = ?";
    const deletedGuest = await connection.execute(query, [Id])
    return deletedGuest;
}

const updateGuests = async (Id, Guest) => {
    const { nome, idade, contato, sexo } = Guest
    const query = "UPDATE Convidados SET nome = ?, idade = ?, contato = ?, sexo = ? where id = ?;"
    const [updatedGuests] = await connection.execute(query, [nome, idade, contato, sexo, Id]);
    return updateGuests;

}



module.exports = {
    createGuests,
    getAllGuests,
    deleteGuests,
    updateGuests
}



