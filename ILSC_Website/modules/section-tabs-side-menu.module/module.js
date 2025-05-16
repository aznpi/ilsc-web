$(".mobile-tab-nav select").on('change', function (e) {
  var selected_value = $(this).val(),
      $target_elem = $('a[href="' + selected_value + '"]');
  $target_elem.trigger('click');
});

$('.tab-toggle').on('click', function () {
  var selected_value = $(this).attr('href');
  $('option[value="' + selected_value + '"]').attr('selected', 'selected');
});

$(".mobile-tab-nav select").trigger('change');

$('.collapse').on('shown.bs.collapse', function (e) {
    var $panel = $(this).closest('.collapse');
    $('html,body').animate({
        scrollTop: $panel.offset().top-200
    }, 100); 
});

$('.side-menu .nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })  

  $('.side-menu .nav a.tab-toggle').on('click', function (e) {
    var href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top-200
      }, 100);
    e.preventDefault();
  });

  $(document).ready(function(){
    var url = window.location.href;
    if(url.indexOf("#") > 0){
      var activeTab = url.substring(url.indexOf("#") + 1);
      $(".tab-pane").removeClass("active in");
      $('a[href="#'+ activeTab +'"]').tab('show');
    }
  });