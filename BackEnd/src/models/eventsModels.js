const connection = require('./connection')

const getAll = async () => {
  const query = `
  SELECT 
    Eventos.id,
    Eventos.nome,
    Eventos.tipo ,
    Eventos.descricao,
    Eventos.data_inicial,
    Eventos.data_final,
    Eventos.orcamento,
    Eventos.pix,
    Eventos.maiorDeIdade,
    Endereco.id as id_endereco,
    Endereco.cep,
    Endereco.rua,
    Endereco.cidade,
    Endereco.estado,
    Endereco.bairro,
    Endereco.complemento,
    Endereco.pais 
  FROM 
    Eventos 
  JOIN 
    Endereco ON Eventos.id_endereco = Endereco.id;
`;

  const [events] = await connection.execute(query);
  return events;
}

const createEvent = async (event) => {
  const currentDate = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formattedDate = formatDate(currentDate);


  const { id_endereco, nome, tipo, descricao, orcamento, pix, maiorDeIdade } = event
  const query = "INSERT INTO Eventos (id_endereco,data_inicial,data_final,nome,tipo,descricao,orcamento,pix,maiorDeIdade) values(?,?,?,?,?,?,?,?,?)"
  const [createdEvent] = await connection.execute(query, [id_endereco, formattedDate, formattedDate, nome, tipo, descricao, orcamento, pix, maiorDeIdade])
  return { insertId: createdEvent.insertId };
}



const deleteEvent = async (id) => {
  const deletedEvent = await connection.execute('DELETE from Eventos where id = ?;', [id]);
  return deletedEvent;
}
const updateEvent = async (id, event) => {
  const { data_inicial, data_final,nome, tipo, descricao, orcamento, pix, maiorDeIdade } = event
  const query = "UPDATE Eventos SET data_inicial = ?, data_final = ?, nome = ?,tipo = ?,descricao = ?,orcamento = ?,pix = ?,maiorDeIdade = ? where id = ?;"
  const [updatedEvent] = await connection.execute(query, [data_inicial, data_final, nome, tipo, descricao, orcamento, pix, maiorDeIdade, id]);

  return updatedEvent;
}

module.exports = {
  getAll,
  createEvent,
  deleteEvent,
  updateEvent
}