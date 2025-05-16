$('.accommodation-option-selection-container .accommodation-option-selection-container .option-select.program-option').on('click', 'input[type=radio]', function () {
  $(".accommodation-option-selection-container button.next").removeClass('disable').addClass('enable');
});

$('.accommodation-age-option-selection-container .accommodation-option-selection-container .option-select.program-option').on('click', 'input[type=radio]', function () {
  $(".accommodation-age-option-selection-container button.next").removeClass('disable').addClass('enable');
});
$('.section-quote-steps .step-container.accommodation-option-selection-container .accom-btn-container').on('click', '.btn.prev', function () {

  let quoteSlide = $('.quote-step-slide .slick-slide').index($('#start-date-select'));
  $('.quote-step-slide').slick('slickGoTo', quoteSlide);
});
const redirectAccomodationStep = function () {
  let campusSelected = $('input[name=campus_selection]').val(),
    isEdit = $('input[name=quote_edit]').val();

  if (campusSelected != 'Online') {
    if (isEdit === 'true') {
      let accommodationEnable = $('input[name=accommodation_enable]').val();

      if (accommodationEnable === 'true') {
        $("#yes-accomm-option").prop("checked", true);
      } else {
        $("#no-accomm-option").prop("checked", true);
      }
      enableNextButton('.accommodation-option-selection-container');
    }
    $('.quote-step-slide').slick('slickNext');

  } else {

    setTimeout(setTotalPrice, 300);
    setTimeout(printQuotesHTML, 500);
    let quoteSlide = $('.quote-step-slide .slick-slide').index($('#quote-summary'));
    $('#quote-price-container').attr('data-complete', true);
    setTimeout($('.quote-step-slide').slick('slickGoTo', quoteSlide), 900);
  }
}
const redirectAccommodationNoAge = function () {
  let checkedVal = $('.accommodation-option-selection-container .accommodation-option-selection-container .option-select.program-option input[type=radio]:checked').val();

  if (checkedVal == 'yes-accomm-option') {
    $('input[name=accommodation_enable]').val('true');
    printAccomodationForm(true);
  } else {
    $('input[name=accommodation_enable]').val('false');
    printAccomodationForm(false);
  }

  quoteSlide = $('.quote-step-slide .slick-slide').index($('#accommodation-select'));
  $('.quote-step-slide').slick('slickGoTo', quoteSlide);

}

const redirectAccomodationOptionStep = function () {
  let checkedVal = $('.accommodation-option-selection-container .accommodation-option-selection-container .option-select.program-option input[type=radio]:checked').val(),
    isEdit = $('input[name=quote_edit]').val();
  if (checkedVal == 'yes-accomm-option') {
    $('input[name=accommodation_enable]').val('true');
    if (isEdit === 'true') {
      let isUnderAge = $('input[name=is_under_age]').val();
      $('input[name=accommodation_age_option][value=' + isUnderAge + ']').prop('checked', true)
      enableNextButton('.accommodation-age-option-selection-container');
    }
    $('.quote-step-slide').slick('slickNext');

  } else {
    $('input[name=accommodation_enable]').val('false');
    setTimeout(setAccommodationGroup(), 200);
    getPromo('Automatic');
    setTimeout(setTotalPrice, 300);
    setTimeout(printQuotesHTML, 500);
    let quoteSlide = $('.quote-step-slide .slick-slide').index($('#quote-summary'));
    $('#quote-price-container').attr('data-complete', true);
    $('.quote-step-slide').slick('slickGoTo', quoteSlide);
  }
}

$('.accommodation-age-option-selection-container input[name=accommodation_age_option]').click(function () {
  let ageVal = $(this).val();
  $('input[name=is_under_age]').val(ageVal);
});

$('.accommodation-option-selection-container input[name=accommodation_option]').click(function () {
  let enableVal = $(this).val();
  if (enableVal == 'yes-accomm-option') {
    $('input[name=accommodation_enable]').val('true');
  } else {
    $('input[name=accommodation_enable]').val('false');
  }
});

const printAccommodationWeekSelection = function () {

  let className = $('.accommodation-price-selection-container .date-selector-container #week-select .selectWeek .dropdown-menu'),
    minWeek = 4,
    studyWeekDuration = parseInt($('input[name=program_schedule_duration_selection]').val()),
    maxWeek = studyWeekDuration <= 4 ? minWeek : studyWeekDuration;

  className.empty();

  for (let z = minWeek; z <= maxWeek; z++) {
    htmlOption = '<a href="#" class="dropdown-item" data-item="' + z + '" tabindex="0">' + z + ' Weeks</a>'
    className.append(htmlOption);
  }

}

const validateAccommodationAge = function () {
  let checkInDate = $('.accommodation-selection-container .date-selector #datepicker').val(),
    checkInDateEpoch = new Date(checkInDate).getTime(),
    age = $('input[name=dob]').val() * 1000,
    ageAtCheckin = returnAge(parseInt(age), parseInt(checkInDateEpoch)),
    quoteNum = $('input[name=quote_number]').val(),
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    editNum = quoteNum - 1;

  $('input[name=accommodation_price_selection]').each(function () {
    ageRange = $(this).attr('data-age-requirement'),
      ageMin = 0,
      ageMax = 99;

    if (ageRange.includes('+')) {
      ageMin = parseInt(ageRange.replace('+', ''));
    } else if (ageRange.includes('-')) {
      ageList = ageRange.split('-');
      ageMin = parseInt(ageList[0]);
      ageMax = parseInt(ageList[1]);
    }

    $('.age-req-text').remove();

    if (ageAtCheckin >= ageMin && ageAtCheckin <= ageMax) {
      $(this).attr('disabled', false);
      $(this).parent().removeClass('disabled');

    } else {
      $(this).attr('disabled', true).prop('checked', false);
      $(this).parent().addClass('disabled').append('<p class="age-req-text text-center">Your age at check-in does not meet requirement. Age requirement: ' + ageRange + '</p>');

    }

  })

  isMinor = ageAtCheckin < 18 ? true : false;

  quoteJson.quote_array[editNum].accommodation.is_minor = isMinor;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));
}

const getHomeStayPriceList = function () {
  let campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    isUnderAge = $('input[name=is_under_age]').val(),
    schoolSelected = schoolName,
    tableId = accommodationPriceListTable,
    tableId2 = accommodationTable,
    queryParam = '&campus_location__in=' + campusId + '&category__eq=Homestay&under_age__eq=' + isUnderAge + '&enable__eq=1&sort=-price_current&limit=100',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);
  let homestayArray = [];

  $.ajax({
    url: api_url,
    type: "get",
    async: false,
    success: function (data) {

      let dataObject = data.results;


      if (dataObject.length > 0) {

        for (let i = 0; i < dataObject.length; i++) {
          description = dataObject[i].values.description;
          if (description) {
            description = description.replace(/"/g, '\\"').replace(/'/g, '\'');
          } else {
            description = "";
          }

          queryParam2 = '&hs_id__eq=' + dataObject[i].values['homestay_name'][0].id;
          api_url2 = apiUrl + tableId2 + '/rows?portalId=' + portalId + queryParam2;
          api_url2 = encodeURI(api_url2);

          $.ajax({
            url: api_url2,
            type: "get",
            async: false,
            success: function (data2) {

              let dataObject2 = data2.results;

              if (dataObject2.length > 0) {

                homestayArray.push({
                  accommodation_id: dataObject[i].id,
                  accommodation_name: dataObject[i].values['category'].name,
                  item_name: dataObject[i].values.price_description,
                  price_format: dataObject[i].values.price_type,
                  price_id: dataObject[i].values.price_code,
                  price: dataObject[i].values.price_current,
                  description: description,
                  price_description: dataObject[i].values.price_description,
                  group_id: dataObject[i].values['group_code'][0].id,
                  campus_country: dataObject[i].values['country'].name,
                  age_requirement: dataObject2[0].values.age_requirement
                });

              }

            }
          });

        }
        let programAccommodationGroupedByGroupId = groupBy(homestayArray, 'group_id');
        let groupArray = new Object();
        groupArray = programAccommodationGroupedByGroupId;

        const keys = Object.keys(groupArray);
        let lowestPriceArray = [];
        let values = Object.values(groupArray);
        let priceArray = [];

        for (let i = 0; i < values.length; i++) {
          let lowestPrice = [];
          for (let x = 0; x < values[i].length; x++) {
            if (x == 0) {
              lowestPriceArray.push({

                'accommodation_id': values[i][x].accommodation_id,
                'accommodation_name': values[i][x].accommodation_name,
                'campus_country': values[i][x].campus_country,
                'group_id': values[i][x].group_id,
                'item_name': values[i][x].item_name,
                'price_format': values[i][x].price_format,
                'price_id': values[i][x].price_id,
                'description': values[i][x].description,
                'price_description': values[i][x].price_description,
                'age_requirement': values[i][x].age_requirement

              });
            }
            lowestPrice.push(values[i][x].price);
            weekRange = values[i][x].weeks ? values[i][x].weeks : '1+ Weeks';
            priceArray.push({
              'weekRange': weekRange,
              'price': round(xConversion(values[i][x].price), 1).toFixed(2)
            });
          }

          for (let y = 0; y < values.length; y++) {
            lowestPriceArray[i].min_price = Math.min(...lowestPrice);
            lowestPriceArray[i].max_price = Math.max(...lowestPrice);
            lowestPriceArray[i].array_price = JSON.stringify(priceArray);
          }
        }

        printHomestayPriceList(lowestPriceArray);
      } else {
        radioHtml = "<div class='text-center'><h3>No Homestays Available at this time.</h3></div>";
        $(".homestay-select-container .option-container").html(radioHtml);
      }
    },
    error: function () {
      radioHtml = "<div class='text-center'><h3>No Homestays Available at this time.</h3></div>";
      $(".homestay-select-container .option-container").html(radioHtml);
    }
  });

}
const printHomestayPriceList = function (priceArray) {
  let isEdit = $('input[name=quote_edit]').val(),
    optionHtml = "";

  for (let i = 0; i < priceArray.length; i++) {
    let selectEdit = '';
    accommodationName = priceArray[i].accommmodation_name;
    itemName = priceArray[i].item_name;
    priceFormat = priceArray[i].price_format;
    minPrice = priceArray[i].min_price;
    maxPrice = priceArray[i].max_price;
    arrayPrice = priceArray[i].array_price;
    ageReq = priceArray[i].age_requirement;
    maxPriceConversion = round(xConversion(maxPrice), 1).toFixed(2);
    minPriceConversion = round(xConversion(minPrice), 1).toFixed(2);
    priceFormatted = currencyFormatter(minPriceConversion);
    accommodationId = priceArray[i].accommodation_id;
    groupId = priceArray[i].group_id,
      priceDescription = priceArray[i].price_description,
      description = priceArray[i].description
    dataContent = "<div class=\"close-container\"><a href=\"#\" class=\"pop-up pop-up-" + i + "\">X</a></div>" + description;


    optionHtml = optionHtml + "<div class='program-option inline-option' style='position:relative;'><input type='radio' class='program-option accom-input' name='accommodation_price_selection' id='" + groupId + "' value='" + groupId + "' data-program-name='Homestay - " + itemName + "' data-price-array='" + arrayPrice + "' data-item-name='" + priceDescription + "' data-age-requirement='" + ageReq + "' data-price-format='" + priceFormat + "' data-max-price='" + maxPriceConversion + "' data-min-price='" + minPriceConversion + "' data-additional-note='' tabindex='0' " + selectEdit + "><label for='" + groupId + "'><div>" + itemName + "</div><div class='text-right float-right'><span><button class='toggle-popover hs-toggle-popover btn btn-link'  data-html='true' data-toggle='popover' data-placement='top' data-content='" + dataContent + "' data-title='" + itemName + "' data-bs-html='true' data-bs-toggle='popover' data-bs-placement='top' data-bs-content='" + dataContent + "' data-bs-title='" + itemName + "'>see details</button></span><span class='price-format'>" + priceFormat + " from</span><span class='price-text'>" + priceFormatted + "</span></div></label></div>";
  }
  $(".homestay-select-container .option-container").html(optionHtml);

  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });
}
const getResidencePriceList = function () {
  let campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    tableId = accommodationPriceListTable,
    accommTableId = accommodationPartnersTable,
    accommListTableId = accommodationTable,
    schoolSelected = schoolName,
    queryParam_1 = '&campus_location__in=' + campusId + '&category__eq=Residence&under_age__eq=0&enable__eq=1&sort=-price_current',
    api_url_1 = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam_1,
    queryParam_2 = '&campus__in=' + campusId,
    api_url_2 = apiUrl + accommTableId + '/rows?portalId=' + portalId + queryParam_2,
    queryParam_3 = '&accommodation_type__eq=Residence&campus__in=' + campusId,
    api_url_3 = apiUrl + accommListTableId + '/rows?portalId=' + portalId + queryParam_3;
  api_url_1 = encodeURI(api_url_1);
  api_url_2 = encodeURI(api_url_2);
  api_url_3 = encodeURI(api_url_3);
  let residenceArray = [];
  let residenceMergeArray = [];


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

    if (dataObject1.length > 0) {

      residenceMergeArray = dataObject1.map(std => ({
        accommodation_id: std.id,
        accommodation_name: std.values.item_description,
        price_format: std.values.price_type,
        price_id: std.values.price_code,
        price: std.values.price_current,
        weeks: std.values['weeks'].name,
        description: std.values.description,
        price_description: std.values.price_description,
        group_id: std.values['group_code'][0].id,
        campus_country: std.values['country'].name,
        foreign_array: dataObject2.filter(mark => mark.id === std.values['accommodation_partner'][0].id),
        foreign_array2: dataObject3.filter(mark2 => mark2.values['residence_type'][0].id === std.values['accommodation_partner'][0].id)
      }));

      for (let i = 0; i < residenceMergeArray.length; i++) {

        description = residenceMergeArray[i].description;

        if (description) {
          description = description.replace(/"/g, '\\"').replace(/'/g, '\'');
        } else {
          description = "";
        }

        residenceArray.push({
          accommodation_id: residenceMergeArray[i].accommodation_id,
          accommodation_name: residenceMergeArray[i].accommodation_name,
          item_name: residenceMergeArray[i].foreign_array[0].values[1],
          price_format: residenceMergeArray[i].price_format,
          price_id: residenceMergeArray[i].price_id,
          price: residenceMergeArray[i].price,
          weeks: residenceMergeArray[i].weeks,
          description: description,
          price_description: residenceMergeArray[i].price_description,
          group_id: residenceMergeArray[i].group_id,
          campus_country: residenceMergeArray[i].campus_country,
          image: residenceMergeArray[i].foreign_array[0].values['image_thumbnail'].url,
          accommodation_note: residenceMergeArray[i].foreign_array[0].values.additional_fee_description,
          age_requirement: residenceMergeArray[i].foreign_array2[0].values.age_requirement,
          accommodation_note_plain: residenceMergeArray[i].foreign_array[0].values.additional_fee_description_plain
        });
      }

      let programAccommodationGroupedByGroupId = groupBy(residenceArray, 'group_id');
      let groupArray = new Object();
      groupArray = programAccommodationGroupedByGroupId;

      const keys = Object.keys(groupArray);
      let lowestPriceArray = [];
      let values = Object.values(groupArray);
      let priceArray = [];

      for (let i = 0; i < values.length; i++) {
        let lowestPrice = [];
        for (let x = 0; x < values[i].length; x++) {
          if (x == 0) {

            accommodationNote = values[i][x].accommodation_note ? values[i][x].accommodation_note : '';
            accommodationNotePlain = values[i][x].accommodation_note_plain ? values[i][x].accommodation_note_plain : '';

            lowestPriceArray.push({

              'accommodation_id': values[i][x].accommodation_id,
              'accommodation_name': values[i][x].accommodation_name,
              'campus_country': values[i][x].campus_country,
              'group_id': values[i][x].group_id,
              'item_name': values[i][x].item_name,
              'price_format': values[i][x].price_format,
              'price_id': values[i][x].price_id,
              'description': values[i][x].description,
              'price_description': values[i][x].price_description,
              'image': values[i][x].image,
              'accommodation_note': accommodationNote,
              'accommodation_note_plain': accommodationNotePlain,
              'age_requirement': values[i][x].age_requirement

            });
          }
          lowestPrice.push(values[i][x].price);
          weekRange = values[i][x].weeks ? values[i][x].weeks : '1+ Weeks';
          priceArray.push({
            'weekRange': weekRange,
            'price': round(xConversion(values[i][x].price), 1).toFixed(2)
          });
        }

        for (let y = 0; y < values.length; y++) {
          lowestPriceArray[i].min_price = Math.min(...lowestPrice);
          lowestPriceArray[i].max_price = Math.max(...lowestPrice);
          lowestPriceArray[i].array_price = JSON.stringify(priceArray);
        }
      }
      printResidencePriceList(lowestPriceArray);
    } else {
      radioHtml = "<div class='text-center'><h3>No Residences Available at this time.</h3></div>";
      $(".residence-select-container .option-container").html(radioHtml);
    }
  }).fail(function () {

    radioHtml = "<div class='text-center'><h3>No Residences Available at this time.</h3></div>";
    $(".residence-select-container .option-container").html(radioHtml);

  });

}
const printResidencePriceList = function (priceArray) {
  let isEdit = $('input[name=quote_edit]').val(),
    optionHtml = "",
    additionalHtml = "";
  $("#add-div").remove();

  for (let i = 0; i < priceArray.length; i++) {
    let selectEdit = '';
    accommodationName = priceArray[i].accommodation_name;
    accommodationNote = priceArray[i].accommodation_note;
    accommodationNotePlain = priceArray[i].accommodation_note_plain;
    itemName = priceArray[i].item_name;
    priceFormat = priceArray[i].price_format;
    minPrice = priceArray[i].min_price;
    maxPrice = priceArray[i].max_price;
    arrayPrice = priceArray[i].array_price;
    maxPriceConversion = round(xConversion(maxPrice), 1).toFixed(2);
    minPriceConversion = round(xConversion(minPrice), 1).toFixed(2);
    priceFormatted = currencyFormatter(minPriceConversion);
    accommodationId = priceArray[i].accommodation_id;
    groupId = priceArray[i].group_id,
      priceDescription = priceArray[i].price_description,
      description = priceArray[i].description,
      image = priceArray[i].image,
      ageReq = priceArray[i].age_requirement,
      dataContent = "<div class=\"close-container\"><a href=\"#\" class=\"pop-up pop-up-" + i + "\">X</a></div><div class=\"pop-content-container\"><div><img src=" + image + " width=\"150px\"></div><div>" + description + "</div>";

    optionHtml = optionHtml + "<div class='program-option inline-option' style='position:relative;'><input type='radio' class='program-option accom-input' name='accommodation_price_selection' id='" + groupId + "' value='" + groupId + "' data-program-name='Residence - " + accommodationName + "' data-price-array='" + arrayPrice + "' data-item-name='" + priceDescription + "' data-price-format='" + priceFormat + "'  data-max-price='" + maxPriceConversion + "'  data-additional-note='" + accommodationNote + "' data-additional-note-plain='" + accommodationNotePlain + "' data-age-requirement='" + ageReq + "' data-min-price='" + minPriceConversion + "' tabindex='0' " + selectEdit + "><label for='" + groupId + "'><div>" + accommodationName + "</div><div class='text-right float-right'><span><button class='toggle-popover res-toggle-popover btn btn-link' data-bs-html='true' data-bs-toggle='popover' data-bs-placement='top' data-bs-content='" + dataContent + "' data-bs-title='" + itemName + "' data-html='true' data-toggle='popover' data-placement='top' data-content='" + dataContent + "' data-title='" + itemName + "'>see details</button></span><span class='price-format'>" + priceFormat + " from</span><span class='price-text'>" + priceFormatted + "</span></div></label></div>";

    if (i == 0) {
      additionalHtml = additionalHtml + "<div id='add-div' class='center disclaimer'>" + accommodationNote + "</div>";
    }
  }
  $(".residence-select-container .option-container").html(optionHtml);
  $(".residence-select-container").append(additionalHtml);
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });
}
const getAccommodationPlacementFee = function (year) {
  let campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    accommodationNote = $('input[name=accommodation_note]').val(),
    accommodationNotePlain = $('input[name=accommodation_note_plain]').val(),
    tableId = accommodationPriceListTable,
    queryParam = '&campus_location__in=' + campusId + '&category__eq=Other Accommodation Fees&price_description__contains=Housing Booking Fee&enable__eq=1&sort=price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam,
    quoteNum = $('input[name=quote_number]').val(),
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    exchangeRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val(),
    editNum = quoteNum - 1;
  api_url = encodeURI(api_url);

  $.ajax({
    url: api_url,
    type: "get",
    async: false,
    success: function (data) {

      let dataObject = data.results,
        weekStay = parseInt(quoteJson.quote_array[editNum].accommodation.length_of_stay);

      if (dataObject.length > 0) {
        placementChargeEnable = false;
        placementFee = 0;
        rangeVal = dataObject[0].values.weeks ? dataObject[0].values.weeks.name : false;

        if (rangeVal) {
          if (rangeVal.indexOf('-') !== -1) {
            rangeSplit = rangeVal.split("-");
            minWeek = parseInt(rangeSplit[0]);
            maxWeek = parseInt(rangeSplit[1].replace('Weeks', ''));
          } else if (rangeVal.indexOf('+') !== -1) {
            rangeSplit = rangeVal.split("+");
            minWeek = parseInt(rangeSplit[0]);
            maxWeek = 999;
          } else {
            minWeek = parseInt(rangeVal);
            maxWeek = rangeVal;
          }
          if (weekStay >= minWeek && weekStay <= maxWeek) {
            placementChargeEnable = true;
          }
        } else {
          placementChargeEnable = true;
        }
        if (placementChargeEnable) {
          if (year) {
            placementFee = dataObject[0].values.price_current;
          } else {
            placementFee = dataObject[0].values.price_year_2;
          }
        }

        placementFee = placementFee * exchangeRate;

        quoteJson.quote_array[editNum].accommodation.placement_fee = placementFee.toFixed();
      }
      quoteJson.quote_array[editNum].accommodation.accommodation_note = accommodationNote;
      quoteJson.quote_array[editNum].accommodation.accommodation_note_plain = accommodationNotePlain;

      localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));


    },
    error: function () {
      console.log('no placement fee found');
    }
  });

}

const getAccommodationCleaningFee = function (year) {
  let campusId = $('input[name=campus_id_selection]').val(),
    tableId = accommodationPriceListTable,
    queryParam = '&campus_location__in=' + campusId + '&category__eq=Other Accommodation Fees&price_description__contains=Cleaning Fee&item_description__contains=Residence Additional Fees&enable__eq=1&sort=price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam,
    quoteNum = $('input[name=quote_number]').val(),
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    exchangeRate = $('input[name=quote_' + quoteNum + '_exchange_rate]').val(),
    editNum = quoteNum - 1;
  api_url = encodeURI(api_url);

  $.ajax({
    url: api_url,
    type: "get",
    async: false,
    success: function (data) {

      let dataObject = data.results;
      if (dataObject.length > 0) {
        if (year) {
          cleaningFee = dataObject[0].values.price_current;
        } else {
          cleaningFee = dataObject[0].values.price_year_2;
        }
        cleaningFee = cleaningFee * exchangeRate;

        quoteJson.quote_array[editNum].accommodation.cleaning_fee = cleaningFee.toFixed();
      }


      localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));


    },
    error: function () {
      console.log('no placement fee found');
    }
  });

}



const getAirportPriceList = function () {
  let campus = $('input[name=campus_selection]').val(),
    campusId = $('input[name=campus_id_selection]').val(),
    tableId = accommodationPriceListTable,
    queryParam = '&campus_location__in=' + campusId + '&category__eq=Other Accommodation Fees&price_description__contains=Airport&enable__eq=1&sort=price_current',
    api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
  api_url = encodeURI(api_url);
  let airportArray = [];

  $.ajax({
    url: api_url,
    type: "get",
    async: false,
    success: function (data) {
      let dataObject = data.results;

      for (let i = 0; i < dataObject.length; i++) {

        description = dataObject[i].values.price_description;
        if (description) {
          description = description.replace(/"/g, '\\"').replace(/'/g, '\'');
        } else {
          description = "";
        }

        airportArray.push({
          price_id: dataObject[i].values.price_code,
          price: dataObject[i].values.price_current,
          item_name: dataObject[i].values.item_name,
          description: description,
        });

      }

      printAirportPriceList(airportArray);

    },
    error: function () {
      radioHtml = "<div class='text-center'><h3>No Airport Transfer Available at this time.</h3></div>";
      $(".airport-select-container .option-container").html(radioHtml);
    }
  });
}
const printAirportPriceList = function (priceArray) {
  let isEdit = $('input[name=quote_edit]').val(),
    optionHtml = "",
    selectEdit = '';

  if (priceArray.length > 0) {
    for (let i = 0; i < priceArray.length; i++) {
      priceId = priceArray[i].price_id;
      price = priceArray[i].price;
      priceConversion = round(xConversion(price), 1).toFixed(2);
      description = priceArray[i].description;
      descriptionFormat = description.replace('Airport Transfer', '').replace('one', '1').replace('two', '2').replace(' (', '').replace(')', '');

      optionHtml = optionHtml + "<div class='program-option btn-option'><input type='radio' class='accom-input program-option' name='airport_selection' id='" + priceId + "' value='" + priceId + "' data-price='" + priceConversion + "' data-description='" + descriptionFormat + "' " + selectEdit + "><label for='" + priceId + "'><div class='center'>" + descriptionFormat + "</div></label></div>"
    }

  } else {
    //$(".airport-select-container").hide();
    optionHtml = "<div class='text-center'><h3>No Airport Transfer Available at this time.</h3></div>";
    selectEdit = 'checked';
  }

  optionHtml = optionHtml + "<div class='program-option btn-option'><input type='radio' class='accom-input program-option' name='airport_selection' id='0' value='none' data-price='0' data-description='No Aiport Transfer' " + selectEdit + "><label for='0'><div class='center'>No, Thanks</div></label></div>";
  $(".airport-select-container .option-container").html(optionHtml);

  if ($(".airport-select-container .option-container").children().length > 3) {
    $(".airport-select-container .option-container").addClass('div-extend');
  } else {
    $(".airport-select-container .option-container").removeClass('div-extend');
  }
}

const setAccommodationGroup = function () {
  let editNum = $('input[name=quote_number]').val();
  editNum = editNum - 1;
  let campusCountry = $('input[name=campus_country_selection]').val(),
    accommodationEnable = $('input[name=accommodation_enable]').val(),
    accommodationId = $('input[name=accommodation_group_id_selection]').val(),
    accommodationProgramName = $('input[name=accommodation_price_selection]:checked').attr('data-program-name'),
    highSeasonPrice = $('input[name=accommodation_high_season_selection]').val(),
    lowSeasonPrice = $('input[name=accommodation_low_season_selection]').val(),
    arrayPrice = JSON.parse($('input[name=accommodation_price_array_selection]').val()),
    airportDescription = $('input[name=airport_selection]:checked').attr('data-description'),
    airportId = $('input[name=airport_id_selection]').val(),
    airportPrice = $('input[name=airport_selection]:checked').attr('data-price'),
    isUnderAge = $('input[name=is_under_age]').val(),
    dateNow = new Date(),
    dateNowEpoch = dateNow.getTime(),
    checkInDateStr = $('input#datepicker').val();
  let checkInDate = new Date(checkInDateStr);
  let weekStay = $('input[name=week_selection]').attr('data-selected'),
    dayStay = $('input[name=days_selection]').attr('data-selected'),
    minMonthHighSeasonCurrentYear = new Date($('input[name=accommodation_high_season_min_date_current_year]').val()),
    minMonthHighSeasonCurrentYearEpoch = minMonthHighSeasonCurrentYear.getTime();
  highSeasonEnabled = minMonthHighSeasonCurrentYearEpoch < dateNowEpoch ? false : true;
  maxMonthHighSeasonCurrentYear = new Date($('input[name=accommodation_high_season_max_date_current_year]').val());
  maxMonthHighSeasonCurrentYear = new Date(maxMonthHighSeasonCurrentYear.getTime());
  maxMonthHighSeasonCurrentYear.setDate(maxMonthHighSeasonCurrentYear.getDate() + 1);
  let minMonthHighSeasonNextYear = new Date($('input[name=accommodation_high_season_min_date_year_2]').val()),
    maxMonthHighSeasonNextYear = new Date($('input[name=accommodation_high_season_max_date_year_2]').val());
  maxMonthHighSeasonNextYear = new Date(maxMonthHighSeasonNextYear.getTime());
  maxMonthHighSeasonNextYear.setDate(maxMonthHighSeasonNextYear.getDate() + 1);
  checkInDate.setDate(checkInDate.getDate() + weekStay * 7);
  let checkOutDate = checkInDate;
  let checkInDateNew = new Date(checkInDateStr);
  let isCheckOutCurrentYear = false,
    isCheckInCurrentYear = false,
    isCheckOutDateHighSeason = false,
    isCheckInDateHighSeason = false,
    isCheckInDateCurrentYear = false,
    isCheckOutDateCurrentYear = false,
    numWeeksHighSeason = 0,
    numWeeksLowSeason = 0,
    accommTotal = 0,
    lowSeasonTotal = 0,
    highSeasonTotal = 0,
    weekDiff = 0,
    weekDiffToHigh = 0,
    weekDiffInHigh = 0,
    weekDiffFromHigh = 0,
    weekDiffLow = 0,
    quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject);

  if (checkInDateNew.getFullYear() == dateNow.getFullYear()) {
    isCheckInCurrentYear = true;
  }
  if (checkOutDate.getFullYear() == dateNow.getFullYear()) {
    isCheckOutCurrentYear = true;
  }

  if (isCheckOutCurrentYear) {
    if (checkOutDate >= minMonthHighSeasonCurrentYear && maxMonthHighSeasonCurrentYear > checkOutDate) {
      isCheckOutDateHighSeason = true;
    }
  } else {
    if (checkOutDate >= minMonthHighSeasonNextYear && maxMonthHighSeasonNextYear > checkOutDate) {
      isCheckOutDateHighSeason = true;
    }
  }

  if (isCheckInCurrentYear) {
    if (checkInDateNew >= minMonthHighSeasonCurrentYear && maxMonthHighSeasonCurrentYear > checkInDateNew) {
      isCheckInDateHighSeason = true;
    }
  } else {
    if (checkOutDate >= minMonthHighSeasonNextYear && maxMonthHighSeasonNextYear > checkOutDate) {
      isCheckInDateHighSeason = true;
    }
  }

  if (highSeasonEnabled) {
    if (campusCountry == 'Canada') {
      if (isCheckInDateHighSeason && isCheckOutDateHighSeason) {
        if (isCheckInCurrentYear && isCheckOutCurrentYear) {
          weekDiff = diff_weeks(checkOutDate, checkInDateNew);
          accommTotal = highSeasonPrice * weekStay;
        } else if (isCheckInCurrentYear && !isCheckOutCurrentYear) {


          weekDiffInHigh = diff_weeks(checkInDateNew, checkOutDate);

          highSeasonTotal = weekDiffInHigh * highSeasonPrice;

          accommTotal = highSeasonTotal;


        } else if (!isCheckInCurrentYear && !isCheckOutCurrentYear) {
          weekDiff = diff_weeks(checkOutDate, checkInDateNew);
          accommTotal = highSeasonPrice * weekStay;
        }
      } else if (!isCheckInDateHighSeason && isCheckOutDateHighSeason) {
        if (isCheckInCurrentYear) {
          weekDiffToHigh = diff_weeks(minMonthHighSeasonCurrentYear, checkInDateNew);
          weekDiffInHigh = diff_weeks(checkOutDate, maxMonthHighSeasonCurrentYear);
        } else {
          weekDiffToHigh = diff_weeks(minMonthHighSeasonNextYear, checkInDateNew);
          weekDiffInHigh = diff_weeks(checkOutDate, maxMonthHighSeasonNextYear);
        }
        lowSeasonTotal = lowSeasonPrice * weekDiffToHigh;
        highSeasonTotal = highSeasonPrice * weekDiffInHigh;
        accommTotal = lowSeasonTotal + highSeasonTotal;
      } else if (isCheckInDateHighSeason && !isCheckOutDateHighSeason) {
        if (isCheckInCurrentYear) {
          weekDiffFromHigh = diff_weeks(maxMonthHighSeasonCurrentYear, checkOutDate);
          weekDiffInHigh = diff_weeks(checkInDateNew, maxMonthHighSeasonCurrentYear);

        } else {
          weekDiffFromHigh = diff_weeks(maxMonthHighSeasonNextYear, checkOutDate);
          weekDiffInHigh = diff_weeks(checkInDateNew, maxMonthHighSeasonNextYear);
        }

        lowSeasonTotal = lowSeasonPrice * weekDiffFromHigh;
        highSeasonTotal = highSeasonPrice * weekDiffInHigh;
        accommTotal = lowSeasonTotal + highSeasonTotal;
      } else if (!isCheckInDateHighSeason && !isCheckOutDateHighSeason) {
        if (isCheckInCurrentYear && isCheckOutCurrentYear) {
          weekDiff = diff_weeks(checkOutDate, checkInDateNew);
          accommTotal = lowSeasonPrice * weekStay;
        } else if (isCheckInCurrentYear && !isCheckOutCurrentYear) {
          weekDiffToHigh = diff_weeks(minMonthHighSeasonCurrentYear, checkInDateNew);
          weekDiffFromHigh = diff_weeks(maxMonthHighSeasonCurrentYear, checkOutDate);
          weekDiffInHigh = diff_weeks(maxMonthHighSeasonCurrentYear, minMonthHighSeasonCurrentYear);
          lowSeasonTotal = (weekDiffToHigh + weekDiffFromHigh) * lowSeasonPrice;
          highSeasonTotal = highSeasonPrice * weekDiffInHigh;
          accommTotal = lowSeasonTotal + highSeasonTotal;
        }
      }
    } else {

      accommTotal = lowSeasonPrice * weekStay;

    }
  } else {
    if (arrayPrice.length > 1) {
      accomPrice = lowSeasonPrice;
      for (let i = 0; i < arrayPrice.length; i++) {
        let rangeVal = arrayPrice[i].weekRange;
        if (rangeVal.indexOf('-') !== -1) {
          rangeSplit = rangeVal.split("-");
          minWeek = parseInt(rangeSplit[0]);
          maxWeek = parseInt(rangeSplit[1].replace('Weeks', ''));
        } else if (rangeVal.indexOf('+') !== -1) {
          rangeSplit = rangeVal.split("+");
          minWeek = parseInt(rangeSplit[0]);
          maxWeek = 999;
        } else {
          minWeek = parseInt(rangeVal);
          maxWeek = rangeVal;
        }
        if (weekStay >= minWeek && weekStay <= maxWeek) {
          accomPrice = arrayPrice[i].price;
        }
      }
    } else {
      accomPrice = lowSeasonPrice;
    }

    accommTotal = accomPrice * weekStay;
  }

  if (accommodationEnable == 'false') {
    resetAccommodationDates();
    accommTotal = 0,
      accommodationProgramName = 'none',
      accommodationId = 0,
      isUnderAge = 'false';
  }

  quoteJson.quote_array[editNum].accommodation.accommodation_enable = accommodationEnable;
  quoteJson.quote_array[editNum].accommodation.accommodation_total_price = accommTotal;
  quoteJson.quote_array[editNum].accommodation.airport_transfer_total_price = airportPrice;
  quoteJson.quote_array[editNum].accommodation.length_of_stay = weekStay;
  quoteJson.quote_array[editNum].accommodation.check_in_date = checkInDateStr;
  quoteJson.quote_array[editNum].accommodation.option_accommodation = accommodationProgramName;
  quoteJson.quote_array[editNum].accommodation.option_airport_transfer = airportDescription;
  quoteJson.quote_array[editNum].accommodation.option_accommodation_id = accommodationId;
  quoteJson.quote_array[editNum].accommodation.option_airport_id = airportId;
  quoteJson.quote_array[editNum].accommodation.is_under_age = isUnderAge;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));


  if (accommodationEnable == 'true') {
    setTimeout(getAccommodationPlacementFee(isCheckInCurrentYear), 300);
    setTimeout(getAccommodationCleaningFee(isCheckInCurrentYear), 300);
  }
}

const diff_weeks = function (date2, date1) {
  // The number of milliseconds in one week
  var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return hole weeks
  var diffWeek = Math.floor(difference_ms / ONE_WEEK);

  if (diffWeek < 1) {
    diffWeek = 1;
  }
  return diffWeek;
}

const clearAccommodationFields = function () {
  let quoteObject = localStorage.getItem(quoteJsonName),
    quoteJson = JSON.parse(quoteObject),
    editNum = $('input[name=quote_number]').val();
  editNum = editNum - 1;

  quoteJson.quote_array[editNum].accommodation.accommodation_total_price = 0;
  quoteJson.quote_array[editNum].accommodation.length_of_stay = 0;
  quoteJson.quote_array[editNum].accommodation.check_in_date = 'n/a';
  quoteJson.quote_array[editNum].accommodation.option_accommodation = 'none';
  quoteJson.quote_array[editNum].accommodation.option_accommodation_id = 0;
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteJson));

  $('.date-select-container,.homestay-select-container,.residence-select-container').hide();
  $('input,select', '.date-select-container').attr('disabled', true);
  $('input[name=accommodation_price_selection]').attr('disabled', true);
  $('select', '.date-select-container option:selected').prop('selected', false);
  $('input', '.homestay-select-container,.residence-select-container').attr('checked', false);
  $('input#datepicker', '.date-select-container').val('');
  $('input#weeks-select', '.date-select-container').val('Weeks');
  $('input[airport-select]', '.airport-select-container').attr('checked', false);
  $('button.next.enable', '.accommodation-selection-container').removeClass('enable').addClass('disable');
}

const printAccomodationForm = function (enable) {
  let campusName = $('input[name=campus_selection]').val(),
    isUnderAgeVal = $('input[name=is_under_age]').val(),
    isEdit = $('input[name=quote_edit]').val(),
    startDateYear = $('input[name=start_date_year]').val(),
    startDateMonth = $('input[name=start_date_month]').val(),
    startDateDay = $('input[name=start_date_day]').val(),
    dateObj = new Date(startDateYear + '-' + startDateMonth + '-' + startDateDay);
  dateObj.setDate(dateObj.getDate() - dateObj.getDay());


  $('.accommodation-price-selection-container .step-title h3.campus-name').text(campusName);

  getAirportPriceList();

  if (!enable) {
    clearAccommodationFields();
  } else {
    $(".accommodation-selection-container #datepicker").datepicker("option", { minDate: dateObj });
    printAccommodationWeekSelection();
    getHomeStayPriceList();
    getResidencePriceList();
    $('.date-select-container,.homestay-select-container,.residence-select-container').show();
    $('input#datepicker', '.date-select-container').removeAttr('disabled');
    $('input#weeks-select', '.date-select-container').removeAttr('disabled');
  }

  if (isEdit === 'true') {
    let checkInDate = $('input[name=accommodation_check_in_date]').val(),
      weekSelected = $('input[name=accommodation_length_of_stay]').val(),
      accommodationSelected = $('input[name=accommodation_group_id_selection]').val(),
      airportSelected = $('input[name=airport_id_selection]').val();
    if (enable && accommodationSelected) {
      $('input[name=accommodation_price_selection][id=' + accommodationSelected + ']').prop("checked", true);
      $('input#datepicker').val(checkInDate);
      $('input[name=week_selection]').val(weekSelected + ' Weeks');
      $('input[name=week_selection]').attr('data-selected', weekSelected);
    }
    $('input[name=airport_selection][id=' + airportSelected + ']').prop("checked", true);

    setTimeout(accommodationFormValidate, 300);

  }


  $(".accommodation-price-selection-container").click('.ui-datepicker-calendar a.ui-state-default,a.dropdown-item,input[name=accommodation_price_selection],input[name=airport_selection]', function () {

    let accommodationId = $('input[name=accommodation_price_selection]:checked').val(),
      highSeasonPrice = $('input[name=accommodation_price_selection]:checked').attr('data-max-price'),
      lowSeasonPrice = $('input[name=accommodation_price_selection]:checked').attr('data-min-price'),
      priceArray = $('input[name=accommodation_price_selection]:checked').attr('data-price-array') ? $('input[name=accommodation_price_selection]:checked').attr('data-price-array') : 'false',
      additionalNote = $('input[name=accommodation_price_selection]:checked').attr('data-additional-note'),
      additionalNotePlain = $('input[name=accommodation_price_selection]:checked').attr('data-additional-note-plain'),
      airportId = $('input[name=airport_selection]:checked').val(),
      checkInDate = $('input[id=datepicker]').val(),
      weekLength = $('input[name=week_selection]').attr('data-selected');

    $('input[name=accommodation_note]').val(additionalNote);
    $('input[name=accommodation_note_plain]').val(additionalNotePlain);
    $('input[name=accommodation_high_season_selection]').val(highSeasonPrice);
    $('input[name=accommodation_low_season_selection]').val(lowSeasonPrice);
    $('input[name=accommodation_price_array_selection]').val(priceArray);
    $('input[name=accommodation_group_id_selection]').val(accommodationId);
    $('input[name=airport_id_selection]').val(airportId);
    $('input[name=accommodation_check_in_date]').val(checkInDate);
    $('input[name=accommodation_length_of_stay]').val(weekLength);


    setTimeout(accommodationFormValidate, 300);
  });


}
const resetAccommodationDates = function () {
  $(".date-selector-container .date-check-in").val("Check-in Date");
  $(".date-selector-container .selectWeek .selectBox__value").removeClass('active').addClass('disabled').attr('data-selected', '').text('Weeks');
}
const accommodationFormValidate = function () {
  let accommodationRadioChecked = false,
    checkInDateChecked = false,
    weekChecked = false,
    dayChecked = false,
    airportChecked = false,
    priceArray = [];

  $('input[name=accommodation_price_selection]').each(function () {
    priceArray.push($(this).is(':disabled'));
  })

  if ($('input[name=accommodation_price_selection]').is(':checked') || !priceArray.includes(false)) {
    accommodationRadioChecked = true;
  }
  if ($('input#datepicker').val() != '' || $('input#datepicker').is(':disabled')) {
    checkInDateChecked = true;
  }
  if ($('.accommodation-price-selection-container input[name=week_selection]').attr('data-selected') != '0' || $('.accommodation-price-selection-container input[name=week_selection]').is(':disabled')) {
    weekChecked = true;
  }

  if ($('input[name=airport_selection]').is(':checked')) {
    airportChecked = true;
  }

  if (accommodationRadioChecked && checkInDateChecked && weekChecked && airportChecked) {
    $(".accommodation-price-selection-container button.next").removeClass('disable').addClass('enable');
  } else {
    $(".accommodation-price-selection-container button.next").removeClass('enable').addClass('disable');
  }
}

$(document).on('change', '.accommodation-selection-container .date-check-in #datepicker', function () {
  validateAccommodationAge();
});

$('body').on('click', function (e) {
  $('[data-bs-toggle=popover]').each(function () {
    // hide any open popovers when the anywhere else in the body is clicked
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide');
    }
  });
});
//end Accommoadtion option