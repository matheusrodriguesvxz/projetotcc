const validateEvent = (req, res, next) => {
  // Desestruturacao da requisao.body
  const { id_endereco, nome, tipo, descricao, orcamento, pix, maiorDeIdade } = req.body;


  //Para evitar varios if repetidos e deixar algo feio,criamos um objeto
  // desestruturamos os valores passados para a requisao e colocamos ele em um field
  // e deixamos uma mensagem caso esses valores forem passados nulos ou indefinidos.

  const validateFields = [
    { field: id_endereco, message: "Insira um endereco valido" },
    { field: nome, message: "Insira um nome valido" },
    { field: tipo, message: "Insira um tipo valido" },
    { field: descricao, message: "Insira uma descricao valido" },
    { field: orcamento, message: "Insira um orcamento valido" },
    { field: pix, message: "Insira um pix valido" },
    { field: maiorDeIdade, message: "Preencha o campo de maioridade" },
  ]

    // percoremos um for pra verificar se todos os fields sao validos,
    // caso nao sejam, vai retornar uma response com status 400 (bad Request)
    // e a mensagem do campo Vazio
  for (const { field, message } of validateFields) {
    if (field === undefined || field === null || field === "") {
      return res.status(400).json({   message });
    }
  }
  // Se tudo for valido,manda pro banco.
  next();
}

module.exports = {
  validateEvent
}