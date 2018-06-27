
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


Handlebars.registerHelper("stars", function (importance) {
  importance = parseInt(importance);
  let stars = Array(5).fill(1);
  let template = '';
  stars.map((item, i) => {
    if(i < importance) {
      template += '<i class="fas fa-star"></i>'
    } else {
      template += '<i class="far fa-star"></i>'
    }
  })
  return new Handlebars.SafeString(template);
});

Handlebars.registerHelper("select", function (importance) {
  importance = parseInt(importance);
  let stars = Array(5).fill(1);
  let template = '';
  stars.map((item, i) => {
    let index = i+1;
    if(index == importance) {
      template += '<option value="'+ index +'" selected="selected">'+ index +'</option>>'
    } else {
      template += '<option value="'+ index +'"  >'+ index +'</option>'
    }
  })
  return new Handlebars.SafeString(template);
});