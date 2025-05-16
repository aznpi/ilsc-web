 //Create references to the dropdown's
 const yearSelect = document.getElementById("year");
 const monthSelect = document.getElementById("month");
 const daySelect = document.getElementById("day");

 const months = ['January', 'February', 'March', 'April', 
 'May', 'June', 'July', 'August', 'September', 'October',
 'November', 'December'];

 //Months are always the same
 (function populateMonths(){
     for(let i = 0; i < months.length; i++){
         const option = document.createElement('option');
         option.textContent = months[i];
         option.value = i;
         monthSelect.appendChild(option);
     }
     monthSelect.value = "0";
 })();

 let previousDay;

 const populateDays = function(month){
     //Delete all of the children of the day dropdown
     //if they do exist
     while(daySelect.firstChild){
         daySelect.removeChild(daySelect.firstChild);
     }
     //Holds the number of days in the month
     let dayNum;
     //Get the current year
     let year = yearSelect.value;

     if(month === 'January' || month === 'March' || 
     month === 'May' || month === 'July' || month === 'August' 
     || month === 'October' || month === 'December') {
         dayNum = 31;
     } else if(month === 'April' || month === 'June' 
     || month === 'September' || month === 'November') {
         dayNum = 30;
     }else{
         //Check for a leap year
         if(new Date(year, 1, 29).getMonth() === 1){
             dayNum = 29;
         }else{
             dayNum = 28;
         }
     }
     //Insert the correct days into the day <select>
     for(let i = 1; i <= dayNum; i++){
         const option = document.createElement("option");
         option.textContent = i;
         option.value = i;
         daySelect.appendChild(option);
     }
     if(previousDay){
         daySelect.value = previousDay;
         if(daySelect.value === ""){
             daySelect.value = previousDay - 1;
         }
         if(daySelect.value === ""){
             daySelect.value = previousDay - 2;
         }
         if(daySelect.value === ""){
             daySelect.value = previousDay - 3;
         }
     }
 }

 const populateYears = function(){
     //Get the current year as a number
     let year = new Date().getFullYear();
     //Make the previous 100 years be an option
     for(let i = 0; i < 101; i++){
         const option = document.createElement("option");
         option.textContent = year - i;
         option.value = year - i;
         yearSelect.appendChild(option);
     }
 }

 populateDays(monthSelect.value);
 populateYears();

 yearSelect.onchange = function() {
     populateDays(monthSelect.value);
 }
 monthSelect.onchange = function() {
     populateDays(monthSelect.value);
 }
 daySelect.onchange = function() {
     previousDay = daySelect.value;
 }
//School redirect

const goToSchool = function(){
   /*
    ilscDomain = "https://www.els.edu";
    urlELS = "/price-quote/els/programs";
  */
    ilscDomain = "https://www-els-edu.sandbox.hs-sites.com";
    urlELS = "/price-quote/els/programs";

  
    countryOrigin = $('select#country-list option:selected').val();
    currencyOrigin = $('select#country-list option:selected').attr('data-currency');
    yearDob = $('select#year option:selected').val();
    monthDob = $('select#month option:selected').val();
    dayDob = $('select#day option:selected').val();
    dobEpoch = new Date(yearDob,monthDob,dayDob).getTime() / 1000;

    
    let urlParam=urlELS;
    
    loadSpinnerModal();
     window.location.href = ilscDomain + urlParam + "?country-origin=" + countryOrigin + "&currency=" + currencyOrigin+"&de="+dobEpoch;
}


$(document).on('click', 'button[data-step=age-select]', function (event) {
      console.log('test');
      goToSchool();
})

const loadSpinnerModal = function(){
  $('.school-selector-container').hide();
  $('.loading').show();
}
//Country Dropdown functions

const create_custom_dropdowns = function() {
    $('select#country-list').each(function (i, select) {
        if (!$(this).next().hasClass('dropdown-select')) {
            $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
            var dropdown = $(this).next();
            var options = $(select).find('option[value]');
            var selected = $(this).find('option:selected');
            dropdown.find('.current').html(selected.data('display-text') || selected.text());
            options.each(function (j, o) {
                var display = $(o).data('display-text') || '';
                var currency = $(o).attr('data-currency');
                var market = $(o).attr('data-market');
                dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() +'" data-market="' + market + '" data-display-text="' + display  + '" data-currency="' + currency + '">' + $(o).text() + '</li>');
            });
        }
    });

    $('.section-quote-country .dropdown-select ul').before('<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text" placeholder="Enter Country"></div>');
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown-select', function (event) {
  if($(event.target).hasClass('dd-searchbox')){
    return;
  }
  $('.section-quote-country .dropdown-select').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('.option').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('.option').removeAttr('tabindex');
    $(this).focus();
  }
});

// Close when clicking outside
$(document).on('click', function (event) {
  if ($(event.target).closest('.section-quote-country .dropdown-select').length === 0) {
    $('.section-quote-country .dropdown-select').removeClass('open');
    $('.section-quote-country .dropdown-select .option').removeAttr('tabindex');
  }
  event.stopPropagation();
});

const filter = function(){
  var valThis = $('#txtSearchValue').val();
  $('.section-quote-country .dropdown-select ul > li').each(function(){
    var text = $(this).text();
    (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();         
  });
};
// Search

// Option click
$(document).on('click', '.dropdown-select .option', function (event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  var market =  $(this).attr('data-market');
  
  if(!market.includes('GC')){
    $('#gc-container').addClass('disabled');
    $('#gc-container input[type=radio]').attr("disabled",true);
  }
  if(!market.includes('LS')){
    $('#ls-container').addClass('disabled');
    $('#ls-container input[type=radio]').attr("disabled",true);
  }
  
  $(this).closest('.section-quote-country .dropdown-select').find('.current').text(text);
  $(this).closest('.section-quote-country .dropdown-select').prev('select').val($(this).data('value')).trigger('change');
  $('.location-selector').slick('slickNext');
});

// Keyboard events
$(document).on('keydown', '.dropdown-select', function (event) {
  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
  // Space or Enter
  //if (event.keyCode == 32 || event.keyCode == 13) {
  if (event.keyCode == 13) {
    if ($(this).hasClass('open')) {
      focused_option.trigger('click');
    } else {
      $(this).trigger('click');
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
      $(this).trigger('click');
    }
    return false;
  }
});

const checkCookieRedirectModal = function(){

  //let isCookie = getInitCookie('__hstc');
  let isCookie = true;
  if(!navigator.cookieEnabled || isCookie == null){   
    htmlString = "<h3>Note: Our Quote Tool requires that you have <a href='http://www.whatarecookies.com/enable.asp' rel='noopener' target='_blank'>http cookies turned on</a> to ensure we accurately receive your details. Please check your cookies settings before you start, and make sure you are not browsing in private or incognito mode. Once you have changed your settings, please refresh the page to start using the quote tool.</h3><h4 class='center'><a href='#' onClick='location.reload();'>refresh page</a></h4>";
    $('.section-quote-country .form-container .location-selector .country-main').html(htmlString);
  }

}

$(document).ready(function () {
  create_custom_dropdowns();
});
document.addEventListener("DOMContentLoaded", () => {
  checkCookieRedirectModal();
});