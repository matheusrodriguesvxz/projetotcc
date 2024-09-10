const connection = require('./connection')


const getAllAdress = async () => {
    const query = "SELECT * FROM ENDERECO;";

    const [adress] = await connection.execute(query);
    return adress
}


const createAdress = async (adress) => {
    const { cep, rua, cidade, estado, complemento, bairro, pais } = adress

    const query = "insert into endereco (cep,rua,cidade,estado,complemento,bairro,pais) values (?,?,?,?,?,?,?)";

    const [createdAdress] = await connection.execute(query, [cep, rua, cidade, estado, complemento, bairro, pais]);

    return { insertId: createdAdress.insertId };
}

const deleteAdress = async (id) => {
    const query = "delete from endereco where id = ?";
    const deletedAdress = connection.execute(query, [id]);
    return deletedAdress;

}

const updateAdress = async (adress, id) => {
    const { cep, rua, cidade, estado, complemento, bairro, pais } = adress

    const query = "update endereco set cep = ?, rua = ?, cidade = ?, estado = ?, complemento = ?, bairro = ?, pais = ? where id = ?";

    const [updatedAdress] = await connection.execute(query, [cep,rua,cidade,estado,complemento,bairro,pais,id]);

    return updatedAdress;
}

module.exports = {
    getAllAdress,
    createAdress,
    deleteAdress,
    updateAdress
}