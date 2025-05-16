const d = new Date();
let year = d.getFullYear(),
    nextYear = year + 1;
$('a.current-year').text(year);
$('a.next-year').text(nextYear);

$('.price-slider').slick({
        infinite: false,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1
        
});
$('.campus-slider-1,.campus-slider-2').slick({
        infinite: false,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1000,
        cssEase: 'linear'
        
});
$('a.year-target').click(function(e){
  e.preventDefault();
  slideVal = $(this).attr('data-slide-to');
  $('.price-slider').slick('slickGoTo', slideVal);
});
$('li.campus-name a').click(function(e){
  e.preventDefault();
  slideVal = $(this).attr('data-slide-to');
  $('.campus-slider-1,.campus-slider-2').slick('slickGoTo', slideVal);
});

$( ".section-accommodation-pricing .price-table table" ).each(function( index ) {
  
  if($(this).has('tr').length == 0){
    $(this).parents().eq(2).hide();
  }
});

