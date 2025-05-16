//helper functions
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          loadSpinner('email-input-container');
          sendEmailQuoteForm();
          return false;
          //location.href="/quote/email-confirmation";
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
const loadSpinner = function(className){
  $('.'+className).css('visibility','hidden');
  $('.section-quote-steps .loading').show();
};
const setBoxHeight = function(className){
  // Select and loop the container element of the elements you want to equalise
    // Cache the highest
      maxHeight = 0;
    $(className).each(function(){  

       if($(this).height() > maxHeight) {
          maxHeight = $(this).height(); 
        }
                 
    });
    $(className).height(maxHeight);        
};
const getExchangeRate = function(){
  let fromCurrency = $('input[name=destination_currency_selection').val(),
      toCurrency = $('input[name=country_origin_currency_selection]').val(),
      quoteNumber = $('input[name=quote_number]').val(),
      exHost = 'api.frankfurter.app';
  
  if( fromCurrency != toCurrency){
    let fetchedData = fetch("https://"+exHost+"/latest?from="+fromCurrency+"&to="+toCurrency)
      .then(resp => resp.json())
      .then((data) => {
        let conversionNum = data.rates[toCurrency];
        $('input[name=quote_'+quoteNumber+'_exchange_rate]').val(conversionNum);
      }).catch(e => {
        $('input[name=quote_'+quoteNumber+'_exchange_rate]').val(1);
      });
  }else{
    $('input[name=quote_'+quoteNumber+'_exchange_rate]').val(1);
  }
};
const xConversion = function(num){
  let toCurrency = $('input[name=country_origin_currency_selection]').val(),
      quoteNumber = $('input[name=quote_number]').val(),
      xRate = $('input[name=quote_'+quoteNumber+'_exchange_rate]').val(),
      price = xRate * num;
  price = price.toFixed();
  return price;
};

const currencyFormatter = function(num){
  let toCurrency = $('input[name=country_origin_currency_selection]').val(),
      priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: toCurrency, currencyDisplay: 'code' }).format(num);
  return priceFormat;
};

const resetNextButton = function(stepClass){
  $( stepClass+" button.next").removeClass('enable').addClass('disable');
};
const enableNextButton = function(stepClass){
  $( stepClass+" button.next").removeClass('disable').addClass('enable');
};

//start step logic

const setCountryOrigin = function(){
  let queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      countryOrigin = urlParams.get('country-origin'),
      countryOriginCurrency = urlParams.get('currency');
  
  if(countryOrigin && countryOriginCurrency){
     $('input[name=country_origin_selection]').val(countryOrigin);
     $('input[name=country_origin_currency_selection]').val(countryOriginCurrency);
  }else{
     $('.close-quote').hide();
      $('#quote-modal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
      });
     return false;
  }
};

const setMarketPriceCode = function(){
  let schoolName = $('input[name=school_selection]').val(),
      campusCountry = $('input[name=campus_country_selection]').val(),
      marketObject = localStorage.getItem('region-code'),
      quoteJson =  JSON.parse(marketObject);
  
  for (var i = 0; i < quoteJson.length; i++) {
    if(quoteJson[i].campus_country == campusCountry && quoteJson[i].school == schoolName){
      $('input[name=market_price_code]').val(quoteJson[i].region_code);
      $('input[name=market_price_id]').val(quoteJson[i].region_id);
    }
  }
  
};
////get quote number

const setQuoteNumber = function(){
  let queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      editNumber = urlParams.get('edit');
  
  if(editNumber){
    $('input[name=quote_number]').val(editNumber);
  }else{
     $('input[name=quote_number]').val('1');
  }
};
const getQuoteNumber = function(){
  quoteNumber = $('input[name=quote_number]').val();
  return quoteNumber;
};

$(".section-quote-steps .step-container .btn-container .btn.prev").on("click", function() {
   window.scrollTo(0,0);
  $('.quote-step-slide').slick('slickPrev');
    
});

$(".section-quote-steps .step-container .btn.next").on("click", function() {
  
  dataStepVar = $(this).attr('data-step');
  quoteNumVar = getQuoteNumber();
  
  if($(this).hasClass('enable')){
    updateLocalJson(dataStepVar,quoteNumVar);
    $('.quote-step-slide').slick('slickNext');
    window.scrollTo(0,0);
    $(this).parent().parent().parent().next().find('.step-container').attr('data-complete',true);
  }
  
});

const initiateLocalJson = function(){
  let countryOrigin = $('input[name=country_origin_selection]').val(),
      countryOriginCurrency = $('input[name=country_origin_currency_selection]').val(),
      schoolName = $('input[name=school_selection]').val(),
      programSchoolName = $('input[name=program_school_selection]').val(),
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
  
  quoteJson.country_origin = countryOrigin;
  quoteJson.country_origin_currency = countryOriginCurrency;
  quoteJson.school_name = schoolName;
  quoteJson.program_school_name = programSchoolName;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};

//Edit Quote functions
$("#quote-price-container #quote-selection-container").on('click','button.quote-edit',function(){
  window.scrollTo(0, 0);
  let editNum = $(this).attr('data-edit-num');
  initEditQuote(editNum);
});
$("#quote-price-container #quote-selection-container").on('click','button.quote-remove',function(){
  let editNum = $(this).attr('data-remove-num');
  removeQuote(editNum);
});
$("#quote-price-container #quote-selection-container").on('click','.new-quote',function(){
  window.scrollTo(0, 0);
  let editNum = $(this).attr('data-quote');
  createQuote(editNum);
});
const addQuoteSummaryLink = function(){
  $('.campus-selection-container.step-container .btn-container .summary-link').html("<a href='#' onclick='return false;'>Go back to Quote Summary</a>")
};
$(".campus-selection-container.step-container .btn-container .summary-link").on('click','a',function(){
  $('input[name=quote_edit]').val('false');
  $('input[name=quote_number]').val('1');
  let quoteSlide = $('.quote-step-slide .slick-slide').index( $('#quote-summary') );
  $('#quote-price-container').attr('data-complete',true);
  $('.quote-step-slide').slick('slickGoTo',quoteSlide);
});
const createQuote = function(editNum){
  let quoteNum = editNum - 1;
  $('input[name=quote_number').val(editNum);
  $('input[name=quote_enabled').val(editNum);
  resetQuoteStep();
  addQuoteSummaryLink();
  $('.quote-step-slide').slick("slickGoTo", 0);
};

const resetQuoteStep = function(){
  $( ".campus-selection-container button.campus-select" ).each(function() {
    countryVar = $(this).attr('data-country');
    $(this).removeAttr('style');
    $(".campus-selection-container button.next").removeClass('enable').addClass('disable');
    $(this).attr('data-selected',false).attr('data-selected-campus','');
    $(this).find('span.selected-text').text(countryVar);
    $('input[name=quote_edit').val('false');
    $('input[name=accommodation_enable').val('false');
    $('input[name=family_enable').val('false');
  });
  $( ".program-price-list-selection-container button.next").removeClass('enable').addClass('disable');
  $(".selectDuration .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Duration');
};
const removeQuote = function(editNum){
  let createHtml = '<div class="new-quote" data-quote="'+editNum+'"><div class="create-icon center"><i class="fas fa-plus-circle"></i></div><h3 class="center">Create a new quote</h3></div>';
  $('.quote-select-container','#quote-selection-container .col-quote-'+editNum).remove();
  $('#quote-selection-container .col-quote-'+editNum).append(createHtml).addClass('empty');
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      quoteNum = editNum - 1,
      quoteObjQuote = quoteObj.quote_array[quoteNum];
  quoteObjQuote.quote_enabled = false;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));
  
};
//end step logic

//Edit Quote functions
//
const initEditQuote = function(editNum){
   let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
       quoteNum = editNum - 1,
       quoteObjQuote = quoteObj.quote_array[quoteNum],
       campusSelection = $('input[name=campus_selection').val(),
       programSelection = $('input[name=program_selection').val();
  
    $('input[name=campus_selection]').val(quoteObjQuote.campus);
    $('input[name=campus_country_selection]').val(quoteObjQuote.campus_country);
    $('input[name=quote_number]').val(editNum);
    $('input[name=quote_edit]').val('true');

    $('input[name=quote_edit_original_campus]').val(campusSelection);
    $('input[name=quote_edit_original_program_selection]').val(quoteObjQuote.program.option_program);
    $('input[name=quote_edit_original_program_schedule_selection]').val(quoteObjQuote.program.group_id);
    $('input[name=program_schedule_group_id_selection]').val(quoteObjQuote.program.program_id);
    $('input[name=program_schedule_selection]').val(quoteObjQuote.program.option_schedule);
    $('input[name=program_schedule_standard_price_selection]').val(quoteObjQuote.program.program_total_standard_price);
    $('input[name=program_schedule_price_selection]').val(quoteObjQuote.program.program_total_price);
    $('input[name=program_schedule_price_id_selection]').val('');
    $('input[name=program_schedule_duration_selection]').val(quoteObjQuote.program.duration);
    $('input[name=program_schedule_duration_selection]').val(quoteObjQuote.program.duration);
    $('.campus-selection-container .dropdown .dropdown-menu .campus-name[data-campus="'+quoteObjQuote.campus+'"]').click();
    $('input[name=accommodation_enable]').val(quoteObjQuote.accommodation.accommodation_enable);
    $('input[name=accommodation_check_in_date]').val(quoteObjQuote.accommodation.check_in_date);
    $('input[name=accommodation_length_of_stay]').val(quoteObjQuote.accommodation.length_of_stay);
    $('input[name=accommodation_group_id_selection]').val(quoteObjQuote.accommodation.option_accommodation_id);
    $('input[name=airport_id_selection]').val(quoteObjQuote.accommodation.option_airport_id);
    $('input[name=is_under_age]').val(quoteObjQuote.accommodation.is_under_age);
    $('.step-breadcrumb-container .step-number >div:not(.step-3)').removeClass('active');
    $('.step-breadcrumb-container').show();
    addQuoteSummaryLink();
    $('.quote-step-slide').slick("slickGoTo", 0);
    
};

const slickCarousel = function() {
    $('.quote-step-slide').slick({
     accessibility: false, 
     arrows:false,
     dots: false,
     draggable:false,
     infinite: false,
     speed: 900,
     fade: true,
     cssEase: 'linear',
     slidesToShow: 1,
     slidesToScroll: 1,
     adaptiveHeight: false,
      swipe: false,
      touchMove: false
   });
  let item_length = $('.slick-track > div').length;
  $('.step-breadcrumb-container .last-step').text(item_length);
  $('.quote-step-slide').on('afterChange', function(event, slick, currentSlide, nextSlide){
     let slideNumber = currentSlide + 3,
         nextNumber = slideNumber + 1,
         prevNumber = slideNumber - 1,
         classNumber = 'step-'+(slideNumber),
         prevClassNumber = 'step-'+(prevNumber),
         nextClassNumber = 'step-'+(nextNumber);
     $('.current-step').text(slideNumber);
     $(".step-breadcrumb-container .step-number >div").each(function() {

         if($(this).hasClass('active')){
          $(this).removeClass('active');
         }
      });
     $('.'+classNumber).addClass('active');
     //$('.'+nextClassNumber+',.'+prevClassNumber).removeClass('active');
  });
};