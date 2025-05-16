//start step logic

const updateLocalJson = function(dataStep){

    switch(dataStep){
        case 'status-select':
            updateStatusJson();
            printStudenForm();

            break;

        case 'student-info-select':
            updateStudentInfoJson();
            getSchoolCountryList();

            break;

        case 'study-program-select':
            updateProgramJson();

            break;

        case 'accommodation-select':
            updateAccommodationJson();
            printAdditionalForm();
            break;

        case 'additional-select':
            updateAdditionalJson();
            printApplicationSummary();
            break;

        case 'submit-select':
            $('.denote-container').hide();
            $('.fixed-side-menu').hide();
            deleteCookie("form-obj");
            break;

    };
};

const addDigitalConfirmation = function(){
    let applicantStatus = $('input[name=online_applicant_status]:checked').val(),
        agentName = applicantStatus == 'Agent' ? $('input[name=agency_contact_person]').val() : false,
        agencyName = applicantStatus == 'Agent' ? $('input[name=agency_name]').val() : false,
        studentName = $('input[name=student_first_name]').val() + ' ' + $('input[name=student_last_name]').val(),
        todayDate = new Date(),
        currentMonth = todayDate.getMonth() + 1,
        timeStamp = todayDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
        timeZoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone,
        todayDateStr = todayDate.getDate()+'/'+currentMonth+'/'+todayDate.getFullYear()+' '+timeStamp+ ' (Timezone: '+timeZoneStr+')',
        selectedCountry = $('input[name=program_country]').val(),
        selectedPrimarySchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedSecondarySchool = $('input[name=program_school_alternate-input]').val(),
        accommodationBool = $('input[name=accommodation_option]:checked').val(),
        termsFileCurrentVersion_LS_CA_val = termsFileCurrentVersion_LS_CA ? termsFileCurrentVersion_LS_CA : '',
        termsFileCurrentUrl_LS_CA_val =  termsFileCurrentUrl_LS_CA ? termsFileCurrentUrl_LS_CA : '',
        termsFileCurrentVersion_LS_IN_val = termsFileCurrentVersion_LS_IN ? termsFileCurrentVersion_LS_IN : '', 
        termsFileCurrentUrl_LS_IN_val = termsFileCurrentUrl_LS_IN ? termsFileCurrentUrl_LS_IN : '', 
        termsFileCurrentVersion_ELS_US_val = termsFileCurrentVersion_ELS_US ? termsFileCurrentVersion_ELS_US : '',
        termsFileCurrentUrl_ELS_US_val = termsFileCurrentUrl_ELS_US ? termsFileCurrentUrl_ELS_US : '',    
        termsFileCurrentVersion_GC_CA_val = termsFileCurrentVersion_GC_CA ? termsFileCurrentVersion_GC_CA : '', 
        termsFileCurrentUrl_GC_CA_val = termsFileCurrentUrl_GC_CA ? termsFileCurrentUrl_GC_CA : '', 
        termsFileCurrentVersion_GC_AU_val = termsFileCurrentVersion_GC_AU ? termsFileCurrentVersion_GC_AU : '', 
        termsFileCurrentUrl_GC_AU_val =  termsFileCurrentUrl_GC_AU ?  termsFileCurrentUrl_GC_AU : '', 
        termsFileCurrentVersion_LS_AU_val = termsFileCurrentVersion_LS_AU ? termsFileCurrentVersion_LS_AU : '',
        termsFileCurrentUrl_LS_AU_val = termsFileCurrentUrl_LS_AU ? termsFileCurrentUrl_LS_AU : '',
        accommodationCurrentVersion_CA_val = accommodationCurrentVersion_CA ? accommodationCurrentVersion_CA : '', 
        accommodationCurrentUrl_CA_val = accommodationCurrentUrl_CA ? accommodationCurrentUrl_CA : '',
        accommodationCurrentVersion_US_val = accommodationCurrentVersion_US ? accommodationCurrentVersion_US : '', 
        accommodationCurrentUrl_US_val = accommodationCurrentUrl_US ? accommodationCurrentUrl_US : '',    
        accommodationCurrentVersion_AU_val = accommodationCurrentVersion_AU ? accommodationCurrentVersion_AU : '', 
        accommodationCurrentUrl_AU_val = accommodationCurrentUrl_AU ? accommodationCurrentUrl_AU : '', 
        accommodationCurrentVersion_IN_val = accommodationCurrentVersion_IN ? accommodationCurrentVersion_IN : '', 
        accommodationCurrentUrl_IN_val = accommodationCurrentUrl_IN ? accommodationCurrentUrl_IN : ''; 

        policyVersion = selectedPrimarySchool == 'Language School' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_LS_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_LS_AU_val : selectedCountry == 'India' ? termsFileCurrentVersion_LS_IN_val : '' : selectedPrimarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_GC_AU_val : '' : selectedPrimarySchool == 'ELS' ? termsFileCurrentVersion_ELS_US_val : '';

        policyVersion2 = selectedSecondarySchool ? selectedSecondarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_GC_AU_val : false : false : false; 

        policyFileUrl = selectedPrimarySchool == 'Language School' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_LS_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_LS_AU_val : selectedCountry == 'India' ? termsFileCurrentUrl_LS_IN_val : '' : selectedPrimarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_GC_AU_val : '' : selectedPrimarySchool == 'ELS' ? termsFileCurrentUrl_ELS_US_val : '';

        policyFileUrl2 = selectedSecondarySchool ? selectedSecondarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_GC_AU_val : false : false : false; 

        accommodationVersion = accommodationBool == 1 ? selectedCountry == 'Canada' ? accommodationCurrentVersion_CA_val : selectedCountry == 'Australia' ? accommodationCurrentVersion_AU_val : selectedCountry == 'India' ? accommodationCurrentVersion_IN_val : selectedCountry == 'USA' ? accommodationCurrentVersion_US_val : false : false;

        accommodationUrl = accommodationBool == 1 ? selectedCountry == 'Canada' ? accommodationCurrentUrl_CA_val : selectedCountry == 'Australia' ? accommodationCurrentUrl_AU_val : selectedCountry == 'India' ? accommodationCurrentUrl_IN_val : selectedCountry == 'USA' ? accommodationCurrentUrl_US_val : false : false;

        fileName = policyFileUrl ? policyFileUrl.split('/').pop().replace('.pdf','') : '';
        fileName2 = policyFileUrl2 ? policyFileUrl2.split('/').pop().replace('.pdf','') : '';
        accommodationFileName = accommodationUrl ? accommodationUrl.split('/').pop().replace('.pdf','') : '';

        policyStr = selectedPrimarySchool == 'Language School' && selectedSecondarySchool ? ' on policies ' + fileName+ ' and ' +fileName2 : ' on policies ' + fileName;

        policyStr = accommodationBool == 1 ? policyStr + ' and on accommodation policies ' +accommodationFileName : policyStr;

        signatureName = applicantStatus == 'Agent' ? agentName : studentName;

        digitalConfirmationTxt ='Electronic Signature Received: '+signatureName+' '+todayDateStr;

        $('input[name=e_signature_digital_confirmation]').val(digitalConfirmationTxt);

        if(policyFileUrl){
            $('input[name=primary_application_terms_and_condition_policy_url]').val(policyFileUrl);
        }
        if(policyFileUrl2){
            $('input[name=secondary_application_terms_and_condition_policy_url]').val(policyFileUrl2);
        }
        if(accommodationUrl){
            $('input[name=accommodation_policy_url]').val(accommodationUrl);
        }
}

const printApplicationSummary = function () {

    let schoolSelected = $('input[name=program_school]:checked').attr('data-school'),
        schoolValSelected = $('input[name=program_school]:checked').val(),
        parentSchool = schoolVal,
        applicantStatus = $('input[name=online_applicant_status]:checked').val(),
        countrySelected = $('input[name=program_country]').val(),
        studentFormArray = $('#form-student').serializeArray(),
        studyFormArray = $('#study-form').serializeArray(),
        accommodationFormArray = $('#accommodation-form').serializeArray(),
        additionalFormArray = $('#additional-form').serializeArray(),
        studentLabelArray = [],
        programPrimaryLabelArray = [],
        programAlternateLabelArray = [],
        programAdditionalArray = [], 
        accommodationLabelArray = [],
        homestayLabelArray = [],
        additionalLabelArray = [],
        fileUploadLabelArray = [],
        dependentArray = [],
        familyArray = [],
        stLabelHtml = '',
        pgPrimaryLabelHtml = '',
        pgAlternateLabelHtml = '',
        accLabelHtml = '',
        hsLabelHtml = '',
        addLabelHtml = '',
        fileLabelHtml = '';

    addDigitalConfirmation();

    for (let stf = 0; stf < studentFormArray.length; stf++) {
        for (let sti = 0; sti < studentInfoArray.length; sti++) {
            if(studentInfoArray[sti].schoolParentDependence.includes(parentSchool)){
                if(studentFormArray[stf].name == studentInfoArray[sti].inputName){
                
                    studentLabelArray.push({
                        'name': studentFormArray[stf].name,
                        'label': studentInfoArray[sti].inputLabel,
                        'value': studentFormArray[stf].value
                    });
                    
                }
            }
        }
    };
    for (let st = 0; st < studentLabelArray.length; st++) {
            stLabelHtml += '<tr><td><span class="bold">'+studentLabelArray[st].label+'</span></td><td><span class="value-input">'+studentLabelArray[st].value+'</span></td></tr>';
    };

        $('.peronal-info-summary-container').html('<table class="application-summary-tbl">'+stLabelHtml+'</table>');

    for (let stf = 0; stf < studyFormArray.length; stf++) {
            if(studyFormArray[stf].name.includes('dependent')){
                for (let di = 0; di < dependentInputArray.length; di++) {
                    splitName = studyFormArray[stf].name.split('_iterate_');
                    iterateVal = splitName[1];
                        if(splitName[0] == dependentInputArray[di].inputName){
                        dependentArray.push({
                                "iterate" : iterateVal,
                                "name" :  splitName[0],
                                "value" : studyFormArray[stf].value,
                                "label" : dependentInputArray[di].inputLabel
                        });
                    }
                }
            }else if(studyFormArray[stf].name.includes('combo')){
                for (let pa = 0; pa < programInfoArray.length; pa++) {
                    splitName = studyFormArray[stf].name.split('_combo-');
                    iterateVal = splitName[1];
                        if(splitName[0] == programInfoArray[pa].inputName){
                        
                        programValue = programInfoArray[pa].inputLabel.includes('Program Type') ?  studyFormArray[stf].value == 0 ? 'Academic' : 'Co-Op' : studyFormArray[stf].value;

                        programAdditionalArray.push({
                                "iterate" : iterateVal,
                                "name" :  splitName[0],
                                "value" : programValue,
                                "label" : programInfoArray[pa].inputLabel
                        });
                    }
                }
            }else{
                for (let pi = 0; pi < programInfoArray.length; pi++) {

                        if(studyFormArray[stf].name == programInfoArray[pi].inputName){

                        valueStr = studyFormArray[stf].name.includes('program_is_coop_') ? studyFormArray[stf].value == 1 ? 'Co-Op' : studyFormArray[stf].value == 0 ? 'Academic' : studyFormArray[stf].value : studyFormArray[stf].value == 1 ? 'Yes' : studyFormArray[stf].value == 0 ? 'No' : studyFormArray[stf].value;

                            if(programInfoArray[pi].inputAssign == 'primary'){
                            programPrimaryLabelArray.push({
                                'name': studyFormArray[stf].name,
                                'label': programInfoArray[pi].inputLabel,
                                    'value':  valueStr
                            });
                            }else{
                            programAlternateLabelArray.push({
                                'name': studyFormArray[stf].name,
                                'label': programInfoArray[pi].inputLabel,
                                    'value':  valueStr
                            });
                        }
                    }
                }
        }
    };
    for (let pr = 0; pr < programPrimaryLabelArray.length; pr++) {
            pgPrimaryLabelHtml += '<tr><td><span class="bold">'+programPrimaryLabelArray[pr].label+'</span></td><td><span class="value-input">'+programPrimaryLabelArray[pr].value+'</span></td></tr>';
    };

        $('.study-info-primary-summary-container').html('<table class="application-summary-tbl">'+pgPrimaryLabelHtml+'</table>');

        if(programAlternateLabelArray.length > 0){
        for (let pa = 0; pa < programAlternateLabelArray.length; pa++) {
                pgAlternateLabelHtml += '<tr><td><span class="bold">'+programAlternateLabelArray[pa].label+'</span></td><td><span class="value-input">'+programAlternateLabelArray[pa].value+'</span></td></tr>';
        };
            $('.study-info-alternate-summary-container').html('<div class="study-box-container"><h4>+Greystone College</h4><table class="application-summary-tbl">'+pgAlternateLabelHtml+'</table></div>');
    }

    for (let acc = 0; acc < accommodationFormArray.length; acc++) {

            if(accommodationFormArray[acc].name.includes('homestay') || accommodationFormArray[acc].name.includes('residence')){
            for (let o = 0; o < accommodationAdditionalArray.length; o++) {

                if (accommodationAdditionalArray[o].countryDependence.includes(countrySelected)) {
                    if (accommodationFormArray[acc].name == accommodationAdditionalArray[o].inputName) {
                        homestayLabelArray.push({
                            'name': accommodationFormArray[acc].name,
                            'label': accommodationAdditionalArray[o].inputLabel,
                            'value': accommodationFormArray[acc].value
                        });
                    }
                }
            }
        } else {
            for (let o = 0; o < accommodationInfoArray.length; o++) {

                if (accommodationInfoArray[o].countryDependence.includes(countrySelected)) {
                    if (accommodationFormArray[acc].name == accommodationInfoArray[o].inputName) {
                        accommodationLabelArray.push({
                            'name': accommodationFormArray[acc].name,
                            'label': accommodationInfoArray[o].inputLabel,
                            'value': accommodationFormArray[acc].value
                        });
                    }
                }
            }
        }
    };
    if (accommodationLabelArray.length > 0) {
        for (let acc = 0; acc < accommodationLabelArray.length; acc++) {
            valueStr = accommodationLabelArray[acc].value == 1 ? 'Yes' : accommodationLabelArray[acc].value == 0 ? 'No' : accommodationLabelArray[acc].value;
            accLabelHtml += '<tr><td><span class="bold">' + accommodationLabelArray[acc].label + '</span></td><td><span class="value-input">' + valueStr + '</span></td></tr>';
        };
        accLabelHtml = '<table class="application-summary-tbl">' + accLabelHtml + '</table>';

        if (homestayLabelArray.length > 0) {
            for (let hs = 0; hs < homestayLabelArray.length; hs++) {
                hsLabelHtml += '<tr><td><span class="bold">' + homestayLabelArray[hs].label + '</span></td><td><span class="value-input">' + homestayLabelArray[hs].value + '</span></td></tr>';
            };
            hsLabelHtml = '<h5>Additional Details</h5><table class="application-summary-tbl">' + hsLabelHtml + '</table>';
        }

        $('.accommodation-info-summary-container').html(accLabelHtml + hsLabelHtml);
        if(countrySelected == 'Online'){
            $('.accommodation-info-summary-container').addClass('study-hide').removeClass('study-show');
        }else{
            $('.accommodation-info-summary-container').addClass('study-show').removeClass('study-hide');
        }
        
    } else {
        $('.accommodation-info-summary-container').addClass('study-hide').removeClass('study-show');
    }
    for (let ad = 0; ad < additionalFormArray.length; ad++) {
        if (additionalFormArray[ad].name.includes('additional_family')) {
            for (let fm = 0; fm < familyMemberInfoArray.length; fm++) {
                splitName = additionalFormArray[ad].name.split('_iterate_');
                iterateVal = splitName[1];
                if (splitName[0] == familyMemberInfoArray[fm].inputName) {
                    familyArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": additionalFormArray[ad].value,
                        "label": familyMemberInfoArray[fm].inputLabel
                    });
                }
            }
        } else {

            if (additionalFormArray[ad].name.includes('file')) {

                objUnique = fileUploadArray.reduce((acc, z) => {
                    var exist = acc.find(({ inputName }) => z.inputName === inputName);
                    if (!exist) {
                        acc.push(z);
                    }
                    return acc;
                }, []);

            } else {
                objUnique = additionalInfoArray.reduce((acc, z) => {
                    var exist = acc.find(({ inputName }) => z.inputName === inputName);
                    if (!exist) {
                        acc.push(z);
                    }
                    return acc;
                }, []);
            }

            if (additionalFormArray[ad].name.includes('file')) {
                for (let ob = 0; ob < objUnique.length; ob++) {
                    if (additionalFormArray[ad].name == objUnique[ob].inputName) {
                        valueStr = additionalFormArray[ad].value == 1 ? 'Yes' : additionalFormArray[ad].value == 0 ? 'No' : additionalFormArray[ad].value;
                        fileUploadLabelArray.push({
                            'name': additionalFormArray[ad].name,
                            'label': objUnique[ob].inputLabel,
                            'value': valueStr
                        });
                    }
                }
            } else {
                for (let ob = 0; ob < objUnique.length; ob++) {
                    if (additionalFormArray[ad].name == objUnique[ob].inputName) {
                        valueStr = additionalFormArray[ad].value == 1 ? 'Yes' : additionalFormArray[ad].value == 0 ? 'No' : additionalFormArray[ad].value;
                        additionalLabelArray.push({
                            'name': additionalFormArray[ad].name,
                            'label': objUnique[ob].inputLabel,
                            'value': valueStr
                        });
                    }
                }
            }


        }
    };
    for (let add = 0; add < additionalLabelArray.length; add++) {
        valueStr = additionalLabelArray[add].value == 1 ? 'Yes' : additionalLabelArray[add].value == 0 ? 'No' : additionalLabelArray[add].value;
        addLabelHtml = addLabelHtml + '<tr><td><span class="bold">' + additionalLabelArray[add].label + '</span></td><td><span class="value-input">' + valueStr + '</span></td></tr>';
    };
    addLabelHtml = '<table class="application-summary-tbl">' + addLabelHtml + '</table>';

    if (fileUploadLabelArray.length > 0) {
        for (let f = 0; f < fileUploadLabelArray.length; f++) {
            fileLabelHtml += '<tr><td><span class="bold">' + fileUploadLabelArray[f].label + '</span></td><td><span class="value-input">' + fileUploadLabelArray[f].value + '</span></td></tr>';
        };
        fileLabelHtml = '<h5>File Uploads</h5><table class="application-summary-tbl">' + fileLabelHtml + '</table>';
    }

    $('.additional-info-summary-container').html(addLabelHtml + fileLabelHtml);

    if (programAdditionalArray.length > 0) {
        groupedDependent = groupBy(programAdditionalArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.study-info-program-additional-summary-container').empty();

        for (let ap = 0; ap < values.length; ap++) {
            pgAdditionalLabelHtml = '';
            for (let pga = 0; pga < values[ap].length; pga++) {
                pgAdditionalLabelHtml += '<tr><td><span class="bold">' + values[ap][pga].label + '</span></td><td><span class="value-input">' + values[ap][pga].value + '</span></td></tr>';
            }
            headerLabel = ap == 0 ? '<h5>Additional Programs</h5>' : '';
            programInt = ap + 2;
            $('.study-info-program-additional-summary-container').append(headerLabel + '<table style="width:100%;margin-bottom:30px;"><th>+Program #'+programInt+'</th>' + pgAdditionalLabelHtml + '</table>');
        }

    }

    if (dependentArray.length > 0) {
        groupedDependent = groupBy(dependentArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.study-info-dependent-summary-container').empty();

        for (let da = 0; da < values.length; da++) {
            pgDependentLabelHtml = '';
            for (let pgd = 0; pgd < values[da].length; pgd++) {
                pgDependentLabelHtml += '<tr><td><span class="bold">' + values[da][pgd].label + '</span></td><td><span class="value-input">' + values[da][pgd].value + '</span></td></tr>';
            }
            headerLabel = da == 0 ? '<h5>Dependent Family Members</h5>' : '';
            $('.study-info-dependent-summary-container').append(headerLabel + '<table>' + pgDependentLabelHtml + '</table>');
        }

    }

    if (familyArray.length > 0) {
        groupedDependent = groupBy(familyArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.additional-info-family-summary-container').empty();

        for (let fm = 0; fm < values.length; fm++) {
            addFamilyLabelHtml = '';
            for (let afm = 0; afm < values[fm].length; afm++) {
                addFamilyLabelHtml += '<tr><td><span class="bold">' + values[fm][afm].label + '</span></td><td><span class="value-input">' + values[fm][afm].value + '</span></td></tr>';
            }
            headerLabel = fm == 0 ? '<h5>Family Members</h5>' : '';
            $('.additional-info-family-summary-container').append(headerLabel + '<table>' + addFamilyLabelHtml + '</table>');
        }

    }

    policyLink = schoolSelected == 'ELS' ? 'https://www.els.edu/terms-of-use' : schoolSelected == 'Greystone College' ? countrySelected == 'Canada' ? 'https://www.ilsc.com/greystone-college/canada/policies' : 'https://www.ilsc.com/greystone-college/australia/policies' : 'https://www.ilsc.com/language-schools/policies-procedures';
    accommLink = schoolSelected == 'ELS' ? 'https://www.els.edu/hubfs/ELS/pdf/documents/ELS_Cancellation_Policy.pdf' : 'https://www.accommodations.ilsc.com/accommodation-booking-policy';
    contractLink = countrySelected == 'Australia' ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-australia-terms-conditions.pdf' : countrySelected == 'Canada' ? schoolValSelected.includes('Juniors') ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/junior-student-contract-agreement.pdf' :'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf' : countrySelected == 'India' ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-india-terms-conditions.pdf' : 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf';
    termsLink = countrySelected == 'Canada' ? schoolValSelected.includes('Juniors') ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/junior-supplemental-forms.pdf' : '' : '';
    privacyLink = schoolSelected == 'ELS' ? 'https://www.els.edu/privacy-policy' : '';
    tuitionLink = schoolSelected == 'ELS' ? 'https://www.els.edu/admissions/tuition-fees' : '';
    cancelLink = schoolSelected == 'ELS' ? 'https://www.els.edu/hubfs/ELS/pdf/documents/ELS_Cancellation_Policy.pdf' : '';

    proofOfFundsHtml = schoolSelected == 'ELS' ? applicantStatus == 'Agent' ? proofOfFundsAgentFormStatementHtml : '' : '';

    languageSchoolContractTxt = schoolValSelected.includes('Juniors') ? 'To finalize your application, you must acknowledge that you have read and agree to the student contract and must fill out other supplemental forms to help us administer the program to you.  You can download the student contract and supplemental forms from the following links, sign them and attach your completed copies here using the file attachment link, or you may send them later by email:<div class="school-details"><ul class="arrows"><li>Junior Student Contract (PDF) <a href="' + contractLink + '" target="_blank" download>Download</a></li><li>Junior Supplemental Forms (PDF) <a href="' + termsLink + '" target="_blank" download>Download</a></li></ul></div>' : 'To finalize your application, you must acknowledge that you have read and agreed to the policies and procedures that apply to your chosen study country, and, if applicable, the Accommodation Policy. You can download the policies and procedures from the following link, sign it, and attach your signed copy here now using the file attachment link, or you may send it by email later. <a href="' + contractLink + '" target="_blank" download>Download</a>';

    elsPolicyTxt = releaseFormStatementHtml+'By submitting this form by clicking the confirmation button below, you acknowledge that you have read and agreed to the <a href="' + policyLink + '" target="_blank">Terms of Use</a>, <a href="' + privacyLink + '" target="_blank">Privacy Policy</a>, <a href="' + cancelLink + '" target="_blank">Cancellation & Refund Policy</a> and <a href="' + tuitionLink + '" target="_blank">Prices & Dates addendum</a>.'+proofOfFundsHtml;

    policyHtml = schoolSelected == 'ELS' ? elsPolicyTxt : languageSchoolContractTxt;

    $('.submit-policy-container').html(policyHtml);
    $('.step-breadcrumb-container').hide();

    if (schoolSelected != 'ELS') {
        printContractFileInput();
    }

};

const printContractFileInput = function () {
    let additionClassName = 'submit-policy-file-container';
    if ($('.' + additionClassName).is(':empty')) {
        printFilesForm(fileUploadArray, false, 'Summary', additionClassName);
    }
    printHubSpotContractFile();
};

const printHubSpotContractFile = function () {
    hbspt.forms.create({
        region: "na1",
        portalId: "5020112",
        formId: contractUploadFormId,
        target: '#contract-hs-file-form'
    });
}

const printPersonForm = function (formArray, enabled, categoryName, className, dVal) {

    let result = formArray.filter(formArray => formArray.category == categoryName),
        dateVar = $('.date-picker').length,
        dInt = dVal ? '_iterate_' + dVal : '',
        startDate = new Date($('select[name=program_startdate_primary-input] option:checked').val()),
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        age = calculate_age(dateBirthTime, startDate.getTime()),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        parentSchool = schoolVal,
        applicationName = $('input[name=online_applicant_status]:checked').val();

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
        requiredValue = result[stForm].requiredDependence ? result[stForm].requiredDependence.includes(schoolVal) ? "required" : "" : result[stForm].required == true ? "required" : "";
        inputLabel = requiredValue == 'required' ? result[stForm].inputLabel + "<sup>*</sup>" : result[stForm].inputLabel;
        disabledVal = '';


        if (result[stForm].countryDependence) {
            if (!result[stForm].countryDependence.includes(countrySelected)) {
                printInput = false;
            }
        }
        if (result[stForm].ageMax) {
            if (result[stForm].ageMax < age) {
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
                                inputForm = "<input type='email' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' value='" + value + "'  " + disabledVal + ">";
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
                                inputForm = "<input type='text' value='" + value + "' class='form-control date-picker' id='" + categoryName + "-datePicker-" + dateVar + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " placeholder='YYYY-MM-DD' data-category='" + categoryName + "'  " + disabledVal + " onkeydown='event.preventDefault()'>";
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
                                            inputName = result[stForm].obj[optionList].optionMultiObj[0].inputName;
                                            labelId = _.camelCase(inputName);
                                            requiredValue = result[stForm].obj[optionList].optionMultiObj[0].required == true ? "required" : "";
                                            dependentLabel = result[stForm].obj[optionList].optionMultiObj[0].inputLabel;
                                            optionHtml += '<legend class="dependent-target study-hide">' + dependentLabel + '</legend>';

                                            for (let i = 0; i < result[stForm].obj[optionList].optionMultiObj[0].obj.length; i++) {

                                                optionValue = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionValue;
                                                optionLabel = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionLabel;
                                                otherClass = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionType == 'option-other' ? 'other-input' : 'indenpendent-input';

                                                optionHtml += '<div class="form-check multi-target dependent-target study-hide" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + i + dInt + '" value="' + optionValue + '" ' + requiredValue + ' ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + i + '">' + optionLabel + '</label></div>';

                                                if (result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionType == 'option-other') {
                                                    depClass = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? 'dependent-target study-hide' : '';
                                                    depTarget = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass : '';
                                                    optionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].placeholder + "' " + disabledVal + ">";
                                                }
                                            }

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
                            $('.' + className).append("<div class='form-group " + classWidth + " " + hideForm + "'>" + inputFormHtml + "</div>");

                        }
                    }
                }
            }
        }
    }
    $(function () {
        $('.date-picker').each(function () {
            $(this).datepicker(
                {
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-70:+00",
                    onSelect: function (dateText) {
                        dateObj = new Date(dateText);
                        $(this).attr('data-value', dateObj.getTime());
                    }

                }
            );
        });
    });
};
const printStudenForm = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        applicationStatus = formJson.application_status,
        studentFormEnabled = formJson.agency_form_array[0].student_info_form_enabled,
        agencyFormEnabled = formJson.agency_form_array[0].agency_form_enabled,
        advisorFormEnabled = formJson.advisor_form_array[0].advisor_form_enabled,
        categoryStudentName = 'Student',
        categoryAgentName = 'Agent',
        categoryAdvisorName = 'Advisor',
        classStudentName = 'student-information-form',
        classAgentName = 'agent-information-form',
        classAdvisorName = 'advisor-information-form';

    if (applicationStatus == 'Agent') {
        //printAgentForm();
        $('.' + classAdvisorName).empty();
        if ($('.' + classAgentName).is(':empty')) {
            printPersonForm(studentInfoArray, agencyFormEnabled, categoryAgentName, classAgentName);

        }
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-advisor').removeClass('form-show').addClass('form-hide');
        $('form#form-agent,form#form-student').removeClass('form-hide').addClass('form-show');
    } else if (applicationStatus == 'Walk-in Student Advisor') {
        //printAgentForm();
        $('.' + classAgentName).empty();
        if ($('.' + classAdvisorName).is(':empty')) {
            printPersonForm(studentInfoArray, advisorFormEnabled, categoryAdvisorName, classAdvisorName);
        }
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-agent').removeClass('form-show').addClass('form-hide');
        $('form#form-advisor,form#form-student').removeClass('form-hide').addClass('form-show');
    } else if (applicationStatus == 'Student') {
        $('.' + classAgentName).empty();
        $('.' + classAdvisorName).empty();
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-student').removeClass('form-hide').addClass('form-show');
        $('form#form-agent').removeClass('form-show').addClass('form-hide');
        $('form#form-advisor').removeClass('form-show').addClass('form-hide');
    }


    //on change events
    $("#studentAddressCountry").change(function () {
        if (this.value == 'Australia') {
            $('#studentVisaTypeNumber').parent().removeClass('form-hide').addClass('form-show');
        } else {
            $('#studentVisaTypeNumber').parent().removeClass('form-show').addClass('form-hide');
        }
    });

};

const updateStudentInfoJson = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        agentInfoArray = [],
        studentInfoArray = [];

    let formAgent_obj = $('form#form-agent').serializeArray();
    formAgent_obj.forEach(function (inputAgentObj) {
        agentInfoArray.push({
            name: inputAgentObj.name,
            value: inputAgentObj.value
        });
    });
    if (agentInfoArray.length > 0) {
        formJson.agency_form_array[0].agency_form_enabled = true;
    }
    for (let i = 0; i < agentInfoArray.length; i++) {
        formJson.agency_form_array[0][agentInfoArray[i].name] = agentInfoArray[i].value;
    }

    let formStudent_obj = $('form#form-student').serializeArray();
    formStudent_obj.forEach(function (inputStdObj) {
        studentInfoArray.push({
            name: inputStdObj.name,
            value: inputStdObj.value
        });
    })
    if (studentInfoArray.length > 0) {
        formJson.student_info_form_array[0].student_form_enabled = true;
    }
    for (let i = 0; i < studentInfoArray.length; i++) {
        formJson.student_info_form_array[0][studentInfoArray[i].name] = studentInfoArray[i].value;
    }
    localStorage.setItem(formJsonName, JSON.stringify(formJson));

};

const updateProgramJson = function () {
    let formObjectReset = localStorage.getItem(formJsonName),
        formJsonReset = JSON.parse(formObjectReset),
        programArray = [];
    dependentArray = [];

    for (let i = 0; i < 6; i++) {
        formJsonReset.program_form_array[0].program_additional_info[0].visa_form_dependent[i] = {};
    }
    localStorage.setItem(formJsonName, JSON.stringify(formJsonReset));

    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject);

    let formProgram_obj = $('form#study-form').serializeArray();

    formProgram_obj.forEach(function (inputProgramObj) {
        programArray.push({
            name: inputProgramObj.name,
            value: inputProgramObj.value
        });
    })

    if (programArray.length > 0) {
        formJson.program_form_array[0].program_form_enabled = true;
    }

    for (let i = 0; i < programArray.length; i++) {

        keyValue = programArray[i].name;//start step logic

const updateLocalJson = function(dataStep){

    switch(dataStep){
        case 'status-select':
            updateStatusJson();
            printStudenForm();

            break;

        case 'student-info-select':
            updateStudentInfoJson();
            getSchoolCountryList();

            break;

        case 'study-program-select':
            updateProgramJson();

            break;

        case 'accommodation-select':
            updateAccommodationJson();
            printAdditionalForm();
            break;

        case 'additional-select':
            updateAdditionalJson();
            printApplicationSummary();
            break;

        case 'submit-select':
            $('.denote-container').hide();
            $('.fixed-side-menu').hide();
            deleteCookie("form-obj");
            break;

    };
};

const addDigitalConfirmation = function(){
    let applicantStatus = $('input[name=online_applicant_status]:checked').val(),
        agentName = applicantStatus == 'Agent' ? $('input[name=agency_contact_person]').val() : false,
        agencyName = applicantStatus == 'Agent' ? $('input[name=agency_name]').val() : false,
        studentName = $('input[name=student_first_name]').val() + ' ' + $('input[name=student_last_name]').val(),
        todayDate = new Date(),
        currentMonth = todayDate.getMonth() + 1,
        timeStamp = todayDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
        timeZoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone,
        todayDateStr = todayDate.getDate()+'/'+currentMonth+'/'+todayDate.getFullYear()+' '+timeStamp+ ' (Timezone: '+timeZoneStr+')',
        selectedCountry = $('input[name=program_country]').val(),
        selectedPrimarySchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedSecondarySchool = $('input[name=program_school_alternate-input]').val(),
        accommodationBool = $('input[name=accommodation_option]:checked').val(),
        termsFileCurrentVersion_LS_CA_val = termsFileCurrentVersion_LS_CA ? termsFileCurrentVersion_LS_CA : '',
        termsFileCurrentUrl_LS_CA_val =  termsFileCurrentUrl_LS_CA ? termsFileCurrentUrl_LS_CA : '',
        termsFileCurrentVersion_LS_IN_val = termsFileCurrentVersion_LS_IN ? termsFileCurrentVersion_LS_IN : '', 
        termsFileCurrentUrl_LS_IN_val = termsFileCurrentUrl_LS_IN ? termsFileCurrentUrl_LS_IN : '', 
        termsFileCurrentVersion_ELS_US_val = termsFileCurrentVersion_ELS_US ? termsFileCurrentVersion_ELS_US : '',
        termsFileCurrentUrl_ELS_US_val = termsFileCurrentUrl_ELS_US ? termsFileCurrentUrl_ELS_US : '',    
        termsFileCurrentVersion_GC_CA_val = termsFileCurrentVersion_GC_CA ? termsFileCurrentVersion_GC_CA : '', 
        termsFileCurrentUrl_GC_CA_val = termsFileCurrentUrl_GC_CA ? termsFileCurrentUrl_GC_CA : '', 
        termsFileCurrentVersion_GC_AU_val = termsFileCurrentVersion_GC_AU ? termsFileCurrentVersion_GC_AU : '', 
        termsFileCurrentUrl_GC_AU_val =  termsFileCurrentUrl_GC_AU ?  termsFileCurrentUrl_GC_AU : '', 
        termsFileCurrentVersion_LS_AU_val = termsFileCurrentVersion_LS_AU ? termsFileCurrentVersion_LS_AU : '',
        termsFileCurrentUrl_LS_AU_val = termsFileCurrentUrl_LS_AU ? termsFileCurrentUrl_LS_AU : '',
        accommodationCurrentVersion_CA_val = accommodationCurrentVersion_CA ? accommodationCurrentVersion_CA : '', 
        accommodationCurrentUrl_CA_val = accommodationCurrentUrl_CA ? accommodationCurrentUrl_CA : '',
        accommodationCurrentVersion_US_val = accommodationCurrentVersion_US ? accommodationCurrentVersion_US : '', 
        accommodationCurrentUrl_US_val = accommodationCurrentUrl_US ? accommodationCurrentUrl_US : '',    
        accommodationCurrentVersion_AU_val = accommodationCurrentVersion_AU ? accommodationCurrentVersion_AU : '', 
        accommodationCurrentUrl_AU_val = accommodationCurrentUrl_AU ? accommodationCurrentUrl_AU : '', 
        accommodationCurrentVersion_IN_val = accommodationCurrentVersion_IN ? accommodationCurrentVersion_IN : '', 
        accommodationCurrentUrl_IN_val = accommodationCurrentUrl_IN ? accommodationCurrentUrl_IN : ''; 

        policyVersion = selectedPrimarySchool == 'Language School' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_LS_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_LS_AU_val : selectedCountry == 'India' ? termsFileCurrentVersion_LS_IN_val : '' : selectedPrimarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_GC_AU_val : '' : selectedPrimarySchool == 'ELS' ? termsFileCurrentVersion_ELS_US_val : '';

        policyVersion2 = selectedSecondarySchool ? selectedSecondarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentVersion_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentVersion_GC_AU_val : false : false : false; 

        policyFileUrl = selectedPrimarySchool == 'Language School' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_LS_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_LS_AU_val : selectedCountry == 'India' ? termsFileCurrentUrl_LS_IN_val : '' : selectedPrimarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_GC_AU_val : '' : selectedPrimarySchool == 'ELS' ? termsFileCurrentUrl_ELS_US_val : '';

        policyFileUrl2 = selectedSecondarySchool ? selectedSecondarySchool == 'Greystone College' ? selectedCountry == 'Canada' ? termsFileCurrentUrl_GC_CA_val : selectedCountry == 'Australia' ? termsFileCurrentUrl_GC_AU_val : false : false : false; 

        accommodationVersion = accommodationBool == 1 ? selectedCountry == 'Canada' ? accommodationCurrentVersion_CA_val : selectedCountry == 'Australia' ? accommodationCurrentVersion_AU_val : selectedCountry == 'India' ? accommodationCurrentVersion_IN_val : selectedCountry == 'USA' ? accommodationCurrentVersion_US_val : false : false;

        accommodationUrl = accommodationBool == 1 ? selectedCountry == 'Canada' ? accommodationCurrentUrl_CA_val : selectedCountry == 'Australia' ? accommodationCurrentUrl_AU_val : selectedCountry == 'India' ? accommodationCurrentUrl_IN_val : selectedCountry == 'USA' ? accommodationCurrentUrl_US_val : false : false;

        fileName = policyFileUrl ? policyFileUrl.split('/').pop().replace('.pdf','') : '';
        fileName2 = policyFileUrl2 ? policyFileUrl2.split('/').pop().replace('.pdf','') : '';
        accommodationFileName = accommodationUrl ? accommodationUrl.split('/').pop().replace('.pdf','') : '';

        policyStr = selectedPrimarySchool == 'Language School' && selectedSecondarySchool ? ' on policies ' + fileName+ ' and ' +fileName2 : ' on policies ' + fileName;

        policyStr = accommodationBool == 1 ? policyStr + ' and on accommodation policies ' +accommodationFileName : policyStr;

        signatureName = applicantStatus == 'Agent' ? agentName : studentName;

        digitalConfirmationTxt ='Electronic Signature Received: '+signatureName+' '+todayDateStr;

        $('input[name=e_signature_digital_confirmation]').val(digitalConfirmationTxt);

        if(policyFileUrl){
            $('input[name=primary_application_terms_and_condition_policy_url]').val(policyFileUrl);
        }
        if(policyFileUrl2){
            $('input[name=secondary_application_terms_and_condition_policy_url]').val(policyFileUrl2);
        }
        if(accommodationUrl){
            $('input[name=accommodation_policy_url]').val(accommodationUrl);
        }
}

const printApplicationSummary = function () {

    let schoolSelected = $('input[name=program_school]:checked').attr('data-school'),
        schoolValSelected = $('input[name=program_school]:checked').val(),
        parentSchool = schoolVal,
        applicantStatus = $('input[name=online_applicant_status]:checked').val(),
        countrySelected = $('input[name=program_country]').val(),
        studentFormArray = $('#form-student').serializeArray(),
        studyFormArray = $('#study-form').serializeArray(),
        accommodationFormArray = $('#accommodation-form').serializeArray(),
        additionalFormArray = $('#additional-form').serializeArray(),
        studentLabelArray = [],
        programPrimaryLabelArray = [],
        programAlternateLabelArray = [],
        programAdditionalArray = [], 
        accommodationLabelArray = [],
        homestayLabelArray = [],
        additionalLabelArray = [],
        fileUploadLabelArray = [],
        dependentArray = [],
        familyArray = [],
        stLabelHtml = '',
        pgPrimaryLabelHtml = '',
        pgAlternateLabelHtml = '',
        accLabelHtml = '',
        hsLabelHtml = '',
        addLabelHtml = '',
        fileLabelHtml = '';

    addDigitalConfirmation();

    for (let stf = 0; stf < studentFormArray.length; stf++) {
        for (let sti = 0; sti < studentInfoArray.length; sti++) {
            if(studentInfoArray[sti].schoolParentDependence.includes(parentSchool)){
                if(studentFormArray[stf].name == studentInfoArray[sti].inputName){
                
                    studentLabelArray.push({
                        'name': studentFormArray[stf].name,
                        'label': studentInfoArray[sti].inputLabel,
                        'value': studentFormArray[stf].value
                    });
                    
                }
            }
        }
    };
    for (let st = 0; st < studentLabelArray.length; st++) {
            stLabelHtml += '<tr><td><span class="bold">'+studentLabelArray[st].label+'</span></td><td><span class="value-input">'+studentLabelArray[st].value+'</span></td></tr>';
    };

        $('.peronal-info-summary-container').html('<table class="application-summary-tbl">'+stLabelHtml+'</table>');

    for (let stf = 0; stf < studyFormArray.length; stf++) {
            if(studyFormArray[stf].name.includes('dependent')){
                for (let di = 0; di < dependentInputArray.length; di++) {
                    splitName = studyFormArray[stf].name.split('_iterate_');
                    iterateVal = splitName[1];
                        if(splitName[0] == dependentInputArray[di].inputName){
                        dependentArray.push({
                                "iterate" : iterateVal,
                                "name" :  splitName[0],
                                "value" : studyFormArray[stf].value,
                                "label" : dependentInputArray[di].inputLabel
                        });
                    }
                }
            }else if(studyFormArray[stf].name.includes('combo')){
                for (let pa = 0; pa < programInfoArray.length; pa++) {
                    splitName = studyFormArray[stf].name.split('_combo-');
                    iterateVal = splitName[1];
                        if(splitName[0] == programInfoArray[pa].inputName){
                        
                        programValue = programInfoArray[pa].inputLabel.includes('Program Type') ?  studyFormArray[stf].value == 0 ? 'Academic' : 'Co-Op' : studyFormArray[stf].value;

                        programAdditionalArray.push({
                                "iterate" : iterateVal,
                                "name" :  splitName[0],
                                "value" : programValue,
                                "label" : programInfoArray[pa].inputLabel
                        });
                    }
                }
            }else{
                for (let pi = 0; pi < programInfoArray.length; pi++) {

                        if(studyFormArray[stf].name == programInfoArray[pi].inputName){

                        valueStr = studyFormArray[stf].name.includes('program_is_coop_') ? studyFormArray[stf].value == 1 ? 'Co-Op' : studyFormArray[stf].value == 0 ? 'Academic' : studyFormArray[stf].value : studyFormArray[stf].value == 1 ? 'Yes' : studyFormArray[stf].value == 0 ? 'No' : studyFormArray[stf].value;

                            if(programInfoArray[pi].inputAssign == 'primary'){
                            programPrimaryLabelArray.push({
                                'name': studyFormArray[stf].name,
                                'label': programInfoArray[pi].inputLabel,
                                    'value':  valueStr
                            });
                            }else{
                            programAlternateLabelArray.push({
                                'name': studyFormArray[stf].name,
                                'label': programInfoArray[pi].inputLabel,
                                    'value':  valueStr
                            });
                        }
                    }
                }
        }
    };
    for (let pr = 0; pr < programPrimaryLabelArray.length; pr++) {
            pgPrimaryLabelHtml += '<tr><td><span class="bold">'+programPrimaryLabelArray[pr].label+'</span></td><td><span class="value-input">'+programPrimaryLabelArray[pr].value+'</span></td></tr>';
    };

        $('.study-info-primary-summary-container').html('<table class="application-summary-tbl">'+pgPrimaryLabelHtml+'</table>');

        if(programAlternateLabelArray.length > 0){
        for (let pa = 0; pa < programAlternateLabelArray.length; pa++) {
                pgAlternateLabelHtml += '<tr><td><span class="bold">'+programAlternateLabelArray[pa].label+'</span></td><td><span class="value-input">'+programAlternateLabelArray[pa].value+'</span></td></tr>';
        };
            $('.study-info-alternate-summary-container').html('<div class="study-box-container"><h4>+Greystone College</h4><table class="application-summary-tbl">'+pgAlternateLabelHtml+'</table></div>');
    }

    for (let acc = 0; acc < accommodationFormArray.length; acc++) {

            if(accommodationFormArray[acc].name.includes('homestay') || accommodationFormArray[acc].name.includes('residence')){
            for (let o = 0; o < accommodationAdditionalArray.length; o++) {

                if (accommodationAdditionalArray[o].countryDependence.includes(countrySelected)) {
                    if (accommodationFormArray[acc].name == accommodationAdditionalArray[o].inputName) {
                        homestayLabelArray.push({
                            'name': accommodationFormArray[acc].name,
                            'label': accommodationAdditionalArray[o].inputLabel,
                            'value': accommodationFormArray[acc].value
                        });
                    }
                }
            }
        } else {
            for (let o = 0; o < accommodationInfoArray.length; o++) {

                if (accommodationInfoArray[o].countryDependence.includes(countrySelected)) {
                    if (accommodationFormArray[acc].name == accommodationInfoArray[o].inputName) {
                        accommodationLabelArray.push({
                            'name': accommodationFormArray[acc].name,
                            'label': accommodationInfoArray[o].inputLabel,
                            'value': accommodationFormArray[acc].value
                        });
                    }
                }
            }
        }
    };
    if (accommodationLabelArray.length > 0) {
        for (let acc = 0; acc < accommodationLabelArray.length; acc++) {
            valueStr = accommodationLabelArray[acc].value == 1 ? 'Yes' : accommodationLabelArray[acc].value == 0 ? 'No' : accommodationLabelArray[acc].value;
            accLabelHtml += '<tr><td><span class="bold">' + accommodationLabelArray[acc].label + '</span></td><td><span class="value-input">' + valueStr + '</span></td></tr>';
        };
        accLabelHtml = '<table class="application-summary-tbl">' + accLabelHtml + '</table>';

        if (homestayLabelArray.length > 0) {
            for (let hs = 0; hs < homestayLabelArray.length; hs++) {
                hsLabelHtml += '<tr><td><span class="bold">' + homestayLabelArray[hs].label + '</span></td><td><span class="value-input">' + homestayLabelArray[hs].value + '</span></td></tr>';
            };
            hsLabelHtml = '<h5>Additional Details</h5><table class="application-summary-tbl">' + hsLabelHtml + '</table>';
        }

        $('.accommodation-info-summary-container').html(accLabelHtml + hsLabelHtml);
        if(countrySelected == 'Online'){
            $('.accommodation-info-summary-container').addClass('study-hide').removeClass('study-show');
        }else{
            $('.accommodation-info-summary-container').addClass('study-show').removeClass('study-hide');
        }
        
    } else {
        $('.accommodation-info-summary-container').addClass('study-hide').removeClass('study-show');
    }
    for (let ad = 0; ad < additionalFormArray.length; ad++) {
        if (additionalFormArray[ad].name.includes('additional_family')) {
            for (let fm = 0; fm < familyMemberInfoArray.length; fm++) {
                splitName = additionalFormArray[ad].name.split('_iterate_');
                iterateVal = splitName[1];
                if (splitName[0] == familyMemberInfoArray[fm].inputName) {
                    familyArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": additionalFormArray[ad].value,
                        "label": familyMemberInfoArray[fm].inputLabel
                    });
                }
            }
        } else {

            if (additionalFormArray[ad].name.includes('file')) {

                objUnique = fileUploadArray.reduce((acc, z) => {
                    var exist = acc.find(({ inputName }) => z.inputName === inputName);
                    if (!exist) {
                        acc.push(z);
                    }
                    return acc;
                }, []);

            } else {
                objUnique = additionalInfoArray.reduce((acc, z) => {
                    var exist = acc.find(({ inputName }) => z.inputName === inputName);
                    if (!exist) {
                        acc.push(z);
                    }
                    return acc;
                }, []);
            }

            if (additionalFormArray[ad].name.includes('file')) {
                for (let ob = 0; ob < objUnique.length; ob++) {
                    if (additionalFormArray[ad].name == objUnique[ob].inputName) {
                        valueStr = additionalFormArray[ad].value == 1 ? 'Yes' : additionalFormArray[ad].value == 0 ? 'No' : additionalFormArray[ad].value;
                        fileUploadLabelArray.push({
                            'name': additionalFormArray[ad].name,
                            'label': objUnique[ob].inputLabel,
                            'value': valueStr
                        });
                    }
                }
            } else {
                for (let ob = 0; ob < objUnique.length; ob++) {
                    if (additionalFormArray[ad].name == objUnique[ob].inputName) {
                        valueStr = additionalFormArray[ad].value == 1 ? 'Yes' : additionalFormArray[ad].value == 0 ? 'No' : additionalFormArray[ad].value;
                        additionalLabelArray.push({
                            'name': additionalFormArray[ad].name,
                            'label': objUnique[ob].inputLabel,
                            'value': valueStr
                        });
                    }
                }
            }


        }
    };
    for (let add = 0; add < additionalLabelArray.length; add++) {
        valueStr = additionalLabelArray[add].value == 1 ? 'Yes' : additionalLabelArray[add].value == 0 ? 'No' : additionalLabelArray[add].value;
        addLabelHtml = addLabelHtml + '<tr><td><span class="bold">' + additionalLabelArray[add].label + '</span></td><td><span class="value-input">' + valueStr + '</span></td></tr>';
    };
    addLabelHtml = '<table class="application-summary-tbl">' + addLabelHtml + '</table>';

    if (fileUploadLabelArray.length > 0) {
        for (let f = 0; f < fileUploadLabelArray.length; f++) {
            fileLabelHtml += '<tr><td><span class="bold">' + fileUploadLabelArray[f].label + '</span></td><td><span class="value-input">' + fileUploadLabelArray[f].value + '</span></td></tr>';
        };
        fileLabelHtml = '<h5>File Uploads</h5><table class="application-summary-tbl">' + fileLabelHtml + '</table>';
    }

    $('.additional-info-summary-container').html(addLabelHtml + fileLabelHtml);

    if (programAdditionalArray.length > 0) {
        groupedDependent = groupBy(programAdditionalArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.study-info-program-additional-summary-container').empty();

        for (let ap = 0; ap < values.length; ap++) {
            pgAdditionalLabelHtml = '';
            for (let pga = 0; pga < values[ap].length; pga++) {
                pgAdditionalLabelHtml += '<tr><td><span class="bold">' + values[ap][pga].label + '</span></td><td><span class="value-input">' + values[ap][pga].value + '</span></td></tr>';
            }
            headerLabel = ap == 0 ? '<h5>Additional Programs</h5>' : '';
            programInt = ap + 2;
            $('.study-info-program-additional-summary-container').append(headerLabel + '<table style="width:100%;margin-bottom:30px;"><th>+Program #'+programInt+'</th>' + pgAdditionalLabelHtml + '</table>');
        }

    }

    if (dependentArray.length > 0) {
        groupedDependent = groupBy(dependentArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.study-info-dependent-summary-container').empty();

        for (let da = 0; da < values.length; da++) {
            pgDependentLabelHtml = '';
            for (let pgd = 0; pgd < values[da].length; pgd++) {
                pgDependentLabelHtml += '<tr><td><span class="bold">' + values[da][pgd].label + '</span></td><td><span class="value-input">' + values[da][pgd].value + '</span></td></tr>';
            }
            headerLabel = da == 0 ? '<h5>Dependent Family Members</h5>' : '';
            $('.study-info-dependent-summary-container').append(headerLabel + '<table>' + pgDependentLabelHtml + '</table>');
        }

    }

    if (familyArray.length > 0) {
        groupedDependent = groupBy(familyArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);
        $('.additional-info-family-summary-container').empty();

        for (let fm = 0; fm < values.length; fm++) {
            addFamilyLabelHtml = '';
            for (let afm = 0; afm < values[fm].length; afm++) {
                addFamilyLabelHtml += '<tr><td><span class="bold">' + values[fm][afm].label + '</span></td><td><span class="value-input">' + values[fm][afm].value + '</span></td></tr>';
            }
            headerLabel = fm == 0 ? '<h5>Family Members</h5>' : '';
            $('.additional-info-family-summary-container').append(headerLabel + '<table>' + addFamilyLabelHtml + '</table>');
        }

    }

    policyLink = schoolSelected == 'ELS' ? 'https://www.els.edu/terms-of-use' : schoolSelected == 'Greystone College' ? countrySelected == 'Canada' ? 'https://www.ilsc.com/greystone-college/canada/policies' : 'https://www.ilsc.com/greystone-college/australia/policies' : 'https://www.ilsc.com/language-schools/policies-procedures';
    accommLink = schoolSelected == 'ELS' ? 'https://www.els.edu/hubfs/ELS/pdf/documents/ELS_Cancellation_Policy.pdf' : 'https://www.accommodations.ilsc.com/accommodation-booking-policy';
    contractLink = countrySelected == 'Australia' ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-australia-terms-conditions.pdf' : countrySelected == 'Canada' ? schoolValSelected.includes('Juniors') ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/junior-student-contract-agreement.pdf' :'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf' : countrySelected == 'India' ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-india-terms-conditions.pdf' : 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf';
    termsLink = countrySelected == 'Canada' ? schoolValSelected.includes('Juniors') ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/junior-supplemental-forms.pdf' : '' : '';
    privacyLink = schoolSelected == 'ELS' ? 'https://www.els.edu/privacy-policy' : '';
    tuitionLink = schoolSelected == 'ELS' ? 'https://www.els.edu/admissions/tuition-fees' : '';
    cancelLink = schoolSelected == 'ELS' ? 'https://www.els.edu/hubfs/ELS/pdf/documents/ELS_Cancellation_Policy.pdf' : '';

    proofOfFundsHtml = schoolSelected == 'ELS' ? applicantStatus == 'Agent' ? proofOfFundsAgentFormStatementHtml : '' : '';

    languageSchoolContractTxt = schoolValSelected.includes('Juniors') ? 'To finalize your application, you must acknowledge that you have read and agree to the student contract and must fill out other supplemental forms to help us administer the program to you.  You can download the student contract and supplemental forms from the following links, sign them and attach your completed copies here using the file attachment link, or you may send them later by email:<div class="school-details"><ul class="arrows"><li>Junior Student Contract (PDF) <a href="' + contractLink + '" target="_blank" download>Download</a></li><li>Junior Supplemental Forms (PDF) <a href="' + termsLink + '" target="_blank" download>Download</a></li></ul></div>' : 'To finalize your application, you must acknowledge that you have read and agreed to the policies and procedures that apply to your chosen study country, and, if applicable, the Accommodation Policy. You can download the policies and procedures from the following link, sign it, and attach your signed copy here now using the file attachment link, or you may send it by email later. <a href="' + contractLink + '" target="_blank" download>Download</a>';

    elsPolicyTxt = releaseFormStatementHtml+'By submitting this form by clicking the confirmation button below, you acknowledge that you have read and agreed to the <a href="' + policyLink + '" target="_blank">Terms of Use</a>, <a href="' + privacyLink + '" target="_blank">Privacy Policy</a>, <a href="' + cancelLink + '" target="_blank">Cancellation & Refund Policy</a> and <a href="' + tuitionLink + '" target="_blank">Prices & Dates addendum</a>.'+proofOfFundsHtml;

    policyHtml = schoolSelected == 'ELS' ? elsPolicyTxt : languageSchoolContractTxt;

    $('.submit-policy-container').html(policyHtml);
    $('.step-breadcrumb-container').hide();

    if (schoolSelected != 'ELS') {
        printContractFileInput();
    }

};

const printContractFileInput = function () {
    let additionClassName = 'submit-policy-file-container';
    if ($('.' + additionClassName).is(':empty')) {
        printFilesForm(fileUploadArray, false, 'Summary', additionClassName);
    }
    printHubSpotContractFile();
};

const printHubSpotContractFile = function () {
    hbspt.forms.create({
        region: "na1",
        portalId: "5020112",
        formId: contractUploadFormId,
        target: '#contract-hs-file-form'
    });
}

const printPersonForm = function (formArray, enabled, categoryName, className, dVal) {

    let result = formArray.filter(formArray => formArray.category == categoryName),
        dateVar = $('.date-picker').length,
        dInt = dVal ? '_iterate_' + dVal : '',
        startDate = new Date($('select[name=program_startdate_primary-input] option:checked').val()),
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        age = calculate_age(dateBirthTime, startDate.getTime()),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        parentSchool = schoolVal,
        applicationName = $('input[name=online_applicant_status]:checked').val();

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
        requiredValue = result[stForm].requiredDependence ? result[stForm].requiredDependence.includes(schoolVal) ? "required" : "" : result[stForm].required == true ? "required" : "";
        inputLabel = requiredValue == 'required' ? result[stForm].inputLabel + "<sup>*</sup>" : result[stForm].inputLabel;
        disabledVal = '';


        if (result[stForm].countryDependence) {
            if (!result[stForm].countryDependence.includes(countrySelected)) {
                printInput = false;
            }
        }
        if (result[stForm].ageMax) {
            if (result[stForm].ageMax < age) {
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
                                inputForm = "<input type='email' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' value='" + value + "'  " + disabledVal + ">";
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
                                inputForm = "<input type='text' value='" + value + "' class='form-control date-picker' id='" + categoryName + "-datePicker-" + dateVar + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " placeholder='YYYY-MM-DD' data-category='" + categoryName + "'  " + disabledVal + " onkeydown='event.preventDefault()'>";
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
                                            inputName = result[stForm].obj[optionList].optionMultiObj[0].inputName;
                                            labelId = _.camelCase(inputName);
                                            requiredValue = result[stForm].obj[optionList].optionMultiObj[0].required == true ? "required" : "";
                                            dependentLabel = result[stForm].obj[optionList].optionMultiObj[0].inputLabel;
                                            optionHtml += '<legend class="dependent-target study-hide">' + dependentLabel + '</legend>';

                                            for (let i = 0; i < result[stForm].obj[optionList].optionMultiObj[0].obj.length; i++) {

                                                optionValue = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionValue;
                                                optionLabel = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionLabel;
                                                otherClass = result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionType == 'option-other' ? 'other-input' : 'indenpendent-input';

                                                optionHtml += '<div class="form-check multi-target dependent-target study-hide" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + i + dInt + '" value="' + optionValue + '" ' + requiredValue + ' ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + i + '">' + optionLabel + '</label></div>';

                                                if (result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionType == 'option-other') {
                                                    depClass = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? 'dependent-target study-hide' : '';
                                                    depTarget = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass : '';
                                                    optionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].placeholder + "' " + disabledVal + ">";
                                                }
                                            }

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
                            $('.' + className).append("<div class='form-group " + classWidth + " " + hideForm + "'>" + inputFormHtml + "</div>");

                        }
                    }
                }
            }
        }
    }
    $(function () {
        $('.date-picker').each(function () {
            $(this).datepicker(
                {
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-70:+00",
                    onSelect: function (dateText) {
                        dateObj = new Date(dateText);
                        $(this).attr('data-value', dateObj.getTime());
                    }

                }
            );
        });
    });
};
const printStudenForm = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        applicationStatus = formJson.application_status,
        studentFormEnabled = formJson.agency_form_array[0].student_info_form_enabled,
        agencyFormEnabled = formJson.agency_form_array[0].agency_form_enabled,
        advisorFormEnabled = formJson.advisor_form_array[0].advisor_form_enabled,
        categoryStudentName = 'Student',
        categoryAgentName = 'Agent',
        categoryAdvisorName = 'Advisor',
        classStudentName = 'student-information-form',
        classAgentName = 'agent-information-form',
        classAdvisorName = 'advisor-information-form';

    if (applicationStatus == 'Agent') {
        //printAgentForm();
        $('.' + classAdvisorName).empty();
        if ($('.' + classAgentName).is(':empty')) {
            printPersonForm(studentInfoArray, agencyFormEnabled, categoryAgentName, classAgentName);

        }
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-advisor').removeClass('form-show').addClass('form-hide');
        $('form#form-agent,form#form-student').removeClass('form-hide').addClass('form-show');
    } else if (applicationStatus == 'Walk-in Student Advisor') {
        //printAgentForm();
        $('.' + classAgentName).empty();
        if ($('.' + classAdvisorName).is(':empty')) {
            printPersonForm(studentInfoArray, advisorFormEnabled, categoryAdvisorName, classAdvisorName);
        }
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-agent').removeClass('form-show').addClass('form-hide');
        $('form#form-advisor,form#form-student').removeClass('form-hide').addClass('form-show');
    } else if (applicationStatus == 'Student') {
        $('.' + classAgentName).empty();
        $('.' + classAdvisorName).empty();
        if ($('.' + classStudentName).is(':empty')) {
            printPersonForm(studentInfoArray, studentFormEnabled, categoryStudentName, classStudentName);
        }
        $('form#form-student').removeClass('form-hide').addClass('form-show');
        $('form#form-agent').removeClass('form-show').addClass('form-hide');
        $('form#form-advisor').removeClass('form-show').addClass('form-hide');
    }


    //on change events
    $("#studentAddressCountry").change(function () {
        if (this.value == 'Australia') {
            $('#studentVisaTypeNumber').parent().removeClass('form-hide').addClass('form-show');
        } else {
            $('#studentVisaTypeNumber').parent().removeClass('form-show').addClass('form-hide');
        }
    });

};

const updateStudentInfoJson = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        agentInfoArray = [],
        studentInfoArray = [];

    let formAgent_obj = $('form#form-agent').serializeArray();
    formAgent_obj.forEach(function (inputAgentObj) {
        agentInfoArray.push({
            name: inputAgentObj.name,
            value: inputAgentObj.value
        });
    });
    if (agentInfoArray.length > 0) {
        formJson.agency_form_array[0].agency_form_enabled = true;
    }
    for (let i = 0; i < agentInfoArray.length; i++) {
        formJson.agency_form_array[0][agentInfoArray[i].name] = agentInfoArray[i].value;
    }

    let formStudent_obj = $('form#form-student').serializeArray();
    formStudent_obj.forEach(function (inputStdObj) {
        studentInfoArray.push({
            name: inputStdObj.name,
            value: inputStdObj.value
        });
    })
    if (studentInfoArray.length > 0) {
        formJson.student_info_form_array[0].student_form_enabled = true;
    }
    for (let i = 0; i < studentInfoArray.length; i++) {
        formJson.student_info_form_array[0][studentInfoArray[i].name] = studentInfoArray[i].value;
    }
    localStorage.setItem(formJsonName, JSON.stringify(formJson));

};

const updateProgramJson = function () {
    let formObjectReset = localStorage.getItem(formJsonName),
        formJsonReset = JSON.parse(formObjectReset),
        programArray = [];
    dependentArray = [];

    for (let i = 0; i < 6; i++) {
        formJsonReset.program_form_array[0].program_additional_info[0].visa_form_dependent[i] = {};
    }
    localStorage.setItem(formJsonName, JSON.stringify(formJsonReset));

    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject);

    let formProgram_obj = $('form#study-form').serializeArray();

    formProgram_obj.forEach(function (inputProgramObj) {
        programArray.push({
            name: inputProgramObj.name,
            value: inputProgramObj.value
        });
    })

    if (programArray.length > 0) {
        formJson.program_form_array[0].program_form_enabled = true;
    }

    for (let i = 0; i < programArray.length; i++) {

        keyValue = programArray[i].name;
        val = programArray[i].value;

        if (programArray[i].value == 1) {
            val = 'Yes';
        } else if (programArray[i].value == 0) {
            val = 'No';
        }

        if (keyValue.includes('dependent')) {
            splitName = programArray[i].name.split('_iterate_');
            iterateVal = splitName[1];
            dependentArray.push({
                "iterate": iterateVal,
                "name": splitName[0],
                "value": val
            });
        } else {
            if (keyValue.includes('alternate-input')) {
                if (keyValue.includes('additional')) {
                    formJson.program_form_array[0].program_alternate_array[0].program_additional_info[0][programArray[i].name.replace('_alternate-input', '')] = val;
                } else {
                    formJson.program_form_array[0].program_alternate_array[0][programArray[i].name.replace('_alternate-input', '')] = val;
                }

            } else {
                if (keyValue.includes('additional')) {
                    formJson.program_form_array[0].program_additional_info[0][programArray[i].name.replace('_primary-input', '')] = val;


                } else {
                    formJson.program_form_array[0][programArray[i].name.replace('_primary-input', '')] = val;
                }

            }
        }

    }
    if (dependentArray.length > 0) {
        groupedDependent = groupBy(dependentArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);

        for (let i = 0; i < values.length; i++) {
            for (let x = 0; x < values[i].length; x++) {
                formJson.program_form_array[0].program_additional_info[0].visa_form_dependent[i][values[i][x].name] = values[i][x].value;
            }
        }

    }


    localStorage.setItem(formJsonName, JSON.stringify(formJson));
    deleteCookie("program-obj");

};

const updateAccommodationJson = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        accommodationInfoArray = [];

    let formAccommodation_obj = $('form#accommodation-form').serializeArray();
    formAccommodation_obj.forEach(function (inputAgentObj) {
        accommodationInfoArray.push({
            name: inputAgentObj.name,
            value: inputAgentObj.value
        });
    });

    if (accommodationInfoArray.length > 0) {
        formJson.accommodation_form_array[0].accommodation_form_enabled = true;
    }

    for (let i = 0; i < accommodationInfoArray.length; i++) {
        formJson.accommodation_form_array[0][accommodationInfoArray[i].name] = accommodationInfoArray[i].value;
    }

    localStorage.setItem(formJsonName, JSON.stringify(formJson));
    deleteCookie("accom-type-obj");
};

//Step Study Form
const getSchoolCountryList = function () {
    let dropElement = '.study-information-form.dropdown-container ul.drop-country',
        tableId = schoolCountryListTable,
        schoolParentQuery = schoolVal == 'ELS' ? '&country__eq=USA' : '&country__neq=USA',
        queryParam = schoolParentQuery + '&location_type__in=Country,Online&enable__eq=1',
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);

    if ($(dropElement + ' li').length == 0) {
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;
            $(dropElement).append('<li class="disabled">Choose your Country</li>');
            if (dataObject.length > 0) {
                for (let i = 0; i < dataObject.length; i++) {
                    countryValue = dataObject[i].values[1];
                    listHtml = "<li class='dropdown-item' data-value='" + countryValue + "' tranlsate='no'>" + countryValue + "</li>";
                    $(dropElement).append(listHtml);
                }
                printDropSelect('.country-dropdown');
                $('.study-information-form.dropdown-container ul.drop-country li.dropdown-item').click(function () {
                    $('.study-information-form .study-box-container:not(.country-select-container)').addClass('disabled');
                    $('.study-information-form .input-container').removeClass('study-show').addClass('study-hide');
                    selectedValue = $(this).attr('data-value');
                    $('input[name=program_country]').val(selectedValue).trigger('change');
                    printSchoolSelection(selectedValue);
                })
                enableCountryBtn();
            } else {
                listHtml = "No Country Available at this time.";
                $("#.study-information-form.dropdown-container .btn.country-select span.selected-text").text(listHtml);
            }
        }).fail(function () {
            listHtml = "No Country Available at this time.";
            $("#.study-information-form.dropdown-container .btn.country-select span.selected-text").text(listHtml);
        });
    }

};

const resetInsuranceOption = function () {
    $('#insurance-option-container').empty();
};
const resetAdditionalInfo = function () {
    $('#additional-info-container').empty();
};
const resetProgramComboBox = function(){
    $('.program-multi-box').remove();
};
const resetSchoolProgram = function () {
    $('.study-program-selection.study-box-container').addClass('disabled');
    $('.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container,.accommodation-airport-transfer-details,.accommodation-details,.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
    $('.additional-program-form').empty();
    $('.additional-notes-container .additional-notes-input').empty();
    $('.week-input').empty();
    $('input[name*="program_weeks"]').attr('disabled', true).val('');
    $('.additional-files-container').empty();
    $('.airport-transfer-details').empty();
    $('#accommodation-type-option-container').empty();
    $('.homestay-details').empty();
    $('input[name=accommodation_option]').prop('checked', false);
    $('.submit-policy-file-container').empty();

    if (!$('.accommodation-details').is(':empty') && $('input[name=program_campus]').is(':checked')) {
        printAccomLocationOption();
    }
    resetProgramComboBox();
}
const resetCampusProgram = function () {
    $('.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container').removeClass('study-show').addClass('study-hide');
    $('input[name=program_is_coop_primary-input]').prop('checked', false);
    $('.additional-notes-container .additional-notes-input').empty();
    resetProgramComboBox();
}
const resetProgramFormField = function (elementStatus, formElement, emptyElement,inputName) {
    let comboVal = returnComboVal(inputName);

    if (elementStatus == 'primary-input') {
        $('#study-program-'+comboVal+' .study-program-alternate').removeClass('study-show').addClass('study-hide');
    }
    if (formElement) {
        
        $(formElement,'#study-program-'+comboVal).removeClass('study-show').addClass('study-hide');
        //$(formElement+' input,select','#study-program-'+comboVal).attr('disabled', true);

    }
    if (emptyElement) {
        $(emptyElement).empty();
    }
    if(comboVal == 1){
        $('.additional-notes-container').removeClass('study-show').addClass('study-hide');
        $('.additional-notes-container .additional-notes-input').empty();
        $('.additional-files-container').empty();
    }
    $('#study-program-'+comboVal+ 'a.add-program-link').remove();
    resetLaSalleOption(elementStatus,inputName);
}

const resetAccommodationDetails = function () {
    $('input[name=accommodation_type]').prop('checked', false);
    $('.form-group.accommodation-details').removeClass('study-show').addClass('study-hide');
    $('.form-group.accommodation-details input').attr('disabled', true);
    $('.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
    $('.accommodation-homestay-details input').attr('disabled', true);
}
const resetAdditionalFiles = function () {
    $('.additional-files-container').empty();
}
const printWeeksOption = function (selectedProgramArray, element, inputName) {
    let comboVal = returnComboVal(inputName),
        dataObject = selectedProgramArray,
        labelHtml = '<label>Number of Weeks</label>',
        optionHtml = "";
    if (dataObject.length > 0) {
        for (let i = 0; i < dataObject.length; i++) {
            optionHtml += '<div class="form-check"><label class="form-check-label" for="program-weeks-' + dataObject[i].program_id + '">' + dataObject[i].program_length + ' weeks</label></div>';
        }
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input.' + element + ' .week-input').html(labelHtml + optionHtml);
    }
};

const printAlternateOption = function () {
    optionHtml = '<label>Are you also applying for Greystone College programs?</label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="is_alternate_apply" id="no-alternate" required checked><label class="form-check-label" for="no-alternate">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="is_alternate_apply" id="yes-alternate"><label class="form-check-label" for="yes-alternate">Yes</label></div>';
    className = '.study-program-selection .input-container.alternate-initial .study-program-alternate-option';
    if ($(className).is(':empty')) {
        $(className).html(optionHtml);
    }
    $('.study-program-selection .input-container.alternate-initial').removeClass('study-hide').addClass('study-show');
};
const printScheduleOption = function (selectedProgramArray, element, inputName) {

    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        dataObject = selectedProgramArray,
        labelHtml = '<label>Choose Schedule</label>',
        selected = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-id'),
        selectedMinAge = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-min-age'),
        selectedMaxAge = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-max-age'),
        optionHtml = "";
    singleOptionChek = dataObject.length == 1 ? 'checked' : '';

    selectedMinAge = selectedMinAge ? selectedMinAge : 0;
    selectedMaxAge = selectedMaxAge ? selectedMaxAge : 99;

    if (dataObject.length > 0) {


        for (let i = 0; i < dataObject.length; i++) {

            lasalleVar = dataObject[i].laSalleEligible ? dataObject[i].laSalleEligible : '';

            optionHtml += '<div class="form-check"><input class="form-check-input ' + element + '" value="' + dataObject[i].program_schedule + '" type="radio" name="program_schedule_' + element + comboName +'" data-weeks="' + dataObject[i].program_length + '" data-parent-id="' + dataObject[i].parent_program_id + '" id="' + dataObject[i].program_id + '" data-lasalle-eligible="' + lasalleVar + '" ' + singleOptionChek + ' required><label class="form-check-label" for="' + dataObject[i].program_id + '">' + dataObject[i].program_schedule + '</label></div>';
        }
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input.' + element + ' .time-input').html(labelHtml + optionHtml);
        $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.schedule-input.' + element).removeClass('study-hide').addClass('study-show');
        printWeeksOption(dataObject, element, inputName);
        if (dataObject.length == 1) {
            $('input[name=program_weeks_' + element+comboName).val(dataObject[0].program_length).attr('disabled', false);
            inputName = $('input[name*=program_schedule_'+element+comboName+']:checked').attr('name');
           
            printStartDates(dataObject[0].program_id, element, selectedMinAge, selectedMaxAge,inputName);

        }
    } else {
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input .time-input,.study-program-selection .input-container.schedule-input.' + element + ' .week-input').empty();
        printStartDates(selected, element, selectedMinAge, selectedMaxAge, inputName);
    }
};
const printProgramOption = function (selectedProgram, element, minAge, maxAge,inputName) {
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedSchool = $('input[name=program_school]:checked').val(),
        labelHtml = '<label>Choose Program Option</label>',
        tableId = programLSListTable,
        queryParam = '&campus_location__in=' + selectedCampus + '&programs_available__in=' + selectedProgram + '&is_program_price__eq=1&enable__eq=1&orderBy=category',
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam,
        programOptionArray = [],
        optionProgramHtml = '';
    api_url = encodeURI(api_url);

    $.ajax({
        url: api_url,
        type: "get",
        async: false,
        success: function (data) {
            let dataObject = data.objects;

            for (let i = 0; i < dataObject.length; i++) {

                scheduleName = dataObject[i].values[3].name;
                programOptionArray.push({
                    program_id: dataObject[i].id,
                    schedule_name: dataObject[i].values[3].name,
                    item_name: dataObject[i].values[4],
                    schedule_id: scheduleName.replace(/\s/g, ''),
                    group_id: dataObject[i].values[13][0].id,
                    campus_country: dataObject[i].values[26].name
                });
            };

            let programPriceGroupedByGroupId = groupBy(programOptionArray, 'group_id'),
                groupArray = new Object();
            groupArray = programPriceGroupedByGroupId;

            const keys = Object.keys(groupArray);

            let programGroupedArray = [],
                values = Object.values(groupArray);

            for (let i = 0; i < values.length; i++) {

                for (let x = 0; x < values[i].length; x++) {
                    if (x == 0) {
                        programGroupedArray.push({
                            'program_id': values[i][x].program_id,
                            'campus_country': values[i][x].campus_country,
                            'group_id': values[i][x].group_id,
                            'item_name': values[i][x].item_name,
                            'schedule_id': values[i][x].schedule_id,
                            'schedule_name': values[i][x].schedule_name
                        });
                    }
                }
            }
            singleOptionChek = programGroupedArray.length == 1 ? 'checked' : '';

            if (programGroupedArray.length > 0) {
                for (let i = 0; i < programGroupedArray.length; i++) {
                    optionProgramHtml += '<div class="form-check"><input class="form-check-input ' + element + '" value="' + programGroupedArray[i].schedule_name + '-' + programGroupedArray[i].item_name + '" type="radio" name="program_option_' + element + comboName + '"  data-parent-id="' + programGroupedArray[i].group_id + '" id="' + programGroupedArray[i].program_id + '" ' + singleOptionChek + ' required><label class="form-check-label" for="' + programGroupedArray[i].program_id + '">' + programGroupedArray[i].schedule_name + '-' + programGroupedArray[i].item_name + '</label></div>';
                }
                optionLink = selectedSchool == 'ILSC HELLO Online' || selectedSchool == 'ILSC ALLO Online' ? '<div class="disclaimer"><a href="'+returnDocumentLang()+'online-timezone-schedule" target="_blank">See online schedules in your timezone.</a></div>' : '';
                $('#study-program-'+comboVal+'.study-program-selection .input-container.program-option-input.' + element + ' .program-schedule-input').html(labelHtml + optionProgramHtml + optionLink);
                $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-option-input.' + element).removeClass('study-hide').addClass('study-show');

            }
            if (programGroupedArray.length == 1) {
                printStartDates(selectedProgram, element, minAge, maxAge,inputName);
            }

        }
    });

};

const printLaSalleOption = function (element,inputName) {

    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName);

    isLasalleOptionHtml = "<label>Are you also applying for LaSalle partnership program?</label><div class='form-check'><input class='form-check-input " + element + "' value='No' type='radio' name='option_lasalle_parthership_" + element + comboName + "' id='no-'" + element + "'><label class='form-check-label' for='no-" + element + "'>No</label></div><div class='form-check'><input class='form-check-input " + element + "' value='Yes' type='radio' name='option_lasalle_parthership_" + element + comboName + "' id='yes-'" + element + "'><label class='form-check-label' for='yes-" + element + "'>Yes</label></div>";

    birthOptionHtml = "<div class='partner-info study-hide'><div class='form-group'><label for='partner-birth-city-" + element + "'>Enter City of Birth<sup>*</sup></label><input class='form-control' id='partner-birth-city-" + element + "' type='text' name='student_city_birth_" + element + comboName + "' disabled required></div><div class='form-group'><label for='partner-birth-state-" + element + "'>Enter Province/State of Birth<sup>*</sup></label><input class='form-control' type='text' id='partner-birth-state-" + element + "' name='student_prov_state_birth_" + element + comboName +"' disabled required></div></div>";

    $('#study-program-'+comboVal+'.study-program-selection .partner-input.' + element + ' .partner-option-input').html(isLasalleOptionHtml + birthOptionHtml);
    $('#study-program-'+comboVal+'.study-program-selection .partner-input.' + element).removeClass('study-hide').addClass('study-show');
};

const printStartDates = function (selectedProgram, element, minAge, maxAge, inputName) {
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val(),
        selectedSchedule = $('input[name=program_option_primary-input]:checked').val(),
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        minorAge = 18,
        epochPrimaryStartDate = '',
        campusName = schoolVal == 'ELS' ? $('input[name=program_campus]:checked').val() : '';
        campusMinAge = $('input[name="campus-min-age"]').val(),
        minAgeVal = schoolVal == 'ELS' ? campusMinAge : minAge
        availableStartDateMessage = schoolVal == 'ELS' ? ' Available start dates depend on age of student upon the start of program. Minimum age for '+campusName+' campus is '+campusMinAge : null;

    if (selectedParentSchool == 'Language School') {
        tableId = startDateTableLS;
    } else if (selectedParentSchool == 'Greystone College') {
        tableId = startDateTableGC;
    } else if (selectedParentSchool == 'ELS') {
        tableId = startDateTableELS;
    }

    if (element == 'alternate-input') {
        tableId = startDateTableGC;   
    }
    selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;

    if(comboVal > 1){    
        previousDateSelected = $('input[name='+inputName+']:checked').parents().eq(5).prev().find('select[name*="program_startdate_"] option:selected').attr('data-value');
        previousDurationSelected = selectedCurrentSchool == 'Greystone College' ? parseInt($('input[name='+inputName+']:checked').parents().eq(5).prev().find('input[name*="program_weeks_'+element+'"]').val()) : parseInt($('input[name='+inputName+']:checked').parents().eq(5).prev().find('select[name*="program_option_duration_'+element+'"] option:selected').val().slice(0, 2));
        
    }else{
        
        previousDateSelected = element == 'alternate-input'? $('select[name=program_startdate_primary-input'+comboName+'] option:selected').attr('data-value') : $('select[name=program_startdate_'+element+comboName+'] option:selected').attr('data-value');    
        previousDurationSelected = element == 'alternate-input'? parseInt($('select[name=program_option_duration_primary-input'+comboName+'] option:selected').val().slice(0, 2)) : selectedCurrentSchool == 'Greystone College' ? $('input[name=program_weeks_'+element+comboName+']').val() : parseInt($('select[name=program_option_duration_'+element+comboName+'] option:selected').val().slice(0, 2));
    }

    console.log(previousDurationSelected);

    primaryStartDate = previousDateSelected;
    primaryDurationInt =  previousDurationSelected;
    primaryDuration = primaryDurationInt * 7;
    epochPrimaryStartDate = comboVal > 1  || element == 'alternate-input' ? parseInt(primaryStartDate) + (1000 * 60 * 60 * 24 * primaryDuration) : '';
 
    console.log('startDate: ' +epochPrimaryStartDate);

    if (typeof tableId !== 'undefined') {

        dateQuery = epochPrimaryStartDate != '' ? '&start_dates__gte=' + epochPrimaryStartDate : '';

        let queryParam = '&program__in=' + selectedProgram + '&campus__in=' + selectedCampus + dateQuery,
            api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
        api_url = encodeURI(api_url),
            foundNoneHtml = "<option disabled selected value=''>No Start Dates Available</option>";

        $('#study-program-'+comboVal+' .study-program-start-date-dropdown .' + element + ' select.form-control').html("<option disabled selected value=''>No Start Dates Available</option>");
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;

            currentDate = new Date();
            dataObject.sort((a, b) => a.values[3] - b.values[3]);


            if (dataObject.length > 0) {
                optionHtml = "<option disabled selected value=''>Choose Start Date</option>";
                enableOption = false;
                for (let i = 0; i < dataObject.length; i++) {
                    dateObj = new Date(dataObject[i].values[3]);
                    dateObjCalc = new Date(dataObject[i].values[3]);
                    dateObjCalcMinor = new Date(dataObject[i].values[3]);
                    epochVal = dataObject[i].values[3];


                    if (currentDate.getTime() <= epochVal) {

                        minDob = subtractYears(minAgeVal, dateObjCalc);
                        minorDob = subtractYears(minorAge, dateObjCalcMinor);

                        if (dateBirthTime <= minDob) {
                            yearVal = dateObj.getUTCFullYear();
                            monthVal = months[dateObj.getUTCMonth()];
                            monthInt = monthsInt[dateObj.getUTCMonth()];
                            dayVal = dateObj.getUTCDate();
                            dateTxt = monthVal + " " + dayVal + ", " + yearVal;
                            monthInt = monthInt.length < 2 ? "0" + monthInt : monthInt;
                            dayVal = dayVal.toString().length < 2 ? "0" + dayVal.toString() : dayVal;
                            dateInt = yearVal + "-" + monthInt + "-" + dayVal,
                                weekAvailableArray = [];

                            if (dataObject[i].values[5]) {
                                for (let x = 0; x < dataObject[i].values[5].length; x++) {
                                    weekAvailableArray.push(
                                        dataObject[i].values[5][x].name
                                    )
                                }
                            }

                            selectedOption =  comboVal > 1 && i == 0 ? 'selected' : '';

                            optionHide = selectedCountry == 'Australia' && selectedParentSchool == 'Language School' ? selectedSchedule.includes('Evening') || selectedSchedule.includes('Part Time') ? dateBirthTime > minorDob ? 'hidden disabled' : '' : '' : '';

                            optionHtml = optionHtml + "<option " + optionHide + " value='" + dateInt + "' data-value='" + dataObject[i].values[3] + "' data-week-available='" + weekAvailableArray.toString() + "' "+selectedOption+">" + dateTxt + "</option>";

                            enableOption = true;

                        }
                    }
                }
                ageQualifyMessage = "<option disabled selected value=''>No Start Dates Available. Possible reason - There is an age requirement for this selected program or campus upon the start date of the program. Minimum age:" + minAgeVal + "</option>";

                if (enableOption) {

                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown').html(optionHtml);
                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown').prop("disabled", false);
                    if ($('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown option:not(:disabled)').length == 0) {
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(ageQualifyMessage);
                    }
                    
                    if(availableStartDateMessage){
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown label .age-message').remove();
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown label').append('<p class="age-message">'+availableStartDateMessage+'</p>');
                    }

                } else {

                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(ageQualifyMessage);
                }
            } else {
                $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(foundNoneHtml);
            }
            $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.date-input.' + element).removeClass('study-hide').addClass('study-show');
        }).fail(function (jqXHR, textStatus, error) {
            console.log('Something went wrong: ' + error);
            $('#study-program-'+comboVal+' .study-program-start-date-dropdown .' + element + ' select.form-control').html("<option disabled selected value=''>Cannot find Start Dates. Try another Program.</option>");
        });
    }

    selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;

    if(selectedCurrentSchool == 'Greystone College'){
        printAddProgramLink($('select[name=program_startdate_'+element+comboName+']').parent());
    }else{
        removeProgramLink();
    }
}

const printProgramDuration = function (element,inputName) {
    let comboVal = returnComboVal(inputName),
        selectedDuration = $('select[name=program_startdate_primary-input] option:selected').attr('data-week-available'),
        durationArray = selectedDuration ? selectedDuration.split(',') : [],
        minChar = '>',
        maxChar = '<',
        minVal = durationArray.find(mn => mn.includes(minChar)),
        maxVal = durationArray.find(mx => mx.includes(maxChar)),
        maxLimit = 52,
        className = $('#study-program-'+comboVal+'.study-program-selection .program-option-duration-input.' + element + ' .duration-dropdown select'),
        optionHtml = '<option disabled selected value="">Choose Duration</option>';


    if (element == 'primary-input') {

        className.empty();

        if(minVal == undefined && maxVal == undefined){
            lengthVal = durationArray.length > 0 ? durationArray.length : maxLimit+1;
            indexNum = durationArray.length > 0 ? 0 : 1;

            for(let i = indexNum; i < lengthVal; i++){

                numVal = durationArray.length > 0 ? durationArray[i] : i;

                weekText = numVal == '1' ? 'week' : 'weeks';
                optionHtml += '<option class="dropdown-item" data-item="' + numVal + ' ' + weekText + '" value="' + numVal + ' ' + weekText + '">' + numVal + ' ' + weekText + '</option>';
            }
        }else{
            minVal = minVal ? parseInt(minVal.slice(1,99)) : 1;
            maxVal = maxVal ? parseInt(maxVal.slice(1,99)) : maxLimit;
            for(let z = minVal; z <= maxVal; z++){
                weekText = z == '1' ? 'week' : 'weeks';
                optionHtml += '<option class="dropdown-item" data-item="' + z + ' ' + weekText + '" value="' + z + ' ' + weekText + '">' + z + ' ' + weekText + '</option>';    
            }
        }

        $('#study-program-'+comboVal+' .program-option-duration-input.primary-input').removeClass('study-hide').addClass('study-show');
        className.html(optionHtml).attr('disabled', false);
    }
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

const printProgram = function (selectedCampus, element, pairable) {
    let selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val();

    if (selectedParentSchool == 'Greystone College' || pairable) {


        initElement = '.study-program-selection .additional-input-container.' + element + ' .additional-program-form';
        $(initElement).empty();

        if ($(initElement).is(':empty')) {
            coopText = selectedCampus == '52464878081' ? 'Practicum' : 'Co-Op';
            academicHtml = selectedCampus != '52464878081' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="0" type="radio" name="program_is_coop_' + element + '" id="no-coop" required><label class="form-check-label" for="no-coop">Academic</label></div>' : '';
            coopHtml = selectedCountry != 'Australia' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="1" type="radio" name="program_is_coop_' + element + '" id="yes-coop"><label class="form-check-label" for="yes-coop">' + coopText + '</label></div>' : '';

            optionHtml = '<label>Choose Program Type</label>' + academicHtml + coopHtml;
            $(initElement).html(optionHtml);
        }

        $('.study-program-selection.study-box-container').removeClass('disabled');
        $('.study-program-selection .additional-input-container.' + element).removeClass('study-hide').addClass('study-show');
        if (pairable) {
            $('.study-program-alternate').removeClass('study-hide').addClass('study-show');
            $('.alternate-initial').append('<input name="program_school_alternate-input" value="Greystone College" type="hidden">');
        }


    } else {
        printProgramDrop(selectedCampus, 0, element,"program_is_coop_"+element);

    }

}
const printProgramDrop = function (selectedCampus, isCoop, element, inputName) {

    let selectedSchool = $('input[name=program_school]:checked').attr('id'),
        comboVal = returnComboVal(inputName);
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        dropContainerEl = '#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-input.' + element,
        printDropDownArray = [],
        programArray = [],
        isProla = false,
        comboName = returnComboName(inputName);

    if (selectedParentSchool == 'Language School') {
        tableId = programTableLS;
        campusProp = 'campus';
        objNum = 2;
        coopBool = '',
        accommObjNum = 25,
        minAgeObjNum = 16,
        maxAgeObjNum = 17;
    } else if (selectedParentSchool == 'Greystone College') {
        tableId = programTableGC;
        campusProp = 'new_campus';
        accommObjNum = 40,
        objNum = 3,
        coopBool = isCoop == 1 ? '&is_co_op__eq=1' : '&is_co_op__eq=0';
    } else if (selectedParentSchool == 'ELS') {
        tableId = programTableELS;
        campusProp = 'campus';
        objNum = 2,
        accommObjNum = 20,
        minAgeObjNum = 0,
        maxAgeObjNum = 99,
        coopBool = '';
    }

    if (element == 'alternate-input') {
        selectedParentSchool = 'Greystone College';
        selectedSchool = '81771084433';
        tableId = programTableGC;
        campusProp = 'new_campus';
        objNum = 3;
    }

    if (typeof campusProp !== 'undefined') {
        let queryParam = '&' + campusProp + '__in=' + selectedCampus + '&schools__in=' + selectedSchool + '&enable=1' + coopBool + '&show_quote_tool=1&add_on_program=0',
            api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
        api_url = encodeURI(api_url);
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;
            dataObject.sort((a, b) => a.values[objNum] > b.values[objNum] ? 1 : -1);

            if (dataObject.length > 0) {
                if (selectedParentSchool == 'Greystone College') {

                    laSalleEligibleArr = [];


                    for (let i = 0; i < dataObject.length; i++) {

                        minAge = dataObject[i].values[37] ? dataObject[i].values[37][0].name : '';

                        if (dataObject[i].values[39]) {
                            if (dataObject[i].values[39].length > 0) {
                                for (let x = 0; x < dataObject[i].values[39].length; x++) {
                                    laSalleEligibleArr.push(
                                        dataObject[i].values[39][x].id
                                    );
                                }
                            }
                        }

                        programArray.push({
                            parent_program_id: dataObject[i].values[29][0].id,
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[3],
                            program_schedule: dataObject[i].values[10],
                            program_length: dataObject[i].values[8],
                            is_coop: dataObject[i].values[9],
                            min_age: minAge,
                            max_age: '',
                            is_accommodation_enable: dataObject[i].values[accommObjNum],
                            laSalleEligible: laSalleEligibleArr.toString()
                        });
                    }
                    let groupProgram = groupBy(programArray, 'program_name'),
                        groupArray = new Object();
                    groupArray = groupProgram;
                    values = Object.values(groupArray);
                    uniqueProgramArray = [];

                    for (let i = 0; i < values.length; i++) {
                        for (let x = 0; x < values[i].length; x++) {
                            if (x == 0) {
                                uniqueProgramArray.push({
                                    program_id: values[i][x].parent_program_id,
                                    program_name: values[i][x].program_name,
                                    is_prola: 0,
                                    min_age: values[i][x].min_age,
                                    max_age: values[i][x].max_age,
                                    is_accommodation_enable: values[i][x].is_accommodation_enable
                                })
                            }
                        }
                    }

                    printDropDownArray = uniqueProgramArray;
                    localStorage.setItem(programObjGC, JSON.stringify(programArray));

                } else if (selectedParentSchool == 'Language School' || selectedParentSchool == 'ELS') {

                    for (let i = 0; i < dataObject.length; i++) {
                        minAge = dataObject[i].values[minAgeObjNum] !== undefined ? dataObject[i].values[minAgeObjNum][0].name : '';
                        maxAge = dataObject[i].values[maxAgeObjNum] !== undefined ? dataObject[i].values[maxAgeObjNum][0].name : '';

                        programArray.push({
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[2],
                            is_prola: dataObject[i].values[10],
                            min_age: minAge,
                            max_age: maxAge,
                            is_accommodation_enable: dataObject[i].values[accommObjNum],
                        });
                    }

                    printDropDownArray = programArray;
                } else {
                    for (let i = 0; i < dataObject.length; i++) {

                        programArray.push({
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[2],
                            is_prola: false,
                            min_age: '',
                            max_age: '',
                            is_accommodation_enable: 1,
                        });
                    }

                    printDropDownArray = programArray;
                }

            }

            $('.study-program-selection.study-box-container').removeClass('disabled');
            if (printDropDownArray.length > 0) {
                optionHtml = "<option disabled selected value=''>Choose Program</option>";

                for (let i = 0; i < printDropDownArray.length; i++) {

                    optionValue = printDropDownArray[i].program_name;
                    isProla = printDropDownArray[i].is_prola == 0 ? false : true;
                    optionHtml = optionHtml + "<option data-id='" + printDropDownArray[i].program_id + "' value='" + optionValue + "' data-min-age='" + printDropDownArray[i].min_age + "' data-max-age='" + printDropDownArray[i].max_age + "'  data-prola='" + isProla + "' data-value='" + optionValue + "' data-accommodation-enable='" + printDropDownArray[i].is_accommodation_enable + "'>" + optionValue + "</option>";

                }
                //$('.' + element + ' .study-program-dropdown').remove();
                $('#study-program-'+comboVal+' .' + element + ' .study-program-dropdown select').html(optionHtml).attr('name', 'program_name_' + element+comboName).attr('id', 'program-name-' + element+comboName).addClass(element);
                $(dropContainerEl).removeClass('study-hide').addClass('study-show');
                $(dropContainerEl + ' select').attr('disabled', false);
            } else {
                $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-input.' + element).removeClass('study-hide').addClass('study-show');
                $('.study-program-dropdown select.' + element + '[name=name=program_name'+comboName+']').html('<option value="" selected disabled>No Programs available</option>');
            }
        });
    }


}
const printCampus = function (selected) {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        tableId = campusTable,
        queryParam = '&enable__eq=1&country__in=' + countrySelected + '&schools__in=' + selected,
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);

    $.get(api_url).done(function (data) {
        let dataObject = data.objects;
        dataObject.sort((a, b) => a.values[4] > b.values[4] ? 1 : -1);
        campusArray = [];

        if (dataObject.length > 0) {
            for (let i = 0; i < dataObject.length; i++) {
                initials = dataObject[i].values[1].match(/\b(\w)/g);
                boxName = dataObject[i].values[6] ? '' : initials.join('').toUpperCase();
                thumbNail = dataObject[i].values[6] ? "style=background:url('" + dataObject[i].values[6].url + "') no-repeat;" : '';
                minAge = schoolVal == 'ELS' ? dataObject[i].values[8] ?  dataObject[i].values[8] : '' : '' ;
                campusArray.push({
                    'id': dataObject[i].id,
                    'initials': boxName,
                    'school': selected,
                    'value': dataObject[i].values[1],
                    'stateProv': dataObject[i].values[4],
                    'thumbnail': thumbNail,
                    'minAge': minAge
                })

            }

            let groupCampus = groupBy(campusArray, 'stateProv'),
                groupArray = new Object();
            groupArray = groupCampus;
            groupHtml = '';
            arr = Object.values(groupArray);
            childArrayLength = arr.reduce((a, b) => a + b.length, 0);
            groupAction = arr.length < childArrayLength ? true : false;
            for (let x in groupArray) {
                title = x,
                    listHtml = "";
                for (let i = 0; i < groupArray[x].length; i++) {
                    if (groupArray[x][i].length > 1) {
                        multiList = true;
                    }

                    listHtml += '<li class="hs-form-radio campus-select-radio form-check"><label id="campus-select" for="' + groupArray[x][i].id + '" class="box-selection"><div class="box-color" data-min-age="'+groupArray[x][i].minAge+'" data-value="' + groupArray[x][i].id + '" ' + groupArray[x][i].thumbnail + '>' + groupArray[x][i].initials + '</div><input type="radio" name="program_campus" data-state-prov="' + groupArray[x][i].stateProv + '" data-school="' + groupArray[x][i].school + '" value="' + groupArray[x][i].value + '" id="' + groupArray[x][i].id + '" required><span>' + groupArray[x][i].value + '</span></label></li>';
                }

                if (groupAction) {
                    groupHtml += '<div>' + listHtml + '<h5>' + title + '</h5></div>';
                } else {
                    groupHtml += listHtml;
                }
            }

            $('.study-campus-selection.study-box-container').removeClass('disabled');
            $('.study-campus-selection ul.inputs-list').html(groupHtml);
            $('.study-campus-selection.study-box-container .input-container').removeClass('study-hide').addClass('study-show');

        }


    });
};
const printSchoolSelection = function () {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        tableId = schoolTypeListTable,
        countryQuery = schoolVal == 'ELS' ? '&parent_school__in=ELS' : '&parent_school__ne=ELS',
        queryParam = countryQuery + '&location_country__in=' + countrySelected,
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam,
        listHtml = '';
    api_url = encodeURI(api_url);

    $.get(api_url).done(function (data) {
        let dataObject = data.objects;
        dataObject.sort((a, b) => a.values[1] > b.values[1] ? 1 : -1);

        if (dataObject.length > 0) {
            for (let i = 0; i < dataObject.length; i++) {

                initials = dataObject[i].values[3][0].name.match(/\b(\w)/g);
                boxName = dataObject[i].values[6] ? '' : initials.join('').toUpperCase();
                thumbNail = dataObject[i].values[6] ? "style=background:url('" + dataObject[i].values[6].url + "') no-repeat;" : '';

                listHtml += '<li class="hs-form-radio school-select-radio form-check"><label id="school-select" for="' + dataObject[i].id + '" class="box-selection"><div class="box-color center" data-value="' + dataObject[i].id + '" ' + thumbNail + '>' + boxName + '</div><input type="radio" class="form-check-input" name="program_school" data-pairable="' + dataObject[i].values[5] + '" value="' + dataObject[i].values[1] + '" data-school="' + dataObject[i].values[3][0].name + '" id="' + dataObject[i].id + '" required><span>' + dataObject[i].values[1] + '</span></label></li>';

            }
            $('.study-school-selection.study-box-container').removeClass('disabled');
            $('.study-school-selection ul.inputs-list').html(listHtml);
            $('.study-school-selection.study-box-container .input-container').removeClass('study-hide').addClass('study-show');

        }

    });

};

const printProgramHubspotFileForm = function () {
    hbspt.forms.create({
        region: "na1",
        portalId: "5020112",
        formId: programUploadFormId,
        target: "#program-hs-file-form"
    });
}
const printAdditionalInfo = function () {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedSchoolName = $('input[name=program_school]:checked').val(),
        selectedAlternate = $('input[name=is_alternate_apply]:checked').val(),
        programSelected = $('select[name*=program_name_] option:selected').val(),
        durationSelected = $('select[name*=program_option_duration_] option:selected').val(),
        durationSelectedVal = parseInt(durationSelected.replace('week','').replace('s','')),
        inputHtml = '',
        additionalHtml = '',
        isProla = $('select[name=program_name_primary-input] option:selected').attr('data-prola') == 'true' || $('select[name=program_name_alternate-input] option:selected').attr('data-prola') == 'true' ? true : false;

    prolaHtml = '<div class="form-group"><label for="inputProlaNumber">ILSC Academic Placement Test Number (if applicable)</label><input type="text" name="additional_prola_number" id="inputProlaNumber"><div class="valid-feedback"></div></div>';
    usiHtml = '<div class="form-group"><label for="inputUsiNumber">USI Number<sup>*</sup></label><input type="text" name="additional_usi_number" id="inputUsiNumber"><div class="valid-feedback"></div></div>';
    visaRadioHtml = '<label>Have you ever been refused a visa for any country including Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_refusal" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_refusal" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaFileHtml = '<div class="form-group gte-file-input study-hide"><label for="gte-file">Upload Genuine Temporary Entrant - Statement of Purpose Copy (jpeg,png,pdf) (<a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant#:~:text=%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8BAll,to%20apply%20for%20permanent%20residence" target="_blank">more info</a>)<br><span class="footnote">*Further documents might be required throughout the application process.</span></label><input type="file" name="program_gte_file_upload" id="gte-file" accept="jpeg,jpg,pdf,png" data-bind="gte_copy"><input type="hidden" name="program_gte_file_upload" value="" readonly><div class="valid-feedback"></div></div>';
    applyVisaHtml = '<label>Applying student visa outside of Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_apply" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_apply" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaOptionUsHtml = '<label>What Visa will you apply for?<sup>*</sup></label><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio0" value="F-1" required><label class="form-check-label" for="studentVisaOptionRadio0">F-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio1" value="F-2" required=""><label class="form-check-label" for="studentVisaOptionRadio1">F-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio2" value="B-1" required=""><label class="form-check-label" for="studentVisaOptionRadio2">B-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio3" value="B-2" required=""><label class="form-check-label" for="studentVisaOptionRadio3">B-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio4" value="J-1" required=""><label class="form-check-label" for="studentVisaOptionRadio4">J-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio5" value="J-2" required=""><label class="form-check-label" for="studentVisaOptionRadio5">J-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio6" value="ESTA" required=""><label class="form-check-label" for="studentVisaOptionRadio6">ESTA</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio7" value="Resident/Green Card" required=""><label class="form-check-label" for="studentVisaOptionRadio7">Resident/Green Card</label></div><div class="form-check" data-category="Student"><input class="form-check-input other-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio8" value="Other" required=""><label class="form-check-label" for="studentVisaOptionRadio8">Other</label></div><input type="text" class="dependent-target study-hide" data-target="student_visa_option" name="student_visa_option_other_specified" placeholder="Specify Other"><div class="valid-feedback"></div>';
    visaRadioUsHtml = '<label>Are you in possession of a valid US student visa and would like to transfer from another institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-no" required><label class="form-check-label" for="visa-transfer-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaTransferInputUsHtml = '<div class="form-group visa-transfer-input study-hide"><label for="visa-transfer">Name of the institution you are attending?</label><input type="text" name="additional_visa_transfer_name" id="visa-transfer" disabled><div class="valid-feedback"></div></div>';
    visaTransferAttendanceInputUsHtml = '<div class="form-group visa-transfer-attendance-input study-hide"><label for="visa-transfer-attendance">What was your last date of attendance?</label><input type="date" name="another_institution_last_date_of_attendance" id="visa-transfer-attendance" disabled><div class="valid-feedback"></div></div>';
    visaFormRadioUsHtml = '<div class="i-form"><label>Do you need a Form I-20 to apply for a student visa?<sup>*</sup><sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-trigger="hover" data-content="ELS Language Centers is authorized to provide you with a Certificate of Eligibility (Form I-20), which must be presented when applying for a student (F-1). Intensive and Semi-Intensive with a minumum of 4 weeks program are eligible for this visa type."></i></sup><div class="footnote">ELS Intensive and Semi-Intensive study programs are considered full-time study programs and are eligible for an I-20. The I-20 is required to apply for your F-1 student visa. Please note that the American Explorer program is not eligible for an I-20.</div></label><div class="form-check"><input type="hidden" value="No" name="additional_visa_form_us" disabled><input class="form-check-input" value="No" type="radio" name="additional_visa_form_us" id="visa-form-question-no" required><label class="form-check-label" for="visa-form-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_form_us" id="visa-form-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div></div>';
    visaFormAddDependentButtonHtml = '<div class="form-group visa-form-input study-hide"><label for="add-visa-dependent">Please list and dependents who will travel with you to the US and require an F-2 visa. You must enter dependent\'s name the same way it appears on the passport, and use a space for any special characters.</label><div class="btn-container"><div id="add-visa-dependent" class="btn btn-orange-outline">Add Dependent</div></div><div class="dependents-container"></div></div>';
    collegeRadioUsHtml = '<label>Do you plan on attending college or university?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_question_us" id="college-question-no" required><label class="form-check-label" for="college-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_question_us" id="college-question-yes" required><label class="form-check-label" for="college-question-yes">Yes</label></div>';
    collegeAcceptRadioUsHtml = '<div class="form-group college-acceptance study-hide"><label>Have you already been accepted to a US institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_accept_question_us" id="college-accept-question-no" required disabled><label class="form-check-label" for="college-accept-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_accept_question_us" id="college-accept-question-yes" required disabled><label class="form-check-label" for="college-accept-question-yes">Yes</label></div></div>';
    collegeInputUsHtml = '<div class="form-group college-input study-hide"><label for="college-input">Please write the name of the US institution below</label><input type="text" name="additional_college_name" id="additional_college_name" disabled><div class="valid-feedback"></div></div>';
    additionalNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program of study</label><textarea name="study_additional_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>';
    additionalOnlineNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program study</label><textarea name="study_additional_online_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>';


    if (countrySelected == 'Australia') {

        inputHtml = selectedParentSchool == 'Greystone College' ? prolaHtml + usiHtml : prolaHtml;
        additionalHtml = inputHtml + visaRadioHtml + visaFileHtml + applyVisaHtml + additionalNotesHtml;
        printProgramHubspotFileForm();

    } else if (countrySelected == 'Canada') {

        inputHtml = selectedParentSchool == 'Greystone College' || isProla || $('input[name=is_alternate_apply][value=1]').is(':checked') ? prolaHtml : '';
        additionalHtml = inputHtml + additionalNotesHtml;

    } else if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            additionalHtml = visaFormRadioUsHtml + visaFormAddDependentButtonHtml + visaRadioUsHtml + visaTransferInputUsHtml + visaTransferAttendanceInputUsHtml + collegeRadioUsHtml + collegeAcceptRadioUsHtml + collegeInputUsHtml + additionalNotesHtml;
        }
    }else if(countrySelected == 'Online'){
        additionalHtml = inputHtml + additionalOnlineNotesHtml;
    }

    if($('.additional-notes-container .additional-notes-input').is(':empty')){
        if (additionalHtml != '') {
            $('.additional-notes-container .additional-notes-input').html(additionalHtml);
            $('.additional-notes-container').removeClass('study-hide').removeClass('disabled').addClass('study-show');
        }
    }

    if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            hideShowIForm(programSelected,durationSelectedVal);
        }
    }

}
const hideShowIForm = function(programName,duration){
    if(programName == 'American Explorer'){
        $('input[type=radio][name=additional_visa_form_us]').attr('disabled',true).prop('checked',false);
        $('input[type=radio][name=additional_visa_form_us][value=No]').prop('checked',true);
        $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',false);
        $('.additional-notes-input .visa-form-input').addClass('study-hide').removeClass('study-show');
        $('.additional-notes-input .visa-form-input .dependents-container').empty();
    }else{
        if(duration < 4){
            $('input[type=radio][name=additional_visa_form_us]').attr('disabled',true).prop('checked',false);
            $('input[type=radio][name=additional_visa_form_us][value=No]').prop('checked',true);
            $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',false);
            $('.additional-notes-input .visa-form-input').addClass('study-hide').removeClass('study-show');
            $('.additional-notes-input .visa-form-input .dependents-container').empty();
            
        }else{
            $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',true);
            $('input[type=radio][name=additional_visa_form_us]').attr('disabled',false);
            
        }
    }
}

const uploadFile = function (dataStep) {
    emailVar = $('input[name=student_email]').val();

    if (dataStep == 'additional-select') {
        formName = 'additional-form';
        hsFormId = additionalUploadFormId;
        targetId = 'additional-hs-file-form';
        submitVar = true;
    } else if (dataStep == 'study-program-select') {
        formName = 'study-form';
        hsFormId = programUploadFormId;
        targetId = 'program-hs-file-form';
        submitVar = true;
    } else if (dataStep == 'submit-select') {
        formName = 'submit-complete';
        hsFormId = contractUploadFormId;
        targetId = 'contract-hs-file-form ';
        submitVar = true;
    }

    submitVar = $('#' + formName).attr('data-submit') == 'false' ? false : true;

    if (!submitVar) {
        if ($('#' + formName + ' input[type=file]').length > 0) {
            $('#' + formName + ' input[type=file]').each(function () {
                fileName = $(this).attr('name');
                dataBind = $(this).attr('data-bind');
                fileVar = $('input[name=' + fileName + ']')[0].files;
                $('#' + targetId + ' input[name=' + dataBind + ']')[0].files = fileVar;
            });
            $('#' + targetId + ' input[name=email]').val(emailVar);
            //$('form#hsForm_'+hsFormId).submit();
        }
    }

};
const updateStatusJson = function () {
    let statusValue = $("input[name=online_applicant_status]:checked").val(),
        formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject);
    formJson.application_status = statusValue;
    formJson.application_enabled = true;

    localStorage.setItem(formJsonName, JSON.stringify(formJson));
};

const submitForm = function (dataStep) {
    let emailVar = $('input[name=student_email]').val();

    switch (dataStep) {
        case 'student-info-select':
            guid = studentGuid;
            formName = 'form-student';
            formNameAgent = 'form-agent';
            formNameAdvisor = 'form-advisor';
            formStatus = 'form-status';
            arr = studentInfoArray;
            break;

        case 'study-program-select':
            guid = studyGuid;
            formName = 'study-form';
            arr = programInfoArray;
            arrDependent = dependentInputArray;
            uploadFile('study-program-select');
            break;

        case 'accommodation-select':
            guid = accommodationGuid;
            formName = 'accommodation-form';
            arr = accommodationInfoArray;
            arrAdditional = accommodationAdditionalArray;

            break;

        case 'additional-select':
            guid = additionalGuid;
            arr = additionalInfoArray;
            arrFamily = familyMemberInfoArray;
            formName = 'additional-form';
            uploadFile('additional-select');
            break;
        case 'submit-select':
            guid = completeGuid;
            formName = 'submit-complete';
            arr = completeInfoArray;
            uploadFile('submit-select');

            break;
    };

    if (typeof formName !== 'undefined') {

        formTempArray = $('form#' + formName).serializeArray();
        forSubmitStr = $('form#' + formName).attr('data-submit');
        formSubmit = forSubmitStr == 'false' ? false : true;

        let url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + guid,
            tempArray = [];
        formFieldsArray = [];
        url = encodeURI(url);

        if (typeof formNameAgent !== 'undefined') {
            formAgentTempArray = $('form#' + formNameAgent).serializeArray();

            for (let i = 0; i < formAgentTempArray.length; i++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formAgentTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formAgentTempArray[i].value
                            });
                        }
                    }
                }
            }
        }
        if (typeof formNameAdvisor !== 'undefined') {
            formAdvisorTempArray = $('form#' + formNameAdvisor).serializeArray();

            for (let y = 0; y < formAdvisorTempArray.length; y++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formAdvisorTempArray[y].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formAdvisorTempArray[y].value
                            });
                        }
                    }
                }
            }
        }
        if (typeof formStatus !== 'undefined') {
            formStatusTempArray = $('form#' + formStatus).serializeArray();

            for (let i = 0; i < formStatusTempArray.length; i++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formStatusTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formStatusTempArray[i].value
                            });
                        }
                    }
                }
            }
        }

        let dependentArray = [],
            familyArray = [],
            additionalProgramTempArray = [];

        for (let i = 0; i < formTempArray.length; i++) {
            if (!formTempArray[i].name.includes('combo')) {
                for (let x = 0; x < arr.length; x++) {
                    if (formTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName && arr[x].objInputName != 'email') {
                            if (formTempArray[i].name.includes('program_is_coop_')) {
                                booleanVar = formTempArray[i].name.includes('program_is_coop_') ? formTempArray[i].value == 1 ? 'Co-Op' : formTempArray[i].value == 0 ? 'Academic' : formTempArray[i].value : formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                            } else {
                                booleanVar = formTempArray[i].name.includes('duration') ? parseInt(formTempArray[i].value.slice(0, 2)) : formTempArray[i].name.includes('insurance') ? formTempArray[i].value == 1 ? 'Yes' : 'No' : formTempArray[i].value;
                            }
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': booleanVar
                            });
                        }
                    }
                }
            }else{

                for (let x = 0; x < programAdditionalComboArray.length; x++) {
                    splitName = formTempArray[i].name.split('_combo-');
                    if (splitName[0] == programAdditionalComboArray[x].inputName) {
                        if (programAdditionalComboArray[x].objInputName) {
                            additionalProgramTempArray.push({
                                'name': programAdditionalComboArray[x].objInputName,
                                'value': formTempArray[i].value,
                                'iterate':splitName[1]
                            });
                        }
                    }
                }

            }
        };

        let programAdditionalArray = [];

        if(additionalProgramTempArray.length > 0){
            
            for (let i = 0; i < additionalProgramTempArray.length; i++) {

                booleanVar = additionalProgramTempArray[i].name.includes('program_type') ? additionalProgramTempArray[i].value == 1 ? 'Co-Op' : additionalProgramTempArray[i].value == 0 ? 'Academic' : additionalProgramTempArray[i].value : additionalProgramTempArray[i].value == 1 ? 'Yes' : additionalProgramTempArray[i].value == 0 ? 'No' : additionalProgramTempArray[i].value; 

                programAdditionalArray.push({
                    "iterate": additionalProgramTempArray[i].iterate,
                    "name": additionalProgramTempArray[i].name,
                    "value": booleanVar
                });

            }
           
        }

        if(programAdditionalArray.length > 0){
            groupedProgram = groupBy(programAdditionalArray, "iterate");
            groupProgramArray = new Object();
            groupProgramArray = groupedProgram;
            values = Object.values(groupProgramArray),
            prgmGroup = '';

            for (let i = 0; i < values.length; i++) {
                addPrgmStr = '';
    
                for (let x = 0; x < values[i].length; x++) {
                    programNameStr =  values[i][x].name;
                    addPrgmStr = addPrgmStr + '\r\n' + '"' + programNameStr + '": "' + values[i][x].value+'"';
                    addPrgmStr = values[i].length - 1 == x ? addPrgmStr : addPrgmStr+',';
                }
                prgmGroup = values.length - 1 == i ? prgmGroup + '{' + addPrgmStr + '\r\n}\r\n' :  prgmGroup + '{' + addPrgmStr + '\r\n},\r\n';

            }
            
            formFieldsArray.push({
                "objectTypeId": "0-1",
                "name": 'additional_programs',
                "value": '[\r\n'+prgmGroup+'\r\n]'
            })
        }else{
            if(dataStep == 'study-program-select'){
                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'additional_programs',
                    "value": 'n/a'
                })
            }
        }
       
        if (typeof arrFamily !== 'undefined') {
            for (let i = 0; i < formTempArray.length; i++) {
                if (formTempArray[i].name.includes('additional_family')) {
                    booleanVar = formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                    splitName = formTempArray[i].name.split('_iterate_');
                    iterateVal = splitName[1];
                    familyArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": booleanVar
                    });

                }
            };
            if (familyArray.length > 0) {
                groupedDependent = groupBy(familyArray, "iterate");
                groupArray = new Object();
                groupArray = groupedDependent;
                values = Object.values(groupArray);

                famGroup = '';

                for (let i = 0; i < values.length; i++) {
                    famStr = '';

                    for (let x = 0; x < values[i].length; x++) {
                        famStr = famStr + '\r\n' +'"'+values[i][x].name.replace('additional_family_', '').replace('_', ' ') + '": "' + values[i][x].value+'"';
                        famStr = values[i].length -1 == x ? famStr : famStr+',';
                    }
                    famGroup = values.length - 1 == i ? famGroup + '{' + famStr + '\r\n}\r\n' : famGroup + '{' + famStr + '\r\n},\r\n';

                }

                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'family_members_traveling_with',
                    "value": '[\r\n'+famGroup+'\r\n]'
                })

            }else{
                if(dataStep == 'additional-select'){
                    formFieldsArray.push({
                        "objectTypeId": "0-1",
                        "name": 'family_members_traveling_with',
                        "value": 'n/a'
                    })
                }
            }
        }

        if (typeof arrDependent !== 'undefined') {
            for (let i = 0; i < formTempArray.length; i++) {
                if (formTempArray[i].name.includes('additional_dependent')) {
                    booleanVar = formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                    splitName = formTempArray[i].name.split('_iterate_');
                    iterateVal = splitName[1];
                    dependentArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": booleanVar
                    });

                }
            };
            if (dependentArray.length > 0) {
                groupedDependent = groupBy(dependentArray, "iterate");
                groupArray = new Object();
                groupArray = groupedDependent;
                values = Object.values(groupArray);

                depGroup = '';

                for (let i = 0; i < values.length; i++) {
                    depStr = '';

                    for (let x = 0; x < values[i].length; x++) {
                        depStr = depStr + '\r\n' +'"'+values[i][x].name.replace('additional_dependent_', '').replace('_', ' ') + '": "' + values[i][x].value+'"';
                        depStr = values[i].length - 1 == x ? depStr : depStr+',';
                    }
                    depGroup = values.length - 1 == i ? depGroup + '{' + depStr + '\r\n}\r\n' : depGroup + '{' + depStr + '\r\n},\r\n';

                }

                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'form_i_20_dependents',
                    "value": '[\r\n'+depGroup+'\r\n]'
                })

            }else{
                if(dataStep == 'study-program-select'){
                    formFieldsArray.push({
                        "objectTypeId": "0-1",
                        "name": 'form_i_20_dependents',
                        "value": 'n/a'
                    })
                }
            }
        }

        if (typeof arrAdditional !== 'undefined') {
            formAddArray = $('form#' + formName).serializeArray();

            for (let i = 0; i < formAddArray.length; i++) {
                for (let x = 0; x < arrAdditional.length; x++) {
                    if (formAddArray[i].name == arrAdditional[x].inputName) {
                        if (arrAdditional[x].objInputName) {
                            tempArray.push({
                                'objName': arrAdditional[x].objInputName,
                                'value': formAddArray[i].value
                            });
                        }
                    }
                }
            }
        }

        formFieldsArray.push({
            "objectTypeId": "0-1",
            "name": 'email',
            "value": emailVar
        })
        for (let i = 0; i < tempArray.length; i++) {
            valueTemp = tempArray[i].value == '' ? 'n/a' : tempArray[i].value;
            formFieldsArray.push({
                "objectTypeId": "0-1",
                "name": tempArray[i].objName,
                "value": valueTemp
            })
        }
        

        let formArray = {
            "fields": formFieldsArray,
            "context": {
                "pageUri": "www.ilsc.com/online-application",
                "pageName": "Online Application - Student Info"
            },
            "legalConsentOptions": {
                "consent": { // Include this object when GDPR options are enabled
                    "consentToProcess": true,
                    "text": "I agree to allow ILSC to store and process my personal data.",
                }
            }
        };

        if (!formSubmit) {
          /* $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(formArray),
                contentType: "application/json",
                dataType: 'json',
                success: function() {
                    $('form#'+formName).attr('data-submit',true);
                }
            });*/
            $('form#' + formName).attr('data-submit', true);
        }

    }

};

//Button Click behavior
//Status Step

$('.applicant-status-boxes .box-color').click(function () {
    $('.applicant-status-boxes .box-color').removeClass('selected');
    $(this).addClass('selected');
    enableNextButton('form#form-status');
});

const enableCountryBtn = function () {
    $('.country-dropdown ul.drop-country li.dropdown-item').click(function () {
        $('.country-dropdown ul.drop-country li.dropdown-item').removeClass('selected');
        $(this).addClass('selected');
        enableNextButton('.study-information-form');
    });
}

const skipAccommodations = function(currentSlide){
    $('form#accommodation-form').attr('data-submit',false);
    $("#no-accomm-option").prop('checked', true);
    $(".fixed-side-menu-list .menu-accommodation.step-4 ").hide();
    $(".accommodation-info-box-container").hide();
    updateAccommodationJson();
    printAdditionalForm();
    submitForm('accommodation-select');
    $('.application-step-form-slide').slick('slickGoTo', currentSlide + 2);

}

const hideInsurance = function(){
    $('.insurance-container').addClass('study-hide').removeClass('study-show');
    $(".fixed-side-menu-list .menu-additional.step-5 #step-insurance").hide();
    $('.insurance-container #insurance-option-container .input-container input[name=insurance_option]').prop('disabled',true).prop('required',false);
    $('.insurance-container #insurance-option-container .input-container input.medical-date-picker').prop('disabled',true);

}
const showInsurance = function(){
    $('.insurance-container').addClass('study-show').removeClass('study-hide');
    $(".fixed-side-menu-list .menu-additional.step-5 #step-insurance").show();
    $('.insurance-container #insurance-option-container .input-container input[name=insurance_option]').prop('disabled',false).prop('required',true);
}

$(".section-application-form .step-container .btn.next").on("click", function () {
    let dataStepVar = $(this).attr('data-step'),
        dataForm = $(this).attr('data-form'),
        validCheck = $(this).attr('data-check');

    validVar = validateForm(dataStepVar, dataForm, validCheck) == true ? true : false;

    if (validVar) {
        if (dataStepVar == 'study-program-select') {
            let schoolNameSelected = $('input[name=program_school]:checked').val(),
                countrySelected = $('input[name=program_country]').val(),
                accommodationEnable =  parseInt($('select[name=program_name_primary-input] option:selected').attr('data-accommodation-enable')),
                currentSlide = $('.application-step-form-slide').slick('slickCurrentSlide');
                

            //qualify Accommodation eligibility
            if (accommodationEnable == 0) {
                skipAccommodations(currentSlide);
                if (schoolNameSelected == 'ELS Youth'){
                    printAirportTransfer('additional-form', 'Additional', true);
                    $('.additional-airport-transfer-details').removeClass('study-hide').addClass('study-show');
                }
            } else {
                if(countrySelected == 'Online'){                
                    hideInsurance();
                }else{
                    showInsurance();
                    $('.additional-airport-transfer-details').removeClass('study-show').addClass('study-hide');
                    $(".fixed-side-menu-list .menu-accommodation.step-4 ").show();
                    $(".accommodation-info-box-container").show();
                    $('.application-step-form-slide').slick('slickNext');
                }
            }

        } else {
            $('.application-step-form-slide').slick('slickNext');
        }
        window.scrollTo(0, 0);
        $(this).closest('.step-container').attr('data-complete', true).attr('data-init', true);
    }

});

$(document).on('click', 'ul.drop-country li', function () {
    resetSchoolProgram();
});
$(document).on('click', '.school-select-radio .box-color', function () {
    let selected = $(this).attr('data-value');
    $('.school-select-radio .box-color').removeClass('selected');
    $(this).addClass('selected');
    resetSchoolProgram();
    printCampus(selected);
});
$(document).on('click', 'input[name=student_dob], .campus-select-radio .box-color', function () {

    if ($(this).is(':input')) {
        selected = $('.campus-select-radio .box-color.selected').attr('data-value');
    } else {
        selected = $(this).attr('data-value');
        minAge = $(this).attr('data-min-age');
        $('input[name=campus-min-age]').val(minAge);
        $('.campus-select-radio .box-color').removeClass('selected');
        $(this).addClass('selected');
    }

    resetCampusProgram();
    resetAccommodationDetails();
    printProgram(selected, 'primary-input');
});
$(document).on('change', 'select[name=student_nationality]', function () {

    resetAdditionalFiles();

});
const coopAction = function (tEl, element) {
    let campusSelected = $('input[name=program_campus]:checked').val(),
        selected = $(tEl).val(),
        inputName = $(tEl).attr('name');
    resetProgramFormField(element, '.' + element + '.schedule-input,.' + element + '.date-input',false, inputName);
    printProgramDrop(campusSelected, selected, element,inputName);
};
const updatePrgStartDate = function () {
    let selected = $('option:selected', tEl).attr('data-id'),
        selectedMinAge = $('option:selected', tEl).attr('data-min-age'),
        selectedMaxAge = $('option:selected', tEl).attr('data-max-age'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        coopValue = $('.' + element + ' input[name=program_is_coop_' + element + ']:checked').val();
};
const programAction = function (tEl, element, pair) {
    let inputName = $(tEl).attr('name'),
        comboName = returnComboName(inputName),
        selected = $('option:selected', tEl).attr('data-id'),
        selectedMinAge = $('option:selected', tEl).attr('data-min-age'),
        selectedMaxAge = $('option:selected', tEl).attr('data-max-age'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        coopValue = $('.' + element + ' input[name=program_is_coop_' + element + comboName + ']:checked').val(),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedSchoolName = $('input[name=program_school]:checked').val(),
        programSelectedVal = $('select[name*=program_name_] option:selected').val(),
        durationSelected = $('select[name*=program_option_duration_] option:selected').val(),
        durationSelectedVal = parseInt(durationSelected.replace('week','').replace('s',''));

    //resetProgramFormField(element, '.' + element + '.program-option-input,.' + element + '.schedule-input,.' + element + '.date-input,.' + element + '.program-option-duration-input', '.' + element + '.week-input',inputName);

    if (selectedParentSchool == 'Greystone College' || pair) {

        let programObject = localStorage.getItem(programObjGC),
            programArray = JSON.parse(programObject),
            programSelected = programArray.filter((v) => v.parent_program_id == selected && v.is_coop == coopValue);

        printScheduleOption(programSelected, element, inputName);

    } else {

        if (selectedParentSchool == 'Language School') {
            printProgramOption(selected, element, selectedMinAge, selectedMaxAge,inputName);
        } else {
            printStartDates(selected, element, selectedMinAge, selectedMaxAge, inputName);
        }

    }
    if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            hideShowIForm(programSelectedVal,durationSelectedVal);
        }
    }

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const programOptionAction = function (tEl, element) {
    let selected = $('select.study-program-select option:selected').attr('data-id'),
        selectedMinAge = $('select.study-program-select  option:selected').attr('data-min-age'),
        selectedMaxAge = $('select.study-program-select  option:selected').attr('data-max-age'),
        inputName = $(tEl).attr('name');

    printStartDates(selected, element, selectedMinAge, selectedMaxAge,inputName);

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const resetLaSalleOption = function (element,inputName) {
    let comboVal = returnComboVal(inputName);

    $('#study-program-'+comboVal+' .partner-input.' + element).removeClass('study-show').addClass('study-hide');
    $('#study-program-'+comboVal+' .partner-input.' + element + ' input').attr('disabled', true);
};
const scheduleAction = function (tEl, element) {
    
    let selectedId = $(tEl).attr('id'),
        selectedWeeks = $(tEl).attr('data-weeks'),
        selectedLasalle = $(tEl).attr('data-lasalle-eligible'),
        inputName = $(tEl).attr('name'),
        comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        comboReturnName = comboName != '' ? '[name*="'+comboName+'"]' : '',
        campusSelected = $('input[name=program_campus]:checked').attr('id'),
        selected = $(tEl).val(),
        coopValue = $('#study-program-'+comboVal+' .' + element + ' input[name=program_is_coop_' + element + ']:checked').val(),
        programObject = localStorage.getItem(programObjGC),
        programArray = JSON.parse(programObject);
    programSelected = programArray.filter((v) => v.parent_program_id == selectedId && v.is_coop == coopValue && v.program_schedule == selected),
        selectedMinAge = $('.study-program-dropdown select.'+element+comboReturnName+' option:selected').attr('data-min-age'),
        selectedMaxAge = $('.study-program-dropdown select.'+element+comboReturnName+' option:selected').attr('data-max-age');

    resetProgramFormField(element,false,false,inputName);
    $('input[name=program_weeks_' + element+comboName).val(selectedWeeks).attr('disabled', false);
    printStartDates(selectedId, element, selectedMinAge, selectedMaxAge,inputName);

    if (selectedLasalle) {
        if (selectedLasalle.includes(campusSelected)) {

            printLaSalleOption(element,inputName);

        } else {
            resetLaSalleOption(element,inputName)
        }
    } else {
        resetLaSalleOption(element,inputName)
    }

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const partnerOptionAction = function (tEl, element) {
    let checkOption = $(tEl).val();

    if (checkOption == 'Yes') {
        $('.' + element + ' .partner-info').removeClass('study-hide').addClass('study-show');
        $('.' + element + ' .partner-info input').attr('disabled', false);
    } else {
        $('.' + element + ' .partner-info').removeClass('study-show').addClass('study-hide');
        $('.' + element + ' .partner-info input').attr('disabled', true);
    }
};
const printProgramBox = function(iterateNum,element){
    let selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedParentSchool = $('input[name=program_school]').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val(),
        optionHtml = '',
        showOption = 'study-hide';

    if(selectedParentSchool == 'Greystone College'){
        coopText = selectedCampus == '52464878081' ? 'Practicum' : 'Co-Op';
        academicHtml = selectedCampus != '52464878081' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="0" type="radio" name="program_is_coop_' + element + '_combo-'+iterateNum+'" id="no-coop" required><label class="form-check-label" for="no-coop">Academic</label></div>' : '';
        coopHtml = selectedCountry != 'Australia' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="1" type="radio" name="program_is_coop_' + element + '_combo-'+iterateNum+'" id="yes-coop"><label class="form-check-label" for="yes-coop">' + coopText + '</label></div>' : '';

        optionHtml = '<label>Choose Program Type</label>' + academicHtml + coopHtml;
        showOption = 'study-show';
    }    

    let programBoxHtml = `<div class="study-program-selection study-box-container program-multi-box col-md-6" id="study-program-${iterateNum}" data-program-iterate="${iterateNum}"><h3>+Choose Program #<span class="iterate-number-text">${iterateNum}<span><sup>*</sup></h3><i class="far fa-minus-square ${element}"></i><div class="additional-input-container ${element} ${showOption}"><div class="row"><div class="col-md-12"><div class="additional-program-form">${optionHtml}</div></div></div></div><div class="input-container study-hide program-input ${element}"><div class="row"><div class="col-md-12"><div class="study-program-dropdown"><select class="form-control study-program-select ${element}" id="program-name" name="program_name_combo-${iterateNum}" data-program-iterate="${iterateNum}" required><option disabled="disabled" selected="selected" value="">Choose Program</option></select></div></div></div></div><div class="input-container study-hide program-option-input ${element}"><div class="row"><div class="col-md-12"><div class="program-schedule-input"></div></div></div></div><div class="input-container study-hide schedule-input ${element}"><div class="row"><div class="col-md-6"><div class="time-input"></div></div><div class="col-md-6"><div class="week-input"></div><input type="hidden" name="program_weeks_${element}_combo-${iterateNum}" value="" data-program-iterate="${iterateNum}" disabled="disabled"></div></div></div><div class="input-container study-hide partner-input ${element}"><div class="row"><div class="col-md-12"><div class="partner-option-input"></div></div></div></div><div class="input-container study-hide date-input ${element}"><div class="row"><div class="col-md-12"><div class="study-program-start-date-dropdown"><label>Choose Start Date<sup>*</sup></label><select class="form-control startdate-dropdown ${element}" id="program-startdate-${element}" name="program_startdate_${element}_combo-${iterateNum}" data-program-iterate="${iterateNum}" disabled="disabled" required><option disabled="disabled" selected="selected" value="">Choose Start Date</option></select><div style="padding:20px;"><sup>*</sup><span class="footnote">Available Start Dates will be dates after the previous selected program end date.</div></div></div></div></div><div class="input-container study-hide program-option-duration-input ${element}"><div class="row"><div class="col-md-12"><div class="duration-dropdown"><label>Choose Duration<sup>*</sup></label><select class="form-control week-duration-dropdown ${element}" id="program-option-duration-${element}" name="program_option_duration_${element}_combo-${iterateNum}" data-program-iterate="${iterateNum}" disabled="disabled" required><option disabled="disabled" selected="selected" value="">Choose Duration</option></select></div></div></div></div></div>`;

    
    $("#study-program-container").append(programBoxHtml);
    
   resizeProgramMultiBox();
};

const resizeProgramMultiBox = function(){
    $('.program-multi-box').each(function(index) {
        let isLastElement = index == $('.program-multi-box').length -1,
            initVal = index + 1;
        
        if (initVal % 2 == 0) {   
            $(this).removeClass('col-md-12').addClass('col-md-6');
        }else {
            if(isLastElement){
                $(this).addClass('col-md-12').removeClass('col-md-6');
            }else{
                $(this).removeClass('col-md-12').addClass('col-md-6');
            }
        }
     });
};
const printAddProgramLink = function(element){
    let textLink = "+Add Another Program";
    if($(element).find('.add-program-link').length == 0){
        $(element).append('<a class="add-program-link">'+textLink+'</a><span class="add-program-warning"></span>');
    }
};
const removeProgramLink = function(){
    $('a.add-program-link').remove();
}
$(document).on('click', '.program-multi-box .fa-minus-square', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input',
        inputName = $(this).parent().prevAll('div[data-program-iterate=1]').find('select[name*="program_name"]').attr('name');

    $(this).parent().remove();
    $('form#study-form').attr('data-submit',false);
    $( ".program-multi-box" ).each(function( index ) {
        iterateVal = index+1;
        iterateAdd = iterateVal+1;
        iterateId = 'study-program-'+iterateAdd.toString();
        $(this).attr('data-program-iterate',iterateVal+1);
        $(this).attr('id',iterateId);
        $('span.iterate-number-text',this).text(iterateAdd.toString());

        $( "input,select",this ).each(function( index2 ) {
            let inputName = $(this).attr('name'),
                inputNameNew = inputName.replace(/.$/,iterateAdd);

                $(this).attr('name',inputNameNew);
                $(this).attr('data-program-iterate',iterateAdd);

        });
      });
     
      setTimeout(resetProgramComboDate(element,inputName),500);
      resizeProgramMultiBox();
      if($('.program-multi-box').length < 5){
        $('span.add-program-warning').empty();
      }
});
$(document).on('click', 'a.add-program-link', function () {
    let iterateNum = $('.program-multi-box').length == 0 ? 2 : $('.program-multi-box').length + 2;
    if ($(this).parents().eq(3).hasClass('alternate-input')) {
        element = 'alternate-input';
        pairable = true;
    } else {
        element = 'primary-input';
        pairable = false;
    }
    if($('.program-multi-box').length < 5){
        printProgramBox(iterateNum,element);
    }else{
        $('span.add-program-warning').html('You have reached the maximum number of additional programs (5).')
    }
});

const resetProgramComboDate = function(element,inputName){
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        parentInt = inputName.includes('program_name') || inputName.includes('program_startdate') ? 4 : 5,
        parentStr = inputName.includes('program_name') || inputName.includes('program_startdate') ? 'select[name='+inputName+']' : 'input[name='+inputName+']:checked',
        parentElement = $(parentStr).parents().eq(parentInt),
        parentElementMulti = parentElement.nextAll('.program-multi-box'),
        selectedParentSchool = $('input[name=program_school]').attr('data-school'),
        selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;
      
    if(parentElementMulti.length > 0){
        //selectedProgram, element, minAge, maxAge, inputName
        
        parentElementMulti.each(function(index){
            if(!$(this).find('select[name*="program_startdate"]').attr('disabled')){
                
                if($(this).find('select[name*="program_startdate"] option').length > 0){
                    programStartDate = $('select[name=program_startdate_'+element+comboName+'] option:selected').val(),
                    programId = selectedCurrentSchool == 'Greystone College' ? $(this).find('input[name*="program_schedule_'+element+'"]:checked').attr('id') : selectedCurrentSchool == 'Language School' ? $(this).find('input[name*="program_option_'+element+'"]:checked').attr('id') : $(this).find('select[name*="program_name_'+element+'"] option:selected').val(),
                    minAge = $(this).find('select[name*="program_name_'+element+'"] option:selected').attr('data-min-age'),
                    maxAge = $(this).find('select[name*="program_name_'+element+'"] option:selected').attr('data-max-age'),
                    inputTarget = selectedCurrentSchool == 'Greystone College' ? $(this).find('input[name*="program_schedule_'+element+'"]').attr('name') : selectedCurrentSchool == 'Language School' ? $(this).find('input[name*="program_option_'+element+'"]').attr('name') : $(this).find('input[name*="program_name_'+element+'"]').attr('name');
                    
                    if(programStartDate && programId){
                        printStartDates(programId,element,minAge,maxAge,inputTarget);
                    }
                }
            }
        })
        
    }
};
const startDateAction = function (element,thisElement) {
    let isPairable = $('input[name=program_school]:checked').attr('data-pairable'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        inputName = $(thisElement).attr('name');
        
    if (selectedParentSchool == 'Language School' || selectedParentSchool == 'ELS') {
        printProgramDuration(element,inputName)
    }

    if (isPairable == 1) {
        if (element != 'alternate-input') {
            printAlternateOption(element);
        }
    }
    
    setTimeout(resetProgramComboDate(element,inputName),500);
    
    if(selectedParentSchool == 'Greystone College'){
        printAdditionalInfo();
    }else{
        if($('input[name=is_alternate_apply][value=1]').is(':checked')){
            printAdditionalInfo();
        }
    }

    $(function () {
        let startDate = new Date(parseInt($('select[name=program_startdate_primary-input] option:checked').attr('data-value'))),
            weekBefore = selectedParentSchool == 'ELS' ? startDate.setDate(startDate.getDate() - startDate.getDay()) : startDate.setDate(startDate.getDate() - 3);
        $(".accommodation-checkin-date-picker").attr('disabled', false);
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker('setDate', null);
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker("destroy");
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker(
            {
                minDate: new Date(weekBefore),
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {
                    dateObj = new Date(dateText);
                    $(this).attr('data-value', dateObj.getTime());
                    if ($(this).hasClass('accommodation-checkin-date-picker')) {
                        if ($('.accommodation-name-option').is(':empty')) {
                            printAccommodationName();
                        }
                        calcAccomCheckOutDate();
                    }
                },
                beforeShowDay: function (date) {
                    if (selectedParentSchool == 'ELS') {
                        return [true];
                    } else {
                        if (date.getDay() == 6 || date.getDay() == 0) {
                            return [true];
                        } else {
                            return [false];
                        }
                    }

                }
            }
        );

    });
};

const durationAction = function (element,tEl) {
    let inputName = $(tEl).attr('name'),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedSchoolName = $('input[name=program_school]:checked').val();

    if (element == 'primary-input') {
        if ($('input[name=is_alternate_apply]:checked').val() == '1') {
            if (!$('.alternate-input .study-program-start-date-dropdown').is(':empty')) {
                let selectedId = $('input[name=program_schedule_alternate-input]:checked').attr('id'),
                    selectedMinAge = $('.study-program-dropdown select.' + element + ' option:selected').attr('data-min-age'),
                    selectedMaxAge = $('.study-program-dropdown select.' + element + ' option:selected').attr('data-max-age');
                printStartDates(selectedId, 'alternate-input', selectedMinAge, selectedMaxAge,inputName);
            }

        }
    }

    let schoolSelected = $('input[name=program_school]').val();

    if (schoolSelected == 'ELS') {
        startDate = parseInt($('select[name=program_startdate_primary-input] option:checked').attr('data-value'));
        primaryDurationInt = parseInt($('select[name=program_option_duration_primary-input] option:selected').val().slice(0, 2));
        primaryDuration = primaryDurationInt * 7;
        endDate = startDate + (1000 * 60 * 60 * 24 * primaryDuration);
        checkOutDateObj = new Date(endDate),
            checkOutDate = checkOutDateObj.setDate(checkOutDateObj.getDate() + 3);

        $(".accommodation-checkout-date-picker").datepicker("destroy");
        $(".accommodation-checkout-date-picker").datepicker(
            {
                minDate: new Date(endDate),
                maxDate: new Date(checkOutDate),
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {
                    dateObj = new Date(dateText);
                    $(this).attr('data-value', dateObj.getTime());
                },
                beforeShowDay: function (date) {
                    if (schoolSelected == 'ELS') {

                        return [true];

                    } else {

                        if (date.getDay() == 6 || date.getDay() == 0) {
                            return [true];
                        } else {
                            return [false];
                        }

                    }

                }
            }
        );
        
    }

    printAdditionalInfo();

};

$(document).on('change', 'select[name=student_address_country]', function () {

    selected = $('option:selected', this).val();

    if (selected == 'Australia') {
        $('input[name=australia_visa_type_number]').attr('disabled', false).parent().removeClass('study-hide').addClass('study-show');
    } else {
        $('input[name=australia_visa_type_number]').attr('disabled', true).parent().removeClass('study-show').addClass('study-hide');
    }

});


$(document).on('click', '.primary-input input[name*="program_is_coop"],.alternate-input input[name*="program_is_coop"]', function () { 
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    coopAction(this, element);
});

$(document).on('change', 'select.study-program-select', function () {
    if ($(this).hasClass('alternate-input')) {
        element = 'alternate-input';
        pairable = true;
    } else {
        element = 'primary-input';
        pairable = false;
    }
    programAction(this, element, pairable);
});

$(document).on('change', 'input[name=program_country]', function () {
    resetInsuranceOption();
    resetAdditionalInfo();
});

$(document).on('click', '.primary-input input[name*="program_option"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    programOptionAction(this, element);
});

$(document).on('click', '.primary-input input[name*="program_schedule"],.alternate-input input[name*="program_schedule"]', function () {   
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    scheduleAction(this, element);
});
$(document).on('click', '.primary-input input[name*="option_lasalle_parthership"],.alternate-input input[name*="option_lasalle_parthership"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    partnerOptionAction(this, element);
});

$(document).on('change', '.primary-input .study-program-start-date-dropdown select.primary-input,.alternate-input .study-program-start-date-dropdown select.alternate-input', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    startDateAction(element,this);
});
$(document).on('change', '.primary-input select[name*="program_option_duration"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    durationAction(element,this);
});

$(document).on('click', '.alternate-input input[name=is_alternate_apply]', function () {
    let element = 'alternate-input',
        selectedValue = $(this).val(),
        campusSelected = $('input[name=program_campus]:checked').val();

    if (selectedValue == 1) {

        printProgram(campusSelected, element, true);

        $('.study-program-alternate input,.study-program-alternate select').attr('disabled', false)
    } else {
        $('.alternate-initial input[name=program_school_alternate-input]').remove();
        $('.study-program-alternate').removeClass('study-show').addClass('study-hide');
        $('.program-input.alternate-input,.schedule-input.alternate-input,.date-input.alternate-input').removeClass('study-show').addClass('study-hide');
        $('.study-program-alternate input,.study-program-alternate select').attr('disabled', true)
    }
});
$(document).on('click', 'input[name=additional_visa_refusal]', function () {

    if ($(this).val() == 'Yes') {
        $('.gte-file-input').removeClass('study-hide').addClass('study-show');
        $('.gte-file-input input').attr('required', true);
    } else {
        $('.gte-file-input').removeClass('study-show').addClass('study-hide');
        $('.gte-file-input input').attr('required', false);
    }
});
$(document).on('click', 'input[name=additional_visa_transfer_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.visa-transfer-input,.visa-transfer-attendance-input').removeClass('study-hide').addClass('study-show');
        $('.visa-transfer-input input,.visa-transfer-attendance-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.visa-transfer-input,.visa-transfer-attendance-input').removeClass('study-show').addClass('study-hide');
        $('.visa-transfer-input input,.visa-transfer-attendance-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', 'input[name=additional_visa_form_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.visa-form-input').removeClass('study-hide').addClass('study-show');
        $('.visa-form-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.visa-form-input').removeClass('study-show').addClass('study-hide');
        $('.visa-form-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', 'input[name=additional_college_question_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.college-acceptance').removeClass('study-hide').addClass('study-show');
        $('.college-acceptance input').attr('required', true).attr('disabled', false);
    } else {
        $('.college-acceptance').removeClass('study-show').addClass('study-hide');
        $('.college-acceptance input').attr('required', false).attr('disabled', true);
    }
});

$(document).on('click', 'input[name=additional_college_accept_question_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.college-input').removeClass('study-hide').addClass('study-show');
        $('.college-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.college-input').removeClass('study-show').addClass('study-hide');
        $('.college-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', '#add-visa-dependent', function () {
    dValue = $('.dependents-container >div').length + 1;
    dClass = 'dependent-person-' + dValue;
    if (dValue < 4) {
        $('.dependents-container').append('<div class="' + dClass + ' d-class"><i class="far fa-minus-square"></i><h4>Dependent #<span class="int-d-val">' + dValue + '</span></h4>');
        printPersonForm(dependentInputArray, false, 'Dependent', dClass, dValue);
    }
});
$(document).on('click', '.dependents-container .d-class i.fa-minus-square', function () {
    $(this).parent().remove();
    $('form#study-form').attr('data-submit',false);
    $('.dependents-container >div').each(function (i) {
        dValueNew = i + 1;
        dClass = 'dependent-person-' + dValueNew;
        $(this).removeClass().addClass(dClass).addClass('d-class');
        $('span.int-d-val', this).html(dValueNew);
    })
});

$(document).on('mouseenter', 'i[data-toggle="popover"]', function () {
    $(this).popover({
        trigger: 'hover',
        html: true
    }).popover('show');
});
$(document).on('change', 'input[name=online_applicant_status]', function () {

    statusName = $(this).val();
    if (statusName == 'Student') {
        $('select[name=student_preferred_language]').parent().removeClass('study-hide').addClass('study-show');
        $('select[name=student_preferred_language]').prop('disabled', false);
    } else {
        $('select[name=student_preferred_language]').parent().removeClass('study-show').addClass('study-hide');
        $('select[name=student_preferred_language]').prop('disabled', true);
    }

});




const applicationFormSlider = function () {

    $('.app-step-container').prepend('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');

    $('.application-step-form-slide').slick({
        accessibility: false,
        arrows: false,
        dots: false,
        draggable: false,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        swipe: false,
        touchMove: false
    });
    setTimeout(function(){
        $('.app-step-container .lds-ring').remove();
        $('.application-step-form-slide').css('visibility','visible').css('opacity','1');
    },2000);
};


$(document).ready(function () {
    applicationFormSlider();

});
        val = programArray[i].value;

        if (programArray[i].value == 1) {
            val = 'Yes';
        } else if (programArray[i].value == 0) {
            val = 'No';
        }

        if (keyValue.includes('dependent')) {
            splitName = programArray[i].name.split('_iterate_');
            iterateVal = splitName[1];
            dependentArray.push({
                "iterate": iterateVal,
                "name": splitName[0],
                "value": val
            });
        } else {
            if (keyValue.includes('alternate-input')) {
                if (keyValue.includes('additional')) {
                    formJson.program_form_array[0].program_alternate_array[0].program_additional_info[0][programArray[i].name.replace('_alternate-input', '')] = val;
                } else {
                    formJson.program_form_array[0].program_alternate_array[0][programArray[i].name.replace('_alternate-input', '')] = val;
                }

            } else {
                if (keyValue.includes('additional')) {
                    formJson.program_form_array[0].program_additional_info[0][programArray[i].name.replace('_primary-input', '')] = val;


                } else {
                    formJson.program_form_array[0][programArray[i].name.replace('_primary-input', '')] = val;
                }

            }
        }

    }
    if (dependentArray.length > 0) {
        groupedDependent = groupBy(dependentArray, "iterate");
        groupArray = new Object();
        groupArray = groupedDependent;
        values = Object.values(groupArray);

        for (let i = 0; i < values.length; i++) {
            for (let x = 0; x < values[i].length; x++) {
                formJson.program_form_array[0].program_additional_info[0].visa_form_dependent[i][values[i][x].name] = values[i][x].value;
            }
        }

    }


    localStorage.setItem(formJsonName, JSON.stringify(formJson));
    deleteCookie("program-obj");

};

const updateAccommodationJson = function () {
    let formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject),
        accommodationInfoArray = [];

    let formAccommodation_obj = $('form#accommodation-form').serializeArray();
    formAccommodation_obj.forEach(function (inputAgentObj) {
        accommodationInfoArray.push({
            name: inputAgentObj.name,
            value: inputAgentObj.value
        });
    });

    if (accommodationInfoArray.length > 0) {
        formJson.accommodation_form_array[0].accommodation_form_enabled = true;
    }

    for (let i = 0; i < accommodationInfoArray.length; i++) {
        formJson.accommodation_form_array[0][accommodationInfoArray[i].name] = accommodationInfoArray[i].value;
    }

    localStorage.setItem(formJsonName, JSON.stringify(formJson));
    deleteCookie("accom-type-obj");
};

//Step Study Form
const getSchoolCountryList = function () {
    let dropElement = '.study-information-form.dropdown-container ul.drop-country',
        tableId = schoolCountryListTable,
        schoolParentQuery = schoolVal == 'ELS' ? '&country__eq=USA' : '&country__neq=USA',
        queryParam = schoolParentQuery + '&location_type__in=Country,Online&enable__eq=1',
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);

    if ($(dropElement + ' li').length == 0) {
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;
            $(dropElement).append('<li class="disabled">Choose your Country</li>');
            if (dataObject.length > 0) {
                for (let i = 0; i < dataObject.length; i++) {
                    countryValue = dataObject[i].values[1];
                    listHtml = "<li class='dropdown-item' data-value='" + countryValue + "' tranlsate='no'>" + countryValue + "</li>";
                    $(dropElement).append(listHtml);
                }
                printDropSelect('.country-dropdown');
                $('.study-information-form.dropdown-container ul.drop-country li.dropdown-item').click(function () {
                    $('.study-information-form .study-box-container:not(.country-select-container)').addClass('disabled');
                    $('.study-information-form .input-container').removeClass('study-show').addClass('study-hide');
                    selectedValue = $(this).attr('data-value');
                    $('input[name=program_country]').val(selectedValue).trigger('change');
                    printSchoolSelection(selectedValue);
                })
                enableCountryBtn();
            } else {
                listHtml = "No Country Available at this time.";
                $("#.study-information-form.dropdown-container .btn.country-select span.selected-text").text(listHtml);
            }
        }).fail(function () {
            listHtml = "No Country Available at this time.";
            $("#.study-information-form.dropdown-container .btn.country-select span.selected-text").text(listHtml);
        });
    }

};

const resetInsuranceOption = function () {
    $('#insurance-option-container').empty();
};
const resetAdditionalInfo = function () {
    $('#additional-info-container').empty();
};
const resetProgramComboBox = function(){
    $('.program-multi-box').remove();
};
const resetSchoolProgram = function () {
    $('.study-program-selection.study-box-container').addClass('disabled');
    $('.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container,.accommodation-airport-transfer-details,.accommodation-details,.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
    $('.additional-program-form').empty();
    $('.additional-notes-container .additional-notes-input').empty();
    $('.week-input').empty();
    $('input[name*="program_weeks"]').attr('disabled', true).val('');
    $('.additional-files-container').empty();
    $('.airport-transfer-details').empty();
    $('#accommodation-type-option-container').empty();
    $('.homestay-details').empty();
    $('input[name=accommodation_option]').prop('checked', false);
    $('.submit-policy-file-container').empty();

    if (!$('.accommodation-details').is(':empty') && $('input[name=program_campus]').is(':checked')) {
        printAccomLocationOption();
    }
    resetProgramComboBox();
}
const resetCampusProgram = function () {
    $('.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container').removeClass('study-show').addClass('study-hide');
    $('input[name=program_is_coop_primary-input]').prop('checked', false);
    $('.additional-notes-container .additional-notes-input').empty();
    resetProgramComboBox();
}
const resetProgramFormField = function (elementStatus, formElement, emptyElement,inputName) {
    let comboVal = returnComboVal(inputName);

    if (elementStatus == 'primary-input') {
        $('#study-program-'+comboVal+' .study-program-alternate').removeClass('study-show').addClass('study-hide');
    }
    if (formElement) {
        
        $(formElement,'#study-program-'+comboVal).removeClass('study-show').addClass('study-hide');
        //$(formElement+' input,select','#study-program-'+comboVal).attr('disabled', true);

    }
    if (emptyElement) {
        $(emptyElement).empty();
    }
    if(comboVal == 1){
        $('.additional-notes-container').removeClass('study-show').addClass('study-hide');
        $('.additional-notes-container .additional-notes-input').empty();
        $('.additional-files-container').empty();
    }
    $('#study-program-'+comboVal+ 'a.add-program-link').remove();
    resetLaSalleOption(elementStatus,inputName);
}

const resetAccommodationDetails = function () {
    $('input[name=accommodation_type]').prop('checked', false);
    $('.form-group.accommodation-details').removeClass('study-show').addClass('study-hide');
    $('.form-group.accommodation-details input').attr('disabled', true);
    $('.accommodation-homestay-details').removeClass('study-show').addClass('study-hide');
    $('.accommodation-homestay-details input').attr('disabled', true);
}
const resetAdditionalFiles = function () {
    $('.additional-files-container').empty();
}
const printWeeksOption = function (selectedProgramArray, element, inputName) {
    let comboVal = returnComboVal(inputName),
        dataObject = selectedProgramArray,
        labelHtml = '<label>Number of Weeks</label>',
        optionHtml = "";
    if (dataObject.length > 0) {
        for (let i = 0; i < dataObject.length; i++) {
            optionHtml += '<div class="form-check"><label class="form-check-label" for="program-weeks-' + dataObject[i].program_id + '">' + dataObject[i].program_length + ' weeks</label></div>';
        }
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input.' + element + ' .week-input').html(labelHtml + optionHtml);
    }
};

const printAlternateOption = function () {
    optionHtml = '<label>Are you also applying for Greystone College programs?</label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="is_alternate_apply" id="no-alternate" required checked><label class="form-check-label" for="no-alternate">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="is_alternate_apply" id="yes-alternate"><label class="form-check-label" for="yes-alternate">Yes</label></div>';
    className = '.study-program-selection .input-container.alternate-initial .study-program-alternate-option';
    if ($(className).is(':empty')) {
        $(className).html(optionHtml);
    }
    $('.study-program-selection .input-container.alternate-initial').removeClass('study-hide').addClass('study-show');
};
const printScheduleOption = function (selectedProgramArray, element, inputName) {

    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        dataObject = selectedProgramArray,
        labelHtml = '<label>Choose Schedule</label>',
        selected = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-id'),
        selectedMinAge = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-min-age'),
        selectedMaxAge = $('.study-program-dropdown .' + element + ' select option:selected').attr('data-max-age'),
        optionHtml = "";
    singleOptionChek = dataObject.length == 1 ? 'checked' : '';

    selectedMinAge = selectedMinAge ? selectedMinAge : 0;
    selectedMaxAge = selectedMaxAge ? selectedMaxAge : 99;

    if (dataObject.length > 0) {


        for (let i = 0; i < dataObject.length; i++) {

            lasalleVar = dataObject[i].laSalleEligible ? dataObject[i].laSalleEligible : '';

            optionHtml += '<div class="form-check"><input class="form-check-input ' + element + '" value="' + dataObject[i].program_schedule + '" type="radio" name="program_schedule_' + element + comboName +'" data-weeks="' + dataObject[i].program_length + '" data-parent-id="' + dataObject[i].parent_program_id + '" id="' + dataObject[i].program_id + '" data-lasalle-eligible="' + lasalleVar + '" ' + singleOptionChek + ' required><label class="form-check-label" for="' + dataObject[i].program_id + '">' + dataObject[i].program_schedule + '</label></div>';
        }
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input.' + element + ' .time-input').html(labelHtml + optionHtml);
        $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.schedule-input.' + element).removeClass('study-hide').addClass('study-show');
        printWeeksOption(dataObject, element, inputName);
        if (dataObject.length == 1) {
            $('input[name=program_weeks_' + element+comboName).val(dataObject[0].program_length).attr('disabled', false);
            inputName = $('input[name*=program_schedule_'+element+comboName+']:checked').attr('name');
           
            printStartDates(dataObject[0].program_id, element, selectedMinAge, selectedMaxAge,inputName);

        }
    } else {
        $('#study-program-'+comboVal+'.study-program-selection .input-container.schedule-input .time-input,.study-program-selection .input-container.schedule-input.' + element + ' .week-input').empty();
        printStartDates(selected, element, selectedMinAge, selectedMaxAge, inputName);
    }
};
const printProgramOption = function (selectedProgram, element, minAge, maxAge,inputName) {
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedSchool = $('input[name=program_school]:checked').val(),
        labelHtml = '<label>Choose Program Option</label>',
        tableId = programLSListTable,
        queryParam = '&campus_location__in=' + selectedCampus + '&programs_available__in=' + selectedProgram + '&is_program_price__eq=1&enable__eq=1&orderBy=category',
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam,
        programOptionArray = [],
        optionProgramHtml = '';
    api_url = encodeURI(api_url);

    $.ajax({
        url: api_url,
        type: "get",
        async: false,
        success: function (data) {
            let dataObject = data.objects;

            for (let i = 0; i < dataObject.length; i++) {

                scheduleName = dataObject[i].values[3].name;
                programOptionArray.push({
                    program_id: dataObject[i].id,
                    schedule_name: dataObject[i].values[3].name,
                    item_name: dataObject[i].values[4],
                    schedule_id: scheduleName.replace(/\s/g, ''),
                    group_id: dataObject[i].values[13][0].id,
                    campus_country: dataObject[i].values[26].name
                });
            };

            let programPriceGroupedByGroupId = groupBy(programOptionArray, 'group_id'),
                groupArray = new Object();
            groupArray = programPriceGroupedByGroupId;

            const keys = Object.keys(groupArray);

            let programGroupedArray = [],
                values = Object.values(groupArray);

            for (let i = 0; i < values.length; i++) {

                for (let x = 0; x < values[i].length; x++) {
                    if (x == 0) {
                        programGroupedArray.push({
                            'program_id': values[i][x].program_id,
                            'campus_country': values[i][x].campus_country,
                            'group_id': values[i][x].group_id,
                            'item_name': values[i][x].item_name,
                            'schedule_id': values[i][x].schedule_id,
                            'schedule_name': values[i][x].schedule_name
                        });
                    }
                }
            }
            singleOptionChek = programGroupedArray.length == 1 ? 'checked' : '';

            if (programGroupedArray.length > 0) {
                for (let i = 0; i < programGroupedArray.length; i++) {
                    optionProgramHtml += '<div class="form-check"><input class="form-check-input ' + element + '" value="' + programGroupedArray[i].schedule_name + '-' + programGroupedArray[i].item_name + '" type="radio" name="program_option_' + element + comboName + '"  data-parent-id="' + programGroupedArray[i].group_id + '" id="' + programGroupedArray[i].program_id + '" ' + singleOptionChek + ' required><label class="form-check-label" for="' + programGroupedArray[i].program_id + '">' + programGroupedArray[i].schedule_name + '-' + programGroupedArray[i].item_name + '</label></div>';
                }
                optionLink = selectedSchool == 'ILSC HELLO Online' || selectedSchool == 'ILSC ALLO Online' ? '<div class="disclaimer"><a href="/'+returnDocumentLang()+'/online-timezone-schedule" target="_blank">See online schedules in your timezone.</a></div>' : '';
                $('#study-program-'+comboVal+'.study-program-selection .input-container.program-option-input.' + element + ' .program-schedule-input').html(labelHtml + optionProgramHtml + optionLink);
                $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-option-input.' + element).removeClass('study-hide').addClass('study-show');

            }
            if (programGroupedArray.length == 1) {
                printStartDates(selectedProgram, element, minAge, maxAge,inputName);
            }

        }
    });

};

const printLaSalleOption = function (element,inputName) {

    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName);

    isLasalleOptionHtml = "<label>Are you also applying for LaSalle partnership program?</label><div class='form-check'><input class='form-check-input " + element + "' value='No' type='radio' name='option_lasalle_parthership_" + element + comboName + "' id='no-'" + element + "'><label class='form-check-label' for='no-" + element + "'>No</label></div><div class='form-check'><input class='form-check-input " + element + "' value='Yes' type='radio' name='option_lasalle_parthership_" + element + comboName + "' id='yes-'" + element + "'><label class='form-check-label' for='yes-" + element + "'>Yes</label></div>";

    birthOptionHtml = "<div class='partner-info study-hide'><div class='form-group'><label for='partner-birth-city-" + element + "'>Enter City of Birth<sup>*</sup></label><input class='form-control' id='partner-birth-city-" + element + "' type='text' name='student_city_birth_" + element + comboName + "' disabled required></div><div class='form-group'><label for='partner-birth-state-" + element + "'>Enter Province/State of Birth<sup>*</sup></label><input class='form-control' type='text' id='partner-birth-state-" + element + "' name='student_prov_state_birth_" + element + comboName +"' disabled required></div></div>";

    $('#study-program-'+comboVal+'.study-program-selection .partner-input.' + element + ' .partner-option-input').html(isLasalleOptionHtml + birthOptionHtml);
    $('#study-program-'+comboVal+'.study-program-selection .partner-input.' + element).removeClass('study-hide').addClass('study-show');
};

const printStartDates = function (selectedProgram, element, minAge, maxAge, inputName) {
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val(),
        selectedSchedule = $('input[name=program_option_primary-input]:checked').val(),
        dateBirth = new Date($('input[name=student_dob]').val()),
        dateBirthTime = dateBirth.getTime(),
        minorAge = 18,
        epochPrimaryStartDate = '',
        campusName = schoolVal == 'ELS' ? $('input[name=program_campus]:checked').val() : '';
        campusMinAge = $('input[name="campus-min-age"]').val(),
        minAgeVal = schoolVal == 'ELS' ? campusMinAge : minAge
        availableStartDateMessage = schoolVal == 'ELS' ? ' Available start dates depend on age of student upon the start of program. Minimum age for '+campusName+' campus is '+campusMinAge : null;

    if (selectedParentSchool == 'Language School') {
        tableId = startDateTableLS;
    } else if (selectedParentSchool == 'Greystone College') {
        tableId = startDateTableGC;
    } else if (selectedParentSchool == 'ELS') {
        tableId = startDateTableELS;
    }

    if (element == 'alternate-input') {
        tableId = startDateTableGC;   
    }
    selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;

    if(comboVal > 1){    
        previousDateSelected = $('input[name='+inputName+']:checked').parents().eq(5).prev().find('select[name*="program_startdate_"] option:selected').attr('data-value');
        previousDurationSelected = selectedCurrentSchool == 'Greystone College' ? parseInt($('input[name='+inputName+']:checked').parents().eq(5).prev().find('input[name*="program_weeks_'+element+'"]').val()) : parseInt($('input[name='+inputName+']:checked').parents().eq(5).prev().find('select[name*="program_option_duration_'+element+'"] option:selected').val().slice(0, 2));
        
    }else{
        
        previousDateSelected = element == 'alternate-input'? $('select[name=program_startdate_primary-input'+comboName+'] option:selected').attr('data-value') : $('select[name=program_startdate_'+element+comboName+'] option:selected').attr('data-value');    
        previousDurationSelected = element == 'alternate-input'? parseInt($('select[name=program_option_duration_primary-input'+comboName+'] option:selected').val().slice(0, 2)) : selectedCurrentSchool == 'Greystone College' ? $('input[name=program_weeks_'+element+comboName+']').val() : parseInt($('select[name=program_option_duration_'+element+comboName+'] option:selected').val().slice(0, 2));
    }

    console.log(previousDurationSelected);

    primaryStartDate = previousDateSelected;
    primaryDurationInt =  previousDurationSelected;
    primaryDuration = primaryDurationInt * 7;
    epochPrimaryStartDate = comboVal > 1  || element == 'alternate-input' ? parseInt(primaryStartDate) + (1000 * 60 * 60 * 24 * primaryDuration) : '';
 
    console.log('startDate: ' +epochPrimaryStartDate);

    if (typeof tableId !== 'undefined') {

        dateQuery = epochPrimaryStartDate != '' ? '&start_dates__gte=' + epochPrimaryStartDate : '';

        let queryParam = '&program__in=' + selectedProgram + '&campus__in=' + selectedCampus + dateQuery,
            api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
        api_url = encodeURI(api_url),
            foundNoneHtml = "<option disabled selected value=''>No Start Dates Available</option>";

        $('#study-program-'+comboVal+' .study-program-start-date-dropdown .' + element + ' select.form-control').html("<option disabled selected value=''>No Start Dates Available</option>");
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;

            currentDate = new Date();
            dataObject.sort((a, b) => a.values[3] - b.values[3]);


            if (dataObject.length > 0) {
                optionHtml = "<option disabled selected value=''>Choose Start Date</option>";
                enableOption = false;
                for (let i = 0; i < dataObject.length; i++) {
                    dateObj = new Date(dataObject[i].values[3]);
                    dateObjCalc = new Date(dataObject[i].values[3]);
                    dateObjCalcMinor = new Date(dataObject[i].values[3]);
                    epochVal = dataObject[i].values[3];


                    if (currentDate.getTime() <= epochVal) {

                        minDob = subtractYears(minAgeVal, dateObjCalc);
                        minorDob = subtractYears(minorAge, dateObjCalcMinor);

                        if (dateBirthTime <= minDob) {
                            yearVal = dateObj.getUTCFullYear();
                            monthVal = months[dateObj.getUTCMonth()];
                            monthInt = monthsInt[dateObj.getUTCMonth()];
                            dayVal = dateObj.getUTCDate();
                            dateTxt = monthVal + " " + dayVal + ", " + yearVal;
                            monthInt = monthInt.length < 2 ? "0" + monthInt : monthInt;
                            dayVal = dayVal.toString().length < 2 ? "0" + dayVal.toString() : dayVal;
                            dateInt = yearVal + "-" + monthInt + "-" + dayVal,
                                weekAvailableArray = [];

                            if (dataObject[i].values[5]) {
                                for (let x = 0; x < dataObject[i].values[5].length; x++) {
                                    weekAvailableArray.push(
                                        dataObject[i].values[5][x].name
                                    )
                                }
                            }

                            selectedOption =  comboVal > 1 && i == 0 ? 'selected' : '';

                            optionHide = selectedCountry == 'Australia' && selectedParentSchool == 'Language School' ? selectedSchedule.includes('Evening') || selectedSchedule.includes('Part Time') ? dateBirthTime > minorDob ? 'hidden disabled' : '' : '' : '';

                            optionHtml = optionHtml + "<option " + optionHide + " value='" + dateInt + "' data-value='" + dataObject[i].values[3] + "' data-week-available='" + weekAvailableArray.toString() + "' "+selectedOption+">" + dateTxt + "</option>";

                            enableOption = true;

                        }
                    }
                }
                ageQualifyMessage = "<option disabled selected value=''>No Start Dates Available. Possible reason - There is an age requirement for this selected program or campus upon the start date of the program. Minimum age:" + minAgeVal + "</option>";

                if (enableOption) {

                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown').html(optionHtml);
                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown').prop("disabled", false);
                    if ($('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.startdate-dropdown option:not(:disabled)').length == 0) {
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(ageQualifyMessage);
                    }
                    
                    if(availableStartDateMessage){
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown label .age-message').remove();
                        $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown label').append('<p class="age-message">'+availableStartDateMessage+'</p>');
                    }

                } else {

                    $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(ageQualifyMessage);
                }
            } else {
                $('#study-program-'+comboVal+' .' + element + ' .study-program-start-date-dropdown select.form-control').prop("disabled", false).html(foundNoneHtml);
            }
            $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.date-input.' + element).removeClass('study-hide').addClass('study-show');
        }).fail(function (jqXHR, textStatus, error) {
            console.log('Something went wrong: ' + error);
            $('#study-program-'+comboVal+' .study-program-start-date-dropdown .' + element + ' select.form-control').html("<option disabled selected value=''>Cannot find Start Dates. Try another Program.</option>");
        });
    }

    selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;

    if(selectedCurrentSchool == 'Greystone College'){
        printAddProgramLink($('select[name=program_startdate_'+element+comboName+']').parent());
    }else{
        removeProgramLink();
    }
}

const printProgramDuration = function (element,inputName) {
    let comboVal = returnComboVal(inputName),
        selectedDuration = $('select[name=program_startdate_primary-input] option:selected').attr('data-week-available'),
        durationArray = selectedDuration ? selectedDuration.split(',') : [],
        minChar = '>',
        maxChar = '<',
        minVal = durationArray.find(mn => mn.includes(minChar)),
        maxVal = durationArray.find(mx => mx.includes(maxChar)),
        maxLimit = 52,
        className = $('#study-program-'+comboVal+'.study-program-selection .program-option-duration-input.' + element + ' .duration-dropdown select'),
        optionHtml = '<option disabled selected value="">Choose Duration</option>';


    if (element == 'primary-input') {

        className.empty();

        if(minVal == undefined && maxVal == undefined){
            lengthVal = durationArray.length > 0 ? durationArray.length : maxLimit+1;
            indexNum = durationArray.length > 0 ? 0 : 1;

            for(let i = indexNum; i < lengthVal; i++){

                numVal = durationArray.length > 0 ? durationArray[i] : i;

                weekText = numVal == '1' ? 'week' : 'weeks';
                optionHtml += '<option class="dropdown-item" data-item="' + numVal + ' ' + weekText + '" value="' + numVal + ' ' + weekText + '">' + numVal + ' ' + weekText + '</option>';
            }
        }else{
            minVal = minVal ? parseInt(minVal.slice(1,99)) : 1;
            maxVal = maxVal ? parseInt(maxVal.slice(1,99)) : maxLimit;
            for(let z = minVal; z <= maxVal; z++){
                weekText = z == '1' ? 'week' : 'weeks';
                optionHtml += '<option class="dropdown-item" data-item="' + z + ' ' + weekText + '" value="' + z + ' ' + weekText + '">' + z + ' ' + weekText + '</option>';    
            }
        }

        $('#study-program-'+comboVal+' .program-option-duration-input.primary-input').removeClass('study-hide').addClass('study-show');
        className.html(optionHtml).attr('disabled', false);
    }
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

const printProgram = function (selectedCampus, element, pairable) {
    let selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val();

    if (selectedParentSchool == 'Greystone College' || pairable) {


        initElement = '.study-program-selection .additional-input-container.' + element + ' .additional-program-form';
        $(initElement).empty();

        if ($(initElement).is(':empty')) {
            coopText = selectedCampus == '52464878081' ? 'Practicum' : 'Co-Op';
            academicHtml = selectedCampus != '52464878081' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="0" type="radio" name="program_is_coop_' + element + '" id="no-coop" required><label class="form-check-label" for="no-coop">Academic</label></div>' : '';
            coopHtml = selectedCountry != 'Australia' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="1" type="radio" name="program_is_coop_' + element + '" id="yes-coop"><label class="form-check-label" for="yes-coop">' + coopText + '</label></div>' : '';

            optionHtml = '<label>Choose Program Type</label>' + academicHtml + coopHtml;
            $(initElement).html(optionHtml);
        }

        $('.study-program-selection.study-box-container').removeClass('disabled');
        $('.study-program-selection .additional-input-container.' + element).removeClass('study-hide').addClass('study-show');
        if (pairable) {
            $('.study-program-alternate').removeClass('study-hide').addClass('study-show');
            $('.alternate-initial').append('<input name="program_school_alternate-input" value="Greystone College" type="hidden">');
        }


    } else {
        printProgramDrop(selectedCampus, 0, element,"program_is_coop_"+element);

    }

}
const printProgramDrop = function (selectedCampus, isCoop, element, inputName) {

    let selectedSchool = $('input[name=program_school]:checked').attr('id'),
        comboVal = returnComboVal(inputName);
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        dropContainerEl = '#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-input.' + element,
        printDropDownArray = [],
        programArray = [],
        isProla = false,
        comboName = returnComboName(inputName);

    if (selectedParentSchool == 'Language School') {
        tableId = programTableLS;
        campusProp = 'campus';
        objNum = 2;
        coopBool = '',
        accommObjNum = 25,
        minAgeObjNum = 16,
        maxAgeObjNum = 17;
    } else if (selectedParentSchool == 'Greystone College') {
        tableId = programTableGC;
        campusProp = 'new_campus';
        accommObjNum = 40,
        objNum = 3,
        coopBool = isCoop == 1 ? '&is_co_op__eq=1' : '&is_co_op__eq=0';
    } else if (selectedParentSchool == 'ELS') {
        tableId = programTableELS;
        campusProp = 'campus';
        objNum = 2,
        accommObjNum = 20,
        minAgeObjNum = 0,
        maxAgeObjNum = 99,
        coopBool = '';
    }

    if (element == 'alternate-input') {
        selectedParentSchool = 'Greystone College';
        selectedSchool = '81771084433';
        tableId = programTableGC;
        campusProp = 'new_campus';
        objNum = 3;
    }

    if (typeof campusProp !== 'undefined') {
        let queryParam = '&' + campusProp + '__in=' + selectedCampus + '&schools__in=' + selectedSchool + '&enable=1' + coopBool + '&show_quote_tool=1&add_on_program=0',
            api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
        api_url = encodeURI(api_url);
        $.get(api_url).done(function (data) {
            let dataObject = data.objects;
            dataObject.sort((a, b) => a.values[objNum] > b.values[objNum] ? 1 : -1);

            if (dataObject.length > 0) {
                if (selectedParentSchool == 'Greystone College') {

                    laSalleEligibleArr = [];


                    for (let i = 0; i < dataObject.length; i++) {

                        minAge = dataObject[i].values[37] ? dataObject[i].values[37][0].name : '';

                        if (dataObject[i].values[39]) {
                            if (dataObject[i].values[39].length > 0) {
                                for (let x = 0; x < dataObject[i].values[39].length; x++) {
                                    laSalleEligibleArr.push(
                                        dataObject[i].values[39][x].id
                                    );
                                }
                            }
                        }

                        programArray.push({
                            parent_program_id: dataObject[i].values[29][0].id,
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[3],
                            program_schedule: dataObject[i].values[10],
                            program_length: dataObject[i].values[8],
                            is_coop: dataObject[i].values[9],
                            min_age: minAge,
                            max_age: '',
                            is_accommodation_enable: dataObject[i].values[accommObjNum],
                            laSalleEligible: laSalleEligibleArr.toString()
                        });
                    }
                    let groupProgram = groupBy(programArray, 'program_name'),
                        groupArray = new Object();
                    groupArray = groupProgram;
                    values = Object.values(groupArray);
                    uniqueProgramArray = [];

                    for (let i = 0; i < values.length; i++) {
                        for (let x = 0; x < values[i].length; x++) {
                            if (x == 0) {
                                uniqueProgramArray.push({
                                    program_id: values[i][x].parent_program_id,
                                    program_name: values[i][x].program_name,
                                    is_prola: 0,
                                    min_age: values[i][x].min_age,
                                    max_age: values[i][x].max_age,
                                    is_accommodation_enable: values[i][x].is_accommodation_enable
                                })
                            }
                        }
                    }

                    printDropDownArray = uniqueProgramArray;
                    localStorage.setItem(programObjGC, JSON.stringify(programArray));

                } else if (selectedParentSchool == 'Language School' || selectedParentSchool == 'ELS') {

                    for (let i = 0; i < dataObject.length; i++) {
                        minAge = dataObject[i].values[minAgeObjNum] !== undefined ? dataObject[i].values[minAgeObjNum][0].name : '';
                        maxAge = dataObject[i].values[maxAgeObjNum] !== undefined ? dataObject[i].values[maxAgeObjNum][0].name : '';

                        programArray.push({
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[2],
                            is_prola: dataObject[i].values[10],
                            min_age: minAge,
                            max_age: maxAge,
                            is_accommodation_enable: dataObject[i].values[accommObjNum],
                        });
                    }

                    printDropDownArray = programArray;
                } else {
                    for (let i = 0; i < dataObject.length; i++) {

                        programArray.push({
                            program_id: dataObject[i].id,
                            program_name: dataObject[i].values[2],
                            is_prola: false,
                            min_age: '',
                            max_age: '',
                            is_accommodation_enable: 1,
                        });
                    }

                    printDropDownArray = programArray;
                }

            }

            $('.study-program-selection.study-box-container').removeClass('disabled');
            if (printDropDownArray.length > 0) {
                optionHtml = "<option disabled selected value=''>Choose Program</option>";

                for (let i = 0; i < printDropDownArray.length; i++) {

                    optionValue = printDropDownArray[i].program_name;
                    isProla = printDropDownArray[i].is_prola == 0 ? false : true;
                    optionHtml = optionHtml + "<option data-id='" + printDropDownArray[i].program_id + "' value='" + optionValue + "' data-min-age='" + printDropDownArray[i].min_age + "' data-max-age='" + printDropDownArray[i].max_age + "'  data-prola='" + isProla + "' data-value='" + optionValue + "' data-accommodation-enable='" + printDropDownArray[i].is_accommodation_enable + "'>" + optionValue + "</option>";

                }
                //$('.' + element + ' .study-program-dropdown').remove();
                $('#study-program-'+comboVal+' .' + element + ' .study-program-dropdown select').html(optionHtml).attr('name', 'program_name_' + element+comboName).attr('id', 'program-name-' + element+comboName).addClass(element);
                $(dropContainerEl).removeClass('study-hide').addClass('study-show');
                $(dropContainerEl + ' select').attr('disabled', false);
            } else {
                $('#study-program-'+comboVal+'.study-program-selection.study-box-container .input-container.program-input.' + element).removeClass('study-hide').addClass('study-show');
                $('.study-program-dropdown select.' + element + '[name=name=program_name'+comboName+']').html('<option value="" selected disabled>No Programs available</option>');
            }
        });
    }


}
const printCampus = function (selected) {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        tableId = campusTable,
        queryParam = '&enable__eq=1&country__in=' + countrySelected + '&schools__in=' + selected,
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);

    $.get(api_url).done(function (data) {
        let dataObject = data.objects;
        dataObject.sort((a, b) => a.values[4] > b.values[4] ? 1 : -1);
        campusArray = [];

        if (dataObject.length > 0) {
            for (let i = 0; i < dataObject.length; i++) {
                initials = dataObject[i].values[1].match(/\b(\w)/g);
                boxName = dataObject[i].values[6] ? '' : initials.join('').toUpperCase();
                thumbNail = dataObject[i].values[6] ? "style=background:url('" + dataObject[i].values[6].url + "') no-repeat;" : '';
                minAge = schoolVal == 'ELS' ? dataObject[i].values[8] ?  dataObject[i].values[8] : '' : '' ;
                campusArray.push({
                    'id': dataObject[i].id,
                    'initials': boxName,
                    'school': selected,
                    'value': dataObject[i].values[1],
                    'stateProv': dataObject[i].values[4],
                    'thumbnail': thumbNail,
                    'minAge': minAge
                })

            }

            let groupCampus = groupBy(campusArray, 'stateProv'),
                groupArray = new Object();
            groupArray = groupCampus;
            groupHtml = '';
            arr = Object.values(groupArray);
            childArrayLength = arr.reduce((a, b) => a + b.length, 0);
            groupAction = arr.length < childArrayLength ? true : false;
            for (let x in groupArray) {
                title = x,
                    listHtml = "";
                for (let i = 0; i < groupArray[x].length; i++) {
                    if (groupArray[x][i].length > 1) {
                        multiList = true;
                    }

                    listHtml += '<li class="hs-form-radio campus-select-radio form-check"><label id="campus-select" for="' + groupArray[x][i].id + '" class="box-selection"><div class="box-color" data-min-age="'+groupArray[x][i].minAge+'" data-value="' + groupArray[x][i].id + '" ' + groupArray[x][i].thumbnail + '>' + groupArray[x][i].initials + '</div><input type="radio" name="program_campus" data-state-prov="' + groupArray[x][i].stateProv + '" data-school="' + groupArray[x][i].school + '" value="' + groupArray[x][i].value + '" id="' + groupArray[x][i].id + '" required><span>' + groupArray[x][i].value + '</span></label></li>';
                }

                if (groupAction) {
                    groupHtml += '<div>' + listHtml + '<h5>' + title + '</h5></div>';
                } else {
                    groupHtml += listHtml;
                }
            }

            $('.study-campus-selection.study-box-container').removeClass('disabled');
            $('.study-campus-selection ul.inputs-list').html(groupHtml);
            $('.study-campus-selection.study-box-container .input-container').removeClass('study-hide').addClass('study-show');

        }


    });
};
const printSchoolSelection = function () {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        tableId = schoolTypeListTable,
        countryQuery = schoolVal == 'ELS' ? '&parent_school__in=ELS' : '&parent_school__ne=ELS',
        queryParam = countryQuery + '&location_country__in=' + countrySelected,
        api_url = 'https://api.hubapi.com/hubdb/api/v2/tables/' + tableId + '/rows?portalId=' + portalId + queryParam,
        listHtml = '';
    api_url = encodeURI(api_url);

    $.get(api_url).done(function (data) {
        let dataObject = data.objects;
        dataObject.sort((a, b) => a.values[1] > b.values[1] ? 1 : -1);

        if (dataObject.length > 0) {
            for (let i = 0; i < dataObject.length; i++) {

                initials = dataObject[i].values[3][0].name.match(/\b(\w)/g);
                boxName = dataObject[i].values[6] ? '' : initials.join('').toUpperCase();
                thumbNail = dataObject[i].values[6] ? "style=background:url('" + dataObject[i].values[6].url + "') no-repeat;" : '';

                listHtml += '<li class="hs-form-radio school-select-radio form-check"><label id="school-select" for="' + dataObject[i].id + '" class="box-selection"><div class="box-color center" data-value="' + dataObject[i].id + '" ' + thumbNail + '>' + boxName + '</div><input type="radio" class="form-check-input" name="program_school" data-pairable="' + dataObject[i].values[5] + '" value="' + dataObject[i].values[1] + '" data-school="' + dataObject[i].values[3][0].name + '" id="' + dataObject[i].id + '" required><span>' + dataObject[i].values[1] + '</span></label></li>';

            }
            $('.study-school-selection.study-box-container').removeClass('disabled');
            $('.study-school-selection ul.inputs-list').html(listHtml);
            $('.study-school-selection.study-box-container .input-container').removeClass('study-hide').addClass('study-show');

        }

    });

};

const printProgramHubspotFileForm = function () {
    hbspt.forms.create({
        region: "na1",
        portalId: "5020112",
        formId: programUploadFormId,
        target: "#program-hs-file-form"
    });
}
const printAdditionalInfo = function () {
    let countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        selectedSchoolName = $('input[name=program_school]:checked').val(),
        selectedAlternate = $('input[name=is_alternate_apply]:checked').val(),
        programSelected = $('select[name*=program_name_] option:selected').val(),
        durationSelected = $('select[name*=program_option_duration_] option:selected').val(),
        durationSelectedVal = parseInt(durationSelected.replace('week','').replace('s','')),
        inputHtml = '',
        additionalHtml = '',
        isProla = $('select[name=program_name_primary-input] option:selected').attr('data-prola') == 'true' || $('select[name=program_name_alternate-input] option:selected').attr('data-prola') == 'true' ? true : false;

    prolaHtml = '<div class="form-group"><label for="inputProlaNumber">ILSC Academic Placement Test Number (if applicable)</label><input type="text" name="additional_prola_number" id="inputProlaNumber"><div class="valid-feedback"></div></div>';
    usiHtml = '<div class="form-group"><label for="inputUsiNumber">USI Number<sup>*</sup></label><input type="text" name="additional_usi_number" id="inputUsiNumber"><div class="valid-feedback"></div></div>';
    visaRadioHtml = '<label>Have you ever been refused a visa for any country including Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_refusal" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_refusal" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaFileHtml = '<div class="form-group gte-file-input study-hide"><label for="gte-file">Upload Genuine Temporary Entrant - Statement of Purpose Copy (jpeg,png,pdf) (<a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant#:~:text=%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8BAll,to%20apply%20for%20permanent%20residence" target="_blank">more info</a>)<br><span class="footnote">*Further documents might be required throughout the application process.</span></label><input type="file" name="program_gte_file_upload" id="gte-file" accept="jpeg,jpg,pdf,png" data-bind="gte_copy"><input type="hidden" name="program_gte_file_upload" value="" readonly><div class="valid-feedback"></div></div>';
    applyVisaHtml = '<label>Applying student visa outside of Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_apply" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_apply" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaOptionUsHtml = '<label>What Visa will you apply for?<sup>*</sup></label><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio0" value="F-1" required><label class="form-check-label" for="studentVisaOptionRadio0">F-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio1" value="F-2" required=""><label class="form-check-label" for="studentVisaOptionRadio1">F-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio2" value="B-1" required=""><label class="form-check-label" for="studentVisaOptionRadio2">B-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio3" value="B-2" required=""><label class="form-check-label" for="studentVisaOptionRadio3">B-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio4" value="J-1" required=""><label class="form-check-label" for="studentVisaOptionRadio4">J-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio5" value="J-2" required=""><label class="form-check-label" for="studentVisaOptionRadio5">J-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio6" value="ESTA" required=""><label class="form-check-label" for="studentVisaOptionRadio6">ESTA</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio7" value="Resident/Green Card" required=""><label class="form-check-label" for="studentVisaOptionRadio7">Resident/Green Card</label></div><div class="form-check" data-category="Student"><input class="form-check-input other-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio8" value="Other" required=""><label class="form-check-label" for="studentVisaOptionRadio8">Other</label></div><input type="text" class="dependent-target study-hide" data-target="student_visa_option" name="student_visa_option_other_specified" placeholder="Specify Other"><div class="valid-feedback"></div>';
    visaRadioUsHtml = '<label>Are you in possession of a valid US student visa and would like to transfer from another institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-no" required><label class="form-check-label" for="visa-transfer-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>';
    visaTransferInputUsHtml = '<div class="form-group visa-transfer-input study-hide"><label for="visa-transfer">Name of the institution you are attending?</label><input type="text" name="additional_visa_transfer_name" id="visa-transfer" disabled><div class="valid-feedback"></div></div>';
    visaTransferAttendanceInputUsHtml = '<div class="form-group visa-transfer-attendance-input study-hide"><label for="visa-transfer-attendance">What was your last date of attendance?</label><input type="date" name="another_institution_last_date_of_attendance" id="visa-transfer-attendance" disabled><div class="valid-feedback"></div></div>';
    visaFormRadioUsHtml = '<div class="i-form"><label>Do you need a Form I-20 to apply for a student visa?<sup>*</sup><sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-trigger="hover" data-content="ELS Language Centers is authorized to provide you with a Certificate of Eligibility (Form I-20), which must be presented when applying for a student (F-1). Intensive and Semi-Intensive with a minumum of 4 weeks program are eligible for this visa type."></i></sup><div class="footnote">ELS Intensive and Semi-Intensive study programs are considered full-time study programs and are eligible for an I-20. The I-20 is required to apply for your F-1 student visa. Please note that the American Explorer program is not eligible for an I-20.</div></label><div class="form-check"><input type="hidden" value="No" name="additional_visa_form_us" disabled><input class="form-check-input" value="No" type="radio" name="additional_visa_form_us" id="visa-form-question-no" required><label class="form-check-label" for="visa-form-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_form_us" id="visa-form-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div></div>';
    visaFormAddDependentButtonHtml = '<div class="form-group visa-form-input study-hide"><label for="add-visa-dependent">Please list and dependents who will travel with you to the US and require an F-2 visa. You must enter dependent\'s name the same way it appears on the passport, and use a space for any special characters.</label><div class="btn-container"><div id="add-visa-dependent" class="btn btn-orange-outline">Add Dependent</div></div><div class="dependents-container"></div></div>';
    collegeRadioUsHtml = '<label>Do you plan on attending college or university?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_question_us" id="college-question-no" required><label class="form-check-label" for="college-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_question_us" id="college-question-yes" required><label class="form-check-label" for="college-question-yes">Yes</label></div>';
    collegeAcceptRadioUsHtml = '<div class="form-group college-acceptance study-hide"><label>Have you already been accepted to a US institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_accept_question_us" id="college-accept-question-no" required disabled><label class="form-check-label" for="college-accept-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_accept_question_us" id="college-accept-question-yes" required disabled><label class="form-check-label" for="college-accept-question-yes">Yes</label></div></div>';
    collegeInputUsHtml = '<div class="form-group college-input study-hide"><label for="college-input">Please write the name of the US institution below</label><input type="text" name="additional_college_name" id="additional_college_name" disabled><div class="valid-feedback"></div></div>';
    additionalNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program of study</label><textarea name="study_additional_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>';
    additionalOnlineNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program study</label><textarea name="study_additional_online_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>';


    if (countrySelected == 'Australia') {

        inputHtml = selectedParentSchool == 'Greystone College' ? prolaHtml + usiHtml : prolaHtml;
        additionalHtml = inputHtml + visaRadioHtml + visaFileHtml + applyVisaHtml + additionalNotesHtml;
        printProgramHubspotFileForm();

    } else if (countrySelected == 'Canada') {

        inputHtml = selectedParentSchool == 'Greystone College' || isProla || $('input[name=is_alternate_apply][value=1]').is(':checked') ? prolaHtml : '';
        additionalHtml = inputHtml + additionalNotesHtml;

    } else if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            additionalHtml = visaFormRadioUsHtml + visaFormAddDependentButtonHtml + visaRadioUsHtml + visaTransferInputUsHtml + visaTransferAttendanceInputUsHtml + collegeRadioUsHtml + collegeAcceptRadioUsHtml + collegeInputUsHtml + additionalNotesHtml;
        }
    }else if(countrySelected == 'Online'){
        additionalHtml = inputHtml + additionalOnlineNotesHtml;
    }

    if($('.additional-notes-container .additional-notes-input').is(':empty')){
        if (additionalHtml != '') {
            $('.additional-notes-container .additional-notes-input').html(additionalHtml);
            $('.additional-notes-container').removeClass('study-hide').removeClass('disabled').addClass('study-show');
        }
    }

    if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            hideShowIForm(programSelected,durationSelectedVal);
        }
    }

}
const hideShowIForm = function(programName,duration){
    if(programName == 'American Explorer'){
        $('input[type=radio][name=additional_visa_form_us]').attr('disabled',true).prop('checked',false);
        $('input[type=radio][name=additional_visa_form_us][value=No]').prop('checked',true);
        $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',false);
        $('.additional-notes-input .visa-form-input').addClass('study-hide').removeClass('study-show');
        $('.additional-notes-input .visa-form-input .dependents-container').empty();
    }else{
        if(duration < 4){
            $('input[type=radio][name=additional_visa_form_us]').attr('disabled',true).prop('checked',false);
            $('input[type=radio][name=additional_visa_form_us][value=No]').prop('checked',true);
            $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',false);
            $('.additional-notes-input .visa-form-input').addClass('study-hide').removeClass('study-show');
            $('.additional-notes-input .visa-form-input .dependents-container').empty();
            
        }else{
            $('input[type=hidden][name=additional_visa_form_us]').attr('disabled',true);
            $('input[type=radio][name=additional_visa_form_us]').attr('disabled',false);
            
        }
    }
}

const uploadFile = function (dataStep) {
    emailVar = $('input[name=student_email]').val();

    if (dataStep == 'additional-select') {
        formName = 'additional-form';
        hsFormId = additionalUploadFormId;
        targetId = 'additional-hs-file-form';
        submitVar = true;
    } else if (dataStep == 'study-program-select') {
        formName = 'study-form';
        hsFormId = programUploadFormId;
        targetId = 'program-hs-file-form';
        submitVar = true;
    } else if (dataStep == 'submit-select') {
        formName = 'submit-complete';
        hsFormId = contractUploadFormId;
        targetId = 'contract-hs-file-form ';
        submitVar = true;
    }

    submitVar = $('#' + formName).attr('data-submit') == 'false' ? false : true;

    if (!submitVar) {
        if ($('#' + formName + ' input[type=file]').length > 0) {
            $('#' + formName + ' input[type=file]').each(function () {
                fileName = $(this).attr('name');
                dataBind = $(this).attr('data-bind');
                fileVar = $('input[name=' + fileName + ']')[0].files;
                $('#' + targetId + ' input[name=' + dataBind + ']')[0].files = fileVar;
            });
            $('#' + targetId + ' input[name=email]').val(emailVar);
            //$('form#hsForm_'+hsFormId).submit();
        }
    }

};
const updateStatusJson = function () {
    let statusValue = $("input[name=online_applicant_status]:checked").val(),
        formObject = localStorage.getItem(formJsonName),
        formJson = JSON.parse(formObject);
    formJson.application_status = statusValue;
    formJson.application_enabled = true;

    localStorage.setItem(formJsonName, JSON.stringify(formJson));
};

const submitForm = function (dataStep) {
    let emailVar = $('input[name=student_email]').val();

    switch (dataStep) {
        case 'student-info-select':
            guid = studentGuid;
            formName = 'form-student';
            formNameAgent = 'form-agent';
            formNameAdvisor = 'form-advisor';
            formStatus = 'form-status';
            arr = studentInfoArray;
            break;

        case 'study-program-select':
            guid = studyGuid;
            formName = 'study-form';
            arr = programInfoArray;
            arrDependent = dependentInputArray;
            uploadFile('study-program-select');
            break;

        case 'accommodation-select':
            guid = accommodationGuid;
            formName = 'accommodation-form';
            arr = accommodationInfoArray;
            arrAdditional = accommodationAdditionalArray;

            break;

        case 'additional-select':
            guid = additionalGuid;
            arr = additionalInfoArray;
            arrFamily = familyMemberInfoArray;
            formName = 'additional-form';
            uploadFile('additional-select');
            break;
        case 'submit-select':
            guid = completeGuid;
            formName = 'submit-complete';
            arr = completeInfoArray;
            uploadFile('submit-select');

            break;
    };

    if (typeof formName !== 'undefined') {

        formTempArray = $('form#' + formName).serializeArray();
        forSubmitStr = $('form#' + formName).attr('data-submit');
        formSubmit = forSubmitStr == 'false' ? false : true;

        let url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + guid,
            tempArray = [];
        formFieldsArray = [];
        url = encodeURI(url);

        if (typeof formNameAgent !== 'undefined') {
            formAgentTempArray = $('form#' + formNameAgent).serializeArray();

            for (let i = 0; i < formAgentTempArray.length; i++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formAgentTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formAgentTempArray[i].value
                            });
                        }
                    }
                }
            }
        }
        if (typeof formNameAdvisor !== 'undefined') {
            formAdvisorTempArray = $('form#' + formNameAdvisor).serializeArray();

            for (let y = 0; y < formAdvisorTempArray.length; y++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formAdvisorTempArray[y].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formAdvisorTempArray[y].value
                            });
                        }
                    }
                }
            }
        }
        if (typeof formStatus !== 'undefined') {
            formStatusTempArray = $('form#' + formStatus).serializeArray();

            for (let i = 0; i < formStatusTempArray.length; i++) {
                for (let x = 0; x < arr.length; x++) {
                    if (formStatusTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName) {
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': formStatusTempArray[i].value
                            });
                        }
                    }
                }
            }
        }

        let dependentArray = [],
            familyArray = [],
            additionalProgramTempArray = [];

        for (let i = 0; i < formTempArray.length; i++) {
            if (!formTempArray[i].name.includes('combo')) {
                for (let x = 0; x < arr.length; x++) {
                    if (formTempArray[i].name == arr[x].inputName) {
                        if (arr[x].objInputName && arr[x].objInputName != 'email') {
                            if (formTempArray[i].name.includes('program_is_coop_')) {
                                booleanVar = formTempArray[i].name.includes('program_is_coop_') ? formTempArray[i].value == 1 ? 'Co-Op' : formTempArray[i].value == 0 ? 'Academic' : formTempArray[i].value : formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                            } else {
                                booleanVar = formTempArray[i].name.includes('duration') ? parseInt(formTempArray[i].value.slice(0, 2)) : formTempArray[i].name.includes('insurance') ? formTempArray[i].value == 1 ? 'Yes' : 'No' : formTempArray[i].value;
                            }
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': booleanVar
                            });
                        }
                    }
                }
            }else{

                for (let x = 0; x < programAdditionalComboArray.length; x++) {
                    splitName = formTempArray[i].name.split('_combo-');
                    if (splitName[0] == programAdditionalComboArray[x].inputName) {
                        if (programAdditionalComboArray[x].objInputName) {
                            additionalProgramTempArray.push({
                                'name': programAdditionalComboArray[x].objInputName,
                                'value': formTempArray[i].value,
                                'iterate':splitName[1]
                            });
                        }
                    }
                }

            }
        };

        let programAdditionalArray = [];

        if(additionalProgramTempArray.length > 0){
            
            for (let i = 0; i < additionalProgramTempArray.length; i++) {

                booleanVar = additionalProgramTempArray[i].name.includes('program_type') ? additionalProgramTempArray[i].value == 1 ? 'Co-Op' : additionalProgramTempArray[i].value == 0 ? 'Academic' : additionalProgramTempArray[i].value : additionalProgramTempArray[i].value == 1 ? 'Yes' : additionalProgramTempArray[i].value == 0 ? 'No' : additionalProgramTempArray[i].value; 

                programAdditionalArray.push({
                    "iterate": additionalProgramTempArray[i].iterate,
                    "name": additionalProgramTempArray[i].name,
                    "value": booleanVar
                });

            }
           
        }

        if(programAdditionalArray.length > 0){
            groupedProgram = groupBy(programAdditionalArray, "iterate");
            groupProgramArray = new Object();
            groupProgramArray = groupedProgram;
            values = Object.values(groupProgramArray),
            prgmGroup = '';

            for (let i = 0; i < values.length; i++) {
                addPrgmStr = '';
    
                for (let x = 0; x < values[i].length; x++) {
                    programNameStr =  values[i][x].name;
                    addPrgmStr = addPrgmStr + '\r\n' + '"' + programNameStr + '": "' + values[i][x].value+'"';
                    addPrgmStr = values[i].length - 1 == x ? addPrgmStr : addPrgmStr+',';
                }
                prgmGroup = values.length - 1 == i ? prgmGroup + '{' + addPrgmStr + '\r\n}\r\n' :  prgmGroup + '{' + addPrgmStr + '\r\n},\r\n';

            }
            
            formFieldsArray.push({
                "objectTypeId": "0-1",
                "name": 'additional_programs',
                "value": '[\r\n'+prgmGroup+'\r\n]'
            })
        }else{
            if(dataStep == 'study-program-select'){
                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'additional_programs',
                    "value": 'n/a'
                })
            }
        }
       
        if (typeof arrFamily !== 'undefined') {
            for (let i = 0; i < formTempArray.length; i++) {
                if (formTempArray[i].name.includes('additional_family')) {
                    booleanVar = formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                    splitName = formTempArray[i].name.split('_iterate_');
                    iterateVal = splitName[1];
                    familyArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": booleanVar
                    });

                }
            };
            if (familyArray.length > 0) {
                groupedDependent = groupBy(familyArray, "iterate");
                groupArray = new Object();
                groupArray = groupedDependent;
                values = Object.values(groupArray);

                famGroup = '';

                for (let i = 0; i < values.length; i++) {
                    famStr = '';

                    for (let x = 0; x < values[i].length; x++) {
                        famStr = famStr + '\r\n' +'"'+values[i][x].name.replace('additional_family_', '').replace('_', ' ') + '": "' + values[i][x].value+'"';
                        famStr = values[i].length -1 == x ? famStr : famStr+',';
                    }
                    famGroup = values.length - 1 == i ? famGroup + '{' + famStr + '\r\n}\r\n' : famGroup + '{' + famStr + '\r\n},\r\n';

                }

                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'family_members_traveling_with',
                    "value": '[\r\n'+famGroup+'\r\n]'
                })

            }else{
                if(dataStep == 'additional-select'){
                    formFieldsArray.push({
                        "objectTypeId": "0-1",
                        "name": 'family_members_traveling_with',
                        "value": 'n/a'
                    })
                }
            }
        }

        if (typeof arrDependent !== 'undefined') {
            for (let i = 0; i < formTempArray.length; i++) {
                if (formTempArray[i].name.includes('additional_dependent')) {
                    booleanVar = formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                    splitName = formTempArray[i].name.split('_iterate_');
                    iterateVal = splitName[1];
                    dependentArray.push({
                        "iterate": iterateVal,
                        "name": splitName[0],
                        "value": booleanVar
                    });

                }
            };
            if (dependentArray.length > 0) {
                groupedDependent = groupBy(dependentArray, "iterate");
                groupArray = new Object();
                groupArray = groupedDependent;
                values = Object.values(groupArray);

                depGroup = '';

                for (let i = 0; i < values.length; i++) {
                    depStr = '';

                    for (let x = 0; x < values[i].length; x++) {
                        depStr = depStr + '\r\n' +'"'+values[i][x].name.replace('additional_dependent_', '').replace('_', ' ') + '": "' + values[i][x].value+'"';
                        depStr = values[i].length - 1 == x ? depStr : depStr+',';
                    }
                    depGroup = values.length - 1 == i ? depGroup + '{' + depStr + '\r\n}\r\n' : depGroup + '{' + depStr + '\r\n},\r\n';

                }

                formFieldsArray.push({
                    "objectTypeId": "0-1",
                    "name": 'form_i_20_dependents',
                    "value": '[\r\n'+depGroup+'\r\n]'
                })

            }else{
                if(dataStep == 'study-program-select'){
                    formFieldsArray.push({
                        "objectTypeId": "0-1",
                        "name": 'form_i_20_dependents',
                        "value": 'n/a'
                    })
                }
            }
        }

        if (typeof arrAdditional !== 'undefined') {
            formAddArray = $('form#' + formName).serializeArray();

            for (let i = 0; i < formAddArray.length; i++) {
                for (let x = 0; x < arrAdditional.length; x++) {
                    if (formAddArray[i].name == arrAdditional[x].inputName) {
                        if (arrAdditional[x].objInputName) {
                            tempArray.push({
                                'objName': arrAdditional[x].objInputName,
                                'value': formAddArray[i].value
                            });
                        }
                    }
                }
            }
        }

        formFieldsArray.push({
            "objectTypeId": "0-1",
            "name": 'email',
            "value": emailVar
        })
        for (let i = 0; i < tempArray.length; i++) {
            valueTemp = tempArray[i].value == '' ? 'n/a' : tempArray[i].value;
            formFieldsArray.push({
                "objectTypeId": "0-1",
                "name": tempArray[i].objName,
                "value": valueTemp
            })
        }
        

        let formArray = {
            "fields": formFieldsArray,
            "context": {
                "pageUri": "www.ilsc.com/online-application",
                "pageName": "Online Application - Student Info"
            },
            "legalConsentOptions": {
                "consent": { // Include this object when GDPR options are enabled
                    "consentToProcess": true,
                    "text": "I agree to allow ILSC to store and process my personal data.",
                }
            }
        };

        if (!formSubmit) {
          /* $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(formArray),
                contentType: "application/json",
                dataType: 'json',
                success: function() {
                    $('form#'+formName).attr('data-submit',true);
                }
            });*/
            $('form#' + formName).attr('data-submit', true);
        }

    }

};

//Button Click behavior
//Status Step

$('.applicant-status-boxes .box-color').click(function () {
    $('.applicant-status-boxes .box-color').removeClass('selected');
    $(this).addClass('selected');
    enableNextButton('form#form-status');
});

const enableCountryBtn = function () {
    $('.country-dropdown ul.drop-country li.dropdown-item').click(function () {
        $('.country-dropdown ul.drop-country li.dropdown-item').removeClass('selected');
        $(this).addClass('selected');
        enableNextButton('.study-information-form');
    });
}

const skipAccommodations = function(currentSlide){
    $('form#accommodation-form').attr('data-submit',false);
    $("#no-accomm-option").prop('checked', true);
    $(".fixed-side-menu-list .menu-accommodation.step-4 ").hide();
    $(".accommodation-info-box-container").hide();
    updateAccommodationJson();
    printAdditionalForm();
    submitForm('accommodation-select');
    $('.application-step-form-slide').slick('slickGoTo', currentSlide + 2);

}

const hideInsurance = function(){
    $('.insurance-container').addClass('study-hide').removeClass('study-show');
    $(".fixed-side-menu-list .menu-additional.step-5 #step-insurance").hide();
    $('.insurance-container #insurance-option-container .input-container input[name=insurance_option]').prop('disabled',true).prop('required',false);
    $('.insurance-container #insurance-option-container .input-container input.medical-date-picker').prop('disabled',true);

}
const showInsurance = function(){
    $('.insurance-container').addClass('study-show').removeClass('study-hide');
    $(".fixed-side-menu-list .menu-additional.step-5 #step-insurance").show();
    $('.insurance-container #insurance-option-container .input-container input[name=insurance_option]').prop('disabled',false).prop('required',true);
}

$(".section-application-form .step-container .btn.next").on("click", function () {
    let dataStepVar = $(this).attr('data-step'),
        dataForm = $(this).attr('data-form'),
        validCheck = $(this).attr('data-check');

    validVar = validateForm(dataStepVar, dataForm, validCheck) == true ? true : false;

    if (validVar) {
        if (dataStepVar == 'study-program-select') {
            let schoolNameSelected = $('input[name=program_school]:checked').val(),
                countrySelected = $('input[name=program_country]').val(),
                accommodationEnable =  parseInt($('select[name=program_name_primary-input] option:selected').attr('data-accommodation-enable')),
                currentSlide = $('.application-step-form-slide').slick('slickCurrentSlide');
                

            //qualify Accommodation eligibility
            if (accommodationEnable == 0) {
                skipAccommodations(currentSlide);
                if (schoolNameSelected == 'ELS Youth'){
                    printAirportTransfer('additional-form', 'Additional', true);
                    $('.additional-airport-transfer-details').removeClass('study-hide').addClass('study-show');
                }
            } else {
                if(countrySelected == 'Online'){                
                    hideInsurance();
                }else{
                    showInsurance();
                    $('.additional-airport-transfer-details').removeClass('study-show').addClass('study-hide');
                    $(".fixed-side-menu-list .menu-accommodation.step-4 ").show();
                    $(".accommodation-info-box-container").show();
                    $('.application-step-form-slide').slick('slickNext');
                }
            }

        } else {
            $('.application-step-form-slide').slick('slickNext');
        }
        window.scrollTo(0, 0);
        $(this).closest('.step-container').attr('data-complete', true).attr('data-init', true);
    }

});

$(document).on('click', 'ul.drop-country li', function () {
    resetSchoolProgram();
});
$(document).on('click', '.school-select-radio .box-color', function () {
    let selected = $(this).attr('data-value');
    $('.school-select-radio .box-color').removeClass('selected');
    $(this).addClass('selected');
    resetSchoolProgram();
    printCampus(selected);
});
$(document).on('click', 'input[name=student_dob], .campus-select-radio .box-color', function () {

    if ($(this).is(':input')) {
        selected = $('.campus-select-radio .box-color.selected').attr('data-value');
    } else {
        selected = $(this).attr('data-value');
        minAge = $(this).attr('data-min-age');
        $('input[name=campus-min-age]').val(minAge);
        $('.campus-select-radio .box-color').removeClass('selected');
        $(this).addClass('selected');
    }

    resetCampusProgram();
    resetAccommodationDetails();
    printProgram(selected, 'primary-input');
});
$(document).on('change', 'select[name=student_nationality]', function () {

    resetAdditionalFiles();

});
const coopAction = function (tEl, element) {
    let campusSelected = $('input[name=program_campus]:checked').val(),
        selected = $(tEl).val(),
        inputName = $(tEl).attr('name');
    resetProgramFormField(element, '.' + element + '.schedule-input,.' + element + '.date-input',false, inputName);
    printProgramDrop(campusSelected, selected, element,inputName);
};
const updatePrgStartDate = function () {
    let selected = $('option:selected', tEl).attr('data-id'),
        selectedMinAge = $('option:selected', tEl).attr('data-min-age'),
        selectedMaxAge = $('option:selected', tEl).attr('data-max-age'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        coopValue = $('.' + element + ' input[name=program_is_coop_' + element + ']:checked').val();
};
const programAction = function (tEl, element, pair) {
    let inputName = $(tEl).attr('name'),
        comboName = returnComboName(inputName),
        selected = $('option:selected', tEl).attr('data-id'),
        selectedMinAge = $('option:selected', tEl).attr('data-min-age'),
        selectedMaxAge = $('option:selected', tEl).attr('data-max-age'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        coopValue = $('.' + element + ' input[name=program_is_coop_' + element + comboName + ']:checked').val(),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedSchoolName = $('input[name=program_school]:checked').val(),
        programSelectedVal = $('select[name*=program_name_] option:selected').val(),
        durationSelected = $('select[name*=program_option_duration_] option:selected').val(),
        durationSelectedVal = parseInt(durationSelected.replace('week','').replace('s',''));

    //resetProgramFormField(element, '.' + element + '.program-option-input,.' + element + '.schedule-input,.' + element + '.date-input,.' + element + '.program-option-duration-input', '.' + element + '.week-input',inputName);

    if (selectedParentSchool == 'Greystone College' || pair) {

        let programObject = localStorage.getItem(programObjGC),
            programArray = JSON.parse(programObject),
            programSelected = programArray.filter((v) => v.parent_program_id == selected && v.is_coop == coopValue);

        printScheduleOption(programSelected, element, inputName);

    } else {

        if (selectedParentSchool == 'Language School') {
            printProgramOption(selected, element, selectedMinAge, selectedMaxAge,inputName);
        } else {
            printStartDates(selected, element, selectedMinAge, selectedMaxAge, inputName);
        }

    }
    if (countrySelected == 'USA') {
        if (selectedSchoolName != 'ELS Youth') {
            hideShowIForm(programSelectedVal,durationSelectedVal);
        }
    }

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const programOptionAction = function (tEl, element) {
    let selected = $('select.study-program-select option:selected').attr('data-id'),
        selectedMinAge = $('select.study-program-select  option:selected').attr('data-min-age'),
        selectedMaxAge = $('select.study-program-select  option:selected').attr('data-max-age'),
        inputName = $(tEl).attr('name');

    printStartDates(selected, element, selectedMinAge, selectedMaxAge,inputName);

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const resetLaSalleOption = function (element,inputName) {
    let comboVal = returnComboVal(inputName);

    $('#study-program-'+comboVal+' .partner-input.' + element).removeClass('study-show').addClass('study-hide');
    $('#study-program-'+comboVal+' .partner-input.' + element + ' input').attr('disabled', true);
};
const scheduleAction = function (tEl, element) {
    
    let selectedId = $(tEl).attr('id'),
        selectedWeeks = $(tEl).attr('data-weeks'),
        selectedLasalle = $(tEl).attr('data-lasalle-eligible'),
        inputName = $(tEl).attr('name'),
        comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        comboReturnName = comboName != '' ? '[name*="'+comboName+'"]' : '',
        campusSelected = $('input[name=program_campus]:checked').attr('id'),
        selected = $(tEl).val(),
        coopValue = $('#study-program-'+comboVal+' .' + element + ' input[name=program_is_coop_' + element + ']:checked').val(),
        programObject = localStorage.getItem(programObjGC),
        programArray = JSON.parse(programObject);
    programSelected = programArray.filter((v) => v.parent_program_id == selectedId && v.is_coop == coopValue && v.program_schedule == selected),
        selectedMinAge = $('.study-program-dropdown select.'+element+comboReturnName+' option:selected').attr('data-min-age'),
        selectedMaxAge = $('.study-program-dropdown select.'+element+comboReturnName+' option:selected').attr('data-max-age');

    resetProgramFormField(element,false,false,inputName);
    $('input[name=program_weeks_' + element+comboName).val(selectedWeeks).attr('disabled', false);
    printStartDates(selectedId, element, selectedMinAge, selectedMaxAge,inputName);

    if (selectedLasalle) {
        if (selectedLasalle.includes(campusSelected)) {

            printLaSalleOption(element,inputName);

        } else {
            resetLaSalleOption(element,inputName)
        }
    } else {
        resetLaSalleOption(element,inputName)
    }

    setTimeout(resetProgramComboDate(element,inputName),500);
};
const partnerOptionAction = function (tEl, element) {
    let checkOption = $(tEl).val();

    if (checkOption == 'Yes') {
        $('.' + element + ' .partner-info').removeClass('study-hide').addClass('study-show');
        $('.' + element + ' .partner-info input').attr('disabled', false);
    } else {
        $('.' + element + ' .partner-info').removeClass('study-show').addClass('study-hide');
        $('.' + element + ' .partner-info input').attr('disabled', true);
    }
};
const printProgramBox = function(iterateNum,element){
    let selectedCampus = $('input[name=program_campus]:checked').attr('id'),
        selectedParentSchool = $('input[name=program_school]').attr('data-school'),
        selectedCountry = $('input[name=program_country]').val(),
        optionHtml = '',
        showOption = 'study-hide';

    if(selectedParentSchool == 'Greystone College'){
        coopText = selectedCampus == '52464878081' ? 'Practicum' : 'Co-Op';
        academicHtml = selectedCampus != '52464878081' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="0" type="radio" name="program_is_coop_' + element + '_combo-'+iterateNum+'" id="no-coop" required><label class="form-check-label" for="no-coop">Academic</label></div>' : '';
        coopHtml = selectedCountry != 'Australia' ? '<div class="form-check"><input class="form-check-input ' + element + '" value="1" type="radio" name="program_is_coop_' + element + '_combo-'+iterateNum+'" id="yes-coop"><label class="form-check-label" for="yes-coop">' + coopText + '</label></div>' : '';

        optionHtml = '<label>Choose Program Type</label>' + academicHtml + coopHtml;
        showOption = 'study-show';
    }    

    let programBoxHtml = `<div class="study-program-selection study-box-container program-multi-box col-md-6" id="study-program-${iterateNum}" data-program-iterate="${iterateNum}"><h3>+Choose Program #<span class="iterate-number-text">${iterateNum}<span><sup>*</sup></h3><i class="far fa-minus-square ${element}"></i><div class="additional-input-container ${element} ${showOption}"><div class="row"><div class="col-md-12"><div class="additional-program-form">${optionHtml}</div></div></div></div><div class="input-container study-hide program-input ${element}"><div class="row"><div class="col-md-12"><div class="study-program-dropdown"><select class="form-control study-program-select ${element}" id="program-name" name="program_name_combo-${iterateNum}" data-program-iterate="${iterateNum}" required><option disabled="disabled" selected="selected" value="">Choose Program</option></select></div></div></div></div><div class="input-container study-hide program-option-input ${element}"><div class="row"><div class="col-md-12"><div class="program-schedule-input"></div></div></div></div><div class="input-container study-hide schedule-input ${element}"><div class="row"><div class="col-md-6"><div class="time-input"></div></div><div class="col-md-6"><div class="week-input"></div><input type="hidden" name="program_weeks_${element}_combo-${iterateNum}" value="" data-program-iterate="${iterateNum}" disabled="disabled"></div></div></div><div class="input-container study-hide partner-input ${element}"><div class="row"><div class="col-md-12"><div class="partner-option-input"></div></div></div></div><div class="input-container study-hide date-input ${element}"><div class="row"><div class="col-md-12"><div class="study-program-start-date-dropdown"><label>Choose Start Date<sup>*</sup></label><select class="form-control startdate-dropdown ${element}" id="program-startdate-${element}" name="program_startdate_${element}_combo-${iterateNum}" data-program-iterate="${iterateNum}" disabled="disabled" required><option disabled="disabled" selected="selected" value="">Choose Start Date</option></select><div style="padding:20px;"><sup>*</sup><span class="footnote">Available Start Dates will be dates after the previous selected program end date.</div></div></div></div></div><div class="input-container study-hide program-option-duration-input ${element}"><div class="row"><div class="col-md-12"><div class="duration-dropdown"><label>Choose Duration<sup>*</sup></label><select class="form-control week-duration-dropdown ${element}" id="program-option-duration-${element}" name="program_option_duration_${element}_combo-${iterateNum}" data-program-iterate="${iterateNum}" disabled="disabled" required><option disabled="disabled" selected="selected" value="">Choose Duration</option></select></div></div></div></div></div>`;

    
    $("#study-program-container").append(programBoxHtml);
    
   resizeProgramMultiBox();
};

const resizeProgramMultiBox = function(){
    $('.program-multi-box').each(function(index) {
        let isLastElement = index == $('.program-multi-box').length -1,
            initVal = index + 1;
        
        if (initVal % 2 == 0) {   
            $(this).removeClass('col-md-12').addClass('col-md-6');
        }else {
            if(isLastElement){
                $(this).addClass('col-md-12').removeClass('col-md-6');
            }else{
                $(this).removeClass('col-md-12').addClass('col-md-6');
            }
        }
     });
};
const printAddProgramLink = function(element){
    let textLink = "+Add Another Program";
    if($(element).find('.add-program-link').length == 0){
        $(element).append('<a class="add-program-link">'+textLink+'</a><span class="add-program-warning"></span>');
    }
};
const removeProgramLink = function(){
    $('a.add-program-link').remove();
}
$(document).on('click', '.program-multi-box .fa-minus-square', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input',
        inputName = $(this).parent().prevAll('div[data-program-iterate=1]').find('select[name*="program_name"]').attr('name');

    $(this).parent().remove();
    $('form#study-form').attr('data-submit',false);
    $( ".program-multi-box" ).each(function( index ) {
        iterateVal = index+1;
        iterateAdd = iterateVal+1;
        iterateId = 'study-program-'+iterateAdd.toString();
        $(this).attr('data-program-iterate',iterateVal+1);
        $(this).attr('id',iterateId);
        $('span.iterate-number-text',this).text(iterateAdd.toString());

        $( "input,select",this ).each(function( index2 ) {
            let inputName = $(this).attr('name'),
                inputNameNew = inputName.replace(/.$/,iterateAdd);

                $(this).attr('name',inputNameNew);
                $(this).attr('data-program-iterate',iterateAdd);

        });
      });
     
      setTimeout(resetProgramComboDate(element,inputName),500);
      resizeProgramMultiBox();
      if($('.program-multi-box').length < 5){
        $('span.add-program-warning').empty();
      }
});
$(document).on('click', 'a.add-program-link', function () {
    let iterateNum = $('.program-multi-box').length == 0 ? 2 : $('.program-multi-box').length + 2;
    if ($(this).parents().eq(3).hasClass('alternate-input')) {
        element = 'alternate-input';
        pairable = true;
    } else {
        element = 'primary-input';
        pairable = false;
    }
    if($('.program-multi-box').length < 5){
        printProgramBox(iterateNum,element);
    }else{
        $('span.add-program-warning').html('You have reached the maximum number of additional programs (5).')
    }
});

const resetProgramComboDate = function(element,inputName){
    let comboVal = returnComboVal(inputName),
        comboName = returnComboName(inputName),
        parentInt = inputName.includes('program_name') || inputName.includes('program_startdate') ? 4 : 5,
        parentStr = inputName.includes('program_name') || inputName.includes('program_startdate') ? 'select[name='+inputName+']' : 'input[name='+inputName+']:checked',
        parentElement = $(parentStr).parents().eq(parentInt),
        parentElementMulti = parentElement.nextAll('.program-multi-box'),
        selectedParentSchool = $('input[name=program_school]').attr('data-school'),
        selectedCurrentSchool = element == 'alternate-input'? $('input[name=program_school_alternate-input]').val() : selectedParentSchool;
      
    if(parentElementMulti.length > 0){
        //selectedProgram, element, minAge, maxAge, inputName
        
        parentElementMulti.each(function(index){
            if(!$(this).find('select[name*="program_startdate"]').attr('disabled')){
                
                if($(this).find('select[name*="program_startdate"] option').length > 0){
                    programStartDate = $('select[name=program_startdate_'+element+comboName+'] option:selected').val(),
                    programId = selectedCurrentSchool == 'Greystone College' ? $(this).find('input[name*="program_schedule_'+element+'"]:checked').attr('id') : selectedCurrentSchool == 'Language School' ? $(this).find('input[name*="program_option_'+element+'"]:checked').attr('id') : $(this).find('select[name*="program_name_'+element+'"] option:selected').val(),
                    minAge = $(this).find('select[name*="program_name_'+element+'"] option:selected').attr('data-min-age'),
                    maxAge = $(this).find('select[name*="program_name_'+element+'"] option:selected').attr('data-max-age'),
                    inputTarget = selectedCurrentSchool == 'Greystone College' ? $(this).find('input[name*="program_schedule_'+element+'"]').attr('name') : selectedCurrentSchool == 'Language School' ? $(this).find('input[name*="program_option_'+element+'"]').attr('name') : $(this).find('input[name*="program_name_'+element+'"]').attr('name');
                    
                    if(programStartDate && programId){
                        printStartDates(programId,element,minAge,maxAge,inputTarget);
                    }
                }
            }
        })
        
    }
};
const startDateAction = function (element,thisElement) {
    let isPairable = $('input[name=program_school]:checked').attr('data-pairable'),
        selectedParentSchool = $('input[name=program_school]:checked').attr('data-school'),
        inputName = $(thisElement).attr('name');
        
    if (selectedParentSchool == 'Language School' || selectedParentSchool == 'ELS') {
        printProgramDuration(element,inputName)
    }

    if (isPairable == 1) {
        if (element != 'alternate-input') {
            printAlternateOption(element);
        }
    }
    
    setTimeout(resetProgramComboDate(element,inputName),500);
    
    if(selectedParentSchool == 'Greystone College'){
        printAdditionalInfo();
    }else{
        if($('input[name=is_alternate_apply][value=1]').is(':checked')){
            printAdditionalInfo();
        }
    }

    $(function () {
        let startDate = new Date(parseInt($('select[name=program_startdate_primary-input] option:checked').attr('data-value'))),
            weekBefore = selectedParentSchool == 'ELS' ? startDate.setDate(startDate.getDate() - startDate.getDay()) : startDate.setDate(startDate.getDate() - 3);
        $(".accommodation-checkin-date-picker").attr('disabled', false);
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker('setDate', null);
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker("destroy");
        $(".accommodation-checkin-date-picker,.accommodation-checkout-date-picker").datepicker(
            {
                minDate: new Date(weekBefore),
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {
                    dateObj = new Date(dateText);
                    $(this).attr('data-value', dateObj.getTime());
                    if ($(this).hasClass('accommodation-checkin-date-picker')) {
                        if ($('.accommodation-name-option').is(':empty')) {
                            printAccommodationName();
                        }
                        calcAccomCheckOutDate();
                    }
                },
                beforeShowDay: function (date) {
                    if (selectedParentSchool == 'ELS') {
                        return [true];
                    } else {
                        if (date.getDay() == 6 || date.getDay() == 0) {
                            return [true];
                        } else {
                            return [false];
                        }
                    }

                }
            }
        );

    });
};

const durationAction = function (element,tEl) {
    let inputName = $(tEl).attr('name'),
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        selectedSchoolName = $('input[name=program_school]:checked').val();

    if (element == 'primary-input') {
        if ($('input[name=is_alternate_apply]:checked').val() == '1') {
            if (!$('.alternate-input .study-program-start-date-dropdown').is(':empty')) {
                let selectedId = $('input[name=program_schedule_alternate-input]:checked').attr('id'),
                    selectedMinAge = $('.study-program-dropdown select.' + element + ' option:selected').attr('data-min-age'),
                    selectedMaxAge = $('.study-program-dropdown select.' + element + ' option:selected').attr('data-max-age');
                printStartDates(selectedId, 'alternate-input', selectedMinAge, selectedMaxAge,inputName);
            }

        }
    }

    let schoolSelected = $('input[name=program_school]').val();

    if (schoolSelected == 'ELS') {
        startDate = parseInt($('select[name=program_startdate_primary-input] option:checked').attr('data-value'));
        primaryDurationInt = parseInt($('select[name=program_option_duration_primary-input] option:selected').val().slice(0, 2));
        primaryDuration = primaryDurationInt * 7;
        endDate = startDate + (1000 * 60 * 60 * 24 * primaryDuration);
        checkOutDateObj = new Date(endDate),
            checkOutDate = checkOutDateObj.setDate(checkOutDateObj.getDate() + 3);

        $(".accommodation-checkout-date-picker").datepicker("destroy");
        $(".accommodation-checkout-date-picker").datepicker(
            {
                minDate: new Date(endDate),
                maxDate: new Date(checkOutDate),
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {
                    dateObj = new Date(dateText);
                    $(this).attr('data-value', dateObj.getTime());
                },
                beforeShowDay: function (date) {
                    if (schoolSelected == 'ELS') {

                        return [true];

                    } else {

                        if (date.getDay() == 6 || date.getDay() == 0) {
                            return [true];
                        } else {
                            return [false];
                        }

                    }

                }
            }
        );
        
    }

    printAdditionalInfo();

};

$(document).on('change', 'select[name=student_address_country]', function () {

    selected = $('option:selected', this).val();

    if (selected == 'Australia') {
        $('input[name=australia_visa_type_number]').attr('disabled', false).parent().removeClass('study-hide').addClass('study-show');
    } else {
        $('input[name=australia_visa_type_number]').attr('disabled', true).parent().removeClass('study-show').addClass('study-hide');
    }

});


$(document).on('click', '.primary-input input[name*="program_is_coop"],.alternate-input input[name*="program_is_coop"]', function () { 
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    coopAction(this, element);
});

$(document).on('change', 'select.study-program-select', function () {
    if ($(this).hasClass('alternate-input')) {
        element = 'alternate-input';
        pairable = true;
    } else {
        element = 'primary-input';
        pairable = false;
    }
    programAction(this, element, pairable);
});

$(document).on('change', 'input[name=program_country]', function () {
    resetInsuranceOption();
    resetAdditionalInfo();
});

$(document).on('click', '.primary-input input[name*="program_option"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    programOptionAction(this, element);
});

$(document).on('click', '.primary-input input[name*="program_schedule"],.alternate-input input[name*="program_schedule"]', function () {   
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    scheduleAction(this, element);
});
$(document).on('click', '.primary-input input[name*="option_lasalle_parthership"],.alternate-input input[name*="option_lasalle_parthership"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    partnerOptionAction(this, element);
});

$(document).on('change', '.primary-input .study-program-start-date-dropdown select.primary-input,.alternate-input .study-program-start-date-dropdown select.alternate-input', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    startDateAction(element,this);
});
$(document).on('change', '.primary-input select[name*="program_option_duration"]', function () {
    let element = $(this).hasClass('alternate-input') ? 'alternate-input' : 'primary-input';
    durationAction(element,this);
});

$(document).on('click', '.alternate-input input[name=is_alternate_apply]', function () {
    let element = 'alternate-input',
        selectedValue = $(this).val(),
        campusSelected = $('input[name=program_campus]:checked').val();

    if (selectedValue == 1) {

        printProgram(campusSelected, element, true);

        $('.study-program-alternate input,.study-program-alternate select').attr('disabled', false)
    } else {
        $('.alternate-initial input[name=program_school_alternate-input]').remove();
        $('.study-program-alternate').removeClass('study-show').addClass('study-hide');
        $('.program-input.alternate-input,.schedule-input.alternate-input,.date-input.alternate-input').removeClass('study-show').addClass('study-hide');
        $('.study-program-alternate input,.study-program-alternate select').attr('disabled', true)
    }
});
$(document).on('click', 'input[name=additional_visa_refusal]', function () {

    if ($(this).val() == 'Yes') {
        $('.gte-file-input').removeClass('study-hide').addClass('study-show');
        $('.gte-file-input input').attr('required', true);
    } else {
        $('.gte-file-input').removeClass('study-show').addClass('study-hide');
        $('.gte-file-input input').attr('required', false);
    }
});
$(document).on('click', 'input[name=additional_visa_transfer_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.visa-transfer-input,.visa-transfer-attendance-input').removeClass('study-hide').addClass('study-show');
        $('.visa-transfer-input input,.visa-transfer-attendance-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.visa-transfer-input,.visa-transfer-attendance-input').removeClass('study-show').addClass('study-hide');
        $('.visa-transfer-input input,.visa-transfer-attendance-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', 'input[name=additional_visa_form_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.visa-form-input').removeClass('study-hide').addClass('study-show');
        $('.visa-form-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.visa-form-input').removeClass('study-show').addClass('study-hide');
        $('.visa-form-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', 'input[name=additional_college_question_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.college-acceptance').removeClass('study-hide').addClass('study-show');
        $('.college-acceptance input').attr('required', true).attr('disabled', false);
    } else {
        $('.college-acceptance').removeClass('study-show').addClass('study-hide');
        $('.college-acceptance input').attr('required', false).attr('disabled', true);
    }
});

$(document).on('click', 'input[name=additional_college_accept_question_us]', function () {

    if ($(this).val() == 'Yes') {
        $('.college-input').removeClass('study-hide').addClass('study-show');
        $('.college-input input').attr('required', true).attr('disabled', false);
    } else {
        $('.college-input').removeClass('study-show').addClass('study-hide');
        $('.college-input input').attr('required', false).attr('disabled', true);
    }
});
$(document).on('click', '#add-visa-dependent', function () {
    dValue = $('.dependents-container >div').length + 1;
    dClass = 'dependent-person-' + dValue;
    if (dValue < 4) {
        $('.dependents-container').append('<div class="' + dClass + ' d-class"><i class="far fa-minus-square"></i><h4>Dependent #<span class="int-d-val">' + dValue + '</span></h4>');
        printPersonForm(dependentInputArray, false, 'Dependent', dClass, dValue);
    }
});
$(document).on('click', '.dependents-container .d-class i.fa-minus-square', function () {
    $(this).parent().remove();
    $('form#study-form').attr('data-submit',false);
    $('.dependents-container >div').each(function (i) {
        dValueNew = i + 1;
        dClass = 'dependent-person-' + dValueNew;
        $(this).removeClass().addClass(dClass).addClass('d-class');
        $('span.int-d-val', this).html(dValueNew);
    })
});

$(document).on('mouseenter', 'i[data-toggle="popover"]', function () {
    $(this).popover({
        trigger: 'hover',
        html: true
    }).popover('show');
});
$(document).on('change', 'input[name=online_applicant_status]', function () {

    statusName = $(this).val();
    if (statusName == 'Student') {
        $('select[name=student_preferred_language]').parent().removeClass('study-hide').addClass('study-show');
        $('select[name=student_preferred_language]').prop('disabled', false);
    } else {
        $('select[name=student_preferred_language]').parent().removeClass('study-show').addClass('study-hide');
        $('select[name=student_preferred_language]').prop('disabled', true);
    }

});




const applicationFormSlider = function () {

    $('.app-step-container').prepend('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');

    $('.application-step-form-slide').slick({
        accessibility: false,
        arrows: false,
        dots: false,
        draggable: false,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        swipe: false,
        touchMove: false
    });
    setTimeout(function(){
        $('.app-step-container .lds-ring').remove();
        $('.application-step-form-slide').css('visibility','visible').css('opacity','1');
    },2000);
};


$(document).ready(function () {
    applicationFormSlider();

});