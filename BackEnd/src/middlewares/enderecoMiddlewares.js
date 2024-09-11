const validateEvent = (req, res, next) => {
   
   
    // Desestruturacao da requisao.body
    const { cep, rua, cidade, estado, complemento, bairro, pais }= req.body;
  
  
    //Para evitar varios if repetidos e deixar algo feio,criamos um objeto
    // desestruturamos os valores passados para a requisao e colocamos ele em um field
    // e deixamos uma mensagem caso esses valores forem passados nulos ou indefinidos.
  
    const validateFields = [
      { field: cep, message: "Insira um cep valido." },
      { field: rua, message: "Insira uma rua valida." },
      { field: cidade, message: "Insira uma cidade valido." },
      { field: estado, message: "Insira uma estado valido." },
      { field: bairro, message: "Insira um bairro valido." },
      { field: pais, message: "Pais nao encontrado." },
    ]
  
      // percorremos um for pra verificar se todos os fields sao validos,
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