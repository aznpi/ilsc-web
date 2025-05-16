 $(document).ready(function(){
   $('.close-quote').hide();
   $('#quote-modal').modal({
    show:true,
    backdrop: 'static',
    keyboard: false
  });
   $('#quote-modal').on('shown.bs.modal', function (e) {
    $('#quote-modal .location-selector').slick('setPosition');
    $('#quote-modal .form-container').addClass('open');
  })
  $('#quote-modal').on('hidden.bs.modal', function (e) {
    $('#quote-modal .form-container').removeClass('open');
  })
 });
