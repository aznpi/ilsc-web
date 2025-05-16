const printAdditionalForm = function(){
  programCategorySelected = $('select[name*=program_name_] option:selected').attr('data-category');

  printInsuranceInput();
  printAdditionalInfoInput();
  printAdditionalFilesInput();
  if(programCategorySelected == 'Junior Camps' || programCategorySelected == 'Family Camps'){
      printJuniorWaiver();
  }else{
      hideJuniorWaiver();
  }
};

const printJuniorWaiver = function(){
  let containerClassName = 'junior-waiver-container', 
      jrWaiverClassName = 'additional-jr-waiver-container',
      confirmationInputName = 'jr-waiver-confirmation',
      jrWaiverListHtml = '',
      studentFirstName = $('input[name=student_first_name]').val() + ' ',
      studentMiddelName = $('input[name=student_middle_name]').val() != '' ? $('input[name=student_middle_name]').val() + ' ' : '' ,
      studentLastName = $('input[name=student_last_name]').val();

  if($('#'+jrWaiverClassName).is(':empty')){
      for (let i = 0; i < jrWaiverCAArray.length; i++) {
          listNum = i+1;
          listNumStr = listNum+'. &nbsp;&nbsp;&nbsp;&nbsp;'
          jrWaiverListHtml += '<li><input type="checkbox" class="jr-waiver-item-check" name="jr-waiver-item-'+i+'" required><p>'+listNumStr+jrWaiverCAArray[i].textVal+'</p></li>';
      }

      studentName = studentFirstName + studentMiddelName + studentLastName;
      studentNameHtml = '<div><h5>Student Name:</h5><h6>'+studentName+'</h6></div>';
      parentFirstNameInput = '<div class="form-group  study-show"><label for="parentFirstName">Parent/Guardian First Name &nbsp;&nbsp;<sup>*</sup></label><input type="text" class="form-control" id="parentFirstName" name="parent_guardian_first_name" required="" data-category="Additional" value=""><div class="valid-feedback"></div></div>';
      parentLastNameInput = '<div class="form-group  study-show"><label for="parentLastName">Parent/Guardian Last Name &nbsp;&nbsp;<sup>*</sup></label><input type="text" class="form-control" id="parentLastName" name="parent_guardian_last_name" required="" data-category="Additional" value=""><div class="valid-feedback"></div></div>';
      parentInputHtml = '<h5>Enter Parent/Guardian Name:</h5>'+parentFirstNameInput+parentLastNameInput;
      jrWaiverConfirmInput = '<div class="checkbox-line"><input type="checkbox" value="" class="jr-confirmation" id="'+confirmationInputName +'" name="'+confirmationInputName +'" required="" data-category="Student" disabled=true><label for="'+confirmationInputName+'">Yes, for good and valuable consideration, the receipt and sufficiency of which is acknowledged, I, the parent or legal guardian, of the child (or legal guardian if the student is unable to enter into binding agreements in the jurisdiction in which the School operates) hereby agrees as above.<sup>*</sup></label></div>';
      jrWaiverHmtml = '<h5>'+jrWaiverIntro+'</h5><h5>Please check each box to acknowledge:</h5><ol class="normal-check">'+jrWaiverListHtml+'</ol>'+studentNameHtml+parentInputHtml+jrWaiverConfirmInput;

      $('#'+jrWaiverClassName).html(jrWaiverHmtml);
      printJuniorRules();
      printJuniorMedical(); 
  }

  hideInsurance();
  $('#'+containerClassName).addClass('study-show').removeClass('study-hide');
  //$('input:not([name="jr-waiver-confirmation"])','#'+containerClassName).prop('disabled',false).prop('required',true);
};

const hideJuniorWaiver = function(){
  let containerClassName = 'junior-waiver-container';
  $('#'+containerClassName).addClass('study-hide').removeClass('study-show');
  $('input','#'+containerClassName).prop('disabled',true).prop('required',false);
};

const addDigitalWaiverConfirmation = function(inputName){
  let todayDate = new Date(),
      currentMonth = todayDate.getMonth() + 1,
      timeStamp = todayDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
      timeZoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone,
      todayDateStr = todayDate.getDate()+'/'+currentMonth+'/'+todayDate.getFullYear()+' '+timeStamp+ ' (Timezone: '+timeZoneStr+')',
      parentFirstName = $('input[name=parent_guardian_first_name]').val(),
      parenetLastName = $('input[name=parent_guardian_last_name]').val(),
      parentName = parentFirstName + ' ' + parenetLastName;

      digitalConfirmationTxt ='Electronic Signature Received: Parent/Guardian: '+parentName+' '+todayDateStr;

      $('input[name='+inputName+']').val(digitalConfirmationTxt);
};

const printJuniorRules = function(){
  let studentFirstName = $('input[name=student_first_name]').val() + ' ',
      studentMiddelName = $('input[name=student_middle_name]').val() != '' ? $('input[name=student_middle_name]').val() + ' ' : '' ,
      studentLastName = $('input[name=student_last_name]').val(),
      jrRulesClassName = 'additional-jr-rules-container',
      studentName = studentFirstName + studentMiddelName + studentLastName;
      studentNameHtml = '<div><h5>Student Name:</h5><h6>'+studentName+'</h6></div>';
      parentNameHtml = '<div><h5>Parent/Guardian Name:</h5><h6 class="parent-title">(Enter Name Above)</h6></div>',
      confirmationInputName = 'jr-rules-confirmation',
      jrWaiverConfirmInput = '<div class="checkbox-line"><input type="checkbox" value="" class="jr-confirmation" id="'+confirmationInputName +'" name="'+confirmationInputName +'" required="" data-category="Student" disabled=true><label for="'+confirmationInputName+'">Yes, I confirm that I have read, understood and agree to the above rules and consequences.<sup>*</sup></label></div>';;

  $('#'+jrRulesClassName).html(jrWaiverRules+studentNameHtml+parentNameHtml+jrWaiverConfirmInput);
};

const printJuniorMedical = function(){
  let formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject),
      additionalFormEnabled = formJson.agency_form_array[0].additional_form_enabled,
      studentFirstName = $('input[name=student_first_name]').val() + ' ',
      studentMiddelName = $('input[name=student_middle_name]').val() != '' ? $('input[name=student_middle_name]').val() + ' ' : '' ,
      studentLastName = $('input[name=student_last_name]').val(),
      jrMedicalContainer = 'jr-medical-waiver',
      jrMedicalTitleClassName = 'additional-jr-medical-title',
      jrMedicalConfirmClassName = 'additional-jr-medical-confirm',
      jrMedicalClassName = 'additional-jr-medical-container',
      studentName = studentFirstName + studentMiddelName + studentLastName;
      studentNameHtml = '<div><h5>Student Name:</h5><h6>'+studentName+'</h6></div>';
      parentNameHtml = '<div><h5>Parent/Guardian Name:</h5><h6 class="parent-title">(Enter Name Above)</h6></div>',
      confirmationInputName = 'jr-medical-confirmation',
      jrWaiverConfirmInput = '<div class="checkbox-line"><input type="checkbox" value="" class="jr-confirmation" id="'+confirmationInputName +'" name="'+confirmationInputName +'" required="" data-category="Additional-Junior-Medical" disabled=true><label for="'+confirmationInputName+'">Should my child require medical attention during the course, I consent to this and authorize an ILSC Team member to bring them to the doctor, clinic and/or hospital.<sup>*</sup></label></div>',
      medicalInputFormHtml = '',
        medicalOptionInputHtml = '<div class="form-group  study-show"><legend>Does your child take any medication(s)?<sup>*</sup></legend><div class="form-check" data-category="Additional-Junior-Medical"><input class="form-check-input indenpendent-input" type="radio" name="medical_medicine_option" id="medicalOption-No" value="No" required data-category="Additional-Junior-Medical"><label class="form-check-label" for="medicalOption-No">No</label></div><div class="form-check" data-category="Additional-Junior-Medical"><input class="form-check-input indenpendent-input" type="radio" name="medical_medicine_option" id="medicalOption-Yes" value="Yes" required data-category="Additional-Junior-Medical"><label class="form-check-label" for="medicalOption-Yes">Yes</label></div><div class="valid-feedback"></div></div>';
        //medicalEnable = $('input[name=accommodation_medication_option]:checked').val() == 'Yes' ? true : false;

        $('#additional-jr-medical-option').html(medicalOptionInputHtml);
      if($('#'+jrMedicalClassName).is(':empty')){
          printPersonForm(additionalInfoArray, additionalFormEnabled, 'Additional-Junior-Medical', jrMedicalClassName);
      }

      $('#'+jrMedicalTitleClassName).html(jrWaiverMedical);
      $('#'+jrMedicalConfirmClassName).html(studentNameHtml+parentNameHtml+jrWaiverConfirmInput);
  
    
      $('#'+jrMedicalContainer).removeClass('study-hide').addClass('study-show');        
        //setTimeout(function(){$('input[data-category=Additional-Junior-Medical]','textarea[data-category=Additional-Junior-Medical]').prop('disabled',true)},500)
    

};


const printInsuranceInput = function(){

  let schoolSelected = $('input[name=program_school]:checked').attr('data-school'),
      accommodationSelected = $('input[name=accommodation_option]:checked').val(),
      startDate = $('select[name=program_startdate_primary-input] option:selected').attr('data-value'),
      durationProgram = schoolSelected != 'Greystone College' ? $('select[name=program_option_duration_primary-input] option:selected').attr('data-item') : $('input[name=program_weeks_primary-input]').val(),
      accomodationCheckin = $('input[name=accommodation_checkin_datepicker]').attr('data-value') ? $('input[name=accommodation_checkin_datepicker]').attr('data-value') : startDate,
      durationAccommodation = $('select[name=accommodation_duration] option:selected').val(),
      endDate = addWeeks(new Date(parseInt(startDate)),parseInt(durationProgram)),
      durationEndDate = addWeeks(new Date(parseInt(accomodationCheckin)),parseInt(durationAccommodation)),
      startDateVal = accommodationSelected == '1' ? accomodationCheckin : startDate,
      startDateObj = new Date(parseInt(startDateVal)),
      endDateVal = accommodationSelected == '1' ? durationEndDate: endDate,
      endDateObj = new Date(endDateVal),
      yearStartVal = startDateObj.getUTCFullYear(),
      monthStartInt = startDateObj.getUTCMonth(),
      dayStartVal = startDateObj.getUTCDate(),
      yearEndVal = endDateObj.getUTCFullYear(),
      monthEndInt = endDateObj.getUTCMonth(),
      dayEndVal = endDateObj.getUTCDate(),
      placeHolder = yearStartVal+'-'+month0Base[monthStartInt]+'-'+('0'+dayStartVal).slice(-2),
      placeHolderEnd = yearEndVal+'-'+month0Base[monthEndInt]+'-'+('0'+dayEndVal).slice(-2),
      countrySelected = $('input[name=program_country]').val();

  let insuranceClassName = 'insurance-option-container',
        defaultInsuranceText = 'Do you want to purchase your private medical insurance through ILSC/Greystone College?',
        insuranceTxt = countrySelected == 'Australia' ? 'Do you want to purchase your OSHC (Overseas Student Health Cover) through ILSC/Greystone College?' : countrySelected == 'USA' ? 'Do you need ELS to organize your medical insurance?' : defaultInsuranceText,
      addedTxt = countrySelected == 'USA' ? "<span class='disclaimer'>(All ELS Students must have health insurance valid in the US. If you cannot provide proof of your own insurance in English, you must enroll in the ELS Student Health Plan.)</span>" : '',
        optionHtml = '<div class="input-container"><label>'+insuranceTxt+'<sup>*</sup>'+addedTxt+'</label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="insurance_option" id="insurance-option-no" required><label class="form-check-label" for="insurance-option-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="insurance_option" id="insurance-option-yes"><label class="form-check-label" for="insurance-option-yes">Yes</label></div></div>',
      medicalStartDateHtml = '<div class="input-container medical-date-input-container study-hide"><label for="medical-start-datePicker">Medical Insurance Start Date<sup>*</sup></label><input type="text" value="'+placeHolder+'" class="form-control medical-date-picker" id="medical-start-datePicker" name="medical_start_datepicker" placeholder="'+placeHolder+'" required="" tabindex="0" disabled></div>',
      medicalEndDateHtml = '<div class="input-container medical-date-input-container study-hide"><label for="medical-end-datePicker">Medical Insurance End Date<sup>*</sup></label><input type="text" value="'+placeHolderEnd+'" class="form-control medical-date-picker" id="medical-end-datePicker" name="medical_end_datepicker" placeholder="'+placeHolderEnd+'" required="" tabindex="0" disabled></div>',
      inputHtml = optionHtml + medicalStartDateHtml + medicalEndDateHtml;

  if($('#'+insuranceClassName).is(':empty')){
    $('#'+insuranceClassName).html(inputHtml);

    showCalendar = countrySelected == 'Australia' ? 'hide' :'show';

    $('#medical-start-datePicker').datepicker(
      {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showAnim: showCalendar,
        defaultDate: new Date(yearStartVal,monthStartInt,dayStartVal,0,0),
        beforeShow: function() {if(countrySelected == 'Australia'){($(this).attr('readonly','readonly'))}},
        onSelect:function(dateText){
          dateObj = new Date(dateText);
          $(this).attr('data-value',dateObj.getTime());
        }
      }
    );
    $('#medical-end-datePicker').datepicker(
      {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showAnim: showCalendar,
        defaultDate: new Date(yearEndVal,monthEndInt,dayEndVal,0,0),
        beforeShow: function() {if(countrySelected == 'Australia'){($(this).attr('readonly','readonly'))}},
        onSelect:function(dateText){
          dateObj = new Date(dateText);
          $(this).attr('data-value',dateObj.getTime());
        }
      }
    );

  }else{
    $('#medical-start-datePicker').val(placeHolder);
    $('#medical-end-datePicker').val(placeHolderEnd);

    $('#medical-start-datePicker').datepicker('destroy');
    $('#medical-start-datePicker').datepicker(
      {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showAnim: showCalendar,
        defaultDate: new Date(yearStartVal,monthStartInt,dayStartVal,0,0),
        beforeShow: function() {if(countrySelected == 'Australia'){($(this).attr('readonly','readonly'))}},
        onSelect:function(dateText){
          dateObj = new Date(dateText);
          $(this).attr('data-value',dateObj.getTime());
        }
      }
    );
    $('#medical-end-datePicker').datepicker('destroy');
    $('#medical-end-datePicker').datepicker(
      {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showAnim: showCalendar,
        defaultDate: new Date(yearEndVal,monthEndInt,dayEndVal,0,0),
        beforeShow: function() {if(countrySelected == 'Australia'){($(this).attr('readonly','readonly'))}},
        onSelect:function(dateText){
          dateObj = new Date(dateText);
          $(this).attr('data-value',dateObj.getTime());
        }
      }
    );
  }
};

const printAdditionalInfoInput = function(){
  let additionClassName = 'additional-info-container';
  if($('.'+additionClassName).is(':empty')){
    printPersonForm(additionalInfoArray,false,'Additional',additionClassName);
  }
};

const printAdditionalFilesInput = function(){
  let additionClassName = 'additional-files-container';
  if($('.'+additionClassName).is(':empty')){
    printFilesForm(fileUploadArray,false,'Additional',additionClassName);
  }
  printHubspotFileForm(); 
};

const printHubspotFileForm = function(){
  hbspt.forms.create({
    region: "na1",
    portalId: "5020112",
    formId: additionalUploadFormId,
    target:"#additional-hs-file-form"
  });
}


const printFilesForm = function(formArray,enabled,categoryName,className){
  let result = formArray.filter(formArray => formArray.category == categoryName),
      countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
      residenceSelected = $('select[name=student_address_country] option:selected').val(),
      schoolSelected = $('input[name=program_school]:checked').attr('data-school'),
      schoolProgramSelected = $('input[name=program_school]:checked').val(),
      schoolCountrySelected = $('input[name=program_country').val(),
      nationalitySelected = $('select[name=student_nationality] option:selected').val()
  studentVisaSelected = $('input[name=student_visa_option]:checked').val();
  isAlternateSchoolChecked = $('input[name=is_alternate_apply][value=1]').is(':checked');
  schoolSelected = isAlternateSchoolChecked ? 'Greystone College' : schoolSelected;     

  for (let stForm in result) {

    let inputName,
        inputLabel,
        labelId,
        labelForm,
        inputForm,
        inputFormHtml,
        printInput = true,
        helperHtml = '';

    enableMultiple = result[stForm].enableMultiple;
    displayShow = result[stForm].displayShow == true? "form-show":"form-hide";
    inputName = result[stForm].inputName;
    labelId = _.camelCase(inputName);
    categoryName = result[stForm].category;
    value = result[stForm].value;
    helpTxt = result[stForm].helpText ? '<sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-content="'+result[stForm].helpText+'"></i></sup>' : '';
    let requiredValue = result[stForm].required == true? "required":"";

    if(result[stForm].residenceDependence){
      if(!result[stForm].residenceDependence.includes(residenceSelected)){
        printInput = false;
      }
    }
    if(result[stForm].visaOptionDependence){
      if(!result[stForm].visaOptionDependence.includes(studentVisaSelected)){
        printInput = false;
      }else{
        printInput = true;
      }
    }
    if(result[stForm].countryDependence){
      if(!result[stForm].countryDependence.includes(countrySelected)){
        printInput = false;
      }
      if(result[stForm].nationalityDependence){
        if(!result[stForm].nationalityDependence.includes(nationalitySelected)){
          printInput = false;
        }else{
          printInput = true;
        }
      }  
    }
    if(result[stForm].requiredSchool){
      if(result[stForm].requiredSchool.includes(schoolSelected)){
        if(result[stForm].requiredSchoolCountry){
          if(result[stForm].requiredSchoolCountry.includes(schoolCountrySelected)){
            requiredValue = 'required';
          }
        }else{
          requiredValue = 'required';
        }

      }
    }   
    if(result[stForm].displaySchool){
      if(!result[stForm].displaySchool.includes(schoolSelected)){
        printInput = false;
      }
    }
    if(result[stForm].schoolDependence){
      schoolDependenceList = result[stForm].schoolDependence.split(',')
      schoolDependenceArr = [];

      for(i=0; i < schoolDependenceList.length; i++){
        if(schoolProgramSelected.includes(schoolDependenceList[i])){
          schoolDependenceArr.push(true);
        }
      }

      if(!schoolDependenceArr.includes(true)){
        printInput = false;
      }

    }

    if(result[stForm].helperHtml){
      helperHtml = result[stForm].helperHtml;
    }
    if(result[stForm].ageMax){
      if(result[stForm].ageMax < age){
        printInput = false;
      }
    }

    if(printInput){
      if(!enabled){
        if(result[stForm].category == categoryName){

          switch(result[stForm].inputType){
            case 'file':
            checkSizeProp = enableMultiple ? 'onchange="checkSize(\''+labelId+'\')"' : '';
            multiProp = enableMultiple ? 'multiple' : '';
            multiHelpText = enableMultiple ? '<br><span class="footnote">(You can upload max. 5 files by selecting multiple files at the same time in the select window.)</span>' : '';
            inputForm = "<input type='file' "+checkSizeProp+" class='form-control additional-file-input' id='"+labelId+"' name='"+inputName+"' "+requiredValue+" data-bind='"+result[stForm].objInputName+"' data-category='"+categoryName+"' accept='jpeg,jpg,pdf,png' "+multiProp+"><input type='hidden' name='"+inputName+"' value='' readonly>";     
              break;
          }
          inputLabel = requiredValue == 'required' ? result[stForm].inputLabel+"<sup>*</sup>":result[stForm].inputLabel;
          labelForm = helperHtml+"<label for="+labelId+">"+inputLabel+helpTxt+multiHelpText+"</label>";
          validationForm = "<div class='valid-feedback'></div>"
          if(inputForm){
            inputFormHtml = labelForm + inputForm + validationForm;
          }
          if(inputFormHtml){

            $('.'+className).append("<div class='form-group "+displayShow+"'>"+inputFormHtml+"</div>");

          } 
        }
      }
    }


  }
};

const updateAdditionalJson = function(){
  let formObjectReset = localStorage.getItem(formJsonName),
      formJsonReset =  JSON.parse(formObjectReset),
      additionalArray = [];
  familyArray=[];

  for (let i = 0; i < 5; i++) {
    formJsonReset.additional_form_array[0].additional_visa_info[0].addition_family_members[i] = {};
  }
  localStorage.setItem(formJsonName, JSON.stringify(formJsonReset));

  let formObject = localStorage.getItem(formJsonName),
      formJson =  JSON.parse(formObject);

  let formAdditional_obj = $('form#additional-form').serializeArray();

  formAdditional_obj.forEach(function(inputAdditionalObj){
    additionalArray.push({
      name:   inputAdditionalObj.name,
      value:  inputAdditionalObj.value
    });
  })

  if(additionalArray.length > 0){
    formJson.additional_form_array[0].additional_form_enabled = true;
  }

  for (let i = 0; i < additionalArray.length; i++){

    keyValue = additionalArray[i].name;
    val = additionalArray[i].value;

    if(keyValue.includes('family')){
      splitName = additionalArray[i].name.split('_iterate_');
      iterateVal = splitName[1];
      familyArray.push({
        "iterate" : iterateVal,
        "name" :  splitName[0],
        "value" : val
      });
    }else{

      formJson.additional_form_array[0][additionalArray[i].name] = val;

    }

  }
  if(familyArray.length > 0){
    groupedFamily = groupBy(familyArray,"iterate");
    groupArray = new Object();
    groupArray = groupedFamily;
    values = Object.values(groupArray);

    for (let i = 0; i < values.length; i++) {
      for (let x = 0; x < values[i].length; x++){
        formJson.additional_form_array[0].additional_visa_info[0].addition_family_members[i][values[i][x].name] = values[i][x].value;
      }
    }

  }


  localStorage.setItem(formJsonName, JSON.stringify(formJson));
};

$(document).on( 'click', 'input[name=insurance_option]', function () {
  let schoolCountrySelected = $('input[name=program_country').val();

    if(schoolCountrySelected == 'Canada'){
        if($(this).val() == '1'){
            $('.medical-date-input-container input').attr('disabled',false);
            if(schoolVal == 'ELS'){
                $('.medical-date-input-container').removeClass('study-show').addClass('study-hide');
            }else{
                $('.medical-date-input-container').removeClass('study-hide').addClass('study-show');
            }
        }else{
            $('.medical-date-input-container input').attr('disabled',true);
            $('.medical-date-input-container').removeClass('study-show').addClass('study-hide');
        }
    }
});

$(document).on('click','input[name=additional_travel_family_members_option]',function(){
  if($(this).val() == 'No'){
    $('.additional-family-member-container input').attr('disabled',true);
    $('.additional-family-member-container').removeClass('study-show').addClass('study-hide');
  }else{
    $('.additional-family-member-container input').attr('disabled',false);
    $('.additional-family-member-container').removeClass('study-hide').addClass('study-show');
  }
});
$(document).on( 'click', '#additional-family-member', function () {
  dValue = $('.additional-family-member-container >div').length + 1;
  dClass = 'family-person-'+dValue;
  if(dValue < 6){
    $('.additional-family-member-container').append('<div class="'+dClass+' f-class"><i class="far fa-minus-square"></i><h4>Family Member #<span class="int-d-val">'+dValue+'</span></h4>');
    printPersonForm(familyMemberInfoArray,false,'Additional',dClass,dValue);
  }
});
$(document).on( 'click', '.additional-family-member-container .f-class i.fa-minus-square', function () {
  $(this).parent().remove();
  $('form#additional-form').attr('data-submit',false);
  $('.additional-family-member-container >div').each(function(i){
    dValueNew = i + 1;
    dClass = 'family-person-'+dValueNew;
    $(this).removeClass().addClass(dClass).addClass('f-class');
    $('span.int-d-val',this).html(dValueNew);
  })
});

$(document).on('change','input.jr-waiver-item-check,input[name=parent_guardian_first_name],input[name=parent_guardian_last_name]',function(){
  let parentFirstNameEnable = $('input[name=parent_guardian_first_name]').val() == '' ? false : true,
      parentLastNameEnable = $('input[name=parent_guardian_last_name]').val() == '' ? false : true,
      listItemArr = [];

      $('input.jr-waiver-item-check').each(function () {
          itemStatus = this.checked ? true : false;
          listItemArr.push(itemStatus);
      });

      checkStatus = listItemArr.includes(false) || !parentFirstNameEnable || !parentLastNameEnable ? true : false;

        $('input#jr-waiver-confirmation,input#jr-rules-confirmation,input#jr-medical-confirmation').prop('disabled',checkStatus);

});

$(document).on('change','input[name=parent_guardian_first_name],input[name=parent_guardian_last_name]',function(){
  let parentFirstName = $('input[name=parent_guardian_first_name]').val(),
      parentLastName = $('input[name=parent_guardian_last_name]').val(),
      parentName = parentFirstName + ' ' + parentLastName;
 
  $('input.jr-confirmation').prop('checked',false).val('');
  $('.parent-title').html(parentName);
});


$(document).on('change','input.jr-confirmation',function(){

  let className = $(this).attr('name');

  if(this.checked){
      addDigitalWaiverConfirmation(className);
  }else{
      $(this).val('');
  }
});
$(document).on('click','input[name=medical_medicine_option]',function(){
    let element = 'additional-jr-medical-container';

  if($(this).val() == 'No'){
      if($('#'+element).hasClass('study-hide')){
          $('#'+element).removeClass('study-show');
      }else{
          $('#'+element).addClass('study-hide').removeClass('study-show');
      }
        $('input[data-category=Additional-Junior-Medical],textarea[data-category=Additional-Junior-Medical]','#'+element).prop('disabled',true);
  }else{
      if($(this).hasClass('study-show')){
          $('#'+element).removeClass('study-hide');
      }else{
          $('#'+element).removeClass('study-hide').addClass('study-show');
      }
      $('input,textarea','#'+element).prop('disabled',false);
  }
})