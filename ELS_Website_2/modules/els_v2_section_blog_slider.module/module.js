$(document).ready(function() {
  var $slider = $('.blog-slider');
  var $progressBar = $('.progress');
  var $progressBarLabel = $( '.slider__label' );

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    var calc = ( (nextSlide) / (slick.slideCount-2) ) * 100;

    $progressBar
      .css('width', calc + '%')
      .attr('aria-valuenow', calc );

    $progressBarLabel.text( calc + '% completed' );
  });

  $('.box-slider-container-row .progress-container .slide-arrow').on( "click", function() {
    let blogTarget = $(this).attr('data-slider');

    if($(this).hasClass('left-arrow')){
      $('.'+blogTarget).slick('slickPrev');
    }else if($(this).hasClass('right-arrow')){
      $('.'+blogTarget).slick('slickNext');
    }
  });



  $('.section-blog-box-slider .blog-slider').slick({
    infinite: false,
    arrows:false,
    slidesToShow: 2,
    slidesToScroll: 1,
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
});