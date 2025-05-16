  var resizeArray = ['.filter-program-container .program-box-slide .col-md-4 .box-container h4','.filter-program-container .program-box-slide .col-md-4 .box-container p']
  var arrayLength = resizeArray.length;
  var maxHeight = [];

  for (var i = 0; i < arrayLength; i++) {
    maxHeight[i] = 0;
    $(resizeArray[i]).each(function () {
      if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
    });
    $(resizeArray[i]).height(maxHeight[i]);
  }

$(".filter-program-container .program-box-slide .col-md-4 .box-container").height(maxHeight);

$(".mix-boxes .dropdown-item").click(function() {
  let filterValue = $(this).attr('value'),
      dataTypeValue = $(this).attr('data-type'),
      row = $('.mix'),
      searchDataType = $(this).attr('data-search'); 
  $('.filter-program-container .program-box-slide').prepend('<div class="lds-dual-ring"></div>');
  $('.filter-program-container .program-box-slide .program-box-container').hide();
  $('.filter-program-container .dropdown .dropdown-menu').removeClass('show');
  searchTitle = filterValue == 'all' ? 'All '+dataTypeValue : filterValue;
  $('.filter-program-container .dropdown .dropdown-toggle').html(searchTitle);
  row.delay(300).hide(200);
  row.each(function(i, el) {
    if($(el).attr(searchDataType) == filterValue) {
      $(el).delay(550).show(300);
    }

  })
  if(filterValue == 'all') {
    row.each(function(i, el) {

      $(el).delay(550).show(300);

    })
  }
  setTimeout(function(){$('div.lds-dual-ring').remove(0);},500);
  return false;

});
