const initQuoteSlick = function(){
  $('#quote-modal .location-selector').slick({
    arrows:false,
    dots: false,
    infinite: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1
  });
} 
$(document).ready(function(){     
    $(".close-quote").click(function(){
      $("#quote-modal").modal('hide');
    });
 });
$('#quote-modal').on('shown.bs.modal', function (e) {
  initQuoteSlick();
  $('#quote-modal .location-selector').slick('setPosition');
  $('#quote-modal .form-container').addClass('open');
})
$('#quote-modal').on('hidden.bs.modal', function (e) {
  $('#quote-modal .location-selector').slick('unslick');
  $('#quote-modal .location-selector .country-main .dropdown-select span.current').text('Select the country of residence');
  $('#quote-modal .location-selector .country-main .dropdown-select .list ul li').removeClass('selected');
  $('#quote-modal .form-container').removeClass('open');
})