const printAccomTypeOption = function(){
    let className = 'accommodation-type-option-container',
        campusSelected = $('input[name=program_campus]:checked').val(),
        tableId = accommodationTable,
        queryParam = '&campus__in='+campusSelected+'&enabled__eq=1';
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
        api_url = encodeURI(api_url);

        $.get(api_url).done(function (data) {
            let dataObject = data.results;

            if(dataObject.length >0){
                
                    optionHtml = '<label>What type of accommodations are you looking for?<sup>*</sup></label>';
            $('#'+className).html(optionHtml);
    
                    if(dataObject.some(item => item.values.accommodation_type.name === 'Homestay')){
                        homeStayHtml = ' <div class="form-check" id="homestay-element"><input class="form-check-input" value="Homestay" type="radio" name="accommodation_type" id="option-homestay" required><label class="form-check-label" for="option-homestay">Homestay</label></div>';
                        $('#'+className).append(homeStayHtml);
                    }else{
                        $('#homestay-element').remove();
                    }
                    if(dataObject.some(item => item.values.accommodation_type.name === 'Residence')){
                        residenceHtml = '<div class="form-check" id="residence-element"><input class="form-check-input" value="Residence" type="radio" name="accommodation_type" id="option-residence"><label class="form-check-label" for="option-residence">Residence</label></div>';
                        $('#'+className).append(residenceHtml);

                    }else{
                        $('#residence-element').remove();
                    }
                
                
            }else{
                $('#'+className).html('<label>No accommodation is available at this time at'+campusSelected+'<sup>*</sup></label>');
            }
        });

    

};

const updateDateAccommodationAvailability = function(){
    let campusSelected = $('input[name=program_campus]:checked').val(),
        accommodationTypeSelected = $('input[name=accommodation_type]:checked').val(),
        durationWeek = $('select[name=accommodation_duration] option:selected').val().replace('week','').replace('weeks',''),
        tableId = accommodationTable,
        queryParam = '&campus__in='+campusSelected+'&accommodation_type__in='+accommodationTypeSelected,
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
        api_url = encodeURI(api_url),
        availabilityArray = [];

        $.get(api_url).done(function (data) {
            let dataObject = data.results;
           
            if(dataObject.length >0){
                for (let i = 0; i < dataObject.length; i++){

                    startDate = dataObject[i].values.date_start_availability ? dataObject[i].values.date_start_availability : null;
                    endDate = dataObject[i].values.date_end_availability ? dataObject[i].values.date_end_availability + 86400000 : null;

                    availabilityArray.push({
                        'accommodationId': dataObject[i].id,
                        'startDateAvailability':startDate,
                        'endDateAvailability': endDate

                    });
                }

                
                startMinVal = Math.min(...availabilityArray.map(o => o.startDateAvailability));
                endMax = Math.max(...availabilityArray.map(o => o.endDateAvailability));
                endMaxObj = subtractWeeks( new Date(parseInt(endMax)),parseInt(durationWeek));
                day = endMaxObj.getDate();
                month = endMaxObj.getMonth() + 1;
                year = endMaxObj.getFullYear();
                dateFormatted = month + "/" + day + "/" + year;


                if(endMax){
                    $(".accommodation-checkin-date-picker").datepicker("option", { maxDate: endMaxObj });
                    $( ".accommodation-checkin-date-picker" ).datepicker( "option", "appendText", "Last Check-in date available "+ dateFormatted );
                }else{
                    $(".accommodation-checkin-date-picker").datepicker("option", { maxDate: null });
                    $( ".accommodation-checkin-date-picker" ).datepicker( "option", "appendText", "" );
                }

                localStorage.setItem('accommodation-availability',JSON.stringify(availabilityArray))
            }
        });
};

const  printAccomLocationOption = function(){
    let countrySelected = $('input[name=program_country]').val(),
        schoolSelected = $('input[name=program_school]:checked').attr('id'),
        campusSelected = $('input[name=program_campus]:checked').val(),
        campusIdSelected = $('input[name=program_campus]:checked').attr('id'),
        tableId = campusTable,
        queryParam = countrySelected != 'Online' ? '&country__in='+countrySelected+'&schools__in='+schoolSelected : '',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
        api_url = encodeURI(api_url);

        if(countrySelected == 'Online'){
            $.get(api_url).done(function (data) {
                let dataObject = data.results;
                dataObject.sort((a,b) => a.values.name > b.values.name ? 1 : -1);
                if(dataObject.length >0){
                    optionHtml="<option value='' disabled>Choose Location</option>";
                    for (let i = 0; i < dataObject.length; i++){
                        if(dataObject[i].values.name != 'Online'){
                            stateProv = countrySelected == 'USA' || countrySelected == 'Online' ? dataObject[i].values.name+', '+dataObject[i].values.state_province : dataObject[i].values.name;
                            selectedOption = campusSelected  == dataObject[i].values.name? 'selected' : '';
                            optionHtml += '<option type="radio" value="'+stateProv+'" data-id="'+dataObject[i].values.name+'" '+selectedOption+'>'+stateProv+'</option>';
                        }
                    }
                    $('#accommodation-location-option-container select').html(optionHtml);
                }
            });
        }else{
            optionHtml = '<option type="radio" value="'+campusSelected+'" data-id="'+campusIdSelected+'" selected>'+campusSelected+'</option>';
            $('#accommodation-location-option-container select').html(optionHtml);
        }
        
};
const printAccommodationName = function(){
    let schoolSelected = $('input[name=program_school]:checked').val(),
        schoolDomain = schoolSelected != 'ELS' ? 'https://www.accommodations.ilsc.com' : '',
        campusSelected = $('select[name=accommodation_location] option:selected').attr('data-id'),
        accomTypeSelected = $('input[name=accommodation_type]:checked').val(),
        table2Id = accomTypeSelected == 'Homestay' ? homestayTable : residenceTable,
        tableId = accommodationTable,
        accommInt = accomTypeSelected == 'Homestay' ? 'type_name' : 'name',
        accommTypeInt = accomTypeSelected == 'Homestay' ? 'homestay_type' : 'residence_type',
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        checkInDate = new Date($('input[name=accommodation_checkin_datepicker]').val()),
        checkInTime = checkInDate.getTime(),
        queryParam = '&campus__in='+campusSelected+'&accommodation_type__eq='+accomTypeSelected+'&enabled__eq=1',
        api_url = apiUrl+tableId+'/rows?portalId='+portalId+queryParam;
        api_url = encodeURI(api_url);
        accommArray = [];
        
        
        ageAtCheckIn = calculate_age(dateBirthTime,checkInTime);
       

        $.get(api_url).done(function (data) {
            let dataObject = data.results,
                accommIdArray = [];
            
            if(dataObject.length >0){
                for (let i = 0; i < dataObject.length; i++){
                    ageReq = dataObject[i].values.age_requirement;
                    if(ageReq.includes('+')){
                       minAge =  parseInt(ageReq.substr(0,ageReq.indexOf('+')));
                       maxAge = 99;
                    }else if(ageReq.includes('-')){
                        ageArray = ageReq.split('-');
                        minAge = parseInt(ageArray[0]);
                        maxAge = parseInt(ageArray[1]);
                    }
             
                    if(ageAtCheckIn >= minAge && ageAtCheckIn < maxAge){
                        accommArray.push({
                            'parent_id': dataObject[i].id,
                            'id': dataObject[i].values[accommTypeInt][0].id,
                            'room_description' : dataObject[i].values.room_description,
                            'age_requirement' : dataObject[i].values.age_requirement,
                            'accommodation_type': dataObject[i].values.accommodation_type.name
                        });
                    }
                }
                localStorage.setItem(accommTypeSelectedJsonName, JSON.stringify(accommArray));
                for (let i = 0; i < accommArray.length; i++){
                    accommIdArray.push(
                        accommArray[i].id
                    );
                }
                accommArrayString = accommIdArray.toString();
                queryParam = '&hs_id__in='+accommArrayString,
                api_url = apiUrl+table2Id+'/rows?portalId='+portalId+queryParam;
                api_url = encodeURI(api_url);
                accommNameArray = [];

                $.get(api_url).done(function (data) {
                    let dataObjectName = data.results;
                    dataObjectName.sort((a,b) => a.values[accommInt] > b.values[accommInt] ? 1 : -1);


                    if(dataObjectName.length >0){
                        for (let i = 0; i < dataObjectName.length; i++){
                            accommNameArray.push({
                                'id':dataObjectName[i].id,
                                'name':dataObjectName[i].values[accommInt],
                                'page_link':dataObjectName[i].values.page_link
                            })
                        }
                    }

                    accommodationName = accommArray.map(a => ({...a, ...accommNameArray.find(an => an.id === a.id)}));
                    optionHtml = '<p>>No accommodations available</p>';

                    if(accommodationName.length >0){
                        optionNameHtml = '<label for="accommodation-name-select">Choose accommodation<sup>*</sup></label>';
                        for (let i = 0; i < accommodationName.length; i++){
                            optionValue = accomTypeSelected == 'Homestay' ? accommodationName[i].name : accommodationName[i].name+' - '+accommodationName[i].room_description;
                            optionNameHtml += '<div class="form-check"><input class="form-check-input" value="'+optionValue+'" type="radio" name="accommodation_name" id="'+accommodationName[i].parent_id+'" required><label class="form-check-label" for="'+accommodationName[i].parent_id+'">'+accommodationName[i].name+' - <span style="font-size:18px">'+accommodationName[i].room_description+'</span> <a href="'+schoolDomain+accommodationName[i].page_link+'" target="_blank" style="font-size:12px;">more info</a></label></div>';
                        }

                        $('.accommodation-name-option').html(optionNameHtml);
                    }else{
                        
                        $('.accommodation-name-option').html(optionHtml);
                    }

                }).fail(function(){
                    $('.accommodation-name-option').html(optionHtml);
                });
            }

            
        }).fail(function(){
            optionHtml = '<option value="" disabled selected>No accommodations available</option>';
            $('.accommodation-name select').html(optionHtml).attr('disabled',true);
        });
};


const printAccommodationNameOption = function(){
    let accommObject = localStorage.getItem(accommTypeSelectedJsonName),
        accommJson =  JSON.parse(accommObject),
        accommodationNameIdSelected = $('select[name=accommodation_name] option:selected').attr('data-id');

    let checkKeyPresenceInArray = key => accommJson.some(obj => Object.keys(obj).includes(key));
    var isKeyPresent = checkKeyPresenceInArray('room_description');

    if(isKeyPresent){
        optionHtml = '<label>Choose accommodation option?<sup>*</sup></label>';
        singleOptionCheck = accommJson.length == 1 ? 'checked' : '';

        for (let i = 0; i <  accommJson.length; i++){
            if(accommodationNameIdSelected == accommJson[i].id){
                optionHtml += '<div class="form-check"><input class="form-check-input" data-id="'+accommJson[i].parent_id+'" value="'+accommJson[i].room_description+'" type="radio" name="accommodation_option_type" id="'+accommJson[i].parent_id+'" '+singleOptionCheck+' required><label class="form-check-label" for="'+accommJson[i].parent_id+'">'+accommJson[i].room_description+'</label></div>';
            }
        }
        $('.accommodation-name-option').html(optionHtml).removeClass('study-hide').addClass('study-show');
    }else{
        $('.accommodation-name-option').empty();
    }
    
};

const printAirportTransfer = function(stepForm,categoryName,enableForm){
    let campusSelected = $('input[name=program_campus]:checked').val(),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        stepName = '.'+stepForm;

    melbourneTipHtml = '<sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-content="Pick-up / drop-off is only available at Melbourne\'s Tullamarine Airport (MEL)" data-original-title="" title=""></i></sup>';
    melbourneTip = campusSelected == 'Melbourne' &&  countrySelected != 'USA' ? melbourneTipHtml : '';
    
    if(enableForm){
        if($('.airport-transfer-details',stepName).is(':empty')){

            inputNoHtml = '<div class="form-check" data-category="'+categoryName+'"><input class="form-check-input" type="radio" name="accommodation_airport_transfer_option" id="accommodationAirportTransferNo" value="No" required disable="false" data-category="'+categoryName+'"><label class="form-check-label" for="accommodationAirportTransferNo">No</label></div>';

            inputBothHtml = '<div class="form-check" data-category="'+categoryName+'"><input class="form-check-input" type="radio" name="accommodation_airport_transfer_option" id="accommodationAirportTransferBoth" value="Yes, I need airport pick up on arrival & airport drop off on departure." required disable="false" data-category="'+categoryName+'"><label class="form-check-label" for="accommodationAirportTransferBoth">Yes, I need airport pick up on arrival & airport drop off on departure.'+melbourneTip+'</label></div>';

            inputArrivalHtml = '<div class="form-check" data-category="'+categoryName+'"><input class="form-check-input" type="radio" name="accommodation_airport_transfer_option" id="accommodationAirportPickUp" value="Yes, I need airport pick up on arrival only." required="" disable="false" data-category="'+categoryName+'"><label class="form-check-label" for=""accommodationAirportPickUp">Yes, I need airport pick up on arrival only.'+melbourneTip+'</label></div>';

            inputDepartHtml = '<div class="form-check" data-category="'+categoryName+'"><input class="form-check-input" type="radio" name="accommodation_airport_transfer_option" id="accommodationAirportTransferDropOff" value="Yes, I need airport drop off when departing only." required disable="false" data-category="'+categoryName+'"><label class="form-check-label" for="accommodationAirportTransferDropOff">Yes, I need airport drop off when departing only.'+melbourneTip+'</label></div>';

        airportTransferInputHtml = countrySelected == 'USA' ? inputNoHtml+inputArrivalHtml+inputBothHtml : inputNoHtml+inputBothHtml+inputArrivalHtml+inputDepartHtml;

        noHelp = countrySelected == 'USA' ? '<sup>*</sup>(If you have selected Homestay and do not need an airport transfer, students must provide their arrival details to ELS central admissions at least one week prior to their rival)' : '';
        optionHtml = '<div class="form-group"><legend>Do you need an airport transfer?<sup>*</sup><br>'+noHelp+'</legend><div class="valid-feedback"></div>'+airportTransferInputHtml+'</div>';
        
            $('.airport-transfer-details',stepName).append(optionHtml);
        }
    }else{
        $('.airport-transfer-details',stepName).empty()
    }
};

const printAirportTransferDetails = function(stepForm){
    let campusSelected = $('input[name=program_campus]:checked').val(),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        startDate = new Date($('select[name=program_startdate_primary-input] option:checked').val()),
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        age = calculate_age(dateBirthTime,startDate.getTime());

    requiredDates = countrySelected == 'USA' ? '' : 'required';
    requiredLabel = requiredDates == 'required' ? '*' : '';
    flightInfoTxt = countrySelected == 'USA' ? '<div><p class="footnote">*Flight details must be received at least two weeks prior to the scheduled start date.</p></div>' : '';
    
    brisbaneField = '<div class="form-group"><legend>Select the airport?<sup>*</sup></legend><div class="form-check" data-category="Accommodation"><input class="form-check-input" type="radio" name="accommodation_airport_brisbane_option" id="accommodationAirportBrisbaneOption" value="Brisbane" required disable="false"><label class="form-check-label" for="accommodationAirportBrisbaneOption">Brisbane</label></div><div class="form-check" data-category="Accommodation"><input class="form-check-input" type="radio" name="accommodation_airport_brisbane_option" id="accommodationAirportGoldCoastOption" value="Gold Coast" required disable="false"><label class="form-check-label" for="accommodationAirportGoldCoastOption">Gold Coast</label></div>';
    brisbaneInput = campusSelected == 'Brisbane' ? brisbaneField : '';
    arrivalInput = '<div class="input-container accommodation-airport-transfer-arrival-date study-show"><label for="airport-arrival-datePicker">Arrival Date<sup>'+requiredLabel+'</sup></label><input type="text" value="" class="form-control airport-transfer-date-picker  accommodation-airport-transfer-arrival-date-picker" id="airport-arrival-datePicker" name="airport_arrival_datepicker" placeholder="YYY-MM-DD" '+requiredDates+'></div>';
    departureInput = '<div class="input-container accommodation-airport-transfer-departure-date study-show"><label for="airport-departure-datePicker">Departure Date<sup>'+requiredLabel+'</sup></label><input type="text" value="" class="form-control airport-transfer-date-picker accommodation-airport-transfer-departure-date-picker" id="airport-departure-datePicker" name="airport_departure_datepicker" placeholder="YYYY-MM-DD" '+requiredDates+'></div>';
    airlineInput = '<div class="form-group form-show "><label for="airlineFlight">Airline and Flight Number (if applicable)</label><input type="text" class="form-control" id="airlineFlight" name="airpirort_airline_flight" data-category="Accommodation" tabindex="0"><div class="valid-feedback"></div>'+flightInfoTxt+'</div>';
    minorInputField = '<div class="form-group"><legend>Will you be booking unaccompanied minor service through your airline?<sup>*</sup></legend><div class="form-check" data-category="Accommodation"><input class="form-check-input" type="radio" name="accommodation_airport_book_minor_option" id="accommodationAirportBookMinorNo" value="No" required disable="false"><label class="form-check-label" for="accommodationAirportBookMinorNo">No</label></div><div class="form-check" data-category="Accommodation"><input class="form-check-input" type="radio" name="accommodation_airport_book_minor_option" id="accommodationAirportBookMinorYes" value="Yes" required disable="false"><label class="form-check-label" for="accommodationAirportBookMinorYes">Yes</label></div><div class="form-group full-width"><label for="accommodationAirportMinorComments">Additional information and comments*</sup></label><textarea class="form-control" rows="15" cols="60" id="accommodationAirportMinorComments" name="accommodation_airport_minor_comments" data-category="Accommodation"></textarea><div class="valid-feedback"></div></div>';
    minorInput = age < 18 ? minorInputField :'';
    inputHtml = brisbaneInput+arrivalInput+departureInput+airlineInput+minorInput;

    if($('.'+stepForm).find('.airport-details').length == 0){
        $('.airport-transfer-details','.'+stepForm).append('<div class="airport-details study-show">'+inputHtml+'</div>');

        $( ".airport-transfer-date-picker",'.'+stepForm ).datepicker(
            {
                minDate: Date.now(),
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect:function(dateText){
                    dateObj = new Date(dateText);
                    $(this).attr('data-value',dateObj.getTime());
                }
            }
        );
    }
};

$(document).on( 'click', '.accommodation-form input[name=accommodation_airport_transfer_option], .additional-form input[name=accommodation_airport_transfer_option]', function () {

    categoryValue = $(this).attr('data-category'),
    parentClass = categoryValue == 'Accommodation' ? 'accommodation-form' : 'additional-form';

    if($(this).val() != 'No'){
        printAirportTransferDetails(parentClass);
        $('.airport-transfer-details .airport-details input', '.'+parentClass).attr('disabled',false);
        $('.airport-transfer-details .airport-details, .airport-transfer-details .airport-details .input-container', '.'+parentClass).removeClass('study-hide').addClass('study-show');

        if($(this).val() == 'Yes, I need airport pick up on arrival only.'){
            $('.airport-transfer-details .airport-details .accommodation-airport-transfer-arrival-date', '.'+parentClass).removeClass('study-hide').addClass('study-show');
            $('.airport-transfer-details .airport-details .accommodation-airport-transfer-departure-date', '.'+parentClass).removeClass('study-show').addClass('study-hide');
            $('input[name=airport_departure_datepicker]', '.'+parentClass).attr('disabled',true);
        }

        if($(this).val() == 'Yes, I need airport drop off when departing only.'){
            $('.airport-transfer-details .airport-details .accommodation-airport-transfer-departure-date', '.'+parentClass).removeClass('study-hide').addClass('study-show');
            $('.airport-transfer-details .airport-details .accommodation-airport-transfer-arrival-date', '.'+parentClass).removeClass('study-show').addClass('study-hide');
            $('input[name=airport_arrival_datepicker]', '.'+parentClass).attr('disabled',true);
        }

    }else{
        $('.airport-transfer-details .airport-details', '.'+parentClass).removeClass('study-show').addClass('study-hide');
        $('.airport-transfer-details .airport-details input', '.'+parentClass).attr('disabled',true);
    }
});

$(document).on( 'click', 'input[name=accommodation_option]', function () {
    let selectedParentSchool = $('input[name=program_school]:checked').attr('data-school');
    
    if($(this).val() == '1'){
        $('.accommodation-details:not(.form-group)').removeClass('study-hide').addClass('study-show');
        $('#accommodation-type-option-container').removeClass('study-hide').addClass('study-show');
        $('.accommodation-airport-transfer-details').removeClass('study-hide').addClass('study-show');
        $('.additional-airport-transfer-details').removeClass('study-show').addClass('study-hide');
        printAccomTypeOption();
        printAirportTransfer('accommodation-form','Accommodation',true);
        $("input,select,textarea","#accommodation-type-option-container").attr('disabled',false);
        $("input,select,textarea",".accommodation-details-container").attr('disabled',false);
        $("input,select,textarea",".accommodation-homestay-details").attr('disabled',false);
        $("input,select,textarea",".accommodation-airport-transfer-details").attr('disabled',false);
        $("input,select,textarea",".additional-airport-transfer-details").attr('disabled',true);
        if(selectedParentSchool == 'ELS'){
            $('input[name=accommodation_checkout_datepicker]').attr('disabled',true);
        }
       
    }else{
        $("input,select,textarea",".accommodation-details").attr('disabled',true);
        $("input,select,textarea",".accommodation-homestay-details").attr('disabled',true);
        $("input,select,textarea",".accommodation-airport-transfer-details").attr('disabled',true);

        $('.accommodation-details:not(.form-group)').removeClass('study-show').addClass('study-hide');  
        $('.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
        $('.accommodation-airport-transfer-details').removeClass('study-show').addClass('study-hide');
        if(selectedParentSchool == 'ELS'){
            printAirportTransfer('additional-form','Additional',true);
            $('.additional-airport-transfer-details').removeClass('study-hide').addClass('study-show');
            $("input,select,textarea",".additional-airport-transfer-details").attr('disabled',false);
        }
    }
});

const calcAccomCheckOutDate = function(){
    let checkInDateVal = $('input[name=accommodation_checkin_datepicker]').attr('data-value'),
        durationWeek = $('select[name=accommodation_duration] option:selected').val(),
        durationVal = parseInt(durationWeek.slice(0,2)),
        checkOutDate = addWeeks(new Date(parseInt(checkInDateVal)),durationVal);
        $('input[name=accommodation_checkout_datepicker]').attr('data-value',checkOutDate.getTime());
        year = checkOutDate.getUTCFullYear();
        month = checkOutDate.getUTCMonth() + 1;
        month = month.toString();
        month = month.length < 2 ? '0'+month : month;
        day = checkOutDate.getUTCDate();
        day = day.toString();
        day = day.length < 2 ? '0'+day : day;
        checkOutStr = year+'-'+month+'-'+day;
        $('input[name=accommodation_checkout_datepicker]').attr('value',checkOutStr);
        
}

const showAccommodationDetailsOption = function(accommType){
    let countrySelected = $('input[name=program_country]').val(),
        accommTypeVal = countrySelected == 'USA' ? 'Residence-No-Code' : accommType,
        showOption = accommTypeVal.includes('Homestay') || accommTypeVal.includes('Residence-No-Code') ? true : false,
        programSelected = $('select[name=program_name_primary-input] option:selected').attr('data-category');
    
    $('.form-group.accommodation-details').removeClass('study-hide').addClass('study-show');
    if(showOption){
        $('.form-group.accommodation-details,.accommodation-details-container,.accommodation-details-container >div:not(.accommodation-check-out-date)').removeClass('study-hide').addClass('study-show');
        $('select,input','.accommodation-details-container').attr('disabled',false);
        if(programSelected == 'Junior Camps' || programSelected == 'Family Camps'){
            $("input[name=accommodation_checkin_datepicker],input[name=accommodation_checkout_datepicker]").prop("disabled",true);
        }
        hideAccommodationConfirmationCode();
    }else{
        $('.accommodation-details-container,.accommodation-details-container >div:not(.accommodation-check-out-date)').removeClass('study-show').addClass('study-hide');
        $('select,input','.accommodation-details-container').attr('disabled',true);
        showAccommodationConfirmationCode();
    }
}

const showAccommodationConfirmationCode = function(){
    $('#accommodation-guesty-option-container').removeClass('study-hide').addClass('study-show');
    $('input[name=accommodation_guesty_option]').attr('disabled',false);
    $('input[name=accommodation_guesty_code]').attr('disabled',false);
}
const hideAccommodationConfirmationCode = function(){
    typeVal = $('input[name=accommodation_type]:checked').val();
    if(typeVal == 'Homestay'){
        $('#accommodation-guesty-option-container').removeClass('study-show').addClass('study-hide');
        $('input[name=accommodation_guesty_option]').attr('disabled',true).prop('checked',false);
    }
    $('.accommodation-guesty').removeClass('study-show').addClass('study-hide');
    $('input[name=accommodation_guesty_code').attr('disabled',true);
}
$(document).on( 'click', 'input[name=accommodation_guesty_option]', function () {
    tarVal = $(this).val();
    if(tarVal == 'Yes'){
        $('.accommodation-guesty').removeClass('study-hide').addClass('study-show');
        $('input','accommodation-guesty').attr('disabled',false);
        showAccommodationDetailsOption('Residence');
    }else{
        $('accommodation-guesty').removeClass('study-show').addClass('study-hide');
        $('input','accommodation-guesty').attr('disabled',true);
        showAccommodationDetailsOption('Residence-No-Code');
    }
});

$(document).on( 'click', 'input[name=accommodation_type]', function () {
    let typeVal = $(this).val(),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        studyWeeks = $('select[name=program_option_duration_primary-input]:not(:disabled) option:selected').val(),
        studyWeeks2 = $('input[name=program_schedule_primary-input]:not(:disabled):checked').attr('data-weeks'),
        programCategorySelected = $('select[name*=program_name_] option:selected').attr('data-category'),
        campusTypeSelected = $('select[name*=program_name_] option:selected').attr('data-campus-type');

    $('.accommodation-name-option').empty();
    printAccomLocationOption();
    
   
    
    $('.accommodation-duration select').empty();
    $('.accommodation-duration select').append('<option disabled>Choose Duration</option>')
    for (let i = 1; i < 73; i++) {
        weekText = i == 1 ? 'week' : 'weeks';
        weekStr = i+" "+weekText;
        selectedWeek = studyWeeks ? studyWeeks == weekStr ? 'selected' : '' : studyWeeks2 ? studyWeeks2 == i ? 'selected' : '' : '';
        $('.accommodation-duration select').append('<option value="'+weekStr+'" '+selectedWeek+'>'+weekStr+'</option>');
    }

    accommTypeVal = typeVal == 'Homestay' ? 'Accommodation-Homestay' : programCategorySelected == "Family Camps" || programCategorySelected == "Junior Camps" ?  campusTypeSelected.includes('Residences') ? 'Residence-No-Code' : typeVal :typeVal;

    showAccommodationDetailsOption(accommTypeVal);

    accommodationTypeVal = typeVal == 'Homestay' ? 'Accommodation-Homestay' : programCategorySelected == "Family Camps" || programCategorySelected == "Junior Camps" ?  campusTypeSelected.includes('Residences') ? 'Accommodation-Homestay': 'Accommodation-Residence' : 'Accommodation-Residence';
    
    $('.homestay-details').empty();
    if($('.homestay-details').is(':empty')){        
        printPersonForm(accommodationAdditionalArray,false,accommodationTypeVal,'homestay-details');
    }

    if(!$('.homestay-details').is(':empty')){ 
        $('.accommodation-homestay-details').removeClass('study-hide').addClass('study-show');
        $('.accommodation-homestay-details input').attr('disabled',false);
    }else{
        $('.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
        $('.accommodation-homestay-details input').attr('disabled',true);
    }
        
    $(".accommodation-checkin-date-picker").val('');
    updateDateAccommodationAvailability();
        
});

$(document).on( 'change','select[name=accommodation_name]', function () {
    printAccommodationNameOption();
});

$(document).on( 'change','input[name=accommodation_checkin_datepicker],select[name=accommodation_duration]', function () {
    if($('.accommodation-name-option').is(':empty')){
        if($('#accommodation-checkin-datePicker').val() != ''){
            printAccommodationName();
        }
    }
    if($(this).attr('name') == 'accommodation_duration'){
        updateDateAccommodationAvailability();
    }
    calcAccomCheckOutDate();

});