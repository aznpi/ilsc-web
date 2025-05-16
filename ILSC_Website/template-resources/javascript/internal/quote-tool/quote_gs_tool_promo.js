//start step logic
const updateLocalJson = function (dataStep, editNum) {

  if (dataStep == 'campus-select') {
    updateCampusSelection(editNum);
    getProgramsList();
    setMarketPriceCode();
    printProgramAreaTitle();


  } else if (dataStep == 'program-select') {
    updateProgramSelection(editNum);
    getProgramsPriceList();
    printProgramHeaderTitle();


  } else if (dataStep == 'program-price-select') {
    updateProgramSelectionTotalPrice();
    printStartDateSelection();

  } else if (dataStep == 'start-date-select') {
    updateStartDateSelection(editNum);
    redirectAccomodationStep();

  } else if (dataStep == 'accommodation-option-select') {
    redirectAccomodationOptionStep();

  } else if (dataStep == 'accommodation-age-option-select') {
    printAccomodationForm();

  } else if (dataStep == 'accommodation-select') {
    setAccommodationGroup();
    updateStartDateSelection(editNum);
    getPromo('Automatic');
    setTimeout(setTotalPrice, 300);
    setTimeout(printQuotesHTML, 500);
  }

  //setTimeout($('.quote-step-slide').slick('reinit'),500);
};


//Step Campus Selection

const updateCampusSelection = function (editNum) {
  let objPosition = editNum - 1,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
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

const resetCampusSelect = function () {
  $(".campus-selection-container button.campus-select").each(function () {
    countryVar = $(this).attr('data-country');
    $(this).attr('data-selected', false).attr('data-selected-campus', '');
    $(this).find('span.selected-text').text(countryVar);
  });
};

const disableCampusDrop = function () {
  $(".campus-selection-container button.campus-select").each(function () {
    $(this).removeAttr('style');
    selectedVar = $(this).attr('data-selected');
    if (selectedVar == 'false') {
      $(this).css('color', '#CCC');
    }

  });
  $(".campus-selection-container button.next").removeClass('disable').addClass('enable');
};

$(".campus-selection-container .dropdown-menu li.campus-name").on("click", function () {
  let getValue = $(this).text(),
    getCountryValue = $(this).parent().siblings("button.campus-select").attr('data-selected', true).attr('data-country'),
    getCampusCurrency = $(this).attr('data-campus-currency');
  resetCampusSelect();
  $(this).parent().siblings("button.campus-select").attr('data-selected', true).attr('data-selected-campus', getCountryValue);
  $(this).parent().siblings("button.campus-select").attr('data-selected', true).attr('data-program-area', getValue);
  $(this).parent().siblings("button.campus-select").attr('data-selected', true).attr('data-selected-campus-currency', getCampusCurrency);
  $('input[name=program_school_selection]').val(getValue);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $(this).parent().siblings("button.campus-select").find('span.selected-text').text(getValue);
  disableCampusDrop();
  $("#program-list-container").empty();
  $("#program-coop-list-container").empty();
  getExchangeRate();

});

$(".campus-selection-container .dropdown button.direct-link").on("click", function () {
  let getValue = $(this).find('span.selected-text').text(),
    getCountryValue = $(this).attr('data-country'),
    getCampusCurrency = $(this).attr('data-selected-campus-currency');
  resetCampusSelect();
  $(this).attr('data-selected', 'true').attr('data-selected-campus', getValue);
  $('input[name=campus_country_selection]').val(getCountryValue);
  $('input[name=destination_currency_selection]').val(getCampusCurrency);
  $('input[name=campus_selection]').val(getValue);
  disableCampusDrop();
  $("#program-list-container").empty();
  resetNextButton('.program-list-selection-container');
  getExchangeRate();
});

//Step Program Selection
$('#program-list-container,#program-coop-list-container').on('click', 'input[type=radio]', function () {
  let getValue = $(this).val(),
    getId = $(this).attr('data-id'),
    getDescription = $(this).attr('data-description'),
    isCoop = $(this).attr('data-is-coop');

  $('input[name=program_description_selection]').val(getDescription);
  $('input[name=program_is_coop]').val(isCoop);
  $('input[name=program_selection]').val(getValue);
  $('input[name=program_id_selection]').val(getId);
  $(".program-list-selection-container button.next").removeClass('disable').addClass('enable');
});

//API get Programs List
const getProgramsList = function () {
  let isEdit = $('input[name=quote_edit]').val(),
    isEditProgramName = $('input[name=quote_edit_original_program_selection]').val(),
    countryName = $('input[name=campus_country_selection]').val(),
    schoolName = $('input[name=school_selection]').val(),
    programName = $('input[name=program_school_selection]').val(),
    tableId = schoolProgramListTable,
    queryParam = '&program_areas__in=' + programName + '&show_quote_tool__eq=1&country__in=' + countryName + '&is_parent_program__eq=1&is_co_op__neq=1&sort=program_name',
    queryParamCoop = '&program_areas__in=' + programName + '&show_quote_tool__eq=1&country__in=' + countryName + '&is_co_op__eq=1&sort=program_name',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam,
    api_url_coop = apiUrl + tableId + '/rows?portalId=' + portalId + queryParamCoop;

  api_url = encodeURI(api_url);
  api_url_coop = encodeURI(api_url_coop);

  if ($('#program-list-container').children().length == 0) {
    // jQuery cross domain ajax
    $.get(api_url).done(function (data) {
      let dataObject = data.results.filter((elem, index) => data.results.findIndex(obj => obj.values['parent_program_code'][0].id === elem.values['parent_program_code'][0].id) === index),
        radioHtml = '';

      if (dataObject.length > 0) {
        for (let i = 0; i < dataObject.length; i++) {
          let selectEdit = '';
          programName = dataObject[i].values.program_name;
          programDescription = dataObject[i].values.short_description;
          programDescription = programDescription ? programDescription.replace(/['\u2019]/g, "&rsquo;") : '';
          programId = dataObject[i].values['parent_program_code'][0].id;

          if (isEdit === 'true') {
            if (programName == isEditProgramName) {
              selectEdit = 'checked';
              $('#program-list-container .program-option input[value="' + programName + '"]').click();
            }
          }

          radioHtml = radioHtml + "<div class='program-option'><input type='radio' autocomplete='off' class='program-radio' name='program_radio_selection' data-id='" + programId + "' id='" + programId + "' data-is-coop='false' data-description='" + programDescription + "' value='" + programName + "' " + selectEdit + "/><label for='" + programId + "'>" + programName + "</label></div>";


          if (isEdit === 'true') {
            if (programName == isEditProgramName) {
              $('#program-list-container .program-option input[value="' + programName + '"]').click();
            }
          }
        }

        $("#program-list-container").html('<h3 class="title text-center">ACADEMIC PROGRAMS</h3>' + radioHtml);

      } else {
        radioHtml = "<div class='text-center'><h3>ACADEMIC PROGRAMS</h3><h4>No Programs Available at this time.</h4></div>";
        $("#program-list-container").html(radioHtml);
      }


    }).fail(function () {
      radioHtml = "<div class='text-center'><h3>ACADEMIC PROGRAMS</h3><h4>No Programs Available at this time.</h4></div>";
      $("#program-list-container").html(radioHtml);
    });



    // jQuery cross domain ajax
    $.get(api_url_coop).done(function (data) {
      let dataObject = data.results.filter((elem, index) => data.results.findIndex(obj => obj.values['parent_program_code'][0].id === elem.values['parent_program_code'][0].id) === index),
        radioHtml = '';

      if (dataObject.length > 0) {
        for (let i = 0; i < dataObject.length; i++) {
          let selectEdit = '';
          programName = dataObject[i].values.program_name;
          programDescription = dataObject[i].values.short_description;
          if (programDescription) {
            programDescription = programDescription.replace(/"/g, '\\"').replace(/'/g, '\'');
          } else {
            programDescription = "";
          }
          programDescription = programDescription.replace(/['\u2019]/g, "&rsquo;");
          programId = dataObject[i].values['parent_program_code'][0].id;

          if (isEdit === 'true') {
            if (programName == isEditProgramName) {
              selectEdit = 'checked';
              $('#program-coop-list-container .program-option input[value="' + programName + '"]').click();
            }
          }

          radioHtml = radioHtml + "<div class='program-option'><input type='radio' autocomplete='off' class='program-radio' name='program_radio_selection' data-id=" + programId + " id='" + programId + "-COOP' data-is-coop='true' data-description='" + programDescription + "' value='" + programName + "' " + selectEdit + "/><label for='" + programId + "-COOP'>" + programName + "</label></div>";

          if (isEdit === 'true') {
            if (programName == isEditProgramName) {
              $('#program-coop-list-container .program-option input[value="' + programName + '"]').click();
            }
          }
        }
        $("#program-coop-list-container").html('<h3 class="title text-center">CO-OP PROGRAMS</h3>' + radioHtml).show();
      } else {

        $("#program-coop-list-container").empty().hide();
      }


    }).fail(function () {
      radioHtml = "<div class='text-center'><h3>CO-OP PROGRAMS</h3><h4>No Programs Available at this time.</h4></div>";
      $("#program-coop-list-container").html(radioHtml);
    });

    resetNextButton('.program-list-selection-container');
  }

};
const updateProgramSelection = function (editNum) {
  let objPosition = editNum - 1,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    programSelected = $('input[name=program_selection]').val(),
    programIdSelected = $('input[name=program_id_selection]').val(),
    programSchoolSelected = $('input[name=program_school_selection]').val(),
    isCoop = $('input[name=program_is_coop]').val(),
    coopStr = '';

  if (isCoop == 'true') {
    coopStr = ' + Co-Op';
  }


  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program_school_name = programSchoolSelected + coopStr;
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

$('#program-list-container,#program-coop-list-container').on('click', 'input[type=radio]', function () {
  $('#program-price-list-container').empty();
});

//set Program Lowest Price List
$('#program-price-list-container').on('click', 'input[type=radio]', function () {
  $(".program-price-list-selection-container button.next").removeClass('disable').addClass('enable');
});

// print Program Header Title
const printProgramAreaTitle = function () {
  let programTitle = $('input[name=program_school_selection]').val();

  $('.program-list-selection-container.step-container.program-container .program-title.step-title h3').text(programTitle);
};
const printProgramHeaderTitle = function () {
  let programTitle = $('input[name=program_selection]').val(),
    programDesc = $('input[name=program_description_selection]').val();

  $('.program-price-list-selection-container.step-container.program-container .program-title.step-title h3, .start-date-selection-container.step-container.program-container .program-title.step-title h3').text(programTitle);
  $('.program-price-list-selection-container.step-container.program-container .program-title.step-title .p-class').html(programDesc);
};
//get Programs Price List
//API get Programs Price List
const getProgramsPriceList = function () {
  let isEdit = $('input[name=quote_edit]').val(),
    marketPriceCode = $('input[name=market_price_code]').val(),
    marketPriceId = $('input[name=market_price_id]').val(),
    programId = $('input[name=program_id_selection]').val(),
    campusName = $('input[name=campus_selection]').val(),
    isCoop = $('input[name=program_is_coop]').val(),
    campusCountryName = $('input[name=campus_country_selection]').val(),
    tableId = schoolPriceListTable,
    marketTableId = schoolMarketPriceListTable,
    campusTableId = '5266068';

  if (isEdit === 'true') {
    $('#program-price-list-container').empty();
  }

  if (isCoop === 'true') {
    isCoop = 1;
  } else {
    isCoop = 0;
  }

  queryParam1 = '&country__in=' + campusCountryName + '&parent_program_code__in=' + programId + '&enable__eq=1&is_co_op__eq=' + isCoop + '&sort=price_current',
    api_url_1 = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam1,
    queryParam2 = '&parent_program_code__in=' + programId + '&market_region__in=' + marketPriceId + '&is_co_op__eq=' + isCoop,
    api_url_2 = apiUrl + marketTableId + '/rows?portalId=' + portalId + queryParam2,
    queryParam3 = '&schools__in=81771084433',
    api_url_3 = apiUrl + campusTableId + '/rows?portalId=' + portalId + queryParam3,
    programPriceArray = [],
    objects = [];

  api_url_1 = encodeURI(api_url_1);
  api_url_2 = encodeURI(api_url_2);
  api_url_3 = encodeURI(api_url_3);


  if ($('#program-price-list-container').children().length == 0) {

    $.when(
      // Get the HTML
      $.getJSON(api_url_1, function (data1) {
        dataObject1 = data1.results;
        dataObject1 = dataObject1.flat();

      }),
      $.getJSON(api_url_2, function (data2) {
        dataObject2 = data2.results;
        dataObject2 = dataObject2.flat();
      }),
      $.getJSON(api_url_3, function (data3) {
        dataObject3 = data3.results;
        dataObject3 = dataObject3.flat();
      })


    ).then(function () {
      let campusPriceArray = [];

      if (dataObject2.length > 0) {
        programPriceArray = dataObject1.map(std => ({
          program_id: std.values['program_code'][0].id,
          program_name: std.values.program_name,
          program_schedule: std.values.schedule,
          standard_price: std.values.price_current,
          price_id: std.values.price_code,
          price: std.values.price_current,
          material_fee: std.values.material_fee,
          campus: std.values.campus_new,
          campusId: std.values.campus_new,
          group_id: std.values['parent_program_code'][0].id,
          market_price: dataObject2.filter(mark => mark.values['price_list_code'][0].id === std.id)
        }));


        for (let i = 0; i < programPriceArray.length; i++) {

          for (let x = 0; x < programPriceArray[i].campus.length; x++) {

            if (programPriceArray[i].market_price.length > 0) {
              marketPrice = programPriceArray[i].market_price[0].values.price;
            } else {
              marketPrice = programPriceArray[i].price;
            }
            campusArr = dataObject3.filter(c => c.id === programPriceArray[i].campusId[x].id);


            if (campusArr.length > 0) {
              campusPriceArray.push({
                program_id: programPriceArray[i].program_id,
                schedule_name: programPriceArray[i].program_name,
                item_name: programPriceArray[i].program_schedule,
                price_id: programPriceArray[i].price_id,
                price: programPriceArray[i].price,
                material_fee: programPriceArray[i].material_fee,
                group_id: programPriceArray[i].group_id,
                campus: campusArr[0].values.name,
                campusId: campusArr[0].id,
                market_price: marketPrice
              });
            }
          }
        }
      } else {

        programPriceArray = dataObject1.map(std => ({
          program_id: std.values['program_code'][0].id,
          program_name: std.values['program_name'],
          program_schedule: std.values.schedule,
          standard_price: std.values.price_current,
          price_id: std.values.price_code,
          price: std.values.price_current,
          material_fee: std.values.material_fee,
          campus: std.values.campus_new,
          campusId: std.values.campus_new,
          group_id: std.values['parent_program_code'][0].id
        }));

        for (let i = 0; i < programPriceArray.length; i++) {

          for (let x = 0; x < programPriceArray[i].campus.length; x++) {

            campusArr = dataObject3.filter(c => c.id === programPriceArray[i].campusId[x].id);

            if (campusArr.length > 0) {
              campusPriceArray.push({
                program_id: programPriceArray[i].program_id,
                schedule_name: programPriceArray[i].program_name,
                item_name: programPriceArray[i].program_schedule,
                price_id: programPriceArray[i].price_id,
                price: programPriceArray[i].price,
                material_fee: programPriceArray[i].material_fee,
                group_id: programPriceArray[i].group_id,
                campus: campusArr[0].values.name,
                campusId: campusArr[0].id,
                market_price: programPriceArray[i].price
              });
            }
          }
        }

      }

      let programPriceGroupedByGroupCampus = groupBy(campusPriceArray, 'campusId'),
        groupArray = new Object();
      groupArray = programPriceGroupedByGroupCampus;

      const keys = Object.keys(groupArray);

      let values = Object.values(groupArray);

      if (values.length > 0) {
        printStandardPriceProgramList(values);
      } else {
        radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
        $("#program-price-list-container").append(radioHtml);
      }

    }).fail(function () {
      radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
      $("#program-price-list-container").append(radioHtml);
    });
  }

};

const printStandardPriceProgramList = function (listArray) {
  let isEdit = $('input[name=quote_edit]').val(),
    selectedGroupId = $('input[name=quote_edit_original_program_schedule_selection]').val(),
    isCheckedArr = [];

  if (listArray.length > 0) {

    listArray.sort(function (a, b) {
      var textA = a[0].campus.toUpperCase();
      var textB = b[0].campus.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    for (let i = 0; i < listArray.length; i++) {
      let campusName = listArray[i][0].campus,
        campusId = listArray[i][0].campusId;
      campusHtml = "<h4 class='title text-center'>" + campusName + "</h4>";
      $("#program-price-list-container").append(campusHtml);

      for (let x = 0; x < listArray[i].length; x++) {
        let selectEdit = '';

        marketPrice = 0;
        marketPriceVal = 0;
        if (listArray[i][x].market_price != undefined) {
          marketPriceVal = listArray[i][x].market_price;
          marketPriceConversion = parseInt(xConversion(marketPriceVal));
          marketPrice = currencyFormatter(marketPriceConversion);
        }
        price = listArray[i][x].price;
        scheduleName = listArray[i][x].schedule_name;
        itemName = listArray[i][x].item_name;
        priceConversion = round(xConversion(price), 1).toFixed(2);
        price = currencyFormatter(priceConversion);
        materialFee = round(xConversion(listArray[i][x].material_fee), 1).toFixed(2);
        scheduleId = listArray[i][x].program_id;
        groupId = listArray[i][x].group_id;
        if (isEdit === 'true') {
          if (selectedGroupId == scheduleId) {
            selectEdit = 'checked';
            isCheckedArr.push('checked');
          }
        }

        if (marketPriceConversion < priceConversion) {
          radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='" + scheduleId + "-" + campusName + "' value='" + scheduleId + "' data-campus='" + campusName + "' data-campus-id='" + campusId + "' data-program-name='" + scheduleName + "' data-item-name='" + itemName + "' data-material-fee='" + materialFee + "' data-std-price='" + priceConversion + "' data-price='" + marketPriceConversion + "' " + selectEdit + "/><label for='" + scheduleId + "-" + campusName + "'><div class='program-name float-left'>" + scheduleName + " - " + itemName.toUpperCase() + "</div><div class='price-container text-right float-right'><span class='discount-txt strike'>" + price + "</span><span class='price-text'>" + marketPrice + "</span></div></label></div>";
        } else {
          radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_price_selection' id='" + scheduleId + "-" + campusName + "' value='" + scheduleId + "' data-campus='" + campusName + "' data-campus-id='" + campusId + "' data-program-name='" + scheduleName + "' data-item-name='" + itemName + "' data-material-fee='" + materialFee + "' data-std-price='" + priceConversion + "' data-price='" + priceConversion + "' " + selectEdit + "/><label for='" + scheduleId + "-" + campusName + "'><div class='program-name float-left'>" + scheduleName + " - " + itemName.toUpperCase() + "</div><div class='price-container text-right float-right'><span class='price-text'>" + price + "</span></div></label></div>";
        }
        $("#program-price-list-container").append(radioHtml);
      }

    }

  } else {
    radioHtml = "<div class='text-center'><h3>No Classes for this Program Available at this time.</h3></div>";
    $("#program-price-list-container").append(radioHtml);

  }

  if (isEdit === 'true') {
    if (isCheckedArr.indexOf('checked') !== -1) {
      enableNextButton('.program-price-list-selection-container');
    } else {
      resetNextButton('.program-price-list-selection-container');
    }
  } else {
    resetNextButton('.program-price-list-selection-container');
  }


  $('#program-price-list-container >div.program-option').click(function () {
    let campusSelected = $('input[name=program_price_selection]', this).attr('data-campus'),
      campusIdSelected = $('input[name=program_price_selection]', this).attr('data-campus-id'),
      programId = $('input[name=program_price_selection]', this).val(),
      stdPrice = $('input[name=program_price_selection]', this).attr('data-std-price'),
      price = $('input[name=program_price_selection]', this).attr('data-price'),
      programName = $('input[name=program_price_selection]', this).attr('data-program-name'),
      itemName = $('input[name=program_price_selection]', this).attr('data-item-name'),
      materialFee = $('input[name=program_price_selection]', this).attr('data-material-fee');


    $('input[name=campus_selection]').val(campusSelected);
    $('input[name=campus_id_selection]').val(campusIdSelected);
    $('input[name=program_selection]').val(programName);
    $('input[name=program_schedule_price_id_selection]').val(programId);
    $('input[name=program_schedule_selection]').val(itemName);
    $('input[name=program_schedule_price_selection]').val(price);
    $('input[name=program_schedule_standard_price_selection]').val(stdPrice);
    $('input[name=program_schedule_material_fee_selection]').val(materialFee);
  });
};

const updateProgramSelectionTotalPrice = function () {
  let editNum = $('input[name=quote_number]').val(),
    objPosition = editNum - 1,
    programTotalPrice = $('input[name=program_schedule_price_selection]').val(),
    programStandardPrice = $('input[name=program_schedule_standard_price_selection]').val(),
    programMaterialFee = $('input[name=program_schedule_material_fee_selection]').val(),
    programOptionSchedule = $('input[name=program_schedule_selection]').val(),
    campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject);

  quoteJson.quote_array[objPosition].campus = campus;
  quoteJson.quote_array[objPosition].campus_id = campusId;
  quoteJson.quote_array[objPosition].program.material_fee = programMaterialFee;
  quoteJson.quote_array[objPosition].program.option_schedule = programOptionSchedule;
  quoteJson.quote_array[objPosition].program.program_total_price = programTotalPrice;
  quoteJson.quote_array[objPosition].program.program_total_standard_price = programStandardPrice;

  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};

$('#program-price-list-container').on('click', 'input[type=radio]', function () {
  resetPrintDates();
});

// Step Start Date
// Start Date Dropdown validation
const dateDropValidation = function (className) {
  parentClass = $(className).parent().parent().find(".selectBox__value");
  optionVal = $(className).attr('data-item');
  currentVal = parentClass.attr('data-selected');
  currentOption = parentClass.attr('data-option');

  if (currentVal != optionVal) {
    if (currentOption == 'month') {
      if ($(".start-date-selection-container .selectDay").hasClass('active')) {
        $(".start-date-selection-container .selectDay").removeClass('show');
        $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected', '').text('Day');
      } else {
        $(".start-date-selection-container .selectDay").addClass('active').removeClass('disabled');
      }
    } else if (currentOption == 'year') {
      if ($(".start-date-selection-container .selectMonth").hasClass('active')) {
        $(".start-date-selection-container .selectMonth").removeClass('show');
        $(".start-date-selection-container .selectMonth .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected', '').text('Month');
      } else {
        $(".start-date-selection-container .selectMonth").addClass('active').removeClass('disabled');
      }
      if ($(".start-date-selection-container .selectDay").hasClass('active')) {
        $(".start-date-selection-container .selectDay").removeClass('show').removeClass('active').addClass('disabled');
        $(".start-date-selection-container .selectDay .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected', '').text('Day');
      }
    }
  }
};

$(document).on("click", ".start-date-selection-container .select-container .selectBox.active", function (e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target,
    container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  container.attr('data-selected', $(dropdownItem).attr('data-item'));
  if ($(this).hasClass('selectMonth')) {
    container.attr('data-day-selected', $(dropdownItem).attr('data-day'));
  }
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

  let yearValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=year]').attr('data-selected'),
    monthValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=month]').attr('data-selected'),
    dayValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=day]').attr('data-selected'),
    durationValue = $('.start-date-selection-container .selectBox .selectBox__value[data-option=duration]').attr('data-selected');

  if (yearValue != '' && monthValue != '' && dayValue != '' && durationValue != '') {
    $(".start-date-selection-container button.next").removeClass('disable').addClass('enable');
  } else {
    resetNextButton('.start-date-selection-container');
  }

});
$(document).on("click", ".accommodation-price-selection-container .select-container .selectBox.active", function (e) {
  $(this).toggleClass("show");
  let dropdownItem = e.target;
  let container = $(this).find("input.selectBox__value");
  container.val(dropdownItem.text);
  container.attr('data-selected', $(dropdownItem).attr('data-item'));
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");

});


$(document).on("click", ".start-date-selection-container .select-container .selectBox.active .dropdown-item", function (e) {
  e.preventDefault();
  dateDropValidation(this);
  dataParentVal = $(this).attr('data-parent');
  dataVal = $(this).attr('data-item');
  if (dataParentVal == 'year') {
    setTimeout(printDates('month', dataVal), 10000);
  }
});

// Print Start Date Selection
const printStartDateSelection = function () {
  $("#start-date-container").empty();
  $('.date-container .selectBox').removeClass('show');
  let groupId = $('input[name=program_schedule_price_id_selection]').val(),
    programScheduleName = $('input[name=program_schedule_selection]').val()
  programName = $('input[name=program_selection]').val(),
    stdPrice = parseFloat($('input[name=program_schedule_standard_price_selection]').val()),
    mktPrice = parseFloat($('input[name=program_schedule_price_selection]').val());
  if (mktPrice != 0) {
    price = mktPrice;
  } else {
    price = stdPrice;
  }
  stdPriceFormatted = currencyFormatter(stdPrice);
  priceFormatted = currencyFormatter(price);


  if (mktPrice < stdPrice) {
    radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_start_date_selection' id='" + groupId + "' value='" + groupId + "' data-program-name='" + programName + "' data-price='" + price + "' checked/><label for='" + groupId + "'><div class='program-name float-left'>" + programName + " - " + programScheduleName.toUpperCase() + "</div><div class='price-container text-right float-right'><span class='discount-txt strike'>" + stdPriceFormatted + "</span><span class='price-text'>" + priceFormatted + "</span></div></label></div>";
  } else {
    radioHtml = "<div class='program-option'><input type='radio' autocomplete='off' class='program-option' name='program_start_date_selection' id='" + groupId + "' value='" + groupId + "' data-program-name='" + programName + "' data-price='" + price + "' checked/><label for='" + groupId + "'><div class='program-name float-left'>" + programName + " - " + programScheduleName.toUpperCase() + "</div><div class='price-container text-right float-right'><span class='price-text'>" + priceFormatted + "</span></div></label></div>";
  }
  $("#start-date-container").append(radioHtml);
  getStartDates();
  //printDurationSelection();
};
const printDurationSelection = function () {
  let className = $('.start-date-selection-container .date-container #duration-select .selectDuration .dropdown-menu');
  className.empty();
  for (let z = 1; z < 53; z++) {
    htmlOption = '<a href="#" class="dropdown-item" data-item="' + z + '" tabindex="0">' + z + ' Weeks</a>';
    className.append(htmlOption);
  }
};
const getStartDates = function () {

  let isEdit = $('input[name=quote_edit]').val(),
    programId = $('input[name=program_schedule_price_id_selection]').val(),
    campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    campusEdit = $('input[name=quote_edit_original_campus]').val(),
    programNameEdit = $('input[name=quote_edit_original_program_selection]').val(),
    isYearPopulated = $('.selectYear .selectBox__value').attr('data-selected'),
    programName = $('input[name=program_selection]').val(),
    timestamp = Date.now(),
    getDates = false,
    tableId = startDateTable,
    queryParam = '&program__in=' + programId + '&campus__in=' + campusId + '&start_dates__gt=' + timestamp + '&sort=start_dates',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);

  if (isEdit === 'true') {
    if (programName != programNameEdit) {
      getDates = true;
      localStorage.removeItem("start-dates");
    } else if (campus != campusEdit) {
      getDates = true;
      localStorage.removeItem("start-dates");
    }
  } else {
    if (!isYearPopulated) {
      getDates = true;
      localStorage.removeItem("start-dates");
    }
  }

  if (getDates) {
    resetPrintDates();
    let dateArray = [];
    $.ajax({
      url: api_url,
      type: "get",
      async: false,
      success: function (data) {
        let dataObject = data.results;
        for (let i = 0; i < dataObject.length; i++) {
          dateVal = new Date(dataObject[i].values.start_dates);
          yearVal = dateVal.getUTCFullYear();
          monthVal = dateVal.getUTCMonth() + 1;
          dayVal = dateVal.getUTCDate();

          dateArray.push({
            year: yearVal,
            month: monthVal,
            day: dayVal
          });
        }
      },
      error: function () {
        console.log('No Start Dates Found');
      }
    });
    let yearArray = groupBy(dateArray, 'year');
    let yearMonthArray = [];
    for (let year in yearArray) {
      monthArray = groupBy(yearArray[year], 'month');
      yearMonthArray.push({
        year: year,
        month: monthArray
      });
    }
    localStorage.setItem('start-dates', JSON.stringify(groupBy(yearMonthArray, 'year')));
    $('.date-container #year-select .selectBox .dropdown-menu').empty();
    printDates('year');
  }
};

const resetPrintDates = function () {
  let yearVal = $('.date-container #year-select .selectBox .selectBox_value.active').attr('data-selected'),
    monthVal = $('.date-container #month-select .selectBox .selectBox_value.active').attr('data-selected');


  isEdit = $('input[name=quote_edit]').val();

  if (yearVal != '' && monthVal != '') {


    $(".start-date-selection-container .selectYear .selectBox__value").attr('data-selected', '').text('Year');
    $(".start-date-selection-container .selectMonth").removeClass('active').addClass('disabled');
    $(".start-date-selection-container .selectMonth .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected', '').text('Start Date');


    if (isEdit === 'true') {
      $('button.next[data-step=start-date-select]').removeClass('enable').addClass('disable');
    }
  }
  resetNextButton('.start-date-selection-container');
};
const printDates = function (timeVal, dataItem, dataYear) {

  let startDateArray = JSON.parse(localStorage.getItem('start-dates'));

  if (Object.keys(startDateArray).length > 0) {
    $('.program-price-list.radio-container.date-container').show();
    $('.start-date-selection-container.program-container .no-start-dates').remove();

    if (timeVal == 'month') {

      $('.date-container #month-select .selectBox .dropdown-menu').empty();
      $('.date-container #day-select .selectBox .dropdown-menu').empty();

      for (let year in startDateArray) {

        if (year == dataItem) {

          for (let month in startDateArray[year][0].month) {
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

            for (let i = 0; i < startDateArray[year][0].month[month].length; i++) {

              day = startDateArray[year][0].month[month][i].day;
              monthHtml = '<a href="#" class="dropdown-item" data-year="' + year + '"data-parent="month" data-item="' + month + '" data-day="' + day + '" tabindex="0">' + m + '&nbsp;' + day + '</a>';
              $('.date-container #month-select .selectBox .dropdown-menu').append(monthHtml);
            }


          }
        }
      }
    } else if (timeVal == 'year') {
      $('.date-container #month-select .selectBox .dropdown-menu').empty();
      $('.date-container #day-select .selectBox .dropdown-menu').empty();
      for (let year in startDateArray) {
        yearHtml = '<a href="#" class="dropdown-item" data-parent="year" data-item="' + year + '" tabindex="0">' + year + '</a>';
        $('.date-container #year-select .selectBox .dropdown-menu').append(yearHtml);
      }
    }

  } else {
    $('.program-price-list.radio-container.date-container').hide();
    if ($('.start-date-selection-container.program-container .no-start-dates').length == 0) {
      $('.start-date-selection-container.program-container').append('<h4 class="center no-start-dates">No Start Dates Available</h4>');
    }
  }
};

const updateJsonStartDatePrice = function () {
  let editNum = $('input[name=quote_number]').val(),
    objPosition = editNum - 1,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject);
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
const getProgramPriceDuration = function () {
  let groupId = $('input[name=program_start_date_selection]').val(),
    tableId = schoolPriceListTable,
    queryParam = '&group_code__in=' + groupId + '&is_program_price__eq=1&enable__eq=1&sort=-price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);
  let scheduleListArray = [];

  $.get(api_url).done(function (data) {
    let dataObject = data.results;
    for (let i = 0; i < dataObject.length; i++) {
      scheduleListArray.push({
        'priceId': dataObject[i].id,
        'scheduleName': dataObject[i].values.program_name,
        'itemName': dataObject[i].values.item_name,
        'priceFormat': dataObject[i].values.price_type,
        'price': dataObject[i].values.price_current,
        'priceStandard': dataObject[i].values.price_current,
        'schedule': dataObject[i].values['schedule'].name.replace(/\s/g, '').replace('Weeks', '')
      });
    }
    setProgramPriceDuration(scheduleListArray);

  }).fail(function () {
    console.log('no program found');
  });
};

const updateStartDateSelection = function (editNum) {
  let objPosition = editNum - 1,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    yearValue = $('.selectBox .selectBox__value[data-option=year]').attr('data-selected'),
    monthValue = $('.selectBox .selectBox__value[data-option=month]').attr('data-selected'),
    dayValue = $('.selectBox .selectBox__value[data-option=month]').attr('data-day-selected'),
    scheduleName = $('input[name=program_selection]').val(),
    priceId = $('input[name=program_schedule_price_id_selection]').val(),
    groupId = $('input[name=program_schedule_group_id_selection]').val(),
    itemName = $('input[name=program_schedule_selection]').val();

  startDate = yearValue + '-' + monthValue + '-' + dayValue;

  $('input[name=start_date_year]').val(yearValue);
  $('input[name=start_date_month]').val(monthValue);
  $('input[name=start_date_day]').val(dayValue);

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.start_date = startDate;
      quoteJson.quote_array[i].program.program_price_id = priceId;
      quoteJson.quote_array[i].program.group_id = groupId;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};
// End Start Date
const setOtherProgramFees = function (feeArray) {
  let editNum = $('input[name=quote_number]').val(),
    objPosition = editNum - 1,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject);

  for (let i = 0; i < feeArray.length; i++) {
    if (feeArray[i].feeType == 'Registration Fees') {
      quoteJson.quote_array[objPosition].program.registration_fee = round(xConversion(feeArray[i].feePrice), 1).toFixed(2);
      quoteJson.quote_array[objPosition].program.registration_description = feeArray[i].feeDescription;
    }

  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};

const getOtherProgramFees = function () {
  let campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    tableId = schoolPriceListTable,
    queryParam = '&campus_new__in=' + campusId + '&category__eq=Other Program Fees&enable__eq=1&sort=-price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);
  let feeArray = [];

  $.ajax({
    url: api_url,
    type: "get",
    async: false,
    success: function (data) {
      let dataObject = data.results;
      for (let i = 0; i < dataObject.length; i++) {

        feeArray.push({
          'feeId': dataObject[i].values.price_code,
          'feeType': dataObject[i].values.item_name,
          'feePrice': dataObject[i].values.price_current,
          'feeDescription': dataObject[i].values.program_name,
          'priceType': dataObject[i].values['price_type'].name,
        });
      }

      setOtherProgramFees(feeArray);
    },
    error: function () {
      console.log('no fees found');
    }
  });
};

//Step Program Schedule Price List
$('#schedule-price-list-container').on('click', 'input[type=radio]', function () {
  let getValue = $(this).attr('data-schedule-name'),
    programPrice = $(this).attr('data-price');
  $('input[name=program_schedule_selection]').val(getValue);
  $('input[name=program_schedule_price_selection]').val(programPrice);
  $(".schedule-price-list-selection-container button.next").removeClass('disable').addClass('enable');
});

const getProgramScheduleList = function () {
  let marketPriceCode = $('input[name=market_price_code]').val(),
    groupId = $("input[name='program_price_selection']:checked").val(),
    tableId = schoolPriceListTable,
    queryParam = '&group_code__in=' + groupId + '&is_program_price__eq=1&enable__eq=1&sort=-price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);
  $('#schedule-price-list-container').empty();
  let scheduleListArray = [];
  $.get(api_url).done(function (data) {
    let dataObject = data.results;
    for (let i = 0; i < dataObject.length; i++) {
      scheduleListArray.push({
        'priceId': dataObject[i].id,
        'scheduleName': dataObject[i].values.schedule,
        'itemName': dataObject[i].values.item_name,
        'priceFormat': dataObject[i].values['price_type'].name,
        'price': dataObject[i].values.price_current,
        'schedule': dataObject[i].values.schedule
      });
    }
    if (marketPriceCode != "" && marketPriceCode.includes('STD') === -1) {
      getMarketProgramPrice(scheduleListArray);
    } else {
      printStandardProgramPrice(scheduleListArray);
    }
  }).fail(function () {
    radioHtml = "<div class='text-center'><h3>No Schedule for this Program Available at this time.</h3></div>";
    $("#schedule-price-list-container").append(radioHtml);
  });
};

const getMarketProgramPrice = function (listArray) {
  let tableMarketPriceId = schoolMarketPriceListTable,
    marketPriceId = $('input[name=market_price_id]').val();
  for (let y = 0; y < listArray.length; y++) {
    priceId = listArray[y].priceId;
    queryPriceParam = '&price_list_code__in=' + priceId + '&market_region__in=' + marketPriceId;
    let api_price_url = apiUrl + tableMarketPriceId + '/rows?portalId=' + portalId + queryPriceParam;
    api_price_url = encodeURI(api_price_url);

    $.ajax({
      url: api_price_url,
      type: "get",
      async: false,
      success: function (dataP) {
        let dataPriceObject = dataP.results;
        let priceLocal = JSON.parse(localStorage.getItem('schedule-price')) || [];
        for (let x = 0; x < dataPriceObject.length; x++) {
          listArray[y].price = dataPriceObject[x].values.price;
        }
        priceLocal.push(listArray[y]);
        localStorage.setItem('schedule-price', JSON.stringify(priceLocal));
      },
      error: function () {
        console.log('no market price');
      }
    });
  }
  printMarketProgramPrice();

};
const printStandardProgramPrice = function (listArray) {
  let radioHtml = "";
  for (let i = 0; i < listArray.length; i++) {
    priceId = listArray[i].priceId;
    scheduleName = listArray[i].scheduleName;
    itemName = listArray[i].itemName;
    priceFormat = listArray[i].priceFormat;
    price = currencyFormatter(listArray[i].price);
    schedule = listArray[i].schedule;
    radioHtml = radioHtml + "<div class='program-option'><input type='radio' class='program-option' name='schedule_price_selection' id='" + priceId + "' value='" + priceId + "' data-schedule-name='" + scheduleName + "-" + itemName + "-" + schedule + "' data-price='" + price + "' /><label for='" + priceId + "'><div class='program-name float-left'>" + scheduleName + " - " + itemName + "<br/>" + schedule + "</div><div class='text-right float-right'><span class='price-format'>" + priceFormat + "</span><span class='price-text'>" + price + "</span></div></label></div>";
  }
  $("#schedule-price-list-container").append(radioHtml);

};
const printMarketProgramPrice = function () {
  let retrievedObject = localStorage.getItem('schedule-price');
  let retrievedJson = JSON.parse(retrievedObject);
  retrievedJson.sort((a, b) => (a.price > b.price ? -1 : 1));
  let radioHtml = "";
  for (let z = 0; z < retrievedJson.length; z++) {
    priceId = retrievedJson[z].priceId;
    scheduleName = retrievedJson[z].scheduleName;
    itemName = retrievedJson[z].itemName;
    priceFormat = retrievedJson[z].priceFormat;
    price = currencyFormatter(retrievedJson[z].price);
    schedule = retrievedJson[z].schedule;
    radioHtml = radioHtml + "<div class='program-option'><input type='radio' class='program-option' name='schedule_price_selection' id='" + priceId + "' value='" + priceId + "' data-schedule-name='" + scheduleName + "-" + itemName + "-" + schedule + "' data-price='" + price + "' /><label for='" + priceId + "'><div class='program-name float-left'>" + scheduleName + " - " + itemName + "<br/>" + schedule + "</div><div class='text-right float-right'><span class='price-format'>" + priceFormat + "</span><span class='price-text'>" + price + "</span></div></label></div>";
  }
  $("#schedule-price-list-container").append(radioHtml);
  localStorage.removeItem("schedule-price");

};

const updateScheduleSelection = function (editNum) {
  let objPosition = editNum - 1;
  let quoteObject = localStorage.getItem(quoteJsonName);
  let quoteJson = JSON.parse(quoteObject);
  scheduleSelected = $('input[name=program_schedule_selection]').val();
  schedulePriceSelected = $('input[name=program_schedule_price_selection]').val();
  scheduleStandardPriceSelected = $('input[name=program_schedule_standard_price_selection]').val();
  totalPrice = schedulePriceSelected;

  for (var i = 0; i < quoteJson.quote_array.length; i++) {
    if (i === objPosition) {
      quoteJson.quote_array[i].program.option_schedule = scheduleSelected;
      quoteJson.quote_array[i].program.program_total_price = schedulePriceSelected;
      quoteJson.quote_array[i].program.program_total_standard_price = scheduleStandardPriceSelected;
      quoteJson.quote_array[i].quote_total_price = totalPrice;
      break;
    }
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
};


//Quote Step
const setTotalPrice = function () {
  getOtherProgramFees();
  let editNum = $('input[name=quote_number]').val();
  editNum = editNum - 1;
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj"));
  schedulePriceSelected = parseFloat(quoteObj.quote_array[editNum].program.program_total_price);
  materialFeeSelected = parseFloat(quoteObj.quote_array[editNum].program.material_fee);
  registrationFeeSelected = parseFloat(quoteObj.quote_array[editNum].program.registration_fee);
  accommodationTotalSelected = parseFloat(quoteObj.quote_array[editNum].accommodation.accommodation_total_price);
  airportTransferFeeSelected = parseFloat(quoteObj.quote_array[editNum].accommodation.airport_transfer_total_price);
  accommodationPlacementFeeSelected = parseFloat(quoteObj.quote_array[editNum].accommodation.placement_fee);
  accommodationCleaningFeeSelected = parseFloat(quoteObj.quote_array[editNum].accommodation.cleaning_fee);
  totalPrice = schedulePriceSelected + materialFeeSelected + registrationFeeSelected + accommodationTotalSelected + airportTransferFeeSelected + accommodationPlacementFeeSelected + accommodationCleaningFeeSelected;

  promoAutoDiscountTotal = 0;

  if (quoteObj.quote_array[editNum].promo.promo_auto_enabled) {

    promoAutoValueArray = quoteObj.quote_array[editNum].promo.promo_auto_value.split('|');
    promoAutoCategory = quoteObj.quote_array[editNum].promo.promo_auto_category.split('|');
    promoAutoDiscountType = quoteObj.quote_array[editNum].promo.promo_auto_discount_type.split('|');

    promoAutoDiscount = 0;

    for (let i = 0; i < promoAutoValueArray.length; i++) {

      promoValueInt = convertPercentDollarVal(promoAutoValueArray[i], promoAutoCategory[i], promoAutoDiscountType[i], editNum);
      promoAutoDiscountTotal += parseFloat(promoValueInt);
    }
  }

  //calculate total price
  totalPrice = totalPrice - promoAutoDiscountTotal;

  quoteObj.quote_array[editNum].quote_total_price = totalPrice.toFixed(2);
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));

};
const printQuotesHTML = function () {
  $('.step-breadcrumb-container').hide();
  $('.x-convert-container .btn[data-origin-currency]').addClass('active').addClass('btn-orange-outline').removeClass('btn-black-outline');
  $('.x-convert-container .btn[data-destination-currency]').removeClass('active').removeClass('btn-orange-outline').addClass('btn-black-outline');
  let originCurrency = $('input[name=country_origin_currency_selection]').val();
  $('button.btn-origin-currency').attr('data-origin-currency', originCurrency);
  $('button.btn-origin-currency').text(originCurrency);
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
    quoteHTML,
    schoolName = quoteObj.school_name;



  $('#quote-selection-container').empty();
  if (quoteObj.quote_array.length > 0) {
    for (let i = 0; i < quoteObj.quote_array.length; i++) {
      quoteNum = i + 1;
      if (quoteObj.quote_array[i].quote_enabled) {
        programSchoolName = quoteObj.quote_array[i].program_school_name,
          priceProgramVal = parseFloat(quoteObj.quote_array[i].program.program_total_price);
        priceStandardVal = parseFloat(quoteObj.quote_array[i].program.program_total_standard_price);
        priceRegistrationVal = parseFloat(quoteObj.quote_array[i].program.registration_fee);
        priceMaterialVal = parseFloat(quoteObj.quote_array[i].program.material_fee);
        priceAccommodationVal = parseFloat(quoteObj.quote_array[i].accommodation.accommodation_total_price);
        priceAirportVal = parseFloat(quoteObj.quote_array[i].accommodation.airport_transfer_total_price);
        priceAccommodationPlacementFeeVal = parseFloat(quoteObj.quote_array[i].accommodation.placement_fee);
        priceAccommodationCleaningFeeVal = parseFloat(quoteObj.quote_array[i].accommodation.cleaning_fee);
        priceQuoteTotalVal = parseFloat(quoteObj.quote_array[i].quote_total_price);
        accommodationNoteVal = quoteObj.quote_array[i].accommodation.accommodation_note;
        campusCountry = quoteObj.quote_array[i].campus_country;
        promoAutoTotalVal = 0;
        discountVal = 0;
        discountHtml = "";
        discountTotalHtml = "";
        registrationHtml = "";
        materialHtml = "";
        accommodationHtml = "";
        cleaningFeePriceHtml = "";
        accommodationNoteHtml = "";
        promoAutoHtml = "",
          promoCodeHtml = "",
          printPromo = quoteObj.quote_array[i].promo.promo_auto_enabled || quoteObj.quote_array[i].promo.promo_code_enabled ? true : false;


        //Apply Promo

        if (printPromo) {
          promoAutoArray = [];
          promoCodeArray = [];

          //Apply Automatic Promo
          if (quoteObj.quote_array[i].promo.promo_auto_enabled) {
            promoCode = quoteObj.quote_array[i].promo.promo_auto_code.split('|');
            promoCategory = quoteObj.quote_array[i].promo.promo_auto_category.split('|');
            promoName = quoteObj.quote_array[i].promo.promo_auto_code_name.split('|');
            promoDescription = quoteObj.quote_array[i].promo.promo_auto_description.split('|');
            promoDiscountType = quoteObj.quote_array[i].promo.promo_auto_discount_type.split('|');
            promoType = quoteObj.quote_array[i].promo.promo_auto_type.split('|');
            promoValue = quoteObj.quote_array[i].promo.promo_auto_value.split('|');

            for (let x = 0; x < promoCode.length; x++) {
              promoAutoArray.push({
                'code': promoCode[x],
                'category': promoCategory[x],
                'promoName': promoName[x],
                'description': promoDescription[x],
                'discountType': promoDiscountType[x],
                'promoType': promoType[x],
                'promoValue': promoValue[x]

              })
            }
          }

          if (promoAutoArray.length > 0) {
            promoLineItem = '';
            for (let z = 0; z < promoAutoArray.length; z++) {

              promoValueInt = convertPercentDollarVal(promoAutoArray[z].promoValue, promoAutoArray[z].category, promoAutoArray[z].discountType, i);

              promoLineItem += "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>" + promoAutoArray[z].promoName + "</span></div><div class='item-notes'>" + promoAutoArray[z].description + "</div></div><div class='item-price bold promo-auto-total promo-auto-total-" + z + "'>" + currencyFormatter(-promoValueInt) + "</div></div></div>";
              promoAutoTotalVal += parseFloat(promoValueInt);
            }

            promoAutoHtml = "<div class='quote-box promo-box-container promo-auto-box'>" + promoLineItem + "</div>";
          }

          //Apply Coupon Promo
          if (quoteObj.quote_array[i].promo.promo_code_enabled) {

            promoValueInt = convertPercentDollarVal(quoteObj.quote_array[i].promo.promo_code_value, quoteObj.quote_array[i].promo.promo_code_category, quoteObj.quote_array[i].promo.promo_code_discount_type, i);

            promoCodeHtml = "<div class='quote-box promo-box-container'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>" + quoteObj.quote_array[i].promo.promo_code_name + "</span></div><div class='item-notes'>" + quoteObj.quote_array[i].promo.promo_code_description + "</div></div><div class='item-price bold promo-code-total'>" + currencyFormatter(-promoValueInt) + "</div></div></div></div>";

          }
        }

        if (priceProgramVal < priceStandardVal) {
          discountVal = priceStandardVal - priceProgramVal + promoAutoTotalVal;
          discountHtml = "<span class='discount-txt strike discount-program-price'>" + currencyFormatter(priceStandardVal) + "</span>";
          discountTotalHtml = "<div class='total-discount-line'><div class='item-description total-title discount-title-price'>Discount Total</div><div class='item-price'><span class='discount-txt discount-total-price'>" + currencyFormatter(-discountVal) + "</span></div></div>";
        }

        schoolHtml = "<div class='program-type'><span class='header'>Program</span><br><span class='result'>" + programSchoolName + "</div>";
        campusHtml = "<div class='program-type'><span class='header'>Campus</span><br><span class='result'>" + quoteObj.quote_array[i].campus + ", " + quoteObj.quote_array[i].campus_country + "</div>";


        scheduleProgramHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>" + quoteObj.quote_array[i].program.option_program + " - " + quoteObj.quote_array[i].program.option_schedule + "</span></div><div class='item-notes'>Start: " + quoteObj.quote_array[i].program.start_date + "</div></div><div class='item-price'>" + discountHtml + "<span class='bold program-price'>" + currencyFormatter(priceProgramVal) + "</span></div></div></div>";

        if (priceRegistrationVal > 0) {
          registrationHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Registration Fee</span></div><div class='item-notes'>" + quoteObj.quote_array[i].program.registration_description + "</div></div><div class='item-price'><span class='bold registration-fee'>" + currencyFormatter(priceRegistrationVal) + "</span></div></div></div>";
        }
        if (priceMaterialVal > 0) {
          materialHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Material Fee</span></div></div><div class='item-price'><span class='bold material-fee'>" + currencyFormatter(priceMaterialVal) + "</span></div></div></div>";
        }
        if (priceAccommodationVal > 0) {
          optionName = quoteObj.quote_array[i].accommodation.option_accommodation;
          accommodationPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>" + optionName + "<br>(" + quoteObj.quote_array[i].accommodation.length_of_stay + " Weeks)</span></div><div class='item-notes'>Check-in Date: " + quoteObj.quote_array[i].accommodation.check_in_date + "</div></div><div class='item-price'><span class='bold accommodation-price'>" + currencyFormatter(priceAccommodationVal) + "</span></div></div></div>";
          airportPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Airport Transfer Fee</span></div><div class='item-notes'>" + quoteObj.quote_array[i].accommodation.option_airport_transfer + "</div></div><div class='item-price'><span class='bold airport-fee'>" + currencyFormatter(priceAirportVal) + "</span></div></div></div>";
          placementFeePriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Accommodation Administration Fee</span></div></div><div class='item-price'><span class='bold placement-fee'>" + currencyFormatter(priceAccommodationPlacementFeeVal) + "</span></div></div></div>";
          if (priceAccommodationCleaningFeeVal > 0) {
            cleaningFeePriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Exit Cleaning Fee</span></div></div><div class='item-price'><span class='bold cleaning-fee'>" + currencyFormatter(priceAccommodationCleaningFeeVal) + "</span></div></div></div>";
          }
          accommodationHtml = "<div class='quote-accommodation quote-box'>" + accommodationPriceHtml + airportPriceHtml + placementFeePriceHtml + cleaningFeePriceHtml + "</div>";
          accommodationNoteHtml = accommodationNoteVal != 'none' && optionName.includes('Residence') ? "<div class='center disclaimer'>" + accommodationNoteVal + "</div>" : '';
          homestayNoteHTML = homestayNote !== '' && optionName.includes('Homestay') ? campusCountry == 'Canada' ? "<div class='center disclaimer'>" + homestayNote + "</div>" : '' : '';
          accommodationNoteHtml = accommodationNoteHtml + homestayNoteHTML;
        }

        priceNoteText = '<sup>*</sup>The prices shown are not valid for government-sponsored business.';
        priceNoteHtml = "<div class='center footnote'>" + priceNoteText + "</div>";

        totalPriceHtml = "<div class='line-item'>" + discountTotalHtml + "<div><div class='item-description total-title bold'>TOTAL</div><div class='item-price bold total-price'>" + currencyFormatter(priceQuoteTotalVal) + "</div></div></div>";
        quoteHTML = "<div class='col col-md-6 col-quote-" + quoteNum + "'><div class='quote-title'>Quote " + quoteNum + "</div><div class='quote-select-container'><div class='quote-items'><div class='quote-location'>" + schoolHtml + campusHtml + "</div><div class='quote-program-schedule quote-box'>" + scheduleProgramHtml + registrationHtml + materialHtml + "</div>" + accommodationHtml + promoAutoHtml + "<div class='promo-code-box'>" + promoCodeHtml + "</div><div class='quote-box total-price-container'>" + totalPriceHtml + "</div>" + accommodationNoteHtml + priceNoteHtml + "</div><div class='promo-container'><label for='input-promo-code-" + quoteNum + "'>Enter Promo Code</label><div><input type='text' id='input-promo-code-" + quoteNum + "' class='input-promo-code' name='input-promo-code-" + quoteNum + "'><button data-quote='" + quoteNum + "' class='btn-promo-code btn-orange'>APPLY</button></div><div id='promo-feedback-" + quoteNum + "' class='promo-feedback'></div></div><div><div class='btn-container'><button type='button' class='btn btn-orange-outline bold quote-edit' data-edit-num='" + quoteNum + "' tabindex='0'>Edit</button><button type='button' class='btn btn-orange-outline bold quote-remove' data-remove-num='" + quoteNum + "' tabindex='0'>Remove <span class='icon-remove'>&#8999;</span></button></div></div>";

        $('#quote-selection-container').append(quoteHTML);
      } else {
        quoteHTML = "<div class='col col-quote-" + quoteNum + " empty'><div class='quote-title'>Quote " + quoteNum + "</div><div class='new-quote' data-quote='" + quoteNum + "'><div class='create-icon center'><i class='fas fa-plus-circle'></i></div><h3 class='center'>Create a new quote</h3></div></div>";
        $('#quote-selection-container').append(quoteHTML);

      }
    }
  }

  printQuoteWidth();
  setTimeout(setBoxHeight('.quote-program-schedule.quote-box'), 300);
  setTimeout(setBoxHeight('.quote-accommodation.quote-box'), 300);
  setTimeout(setBoxHeight('.program-type'), 300);
};


const printQuoteWidth = function () {
  if (!$('.col-quote-2').hasClass('empty') && $('.col-quote-3').hasClass('empty')) {
    $('.col-quote-1').removeClass('col-md-6');
    $('.col-quote-2').removeClass('col-md-6');

  } else if (!$('.col-quote-2').hasClass('empty') && !$('.col-quote-3').hasClass('empty')) {
    $('.col-quote-1').removeClass('col-md-6');
    $('.col-quote-2').removeClass('col-md-6');
    $('.col-quote-3').removeClass('col-md-6');
  }
};

$('.x-convert-container .btn').click(function () {
  if (!$(this).hasClass('active')) {
    $(this).addClass('active').addClass('btn-orange-outline').removeClass('btn-black-outline');
    $(this).siblings('.btn').removeClass('active').removeClass('btn-orange-outline').addClass('btn-black-outline');
    resetDestinationCurrency($(this).attr('data-origin-currency'));
  }
});


const currencyModFormatter = function (num, toCurrency) {
  let priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: toCurrency, currencyDisplay: 'code' }).format(num);
  return priceFormat;
};


const convertCalc = function (num, conversion) {
  let conversionRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val();
  conversionPrice = conversion ? parseInt(num) / conversionRate : parseInt(num) * conversionRate;
  return conversionPrice;
}
const convertCalcFloat = function (num, conversion) {
  let conversionRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val();
  conversionPrice = conversion ? parseFloat(num) / conversionRate : parseFloat(num) * conversionRate;
  return conversionPrice;
}

const resetDestinationCurrency = function (currency) {
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj"));

  if (quoteObj.quote_array.length > 0) {
    for (let i = 0; i < quoteObj.quote_array.length; i++) {
      if (quoteObj.quote_array[i].quote_enabled) {

        if (!currency) {
          fromCurrency = quoteObj.country_origin_currency;
          toCurrency = quoteObj.quote_array[i].campus_currency;
          convert = true;
          quoteObj.quote_array[i].show_currency = toCurrency;
        } else {
          toCurrency = currency;
          fromCurrency = quoteObj.quote_array[i].campus_currency;
          quoteObj.quote_array[i].show_currency = toCurrency;
          convert = false;
        }

        if (fromCurrency != toCurrency) {

          quoteNum = i + 1;
          conversionRate = 1;

          if (convert) {
            conversionRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val();
          }

          priceProgramVal = convertCalcFloat(quoteObj.quote_array[i].program.program_total_price, convert);
          priceProgramPrice = round(priceProgramVal, 1).toFixed(2);
          quoteObj.quote_array[i].program.program_total_price = priceProgramPrice;

          priceStandardVal = convertCalcFloat(quoteObj.quote_array[i].program.program_total_standard_price, convert);
          priceStandardPrice = round(priceStandardVal, 1).toFixed(2);
          quoteObj.quote_array[i].program.program_total_standard_price = priceStandardPrice;

          priceRegistrationVal = convertCalcFloat(quoteObj.quote_array[i].program.registration_fee, convert);
          priceRegistrationVal = round(priceRegistrationVal, 1).toFixed(2);
          quoteObj.quote_array[i].program.registration_fee = priceRegistrationVal;

          priceAdditionalVal = convertCalcFloat(quoteObj.quote_array[i].program.additional_fee, convert);
          priceAdditionalVal = round(priceAdditionalVal, 1).toFixed(2);
          quoteObj.quote_array[i].program.additional_fee = priceAdditionalVal;


          priceMaterialVal = convertCalcFloat(quoteObj.quote_array[i].program.material_fee, convert);
          priceMaterialVal = round(priceMaterialVal, 1).toFixed(2);
          quoteObj.quote_array[i].program.material_fee = priceMaterialVal;

          priceAccommodationVal = convertCalcFloat(quoteObj.quote_array[i].accommodation.accommodation_total_price, convert);
          priceAccommodationVal = round(priceAccommodationVal, 1).toFixed(2);
          quoteObj.quote_array[i].accommodation.accommodation_total_price = priceAccommodationVal;


          priceAirportVal = convertCalcFloat(quoteObj.quote_array[i].accommodation.airport_transfer_total_price, convert);
          priceAirportVal = round(priceAirportVal, 1).toFixed(2);
          quoteObj.quote_array[i].accommodation.airport_transfer_total_price = priceAirportVal;

          priceAccommodationPlacementFeeVal = convertCalcFloat(quoteObj.quote_array[i].accommodation.placement_fee, convert);
          priceAccommodationPlacementFeeVal = round(priceAccommodationPlacementFeeVal, 1).toFixed(2);
          quoteObj.quote_array[i].accommodation.placement_fee = priceAccommodationPlacementFeeVal;

          priceAccommodationCleaningFeeVal = convertCalcFloat(quoteObj.quote_array[i].accommodation.cleaning_fee, convert);
          priceAccommodationCleaningFeeVal = round(priceAccommodationCleaningFeeVal, 1).toFixed(2);
          quoteObj.quote_array[i].accommodation.cleaning_fee = priceAccommodationCleaningFeeVal;

          priceQuoteTotalVal = convertCalcFloat(quoteObj.quote_array[i].quote_total_price, convert);
          priceQuoteTotalVal = round(priceQuoteTotalVal, 1).toFixed(2)
          quoteObj.quote_array[i].quote_total_price = priceQuoteTotalVal;


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
          promoCodeTotal = quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].promo.promo_code_value) : 0;


          if (quoteObj.quote_array[i].promo.promo_auto_enabled) {
            for (let x = 0; x < promoAutoValArray.length; x++) {

              promoAutoVal = convertPercentDollarVal(promoAutoValArray[x], promoAutoCategoryArray[x], promoAutoTypeArray[x], i);
              promoAutoTotal = convertCalcFloat(promoAutoVal, convert);
              promoAutoTotalVal += parseFloat(promoAutoVal);

              $('.promo-auto-total-' + x, '.col-quote-' + quoteNum).html(currencyModFormatter(-promoAutoTotal, toCurrency));
            }
            promoAutoTotalVal = convertCalcFloat(promoAutoTotalVal, convert);
          }

          if (quoteObj.quote_array[i].promo.promo_code_enabled) {

            promoCodeVal = convertPercentDollarVal(promoCodeTotal, promoCodeCategory, promoCodeType, i);
            promoCodeTotal = convertCalcFloat(promoCodeVal, convert);

            $('.promo-code-total', '.col-quote-' + quoteNum).html(currencyModFormatter(-promoCodeTotal, toCurrency));
            priceQuoteTotalVal = priceQuoteTotalVal - promoCodeTotal;
            priceQuoteTotalVal = priceQuoteTotalVal.toFixed(2);
          }


          if (priceProgramVal < priceStandardVal) {
            discountVal = priceStandardVal - priceProgramVal + promoAutoTotalVal + promoCodeTotal;
            discountVal = round(discountVal, 1).toFixed(2);

            $('.col-quote-' + quoteNum + ' span.discount-program-price').html(currencyModFormatter(priceStandardPrice, toCurrency));
            $('.col-quote-' + quoteNum + ' span.discount-total-price').html(currencyModFormatter(discountVal, toCurrency));
          }

          $('.col-quote-' + quoteNum + ' span.program-price').html(currencyModFormatter(priceProgramPrice, toCurrency));
          $('.col-quote-' + quoteNum + ' span.registration-fee').html(currencyModFormatter(priceRegistrationVal, toCurrency));
          $('.col-quote-' + quoteNum + ' span.material-fee').html(currencyModFormatter(priceMaterialVal, toCurrency));
          $('.col-quote-' + quoteNum + ' span.accommodation-price').html(currencyModFormatter(priceAccommodationVal, toCurrency));
          $('.col-quote-' + quoteNum + ' span.airport-fee').html(currencyModFormatter(priceAirportVal, toCurrency));
          $('.col-quote-' + quoteNum + ' span.placement-fee').html(currencyModFormatter(priceAccommodationPlacementFeeVal, toCurrency));
          $('.col-quote-' + quoteNum + ' span.cleaning-fee').html(currencyModFormatter(priceAccommodationCleaningFeeVal, toCurrency));

          $('.col-quote-' + quoteNum + ' div.total-price').html(currencyModFormatter(priceQuoteTotalVal, toCurrency));
        }


      }
    }
    localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));
  }
};

//Email Quote


const sendEmailQuoteForm = function () {
  let url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + fGuid;
  url = encodeURI(url);

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
    firstName = $('form#pricing-quote input[name=first_name]').val(),
    lastName = $('form#pricing-quote input[name=last_name]').val(),
    email = $('form#pricing-quote input[name=email]').val(),
    nationality = $('form#pricing-quote select[name=nationality] option:selected').val(),
    phone = $('form#pricing-quote input[name=phone]').val(),
    withAgent = $('form#pricing-quote input[name=with_agent]:checked').val(),
    isAgent = $('form#pricing-quote input[name=is_agent]:checked').val(),
    whatsApp = false;
  if ($('form#pricing-quote input[name=quote_whatsapp_check]').is(':checked')) {
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
    }
  ];

  for (let i = 0; i < quoteObj.quote_array.length; i++) {
    quoteNum = i + 1;
    countryOriginCurrency = quoteObj.country_origin_currency;
    showCurrency = quoteObj.quote_array[i].show_currency;
    conversionRate = 1;
    if (countryOriginCurrency != showCurrency) {
      conversionRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val();
    }


    programTotalPriceInt = parseFloat(quoteObj.quote_array[i].program.program_total_price);

    programTotalPrice = programTotalPriceInt.toFixed(2);

    programTotalStandardPriceInt = parseFloat(quoteObj.quote_array[i].program.program_total_standard_price);
    programTotalStandardPrice = programTotalStandardPriceInt.toFixed(2);
    registrationFee = parseFloat(quoteObj.quote_array[i].program.registration_fee);
    registrationFee = registrationFee.toFixed(2);
    additionalFee = parseFloat(quoteObj.quote_array[i].program.additional_fee);
    additionalFee = additionalFee.toFixed(2);
    materialFee = parseFloat(quoteObj.quote_array[i].program.material_fee);
    materialFee = materialFee.toFixed(2);
    accommodationPrice = parseFloat(quoteObj.quote_array[i].accommodation.accommodation_total_price);
    accommodationPrice = accommodationPrice.toFixed(2);
    airportFee = parseFloat(quoteObj.quote_array[i].accommodation.airport_transfer_total_price);
    airportFee = airportFee.toFixed(2);
    placementFee = parseFloat(quoteObj.quote_array[i].accommodation.placement_fee);
    placementFee = placementFee.toFixed(2);
    cleaningFee = parseFloat(quoteObj.quote_array[i].accommodation.cleaning_fee);
    cleaningFee = cleaningFee.toFixed(2);

    totalAmount = quoteObj.quote_array[i].promo.promo_code_enabled ? parseFloat(quoteObj.quote_array[i].quote_total_price) - parseFloat(quoteObj.quote_array[i].promo.promo_code_value) : parseFloat(quoteObj.quote_array[i].quote_total_price);

    totalPrice = totalAmount.toFixed(2);

    accommodationEnable = quoteObj.quote_array[i].accommodation.accommodation_enable;

    familyAdultAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult);
    familyChildAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child);
    familyChildPrice = parseFloat(quoteObj.quote_array[i].accommodation.family_additional_child_total_price);
    familyAdultPrice = parseFloat(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price);

    showFamilyChildAdd = 'none';
    showFamilyAdultAdd = 'none';

    if (familyChildAddEnable > 0) {
      showFamilyChildAdd = 'block';
    }
    if (familyAdultAddEnable > 0) {
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

    if (quoteObj.quote_array[i].promo.promo_auto_enabled) {
      if (promoAutoValArr.length > 0) {
        for (let z = 0; z < promoAutoValArr.length; z++) {

          autoValInt = convertPercentDollarVal(promoAutoValArr[z], promoAutoCategoryArray[z], promoAutoTypeArray[z], i);
          autoVal = parseFloat(autoValInt) / conversionRate;
          promoAutoTotalVal += parseFloat(autoVal);
          promoAutoValArray.push(
            currencyModFormatter(autoVal, showCurrency)
          )
        }
        promoAutoTotalVal = promoAutoTotalVal / conversionRate;
      }

    }
    promoAutoValStr = promoAutoValArray.length > 0 ? promoAutoValArray.toString().replace('00,', '|') : 'n/a';

    promoCodeCategory = quoteObj.quote_array[i].promo.promo_code_category;
    promoCodeType = quoteObj.quote_array[i].promo.promo_code_discount_type;
    promoCodeTotal = quoteObj.quote_array[i].promo.promo_code_enabled ? parseFloat(quoteObj.quote_array[i].promo.promo_code_value) : 0;



    promoCodeVal = quoteObj.quote_array[i].promo.promo_code_enabled ? convertPercentDollarVal(promoCodeTotal, promoCodeCategory, promoCodeType, i) : 0;
    promoCodeVal = parseFloat(promoCodeVal) / conversionRate;

    if (programTotalStandardPriceInt > programTotalPriceInt) {
      discountPrice = programTotalStandardPriceInt - programTotalPriceInt + promoAutoTotalVal + promoCodeVal;
      discountPrice = parseFloat(discountPrice);
      discountPrice = currencyModFormatter(discountPrice, showCurrency);
      showDiscount = 'revert';
    }
    showAccommodation = 'none';
    if (accommodationEnable == 'true') {
      showAccommodation = 'block';
    }

    if (quoteObj.quote_array[i].quote_enabled) {

      formFieldsArray.push(
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_campus_selection",
          "value": quoteObj.quote_array[i].campus
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_campus_country_selection",
          "value": quoteObj.quote_array[i].campus_country
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_selection",
          "value": quoteObj.quote_array[i].program.option_program
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_program_school_selection",
          "value": quoteObj.quote_array[i].program_school_name
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_selection",
          "value": quoteObj.quote_array[i].program.option_schedule
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_description",
          "value": quoteObj.quote_array[i].program.option_schedule_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_standard_price_selection",
          "value": currencyModFormatter(programTotalStandardPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_price_selection",
          "value": currencyModFormatter(programTotalPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_duration_selection",
          "value": quoteObj.quote_array[i].program.duration
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_registration_fee",
          "value": currencyModFormatter(registrationFee, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_registration_description",
          "value": quoteObj.quote_array[i].program.registration_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_material_fee",
          "value": currencyModFormatter(materialFee, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult_show",
          "value": showFamilyAdultAdd
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child_show",
          "value": showFamilyChildAdd
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child",
          "value": quoteObj.quote_array[i].accommodation.family_additional_child
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult",
          "value": quoteObj.quote_array[i].accommodation.family_additional_adult
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child_price",
          "value": currencyModFormatter(familyChildPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult_price",
          "value": currencyModFormatter(familyAdultPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_show",
          "value": showAccommodation
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_program",
          "value": quoteObj.quote_array[i].accommodation.option_accommodation
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_duration",
          "value": quoteObj.quote_array[i].accommodation.length_of_stay
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_check_in_date",
          "value": quoteObj.quote_array[i].accommodation.check_in_date
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_total_price",
          "value": currencyModFormatter(accommodationPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_airport_transfer",
          "value": quoteObj.quote_array[i].accommodation.option_airport_transfer
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_airport_transfer_fee",
          "value": currencyModFormatter(airportFee, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_placement_fee",
          "value": currencyModFormatter(placementFee, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_cleaning_fee",
          "value": currencyModFormatter(cleaningFee, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_note",
          "value": quoteObj.quote_array[i].accommodation.accommodation_note_plain
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_discount_show",
          "value": showDiscount
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_total_price_discount",
          "value": discountPrice
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_show",
          "value": showPromoAuto
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_name",
          "value": quoteObj.quote_array[i].promo.promo_auto_code_name
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_description",
          "value": quoteObj.quote_array[i].promo.promo_auto_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_value",
          "value": promoAutoValStr
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_show",
          "value": showPromoCode
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code",
          "value": quoteObj.quote_array[i].promo.promo_code
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_name",
          "value": quoteObj.quote_array[i].promo.promo_code_name
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_description",
          "value": quoteObj.quote_array[i].promo.promo_code_description
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_value",
          "value": currencyModFormatter(promoCodeVal, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_total_price",
          "value": currencyModFormatter(totalPrice, showCurrency)
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_start_date",
          "value": quoteObj.quote_array[i].program.start_date
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_show",
          "value": "block"
        }
      );
    } else {
      formFieldsArray.push(
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_outlook_show",
          "value": "mso-hide:all"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_campus_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_campus_country_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_selection",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_description",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_standard_price_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_price_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_schedule_duration_selection",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_registration_fee",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_registration_description",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_material_fee",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_child_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_family_add_adult_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_program",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_duration",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_check_in_date",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_total_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_airport_transfer",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_airport_transfer_fee",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_placement_fee",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_cleaning_fee",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_accommodation_note",
          "value": "n/a"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_discount_show",
          "value": "none"
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_program_total_price_discount",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_show",
          "value": 'none'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_name",
          "value": 'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_description",
          "value": 'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_auto_value",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_show",
          "value": 'none'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code",
          "value": 'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_name",
          "value": 'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_description",
          "value": 'n/a'
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_promo_code_value",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_total_price",
          "value": 0
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_" + quoteNum + "_start_date",
          "value": "n/a"
        }
      );
    }

  }

  let formArray = {
    "fields": formFieldsArray,
    "context": {
      "pageUri": "www.ilsc.com/quote/language-schools/programs",
      "pageName": "ILSC Price Quote"
    },
    "legalConsentOptions": {
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
    success: function (data) {
      location.href = '/price-quote/email-confirmation';
    },
    contentType: "application/json",
    dataType: 'json'
  });
};


$(document).ready(function () {

  slickCarousel();
  setQuoteNumber();
  setCountryOrigin();
  initiateLocalJson();
  $(function () {
    $(".gc-datepicker").datepicker(
      {
        minDate: 0,
        dateFormat: 'yy-mm-dd',
        beforeShow: function (input, inst) {
          $('#ui-datepicker-div').addClass('gc-datepicker');
        },
        beforeShowDay: function (date) {
          if (date.getDay() == 6 || date.getDay() == 0) {
            return [true];
          } else {
            return [false];
          }
        }
      }
    );
  });

});