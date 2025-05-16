const printQuoteSummaryHTML = function(quoteNum){
    
    
    let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
        quoteHTML,
        schoolName = quoteObj.school_name,
        programSchoolName = quoteObj.program_school_name,
        currency = quoteObj.quote_currency_selection;
    
  
  //temp exception note variables
  
  let exceptionStartDate = new Date('2022-11-07'),
      exceptionEndDate = new Date('2023-03-24'),
      exceptionCampusArr = ['Brisbane','Melbourne','Sydney','Perth'],
      exceptionProgramSchedule = 'Full Time Programs-Morning',
      isException = false;
    
    if(quoteObj.quote_array[quoteNum].quote_enabled){
        
        priceProgramVal = parseFloat(quoteObj.quote_array[quoteNum].program.program_total_price);
        priceStandardVal = parseFloat(quoteObj.quote_array[quoteNum].program.program_total_standard_price);
        priceRegistrationVal = parseFloat(quoteObj.quote_array[quoteNum].program.registration_fee);
        priceAdditionalVal = parseFloat(quoteObj.quote_array[quoteNum].program.additional_fee);
        priceMaterialVal = parseFloat(quoteObj.quote_array[quoteNum].program.material_fee);
        priceAccommodationVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.accommodation_total_price);
        priceAirportVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.airport_transfer_total_price);
        priceAccommodationPlacementFeeVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.placement_fee);
        prePriceQuoteTotalVal = priceProgramVal + priceRegistrationVal + priceAdditionalVal + priceMaterialVal + priceAccommodationVal + priceAirportVal + priceAccommodationPlacementFeeVal;
        priceQuoteTotalVal =  parseFloat(quoteObj.quote_array[quoteNum].quote_total_price);
        accommodationNoteVal = quoteObj.quote_array[quoteNum].accommodation.accommodation_note;
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
        printPromo = quoteObj.quote_array[quoteNum].promo.promo_auto_enabled || quoteObj.quote_array[quoteNum].promo.promo_code_enabled ? true : false;
  
        //temp exception note variables
        startDate = quoteObj.quote_array[quoteNum].program.start_date;
        startDateObj = new Date(startDate);
        
        if (startDateObj >= exceptionStartDate && startDateObj <= exceptionEndDate) {
            if(quoteObj.quote_array[quoteNum].program.option_schedule == exceptionProgramSchedule){
                if( exceptionCampusArr.includes(quoteObj.quote_array[quoteNum].campus)){
                    isException = true;
                }
            }
            
        }
    
        printExceptionHtml = isException ? "<div class='center disclaimer'><sup>**</sup>"+exceptionText+"</div>" : '';
        
        if(isException){
            quoteObj.quote_array[quoteNum].program.program_note = exceptionText;
        }
  
        //Apply Promo
  
        if(printPromo){
            promoAutoArray = [];
            promoCodeArray=[];
  
            //Apply Automatic Promo
            if(quoteObj.quote_array[quoteNum].promo.promo_auto_enabled){
            promoCode = quoteObj.quote_array[quoteNum].promo.promo_auto_code.split('|');
            promoCategory = quoteObj.quote_array[quoteNum].promo.promo_auto_category.split('|');
            promoName = quoteObj.quote_array[quoteNum].promo.promo_auto_code_name.split('|');
            promoDescription = quoteObj.quote_array[quoteNum].promo.promo_auto_description.split('|');
            promoDiscountType = quoteObj.quote_array[quoteNum].promo.promo_auto_discount_type.split('|');
            promoType = quoteObj.quote_array[quoteNum].promo.promo_auto_type.split('|');
            promoValue = quoteObj.quote_array[quoteNum].promo.promo_auto_value.split('|');
  
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
  
                promoValueInt = convertPercentDollarVal(promoAutoArray[z].promoValue,promoAutoArray[z].category,promoAutoArray[z].discountType,quoteNum);
  
                promoLineItem += "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+promoAutoArray[z].promoName+"</span></div><div class='item-notes'>"+promoAutoArray[z].description+"</div></div><div class='item-price bold promo-auto-total promo-auto-total-"+z+"'>"+quoteValueFormatter(-promoValueInt,currency)+"</div></div></div>";
                promoAutoTotalVal += parseFloat(promoValueInt);
            }
  
            promoAutoHtml = "<div class='quote-box promo-box-container promo-auto-box'>"+promoLineItem+"</div>";
            }
  
            //Apply Coupon Promo
            if(quoteObj.quote_array[quoteNum].promo.promo_code_enabled){
  
            promoValueInt = convertPercentDollarVal(quoteObj.quote_array[quoteNum].promo.promo_code_value,quoteObj.quote_array[quoteNum].promo.promo_code_category,quoteObj.quote_array[quoteNum].promo.promo_code_discount_type,quoteNum);
            
            promoCodeHtml = "<div class='quote-box promo-box-container'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[quoteNum].promo.promo_code_name+"</span></div><div class='item-notes'>"+quoteObj.quote_array[quoteNum].promo.promo_code_description+"</div></div><div class='item-price bold promo-code-total'>"+quoteValueFormatter(-promoValueInt,currency)+"</div></div></div></div>";                        
            
            }                  
        }
  
        if(priceProgramVal < priceStandardVal){
            discountVal = priceStandardVal - priceProgramVal + promoAutoTotalVal; 
            discountHtml = "<span class='discount-txt strike discount-program-price'>"+quoteValueFormatter(priceStandardVal,currency)+"</span>";
            discountTotalHtml = "<div class='total-discount-line'><div class='item-description total-title discount-title-price'>Discount Total</div><div class='item-price'><span class='discount-txt discount-total-price'>"+quoteValueFormatter(-discountVal,currency)+"</span></div></div>";
        }
  
        schoolHtml = "<div class='program-type'><span class='header'>Program</span><br><span class='result'>"+programSchoolName+"</div>";
        campusHtml = "<div class='program-type'><span class='header'>Campus</span><br><span class='result'>"+quoteObj.quote_array[quoteNum].campus+", "+quoteObj.quote_array[quoteNum].campus_country+"</div>";
        
        
        scheduleProgramHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[quoteNum].program.option_program+" - "+quoteObj.quote_array[quoteNum].program.option_schedule+"<br>("+quoteObj.quote_array[quoteNum].program.duration+" Weeks)</span></div><div class='item-notes'>Start: "+quoteObj.quote_array[quoteNum].program.start_date+" | End: "+quoteObj.quote_array[quoteNum].program.end_date+"</div></div><div class='item-price'>"+discountHtml+"<span class='bold program-price'>"+quoteValueFormatter(priceProgramVal,currency)+"</span></div></div></div>";
        
        if(priceRegistrationVal > 0){
            registrationHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Registration Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[quoteNum].program.registration_description+"</div></div><div class='item-price'><span class='bold registration-fee'>"+quoteValueFormatter(priceRegistrationVal,currency)+"</span></div></div></div>";
        }
        if(priceAdditionalVal > 0){
            additionalHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Additional Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[quoteNum].program.additional_item_name+" - "+quoteObj.quote_array[quoteNum].program.additional_fee_description+"</div></div><div class='item-price'><span class='bold additional-fee'>"+quoteValueFormatter(priceAdditionalVal,currency)+"</span></div></div></div>";
        }
        if(priceMaterialVal > 0){
            materialHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Material Fee</span></div><div class='item-notes'>per week</div></div><div class='item-price'><span class='bold material-fee'>"+quoteValueFormatter(priceMaterialVal,currency)+"</span></div></div></div>";
        }
        if(priceAccommodationVal > 0){
            accommodationPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+quoteObj.quote_array[quoteNum].accommodation.option_accommodation+"<br>("+quoteObj.quote_array[quoteNum].accommodation.length_of_stay+" Weeks)</span></div><div class='item-notes'>Check-in Date: "+quoteObj.quote_array[quoteNum].accommodation.check_in_date+"</div></div><div class='item-price'><span class='bold accommodation-price'>"+quoteValueFormatter(priceAccommodationVal,currency)+"</span></div></div></div>";
            placementFeePriceHtml = priceAccommodationPlacementFeeVal > 0 ? "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Accommodation Administration Fee</span></div></div><div class='item-price'><span class='bold placement-fee'>"+quoteValueFormatter(priceAccommodationPlacementFeeVal,currency)+"</span></div></div></div>" : '';                  
            accommodationHtml = "<div class='quote-accommodation quote-box'>"+accommodationPriceHtml+placementFeePriceHtml+"</div>";
        }
        if(priceAirportVal > 0){
            airportPriceHtml = "<div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>Airport Transfer Fee</span></div><div class='item-notes'>"+quoteObj.quote_array[quoteNum].accommodation.option_airport_transfer+"</div></div><div class='item-price'><span class='bold airport-fee'>"+quoteValueFormatter(priceAirportVal,currency)+"</span></div></div></div>";
            airportHtml = "<div class='quote-airport quote-box'>"+airportPriceHtml+"</div>";
        }
        
        if(accommodationNoteVal != 'none'){
            accommodationNoteHtml = "<div class='center footnote'>"+accommodationNoteVal+"</div>";
        }
  
        insuranceText = 'All ELS students must have medical insurance coverage while in the U.S.A. If you cannot provide evidence of sufficient coverage, in English, you must purchase the ELS Student Health Plan. The Student Health Plan is offered to ELS students at a non-refundable fee of $50 per week. You will receive additional information about the Student Health Plan when you arrive at the center.';
        insuranceNoteHtml = "<div class='center footnote'>"+insuranceText+"</div>";
  
        priceNoteText= '<sup>*</sup>The prices shown are not valid for government-sponsored business.';
        priceNoteHtml = "<div class='center footnote'>"+priceNoteText+"</div>";
        
        totalPriceHtml = "<div class='line-item'>"+discountTotalHtml+"<div><div class='item-description total-title bold'>TOTAL</div><div class='item-price bold total-price'>"+quoteValueFormatter(priceQuoteTotalVal,currency)+"</div></div></div>";                
        quoteHTML = "<div class='col col-md-12 col-quote-"+quoteNum+"'><div class='quote-select-container'><div class='quote-items'><div class='quote-location'>"+schoolHtml+campusHtml+"</div><div class='quote-program-schedule quote-box'>"+scheduleProgramHtml+registrationHtml+additionalHtml+materialHtml+"</div>"+accommodationHtml+airportHtml+promoAutoHtml+"<div class='promo-code-box'>"+promoCodeHtml+"</div>"+printExceptionHtml+"<div class='quote-box total-price-container'>"+totalPriceHtml+"</div>"+accommodationNoteHtml+priceNoteHtml+insuranceNoteHtml+"</div><div class='promo-container'><label for='input-promo-code-"+quoteNum+"'>Enter Promo Code</label><div><div id='promo-feedback-"+quoteNum+"' class='promo-feedback'></div></div><div></div>"; 
        
        
    }
  
    return quoteHTML;
  };

const getSchoolPayment = function(){
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject),
        currencyValue = destinationCurrency = $('input[name=destination_currency_selection]').val(),
        schoolId = $('input[name=school_type_id_selection]').val(),
        tableId = paymentTable,
        queryParam = '&currency__in='+currencyValue+'&schools__in='+schoolId;
    api_url = apiUrl+tableId+'/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);
    priceArray = [];

   
        $.get(api_url).done(function (data) {
            let dataObject = data.results;
            if (dataObject.length > 0) {
                for (let i = 0; i < dataObject.length; i++) {
                   priceArray.push(dataObject[i].values.price);
                }
                depositVal = Math.min(priceArray);
                depositTotalVal = depositVal.toFixed(2);
            }else{
                depositTotalVal = parseInt(depositAmt).toFixed(2);
            }
            quoteObj.quote_deposit_amount_selection = depositTotalVal;

            localStorage.setItem('quote-obj', JSON.stringify(quoteObj));
        });

}
  
  
  const printQuoteSnap = function(quoteNum){
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject),
        quoteVal = parseInt(quoteNum) + 1,
        quoteTotal = parseFloat(quoteObj.quote_array[quoteNum].quote_total_price),
        quoteCurrency = quoteObj.quote_array[quoteNum].show_currency,
        depositVal = parseFloat(quoteObj.quote_deposit_amount_selection),
        destinationCurrency = $('input[name=destination_currency_selection]').val(),
        xRate = $('input[name=quote_'+quoteVal+'_exchange_rate]').val(),
        depositAmountDestination = depositVal*xRate;       
    
    totalAmountVal = quoteTotal.toFixed(2),
    depositTotalVal = depositAmountDestination.toFixed(2),
    showDepositAmount = quoteCurrency == destinationCurrency ? depositVal : depositTotalVal,
    quoteObj.quote_total_amount_selection = totalAmountVal,
    quoteObj.quote_currency_selection = quoteCurrency,
    quoteObj.quote_deposit_amount_currency = destinationCurrency,
    quoteObj.quote_selection = quoteVal,
    localStorage.setItem('quote-obj', JSON.stringify(quoteObj));
  
    quoteTotalSummaryHtml = '<tr> <td>Total Booking Value:</td> <td>'+quoteValueFormatter(totalAmountVal,quoteCurrency)+'</td> </tr> <tr> <td>Deposit payable to secure your place:</td> <td>'+quoteValueFormatter(showDepositAmount,quoteCurrency)+'</td> </tr>',
    quoteDetailSummaryHtml = printQuoteSummaryHTML(quoteNum);
  
    
    quoteSummaryHtml = '<table class="quote-summary-tbl">'+quoteTotalSummaryHtml +'</table><div class="btn-container"><button class="btn btn-orange center" style="min-width:200px;" id="view-quote-breakdown">View quote breakdown</button></div><div id="quote-summary-selection-container"><div class="btn-container" style="display:none;"><button id="print-quote"><i class="fas fa-print"></i></button></div>'+quoteDetailSummaryHtml+'</div>';
  
    $('.quote-details','#quote-enroll-container').html(quoteSummaryHtml);
    $(document).on("click", "#print-quote", function() {
        $('#quote-summary-selection-container').printThis({
            importCSS: true,
            printContainer: true
        });
    });
  }
  const printEnrollForm = function(quoteNum){
    let studentInfoClassName = 'enroll-form-details',
        categoryStudentName = 'Student';
    
    printPersonForm(studentInfoArray,false,categoryStudentName,studentInfoClassName,quoteNum);
  }
  
  const printPersonForm = function (formArray, enabled, categoryName, className,quoteNum) {
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject);
  
    let result = formArray.filter(formArray => formArray.category == categoryName),
        dateVar = $('.date-picker').length,
        dInt = '',
        countrySelected = quoteObj.quote_array[quoteNum].campus_country,
        parentSchool = schoolName,
        applicationName = 'Student';
  
    for (let stForm in result) {
  
        let inputName,
            inputLabel,
            labelId,
            labelForm,
            inputForm,
            optionHtml = "",
            classWidth = "",
            inputFormHtml,
            printInput = true;
  
        inputName = result[stForm].inputName;
        labelId = _.camelCase(inputName);
        value = result[stForm].value;
        helpTxt = result[stForm].helpText ? '<sup><i class="fas fa-info-circle" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="right" data-content="' + result[stForm].helpText + '"></i></sup>' : '';
        groupClass = result[stForm].groupClass ? result[stForm].groupClass : '' ;
        requiredValue = result[stForm].requiredDependence ? result[stForm].requiredDependence.includes(schoolName) ? "required" : "" : result[stForm].required == true ? "required" : "";
        inputLabel = requiredValue == 'required' ? result[stForm].inputLabel + "<sup>*</sup>" : result[stForm].inputLabel;
        disabledVal = '';
  
  
        if (result[stForm].countryDependence) {
            if (!result[stForm].countryDependence.includes(countrySelected)) {
                printInput = false;
            }
        }
        
        if (!result[stForm].displayShow) {
            printInput = false;
        }
  
        if (result[stForm].disabled) {
            disabledVal = result[stForm].disabled ? 'disabled' : '';
        }
        if (result[stForm].applicationRestriction) {
            ar = result[stForm].applicationRestriction.split(',');
        }
        if (result[stForm].schoolParentDependence) {
            if (!result[stForm].schoolParentDependence.includes(parentSchool)) {
                printInput = false;
            }
        }
  
        if(result[stForm].omitProgramType){
            if(result[stForm].omitProgramType.includes(countrySelected)){
                printInput = false;
            }
        }
  
        applicationStatus = !result[stForm].applicationRestriction ? true : ar.indexOf(applicationName) != -1 ? false : true;
  
        if (applicationStatus) {
            if (printInput) {
                if (!enabled) {
                    if (result[stForm].category == categoryName) {
  
                        switch (result[stForm].inputType) {
                            case 'text':
  
                                inputForm = "<input type='text' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' " + disabledVal + " value='" + value + "'>";
                                break;
                            case 'text-area':
                                classWidth = 'full-width';
                                inputForm = "<textarea class='form-control' rows='" + result[stForm].rows + "' cols='60' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "'  " + disabledVal + "></textarea>";
                                break;
                            case 'phone':
                                inputForm = "<input type='tel' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' placeholder='example: +1 123 123 12345' value='" + value + "'  " + disabledVal + ">";
                                break;
                            case 'email':
                                dataMessage = inputName == 'student_email_confirm' ? 'data-msg="Please make sure confirm email matches to email."' : '';
                                inputForm = "<input type='email' class='form-control' id='" + labelId + dInt + "' "+dataMessage+" name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' value='" + value + "'  " + disabledVal + ">";
                                break;
                            case 'dropdown':
                                if (result[stForm].obj) {
                                    for (let optionList in result[stForm].obj) {
                                        optionValue = result[stForm].obj[optionList];
                                        optionHtml += "<option value='" + optionValue + "'>" + optionValue + "</option>";
                                    }
                                }
                                inputForm = "<select class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' " + disabledVal + "><option disabled selected value=''>Choose " + result[stForm].inputLabel + "</option>" + optionHtml + "</select>";
                                break;
                            case 'date-time':
                                inputForm = "<input type='text' value='" + value + "' class='form-control date-picker' id='" + categoryName +"-"+inputName+ "-datePicker-" + dateVar + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " placeholder='YYYY-MM-DD' data-category='" + categoryName + "'  " + disabledVal + " onkeydown='event.preventDefault()'>";
                                break;
                            case 'date-time-expiry':
                                inputForm = "<input type='text' value='" + value + "' class='form-control date-picker-expiry' id='" + categoryName +"-"+inputName+ "-datePicker-" + dateVar + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " placeholder='YYYY-MM-DD' data-category='" + categoryName + "'  " + disabledVal + " onkeydown='event.preventDefault()'>";
                                break;
                            case 'checkbox':
                                preHtml = '';
                                postHtml = '';
                                preContainerHtml = '';
                                postContainerHtml = '';
  
                                if (result[stForm].preHtml) {
                                    preHtml = result[stForm].preHtml;
                                    preContainerHtml = '<div class="checkbox-container study-box-container">';
                                }
                                if (result[stForm].postHtml) {
                                    postHtml = result[stForm].postHtml;
                                    postContainerHtml = '</div>';
                                }
                                inputForm = preContainerHtml + preHtml + "<div class='checkbox-line'><input type='checkbox' value='" + value + "' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' " + disabledVal + "><label for=" + labelId + dInt + ">" + inputLabel + helpTxt + "</label></div>" + postHtml + postContainerHtml;
                                break;
                            case 'radio-option':
                                if (result[stForm].obj) {
                                    for (let optionList in result[stForm].obj) {
                                        optionValue = result[stForm].obj[optionList].optionValue;
                                        optionLabel = result[stForm].obj[optionList].optionLabel;
                                        otherClass = result[stForm].obj[optionList].optionType == 'option-other' || result[stForm].obj[optionList].optionType == 'option-add' || result[stForm].obj[optionList].optionType == 'option-multi' ? 'other-input' : 'indenpendent-input';
  
                                        optionHtml += '<div class="form-check" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + optionList + dInt + '" value="' + optionValue + '" ' + requiredValue + ' ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + optionList + '">' + optionLabel + '</label></div>';
  
                                        if (result[stForm].obj[optionList].optionType == 'option-other') {
                                            depClass = result[stForm].obj[optionList].dependentClass ? 'dependent-target study-hide' : '';
                                            depTarget = result[stForm].obj[optionList].dependentClass ? result[stForm].obj[optionList].dependentClass : '';
                                            optionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].placeholder + "' " + disabledVal + ">"
                                        }
  
                                        if (result[stForm].obj[optionList].optionType == 'option-add') {
                                            optionHtml += '<div class="btn-container dependent-target study-hide"><div id="' + result[stForm].obj[optionList].addClass + '" class="btn btn-orange-outline">' + result[stForm].obj[optionList].buttonLabel + '</div></div><div class="' + result[stForm].obj[optionList].addClass + '-container"></div>';
                                        }
  
                                        if (result[stForm].obj[optionList].optionType == 'option-multi') {

                                            multiOptionHtml = '';

                                            for (let mo = 0; mo < result[stForm].obj[optionList].optionMultiObj.length; mo++) {

                                                inputName = result[stForm].obj[optionList].optionMultiObj[mo].inputName;
                                            labelId = _.camelCase(inputName);
                                                requiredValue = result[stForm].obj[optionList].optionMultiObj[mo].required == true ? "required" : "";
                                                dependentLabel = result[stForm].obj[optionList].optionMultiObj[mo].inputLabel;
                                                multiOptionHtml += '<legend class="dependent-target study-hide">' + dependentLabel + '</legend>';
                                                disabledVal = 'disabled';

                                                for (let i = 0; i < result[stForm].obj[optionList].optionMultiObj[mo].obj.length; i++) {
  
                                                    optionValue = result[stForm].obj[optionList].optionMultiObj[mo].obj[i].optionValue;
                                                    optionLabel = result[stForm].obj[optionList].optionMultiObj[mo].obj[i].optionLabel;
                                                    otherClass = result[stForm].obj[optionList].optionMultiObj[mo].obj[i].optionType == 'option-other' ? 'other-input' : 'indenpendent-input';
  
                                                    multiOptionHtml += '<div class="form-check multi-target dependent-target study-hide" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + i + dInt + '" value="' + optionValue + '" ' + requiredValue + ' ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + i + '">' + optionLabel + '</label></div>';
  
                                                    if (result[stForm].obj[optionList].optionMultiObj[mo].obj[i].optionType == 'option-other') {
                                                        depClass = result[stForm].obj[optionList].optionMultiObj[mo].obj[i].dependentClass ? 'dependent-target study-hide' : '';
                                                        depTarget = result[stForm].obj[optionList].optionMultiObj[mo].obj[i].dependentClass ? result[stForm].obj[optionList].optionMultiObj[mo].obj[i].dependentClass : '';
                                                        multiOptionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionMultiObj[mo].obj[i].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].optionMultiObj[mo].obj[i].placeholder + "' " + disabledVal + ">";
                                                }
                                            }
                                            }

                                            optionHtml += "<div class='dependent-group'>"+multiOptionHtml+"</div>";
  
                                        }
  
                                    }
                                }
                                inputForm = optionHtml;
                                break;
  
                        }
  
                        if (result[stForm].inputType == 'radio-option') {
                            labelForm = "<legend>" + inputLabel + helpTxt + "</legend>";
                        } else if (result[stForm].inputType == 'checkbox') {
                            labelForm = '';
                        } else {
                            labelForm = "<label for=" + labelId + dInt + ">" + inputLabel + helpTxt + "</label>";
                        }
                        validationForm = "<div class='valid-feedback'></div>"
                        if (inputForm) {
                            inputFormHtml = labelForm + inputForm + validationForm;
                        }
                        if (inputFormHtml) {
  
                            if (result[stForm].hidden) {
                                hideForm = result[stForm].hidden ? 'study-hide' : 'study-show';
                            } else {
                                hideForm = 'study-show';
                            }
                            if(inputName == 'student_email'){
                                $('.form-parent-'+groupClass,'.'+className).append("<div class='form-group full-width email-group' style='width:100%;'></div>");
                            }
                            groupName = groupClass != '' ? 'form-group-'+groupClass : '';
  
                            if(inputName == 'student_email' || inputName == 'student_email_confirm'){
                                $('.form-parent-'+groupClass+' .email-group','.'+className).css('display','flex').append("<div class='form-group " + classWidth + " " + hideForm + " " + groupName + "'>" + inputFormHtml + "</div>");
                            }else{
  
                                displayVal = groupClass == 'agent' || groupClass == 'additional' ? 'none' : 'flex'; 
                            
                                $('.form-parent-'+groupClass,'.'+className).css('display',displayVal).append("<div class='form-group " + classWidth + " " + hideForm + " " + groupName + "'>" + inputFormHtml + "</div>");
                               
                            }
                           
  
                        }
                    }
                }
            }
        }
    }
    $(function () {
        $('.date-picker').each(function () {
            let newDate = new Date();
                newDate.setFullYear(newDate.getFullYear() - 20);
                newDate.setMonth(0);
                newDate.setDate(1);
  
            $(this).datepicker(
                {
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-70:-10",
                    defaultDate: newDate,
                    onSelect: function (dateText) {
                        dateObj = new Date(dateText);
                        $(this).attr('data-value', dateObj.getTime());
                    }
  
                }
            )
        });
    });
    $(function () {
        $('.date-picker-expiry').each(function () {
            $(this).datepicker(
                {
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-00:+11",
                    onSelect: function (dateText) {
                        dateObj = new Date(dateText);
                        $(this).attr('data-value', dateObj.getTime());
                    }
  
                }
            );
        });
    });
  };
  
  
  $("#quote-price-container #quote-selection-container").on('click','button.quote-enroll',function(){
    let editNum = $(this).attr('data-edit-num'),
        quoteNum = parseInt(editNum) - 1,
        dataTarget = $(this).attr('data-target');
        if(dataTarget){
          el = $('#'+dataTarget);
          slideIndex = $('.quote-step-slide .quote-slide').index(el);
          $('.quote-step-slide').slick("slickGoTo", slideIndex);
          window.scrollTo(0,0);
          $(this).parent().parent().parent().next().find('.step-container').attr('data-complete',true);
          printQuoteSnap(quoteNum);
          printEnrollForm(quoteNum);
        }
  });
  
  $("#quote-enroll-container").on('click','button#view-quote-breakdown',function(){
    let el = '#quote-summary-selection-container',
        elBtn = 'button#view-quote-breakdown';
    $(el).slideToggle(400,function(){
        if($(el).is(':visible')){
            $(elBtn).text('Hide quote breakdown');
        }else{
            $(elBtn).text('View quote breakdown');
        }
    });
    
  });
  
  
$("#quote-enroll-container").on('click','input[name=online_applicant_status],input[name=applicant_student_current_agency]',function(){
    let el = '.form-parent-agent';
        elVal = $(this).val();
  
        if(elVal == 'Agent' || elVal == 'Yes'){
            $(el).slideDown(400);
            $('input',el).attr('disabled',false);
        }else{
            if($(el).is(':visible')){
                $(el).slideUp(400);
                $('input',el).attr('disabled',true);
            }
        }
  });
  
  $("#quote-enroll-container").on('click','input[name=applicant_age_status]',function(){
    let el = '.form-parent-additional';
        elVal = $(this).val();
        $(el).show();
  
        console.log(elVal);
        if(elVal == 'Yes'){
            $( "input[name*='emergency']" ).each(function( index ) {
                $(this).attr('disabled',false).show();
                $(this).siblings('label').show();
                $(this).parent().show();
            });
            $( "input[name*='guardian']" ).each(function( index ) {
                $(this).attr('disabled',true).hide();
                $(this).siblings('label').hide();
                $(this).parent().hide();
            });
        }else{
            $( "input[name*='emergency']" ).each(function( index ) {
                $(this).attr('disabled',true).hide();
                $(this).siblings('label').hide();
                $(this).parent().hide();
            });
            $( "input[name*='guardian']" ).each(function( index ) {
                $(this).attr('disabled',false).show();
                $(this).siblings('label').show();
                $(this).parent().show();
            });
        }
  });