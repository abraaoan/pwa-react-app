///Expect date in this format: 2019-01-01 18:15:00 YYYY-MM-dd HH:mm:ss.
export const formatDateTime = (date, withoutAs) => {

  if (!date)
    return '';

  const dateTime = date.split(/\s+/);
  const newDate = dateTime[0];
  const time = dateTime[1];

  const dateFormated = formatDate(newDate);

  if (withoutAs)
    return `${dateFormated} ${time}`;
  else
    return `${dateFormated} às ${time}`;

}

///Expect date in this format: 2019-01-01 YYYY-MM-dd.
export const formatDate = (date) => {

  const dateList = date.split('-');

  var year = dateList[0];
  var month = dateList[1];
  var day = dateList[2];

  return `${day}/${month}/${year}`;

}

export const unFormatDate = (date) => {

  const dateList = date.split('/');

  var year = dateList[0].split('').length > 2 ? dateList[0] : dateList[2];
  var month = dateList[1];
  var day = dateList[0].split('').length > 2 ? dateList[2] : dateList[0];

  return `${year}-${month}-${day}`;

}

export const unformatDateTime = (date) => {

  if (!date)
    return '';

  const dateTime = date.split(/\s+/);
  const newDate = dateTime[0];
  const time = dateTime[1];

  const dateFormated = unFormatDate(newDate);

  if (!time)
    return dateFormated;

  if (time.split(':').length === 3) {
    return `${dateFormated} ${time}`;
  } else {
    return `${dateFormated} ${time}:00`;
  }

}

export const currentDate = () => {
  let d     = new Date(),
      month = '' + (d.getMonth() + 1),
      day   = '' + d.getDate(),
      year  = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const currentDateTime = () => {
  let d     = new Date(),
      month = '' + (d.getMonth() + 1),
      day   = '' + d.getDate(),
      year  = d.getFullYear(),
      hh    = d.getHours(),
      mm    = d.getMinutes(),
      ss    = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const date = [year, month, day].join('-');
    const time = [hh, mm, ss].join(':');

    return `${date} ${time}`;
}

export const convertProducts = (valorProduto) => {

  //--> 23:T.CUPUACU COM CHOCOLATE:MEDIO:145:Feliz Aniversario //9:T.CUPUACU:MEDIO:145://

  const lines = valorProduto.split('//');

  var products = [];
  lines.forEach(line => {
    const product = extractProduct(line);
    if (product.id_produto)
      products.push(product);
  });

  return products;

}

const extractProduct = (line) => {
  // --> 23:T.CUPUACU COM CHOCOLATE:MEDIO:145:Feliz Aniversario 

  var cols = line.split(':');
  var product = {};

  const id = cols[0];
  const name = cols[1];
  const tamanho = cols[2];
  const price = cols[3];
  const obs = cols[4];

  if (id)
    product['id_produto'] = id;

  if (name)
    product['nome_produto'] = name;

  if (tamanho)
    product['tamanho'] = tamanho;

  if (price)
    product['valor_produto'] = price;

  if (obs)
    product['obs'] = obs;

  return product;

}




