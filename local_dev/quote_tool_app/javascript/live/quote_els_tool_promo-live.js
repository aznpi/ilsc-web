//start step logic
const updateLocalJson = function(dataStep,editNum){

  if(dataStep == 'campus-select'){
    updateCampusSelection(editNum);
    getProgramsList();
    setMarketPriceCode();


  }else if(dataStep == 'program-select'){
    updateProgramSelection(editNum);
    getProgramsPriceListLowest();
    printProgramHeaderTitle();


  }else if(dataStep == 'program-price-select'){
    setProgramGroup();
    printStartDateSelection();
    //getProgramScheduleList();

  }else if(dataStep == 'start-date-select'){
    updateStartDateSelection(editNum);
    getProgramPriceDuration();
    redirectAccomodationStep();

  }else if(dataStep == 'accommodation-option-select'){
    redirectAccommodationNoAge();

  }else if(dataStep == 'accommodation-age-option-select'){
    printAccomodationForm();
  }else if(dataStep == 'accommodation-select'){
    setTimeout(setAccommodationGroup(),200);
    updateStartDateSelection(editNum);
    getProgramPriceDuration();
    getPromo('Automatic');
    setTimeout(setTotalPrice,300);
    setTimeout(printQuotesHTML,500);
  }
};

//Step Campus Selection

const updateCampusSelection = function(editNum){
  let objPosition = editNum -1,
      initShowCurrency = $('input[name=country_origin_currency_selection]').val(),
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
  campusSelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-selected-campus');
  campusIdSelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-selected-campus-id');
  campusCountrySelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-country');
  campusCurrencySelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-selected-campus-currency');

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].quote_enabled = true;
      quoteJson.quote_array[i].campus = campusSelected;
      quoteJson.quote_array[i].campus_id = campusIdSelected;
      quoteJson.quote_array[i].campus_country = campusCountrySelected;
      quoteJson.quote_array[i].campus_currency = campusCurrencySelected;
      quoteJson.quote_array[i].show_currency = initShowCurrency;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};

const resetCampusSelect = function(){
  $( ".campus-selection-container button.campus-select" ).each(function() {
    countryVar = $(this).attr('data-country');
    $(this).attr('data-selected',false).attr('data-selected-campus','');
    $(this).find('span.selected-text').text(countryVar);
  });
};

const disableCampusDrop = function(){
  $( ".campus-selection-container button.campus-select" ).each(function(){
    $(this).removeAttr('style');
    selectedVar = $(this).attr('data-selected');
    if(selectedVar == 'false'){
      $(this).css('color','#CCC');
    }

  });
  $( ".campus-selection-container button.next").removeClass('disable').addClass('enable');
};

$(".campus-selection-container .dropdown-menu li.campus-name").on("click", function() {
  let getValue = $(this).attr('data-campus'),
      getId = $(this).attr('data-campus-id'),
      getCountryValue = $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-country'),
      getCampusCurrency = $(this).attr('data-campus-currency'),
      getMinAge = $(this).attr('data-campus-min-age') ? $(this).attr('data-campus-min-age') : 0,
      getMaxAge = $(this).attr('data-campus-max-age') ? $(this).attr('data-campus-max-age') : 99;

  resetCampusSelect();
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-selected-campus',getValue);
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-selected-campus-id',getId);
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-selected-campus-currency',getCampusCurrency);
  $('input[name=campus_selection]').val(getValue);
  $('input[name=campus_id_selection]').val(getId);
  $('input[name=campus_min_age]').val(getMinAge);
  $('input[name=campus_max_age]').val(getMaxAge);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $(this).parent().siblings("button.campus-select").find('span.selected-text').text(getValue);
  disableCampusDrop();
  $("#program-list-container").empty();
  resetNextButton('.program-list-selection-container');
  getExchangeRate();
  clearAccommodationFields();

});

$(".campus-selection-container .dropdown button.direct-link").on("click", function() {
  let getValue = $(this).find('span.selected-text').text(),
      getValueId = $(this).attr('data-selected-campus-id'),
      getCountryValue = $(this).attr('data-country'),
      getCampusCurrency = $(this).attr('data-selected-campus-currency');
  resetCampusSelect();
  $(this).attr('data-selected','true').attr('data-selected-campus',getValue);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $('input[name=campus_selection]').val(getValue);
  $('input[name=campus_id_selection]').val(getValueId);
  disableCampusDrop();
  $("#program-list-container").empty();
  resetNextButton('.program-list-selection-container');
  getExchangeRate();
  clearAccommodationFields();
});

//Step Program Selection
$('#program-list-container').on('click','input[type=radio]',function() {
  let getValue = $(this).val(),
      getId = $(this).attr('data-id'),
      getDescription = $(this).attr('data-description'),
      programMinAge = $(this).attr('data-min-age'),
      programMaxAge = $(this).attr('data-max-age');
  $('input[name=program_min_age]').val(programMinAge);
  $('input[name=program_max_age]').val(programMaxAge);
  $('input[name=program_description_selection]').val(getDescription);
  $('input[name=program_selection]').val(getValue);
  $('input[name=program_id_selection]').val(getId);
  $( ".program-list-selection-container button.next").removeClass('disable').addClass('enable');
});

//API get Programs List
const getProgramsList = function(){
  let isEdit = $('input[name=quote_edit]').val(),
      isEditProgramName = $('input[name=quote_edit_original_program_selection]').val(),
      campusMinAge = $('input[name=campus_min_age]').val(),
      campusMaxAge = $('input[name=campus_max_age]').val(),
      schoolName = $('input[name=school_selection]').val(),
      campusName = $('input[name=campus_selection]').val(),
      campusId = $('input[name=campus_id_selection]').val(),
      tableId = schoolProgramListTable,
      queryParam = '&campus__in='+campusId+'&show_quote_tool__eq=1&category__eq=Programs&orderBy=program_name',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);

  if ( $('#program-list-container').children().length == 0 ) {
    // jQuery cross domain ajax
    $.get(api_url).done(function (data) {
      let dataObject = data.objects;

      if(dataObject.length >0){
        for (let i = 0; i < dataObject.length; i++){
          let selectEdit = '';
          id = dataObject[i].id;
          programName = dataObject[i].values[2];
          programMinAge = dataObject[i].values[17] ? dataObject[i].values[17][0].name : campusMinAge;
          programMaxAge = dataObject[i].values[18] ? dataObject[i].values[18][0].name : campusMaxAge;
          programDescription = dataObject[i].values[6];
          programDescription = programDescription ? programDescription.replace(/['\u2019]/g,"&rsquo;") : '';
          programId = programName.replace(/\s/g, '');

          if(isEdit === 'true'){
            if(programName == isEditProgramName){
              selectEdit = 'checked';
              enableNextButton('.program-list-selection-container');
              //$('#program-list-container .program-option input[value="'+programName+'"]').click();
            }
          }

          radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-radio' name='program_radio_selection' id='"+programId+"' data-id='"+id+"' data-min-age='"+programMinAge+"' data-max-age='"+programMaxAge+"' data-description='"+programDescription+"' value='"+programName+"' "+selectEdit+"/><label for='"+programId+"'><span class='bold'>"+programName+"</span><p for='"+programId+"' class='disclaimer'>"+programDescription+"</p></label></div>";
          $("#program-list-container").append(radioHtml);
          if(isEdit === 'true'){
            if(programName == isEditProgramName){
              enableNextButton('.program-list-selection-container');
              //$('#program-list-container .program-option input[value="'+programName+'"]').click();
            }
          }
        }
      }else{
        radioHtml = "<div class='text-center'><h3>No Programs Available at this time.</h3></div>";
        $("#program-list-container").append(radioHtml);
      }  
    }).fail(function() {
      radioHtml = "<div class='text-center'><h3>No Programs Available at this time.</h3></div>";
      $("#program-list-container").append(radioHtml);
    });
  }
};
const updateProgramSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
  programSelected = $('input[name=program_selection]').val();
  programIdSelected = $('input[name=program_id_selection]').val();

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.option_program = programSelected;
      quoteJson.quote_array[i].program.program_id = programIdSelected;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
$('#program-list-container').on('click','input[type=radio]',function() {
  $('#program-price-list-container').empty();
});

//set Program Lowest Price List
$('#program-price-list-container').on('click','input[type=radio]',function() {
  $( ".program-price-list-selection-container button.next").removeClass('disable').addClass('enable');
});

// print Program Header Title
const printProgramHeaderTitle = function(){
  let programTitle = $('input[name=program_selection]').val(),
      programDesc = $('input[name=program_description_selection]').val();
  $('.step-container.program-container .program-title.step-title h3').text(programTitle);
  $('.program-price-list-selection-container.step-container.program-container .program-title.step-title .p-class').html(programDesc);
};
//get Programs Price List
//API get Programs Price List
const getProgramsPriceListLowest = function(){
  let isEdit = $('input[name=quote_edit]').val(),
      marketPriceCode = $('input[name=market_price_code]').val(),
      marketPriceId = $('input[name=market_price_id]').val(),
      programName = $('input[name=program_selection]').val(),
      campusName = $('input[name=campus_selection]').val(),
      campusId = $('input[name=campus_id_selection]').val(),
      campusCountryName = $('input[name=campus_country_selection]').val(),
      tableId = schoolPriceListTable,
      marketTableId = schoolMarketPriceListTable,
      queryParam = '&campus_location__in='+campusId+'&programs_available__in='+programName+'&is_program_price__eq=1&enable__eq=1&orderBy=-price_current',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam,
      programPriceArray = [];
  $('#online-msg').remove();

  if(isEdit === 'true'){
    $('#program-price-list-container').empty();
  }

  api_url = encodeURI(api_url);

  if ( $('#program-price-list-container').children().length == 0 ) {

    // jQuery cross domain ajax
    $.ajax({
      url : api_url,
      type : "get",
      async: false,
      success : function(data) {
        let dataObject = data.objects;

        for (let i = 0; i < dataObject.length; i++){

          scheduleName = dataObject[i].values[3].name;

          programPriceArray.push({
            program_id:dataObject[i].id,
            schedule_name: scheduleName,
            item_name: dataObject[i].values[35].name,
            price_format: dataObject[i].values[9],
            price_id: dataObject[i].values[2],
            price: dataObject[i].values[8],
            schedule_id: scheduleName.replace(/\s/g, ''),
            group_id:dataObject[i].values[34][0].id,
            campus_country: dataObject[i].values[26].name
          });

        }

        let programPriceGroupedByGroupId = groupBy(programPriceArray, 'group_id'),
            groupArray = new Object();
        groupArray = programPriceGroupedByGroupId;

        const keys = Object.keys(groupArray);

        let lowestPriceArray = [],
            values = Object.values(groupArray);

        for (let i = 0; i < values.length; i++){
          let lowestPrice = [];
          for (let x = 0; x < values[i].length; x++){
            if( x == 0){
              lowestPriceArray.push({
                'program_id': values[i][x].program_id,
                'campus_country': values[i][x].campus_country,
                'group_id': values[i][x].group_id,
                'item_name': values[i][x].item_name,
                'price_format':values[i][x].price_format,
                'price':values[i][x].price,
                'schedule_id':values[i][x].schedule_id,
                'schedule_name':values[i][x].schedule_name                    
              });
            }
            lowestPrice.push(values[i][x].price);
          }

          for (let y = 0; y < values.length; y++){
            lowestPriceArray[i].price = Math.min(...lowestPrice);
          }
        }

        if(marketPriceCode.indexOf('STD') !== -1){
          printStandardLowestPriceProgramList(lowestPriceArray);

        }else{
          if(marketPriceCode != ''){
            getMarketLowestPriceProgramList(lowestPriceArray);              
          }else{
            radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
            $("#program-price-list-container").append(radioHtml);
          }
        } 
      },
      error: function() {
        radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
        $("#program-price-list-container").append(radioHtml);
      }
    });
  }

  if(campusName == 'Online'){
    onlineHtml = "<div id='online-msg' class='center disclaimer'><p>See our <a href='https://www.ilsc.com/hubfs/pdf/others/online-english-program-schedule-time-zones.pdf' target='_blank'>Online Schedules Time Zones</a> to find out which schedule works best for you. </p></div>";
    $('.program-price-list-selection-container .step-content-container').after(onlineHtml);
  }

};
const getMarketLowestPriceProgramList = function(listArrayP){
  let radioHtml = "",
      tableMarketPriceId = schoolMarketPriceListTable,
      marketPriceId = $('input[name=market_price_id]').val(),
      campusSelection = $('input[name=campus_selection]').val(),
      campusIdSelection = $('input[name=campus_id_selection]').val();

  for( let y = 0; y < listArrayP.length; y++){
    priceId = listArrayP[y].program_id;
    queryPriceParam = '&price_list_code__in='+priceId+'&market_region__in='+marketPriceId+'&campus__in='+campusIdSelection;
    let api_price_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableMarketPriceId+'/rows?portalId='+portalId+queryPriceParam;
    api_price_url = encodeURI(api_price_url);

    $.ajax({
      url : api_price_url,
      type : "get",
      async: false,
      success : function(dataP) {
        let dataPriceObject = dataP.objects;  
        let priceLocal = JSON.parse(localStorage.getItem('program-price')) || [];
        if( dataPriceObject.length > 0){
          for (let x = 0; x < dataPriceObject.length; x++){

            if(dataPriceObject[x].values[2]){
              listArrayP[y].price = dataPriceObject[x].values[2];
            }        
          }
        }
        priceLocal.push(listArrayP[y]);     
        localStorage.setItem('program-price', JSON.stringify(priceLocal));
      },
      error: function() {
        radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
        $("#program-price-list-container").append(radioHtml);
      }
    });
  }
  printMarketLowestPriceProgramList();


};
const printMarketLowestPriceProgramList = function(){
  let isEdit = $('input[name=quote_edit]').val(),
      selectedGroupId = $('input[name=quote_edit_original_program_schedule_selection]').val(),
      retrievedObject = localStorage.getItem('program-price'),
      retrievedJson = JSON.parse(retrievedObject) || [],
      radioHtml = "",
      isCheckedArr = [];

  retrievedJson.sort((a, b) => (b.price - a.price));
  if(retrievedJson.length > 0){
    for (let i = 0; i < retrievedJson.length; i++){

      let selectEdit = '';
      scheduleName = retrievedJson[i].schedule_name;
      itemName = retrievedJson[i].item_name;
      priceFormat = retrievedJson[i].price_format;
        priceConversion = round(xConversion(retrievedJson[i].price),1).toFixed(2);
      price = currencyFormatter(priceConversion);
      groupId = retrievedJson[i].group_id;

      if(priceFormat.indexOf('Package') === -1){
        priceFormat = priceFormat + ' from';
      }
      if(isEdit === 'true'){
        if(selectedGroupId == groupId){
          selectEdit = 'checked';
          isCheckedArr.push('checked');
        }
      }
      radioHtml = radioHtml+ "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='"+groupId+"' value='"+groupId+"' data-program-name='"+scheduleName+"' data-item-name='"+itemName+"' data-price-format='"+priceFormat+"' data-price='"+priceConversion+"' "+selectEdit+"/><label for='"+groupId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+"</span><span class='price-text'>"+price+"</span></div></label></div>";
    }
  }else{
    radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
  }
  if(isEdit === 'true'){
    if(isCheckedArr.indexOf('checked') !== -1){
      enableNextButton('.program-price-list-selection-container');
    }else{
      resetNextButton('.program-price-list-selection-container');
    }
  }else{
    resetNextButton('.program-price-list-selection-container');
  }
  $("#program-price-list-container").append(radioHtml);
  localStorage.removeItem('program-price');
};
const printStandardLowestPriceProgramList = function(listArray){
  let isEdit = $('input[name=quote_edit]').val(),
      selectedGroupId = $('input[name=quote_edit_original_program_schedule_selection]').val(),
      isCheckedArr = [];

  if(listArray.length >0){
    for (let i = 0; i < listArray.length; i++){
      let selectEdit = '';
      scheduleName = listArray[i].schedule_name;
      itemName = listArray[i].item_name;
      priceFormat = listArray[i].price_format;
        priceConversion = round(xConversion(listArray[i].price),1).toFixed(2);
      price = currencyFormatter(priceConversion);
      scheduleId = scheduleName.replace(/\s/g, '');
      groupId = listArray[i].group_id;
      if(isEdit === 'true'){
        if(selectedGroupId == groupId){
          selectEdit = 'checked';
          isCheckedArr.push('checked');
        }
      }

      if(priceFormat.indexOf('Package') === -1){
        priceFormat = priceFormat + ' from';
      }
      radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='"+groupId+"' value='"+groupId+"' data-program-name='"+scheduleName+"' data-item-name='"+itemName+"' data-price-format='"+priceFormat+"' data-price='"+priceConversion+"' "+selectEdit+"/><label for='"+groupId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+"</span><span class='price-text'>"+price+"</span></div></label></div>";
      $("#program-price-list-container").append(radioHtml);
    }
  }else{
    radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
    $("#program-price-list-container").append(radioHtml);

  }

  if(isEdit === 'true'){
    if(isCheckedArr.indexOf('checked') !== -1){
      enableNextButton('.program-price-list-selection-container');
    }else{
      resetNextButton('.program-price-list-selection-container');
    }
  }else{
    resetNextButton('.program-price-list-selection-container');
  }
};
$('#program-price-list-container').on('click','input[type=radio]',function() {
  resetPrintDates();
});
const setProgramGroup = function(){
  let groupId = $('input[name=program_price_selection]:checked').attr('id');
  $('input[name=program_schedule_group_id_selection]').val(groupId);
};

// Step Start Date
// Start Date Dropdown validation
const dateDropValidation = function(className){
  parentClass = $(className).parent().parent().find(".selectBox__value");
  optionVal = $(className).attr('data-item');
  currentVal = parentClass.attr('data-selected');
  currentOption = parentClass.attr('data-option');

  if(currentVal != optionVal){
    if(currentOption == 'day'){
      if($(".start-date-selection-container .selectDuration").hasClass('active')){
        $(".start-date-selection-container .selectDuration").removeClass('show');
        $(".start-date-selection-container .selectDuration .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Duration');
      }else{
        $(".start-date-selection-container .selectDuration").addClass('active').removeClass('disabled');      
      }
    }else if(currentOption == 'month'){
      if($(".start-date-selection-container .selectDay").hasClass('active')){
        $(".start-date-selection-container .selectDay").removeClass('show');
        $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Day');
      }else{
        $(".start-date-selection-container .selectDay").addClass('active').removeClass('disabled');      
      }
      if($(".start-date-selection-container .selectDuration").hasClass('active')){
        $(".start-date-selection-container .selectDuration").removeClass('show').removeClass('active').addClass('disabled');
        $(".start-date-selection-container .selectDuration .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Duration');
      }
    }else if(currentOption == 'year'){
      if($(".start-date-selection-container .selectMonth").hasClass('active')){
        $(".start-date-selection-container .selectMonth").removeClass('show');
        $(".start-date-selection-container .selectMonth .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Month');
      }else{
        $(".start-date-selection-container .selectMonth").addClass('active').removeClass('disabled');
      }
      if($(".start-date-selection-container .selectDay").hasClass('active')){
        $(".start-date-selection-container .selectDay").removeClass('show').removeClass('active').addClass('disabled');
        $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Day');
      }
      if($(".start-date-selection-container .selectDuration").hasClass('active')){
        $(".start-date-selection-container .selectDuration").removeClass('show').addClass('disabled');
        $(".start-date-selection-container .selectDuration .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Duration');
      }
    }                     
  }        
};

$(document).on("click",".start-date-selection-container .select-container .selectBox.active", function(e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target,
      container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  container.attr('data-selected',$(dropdownItem).attr('data-item'));
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

  let yearValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=year]').attr('data-selected'),
      monthValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=month]').attr('data-selected'),
      dayValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=day]').attr('data-selected'),
      durationValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=duration]').attr('data-selected');

  if(yearValue !='' && monthValue != '' && dayValue != '' && durationValue != ''){
    $( ".start-date-selection-container button.next").removeClass('disable').addClass('enable');
  }else{
    resetNextButton('.start-date-selection-container');
  }

});
$(document).on("click",".accommodation-price-selection-container .select-container .selectBox.active", function(e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target,
      container = $(this).find("input.selectBox__value");
  container.val(dropdownItem.text);
  container.attr('data-selected',$(dropdownItem).attr('data-item'));
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

});


$(document).on("click",".start-date-selection-container .select-container .selectBox.active .dropdown-item", function(e) {
  e.preventDefault();  
  dateDropValidation(this);
  dataParentVal = $(this).attr('data-parent');
  dataVal = $(this).attr('data-item');
  if(dataParentVal == 'year'){

    setTimeout(printDates('month',dataVal), 10000);

  }else if(dataParentVal == 'month'){

    dataYear = $(this).attr('data-year');
    setTimeout(printDates('day',dataVal,dataYear), 10000);

  }else if(dataParentVal == 'day'){
    dataYear = $(this).attr('data-year');
    dataMonth = $(this).attr('data-month');
    setTimeout(printDates('week',dataVal,dataYear,dataMonth), 10000);

  }

});

// Print Start Date Selection
const printStartDateSelection = function(){
  $("#start-date-container").empty();
  $('.date-container .selectBox').removeClass('show');
  let groupId =  $('input[name=program_price_selection]:checked').val(),
      programName = $('input[name=program_price_selection]:checked').attr('data-program-name'),
      itemName = $('input[name=program_price_selection]:checked').attr('data-item-name'),
      priceFormat = $('input[name=program_price_selection]:checked').attr('data-price-format'),
      price = $('input[name=program_price_selection]:checked').attr('data-price'),
      priceFormatted = currencyFormatter(price);

  $('.step-container.program-container .program-title.step-title h5.program-item').text(programName+'-'+itemName);
  radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_start_date_selection' id='"+groupId+"' value='"+groupId+"' data-program-name='"+programName+"' data-item-name='"+itemName+"' data-price-format='"+priceFormat+"' data-price='"+price+"' checked/><label for='"+groupId+"'><div class='program-name float-left'>"+programName+" - "+itemName+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+"</span><span class='price-text'>"+priceFormatted+"</span></div></label></div>";
  $("#start-date-container").append(radioHtml);
  getStartDates();

};
const printDurationSelection = function(weekArray){
  let className = $('.start-date-selection-container .date-container #duration-select .selectDuration .dropdown-menu'),
      htmlOption = "",
      minChar = '>',
      maxChar = '<',
      maxLimit = 52,
      minVal = weekArray.find(mn => mn.week.includes(minChar)),
      maxVal = weekArray.find(mx => mx.week.includes(maxChar));

  className.empty();

  if(minVal == undefined && maxVal == undefined){
    lengthVal = weekArray.length > 0 ? weekArray.length : maxLimit+1;
    indexNum = weekArray.length > 0 ? 0 : 1;

    for(let i = indexNum; i < lengthVal; i++){
      numVal = weekArray.length > 0 ? weekArray[i].week : i;
      weekText = numVal == '1' ? 'week' : 'weeks';
      htmlOption += '<a href="#" class="dropdown-item" data-item="'+numVal+'" tabindex="0">'+numVal+' '+weekText+'</a>';      
    }
  }else{ 
    minVal = minVal ? parseInt(minVal.week.slice(1,99)) : 1;
    maxVal = maxVal ? parseInt(maxVal.week.slice(1,99)) : maxLimit;
    for(let z = minVal; z <= maxVal; z++){
      weekText = z == '1' ? 'week' : 'weeks';
      htmlOption += '<a href="#" class="dropdown-item" data-item="'+z+'" tabindex="0">'+z+' '+weekText+'</a>';      
    }
  }

  className.html(htmlOption); 
};
const getStartDates = function(){
  let isEdit = $('input[name=quote_edit]').val(),
      programName = $('input[name=program_selection]').val(),
      campus = $('input[name=campus_selection]').val(),
      campusId = $('input[name=campus_id_selection]').val(),
      dob = $('input[name=dob]').val() *1000,
      minAge = $('input[name=program_min_age]').val(),
      maxAge = $('input[name=program_max_age]').val(),
      campusEdit = $('input[name=quote_edit_original_campus]').val(),
      programNameEdit = $('input[name=quote_edit_original_program_selection]').val(),
      isYearPopulated = $('.selectYear .selectBox__value').attr('data-selected'),
      timestamp = Date.now(),
      getDates = false,
      tableId = startDateTable,
      queryParam = '&program__in='+programName+'&campus__in='+campusId+'&start_dates__gt='+timestamp+'&orderBy=start_dates',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);

  if(isEdit === 'true'){
    if(programName != programNameEdit){
      getDates = true;
    }else if(campus != campusEdit){
      getDates = true;
    }
  }else{
    if(!isYearPopulated){
      getDates = true;
    }
  }

  if(getDates){   
    resetPrintDates();
    let dateArray = [];
    $.ajax({
      url : api_url,
      type : "get",
      async: false,
      success : function(data) {
        let dataObject = data.objects;


        for (let i = 0; i <dataObject.length; i++){
          weekArray = [];
          dateVal = new Date(dataObject[i].values[3]);
          epochTime = dataObject[i].values[3];
          yearVal = dateVal.getUTCFullYear();
          monthVal = dateVal.getUTCMonth() + 1;
          dayVal = dateVal.getUTCDate();
          ageAtStart = returnAge(parseInt(dob),parseInt(epochTime));

          if(dataObject[i].values[5]){
            for (let x = 0; x < dataObject[i].values[5].length; x++){
              weekArray.push({
                weeks : dataObject[i].values[5][x].name
              });              
            }
          }  
          if(ageAtStart >= minAge && ageAtStart <= maxAge){
            dateArray.push({
              epoch:epochTime,
              year: yearVal,
              month: monthVal,
              day:dayVal,
              week_available:weekArray
            });
          }
        }
      },
      error: function() {
        console.log('No Start Dates Found');
      }
    });

    if(dateArray.length > 0){
      let yearArray = groupBy(dateArray,'year');
      let yearMonthArray=[];
      for(let year in yearArray){
        monthArray = groupBy(yearArray[year],'month');
        yearMonthArray.push({
          year: year,
          month:monthArray
        });
      }
      localStorage.setItem('start-dates',JSON.stringify(groupBy(yearMonthArray,'year')));
      $('.date-container #year-select .selectBox .dropdown-menu').empty();
      printDates('year');
    }else{
      $('.start-date-selection-container .campus-age-disclaimer').html('<p class="text-center">No start dates available. Possible reason: The minimum age requirement at the '+campus+' campus at the start of program is: '+minAge+'</p>');
    }
  }
};

const resetPrintDates = function(){
  let yearVal = $('.date-container #year-select .selectBox .selectBox_value.active').attr('data-selected'),
      monthVal = $('.date-container #month-select .selectBox .selectBox_value.active').attr('data-selected'),
      dayVal = $('.date-container #day-select .selectBox .selectBox_value.active').attr('data-selected'),
      weekVal = $('.date-container #duration-select .selectBox .selectBox_value.active').attr('data-selected'),
      isEdit = $('input[name=quote_edit]').val();

  if(yearVal !='' && monthVal != '' && dayVal != '' && weekVal != ''){

    $(".start-date-selection-container .selectYear .selectBox__value").attr('data-selected','').text('Year');
    $(".start-date-selection-container .selectMonth").removeClass('active').addClass('disabled');
    $(".start-date-selection-container .selectDay").removeClass('active').addClass('disabled');
    $(".start-date-selection-container .selectDuration").removeClass('active').addClass('disabled');
    $(".start-date-selection-container .selectMonth .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Month');
    $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Day');
    $(".start-date-selection-container .selectDuration .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Duration');

    if(isEdit === 'true'){
      $('button.next[data-step=start-date-select]').removeClass('enable').addClass('disable');
    }
  }
  resetNextButton('.start-date-selection-container');
};
const printDates = function(timeVal,dataItem,dataYear,dataMonth){

  let startDateArray = JSON.parse(localStorage.getItem('start-dates'));

  if(timeVal == 'week'){
    let weekValArray = [];
    for(let year in startDateArray){
      if(year == dataYear){

        for(let month in startDateArray[year][0].month){
          if(month == dataMonth){

            for(let x = 0; x < startDateArray[year][0].month[month].length; x++){
              if(dataItem == startDateArray[year][0].month[month][x].day){

                for(let i = 0; i < startDateArray[year][0].month[month][x].week_available.length; i++){
                  weekValArray.push({
                    week: startDateArray[year][0].month[month][x].week_available[i].weeks
                  });              
                }

              }
            }
          }
        }
      }
    } 

    printDurationSelection(weekValArray);

  }else if(timeVal == 'day'){
    $('.date-container #day-select .selectBox .dropdown-menu').empty();
    for(let year in startDateArray){
      if(year == dataYear){
        for(let month in startDateArray[year][0].month){
          if(month == dataItem){

            for(let day in startDateArray[year][0].month[month]){
              dayVal = startDateArray[year][0].month[month][day].day;
              dayHtml = '<a href="#" class="dropdown-item" data-parent="day" data-item="'+dayVal+'" data-year="'+year+'" data-month="'+month+'" tabindex="0">'+dayVal+'</a>';
              $('.date-container #day-select .selectBox .dropdown-menu').append(dayHtml);


            }
          }
        }
      }
    }
  }else if(timeVal == 'month'){

    $('.date-container #month-select .selectBox .dropdown-menu').empty();
    $('.date-container #day-select .selectBox .dropdown-menu').empty();
    for(let year in startDateArray){

      if(year == dataItem){
        for(let month in startDateArray[year][0].month){
          let m = '';
          switch (month) {  
            case '1': m = 'Jan'; break;
            case '2': m = 'Feb'; break;
            case '3': m = 'Mar'; break;
            case '4': m = 'Apr'; break;
            case '5': m = 'May'; break;
            case '6': m = 'Jun'; break;
            case '7': m = 'Jul'; break;
            case '8': m = 'Aug'; break;
            case '9': m = 'Sep'; break;
            case '10': m = 'Oct'; break;
            case '11': m = 'Nov'; break;
            case '12': m = 'Dec'; break;
            default: break;
          }

          monthHtml = '<a href="#" class="dropdown-item" data-year="'+year+'"data-parent="month" data-item="'+month+'" tabindex="0">'+m+'</a>';
          $('.date-container #month-select .selectBox .dropdown-menu').append(monthHtml);



        }
      }
    }
  }else if(timeVal == 'year'){

    $('.selectBox,.selectBox__value','.date-container #year-select').removeClass('disabled').addClass('active');
    $('.date-container #month-select .selectBox .dropdown-menu').empty();
    $('.date-container #day-select .selectBox .dropdown-menu').empty();
    for(let year in startDateArray){
      yearHtml = '<a href="#" class="dropdown-item" data-parent="year" data-item="'+year+'" tabindex="0">'+year+'</a>';
      $('.date-container #year-select .selectBox .dropdown-menu').append(yearHtml);

    }

  }
};

const setProgramPriceDuration = function(listArray){

  let durationNum = parseInt($('.selectBox .selectBox__value[data-option=duration]').attr('data-selected')),
      marketPriceCode = $('input[name=market_price_code]').val(),
      minVal = 1,
      maxVal = 999;

  for (let i = 0; i < listArray.length; i++){
    let rangeVal = listArray[i].schedule;
    if(rangeVal.indexOf('-') !== -1){
      rangeSplit = rangeVal.split("-");
      minVal = parseInt(rangeSplit[0]);
      maxVal = parseInt(rangeSplit[1]);
    }else if(rangeVal.indexOf('+') !== -1){
      rangeSplit = rangeVal.split("+");
      minVal = parseInt(rangeSplit[0]);
      maxVal = 999;
    }else{
      minVal = parseInt(rangeVal);
      maxVal = rangeVal;
    }

    if(durationNum >= minVal && durationNum <= maxVal){
      if(listArray[i].priceFormat.indexOf('Package') !== -1){
        durationNum = 1;
      }
      xPrice = parseInt(listArray[i].price) * durationNum;
        xPrice = round(xConversion(xPrice),1).toFixed(2);
      xStandardPrice = parseInt(listArray[i].priceStandard) * durationNum;
        xStandardPrice = round(xConversion(xStandardPrice),1).toFixed(2);

      $('input[name=program_schedule_selection]').val(listArray[i].scheduleName +'+'+listArray[i].itemName);
      $('input[name=program_schedule_price_selection]').val(xPrice);
      $('input[name=program_schedule_standard_price_selection]').val(xStandardPrice);
      $('input[name=program_schedule_price_id_selection]').val(listArray[i].priceId);
      $('input[name=program_schedule_duration_selection]').val(durationNum);
      $('input[name=program_price_format]').val(listArray[i].priceFormat);
      break;
    }   

  }
  if(marketPriceCode != "" && marketPriceCode.indexOf('STD') === -1){
    setProgramMarketPriceDuration();
  }else{
    updateJsonStartDatePrice();
  }    
};
const setProgramMarketPriceDuration = function(){
  let priceId = $('input[name=program_schedule_price_id_selection]').val(),
      regionId = $('input[name=market_price_code]').val(),
      duration = $('input[name=program_schedule_duration_selection]').val(),
      campus = $('input[name=campus_selection]').val(),
      campusId = $('input[name=campus_id_selection]').val(),
      tableId = schoolMarketPriceListTable,
      queryParam = '&campus__in='+campusId+'&price_list_code__in='+priceId+'&market_region__in='+regionId,
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);

  $.ajax({
    url : api_url,
    type : "get",
    async: false,
    success : function(data) {
      let dataObject = data.objects;

      for (let i = 0; i < dataObject.length; i++){
        price = parseInt(dataObject[i].values[2]) * duration;       
          xPrice = round(xConversion(price),1).toFixed(2);

        $('input[name=program_schedule_price_selection]').val(xPrice);
      }
    },
    error: function() {
      console.log('no program found');
    }
  });

  updateJsonStartDatePrice();

};
const updateJsonStartDatePrice = function(){ 
  let editNum = $('input[name=quote_number]').val(),
      objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
  programSchedulePrice = $('input[name=program_schedule_price_selection]').val();
  programScheduleStandardPrice = $('input[name=program_schedule_standard_price_selection]').val();

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.program_total_price = programSchedulePrice;
      quoteJson.quote_array[i].program.program_total_standard_price = programScheduleStandardPrice;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
const getProgramPriceDuration = function(){
  let groupId = $('input[name=program_start_date_selection]').val(),
      tableId = schoolPriceListTable,
      queryParam = '&group_code__in='+groupId+'&is_program_price__eq=1&enable__eq=1&orderBy=-price_current',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam,
      scheduleListArray = [];
  api_url = encodeURI(api_url);


  $.get(api_url).done(function (data) {
    let dataObject = data.objects;

    for (let i = 0; i < dataObject.length; i++){
      scheduleListArray.push({
        'priceId' : dataObject[i].id,
        'scheduleName' : dataObject[i].values[3].name,
        'itemName' : dataObject[i].values[4],
        'priceFormat' : dataObject[i].values[9],
        'price' : dataObject[i].values[8],
        'priceStandard' : dataObject[i].values[8],
        'schedule' : dataObject[i].values[5].name.replace(/\s/g, '').replace('Weeks','')
      });
    }
    setProgramPriceDuration(scheduleListArray);

  }).fail(function() {
    console.log('no program found');
  });
};

const updateStartDateSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      yearValue = $('.selectBox .selectBox__value[data-option=year]').attr('data-selected'),
      monthValue = $('.selectBox .selectBox__value[data-option=month]').attr('data-selected'),
      dayValue = $('.selectBox .selectBox__value[data-option=day]').attr('data-selected'),
      durationValue = $('.selectBox .selectBox__value[data-option=duration]').attr('data-selected'),
      scheduleName = $('input[name=program_start_date_selection]').attr('data-program-name'),
      priceId  = $('input[name=program_schedule_price_id_selection]').val(),
      groupId = $('input[name=program_schedule_group_id_selection]').val(),
      itemName = $('input[name=program_start_date_selection]').attr('data-item-name'),
      priceFormat = $('input[name=program_start_date_selection]').attr('data-price-format');

  if(priceFormat.indexOf('Package') === -1){
    programScheduleName = scheduleName+'-'+itemName;
  }else{
    programScheduleName = 'Package';
  }

  startDate = yearValue+'-'+monthValue+'-'+dayValue;
  dateObj = new Date(startDate);
  endDateEpoch = dateObj.setDate(dateObj.getDate() + durationValue * 7);
  endDate = new Date(endDateEpoch);
  endYear = endDate.getUTCFullYear();
  endMonth = endDate.getUTCMonth() +1;
  endDay = endDate.getUTCDate();
  endDateString= endYear+'-'+endMonth+'-'+endDay;
  $('input[name=start_date_year]').val(yearValue);
  $('input[name=start_date_month]').val(monthValue);
  $('input[name=start_date_day]').val(dayValue);

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.option_schedule = programScheduleName;
      quoteJson.quote_array[i].program.start_date = startDate;
      quoteJson.quote_array[i].program.end_date = endDateString;
      quoteJson.quote_array[i].program.duration = durationValue;
      quoteJson.quote_array[i].program.program_price_id = priceId;
      quoteJson.quote_array[i].program.group_id = groupId;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
// End Start Date
const setOtherProgramFees = function(feeArray){
  let editNum = $('input[name=quote_number]').val(),
      objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      isUnderAge = $('input[name=is_under_age]').val(),
      durationNum = $('input[name=program_schedule_duration_selection]').val(),
      minMonthHighSeason = new Date($('input[name=high_season_min_date_current_year]').val()),
      maxMonthHighSeason = new Date($('input[name=high_season_max_date_current_year]').val()),
      campus = quoteJson.quote_array[objPosition].campus;
  maxMonthHighSeason = new Date(maxMonthHighSeason.getTime());
  maxMonthHighSeason.setDate(maxMonthHighSeason.getDate()+1);

  let startYear = $('input[name=start_date_year]').val(),
      startMonth = $('input[name=start_date_month]').val(),
      startDay = $('input[name=start_date_day]').val(),
      startDate = startYear+'-'+startMonth+'-'+startDay,
      isHighSeason = false;
  startDate = new Date(startDate);

  if(startDate >= minMonthHighSeason && maxMonthHighSeason > startDate){
    isHighSeason = true;
  }

  let setFeeArray = [];

  for (let i = 0; i < feeArray.length; i++){
    isPush = false;

    if(feeArray[i].itemName == 'Registration Fees'){     
      if(isHighSeason){
        if(feeArray[i].feeDescription.indexOf('High Season') !== -1){
          isPush = true;
        }              
      }else{
        if(feeArray[i].feeDescription.indexOf('One Time Fee') !== -1){
          isPush = true;
        }
      }

    }else{

      rangeFee = feeArray[i].feeRange;

      if(rangeFee.indexOf('-') !== -1){
        rangeSplit = rangeFee.split("-");
        minVal = parseInt(rangeSplit[0]);
        maxVal = parseInt(rangeSplit[1]);
      }else if(rangeFee.indexOf('+') !== -1){
        rangeSplit = rangeFee.split("+");
        minVal = parseInt(rangeSplit[0]);
        maxVal = 999;
      }else{
        minVal = parseInt(rangeFee);
        maxVal = rangeVal;
      }

      if(durationNum >= minVal && durationNum <= maxVal){   
        isPush = true;
      }

    }
    if(isUnderAge == 0){
      if(feeArray[i].underAgeFee){
        isPush = false;
      }
    }
    if(isPush){
      priceNotes = feeArray[i].priceNotes ? feeArray[i].priceNotes : '';
      setFeeArray.push({
        'feeId': feeArray[i].feeId,
        'feePrice' : feeArray[i].feePrice,
        'feeDescription' : feeArray[i].feeDescription,
        'priceType' : feeArray[i].priceType,
        'priceNotes' : priceNotes,
        'itemName' : feeArray[i].itemName
      });
    }
  }


  for (let i = 0; i < setFeeArray.length; i++){


    if(setFeeArray[i].itemName.includes('Fee')){

      if(setFeeArray[i].itemName.includes('Registration')){ 

            quoteJson.quote_array[objPosition].program.registration_fee = round(xConversion(setFeeArray[i].feePrice),1).toFixed(2);
        quoteJson.quote_array[objPosition].program.registration_description = setFeeArray[i].feeDescription;

      }else if(setFeeArray[i].itemName.includes('Material')){

        feeVal = setFeeArray[i].priceType == 'Per week' ? setFeeArray[i].feePrice * durationNum : setFeeArray[i].feePrice;
            quoteJson.quote_array[objPosition].program.material_fee = round(xConversion(feeVal),1).toFixed(2);

      }else{

        addFeeVal = setFeeArray[i].priceType == 'Per week' ? setFeeArray[i].feePrice * durationNum : setFeeArray[i].feePrice;            
            quoteJson.quote_array[objPosition].program.additional_fee = round(xConversion(addFeeVal),1).toFixed(2);
        quoteJson.quote_array[objPosition].program.additional_fee_description = setFeeArray[i].feeDescription;
        quoteJson.quote_array[objPosition].program.additional_item_name = setFeeArray[i].itemName;

      }

    }else{

      addFeeVal = setFeeArray[i].priceType == 'Per week' ? setFeeArray[i].feePrice * durationNum : setFeeArray[i].feePrice;   
          quoteJson.quote_array[objPosition].program.additional_fee = round(xConversion(addFeeVal),1).toFixed(2);
      quoteJson.quote_array[objPosition].program.additional_fee_description = setFeeArray[i].feeDescription;
      quoteJson.quote_array[objPosition].program.additional_item_name = setFeeArray[i].itemName;

    }

  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};

const getOtherProgramFees = function(){
  let campus = $('input[name=campus_selection]').val(),
      campusId = $('input[name=campus_id_selection]').val(),
      programName = $('input[name=program_selection]').val(),
      tableId = schoolPriceListTable,
      queryParam = '&campus_location__in='+campusId+'&category__eq=Other Program Fees&is_program_price__eq=0&programs_available__in='+programName+'&enable__eq=1&orderBy=-price_current',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam,
      feeArray = [];
  api_url = encodeURI(api_url);

  $.ajax({
    url : api_url,
    type : "get",
    async: false,
    success : function(data) {
      let dataObject = data.objects;


      for (let i = 0; i < dataObject.length; i++){
        rangeVal = dataObject[i].values[5] ? dataObject[i].values[5].name.replace(/\s/g, '').replace('Weeks','') : '';
        underAge = dataObject[i].values[30] ? true : false;

        feeArray.push({
          'feeId':  dataObject[i].values[2],
          'feePrice' : dataObject[i].values[8],
          'feeDescription' : dataObject[i].values[22],
          'feeRange' : rangeVal,
          'priceType' : dataObject[i].values[19].name,
          'underAgeFee' : underAge,
          'itemName': dataObject[i].values[35].name,
        });
      }

      setOtherProgramFees(feeArray);
    },
    error: function() {
      console.log('no fees found');
    }
  });
};



//Step Program Schedule Price List
$('#schedule-price-list-container').on('click','input[type=radio]',function() {
  let getValue = $(this).attr('data-schedule-name'),
      programPrice = $(this).attr('data-price');
  $('input[name=program_schedule_selection]').val(getValue);
  $('input[name=program_schedule_price_selection]').val(programPrice);
  $( ".schedule-price-list-selection-container button.next").removeClass('disable').addClass('enable');
});

const getProgramScheduleList = function(){
  let marketPriceCode = $('input[name=market_price_code]').val(),
      groupId = $("input[name='program_price_selection']:checked").val(),
      tableId = schoolPriceListTable,
      queryParam = '&group_code__in='+groupId+'&is_program_price__eq=1&enable__eq=1&orderBy=-price_current',
      api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableId+'/rows?portalId='+portalId+queryParam,
      scheduleListArray = [];
  api_url = encodeURI(api_url);
  $('#schedule-price-list-container').empty();

  $.get(api_url).done(function (data) {
    let dataObject = data.objects;
    for (let i = 0; i < dataObject.length; i++){
      scheduleListArray.push({
        'priceId' : dataObject[i].id,
        'scheduleName' : dataObject[i].values[3].name,
        'itemName' : dataObject[i].values[4],
        'priceFormat' : dataObject[i].values[9],
        'price' : dataObject[i].values[8],
        'schedule' : dataObject[i].values[5].name
      });
    }   
    if(marketPriceCode != "" && marketPriceCode.indexOf('STD') === -1){
      getMarketProgramPrice(scheduleListArray);
    }else{
      printStandardProgramPrice(scheduleListArray);            
    }
  }).fail(function() {
    radioHtml = "<div class='text-center'><h3>No Schedule for this Program Available at this time.</h3></div>";
    $("#schedule-price-list-container").append(radioHtml);
  });
};

const getMarketProgramPrice = function(listArray){
  let tableMarketPriceId = schoolMarketPriceListTable,
      marketPriceId = $('input[name=market_price_id]').val();

  for( let y = 0; y < listArray.length; y++){
    priceId = listArray[y].priceId;
    queryPriceParam = '&price_list_code__in='+priceId+'&market_region__in='+marketPriceId;
    let api_price_url = 'https://api.hubapi.com/hubdb/api/v2/tables/'+tableMarketPriceId+'/rows?portalId='+portalId+queryPriceParam;
    api_price_url = encodeURI(api_price_url);

    $.ajax({
      url : api_price_url,
      type : "get",
      async: false,
      success : function(dataP) {
        let dataPriceObject = dataP.objects;
        let priceLocal = JSON.parse(localStorage.getItem('schedule-price')) || [];
        for (let x = 0; x < dataPriceObject.length; x++){
          listArray[y].price = dataPriceObject[x].values[2];
        }     
        priceLocal.push(listArray[y]);
        localStorage.setItem('schedule-price', JSON.stringify(priceLocal));
      },
      error: function() {
        console.log('no market price');
      }
    });
  }
  printMarketProgramPrice();

};
const printStandardProgramPrice = function(listArray){
  let radioHtml = "";

  for (let i = 0; i < listArray.length; i++){
    priceId = listArray[i].priceId;
    scheduleName = listArray[i].scheduleName;
    itemName = listArray[i].itemName;
    priceFormat = listArray[i].priceFormat;
    price = currencyFormatter(listArray[i].price);
    schedule = listArray[i].schedule;
    radioHtml = radioHtml+ "<div class='program-option'><input type='radio' class='program-option' name='schedule_price_selection' id='"+priceId+"' value='"+priceId+"' data-schedule-name='"+scheduleName+"-"+itemName+"-"+schedule+"' data-price='"+price+"' /><label for='"+priceId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"<br/>"+schedule+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+"</span><span class='price-text'>"+price+"</span></div></label></div>";
  }
  $("#schedule-price-list-container").append(radioHtml);

};
const printMarketProgramPrice = function(){
  let retrievedObject = localStorage.getItem('schedule-price'),
      retrievedJson = JSON.parse(retrievedObject),
      radioHtml = "";
  retrievedJson.sort((a, b) => (a.price > b.price ? -1 : 1));

  for (let z = 0; z < retrievedJson.length; z++){
    priceId = retrievedJson[z].priceId;
    scheduleName = retrievedJson[z].scheduleName;
    itemName = retrievedJson[z].itemName;
    priceFormat = retrievedJson[z].priceFormat;
    price = currencyFormatter(retrievedJson[z].price);
    schedule = retrievedJson[z].schedule;
    radioHtml = radioHtml+ "<div class='program-option'><input type='radio' class='program-option' name='schedule_price_selection' id='"+priceId+"' value='"+priceId+"' data-schedule-name='"+scheduleName+"-"+itemName+"-"+schedule+"' data-price='"+price+"' /><label for='"+priceId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"<br/>"+schedule+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+"</span><span class='price-text'>"+price+"</span></div></label></div>";
  }
  $("#schedule-price-list-container").append(radioHtml);
  localStorage.removeItem("schedule-price");

};

const updateScheduleSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      scheduleSelected = $('input[name=program_schedule_selection]').val(),
      schedulePriceSelected = $('input[name=program_schedule_price_selection]').val(),
      scheduleStandardPriceSelected = $('input[name=program_schedule_standard_price_selection]').val(),
      totalPrice = schedulePriceSelected;

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.option_schedule = scheduleSelected;
      quoteJson.quote_array[i].program.program_total_price = schedulePriceSelected;
      quoteJson.quote_array[i].program.program_total_standard_price = scheduleStandardPriceSelected;
      quoteJson.quote_array[i].quote_total_price =  totalPrice;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};


//Quote Step
const setTotalPrice = function(){
  let editNum = $('input[name=quote_number]').val();

  getOtherProgramFees();

  editNum = editNum - 1;
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      schedulePriceSelected = parseInt(quoteObj.quote_array[editNum].program.program_total_price),
      additionalFeeSelected = parseInt(quoteObj.quote_array[editNum].program.additional_fee),
      materialFeeSelected = parseInt(quoteObj.quote_array[editNum].program.material_fee),
      registrationFeeSelected = parseInt(quoteObj.quote_array[editNum].program.registration_fee),
      accommodationTotalSelected = parseInt(quoteObj.quote_array[editNum].accommodation.accommodation_total_price),
      airportTransferFeeSelected = parseInt(quoteObj.quote_array[editNum].accommodation.airport_transfer_total_price),
      accommodationPlacementFeeSelected = parseInt(quoteObj.quote_array[editNum].accommodation.placement_fee);
  promoAutoDiscountTotal = 0,
    totalPrice = schedulePriceSelected + materialFeeSelected + additionalFeeSelected + registrationFeeSelected + accommodationTotalSelected + airportTransferFeeSelected + accommodationPlacementFeeSelected;

  if(quoteObj.quote_array[editNum].promo.promo_auto_enabled){

    promoAutoValueArray = quoteObj.quote_array[editNum].promo.promo_auto_value.split('|');
    promoAutoCategory = quoteObj.quote_array[editNum].promo.promo_auto_category.split('|');
    promoAutoDiscountType = quoteObj.quote_array[editNum].promo.promo_auto_discount_type.split('|');

    promoAutoDiscount = 0;

    for (let i = 0; i < promoAutoValueArray.length; i++){

      promoValueInt = convertPercentDollarVal(promoAutoValueArray[i],promoAutoCategory[i],promoAutoDiscountType[i],editNum);       
      promoAutoDiscountTotal += parseFloat(promoValueInt);
    }
  }


  //calculate total price
  totalPrice = totalPrice - promoAutoDiscountTotal;

  quoteObj.quote_array[editNum].quote_total_price =  totalPrice;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));

};
const printQuotesHTML = function(){
  $('.step-breadcrumb-container').hide();
  $('.x-convert-container .btn[data-origin-currency]').addClass('active').addClass('btn-orange-outline').removeClass('btn-black-outline');
  $('.x-convert-container .btn[data-destination-currency]').removeClass('active').removeClass('btn-orange-outline').addClass('btn-black-outline');
  let originCurrency = $('input[name=country_origin_currency_selection]').val();
  $('button.btn-origin-currency').attr('data-origin-currency',originCurrency);
  $('button.btn-origin-currency').text(originCurrency);

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      quoteHTML,
      schoolName = quoteObj.school_name,
      programSchoolName = quoteObj.program_school_name;


  //temp exception note variables

  let exceptionStartDate = new Date('2022-11-07'),
      exceptionEndDate = new Date('2023-03-24'),
      exceptionCampusArr = ['Brisbane','Melbourne','Sydney','Perth'],
      exceptionProgramSchedule = 'Full Time Programs-Morning',
      isException = false;


  $('#quote-selection-container').empty();
  if(quoteObj.quote_array.length >0){
    for (let i = 0; i < quoteObj.quote_array.length; i++){
      quoteNum = i+1;
      if(quoteObj.quote_array[i].quote_enabled){

        priceProgramVal = parseInt(quoteObj.quote_array[i].program.program_total_price);
        priceStandardVal = parseInt(quoteObj.quote_array[i].program.program_total_standard_price);
        priceRegistrationVal = parseInt(quoteObj.quote_array[i].program.registration_fee);
        priceAdditionalVal = parseInt(quoteObj.quote_array[i].program.additional_fee);
        priceMaterialVal = parseInt(quoteObj.quote_array[i].program.material_fee);
        priceAccommodationVal = parseInt(quoteObj.quote_array[i].accommodation.accommodation_total_price);
        priceAirportVal = parseInt(quoteObj.quote_array[i].accommodation.airport_transfer_total_price);
        priceAccommodationPlacementFeeVal = parseInt(quoteObj.quote_array[i].accommodation.placement_fee);
        prePriceQuoteTotalVal = priceProgramVal + priceRegistrationVal + priceAdditionalVal + priceMaterialVal + priceAccommodationVal + priceAirportVal + priceAccommodationPlacementFeeVal;
        priceQuoteTotalVal =  parseFloat(quoteObj.quote_array[i].quote_total_price);
        accommodationNoteVal = quoteObj.quote_array[i].accommodation.accommodation_note;
        discountVal = 0;
        promoAutoTotalVal = 0;
        discountHtml = "";
        discountTotalHtml = "";
        registrationHtml = "";
        additionalHtml = "";
        materialHtml = "";
        accommodationHtml = "";
        airportHtml = "";
        accommodationNoteHtml = "",
          promoAutoHtml = "",
          promoCodeHtml = "",
          printPromo = quoteObj.quote_array[i].promo.promo_auto_enabled || quoteObj.quote_array[i].promo.promo_code_enabled ? true : false;

        //temp exception note variables
        startDate = quoteObj.quote_array[i].program.start_date;
        startDateObj = new Date(startDate);

        if (startDateObj >= exceptionStartDate && startDateObj <= exceptionEndDate) {
          if(quoteObj.quote_array[i].program.option_schedule == exceptionProgramSchedule){
            if( exceptionCampusArr.includes(quoteObj.quote_array[i].campus)){
              isException = true;
            }
          }

        }
        printExceptionHtml = isException ? "<div class='center disclaimer'><sup>**</sup>"+exceptionText+"</div>" : '';

        if(isException){
          quoteObj.quote_array[i].program.program_note = exceptionText;
        }

        //Apply Promo

        if(printPromo){
          promoAutoArray = [];
          promoCodeArray=[];

          //Apply Automatic Promo
          if(quoteObj.quote_array[i].promo.promo_auto_enabled){
            promoCode = quoteObj.quote_array[i].promo.promo_auto_code.split('|');
            promoCategory = quoteObj.quote_array[i].promo.promo_auto_category.split('|');
            promoName = quoteObj.quote_array[i].promo.promo_auto_code_name.split('|');
            promoDescription = quoteObj.quote_array[i].promo.promo_auto_description.split('|');
            promoDiscountType = quoteObj.quote_array[i].promo.promo_auto_discount_type.split('|');
            promoType = quoteObj.quote_array[i].promo.promo_auto_type.split('|');
            promoValue = quoteObj.quote_array[i].promo.promo_auto_value.split('|');

            for(let x = 0; x < promoCode.length; x++){
              promoAutoArray.push({
                'code' : promoCode[x],
                'category' : promoCategory[x],
                'promoName' : promoName[x],
                'description' : promoDescription[x],
                'discountType' : promoDiscountType[x],
                'promoType' : promoType[x],
                'promoValue' : promoValue[x]

              })
            }
          }

          if(promoAutoArray.length > 0){
            promoLineItem = '';
            for(let z = 0; z < promoAutoArray.length; z++){

              promoValueInt = convertPercentDollarVal(promoAutoArray[z].promoValue,promoAutoArray[z].category,promoAutoArray[z].discountType,i);

              promoLineItem += "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+promoAutoArray[z].promoName+"</span></div><div class='item-notes'>"+promoAutoArray[z].description+"</div></div><div class='item-price bold promo-auto-total promo-auto-total-"+z+"'>"+currencyFormatter(-promoValueInt)+"</div></div></div>";
              promoAutoTotalVal += parseFloat(promoValueInt);
            }

            promoAutoHtml = "<div class='quote-box promo-box-container promo-auto-box'>"+promoLineItem+"</div>";
          }

          //Apply Coupon Promo
          if(quoteObj.quote_array[i].promo.promo_code_enabled){

            promoValueInt = convertPercentDollarVal(quoteObj.quote_array[i].promo.promo_code_value,quoteObj.quote_array[i].promo.promo_code_category,quoteObj.quote_array[i].promo.promo_code_discount_type,i);

            promoCodeHtml = "<div class='quote-box promo-box-container'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[i].promo.promo_code_name+"</span></div><div class='item-notes'>"+quoteObj.quote_array[i].promo.promo_code_description+"</div></div><div class='item-price bold promo-code-total'>"+currencyFormatter(-promoValueInt)+"</div></div></div></div>";                        

          }                  
        }

        if(priceProgramVal < priceStandardVal){
          discountVal = priceStandardVal - priceProgramVal + promoAutoTotalVal; 
          discountHtml = "<span class='discount-txt strike discount-program-price'>"+currencyFormatter(priceStandardVal)+"</span>";
          discountTotalHtml = "<div class='total-discount-line'><div class='item-description total-title discount-title-price'>Discount Total</div><div class='item-price'><span class='discount-txt discount-total-price'>"+currencyFormatter(-discountVal)+"</span></div></div>";
        }

        schoolHtml = "<div class='program-type'><span class='header'>Program</span><br><span class='result'>"+programSchoolName+"</div>";
        campusHtml = "<div class='program-type'><span class='header'>Campus</span><br><span class='result'>"+quoteObj.quote_array[i].campus+", "+quoteObj.quote_array[i].campus_country+"</div>";


        scheduleProgramHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[i].program.option_program+" - "+quoteObj.quote_array[i].program.option_schedule+"<br>("+quoteObj.quote_array[i].program.duration+" Weeks)</span></div><div class='item-notes'>Start: "+quoteObj.quote_array[i].program.start_date+" | End: "+quoteObj.quote_array[i].program.end_date+"</div></div><div class='item-price'>"+discountHtml+"<span class='bold program-price'>"+currencyFormatter(priceProgramVal)+"</span></div></div></div>";

        if(priceRegistrationVal > 0){
          registrationHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Registration Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].program.registration_description+"</div></div><div class='item-price'><span class='bold registration-fee'>"+currencyFormatter(priceRegistrationVal)+"</span></div></div></div>";
        }
        if(priceAdditionalVal > 0){
          additionalHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Additional Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].program.additional_item_name+" - "+quoteObj.quote_array[i].program.additional_fee_description+"</div></div><div class='item-price'><span class='bold additional-fee'>"+currencyFormatter(priceAdditionalVal)+"</span></div></div></div>";
        }
        if(priceMaterialVal > 0){
          materialHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Material Fee</span></div><div class='item-notes'>per week</div></div><div class='item-price'><span class='bold material-fee'>"+currencyFormatter(priceMaterialVal)+"</span></div></div></div>";
        }
        if(priceAccommodationVal > 0){
          accommodationPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[i].accommodation.option_accommodation+"<br>("+quoteObj.quote_array[i].accommodation.length_of_stay+" Weeks)</span></div><div class='item-notes'>Check-in Date: "+quoteObj.quote_array[i].accommodation.check_in_date+"</div></div><div class='item-price'><span class='bold accommodation-price'>"+currencyFormatter(priceAccommodationVal)+"</span></div></div></div>";
          placementFeePriceHtml = priceAccommodationPlacementFeeVal > 0 ? "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Accommodation Administration Fee</span></div></div><div class='item-price'><span class='bold placement-fee'>"+currencyFormatter(priceAccommodationPlacementFeeVal)+"</span></div></div></div>" : '';                  
          accommodationHtml = "<div class='quote-accommodation quote-box'>"+accommodationPriceHtml+placementFeePriceHtml+"</div>";
        }
        if(priceAirportVal > 0){
          airportPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Airport Transfer Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].accommodation.option_airport_transfer+"</div></div><div class='item-price'><span class='bold airport-fee'>"+currencyFormatter(priceAirportVal)+"</span></div></div></div>";
          airportHtml = "<div class='quote-airport quote-box'>"+airportPriceHtml+"</div>";
        }

        if(accommodationNoteVal != 'none'){
          accommodationNoteHtml = "<div class='center footnote'>"+accommodationNoteVal+"</div>";
        }

        insuranceText = 'All ELS students must have medical insurance coverage while in the U.S.A. If you cannot provide evidence of sufficient coverage, in English, you must purchase the ELS Student Health Plan. The Student Health Plan is offered to ELS students at a non-refundable fee of $50 per week. You will receive additional information about the Student Health Plan when you arrive at the center.';
        insuranceNoteHtml = "<div class='center footnote'>"+insuranceText+"</div>";

        priceNoteText= '<sup>*</sup>The prices shown are not valid for government-sponsored business.';
        priceNoteHtml = "<div class='center footnote'>"+priceNoteText+"</div>";

        totalPriceHtml = "<div class='line-item'>"+discountTotalHtml+"<div><div class='item-description total-title bold'>TOTAL</div><div class='item-price bold total-price'>"+currencyFormatter(priceQuoteTotalVal)+"</div></div></div>";                
        quoteHTML = "<div class='col col-md-6 col-quote-"+quoteNum+"'><div class='quote-title'>Quote "+quoteNum+"</div><div class='quote-select-container'><div class='quote-items'><div class='quote-location'>"+schoolHtml+campusHtml+"</div><div class='quote-program-schedule quote-box'>"+scheduleProgramHtml+registrationHtml+additionalHtml+materialHtml+"</div>"+accommodationHtml+airportHtml+promoAutoHtml+"<div class='promo-code-box'>"+promoCodeHtml+"</div>"+printExceptionHtml+"<div class='quote-box total-price-container'>"+totalPriceHtml+"</div>"+accommodationNoteHtml+priceNoteHtml+insuranceNoteHtml+"</div><div class='promo-container'><label for='input-promo-code-"+quoteNum+"'>Enter Promo Code</label><div><input type='text' id='input-promo-code-"+quoteNum+"' class='input-promo-code' name='input-promo-code-"+quoteNum+"'><button data-quote='"+quoteNum+"' class='btn-promo-code btn-orange'>APPLY</button></div><div id='promo-feedback-"+quoteNum+"' class='promo-feedback'></div></div><div><div class='btn-container'><button type='button' class='btn btn-orange-outline bold quote-edit' data-edit-num='"+quoteNum+"' tabindex='0'>Edit</button><button type='button' class='btn btn-orange-outline bold quote-remove' data-remove-num='"+quoteNum+"' tabindex='0'>Remove <span class='icon-remove'>&#8999;</span></button></div></div>"; 

        $('#quote-selection-container').append(quoteHTML);
      }else{
        quoteHTML = "<div class='col col-quote-"+quoteNum+" empty'><div class='quote-title'>Quote "+quoteNum+"</div><div class='new-quote' data-quote='"+quoteNum+"'><div class='create-icon center'><i class='fas fa-plus-circle'></i></div><h3 class='center'>Create a new quote</h3></div></div>";
        $('#quote-selection-container').append(quoteHTML);

      }
    }       
  }

  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));
  printQuoteWidth();
  setTimeout(setBoxHeight('.quote-program-schedule.quote-box'),300);
  setTimeout(setBoxHeight('.quote-accommodation.quote-box'),300);
  setTimeout(setBoxHeight('.program-type'),300);
};


const printQuoteWidth = function(){ 
  if(!$('.col-quote-2').hasClass('empty') && $('.col-quote-3').hasClass('empty')){
    $('.col-quote-1').removeClass('col-md-6');
    $('.col-quote-2').removeClass('col-md-6');  

  }else if(!$('.col-quote-2').hasClass('empty') && !$('.col-quote-3').hasClass('empty')){            
    $('.col-quote-1').removeClass('col-md-6');
    $('.col-quote-2').removeClass('col-md-6');
    $('.col-quote-3').removeClass('col-md-6');
  } 
};

$('.x-convert-container .btn').click(function(){
  if(!$(this).hasClass('active')){
    $(this).addClass('active').addClass('btn-orange-outline').removeClass('btn-black-outline');
    $(this).siblings('.btn').removeClass('active').removeClass('btn-orange-outline').addClass('btn-black-outline');
    resetDestinationCurrency($(this).attr('data-origin-currency'));
  }
});


const currencyModFormatter = function(num,toCurrency){
  let priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: toCurrency, currencyDisplay: 'code' }).format(num);
  return priceFormat;
};

const resetDestinationCurrency = function(currency){
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj"));

  if(quoteObj.quote_array.length >0){
    for (let i = 0; i < quoteObj.quote_array.length; i++){

      if(quoteObj.quote_array[i].quote_enabled){

        if(!currency){
          fromCurrency = quoteObj.country_origin_currency;
          toCurrency = quoteObj.quote_array[i].campus_currency;
          convert = true;
          quoteObj.quote_array[i].show_currency = toCurrency;
        }else{
          toCurrency = currency;
          fromCurrency = quoteObj.quote_array[i].campus_currency;
          quoteObj.quote_array[i].show_currency = toCurrency;
          convert = false;
        }


        if(fromCurrency != toCurrency){              

          quoteNum = i+1;
          conversionRate = 1;

          if(convert){
            conversionRate = $('input[name=quote_'+quoteNum+'_exchange_rate]').val();
          }

          priceProgramVal = parseInt(quoteObj.quote_array[i].program.program_total_price) / conversionRate;          
          priceProgramPrice = priceProgramVal.toFixed();

          priceStandardVal = parseInt(quoteObj.quote_array[i].program.program_total_standard_price) / conversionRate;
          priceStandardPrice = priceStandardVal.toFixed();
          priceRegistrationVal = parseInt(quoteObj.quote_array[i].program.registration_fee) / conversionRate;
          priceRegistrationVal = priceRegistrationVal.toFixed();
          priceAdditionalVal = parseInt(quoteObj.quote_array[i].program.additional_fee) / conversionRate;
          priceAdditionalVal = priceAdditionalVal.toFixed();
          priceMaterialVal = parseInt(quoteObj.quote_array[i].program.material_fee) / conversionRate;
          priceMaterialVal = priceMaterialVal.toFixed();
          priceAccommodationVal = parseInt(quoteObj.quote_array[i].accommodation.accommodation_total_price) / conversionRate;
          priceAccommodationVal = priceAccommodationVal.toFixed();
          priceAirportVal = parseInt(quoteObj.quote_array[i].accommodation.airport_transfer_total_price) / conversionRate;
          priceAirportVal = priceAirportVal.toFixed();
          priceAccommodationPlacementFeeVal = parseInt(quoteObj.quote_array[i].accommodation.placement_fee) / conversionRate;
          priceAccommodationPlacementFeeVal = priceAccommodationPlacementFeeVal.toFixed();
          priceQuoteTotalVal =  parseFloat(quoteObj.quote_array[i].quote_total_price) / conversionRate;
          discountVal = 0;
          promoAutoTotalVal = 0;

          promoAutoValStr = quoteObj.quote_array[i].promo.promo_auto_value.toString();
          promoAutoValArray = quoteObj.quote_array[i].promo.promo_auto_enabled ? promoAutoValStr.split('|') : false;
          promoAutoCatStr = quoteObj.quote_array[i].promo.promo_auto_category.toString();
          promoAutoCategoryArray = quoteObj.quote_array[i].promo.promo_auto_enabled ? promoAutoCatStr.split('|') : false;
          promoAutoTypeStr = quoteObj.quote_array[i].promo.promo_auto_discount_type.toString();
          promoAutoTypeArray = quoteObj.quote_array[i].promo.promo_auto_enabled ? promoAutoTypeStr.split('|') : false;

          promoCodeCategory = quoteObj.quote_array[i].promo.promo_code_category;
          promoCodeType = quoteObj.quote_array[i].promo.promo_code_discount_type;
          promoCodeTotal =  quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].promo.promo_code_value) : 0;


          if(quoteObj.quote_array[i].promo.promo_auto_enabled){
            for(let x = 0; x < promoAutoValArray.length; x++){

              promoAutoVal = convertPercentDollarVal(promoAutoValArray[x],promoAutoCategoryArray[x],promoAutoTypeArray[x],i);
              promoAutoTotal = parseFloat(promoAutoVal) / conversionRate;
              promoAutoTotalVal += parseFloat(promoAutoVal);

              $('.promo-auto-total-'+x,'.col-quote-'+quoteNum).html(currencyModFormatter(-promoAutoTotal,toCurrency));
            }
            promoAutoTotalVal = promoAutoTotalVal / conversionRate;
          }

          if(quoteObj.quote_array[i].promo.promo_code_enabled){

            promoCodeVal = convertPercentDollarVal(promoCodeTotal,promoCodeCategory,promoCodeType,i);
            promoCodeTotal = parseFloat(promoCodeVal)/conversionRate;

            $('.promo-code-total','.col-quote-'+quoteNum).html(currencyModFormatter(-promoCodeTotal,toCurrency));
            priceQuoteTotalVal = priceQuoteTotalVal - promoCodeTotal;
          }


          if(priceProgramVal < priceStandardVal){
            discountVal = priceStandardVal - priceProgramVal + promoAutoTotalVal + promoCodeTotal;             
            discountVal = parseFloat(discountVal);
            $('.col-quote-'+quoteNum+' span.discount-program-price').html(currencyModFormatter(priceStandardPrice,toCurrency));
            $('.col-quote-'+quoteNum+' span.discount-total-price').html(currencyModFormatter(discountVal,toCurrency));
          }

          $('.col-quote-'+quoteNum+' span.program-price').html(currencyModFormatter(priceProgramPrice,toCurrency));
          $('.col-quote-'+quoteNum+' span.registration-fee').html(currencyModFormatter(priceRegistrationVal,toCurrency));
          $('.col-quote-'+quoteNum+' span.additional-fee').html(currencyModFormatter(priceAdditionalVal,toCurrency));
          $('.col-quote-'+quoteNum+' span.material-fee').html(currencyModFormatter(priceMaterialVal,toCurrency));
          $('.col-quote-'+quoteNum+' span.accommodation-price').html(currencyModFormatter(priceAccommodationVal,toCurrency));
          $('.col-quote-'+quoteNum+' span.airport-fee').html(currencyModFormatter(priceAirportVal,toCurrency));
          $('.col-quote-'+quoteNum+' span.placement-fee').html(currencyModFormatter(priceAccommodationPlacementFeeVal,toCurrency));

          $('.col-quote-'+quoteNum+' div.total-price').html(currencyModFormatter(priceQuoteTotalVal,toCurrency));

        }


      }
    }
    localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));
  }
};

//Email Quote


const sendEmailQuoteForm = function(){
  let url = 'https://api.hsforms.com/submissions/v3/integration/submit/'+portalId+'/'+fGuid;
  url = encodeURI(url);

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      firstName =  $('form#pricing-quote input[name=first_name]').val(),
      lastName =  $('form#pricing-quote input[name=last_name]').val(),
      email = $('form#pricing-quote input[name=email]').val(),
      nationality = $('form#pricing-quote select[name=nationality] option:selected').val(),
      phone = $('form#pricing-quote input[name=phone]').val(),
      withAgent = $('form#pricing-quote input[name=with_agent]:checked').val(),
      isAgent = $('form#pricing-quote input[name=is_agent]:checked').val(),
      whatsApp = false;

  if($('form#pricing-quote input[name=quote_whatsapp_check]').is(':checked')){
    whatsApp = $('form#pricing-quote input[name=quote_whatsapp_check]:checked').val();
  }
  let agentName = $('form#pricing-quote input[name=quote_agent_company_name]').val(),
      agentFirstName = $('form#pricing-quote input[name=quote_agent_first_name]').val(),
      agentLastName = $('form#pricing-quote input[name=quote_agent_last_name]').val(),
      agentEmail = $('form#pricing-quote input[name=quote_agent_email]').val(); 

  let formFieldsArray = [
    {
      "objectTypeId": "0-1",
      "name": "firstname",
      "value": firstName
    },
    {
      "objectTypeId": "0-1",
      "name": "lastname",
      "value": lastName
    },
    {
      "objectTypeId": "0-1",
      "name": "email",
      "value": email
    },
    {
      "objectTypeId": "0-1",
      "name": "nationality",
      "value": nationality
    },
    {
      "objectTypeId": "0-1",
      "name": "phone",
      "value": phone
    },
    {
      "objectTypeId": "0-1",
      "name": "are_you_currently_working_with_an_education_agent_agency_",
      "value": withAgent
    },
     {
       "objectTypeId": "0-1",
       "name": "are_you_an_education_agent_agency_",
       "value": isAgent
     },
    {
      "objectTypeId": "0-1",
      "name": "quote_whatsapp_check",
      "value": whatsApp
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_agent_company_name",
      "value": agentName
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_agent_first_name",
      "value": agentFirstName
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_agent_last_name",
      "value": agentLastName
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_agent_email",
      "value": agentEmail
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_school_selection",
      "value": quoteObj.school_name
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_country_of_residence",
      "value": quoteObj.country_origin
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_country_origin_currency_selection",
      "value": quoteObj.country_origin_currency
    },
    {
      "objectTypeId": "0-1",
      "name": "quote_program_school_selection",
      "value": quoteObj.program_school_name
    }
  ];

  for (let i = 0; i < quoteObj.quote_array.length; i++){
    quoteNum = i + 1;
    countryOriginCurrency = quoteObj.country_origin_currency;
    showCurrency = quoteObj.quote_array[i].show_currency;
    conversionRate = 1;
    if(countryOriginCurrency != showCurrency){
      conversionRate = $('input[name=quote_'+quoteNum+'_exchange_rate]').val();
    }

    programTotalPriceInt = parseInt(quoteObj.quote_array[i].program.program_total_price) / conversionRate;

    programTotalPrice = programTotalPriceInt.toFixed();

    programTotalStandardPriceInt = parseInt(quoteObj.quote_array[i].program.program_total_standard_price) / conversionRate;
    programTotalStandardPrice = programTotalStandardPriceInt.toFixed();
    registrationFee = parseInt(quoteObj.quote_array[i].program.registration_fee) / conversionRate;
    registrationFee = registrationFee.toFixed();
    additionalFee = parseInt(quoteObj.quote_array[i].program.additional_fee) / conversionRate;
    additionalFee = additionalFee.toFixed();
    materialFee = parseInt(quoteObj.quote_array[i].program.material_fee) / conversionRate;
    materialFee = materialFee.toFixed();
    accommodationPrice = parseInt(quoteObj.quote_array[i].accommodation.accommodation_total_price) / conversionRate;
    accommodationPrice = accommodationPrice.toFixed();
    airportFee = parseInt(quoteObj.quote_array[i].accommodation.airport_transfer_total_price) / conversionRate;
    airportFee = airportFee.toFixed();
    placementFee = parseInt(quoteObj.quote_array[i].accommodation.placement_fee) / conversionRate;
    placementFee = placementFee.toFixed();

    totalAmount = quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].quote_total_price) - parseInt(quoteObj.quote_array[i].promo.promo_code_value) : parseInt(quoteObj.quote_array[i].quote_total_price);

    totalPrice = totalAmount / conversionRate;

    accommodationEnable = quoteObj.quote_array[i].accommodation.accommodation_enable;

    familyAdultAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult);
    familyChildAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child);
    familyChildPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child_total_price);
    familyAdultPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price);

    showFamilyChildAdd = 'none';
    showFamilyAdultAdd = 'none';

    if(familyChildAddEnable > 0){
      showFamilyChildAdd = 'block';
    }
    if(familyAdultAddEnable > 0){
      showFamilyAdultAdd = 'block';
    }

    promoAutoTotalVal = 0;
    discountPrice = 0;
    showDiscount = 'none';


    showPromoAuto = quoteObj.quote_array[i].promo.promo_auto_enabled ? 'revert' : 'none';
    showPromoCode = quoteObj.quote_array[i].promo.promo_code_enabled ? 'revert' : 'none';

    promoAutoValArray = [];

    promoAutoCatStr = quoteObj.quote_array[i].promo.promo_auto_category.toString();
    promoAutoCategoryArray = quoteObj.quote_array[i].promo.promo_auto_enabled ? promoAutoCatStr.split('|') : false;
    promoAutoTypeStr = quoteObj.quote_array[i].promo.promo_auto_discount_type.toString();
    promoAutoTypeArray = quoteObj.quote_array[i].promo.promo_auto_enabled ? promoAutoTypeStr.split('|') : false;


    promoAutoValueStr = quoteObj.quote_array[i].promo.promo_auto_value.toString();
    promoAutoValArr = promoAutoValueStr.split('|');

    if(quoteObj.quote_array[i].promo.promo_auto_enabled){
      if(promoAutoValArr.length > 0){
        for(let z = 0; z < promoAutoValArr.length; z++){

          autoValInt = convertPercentDollarVal(promoAutoValArr[z],promoAutoCategoryArray[z],promoAutoTypeArray[z],i);

          autoVal = parseInt(autoValInt)/conversionRate;
          promoAutoTotalVal += parseFloat(autoVal);
          autoVal = autoVal;
          promoAutoValArray.push(
            currencyModFormatter(autoVal,showCurrency)
          )
        }
        promoAutoTotalVal = promoAutoTotalVal/conversionRate;
      }

    }
    promoAutoValStr = promoAutoValArray.length > 0 ? promoAutoValArray.toString().replace('00,','|') : 'n/a';

    promoCodeCategory = quoteObj.quote_array[i].promo.promo_code_category;
    promoCodeType = quoteObj.quote_array[i].promo.promo_code_discount_type;
    promoCodeTotal =  quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].promo.promo_code_value) : 0;



    promoCodeVal = quoteObj.quote_array[i].promo.promo_code_enabled ? convertPercentDollarVal(promoCodeTotal,promoCodeCategory,promoCodeType,i) : 0;
    promoCodeVal = parseInt(promoCodeVal)/conversionRate;

    if(programTotalStandardPriceInt > programTotalPriceInt){     
      discountPrice = programTotalStandardPriceInt - programTotalPriceInt + promoAutoTotalVal + promoCodeVal;
      discountPrice = parseFloat(discountPrice);
      discountPrice = currencyModFormatter(discountPrice,showCurrency);  
      showDiscount = 'revert';
    }
    showAccommodation = 'none';
    if(accommodationEnable == 'true'){
      showAccommodation = 'block';
    }

    if(quoteObj.quote_array[i].quote_enabled){

      formFieldsArray.push(
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_campus_selection",
          "value": quoteObj.quote_array[i].campus 
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_campus_country_selection",
          "value": quoteObj.quote_array[i].campus_country 
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_selection",
          "value": quoteObj.quote_array[i].program.option_program
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_selection",
          "value": quoteObj.quote_array[i].program.option_schedule
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_description",
          "value": quoteObj.quote_array[i].program.option_schedule_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_standard_price_selection",
          "value": currencyModFormatter(programTotalStandardPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_price_selection",
          "value": currencyModFormatter(programTotalPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_duration_selection",
          "value": quoteObj.quote_array[i].program.duration
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_registration_fee",
          "value":currencyModFormatter(registrationFee,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_registration_description",
          "value": quoteObj.quote_array[i].program.registration_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_additional_fee",
          "value":currencyModFormatter(additionalFee,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_additional_fee_description",
          "value":quoteObj.quote_array[i].program.additional_item_name + ' - ' + quoteObj.quote_array[i].program.additional_fee_description
        },

        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_material_fee",
          "value":currencyModFormatter(materialFee,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_note",
          "value":quoteObj.quote_array[i].program.program_note
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult_show",
          "value":showFamilyAdultAdd
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child_show",
          "value":showFamilyChildAdd
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child",
          "value": quoteObj.quote_array[i].accommodation.family_additional_child
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult",
          "value": quoteObj.quote_array[i].accommodation.family_additional_adult
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child_price",
          "value": currencyModFormatter(familyChildPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult_price",
          "value": currencyModFormatter(familyAdultPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_show",
          "value":showAccommodation
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_program",
          "value": quoteObj.quote_array[i].accommodation.option_accommodation
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_duration",
          "value": quoteObj.quote_array[i].accommodation.length_of_stay
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_check_in_date",
          "value": quoteObj.quote_array[i].accommodation.check_in_date
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_total_price",
          "value":currencyModFormatter(accommodationPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_airport_transfer",
          "value": quoteObj.quote_array[i].accommodation.option_airport_transfer
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_airport_transfer_fee",
          "value":currencyModFormatter(airportFee,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_placement_fee",
          "value":currencyModFormatter(placementFee,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_note",
          "value":quoteObj.quote_array[i].accommodation.accommodation_note_plain
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_discount_show",
          "value":showDiscount
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_total_price_discount",
          "value":discountPrice
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_show",
          "value":showPromoAuto
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_name",
          "value":quoteObj.quote_array[i].promo.promo_auto_code_name
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_description",
          "value":quoteObj.quote_array[i].promo.promo_auto_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_value",
          "value":promoAutoValStr
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_show",
          "value":showPromoCode
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code",
          "value":quoteObj.quote_array[i].promo.promo_code
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_name",
          "value":quoteObj.quote_array[i].promo.promo_code_name
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_description",
          "value":quoteObj.quote_array[i].promo.promo_code_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_value",
          "value":currencyModFormatter(promoCodeVal,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_total_price",
          "value":currencyModFormatter(totalPrice,showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_start_date",
          "value":quoteObj.quote_array[i].program.start_date
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_show",
          "value": "block"
        }
      );
    }else{
      formFieldsArray.push(
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_outlook_show",
          "value": "mso-hide:all"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_campus_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_campus_country_selection",
          "value": "n/a" 
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_description",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_standard_price_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_price_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_duration_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_registration_fee",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_registration_description",
          "value": "n/a"
        },

        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_additional_fee",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_additional_fee_description",
          "value": "n/a"
        },

        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_material_fee",
          "value" :0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_note",
          "value":"none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult_show",
          "value":"none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child_show",
          "value":"none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_child_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_family_add_adult_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_show",
          "value":"none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_program",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_duration",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_check_in_date",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_total_price",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_airport_transfer",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_airport_transfer_fee",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_placement_fee",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_accommodation_note",
          "value":"n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_discount_show",
          "value":"none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_total_price_discount",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_show",
          "value":'none'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_name",
          "value":'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_description",
          "value":'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_auto_value",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_show",
          "value":'none'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code",
          "value":'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_name",
          "value":'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_description",
          "value":'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_value",
          "value":0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_total_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_start_date",
          "value":"n/a"
        }       
      );
    }

  }

  let formArray = {
    "fields" : formFieldsArray,
    "context" : {
      "pageUri" : "www.els.edu/price-quote/els/programs",
      "pageName" : "ELS Price Quote"
    },
    "legalConsentOptions" :{
      "consent": { // Include this object when GDPR options are enabled
        "consentToProcess": true,
        "text": "I agree to allow ELS to store and process my personal data.",
      }
    }
  };



  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(formArray), 
    success: function(data) {
      langCode = document.documentElement.lang;
      langVar = langCode == 'en' ? '' : '/'+langCode;
      location.href= langVar + '/price-quote/email-confirmation';
    },
    contentType: "application/json",
    dataType: 'json'
  });
};

//end Quote Step

$(document).ready(function(){

  slickCarousel();
  setQuoteNumber();
  setCountryOriginELS();
  initiateLocalJson();
  $( function() {
    $( "#datepicker" ).datepicker(
      {
        minDate: 0,
        dateFormat: 'yy-mm-dd',
        beforeShowDay: function(date){
          if(date.getDay() == 0){
            return [true];
          } else {
            return [false];
          }
        }
      }
    );
  });

});