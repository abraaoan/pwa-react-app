///Expect date in this format: 2019-01-01 18:15:00 YYYY-MM-dd HH:mm:ss.
export const formatDateTime = (date) => {

  if (!date)
    return '';

  const dateTime = date.split(/\s+/);
  const newDate = dateTime[0];
  const time = dateTime[1];

  const dateFormated = formatDate(newDate);

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

  var year = dateList[0];
  var month = dateList[1];
  var day = dateList[2];

  return `${year}-${month}-${day}`;

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
      time  = d.getTime();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const date = [year, month, day].join('-');

    return `${date} ${time}`;
}

