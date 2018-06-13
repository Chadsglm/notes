Handlebars.registerHelper("formatDate", function (datetime, format) {
  if (moment) {
    if(!datetime){
      return '';
    }
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});