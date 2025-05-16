$('.section-3-box-slider .box-3-slider').slick({
  infinite: false,
  arrows:true,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow:'<div class="slick-next"><i class="fas fa-angle-double-right"></i></div>',
  prevArrow:'<div class="slick-prev"><i class="fas fa-angle-double-left"></i></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});