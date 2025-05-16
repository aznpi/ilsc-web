//start step logic
const updateLocalJson = function(dataStep,editNum){
  
  if(dataStep == 'campus-select'){
    updateCampusSelection(editNum);
    getProgramsList();
    setMarketPriceCode();
   

  }else if(dataStep == 'program-select'){
    getProgramsPriceList();
   // printProgramHeaderTitle();
   
  
  }else if(dataStep == 'program-price-select'){
    setProgramGroup();
    updateProgramSelectionTotalPrice();
    printStartDateSelection();
        
  }else if(dataStep == 'start-date-select'){
    updateProgramSelection(editNum);
    updateStartDateSelection(editNum);
    getProgramPriceDuration();
    redirectFamilyStep();
    
  }else if(dataStep == 'family-option-select'){
    
     redirectFamilyOptionStep();
     
    
  }else if(dataStep == 'family-select'){
   
   updateFamilyAddSelection(editNum);
   redirectToQuoteSummary();
    
  }else if(dataStep == 'accommodation-option-select'){
  
     redirectAccomodationOptionStep();
     
  }else if(dataStep == 'accommodation-age-option-select'){
    
    printAccomodationForm();
    
  }else if(dataStep == 'accommodation-select'){
    
   setTimeout(setAccommodationGroup(),200);
   updateStartDateSelection(editNum);
   redirectToQuoteSummary();
    
  }

};

const redirectToQuoteSummary = function(){
   
   setTimeout(setTotalPrice,300);
   setTimeout(printQuotesHTML,500);
  
    let quoteSlide = $('.quote-step-slide .slick-slide').index( $('#quote-summary') );
    $('#quote-price-container').attr('data-complete',true);
    $('.quote-step-slide').slick('slickGoTo',quoteSlide);
};
//Step Campus Selection

const updateCampusSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      campusSelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-selected-campus'),
      campusCountrySelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-country'),
      campusCurrencySelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-selected-campus-currency'),
      programSelected = $('.campus-selection-container .campus-select[data-selected=true]').attr('data-program-area'),
      initShowCurrency = $('input[name=country_origin_currency_selection]').val();
  
  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].quote_enabled = true;
      quoteJson.quote_array[i].campus = campusSelected;
      quoteJson.quote_array[i].campus_country = campusCountrySelected;
      quoteJson.quote_array[i].campus_currency = campusCurrencySelected;
      quoteJson.quote_array[i].show_currency = initShowCurrency;
      quoteJson.quote_array[i].program_school_name = programSelected;
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
  let getValue = $(this).text(),
      getId = $(this).attr('data-campus-id'),
      getCountryValue = $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-country'),
      getCampusCurrency = $(this).attr('data-campus-currency');
  resetCampusSelect();
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-selected-campus',getCountryValue);
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-program-area',getValue);
  $(this).parent().siblings("button.campus-select").attr('data-selected',true).attr('data-selected-campus-currency',getCampusCurrency);
  $('input[name=campus_selection]').val(getValue);
  $('input[name=campus_id_selection]').val(getId);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $(this).parent().siblings("button.campus-select").find('span.selected-text').text(getValue);
  disableCampusDrop();
  $("#program-list-container").empty();
  resetNextButton('.program-list-selection-container');
  getExchangeRate();
  
});

$(".campus-selection-container .dropdown button.direct-link").on("click", function() {
  let getValue = $(this).find('span.selected-text').text(),
      getCountryValue = $(this).attr('data-country'),
      getCampusCurrency = $(this).attr('data-selected-campus-currency');
  resetCampusSelect();
  $(this).attr('data-selected','true').attr('data-selected-campus',getValue);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $('input[name=campus_selection]').val(getValue);
 disableCampusDrop();
  $("#program-list-container").empty();
  resetNextButton('.program-list-selection-container');
  getExchangeRate();
});

//Step Program Selection
$('#program-list-container').on('click','input[type=radio]',function() {
  let getValue = $(this).val(),
      getId = $(this).attr('id'),
      getDescription = $(this).attr('data-description'),
      getCategory = $(this).attr('data-category'),
      isCoop = $(this).attr('data-is-coop');
  
  $('input[name=program_description_selection]').val(getDescription);
  $('input[name=program_is_coop]').val(isCoop);
  $('input[name=program_selection]').val(getValue);
  $('input[name=program_parent_selection]').val(getValue);
  $('input[name=program_id_selection]').val(getId);
  $('input[name=program_category]').val(getCategory);
  $( ".program-list-selection-container button.next").removeClass('disable').addClass('enable');
});

//API get Programs List 
const getProgramsList = function(){
  let isEdit = $('input[name=quote_edit]').val(),
      isEditProgramName = $('input[name=quote_edit_original_program_selection]').val(),
      schoolName = $('input[name=school_selection]').val(),
      programName = $('input[name=program_school_selection]').val(),
      campusName = $('input[name=campus_selection]').val(),
        campusId = $('input[name=campus_id_selection]').val(),
      tableId = schoolProgramListTable,
        queryParam = '&campus__in='+campusId+'&show_quote_tool__eq=1&program_type__in='+programName+'&orderBy=program_name',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);
  
  if ( $('#program-list-container').children().length == 0 ) {
    // jQuery cross domain ajax
      $.get(api_url).done(function (data) {
        let dataObject = data.results;
        
      if(dataObject.length >0){
        for (let i = 0; i < dataObject.length; i++){
          let selectEdit = '';
            programName = dataObject[i].values.program_name;
            programDescription = dataObject[i].values.description;
          programDescription = programDescription ? programDescription.replace(/['\u2019]/g,"&rsquo;") : '';
          programId = dataObject[i].id;
            programCategory = dataObject[i].values['category'].name;
   
            if(isEdit === 'true'){
              if(programName == isEditProgramName){
               selectEdit = 'checked';
                enableNextButton('.program-list-selection-container');
               //$('#program-list-container .program-option input[value="'+programName+'"]').click();
              }
            }
          
          radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-radio' name='program_radio_selection' id='"+programId+"' data-category='"+programCategory+"' data-description='"+programDescription+"' value='"+programName+"' "+selectEdit+"/><label for='"+programId+"'>"+programName+"</label></div>";
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
      quoteJson =  JSON.parse(quoteObject),
      programSelected = $('input[name=program_selection]').val(),
      programCategory = $('input[name=program_category]').val();
  
  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.option_program = programSelected;
      quoteJson.quote_array[i].program.category = programCategory;
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
const getProgramsPriceList= function(){
  let isEdit = $('input[name=quote_edit]').val(),
      marketPriceCode = $('input[name=market_price_code]').val(),
      marketPriceId = $('input[name=market_price_id]').val(),
      programSchool = $('input[name=program_school_selection]').val(),
      programId = $('input[name=program_id_selection]').val(),
      programCategory = $('input[name=program_category]').val(),
      campusName = $('input[name=campus_selection]').val(),
        campusId = $('input[name=campus_id_selection]').val(),
      tableId = schoolPriceListTable,
      marketTableId = schoolMarketPriceListTable;
     
      if(isEdit === 'true'){
        $('#program-price-list-container').empty();
      }
  
        queryParam1 = '&campus_location__in='+campusId+'&category__eq='+programCategory+'&programs_available__in='+programId+'&enable__eq=1&orderBy=price_current',
        api_url_1 = apiUrl+tableId+'/rows?portalId='+portalId+queryParam1;
      programPriceArray = [],
      objects = [];
  
      api_url_1 = encodeURI(api_url_1); 

  
 if ( $('#program-price-list-container').children().length == 0 ) {
  
   if(programCategory.indexOf('Program') === -1){

      $.when(
        // Get the HTML
        $.getJSON(api_url_1, function(data1) {
            dataObject1 = data1.results;

        })

      ).then(function() {

        if(dataObject1.length > 0){
          programPriceArray = dataObject1.map(std => ({
            program_id: std.id,
              program_name: std.values.item_name,
              program_schedule: std.values['weeks'].name,
              program_description: std.values.description,
              price_id: std.values.price_code,
              price:std.values.price_current,
              price_additional:std.values.additional_fee_price,
              price_additional_2:std.values.additional_fee_price_2,
              family_additional_enable:std.values.enable_additional_family_members
          }));

        }

        if(programPriceArray.length > 0){
          printStandardPriceProgramList(programPriceArray);
        }else{
          radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
          $("#program-price-list-container").append(radioHtml);
        }      

      }).fail(function() {
          radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
          $("#program-price-list-container").append(radioHtml);
        });
    }else{
      getProgramsPriceListLowest();
    }
 }
   
};
const getProgramsPriceListLowest = function(){
  let marketPriceCode = $('input[name=market_price_code]').val(),
      marketPriceId = $('input[name=market_price_id]').val(),
      programName = $('input[name=program_selection]').val(),
      campusName = $('input[name=campus_selection]').val(),
        campusId = $('input[name=campus_id_selection]').val(),
      campusCountryName = $('input[name=campus_country_selection]').val(),
      tableId = schoolPriceListTable,
      marketTableId = schoolMarketPriceListTable,
        queryParam = '&campus_location__in='+campusId+'&programs_available__in='+programName+'&is_program_price__eq=1&enable__eq=1&orderBy=price_current',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam,
      programPriceArray = [];
  
  api_url = encodeURI(api_url);
  
  $('#program-price-list-container').empty();
  
    // jQuery cross domain ajax
       $.ajax({
          url : api_url,
          type : "get",
          async: false,
          success : function(data) {
             let dataObject = data.results;
            
            for (let i = 0; i < dataObject.length; i++){
                 
                    scheduleName = dataObject[i].values['category'].name;

                  programPriceArray.push({
                    program_id:dataObject[i].id,
                      schedule_name: scheduleName,
                      item_name: dataObject[i].values.item_name,
                      price_format: dataObject[i].values.price_type,
                      price_id: dataObject[i].values.price_code,
                      price: dataObject[i].values.price_current,
                    schedule_id: scheduleName.replace(/\s/g, ''),
                      group_id:dataObject[i].values['group_code'][0].id,
                      campus_country: dataObject[i].values['country'].name,
                    program_name:programName,
                      family_additional_enable:dataObject[i].values.enable_additional_family_members
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
                            'schedule_name':values[i][x].schedule_name,
                            'program_name':programName,
                              'family_additional_enable': values[i][x].family_additional_enable
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

};
const setProgramGroup = function(){
  let groupId = $('input[name=program_price_selection]:checked').attr('id');
  $('input[name=program_schedule_group_id_selection]').val(groupId);
};
const printStandardLowestPriceProgramList = function(listArray){
  
  let isEdit = $('input[name=quote_edit]').val(),
      selectedGroupId = $('input[name=quote_edit_original_program_schedule_selection]').val(),
      programNameTitle = $('input[name=program_selection]').val(),
      programDescription = $('input[name=program_description_selection]').val(),
      isCheckedArr = [];
  
  if(listArray.length >0){
     
    titleHtml = "<h3 class='title text-center'>"+programNameTitle+"</h3>";
    descriptionHtml = programDescription;
    $(".step-content-container .program-title.step-title").html(titleHtml + descriptionHtml);
    
    for (let i = 0; i < listArray.length; i++){
      let selectEdit = '';
      scheduleName = listArray[i].program_name;
      itemName = listArray[i].item_name;
      familyAdditionalEnable = listArray[i].family_additional_enable;
      priceFormat = listArray[i].price_format;
      priceConversion = xConversion(listArray[i].price);
      price = currencyFormatter(priceConversion);
      scheduleId = scheduleName.replace(/\s/g, '');
      groupId = listArray[i].group_id;
      if(isEdit === 'true'){
        if(selectedGroupId == groupId){
          selectEdit = 'checked';
          isCheckedArr.push('checked');
        }
      }
      
      radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='"+groupId+"' value='"+groupId+"' data-program-name='"+scheduleName+"' data-item-name='"+itemName+"' data-family-additional-enable='"+familyAdditionalEnable+"' data-price-format='"+priceFormat+"' data-price='"+priceConversion+"' "+selectEdit+"/><label for='"+groupId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+" from</span><span class='price-text'>"+price+"</span></div></label></div>";
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
  updatePriceSelection();
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
      let api_price_url = apiUrl+tableMarketPriceId+'/rows?portalId='+portalId+queryPriceParam;
    api_price_url = encodeURI(api_price_url);
   /* 
    $.get(api_price_url).done(function (dataP) {
      let dataPriceObject = dataP.objects;
      
      for (let x = 0; x < dataPriceObject.length; x++){
        listArrayP[y].price = dataPriceObject[x].values[2];          
        let priceLocal = JSON.parse(localStorage.getItem('program-price')) || [];
        priceLocal.push(listArrayP[y]);      
        localStorage.setItem('program-price', JSON.stringify(priceLocal));
      }
    })*/
    
    $.ajax({
      url : api_price_url,
      type : "get",
      async: false,
      success : function(dataP) {
          let dataPriceObject = dataP.results;     
        let priceLocal = JSON.parse(localStorage.getItem('program-price')) || [];
        if( dataPriceObject.length > 0){
          for (let x = 0; x < dataPriceObject.length; x++){

              if(dataPriceObject[x].values.price){
                listArrayP[y].price = dataPriceObject[x].values.price;
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
      programNameTitle = $('input[name=program_selection]').val(),
      programDescription = $('input[name=program_description_selection]').val();
  
  retrievedJson.sort((a, b) => (a.price > b.price ? 1 : -1));
  if(retrievedJson.length > 0){
     
      titleHtml = "<h3 class='title text-center'>"+programNameTitle+"</h3>";
      descriptionHtml = programDescription;
      $(".step-content-container .program-title.step-title").html(titleHtml + descriptionHtml);
    
    for (let i = 0; i < retrievedJson.length; i++){

      let selectEdit = '';
      scheduleName = retrievedJson[i].program_name;
      itemName = retrievedJson[i].item_name;
      familyAdditionalEnable = retrievedJson[i].family_additional_enable;
      priceFormat = retrievedJson[i].price_format;
      priceConversion = xConversion(retrievedJson[i].price);
      price = currencyFormatter(priceConversion);
      groupId = retrievedJson[i].group_id;
      if(isEdit === 'true'){
        if(selectedGroupId == groupId){
          selectEdit = 'checked';
          isCheckedArr.push('checked');
        }
      }
      radioHtml = radioHtml+ "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='"+groupId+"' value='"+groupId+"' data-program-name='"+scheduleName+"' data-item-name='"+itemName+"' data-family-additional-enable='"+familyAdditionalEnable+"' data-price-format='"+priceFormat+"' data-price='"+priceConversion+"' "+selectEdit+"/><label for='"+groupId+"'><div class='program-name float-left'>"+scheduleName+" - "+itemName+"</div><div class='text-right float-right'><span class='price-format'>"+priceFormat+" from</span><span class='price-text'>"+price+"</span></div></label></div>";
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
  updatePriceSelection();
};
const printStandardPriceProgramList = function(listArray){
  let isEdit = $('input[name=quote_edit]').val(),
      selectedGroupId = $('input[name=quote_edit_original_program_schedule_selection]').val(),
      campusName = $('input[name=campus_selection]').val(),
      programNameTitle = $('input[name=program_selection]').val(),
      programDescription = $('input[name=program_description_selection]').val();
 
  listArray.sort(function(a, b) {
    let nameA = a.program_name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.program_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  
  
  if(listArray.length > 0){
     titleHtml = "<h3 class='title text-center'>"+programNameTitle+"</h3>";
     descriptionHtml = programDescription;
      $(".step-content-container .program-title.step-title").html(titleHtml + descriptionHtml),
      isCheckedArr = [];
    
    for (let i = 0; i < listArray.length; i++){
    
      let selectEdit = '';
      priceAdditionalConversion = 0;
      priceAdditionalConversion2 = 0;
      programName =  listArray[i].program_name; 
      scheduleName = listArray[i].program_schedule;
      familyAdditionalEnable = listArray[i].family_additional_enable;
      duration = scheduleName.replace('Weeks','').replace(' ','');
      scheduleDescription = listArray[i].program_description;
      priceConversion = xConversion(listArray[i].price);
      if(listArray[i].price_additional){
        priceAdditionalConversion = xConversion(listArray[i].price_additional);
      }
        if(listArray[i].price_additional_2){
          priceAdditionalConversion2 = xConversion(listArray[i].price_additional_2);
        }
      price = currencyFormatter(priceConversion);         
      scheduleId = listArray[i].program_id;

      if(isEdit === 'true'){
        if(selectedGroupId == scheduleId){
          selectEdit = 'checked';
          isCheckedArr.push('checked');
        }
      }

        radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='"+scheduleId+"-"+campusName+"' value='"+scheduleId+"' data-campus='"+campusName+"' data-program-name='"+programName+"' data-price-addition='"+priceAdditionalConversion+"' data-price-addition-2='"+priceAdditionalConversion2+"' data-duration='"+duration+"' data-item-name='"+scheduleName+"' data-family-additional-enable='"+familyAdditionalEnable+"'  data-std-price='"+priceConversion+"' data-description='"+scheduleDescription+"' data-price='"+priceConversion+"' "+selectEdit+"/><label for='"+scheduleId+"-"+campusName+"'><div class='program-name float-left'>"+programName+" - "+scheduleName.toUpperCase()+"</div><div class='price-container text-right float-right'><span class='price-text'>"+price+"</span></div></label></div>";

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
  
  updatePriceSelection();
};
const updatePriceSelection = function(){
  $('#program-price-list-container >div.program-option').click(function(){
    let programId = $('input[name=program_price_selection]',this).val(),
        stdPrice = $('input[name=program_price_selection]',this).attr('data-price'),
        price = $('input[name=program_price_selection]',this).attr('data-price'),
        programName = $('input[name=program_price_selection]',this).attr('data-program-name'),
        programDescription = $('input[name=program_price_selection]',this).attr('data-description'),
        itemName = $('input[name=program_price_selection]',this).attr('data-item-name'),
        duration = $('input[name=program_price_selection]',this).attr('data-duration'),
        programCategory = $('input[name=program_category]').val(),
        additionalPrice = $('input[name=program_price_selection]',this).attr('data-price-addition'),
        additionalPrice2 = $('input[name=program_price_selection]',this).attr('data-price-addition-2');

    $('input[name=program_selection]').val(programName);
    $('input[name=program_schedule_description]').val(programDescription);
    $('input[name=program_schedule_price_id_selection]').val(programId);
    $('input[name=program_schedule_selection]').val(itemName);
    $('input[name=program_schedule_price_selection]').val(price);
    $('input[name=program_schedule_standard_price_selection]').val(stdPrice);
    $('input[name=program_duration]').val(duration);
    $('input[name=family_additional_price]').val(additionalPrice);
    $('input[name=family_additional_price_2]').val(additionalPrice2);
  });
};
const updateProgramSelectionTotalPrice = function(){
  let editNum = $('input[name=quote_number]').val(),
      objPosition = editNum -1,
      programTotalPrice = $('input[name=program_schedule_price_selection]').val(),
      programStandardPrice =$('input[name=program_schedule_standard_price_selection]').val(),
      programMaterialFee = $('input[name=program_schedule_material_fee_selection]').val(),    
      programOptionSchedule = $('input[name=program_schedule_selection]').val(),
      programOptionDescription = $('input[name=program_schedule_description]').val(),
      programId = $('input[name=program_schedule_price_id_selection]').val(),
      groupId = $('input[name=program_schedule_group_id_selection]').val(),
      campus = $('input[name=campus_selection]').val(),
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
      
      quoteJson.quote_array[objPosition].campus = campus;
      quoteJson.quote_array[objPosition].program.material_fee = parseInt(programMaterialFee);
      quoteJson.quote_array[objPosition].program.option_schedule = programOptionSchedule;
      quoteJson.quote_array[objPosition].program.option_schedule_description = programOptionDescription;
      quoteJson.quote_array[objPosition].program.program_total_price = parseInt(programTotalPrice);
      quoteJson.quote_array[objPosition].program.program_total_standard_price = parseInt(programStandardPrice);
      quoteJson.quote_array[objPosition].program.program_id = parseInt(programId);
      quoteJson.quote_array[objPosition].program.group_id = groupId;
     
  
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
$('#program-price-list-container').on('click','input[type=radio]',function() {
  resetPrintDates();
});
// Step Start Date
// Start Date Dropdown validation
const dateDropValidation = function(className){
  parentClass = $(className).parent().parent().find(".selectBox__value");
  optionVal = $(className).attr('data-item');
  currentVal = parentClass.attr('data-selected');
  currentOption = parentClass.attr('data-option');

  if(currentVal != optionVal){
    if(currentOption == 'month'){
      if($(".start-date-selection-container .selectDay").hasClass('active')){
        $(".start-date-selection-container .selectDay").removeClass('show');
        $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Day');
      }else{
        $(".start-date-selection-container .selectDay").addClass('active').removeClass('disabled');      
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
    }                     
  }        
};

$(document).on("click",".start-date-selection-container .select-container .selectBox.active", function(e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target,
      container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  container.attr('data-selected',$(dropdownItem).attr('data-item'));
  if($(this).hasClass('selectMonth')){
    container.attr('data-day-selected',$(dropdownItem).attr('data-day'));
  }
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

  let yearValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=year]').attr('data-selected'),
      monthValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=month]').attr('data-selected');
  
  if(yearValue !='' && monthValue != ''){
    $( ".start-date-selection-container button.next").removeClass('disable').addClass('enable');
  }else{
    resetNextButton('.start-date-selection-container');
  }
  

});
$(document).on("click",".accommodation-price-selection-container .select-container .selectBox.active", function(e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target;
  let container = $(this).find("input.selectBox__value");
  container.val(dropdownItem.text);
  container.attr('data-selected',$(dropdownItem).attr('data-item'));
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

});

$(document).on("click",".family-add-selection-container .select-container .selectBox.active", function(e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target,
      container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  container.attr('data-selected',$(dropdownItem).attr('data-item'));
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

  let childValue = $('.family-add-selection-container .selectBox .selectBox__value[data-option=child]').attr('data-selected'),
      adultValue = $('.family-add-selection-container .selectBox .selectBox__value[data-option=adult]').attr('data-selected');
  $('input[name=family_child_additional]').val(childValue);
  $('input[name=family_adult_additional]').val(adultValue);
  
  if(childValue !='' || adultValue != ''){
    $( ".family-add-selection-container button.next").removeClass('disable').addClass('enable');
  }

});

$(document).on("click",".start-date-selection-container .select-container .selectBox.active .dropdown-item", function(e) {
  e.preventDefault();  
  dateDropValidation(this);
  dataParentVal = $(this).attr('data-parent');
  dataVal = $(this).attr('data-item');
  if(dataParentVal == 'year'){ 
    setTimeout(printDates('month',dataVal), 10000);
  }
});

// Print Start Date Selection
const printStartDateSelection = function(){
  $("#start-date-container").empty();
  $('.date-container .selectBox').removeClass('show');
  let groupId =  $('input[name=program_schedule_price_id_selection]').val(),     
      programScheduleName = $('input[name=program_schedule_selection]').val(),
      programName = $('input[name=program_selection]').val(),
      programCategory = $('input[name=program_category]').val(),
      price = $('input[name=program_price_selection]:checked').attr('data-price'),
      priceFormat = $('input[name=program_price_selection]:checked').attr('data-price-format'),
      priceFormatted = currencyFormatter(price),
      priceFormatHtml = '';
      
      if(priceFormat){
        priceFormatHtml = "<span class='price-format'>"+priceFormat+" from</span>";
      }
  
  $('.step-container.program-container .program-title.step-title h5.program-item').text(programName);
  
  radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_start_date_selection' id='"+groupId+"' value='"+groupId+"' data-price-format='"+priceFormat+"' data-program-name='"+programName+"' data-price='"+price+"' data-std-price='"+price+"' checked/><label for='"+groupId+"'><div class='program-name float-left'>"+programName+" - "+programScheduleName.toUpperCase()+"</div><div class='price-container text-right float-right'>"+priceFormatHtml+"<span class='price-text'>"+priceFormatted+"</span></div></label></div>";
       
  $("#start-date-container").append(radioHtml);
  getStartDates();
  if(programCategory.indexOf('Program') !== -1){
    printDurationSelection();
  }
};
const printDurationSelection = function(){
  let dropHtml = '';
  $('#duration-weeks').empty();
  
  for(let z = 1; z < 53; z++){
    dropHtml = dropHtml + '<a href="#" class="dropdown-item" data-item="'+z+'" tabindex="0">'+z+' Weeks</a>';        
  }
  container = "<div class='select-title'><h5>Please choose the <span class='bold'>Duration</span></h5></div><div class='select-container'><div id='duration-select' class='select-option'><div class='selectBox selectDuration active'><div class='selectBox__value' data-option='duration' data-selected=''>Duration</div><div class='dropdown-menu'>"+dropHtml+"</div></div></div></div>";  
  $('#duration-weeks').html(container);
};

const getStartDates = function(){
  localStorage.removeItem("start-dates");
  let isEdit = $('input[name=quote_edit]').val(),
      programId = $('input[name=program_id_selection]').val(),
      campus = $('input[name=campus_selection]').val(),
        campusId = $('input[name=campus_id_selection]').val(),
      campusEdit = $('input[name=quote_edit_original_campus]').val(),
      programCategory = $('input[name=program_category]').val(),
      programName = $('input[name=program_selection]').val(),
      programDuration = $('input[name=program_duration]').val(),
      programNameEdit = $('input[name=quote_edit_original_program_selection]').val(),
      isYearPopulated = $('.selectYear .selectBox__value').attr('data-selected'),
      timestamp = Date.now(),
      getDates = false,
      tableId = startDateTable;
  if(programCategory.indexOf('Camps') !== -1){
        queryParam = '&program__in='+programId+'&campus__in='+campusId+'&start_dates__gt='+timestamp+'&fixed_week_duration__in='+programDuration+'&orderBy=start_dates';
  }else{
        queryParam = '&program__in='+programId+'&campus__in='+campusId+'&start_dates__gt='+timestamp+'&orderBy=start_dates';
  }
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
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
             let dataObject = data.results;
            for (let i = 0; i <dataObject.length; i++){
                  dateVal = new Date(dataObject[i].values.start_dates);
                yearVal = dateVal.getUTCFullYear();
                monthVal = dateVal.getUTCMonth() + 1;
                dayVal = dateVal.getUTCDate();

                dateArray.push({
                  year: yearVal,
                  month: monthVal,
                  day:dayVal
                });
            }
        },
        error: function() {
           console.log('No Start Dates Found');
        }
     });
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
  }
};

const resetPrintDates = function(){
  let yearVal = $('.date-container #year-select .selectBox .selectBox_value.active').attr('data-selected'),
      monthVal = $('.date-container #month-select .selectBox .selectBox_value.active').attr('data-selected');
     
      
      isEdit = $('input[name=quote_edit]').val();
  
  if(yearVal !='' && monthVal != ''){
    
    
      $(".start-date-selection-container .selectYear .selectBox__value").attr('data-selected','').text('Year');
      $(".start-date-selection-container .selectMonth").removeClass('active').addClass('disabled');     
      $(".start-date-selection-container .selectMonth .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected','').text('Start Date');
     
  
    if(isEdit === 'true'){
      $('button.next[data-step=start-date-select]').removeClass('enable').addClass('disable');
    }
  }
  resetNextButton('.start-date-selection-container');
};
const printDates = function(timeVal,dataItem,dataYear){

  let startDateArray = JSON.parse(localStorage.getItem('start-dates'));
  
  if(timeVal == 'month'){
    
    $('.date-container #month-select .selectBox .dropdown-menu').empty();
     $('.date-container #day-select .selectBox .dropdown-menu').empty();
      for(let year in startDateArray){

        if(year == dataItem){
          for(let month in startDateArray[year][0].month){
            let m = '';
            switch (month) {  
                case '1': m = 'January'; break;
                case '2': m = 'February'; break;
                case '3': m = 'March'; break;
                case '4': m = 'April'; break;
                case '5': m = 'May'; break;
                case '6': m = 'June'; break;
                case '7': m = 'July'; break;
                case '8': m = 'August'; break;
                case '9': m = 'September'; break;
                case '10': m = 'October'; break;
                case '11': m = 'November'; break;
                case '12': m = 'December'; break;
                default: break;
            }
                
              for(let i = 0; i < startDateArray[year][0].month[month].length ; i++){
                
                day = startDateArray[year][0].month[month][i].day;
                monthHtml = '<a href="#" class="dropdown-item" data-year="'+year+'"data-parent="month" data-item="'+month+'" data-day="'+day+'" tabindex="0">'+m+'&nbsp;'+day+'</a>';
                $('.date-container #month-select .selectBox .dropdown-menu').append(monthHtml);
              }
          }
        }
      }
    }else if(timeVal == 'year'){
      $('.date-container #month-select .selectBox .dropdown-menu').empty();
      $('.date-container #day-select .selectBox .dropdown-menu').empty();
      for(let year in startDateArray){
        yearHtml = '<a href="#" class="dropdown-item" data-parent="year" data-item="'+year+'" tabindex="0">'+year+'</a>';
        $('.date-container #year-select .selectBox .dropdown-menu').append(yearHtml);    

      }
    }
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
      programCategory = $('input[name=program_category]').val(),
      tableId = schoolPriceListTable,
      queryParam = '&group_code__in='+groupId+'&is_program_price__eq=1&enable__eq=1&orderBy=-price_current',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);
  let scheduleListArray = [];
  
  if(programCategory == 'Programs'){
    $.get(api_url).done(function (data) {
            let dataObject = data.objects;
            for (let i = 0; i < dataObject.length; i++){
              scheduleListArray.push({
                'priceId' : dataObject[i].id,
                  'scheduleName' : dataObject[i].values['category'].name,
                  'itemName' : dataObject[i].values.item_name,
                  'priceFormat' : dataObject[i].values.price_type,
                  'price' : dataObject[i].values.price_current,
                  'priceStandard' : dataObject[i].values.price_current,
                  'schedule' : dataObject[i].values['weeks'].name.replace(/\s/g, '').replace('Weeks','')
              });
          }
          setProgramPriceDuration(scheduleListArray);

    }).fail(function() {
          console.log('no program found');
    });
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
      xPrice = xConversion(listArray[i].price)*durationNum;
      priceRounded = xPrice.toFixed();
      xStandardPrice = xConversion(listArray[i].priceStandard)*durationNum;
      priceStandardRounded = xStandardPrice.toFixed();
      $('input[name=program_schedule_selection]').val(listArray[i].scheduleName +'+'+listArray[i].itemName);
      $('input[name=program_schedule_price_selection]').val(priceRounded);
      $('input[name=program_schedule_standard_price_selection]').val(priceStandardRounded);
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
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);

  $.ajax({
    url : api_url,
    type : "get",
    async: false,
    success : function(data) {
        let dataObject = data.results;
      
      for (let i = 0; i < dataObject.length; i++){
        
          price = parseInt(dataObject[i].values.price) * duration;       
        xPrice = xConversion(price);

        $('input[name=program_schedule_price_selection]').val(xPrice);
      }
    },
    error: function() {
      console.log('no program found');
    }
 });

  updateJsonStartDatePrice();

};
const updateStartDateSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      yearValue = $('.selectBox .selectBox__value[data-option=year]').attr('data-selected'),
      monthValue = $('.selectBox .selectBox__value[data-option=month]').attr('data-selected'),
      dayValue = $('.selectBox .selectBox__value[data-option=month]').attr('data-day-selected'),
      scheduleName = $('input[name=program_selection]').val(),
      itemName = $('input[name=program_schedule_selection]').val();
  
  startDate = yearValue+'-'+monthValue+'-'+dayValue;

  $('input[name=start_date_year]').val(yearValue);
  $('input[name=start_date_month]').val(monthValue);
  $('input[name=start_date_day]').val(dayValue);
  
  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {     
      quoteJson.quote_array[i].program.start_date = startDate;
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
        durationNum = $('input[name=program_schedule_duration_selection]').val(),
          isUnderAge = $('input[name=is_under_age]').val(),
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
        if(feeArray[i].feeType == 'Registration Fees'){     
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
        setFeeArray.push({
          'feeId': feeArray[i].feeId,
          'feeType' : feeArray[i].feeType,
          'feePrice' : feeArray[i].feePrice,
          'feeDescription' : feeArray[i].feeDescription,
          'priceType' : feeArray[i].priceType,
          'priceNotes' : feeArray[i].priceNotes
        });
      }
    }
    
    for (let i = 0; i < setFeeArray.length; i++){
      if(setFeeArray[i].feeType == 'Registration Fees'){ 
        quoteJson.quote_array[objPosition].program.registration_fee = xConversion(setFeeArray[i].feePrice);
        quoteJson.quote_array[objPosition].program.registration_description = setFeeArray[i].feeDescription;
      }
      if(setFeeArray[i].feeType == 'Material Fees') {
        let feeVal = setFeeArray[i].feePrice;
        
        if(setFeeArray[i].priceType == 'Per week'){
          if(durationNum <= 4){
            if(campus != 'Online'){
              durationNum = 1;
            }
          }
          feeVal = setFeeArray[i].feePrice * durationNum;
          if(feeVal > 320){
             feeVal = 320;
          }
         
        }
        quoteJson.quote_array[objPosition].program.material_fee = xConversion(feeVal);
       }
      if(setFeeArray[i].feeType == 'Additional Fees') {
        let addFeeVal = setFeeArray[i].feePrice;   
        quoteJson.quote_array[objPosition].program.additional_fee = xConversion(addFeeVal);
        quoteJson.quote_array[objPosition].program.additional_fee_description = setFeeArray[i].feeDescription;
      }
    }
    localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
const getOtherProgramFees = function(){
  let campus = $('input[name=campus_selection]').val(),
        campusId = $('input[name=campus_id_selection]').val(),
      programName = $('input[name=program_parent_selection]').val(),
      tableId = schoolPriceListTable,
        queryParam = '&campus_location__in='+campusId+'&category__eq=Other Program Fees&is_program_price__eq=0&programs_available__in='+programName+'&enable__eq=1&orderBy=-price_current',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam,
      feeArray = [];
  api_url = encodeURI(api_url);
  
  $.ajax({
      url : api_url,
      type : "get",
      async: false,
      success : function(data) {
           let dataObject = data.results;
        
            
          for (let i = 0; i < dataObject.length; i++){
                
              rangeVal = dataObject[i].values.weeks ? dataObject[i].values['weeks'].name.replace(/\s/g, '').replace('Weeks','') : '';
              underAge = dataObject[i].values.under_age ? true : false;

            feeArray.push({
              'feeId':  dataObject[i].values.price_code,
              'feeType' : dataObject[i].values.item_name,
              'feePrice' : dataObject[i].values.price_current,
              'feeDescription' : dataObject[i].values.price_description,
            'feeRange' : rangeVal,
              'priceType' : dataObject[i].values['new_price_type'].name,
            'underAgeFee' : underAge
            });
        }
         
          setOtherProgramFees(feeArray);
      },
      error: function() {
        console.log('no fees found');
      }
   });
};

//start Family option
$('.family-option-selection-container .family-option-selection-container .option-select.program-option').on('click','input[type=radio]',function() {
  let isFamilyAdd = $(this).val(),
      enable = false;
  
  if(isFamilyAdd == 'yes-family-option'){
    enable = true;
  }
  $('input[name=family_enable]').val(enable);
  $( ".family-option-selection-container button.next").removeClass('disable').addClass('enable');
});

const removeFamilyInfo = function(){
  let quoteNum = $('input[name=quote_number]').val() - 1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject);
      $('input[name=family_enable]').val('false');

      quoteJson.quote_array[quoteNum].accommodation.family_enable = false;
      quoteJson.quote_array[quoteNum].accommodation.family_additional_adult = 0;
      quoteJson.quote_array[quoteNum].accommodation.family_additional_child  = 0;
      quoteJson.quote_array[quoteNum].accommodation.family_additional_adult_total_price = 0;
      quoteJson.quote_array[quoteNum].accommodation.family_additional_child_total_price = 0;

      localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
} 

const redirectFamilyStep = function(){
  let programCategory = $('input[name=program_category]').val(),
      programSelection = $('input[name=program_parent_selection]').val(),
      familyAdditionalEnable = $('input[name=program_price_selection]:checked').attr('data-family-additional-enable'),
      isEdit = $('input[name=quote_edit]').val();
  
  if(familyAdditionalEnable == '1'){
    if(isEdit === 'true'){
      
      let familyEnable = $('input[name=family_enable]').val();
      
      if(familyEnable === 'true'){
        $("#yes-family-option").prop("checked", true);
      }else{
        $("#no-family-option").prop("checked", true);
      }
      
    }
 
    subText = programCategory == 'Family Camps' ? 'Make it a Family Winter Experience by adding additional family members to your adventure. Package pricing is for 1 Child. Please indicate how many additional children aged 9-17, and how many adults you would like to add.' : programSelection.includes('Junior Winter Experience') ? 'Make it a Family Winter Experience by adding additional family members to your adventure. Package pricing is for 1 Child. Please indicate how many additional children aged 9-17, and how many adults you would like to add.' : 'Please indicate how many additional children aged 9-17, and how many adults you would like to add.';

    $('#family-option-select p.sub-text-description, #family-add-select p.sub-text-description').html(subText);

    $('.quote-step-slide').slick('slickNext');
    
  }else{
    
    removeFamilyInfo();
    redirectToQuoteSummary();
    
  }

};
const redirectFamilyOptionStep = function(){
  let checkedVal = $('input[name=family_enable]').val();
  
  if(checkedVal == 'false'){        
    
    redirectToQuoteSummary();
    
  }else{
    printFamilyAdd();
  }  
};

const printFamilyAdd = function(){
    
    for( let i = 0; i < 6; i++){
      childHtml = '<a href="#" class="dropdown-item" data-parent="child" data-item="'+i+'" tabindex="0">'+i+'</a>';
      adultHtml = '<a href="#" class="dropdown-item" data-parent="adult" data-item="'+i+'" tabindex="0">'+i+'</a>';
      $('.family-option-add-selection-container #child-select .dropdown-menu').append(childHtml);
      $('.family-option-add-selection-container #adult-select .dropdown-menu').append(adultHtml); 
    }

};

const updateFamilyAddSelection = function(editNum){
  let objPosition = editNum -1,
      quoteObject = localStorage.getItem(quoteJsonName),
      quoteJson =  JSON.parse(quoteObject),
      familyEnable = $('input[name=family_enable]').val(),
      childAdd = $('input[name=family_child_additional]').val(),
      adultAdd = $('input[name=family_adult_additional]').val();
  
  if(familyEnable == 'true'){
    for (var i = 0; i < quoteJson.quote_array.length; i++) {
      if (i === objPosition) {     
        quoteJson.quote_array[i].accommodation.family_enable = !!(familyEnable);
        quoteJson.quote_array[i].accommodation.family_additional_child = parseInt(childAdd);
        quoteJson.quote_array[i].accommodation.family_additional_adult = parseInt(adultAdd);
        break;
      }
    }
    localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
  }
  
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
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
  api_url = encodeURI(api_url);
  $('#schedule-price-list-container').empty();
  let scheduleListArray = [];
  $.get(api_url).done(function (data) {
            let dataObject = data.results;
          for (let i = 0; i < dataObject.length; i++){
            scheduleListArray.push({
              'priceId' : dataObject[i].id,
                'scheduleName' : dataObject[i].values['category'].name,
                'itemName' : dataObject[i].values.item_name,
                'priceFormat' : dataObject[i].values.price_type,
                'price' : dataObject[i].values.price_current,
                'schedule' : dataObject[i].values['weeks'].name
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
      let api_price_url = apiUrl+tableMarketPriceId+'/rows?portalId='+portalId+queryPriceParam;
    api_price_url = encodeURI(api_price_url);

    $.ajax({
      url : api_price_url,
      type : "get",
      async: false,
      success : function(dataP) {
            let dataPriceObject = dataP.results;
          let priceLocal = JSON.parse(localStorage.getItem('schedule-price')) || [];
          for (let x = 0; x < dataPriceObject.length; x++){
              listArray[y].price = dataPriceObject[x].values.price;
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
  
  listArray.sort((a, b) => a.scheduleName - b.scheduleName);
  
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
  let retrievedObject = localStorage.getItem('schedule-price');
  let retrievedJson = JSON.parse(retrievedObject);
  retrievedJson.sort((a, b) => (a.price > b.price ? -1 : 1));
  let radioHtml = "";
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
  let objPosition = editNum -1;
  let quoteObject = localStorage.getItem(quoteJsonName);
  let quoteJson =  JSON.parse(quoteObject);
  scheduleSelected = $('input[name=program_schedule_selection]').val();
  schedulePriceSelected = $('input[name=program_schedule_price_selection]').val();
  scheduleStandardPriceSelected = $('input[name=program_schedule_standard_price_selection]').val();
  durationSelected = $('input[name=program_schedule_duration_selection]').val();
  totalPrice = schedulePriceSelected;
  
  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.duration = durationSelected;
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
  
  getOtherProgramFees();
  let editNum = $('input[name=quote_number]').val(),
      isFamilyEnable = $('input[name=family_enable]').val(),
      durationSelected = $('input[name=program_schedule_duration_selection]').val(),
      quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      totalAddPrice = 0;
  
  editNum = editNum - 1;
  
  if(isFamilyEnable === 'true'){
        childVal = $('input[name=family_child_additional]').val();
        adultVal = $('input[name=family_adult_additional]').val();
        addFeePrice = $('input[name=family_additional_price]').val();
          addFeePrice2 = $('input[name=family_additional_price_2]').val();
        totalChildPrice = childVal * addFeePrice;
          totalAdultPrice = adultVal * addFeePrice2;
        totalAddPrice = totalChildPrice + totalAdultPrice;
    quoteObj.quote_array[editNum].accommodation.family_additional_child =  parseInt(childVal);
    quoteObj.quote_array[editNum].accommodation.family_additional_adult =  parseInt(adultVal);
    quoteObj.quote_array[editNum].accommodation.family_additional_adult_total_price =  totalAdultPrice;
    quoteObj.quote_array[editNum].accommodation.family_additional_child_total_price =  totalChildPrice;
  }else{
    quoteObj.quote_array[editNum].program.duration = durationSelected;
  }
  
  totalAddPrice = parseInt(totalAddPrice);
  
  schedulePriceSelected = parseInt(quoteObj.quote_array[editNum].program.program_total_price);
  additionalFeeSelected = parseInt(quoteObj.quote_array[editNum].program.additional_fee);
  materialFeeSelected = parseInt(quoteObj.quote_array[editNum].program.material_fee);
  registrationFeeSelected = parseInt(quoteObj.quote_array[editNum].program.registration_fee);
  accommodationTotalSelected = parseInt(quoteObj.quote_array[editNum].accommodation.accommodation_total_price);
  airportTransferFeeSelected = parseInt(quoteObj.quote_array[editNum].accommodation.airport_transfer_total_price);
  accommodationPlacementFeeSelected = parseInt(quoteObj.quote_array[editNum].accommodation.placement_fee);


  //calculate total price
  totalPrice = schedulePriceSelected + materialFeeSelected + additionalFeeSelected + registrationFeeSelected +  accommodationTotalSelected + airportTransferFeeSelected + accommodationPlacementFeeSelected + totalAddPrice;
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
        schoolName = quoteObj.school_name;
        
    //temp exception note variables

  let exceptionStartDate = new Date('2022-11-07'),
  exceptionEndDate = new Date('2023-03-24')
  exceptionCampusArr = ['Brisbane','Melbourne','Sydney','Perth'],
  exceptionProgramSchedule = 'Full Time Programs-Morning',
  isException = false;
    
    $('#quote-selection-container').empty();
    if(quoteObj.quote_array.length >0){
        for (let i = 0; i < quoteObj.quote_array.length; i++){
            quoteNum = i+1;
            if(quoteObj.quote_array[i].quote_enabled){
                programSchoolName = quoteObj.quote_array[i].program.category,
                descriptionVal = quoteObj.quote_array[i].program.option_schedule_description;
                programDuration = quoteObj.quote_array[i].program.duration;
                programOptionSchedule = quoteObj.quote_array[i].program.option_schedule;
                priceProgramVal = parseInt(quoteObj.quote_array[i].program.program_total_price);
                priceStandardVal = parseInt(quoteObj.quote_array[i].program.program_total_standard_price);
                priceRegistrationVal = parseInt(quoteObj.quote_array[i].program.registration_fee);
                priceAdditionalVal = parseInt(quoteObj.quote_array[i].program.additional_fee);
                priceMaterialVal = parseInt(quoteObj.quote_array[i].program.material_fee);
                priceAccommodationVal = parseInt(quoteObj.quote_array[i].accommodation.accommodation_total_price);
                priceAirportVal = parseInt(quoteObj.quote_array[i].accommodation.airport_transfer_total_price);
                priceAccommodationPlacementFeeVal = parseInt(quoteObj.quote_array[i].accommodation.placement_fee);
                priceQuoteTotalVal =  parseInt(quoteObj.quote_array[i].quote_total_price);
                familyEnable =  quoteObj.quote_array[i].accommodation.family_enable;
                addChildVal =  parseInt(quoteObj.quote_array[i].accommodation.family_additional_child);
                addAdultVal =  parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult);
                addChildPrice =  parseInt(quoteObj.quote_array[i].accommodation.family_additional_child_total_price);
                addAdultPrice =  parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price);
                accommodationNoteVal = quoteObj.quote_array[i].accommodation.accommodation_note;
              
                discountVal = 0;
                discountHtml = "";
                discountTotalHtml = "";
                registrationHtml = "";
                materialHtml = "";
                includesHtml = "";
                childHtml = "";
                adultHtml = "";
                additionalHtml = "";
                accommodationHtml = "";
                accommodationNoteHtml = "";

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

                exceptionText = "From Nov 7, 2022 (session 12) to March 24, 2023 (Session 3), we charge regular price for the Full-Time Morning schedule. The price will be $440 (1-11 weeks) / $420 (12-23 weeks) / $400 (24+ weeks) per week. Please consult with your advisor or agency.";
                printExceptionHtml = isException ? "<div class='center disclaimer'><sup>**</sup>"+exceptionText+"</div>" : '';
              
                if(isException){
                  quoteObj.quote_array[i].program.program_note = exceptionText;
                }
              
                if(programDuration != ''){
                  if(programDuration == '1'){
                    weekStr = 'Week';
                  }else{
                    weekStr = 'Weeks';
                  }
                  programOptionStr = ' - ' + programOptionSchedule;
                  durationHtml = programDuration + ' ' + weekStr + programOptionStr;
                }else{
                  durationHtml = programOptionSchedule;
                }
              
                if(priceProgramVal < priceStandardVal){
                    discountVal = priceStandardVal - priceProgramVal;
                    discountHtml = "<span class='discount-txt strike discount-program-price'>"+currencyFormatter(priceStandardVal)+"</span>";
                    discountTotalHtml = "<div class='total-discount-line'><div class='item-description total-title discount-title-price'>Discount Total</div><div class='item-price'><span class='discount-txt discount-total-price'>"+currencyFormatter(-discountVal)+"</span></div></div>";
                }
     
                schoolHtml = "<div class='program-type'><span class='header'>Program</span><br><span class='result'>"+programSchoolName+"</div>";
                campusHtml = "<div class='program-type'><span class='header'>Campus</span><br><span class='result'>"+quoteObj.quote_array[i].campus+", "+quoteObj.quote_array[i].campus_country+"</div>";
                
                
                scheduleProgramHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[i].program.option_program+"</span></div><div class='item-notes'>Start: "+quoteObj.quote_array[i].program.start_date+", "+durationHtml+"</div></div><div class='item-price'>"+discountHtml+"<span class='bold program-price'>"+currencyFormatter(priceProgramVal)+"</span></div></div></div>";
                
                if(priceRegistrationVal > 0){
                  registrationHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Registration Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].program.registration_description+"</div></div><div class='item-price'><span class='bold registration-fee'>"+currencyFormatter(priceRegistrationVal)+"</span></div></div></div>";
                }
                if(priceAdditionalVal > 0){
                  additionalHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Additional Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].program.additional_fee_description+"</div></div><div class='item-price'><span class='bold additional-fee'>"+currencyFormatter(priceAdditionalVal)+"</span></div></div></div>";
                }
                if(priceMaterialVal > 0){
                  materialHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Material Fee</span></div></div><div class='item-price'><span class='bold material-fee'>"+currencyFormatter(priceMaterialVal)+"</span></div></div></div>";
                }
                if(descriptionVal != '' ){
                  includesHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>INCLUDES</span><div>"+descriptionVal+"</div></div></div></div></div>";
                }
                
                if(familyEnable){
                  if(addChildVal > 0){
                      if(addChildVal == 1){
                        childString = "Child";
                      }else{
                        childString = "Children";
                      }
                      childHtml = "<div class='quote-box'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Additional Child</span><br><ul><li>"+addChildVal+" "+childString+"</li><li>"+quoteObj.quote_array[i].program.option_schedule+"</li></ul></div></div><div class='item-price'><span class='bold child-fee'>"+currencyFormatter(addChildPrice)+"</span></div></div></div></div>";
                  }
                  if(addAdultVal > 0){
                      if(addChildVal == 1){
                        adultString = "Adult";
                      }else{
                        adultString = "Adults";
                      }
                      adultHtml = "<div class='quote-box'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Additional Adult</span><br><ul><li>"+addAdultVal+" "+adultString+"</li><li>"+quoteObj.quote_array[i].program.option_schedule+"</li></ul></div></div><div class='item-price'><span class='bold adult-fee'>"+currencyFormatter(addAdultPrice)+"</span></div></div></div></div>";
                  }
                }
              
                if(priceAccommodationVal > 0){
                  accommodationPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[i].accommodation.option_accommodation+"<br>("+quoteObj.quote_array[i].accommodation.length_of_stay+" Weeks)</span></div><div class='item-notes'>Check-in Date: "+quoteObj.quote_array[i].accommodation.check_in_date+"</div></div><div class='item-price'><span class='bold accommodation-price'>"+currencyFormatter(priceAccommodationVal)+"</span></div></div></div>";
                  airportPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Airport Transfer Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[i].accommodation.option_airport_transfer+"</div></div><div class='item-price'><span class='bold airport-fee'>"+currencyFormatter(priceAirportVal)+"</span></div></div></div>";
                  placementFeePriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Accommodation Placement Fee</span></div></div><div class='item-price'><span class='bold placement-fee'>"+currencyFormatter(priceAccommodationPlacementFeeVal)+"</span></div></div></div>";                  
                  accommodationHtml = "<div class='quote-accommodation quote-box'>"+accommodationPriceHtml+airportPriceHtml+placementFeePriceHtml+"</div>";
                }
                if(accommodationNoteVal != 'none'){
                  accommodationNoteHtml = "<div class='center disclaimer'>"+accommodationNoteVal+"</div>";
                }
                totalPriceHtml = "<div class='line-item'>"+discountTotalHtml+"<div><div class='item-description total-title bold'>TOTAL</div><div class='item-price bold total-price'>"+currencyFormatter(priceQuoteTotalVal)+"</div></div></div>";                
                quoteHTML = "<div class='col col-md-6 col-quote col-quote-"+quoteNum+"'><div class='quote-title'>Quote "+quoteNum+"</div><div class='quote-select-container'><div class='quote-items'><div class='quote-location'>"+schoolHtml+campusHtml+"</div><div class='quote-program-schedule quote-box'>"+scheduleProgramHtml+registrationHtml+additionalHtml+materialHtml+includesHtml+"</div>"+adultHtml+childHtml+accommodationHtml+printExceptionHtml+"<div class='quote-box total-price-container'>"+totalPriceHtml+"</div>"+accommodationNoteHtml+"</div><div><div class='btn-container'><button type='button' class='btn btn-orange-outline bold quote-edit' data-edit-num='"+quoteNum+"' tabindex='0'>Edit</button><button type='button' class='btn btn-orange-outline bold quote-remove' data-remove-num='"+quoteNum+"' tabindex='0'>Remove <span class='icon-remove'>&#8999;</span></button></div></div>"; 
                
                $('#quote-selection-container').append(quoteHTML);
            }else{
                quoteHTML = "<div class='col col-quote-"+quoteNum+" empty'><div class='quote-title'>Quote "+quoteNum+"</div><div class='new-quote' data-quote='"+quoteNum+"'><div class='create-icon center'><i class='fas fa-plus-circle'></i></div><h3 class='center'>Create a new quote</h3></div></div>";
              $('#quote-selection-container').append(quoteHTML);
                
            }
        }       
    }
 
  printQuoteWidth();
  setTimeout(setBoxHeight('.quote-program-schedule.quote-box'),300);
  setTimeout(setBoxHeight('.program-type'),300);
  setTimeout(setBoxHeight('.col-quote'),300);
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
                      priceAdultVal = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price) / conversionRate;
                      priceAdultVal = priceAdultVal.toFixed();
                      priceChildVal = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child_total_price) / conversionRate;
                      priceChildVal = priceChildVal.toFixed();
                      priceQuoteTotalVal =  parseInt(quoteObj.quote_array[i].quote_total_price) / conversionRate;
                      priceQuoteTotalVal = priceQuoteTotalVal.toFixed();
                      discountVal = 0;


                      if(priceProgramVal < priceStandardVal){
                        discountVal = priceStandardVal - priceProgramVal;
                        discountVal = discountVal.toFixed();
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
                      $('.col-quote-'+quoteNum+' span.child-fee').html(currencyModFormatter(priceAdultVal,toCurrency));
                      $('.col-quote-'+quoteNum+' span.adult-fee').html(currencyModFormatter(priceChildVal,toCurrency));
                      
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
    totalPrice = parseInt(quoteObj.quote_array[i].quote_total_price) / conversionRate;
    totalPrice = totalPrice.toFixed();
    
    accommodationEnable = quoteObj.quote_array[i].accommodation.accommodation_enable;
    familyEnable = quoteObj.quote_array[i].accommodation.family_enable;

    familyAdultAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult);
    familyChildAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child);
    familyChildPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child_total_price);
    familyAdultPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price);
     
    showFamilyChildAdd = 'none';
    showFamilyAdultAdd = 'none';
     
    if(familyEnable){
      if(familyChildAddEnable > 0){
        showFamilyChildAdd = 'table-block';
      }
      if(familyAdultAddEnable > 0){
        showFamilyAdultAdd = 'table-block';
      }
    }
    
    discountPrice = 0;
    showDiscount = 'none';
    if(programTotalStandardPriceInt > programTotalPriceInt){
      discountPrice = programTotalStandardPrice - programTotalPrice;
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
          "name": "quote_program_school_selection",
          "value": quoteObj.quote_array[i].program.category
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
          "value": quoteObj.quote_array[i].program.additional_fee_description
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
           "value": quoteObj.quote_array[i].accommodation.accommodation_note_plain
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
          "value":'none'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_promo_code_show",
          "value":'none'
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
          "name": "quote_"+quoteNum+"_program_description",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_"+quoteNum+"_program_schedule_selection",
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
          "name": "quote_"+quoteNum+"_program_registration_description",
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
          "name": "quote_"+quoteNum+"_promo_code_show",
          "value":'none'
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
      "pageUri" : "www.ilsc.com/quote/language-schools/programs",
      "pageName" : "ILSC Price Quote"
    },
    "legalConsentOptions" :{
      "consent": { // Include this object when GDPR options are enabled
        "consentToProcess": true,
        "text": "I agree to allow ILSC to store and process my personal data.",
      }
    }
  };
  
  
  $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(formArray), 
      success: function(data) {
        location.href='/price-quote/email-confirmation';
      },
      contentType: "application/json",
      dataType: 'json'
    });
};


$(document).ready(function(){
  
   slickCarousel();
   setQuoteNumber();
   setCountryOrigin();
   initiateLocalJson();
  
  $( function() {
          $( "#datepicker" ).datepicker(
            {
                minDate: 0,
                dateFormat: 'yy-mm-dd',
                beforeShowDay: function(date){
                  if(date.getDay() == 6 || date.getDay() == 0){
                        return [true];
                    } else {
                        return [false];
                    }
                }
            }
          );
        });
  
 });