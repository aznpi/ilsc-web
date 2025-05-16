const convertPercentDollarVal = function(promoVal,category,discountType,quoteNum){

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      priceProgramVal = parseFloat(quoteObj.quote_array[quoteNum].program.program_total_price),
      priceRegistrationVal = parseFloat(quoteObj.quote_array[quoteNum].program.registration_fee),
      priceAdditionalVal = parseFloat(quoteObj.quote_array[quoteNum].program.additional_fee),
      priceMaterialVal = parseFloat(quoteObj.quote_array[quoteNum].program.material_fee),
      priceAccommodationVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.accommodation_total_price),
      priceAirportVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.airport_transfer_total_price),
      priceAccommodationPlacementFeeVal = parseFloat(quoteObj.quote_array[quoteNum].accommodation.placement_fee),
      prePriceQuoteTotalVal = priceProgramVal + priceRegistrationVal + priceAdditionalVal + priceMaterialVal + priceAccommodationVal + priceAirportVal + priceAccommodationPlacementFeeVal;

      categoryTotal = category == 'Total Fee' ? prePriceQuoteTotalVal : category == 'Registration Fee' ? priceRegistrationVal : category == 'Material Fee' ? priceMaterialVal : category == 'Programs' ?  priceProgramVal : category == 'Facility Fee' ? priceAdditionalVal : prePriceQuoteTotalVal;

      promoValueInt = discountType == 'Dollar' ? parseFloat(promoVal) : discountType == 'Percent' ? categoryTotal*(parseFloat(promoVal)/100) : promoVal;
      
  return promoValueInt.toFixed(2);
};

//Promo Code Discounts
const applyPromo = function(promoArray,promoType,quoteNum){

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      promoQuoteValidArray = [];

if(promoType == 'Automatic'){
  for(let a = 0; a < quoteObj.quote_array.length; a++){
    quoteObj.quote_array[a].promo.promo_auto_enabled = false;
    quoteObj.quote_array[a].promo.promo_code_enabled = false;
  }
  for (let i = 0; i < promoArray.length; i++) {
    
      if(promoArray[i].promoType == 'Automatic'){
       
        for (let s = 0; s < promoArray[i].promoValid.length; s++) {
          quoteValid = promoArray[i].promoValid[s].valid == true ? promoArray[i].promoValid[s].quote : false;

          if(quoteValid != false){
          
            promoQuoteValidArray.push({
              'quote': quoteValid,
              'code': promoArray[i].promoCode,
              'name': promoArray[i].promoName,
              'description': promoArray[i].promoDescription,
              'category': promoArray[i].promoCategory,
              'discountType': promoArray[i].promoDiscountType,
              'type': promoArray[i].promoType,
              'valueAmount': promoArray[i].promoValue.toString()
            });
            
          }
        }  
      }
    }

    let concat = promoQuoteValidArray.flat().reduce((a, i) => {
      const f = a.find(f => f.quote === i.quote);
      if (!f){ 
        a.push(i);
      }else{
        f.code = f.code.concat('|'+i.code);
        f.name = f.name.concat('|'+i.name);
        f.description = f.description.concat('|'+i.description),
        f.category = f.category.concat('|'+i.category),
        f.discountType = f.discountType.concat('|'+i.discountType),
        f.type = f.type.concat('|'+i.type),
        f.valueAmount = f.valueAmount.concat('|'+i.valueAmount);
      }
      return a;
    },[]);

    if(concat.length > 0){
      for (let w = 0; w < concat.length; w++) {
        quoteNumVal = concat[w].quote - 1;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_code = concat[w].code;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_code_name = concat[w].name;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_description = concat[w].description;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_category = concat[w].category;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_discount_type = concat[w].discountType;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_type = concat[w].type;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_value = concat[w].valueAmount;
        quoteObj.quote_array[quoteNumVal].promo.promo_auto_enabled = true;

      }
    }

  }else if(promoType == 'Coupon'){
    
    for (let c = 0; c < promoArray.length; c++) {
      quoteNumVal = quoteNum - 1;
      fromCurrency = quoteObj.country_origin_currency;
      toCurrency = quoteObj.quote_array[quoteNumVal].show_currency;
      conversionRate = fromCurrency != toCurrency ? $('input[name=quote_'+quoteNum+'_exchange_rate]').val() : 1;
      priceProgramVal = parseInt(quoteObj.quote_array[quoteNumVal].program.program_total_price)/conversionRate;
      priceStandardVal = parseInt(quoteObj.quote_array[quoteNumVal].program.program_total_standard_price)/conversionRate;
      promoAutoTotalVal = 0;
      discountVal = 0;

      if(promoArray[c].promoType == 'Coupon'){
        $('#promo-feedback-'+quoteNum).html('<span><i class="fad fa-spinner-third spinner"></i></span>');
        if(promoArray[c].promoValid == true){

          promoCodeVal = convertPercentDollarVal(promoArray[c].promoValue,promoArray[c].promoCategory,promoArray[c].promoDiscountType,quoteNumVal);
          promoCodeValue = parseInt(promoCodeVal)/conversionRate;
          totalPrice = parseInt(quoteObj.quote_array[quoteNumVal].quote_total_price)/conversionRate;

          if(quoteObj.quote_array[quoteNumVal].promo.promo_auto_enabled){
            promoAutoStr = quoteObj.quote_array[quoteNumVal].promo.promo_auto_value.toString();
            promoAutoArray = promoAutoStr.split('|');
            promoAutoCatStr =  quoteObj.quote_array[quoteNumVal].promo.promo_auto_category.toString();
            promoAutoCatArray = promoAutoCatStr.split('|');
            promoAutoTypeStr = quoteObj.quote_array[quoteNumVal].promo.promo_auto_discount_type.toString();
            promoAutoTypeArray = promoAutoTypeStr.split('|');



            for(let p = 0; p < promoAutoArray.length; p++){
              promoAutoVal = convertPercentDollarVal(promoAutoArray[p],promoAutoCatArray[p],promoAutoTypeArray[p],quoteNumVal);
              promoAutoTotalVal += parseInt(promoAutoVal);
            }
      
            promoAutoTotalVal = promoAutoTotalVal/conversionRate;
            
          }       
          
          quoteObj.quote_array[quoteNumVal].promo.promo_code = promoArray[c].promoCode;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_name = promoArray[c].promoName;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_description = promoArray[c].promoDescription;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_category = promoArray[c].promoCategory;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_discount_type = promoArray[c].promoDiscountType;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_type = promoArray[c].promoType;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_value = promoCodeValue;
          quoteObj.quote_array[quoteNumVal].promo.promo_code_enabled = true;

          discountVal = priceProgramVal < priceStandardVal ? priceStandardVal - priceProgramVal + promoAutoTotalVal + promoCodeValue : 0; 
      
          if(discountVal > 0){
            discountVal = discountVal.toFixed();
            $('.discount-total-price','.col-quote-'+quoteNum).html(currencyModFormatter(discountVal,toCurrency));
          }

          totalQuoteAmount =  totalPrice - promoCodeValue;
          totalQuoteAmount = totalQuoteAmount/conversionRate;

          $('input[name=promo_code]','.col-quote-'+quoteNum).val(promoArray[c].promoCode);
          $('#promo-feedback-'+quoteNum).html('<span>Valid Coupon <i class="fas fa-check-circle" style="color:#04b813;"></i></span>');
          printPromoCoupon(promoArray,quoteNum);
        }else{
          totalQuoteAmount = quoteObj.quote_array[quoteNumVal].quote_total_price/conversionRate;

          quoteObj.quote_array[quoteNumVal].promo.promo_code_enabled = false;
          $('input[name=promo_code]','.col-quote-'+quoteNum).val('false');
          $('.promo-code-box','.col-quote-'+quoteNum).empty();
          $('#promo-feedback-'+quoteNum).html('<span>Sorry, this promo code does not qualify for this quote. <i class="fas fa-times-circle" style="color:#c71104;"></i></span>');
        }
      }
    }
    $('.total-price','.col-quote-'+quoteNum).html(currencyModFormatter(totalQuoteAmount.toFixed(),toCurrency));
  }
  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));

};
const printPromoCoupon = function(promoArray,quoteNum){
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      quoteVal = quoteNum - 1,
      toCurrency = quoteObj.quote_array[quoteVal].show_currency,
      conversionRate = fromCurrency != toCurrency ? $('input[name=quote_'+quoteNum+'_exchange_rate]').val() : 1;
      

  if(promoArray[0].promoValid == true){

    promoCodVal = convertPercentDollarVal(promoArray[0].promoValue,promoArray[0].promoCategory,promoArray[0].promoDiscountType,quoteVal);

    promoCodeValue = promoCodVal/conversionRate;
    promoCodeValue = promoCodeValue.toFixed();

    promoLineItem = "<div class='quote-box promo-box-container'><div class='line-item'><div><div class='item-description'><div class='item-label'><span class='label-title bold'>"+promoArray[0].promoName+"</span></div><div class='item-notes'>"+promoArray[0].promoDescription+"</div></div><div class='item-price bold promo-code-total'>"+currencyModFormatter(-promoCodeValue,toCurrency)+"</div></div></div></div>";

    $('.promo-code-box','.col-quote-'+quoteNum).html(promoLineItem);
  }else{
    resetPromoCode(quoteNum);
  }
}
const validatePromoCoupon = function(promoArray,quoteNum){

  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      todayDate = new Date(),
      todayDateVal = todayDate.getTime(),
      dateValidVal = false,
      schoolValidVal = false,
      arrayNum = quoteNum - 1;
    
    for (let i = 0; i < promoArray.length; i++) {

        //Validate School
        
        schoolValidVal = promoArray[i].rules.schoolDependence != false ? promoArray[i].rules.schoolDependence.includes(quoteObj.school_id) ? true : false :true;
        
        //Valdiate Date
        dateValidVal = promoArray[i].rules.promoStartDate <= todayDateVal && promoArray[i].rules.promoEndDate >= todayDateVal ? true : false;

        if(schoolValidVal && dateValidVal){
          promoArray[i].promoValid =  true;
        }else{
          promoArray[i].promoValid =  false;
        }
        
    }

    //Validate promo on each quote
    if(schoolValidVal && dateValidVal){
        
        for (let s = 0; s < promoArray.length; s++) {
          
              if(quoteObj.quote_array[arrayNum].quote_enabled){
                  let campusValid = true,
                      lsProgramValid = true,
                      gcProgramValid = true
                      programValid = true,
                      programDateValid = true,
                      scheduleValid = true,
                      marketValid = true,
                      minWeeksValid = true;
                  
                  //Validate Campus
                              
                    campusValid =  promoArray[s].rules.campusDependence != false ? promoArray[s].rules.campusDependence.includes(quoteObj.quote_array[arrayNum].campus_id) ? true : false : true;
                  
                  //Validate Programs
                  if(promoArray[s].rules.lsProgramsDependence != false || promoArray[s].rules.gcProgramsDependence != false){
                      if(promoArray[s].rules.lsProgramsDependence != false){
                        lsProgramValid = promoArray[s].rules.lsProgramsDependence.includes(quoteObj.quote_array[arrayNum].program.program_id) ? true : false;
                      }
                      if(promoArray[s].rules.gcProgramsDependence != false){
                        gcProgramValid = promoArray[s].rules.gcProgramsDependence.includes(quoteObj.quote_array[arrayNum].program.program_price_id) ? true : false;
                      }
                      
                      programValid = lsProgramValid && gcProgramValid ? true : false;
                      
                  }

                  //Validate Market
                            
                    marketValid = promoArray[s].rules.marketDependence != false ? promoArray[s].rules.marketDependence.includes(quoteObj.quote_array[arrayNum].market_price_id) ? true : false : true;

                  //Validate Program Dates
                  if(promoArray[s].rules.programStartDate != false && promoArray[s].rules.programEndDate != false){
                    let  startDateArray = quoteObj.quote_array[x].program.start_date.split('-'),
                          month = startDateArray[1].length = 1 ? "0"+startDateArray[1] : startDateArray[1],
                          day = startDateArray[2].length = 1 ? "0"+startDateArray[2] : startDateArray[2],
                          programStartDateObj = new Date(startDateArray[0]+"-"+month+"-"+day),
                          programStartDateVal = programStartDateObj.getTime();
                      
                          programDateValid = promoArray[s].rules.programStartDate <= programStartDateVal && promoArray[s].rules.programEndDate >= programStartDateVal ? true : false;
                  
                        }

                  //Validate Schedule
                  
                    scheduleValid = promoArray[s].rules.programSchedule != false ? promoArray[s].rules.programSchedule == quoteObj.quote_array[arrayNum].program.option_schedule ? true : false : true;

                  //Validate Min Weeks

                    minWeeksValid = promoArray[s].rules.minWeeks != false ? promoArray[s].rules.minWeeks < parseInt(quoteObj.quote_array[arrayNum].program.duration) ? true : false : true;
                    
                  
                  if(campusValid && programValid && scheduleValid && programDateValid && marketValid && minWeeksValid){
                    valid = true;
                  }else{
                    valid = false;
                  }               
              }
              
          promoArray[s].promoValid = valid;
        }
    }

  applyPromo(promoArray,'Coupon',quoteNum);

};
const validatePromoAuto = function(promoArray){

    let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
        quotePromoValidArray = [],
        todayDate = new Date(),
        todayDateVal = todayDate.getTime(),
        dateValidVal = false,
        schoolValidVal = false;
    
    

        //Validate promo on each quote
        
            
            for (let s = 0; s < promoArray.length; s++) {
              quotePromoValidArray = [];

              //Validate School
              schoolValidVal = promoArray[s].rules.schoolDependence != false ? promoArray[s].rules.schoolDependence.includes(quoteObj.school_id) ? true : false : true;

              

              //Valdiate Date
              dateValidVal = promoArray[s].rules.promoStartDate <= todayDateVal && promoArray[s].rules.promoEndDate >= todayDateVal ? true : false;

             

              for (let x = 0; x < quoteObj.quote_array.length; x++) {
                  if(quoteObj.quote_array[x].quote_enabled){
                                  
                      let campusValid = true,
                          lsProgramValid = true,
                          gcProgramValid = true
                          programValid = true,
                          programDateValid = true,
                          scheduleValid = true,
                          marketValid = true,
                          minWeeksValid = true,
                          quoteNum = x+1;
                      
                      //Validate Campus
                                      
                        campusValid =  promoArray[s].rules.campusDependence != false ? promoArray[s].rules.campusDependence.includes(quoteObj.quote_array[x].campus_id) ? true : false : true;

                      
                      
                      //Validate Programs
                      if(promoArray[s].rules.lsProgramsDependence != false || promoArray[s].rules.gcProgramsDependence != false){
                          if(promoArray[s].rules.lsProgramsDependence != false){
                            lsProgramValid = promoArray[s].rules.lsProgramsDependence.includes(quoteObj.quote_array[x].program.program_id) ? true : false;
                          }
                          if(promoArray[s].rules.gcProgramsDependence != false){
                            gcProgramValid = promoArray[s].rules.gcProgramsDependence.includes(quoteObj.quote_array[x].program.program_price_id) ? true : false;
                          }

                          console.log('ls: '+lsProgramValid);
                          console.log('gs: '+gcProgramValid);
                          
                          programValid = lsProgramValid && gcProgramValid ? true : false;

                      }

                      

                      //Validate Market

                        marketValid = promoArray[s].rules.marketDependence != false ? promoArray[s].rules.marketDependence.includes(quoteObj.quote_array[x].market_price_id) ? true : false : true;

              

                      //Validate Program Dates
                      if(promoArray[s].rules.programStartDate != false && promoArray[s].rules.programEndDate != false){
                        let  startDateArray = quoteObj.quote_array[x].program.start_date.split('-'),
                              month = startDateArray[1].length = 1 ? "0"+startDateArray[1] : startDateArray[1],
                              day = startDateArray[2].length = 1 ? "0"+startDateArray[2] : startDateArray[2],
                              programStartDateObj = new Date(startDateArray[0]+"-"+month+"-"+day),
                              programStartDateVal = programStartDateObj.getTime();
                          
                              programDateValid = promoArray[s].rules.programStartDate <= programStartDateVal && promoArray[s].rules.programEndDate >= programStartDateVal ? true : false;
                      
                                  
                            }
                      
                      
                      //Validate Schedule
                      
                        scheduleValid = promoArray[s].rules.programSchedule != false ? promoArray[s].rules.programSchedule == quoteObj.quote_array[x].program.option_schedule ? true : false : true;

                      
                      //Validate Min Weeks

                        minWeeksValid = promoArray[s].rules.minWeeks != false ? promoArray[s].rules.minWeeks < parseInt(quoteObj.quote_array[x].program.duration) ? true : false : true;

                        console.log('campus: '+ campusValid);
                        console.log('program: '+ programValid);
                        console.log('schedule: '+ scheduleValid);
                        console.log('programDate: '+ programDateValid);
                        console.log('market: '+ marketValid);
                        console.log('school: '+ schoolValidVal);
                        console.log('date: '+ dateValidVal);
                        console.log('minWeeks: '+ minWeeksValid);
                      
                      if(campusValid && programValid && scheduleValid && programDateValid && marketValid && schoolValidVal && dateValidVal && minWeeksValid){
                          quotePromoValidArray.push({
                            'quote': parseInt(quoteNum),
                            'valid': true
                          });
                      }else{
                        quotePromoValidArray.push({
                          'quote': parseInt(quoteNum),
                          'valid': false
                        });
                      }               
                  }     
              }
              promoArray[s].promoValid = quotePromoValidArray;
            }
        
    
    console.log(promoArray);
    applyPromo(promoArray,'Automatic');
    
};
const resetPromoCode = function(quoteNum){
  let quoteObj = JSON.parse(localStorage.getItem("quote-obj")),
      quoteNumVal = quoteNum - 1,
      fromCurrency = quoteObj.country_origin_currency,
      toCurrency = quoteObj.quote_array[quoteNumVal].show_currency,
      conversionRate = fromCurrency != toCurrency ? $('input[name=quote_'+quoteNum+'_exchange_rate]').val() : 1,
      totalQuoteAmount = quoteObj.quote_array[quoteNumVal].quote_total_price,
      priceProgramVal = parseInt(quoteObj.quote_array[quoteNumVal].program.program_total_price)/conversionRate,
      priceStandardVal = parseInt(quoteObj.quote_array[quoteNumVal].program.program_total_standard_price)/conversionRate,
      promoAutoTotalVal = 0,
      discountVal = 0;
      totalQuoteAmount = totalQuoteAmount/ conversionRate;
      totalQuoteAmount = totalQuoteAmount.toFixed();

  if(quoteObj.quote_array[quoteNumVal].promo.promo_auto_enabled){
    promoAutoStr = quoteObj.quote_array[quoteNumVal].promo.promo_auto_value.toString();
    promoAutoArray = promoAutoStr.split('|');
    for(let p = 0; p < promoAutoArray.length; p++){
      promoAutoTotalVal += parseInt(promoAutoArray[p]);
    }

    promoAutoTotalVal = promoAutoTotalVal/conversionRate;
    
  }    

  discountVal = priceProgramVal < priceStandardVal ? priceStandardVal - priceProgramVal + promoAutoTotalVal : 0; 
  
  if(discountVal > 0){
    discountVal = discountVal.toFixed();
    $('.discount-total-price','.col-quote-'+quoteNum).html(currencyModFormatter(discountVal,toCurrency));
  }
     
  $('.total-price','.col-quote-'+quoteNum).html(currencyModFormatter(totalQuoteAmount,toCurrency));

  $('.promo-code-box','.col-quote-'+quoteNum).empty();

  quoteObj.quote_array[quoteNumVal].promo.promo_code_enabled = false;

  localStorage.setItem(quoteJsonName, JSON.stringify(quoteObj));

};
const getPromo = function(promoTypeVal,couponCode,quoteNum){
    let todayDate = new Date(),
        today = todayDate.getTime(),
        tableId = promoTable,
        couponVal = promoTypeVal == 'Coupon' && couponCode ? '&code__eq='+couponCode.toLowerCase()+'&limit=1' : '';
        queryParam = '&enable__eq=1&promo_type__eq='+promoTypeVal+'&start_date__lte='+today+'&end_date__gte='+today+couponVal,
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
    api_url = encodeURI(api_url);

    $.get(api_url).done(function (data) {
      let dataObject = data.results,
          promoArray = [];

      if(dataObject.length > 0){
        
        for (let i = 0; i < dataObject.length; i++) {
          schoolArray = [],
          marketArray = [],
          campusArray = [],
          programsLSArray = [],
          programsGCArray = [];

          if(dataObject[i].values.school){
            for(let z = 0; z < dataObject[i].values['school'].length; z++){
              schoolArray.push(
                dataObject[i].values['school'][z].id
              )
            }
          }
          if(dataObject[i].values.market){
            for(let q = 0; q < dataObject[i].values['market'].length; q++){
              marketArray.push(
                dataObject[i].values['market'][q].id
              )
            }
          }
          if(dataObject[i].values.campus){
            for(let y = 0; y < dataObject[i].values['campus'].length; y++){
              campusArray.push(
                dataObject[i].values['campus'][y].id
              )
            }
          }
          if(dataObject[i].values.ls_programs){
            for(let s = 0; s < dataObject[i].values['ls_programs'].length; s++){
              programsLSArray.push(
                dataObject[i].values['ls_programs'][s].id
              )
            }
          }
          if(dataObject[i].values.gc_programs){
            for(let t = 0; t < dataObject[i].values['gc_programs'].length; t++){
              programsGCArray.push(
                dataObject[i].values['gc_programs'][t].id
              )
            }
          }

          promoValue = dataObject[i].values['discount_type'].name == 'Dollar' ?  xConversion(dataObject[i].values.promo_value) : dataObject[i].values['discount_type'].name == 'Percent' ? dataObject[i].values.promo_value : xConversion(dataObject[i].values.promo_value);

          promoArray.push({
            'promoName': dataObject[i].values.promo_name ? dataObject[i].values.promo_name : '',
            'promoCode': dataObject[i].values.code ? dataObject[i].values.code : '',
            'promoType': dataObject[i].values.promo_type ? dataObject[i].values['promo_type'].name : '',
            'promoDescription': dataObject[i].values.promo_description ? dataObject[i].values.promo_description : '',
            'promoCategory': dataObject[i].values.category ? dataObject[i].values['category'].name : '',
            'promoDiscountType': dataObject[i].values.discount_type ? dataObject[i].values['discount_type'].name : '',
            'promoValue': dataObject[i].values.promo_value ? promoValue : 0,
            'rules': {
              'schoolDependence': schoolArray.length > 0 ? schoolArray.toString() : false,
              'marketDependence': marketArray.length > 0 ? marketArray.toString() : false,
              'campusDependence': campusArray.length > 0 ? campusArray.toString() : false,
              'lsProgramsDependence': programsLSArray.length > 0 ? programsLSArray.toString() : false,
              'gcProgramsDependence': programsGCArray.length > 0 ? programsGCArray.toString() : false,
              'programStartDate': dataObject[i].values.program_start_dates ? dataObject[i].values.program_start_dates : false,
              'programEndDate': dataObject[i].values.program_end_date ? dataObject[i].values.program_end_date : false,
              'promoStartDate': dataObject[i].values.start_date ? dataObject[i].values.start_date : false,
              'promoEndDate': dataObject[i].values.end_date ? dataObject[i].values.end_date : false,
              'programSchedule': dataObject[i].values.program_schedule ? dataObject[i].values['program_schedule'].name : false,
              'minWeeks': dataObject[i].values.minimum_weeks ? parseInt(dataObject[i].values['minimum_weeks'].name.slice(0,2).trim()) : false
            }
          });
        }

        if(promoTypeVal == 'Automatic'){
          validatePromoAuto(promoArray);
        }else if(promoTypeVal == 'Coupon'){
          validatePromoCoupon(promoArray,quoteNum);
        }
        
      }else{
        if(promoTypeVal == 'Coupon'){
          resetPromoCode(quoteNum);
          $('#promo-feedback-'+quoteNum).html('<span>Please enter valid promo code.</span>');
        }
      }

    }).fail(function() {
      if(promoTypeVal == 'Coupon'){
        resetPromoCode(quoteNum);
        $('#promo-feedback-'+quoteNum).html('<span>Please enter valid promo code.</span>');
      }
  });
    
  };


  $(document).on('click','.btn-promo-code',function(){
    let quoteNum = $(this).attr('data-quote'),
        promoCode = $('input[name=input-promo-code-'+quoteNum+']').val();
    
    if(promoCode != ''){
      getPromo('Coupon',promoCode,quoteNum);
    }else{
      resetPromoCode(quoteNum);
      $('#promo-feedback-'+quoteNum).html('<span>Please enter valid promo code.</span>');
    }
    
  });