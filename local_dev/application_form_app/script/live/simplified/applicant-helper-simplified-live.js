const printAffiliatePersonForm = function (formArray, enabled, categoryName, className, dVal, affiliateCode) {

    let result = formArray.filter(formArray => formArray.category == categoryName && formArray.affiliateCode == affiliateCode),
        dInt = dVal ? '_iterate_' + dVal : '',
        countrySelected = $('.study-information-form.dropdown-container button.country-select').attr('data-selected'),
        schoolProgramSelected = $('.study-information-form input[name=program_school]:checked').val(),
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
            printInput = [];

        inputName = result[stForm].inputName;
        labelId = _.camelCase(inputName);
        value = result[stForm].value;
        helpTxt = result[stForm].helpText ? '<sup><i class="fas fa-info-circle" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="right" data-content="' + result[stForm].helpText + '"></i></sup>' : '';
        requiredValue = result[stForm].requiredDependence ? result[stForm].requiredDependence.includes(schoolVal) ? "required" : "" : result[stForm].required == true ? "required" : "";
        inputLabel = requiredValue == 'required' ? result[stForm].inputLabel + "<sup>*</sup>" : result[stForm].inputLabel;
        disabledVal = '';
        printInput.push(true);

        if (result[stForm].countryDependence) {
            if (!result[stForm].countryDependence.includes(countrySelected)) {
                printInput.push(false);
            }
        }

        if (result[stForm].simpleDisable) {
            printInput.push(false);
        }

        if (!result[stForm].displayShow) {
            printInput.push(false);
        }

        if (result[stForm].disabled) {
            disabledVal = result[stForm].disabled ? 'disabled' : '';
        }
        if (result[stForm].applicationRestriction) {
            ar = result[stForm].applicationRestriction.split(',');
        }
        if (result[stForm].schoolParentDependence) {
            if (!result[stForm].schoolParentDependence.includes(parentSchool)) {
                printInput.push(false);
            }
        }

        if (result[stForm].omitProgramType) {
            if (result[stForm].omitProgramType.includes(countrySelected)) {
                printInput.push(false);
            }
        }

        if (result[stForm].schoolDependence) {
            schoolDependenceList = result[stForm].schoolDependence.split(',')
            schoolDependenceArr = [];

            for (i = 0; i < schoolDependenceList.length; i++) {
                if (schoolProgramSelected.includes(schoolDependenceList[i])) {
                    schoolDependenceArr.push(true);
                }
            }

            if (!schoolDependenceArr.includes(true)) {
                printInput.push(false);
            }

        }

        applicationStatus = !result[stForm].applicationRestriction ? true : ar.indexOf(applicationName) != -1 ? false : true;


        if (applicationStatus) {
            if (!printInput.includes(false)) {
                if (!enabled) {
                    if (result[stForm].category == categoryName) {

                        switch (result[stForm].inputType) {
                            case 'text':

                                inputForm = "<input type='text' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' value='" + value + "' " + disabledVal + ">";
                                break;
                            case 'text-area':
                                classWidth = 'full-width';
                                inputForm = "<textarea class='form-control' rows='" + result[stForm].rows + "' cols='60' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "'  " + disabledVal + "></textarea>";
                                break;
                            case 'phone':
                                inputForm = "<input type='tel' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' placeholder='example: +1 123 123 12345' value='" + value + "'  " + disabledVal + ">";
                                break;

                            case 'dropdown':
                                printDropdown = false;
                                if (result[stForm].obj) {
                                    if (result[stForm].source) {
                                        if (result[stForm].source == 'local-storage') {
                                            optionArray = JSON.parse(localStorage.getItem(result[stForm].obj));

                                            if (optionArray) {
                                                printDropdown = true;
                                                for (let i = 0; i < optionArray.length; i++) {
                                                    optionHtml += "<option value='" + optionArray[i]["label"] + "' data-id='" + optionArray[i]["value"] + "'>" + optionArray[i]["label"] + "</option>";
                                                }
                                            }
                                        }
                                    } else {
                                        printDropdown = true;
                                        for (let optionList in result[stForm].obj) {
                                            optionValue = result[stForm].obj[optionList];
                                            optionHtml += "<option value='" + optionValue + "'>" + optionValue + "</option>";
                                        }
                                    }

                                }
                                if (printDropdown) {
                                    inputForm = "<select class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' " + disabledVal + "><option disabled selected value=''>Choose " + result[stForm].inputLabel + "</option>" + optionHtml + "</select>";
                                }
                                break;
                            case 'file':
                                inputForm = "<input type='file' class='form-control additional-file-input' id='" + labelId + "' name='" + inputName + "' " + requiredValue + " data-bind='" + result[stForm].objInputName + "' data-category='" + categoryName + "' accept='jpeg,jpg,pdf,png' " + multiProp + " " + disabledVal + "><input type='hidden' name='" + inputName + "' value='' readonly>";
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
                            case 'checkbox-option':
                                checkInputHtml = '';

                                if (result[stForm].obj) {
                                    for (let optionList in result[stForm].obj) {
                                        checkInputHtml += "<div class='checkbox-line'><input type='checkbox' value='" + result[stForm].obj[optionList].optionValue + "' class='form-control' id='" + labelId + dInt + "' name='" + inputName + dInt + "' " + requiredValue + " data-category='" + categoryName + "' " + disabledVal + "><label for=" + labelId + dInt + ">" + result[stForm].obj[optionList].optionLabel + helpTxt + "</label></div>"
                                    }
                                }
                                inputForm = '<div class="checkbox-container">' + checkInputHtml + '</div>';

                                break;
                            case 'radio-option':
                                if (result[stForm].obj) {
                                    for (let optionList in result[stForm].obj) {
                                        optionValue = result[stForm].obj[optionList].optionValue;
                                        optionLabel = result[stForm].obj[optionList].optionLabel;
                                        otherClass = result[stForm].obj[optionList].optionType == 'option-other' || result[stForm].obj[optionList].optionType == 'option-add' || result[stForm].obj[optionList].optionType == 'option-multi' ? 'other-input' : 'indenpendent-input';

                                        optionHtml += '<div class="form-check" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + optionList + dInt + '" value="' + optionValue + '" ' + requiredValue + ' data-category="' + categoryName + '" ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + optionList + '">' + optionLabel + '</label></div>';

                                        if (result[stForm].obj[optionList].optionType == 'option-other') {
                                            depClass = result[stForm].obj[optionList].dependentClass ? 'dependent-target study-hide' : '';
                                            depTarget = result[stForm].obj[optionList].dependentClass ? result[stForm].obj[optionList].dependentClass : '';
                                            optionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].placeholder + "' data-category='" + categoryName + "' " + disabledVal + ">";
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

                                                optionHtml += '<div class="form-check multi-target dependent-target study-hide" data-category="' + categoryName + '" ><input class="form-check-input ' + otherClass + '" type="radio" name="' + inputName + dInt + '" id="' + labelId + 'Radio' + i + dInt + '" value="' + optionValue + '" ' + requiredValue + ' data-category="' + categoryName + '" ' + disabledVal + '><label class="form-check-label" for="' + labelId + 'Radio' + i + '">' + optionLabel + '</label></div>';

                                                if (result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionType == 'option-other') {
                                                    depClass = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? 'dependent-target study-hide' : '';
                                                    depTarget = result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass ? result[stForm].obj[optionList].optionMultiObj[0].obj[i].dependentClass : '';
                                                    optionHtml += "<input type='text' class='" + depClass + "' data-target='" + depTarget + "' name='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].optionName + dInt + "' placeholder='" + result[stForm].obj[optionList].optionMultiObj[0].obj[i].placeholder + "' data-category='" + categoryName + "' " + disabledVal + ">";
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
                            $('.' + className).prepend("<div class='form-group " + classWidth + " " + hideForm + "'>" + inputFormHtml + "</div>");

                        }
                    }
                }
            }
        }
    }

};

const skipApplicantStatus = () => {
    let queryString = document.location.search,
        dict = parseQueryStringToDictionary(queryString),
        tableId = '117678378',
        queryParam = '&affiliate_name__eq=' + dict.affiliate,
        api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);



    $.get(api_url).done(function (data) {
        let dataObject = data.results,
            affArr = [];
        if (dataObject.length > 0) {
            for (let i = 0; i < 1; i++) {
                affArr.push({
                    'name': dataObject[i].values.affiliate_name,
                    'logo': dataObject[i].values.logo.url,
                    'promoCode': dataObject[i].values.promo_code
                });
            }

            logoUrl = affArr[0].logo;
            affName = affArr[0].name;
            promoCode = affArr[0].promoCode;

            const affiliateName = dict.affiliate ? dict.affiliate : ''
            $('input[name=online_applicant_status][value=Student]').prop("checked", true);
            $('form#form-status').attr('data-submit', true)
            $('input[name=status-form-complete]').val(true)

            const addLogo = (logoUrl, affName) => {
                let logoHtml = '<div class="row"><div class="col-md-12" style="display:flex;justify-content:start;align-items:center;margin-bottom:50px;"><img src="' + logoUrl + '" alt="' + affName + ' Logo" style="width:200px;"></div></div>'
                $('.container.step-container').prepend(logoHtml)
            }

            const printPromoCodeInput = (promoCode) => {
                let inputFormHtml = "<div class='form-group study-hide'><input type='hidden' class='form-control' id='promoCode' name='student_promo_code' required='' data-category='Student' value='" + promoCode + "'></div>";
                $('.student-information-form').prepend(inputFormHtml);

            }

            const skipSteps = (promoCode) => {
                $('ul.fixed-side-menu-list li.status-select').hide()
                setTimeout(() => {
                    updateStatusJson()
                    printStudentForm()
                    printAffiliatePersonForm(affiliateForm, false, 'Student-Affiliate', 'student-information-form', 0, affiliateName);
                    if (promoCode) {
                        printPromoCodeInput(promoCode)
                    }
                    $('.application-step-form-slide').slick('slickGoTo', 1);
                }, 1000)

            }

            if (affName === affiliateName) {
                skipSteps(promoCode)
                addLogo(logoUrl, affName)
            }

        }
    })


}

const simplifyPrograms = () => {
    $('input[name=program_country]').val('Canada');
    $('input[name=program_country_currency]').val('CAD');
    $('input[name=program_country_payment_enable]').val('1');
    $('input[name=program_school][id=81771084432]').prop('checked', true);
    $('.country-select-container').hide();
    $('.study-school-selection').hide();

    const printSchool = () => {
        let inputHtml = '<input type="radio" class="form-check-input" name="program_school" data-pairable="1" value="ILSC Adult Student 16+" data-school="Language School" id="81771084432" required="" checked>';
        $('.study-school-selection .input-container').append(inputHtml);
    }
    const printCampus = function () {
        let countrySelected = $('input[name=program_country]').val(),
            schoolId = '81771084432',
            tableId = campusTable,
            queryParam = '&enable__eq=1&country__in=' + countrySelected + ',Online'
        api_url = apiUrl + tableId + '/rows?portalId=' + portalId + queryParam;
        api_url = encodeURI(api_url);

        $.get(api_url).done(function (data) {
            let dataObject = data.results;
            dataObject.sort((a, b) => a.values.state_province > b.values.state_province ? 1 : -1);
            campusArray = [];

            if (dataObject.length > 0) {
                for (let i = 0; i < dataObject.length; i++) {
                    initials = dataObject[i].values.name.match(/\b(\w)/g);
                    boxName = dataObject[i].values.thumnail_images ? '' : initials.join('').toUpperCase();
                    thumbNail = dataObject[i].values.thumnail_images ? "style=background:url('" + dataObject[i].values.thumnail_images.url + "') no-repeat;" : '';
                    minAge = schoolVal == 'ELS' ? dataObject[i].values.min_age ? dataObject[i].values.min_age : '' : '';
                    campusArray.push({
                        'id': dataObject[i].id,
                        'initials': boxName,
                        'school': schoolId,
                        'value': dataObject[i].values.name,
                        'stateProv': dataObject[i].values.state_province,
                        'thumbnail': thumbNail,
                        'minAge': minAge
                    })

                }

                filteredArr = campusArray.filter(x => x.value !== 'Online').concat(campusArray.filter(x => x.value === 'Online'));

                let groupCampus = groupBy(filteredArr, 'stateProv'),
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

                        listHtml += '<li class="hs-form-radio campus-select-radio form-check"><label id="campus-select" for="' + groupArray[x][i].id + '" class="box-selection"><div class="box-color" data-min-age="' + groupArray[x][i].minAge + '" data-value="' + groupArray[x][i].id + '" ' + groupArray[x][i].thumbnail + '>' + groupArray[x][i].initials + '</div><input type="radio" name="program_campus" data-state-prov="' + groupArray[x][i].stateProv + '" data-school="' + groupArray[x][i].school + '" value="' + groupArray[x][i].value + '" id="' + groupArray[x][i].id + '" required><span>' + groupArray[x][i].value + '</span></label></li>';
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
    printSchool();

    if ($('.study-campus-selection ul.inputs-list').is(':empty')) {
        printCampus();
    }
}

const simplifyAdditionalInfo = () => {
    hideInsurance();

    $('.additional-info-container .form-group').each(function () {
        el = 'input:not([name*=emergency])';
        if ($(this).find(el).length !== 0) {
            $(el, this).prop('disabled', true)
            $(this).removeClass('study-show').addClass('study-hide')
        }
    })
}

const hideMenu = () => {
    $('ul.fixed-side-menu-list li.menu-accommodation').hide();
    $('ul.fixed-side-menu-list li.menu-additional ul li#step-insurance').hide();
}

$(".section-application-form .step-container .btn-container .btn.prev").on("click", function () {
    let dataStep = $(this).attr('data-step');
    window.scrollTo(0, 0);
    $('.step-breadcrumb-container').show();

    if (dataStep == 'additional-select') {
        $('.application-step-form-slide').slick('slickGoTo', currentSlide - 2);
    } else {
        $('.application-step-form-slide').slick('slickPrev');
    }

});

$(document).on("click", ".section-application-form .step-container .btn.next.enable", function () {
    let dataStepVar = $(this).attr('data-step'),
        dataForm = $(this).attr('data-form'),
        validCheck = $(this).attr('data-check'),
        validVar = validateForm(dataStepVar, dataForm, validCheck) == true ? true : false,
        currentSlide = $('.application-step-form-slide').slick('slickCurrentSlide');

    const goNext = (enable) => {
        if (enable) {
            $('.application-step-form-slide').slick('slickNext');
        }

    }
    if (validVar) {
        if (dataStepVar === 'student-info-select') {
            simplifyPrograms();
            goNext(validVar);
        } else if (dataStepVar === 'study-program-select') {
            skipAccommodations(currentSlide);
            autoHomestaySelect(false);
            simplifyAdditionalInfo();
        } else {
            goNext(validVar)
        }
        window.scrollTo(0, 0);
    }
})

$(document).on('click', '.campus-select-radio .box-color', function () {
    let campusId = $(this).attr('data-value');
    if (campusId === '52464878183') {
        $('input[name=program_school]').val('ILSC HELLO Online').attr("id", "121887582270,136464643924");
        $('input[name=program_country]').val('Online')
    } else {
        $('input[name=program_school]').val('ILSC Adult Student 16+').attr("id", "81771084432");
        $('input[name=program_country]').val('Canada')
    }
})

$(document).on('change', '.primary-input select[name*="program_option_duration"]', function () {
    let option = $('option:selected', this).val(),
        optionVal = parseInt(option.substring(0, 2)),
    newNoteHtml = 'Since you will be studying longer than 24 weeks, we require a copy of your current status in Canada (for example TRV or eTA and any study or work permits.)';
        $('label[for=inside-question-yes] span.footnote').html(newNoteHtml);
        $('input[name=program_inside_flight_file_upload],textarea[name=study_additional_information_and_notes]').parent().remove();
    $('input[id=inside-question-yes]').trigger('click');

    if (optionVal <= 24) {
        $('input[name=additional_inside_canada]').prop('disabled', true);
        $('input[name=program_inside_permit_file_upload]').prop('disabled', true);
        $('.additional-notes-container').removeClass('study-show').addClass('study-hide');
    } else {
        $('input[name=additional_inside_canada]').prop('disabled', false);
        $('input[name=program_inside_permit_file_upload]').prop('disabled', false);
        $('.additional-notes-container').removeClass('study-hide').addClass('study-show');
    }
})

$(document).on('change', 'select[name=program_name_primary-input]', function () {
    let valSelected = $('option:selected', this).val(),
        isCampusSelectedOnline = $('input[name=program_campus]:checked').val() == 'Online' ? true : false,
        isFrenchProgram = valSelected.includes('French') || valSelected.includes('TEF') ? true : false;
    ;

    if (isCampusSelectedOnline && isFrenchProgram) {
        $('input[name=program_school]:checked').val('ILSC Allo Online').attr('id', '136464643924');
    } else if (isCampusSelectedOnline && !isFrenchProgram) {
        $('input[name=program_school]:checked').val('ILSC Hello Online').attr('id', '121887582270');
    } else {
        $('input[name=program_school]:checked').val('ILSC Adult Student 16+').attr('id', '81771084432');
    }

    if (isCampusSelectedOnline) {
        $('input[name=program_country]').val('Online');
        $('.additional-notes-input').append('<div class="form-group study-hide" id="p_curr_payment"><input type="hidden" data-show-disable="true" name="study_additional_preferred_currency_payment" value="CAD"></div>');
    } else {
        $('input[name=program_country]').val('Canada');
        $('#p_curr_payyment input[name=study_additional_preferred_currency_payment]').val('N/A');
    }

})


$(document).ready(function () {
    hideMenu();
    skipApplicantStatus()
});