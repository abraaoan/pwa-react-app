import axios from 'axios';
import sha1 from 'js-sha1';
import md5 from 'md5';

export const axiosInstance = axios.create({
  baseURL: `http://localhost/cats/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

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

export const getClientePaginacaoData = (registros, pagina) => {
  const data = new FormData();

  data.append('registros', registros);
  data.append('pagina', pagina);
  data.append('token', token('get_clientes_paginacao'));
  data.append('nome_script', 'get_clientes_paginacao');

  return data;
};

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