import axios from 'axios';
import sha1 from 'js-sha1';
import md5 from 'md5';

const isOnDevMode = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

export const axiosInstance = axios.create({
  baseURL: isOnDevMode ? `http://localhost/cats/api` : `http://157.230.84.180/cats/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

// ---- PEDIDOS ----- //
export const getPedidosPaginacaoData = (registros, pagina, date, status) => {
  const data = new FormData();

  var dataInicio;
  var dataFim;

  // Caso não exista o parametro data pega o range do ano todo
  if (!date) {
    const year = currantYear();
    dataInicio = `${year}-01-01 00:00:00`;
    dataFim = `${year}-12-31 23:59:59`;
  } else {

    //TODO split date 01/01/2019
    var infors = date.split('/');

    var year = infors[2];
    var month = infors[1];
    var day = infors[0];

    dataInicio = `${year}-${month}-${day} 00:00:00`;
    dataFim = `${year}-${month}-${day} 23:59:00`;
  }

  data.append('registros', registros);
  data.append('pagina', pagina);
  data.append('data_inicio', dataInicio);
  data.append('data_fim', dataFim);
  data.append('token', token('get_produtos_paginacao'));
  data.append('nome_script', 'get_produtos_paginacao');

  if (status !== 'T')
    data.append('status', status);

  return data;
};

export const getPedidosPorIdCliente = (idCliente, date) => {
  const data = new FormData();

  var dataInicio;
  var dataFim;

  // Caso não exista o parametro data pega o range do ano todo
  if (!date) {
    const year = currantYear();
    dataInicio = `${year}-01-01 00:00:00`;
    dataFim = `${year}-12-31 23:59:59`;
  } else {

    //TODO split date 01/01/2019
    var infors = date.split('/');

    var year = infors[2];
    var month = infors[1];
    var day = infors[0];

    dataInicio = `${year}-${month}-${day} 00:00:00`;
    dataFim = `${year}-${month}-${day} 23:59:00`;
  }

  data.append('id_cliente', idCliente);
  data.append('data_inicio', dataInicio);
  data.append('data_fim', dataFim);
  data.append('token', token('get_produtos_paginacao'));
  data.append('nome_script', 'get_produtos_paginacao');

  return data;
};

export const getPedidoPorId = (id) => {

  const data = new FormData();

  data.append('id_pedido', id);
  data.append('token', token('get_produtos_paginacao'));
  data.append('nome_script', 'get_produtos_paginacao');

  return data;

}

export const putPedidoData = (pedidos) => {

  const data = new FormData();

  for (var key in pedidos)
    data.append(key, pedidos[key]);

  data.append('token', token('put_pedidos'));
  data.append('nome_script', 'put_pedidos');

  return data;

}

export const editPedidoData = (pedidos) => {

  const data = new FormData();

  for (var key in pedidos)
    data.append(key, pedidos[key]);

  data.append('token', token('edit_pedido_por_id_cliente'));
  data.append('nome_script', 'edit_pedido_por_id_cliente');

  return data;

}

// ---- PRODUTOS ---- //

export const getProdutosPaginacaoData = (registros, pagina) => {
  const data = new FormData();

  data.append('registros', registros);
  data.append('pagina', pagina);
  data.append('token', token('get_produtos_paginacao'));
  data.append('nome_script', 'get_produtos_paginacao');

  return data;
};

export const getProdutosPorNomeData = (nome) => {

  const data = new FormData();

  data.append('nome_produto', nome);
  data.append('token', token('put_produto'));
  data.append('nome_script', 'put_produto');

  return data;

}

export const putProdutoData = (product) => {

  const data = new FormData();

  data.append('nome_produto', product.nome_produto);
  data.append('tamanho', product.tamanho);
  data.append('valor_produto', product.valor_produto);
  data.append('categoria', product.categoria);
  data.append('descricao_produto', product.descricao_produto);
  data.append('token', token('put_produto'));
  data.append('nome_script', 'put_produto');

  return data;

}

export const editProdutoData = (product) => {

  const data = new FormData();

  data.append('id_produto', product.id_produto);
  data.append('nome_produto', product.nome_produto);
  data.append('tamanho', product.tamanho);
  data.append('valor_produto', product.valor_produto);
  data.append('categoria', product.categoria);
  data.append('descricao_produto', product.descricao_produto);
  data.append('token', token('put_produto'));
  data.append('nome_script', 'put_produto');

  return data;

}

export const deleteProdutoData = (productId) => {

  const data = new FormData();

  data.append('id_produto', productId);
  data.append('token', token('put_produto'));
  data.append('nome_script', 'put_produto');

  return data;

}

// ---- CLIENTES ---- //

export const getClientePorNomeData = (nome) => {

  const data = new FormData();

  data.append('nome_telefone', nome);
  data.append('token', token('get_cliente_por_nome_telefone'));
  data.append('nome_script', 'get_cliente_por_nome_telefone');

  return data;

}

export const getClientePorID = (id) => {

  const data = new FormData();

  data.append('id_cliente', id);
  data.append('token', token('get_cliente_por_id'));
  data.append('nome_script', 'get_cliente_por_id');

  return data;

}

export const getClientePaginacaoData = (registros, pagina) => {
  const data = new FormData();

  data.append('registros', registros);
  data.append('pagina', pagina);
  data.append('token', token('get_clientes_paginacao'));
  data.append('nome_script', 'get_clientes_paginacao');

  return data;
};

export const putClient = (client) => {
  const data = new FormData();

  data.append('nome_cliente', client.nome_cliente);
  data.append('telefone1', client.telefone1);
  data.append('telefone2', client.telefone2);
  data.append('aniversario', client.aniversario);
  data.append('lista_negra', client.lista_negra);
  data.append('observacao_cliente', client.observacao_cliente);
  data.append('data_cadastro', client.dataCadastro);
  data.append('token', token('put_cliente'));
  data.append('nome_script', 'put_cliente');

  return data;
};

export const putClientGetData = (client) => {
  const data = new FormData();

  data.append('nome_cliente', client.nome_cliente);
  data.append('telefone1', client.telefone1);
  data.append('telefone2', client.telefone2);
  data.append('aniversario', client.aniversario);
  data.append('lista_negra', client.lista_negra);
  data.append('observacao_cliente', client.observacao_cliente);
  data.append('data_cadastro', client.data_cadastro);
  data.append('token', token('put_cliente_retorna_dados'));
  data.append('nome_script', 'put_cliente_retorna_dados');

  return data;
};

export const deleteClienteData = (id) => {

  const data = new FormData();

  data.append('id_cliente', id);
  data.append('token', token('delete_cliente'));
  data.append('nome_script', 'delete_cliente');

  return data;

}

export const editClient = (client) => {
  const data = new FormData();

  data.append('id_cliente', client.id_cliente);
  data.append('nome_cliente', client.nome_cliente);
  data.append('telefone1', client.telefone1);
  data.append('telefone2', client.telefone2);
  data.append('aniversario', client.aniversario);
  data.append('lista_negra', client.lista_negra);
  data.append('observacao_cliente', client.observacao_cliente);
  data.append('data_cadastro', client.data_cadastro);
  data.append('token', token('edit_cliente'));
  data.append('nome_script', 'edit_cliente');

  return data;
};

// ---- ADDRESSES --- ///

export const getClientAddressPorId = (id) => {

  const data = new FormData();

  data.append('id_cliente', id);
  data.append('token', token('get_endereco_por_id_cliente'));
  data.append('nome_script', 'get_endereco_por_id_cliente');

  return data;

}

export const putAddressData = (address) => {

  const data = new FormData();

  data.append('id_cliente', address.id_cliente);
  data.append('logradouro', address.logradouro);
  data.append('numero', address.numero);
  data.append('bairro', address.bairro);
  data.append('complemento', address.complemento);
  data.append('referencia', address.referencia);
  data.append('cep', address.cep);
  data.append('token', token('put_endereco'));
  data.append('nome_script', 'put_endereco');

  return data;

}

export const editAddressData = (address) => {

  const data = new FormData();

  data.append('id_endereco', address.id_endereco);
  data.append('id_cliente', address.id_cliente);
  data.append('logradouro', address.logradouro);
  data.append('numero', address.numero);
  data.append('bairro', address.bairro);
  data.append('complemento', address.complemento);
  data.append('referencia', address.referencia);
  data.append('cep', address.cep);
  data.append('token', token('put_endereco'));
  data.append('nome_script', 'put_endereco');

  return data;

}

export const deleteAddressData = (id) => {

  const data = new FormData();

  data.append('id_endereco', id);
  data.append('token', token('put_endereco'));
  data.append('nome_script', 'put_endereco');

  return data;

}

// --- OUTROS

export const taxData = () => {

  const data = new FormData();

  data.append('token', token('get_taxa_entrega'));
  data.append('nome_script', 'get_taxa_entrega');

  return data;

}

//

const currentDate = () => {
  let d     = new Date(),
        month = '' + (d.getMonth() + 1),
        day   = '' + d.getDate(),
        year  = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('.');

}

const token = (nome_script) => {

  const id = '32325179';
  const date = currentDate();

  const str = `${id}.${date}.${nome_script}`;
  const md = md5(str);
  const sha = sha1(md);

  return sha;

}

const currantYear = () => {
  const date = new Date();
  return date.getFullYear();
}
