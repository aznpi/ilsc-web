const updateLocalJson = function (dataStep) {
    switch (dataStep) {
      case 'status-select':
        updateStatusJson(), printStudenForm()
        break
      case 'student-info-select':
        updateStudentInfoJson(), getSchoolCountryList()
        break
      case 'study-program-select':
        updateProgramJson()
        break
      case 'accommodation-select':
        updateAccommodationJson(), printAdditionalForm()
        break
      case 'additional-select':
        updateAdditionalJson(), printApplicationSummary()
        break
      case 'submit-select':
        $('.denote-container').hide(),
          $('.fixed-side-menu').hide(),
          deleteCookie('form-obj')
    }
  },
  printApplicationSummary = function () {
    let schoolSelected = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      countrySelected = $('input[name=program_country]').val(),
      studentFormArray = $('#form-student').serializeArray(),
      studyFormArray = $('#study-form').serializeArray(),
      accommodationFormArray = $('#accommodation-form').serializeArray(),
      additionalFormArray = $('#additional-form').serializeArray(),
      studentLabelArray = [],
      programPrimaryLabelArray = [],
      programAlternateLabelArray = [],
      accommodationLabelArray = [],
      homestayLabelArray = [],
      additionalLabelArray = [],
      fileUploadLabelArray = [],
      dependentArray = [],
      familyArray = [],
      stLabelHtml = '',
      pgPrimaryLabelHtml = '',
      addLabelHtml = '',
      fileLabelHtml = ''
    for (let stf = 0; stf < studentFormArray.length; stf++)
      for (let sti = 0; sti < studentInfoArray.length; sti++)
        studentFormArray[stf].name == studentInfoArray[sti].inputName &&
          studentLabelArray.push({
            name: studentFormArray[stf].name,
            label: studentInfoArray[sti].inputLabel,
            value: studentFormArray[stf].value
          })
    for (let st = 0; st < studentLabelArray.length; st++)
      stLabelHtml +=
        '<tr><td><span class="bold">' +
        studentLabelArray[st].label +
        '</span></td><td><span class="value-input">' +
        studentLabelArray[st].value +
        '</span></td></tr>'
    $('.peronal-info-summary-container').html(
      '<table class="application-summary-tbl">' + stLabelHtml + '</table>'
    )
    for (let stf = 0; stf < studyFormArray.length; stf++)
      if (studyFormArray[stf].name.includes('dependent'))
        for (let di = 0; di < dependentInputArray.length; di++)
          (splitName = studyFormArray[stf].name.split('_iterate_')),
            (iterateVal = splitName[1]),
            splitName[0] == dependentInputArray[di].inputName &&
              dependentArray.push({
                iterate: iterateVal,
                name: splitName[0],
                value: studyFormArray[stf].value,
                label: dependentInputArray[di].inputLabel
              })
      else
        for (let pi = 0; pi < programInfoArray.length; pi++)
          (arr =
            'primary' == programInfoArray[pi].inputAssign
              ? programPrimaryLabelArray
              : programAlternateLabelArray),
            studyFormArray[stf].name == programInfoArray[pi].inputName &&
              ((valueStr = studyFormArray[stf].name.includes('program_is_coop_')
                ? 1 == studyFormArray[stf].value
                  ? 'Co-Op'
                  : 0 == studyFormArray[stf].value
                  ? 'Academic'
                  : studyFormArray[stf].value
                : 1 == studyFormArray[stf].value
                ? 'Yes'
                : 0 == studyFormArray[stf].value
                ? 'No'
                : studyFormArray[stf].value),
              arr.push({
                name: studyFormArray[stf].name,
                label: programInfoArray[pi].inputLabel,
                value: valueStr
              }))
    for (let pr = 0; pr < 0; pr++)
      pgPrimaryLabelHtml +=
        '<tr><td><span class="bold">' +
        programPrimaryLabelArray[pr].label +
        '</span></td><td><span class="value-input">' +
        programPrimaryLabelArray[pr].value +
        '</span></td></tr>'
    $('.study-info-primary-summary-container').html(
      '<table class="application-summary-tbl">' +
        pgPrimaryLabelHtml +
        '</table>'
    )
    for (let acc = 0; acc < accommodationFormArray.length; acc++) {
      ;(obj = accommodationFormArray[acc].name.includes('homestay')
        ? accommodationAdditionalArray
        : accommodationInfoArray),
        (labelArray = accommodationFormArray[acc].name.includes('homestay')
          ? homestayLabelArray
          : accommodationLabelArray)
      for (let o = 0; o < obj.length; o++)
        obj[o].countryDependence.includes(countrySelected) &&
          accommodationFormArray[acc].name == obj[o].inputName &&
          labelArray.push({
            name: accommodationFormArray[acc].name,
            label: obj[o].inputLabel,
            value: accommodationFormArray[acc].value
          })
    }
    $('.accommodation-info-summary-container').addClass('study-hide')
    for (let ad = 0; ad < additionalFormArray.length; ad++)
      if (additionalFormArray[ad].name.includes('additional_family'))
        for (let fm = 0; fm < familyMemberInfoArray.length; fm++)
          (splitName = additionalFormArray[ad].name.split('_iterate_')),
            (iterateVal = splitName[1]),
            splitName[0] == familyMemberInfoArray[fm].inputName &&
              familyArray.push({
                iterate: iterateVal,
                name: splitName[0],
                value: additionalFormArray[ad].value,
                label: familyMemberInfoArray[fm].inputLabel
              })
      else {
        ;(obj = additionalFormArray[ad].name.includes('file')
          ? fileUploadArray
          : additionalInfoArray),
          (objUnique = obj.reduce(
            (acc, z) => (
              acc.find(
                ({ inputName: inputName }) => z.inputName === inputName
              ) || acc.push(z),
              acc
            ),
            []
          )),
          (arr = additionalFormArray[ad].name.includes('file')
            ? fileUploadLabelArray
            : additionalLabelArray)
        for (let ob = 0; ob < objUnique.length; ob++)
          additionalFormArray[ad].name == objUnique[ob].inputName &&
            ((valueStr =
              1 == additionalFormArray[ad].value
                ? 'Yes'
                : 0 == additionalFormArray[ad].value
                ? 'No'
                : additionalFormArray[ad].value),
            arr.push({
              name: additionalFormArray[ad].name,
              label: objUnique[ob].inputLabel,
              value: valueStr
            }))
      }
    for (let add = 0; add < 0; add++)
      (valueStr =
        1 == additionalLabelArray[add].value
          ? 'Yes'
          : 0 == additionalLabelArray[add].value
          ? 'No'
          : additionalLabelArray[add].value),
        (addLabelHtml =
          addLabelHtml +
          '<tr><td><span class="bold">' +
          additionalLabelArray[add].label +
          '</span></td><td><span class="value-input">' +
          valueStr +
          '</span></td></tr>')
    if (
      ((addLabelHtml =
        '<table class="application-summary-tbl">' + addLabelHtml + '</table>'),
      $('.additional-info-summary-container').html(
        addLabelHtml + fileLabelHtml
      ),
      dependentArray.length > 0)
    ) {
      ;(groupedDependent = groupBy(dependentArray, 'iterate')),
        (groupArray = new Object()),
        (groupArray = groupedDependent),
        (values = Object.values(groupArray)),
        $('.study-info-dependent-summary-container').empty()
      for (let da = 0; da < values.length; da++) {
        pgDependentLabelHtml = ''
        for (let pgd = 0; pgd < values[da].length; pgd++)
          pgDependentLabelHtml +=
            '<tr><td><span class="bold">' +
            values[da][pgd].label +
            '</span></td><td><span class="value-input">' +
            values[da][pgd].value +
            '</span></td></tr>'
        ;(headerLabel = 0 == da ? '<h5>Dependent Family Members</h5>' : ''),
          $('.study-info-dependent-summary-container').append(
            headerLabel + '<table>' + pgDependentLabelHtml + '</table>'
          )
      }
    }
    if (familyArray.length > 0) {
      ;(groupedDependent = groupBy(familyArray, 'iterate')),
        (groupArray = new Object()),
        (groupArray = groupedDependent),
        (values = Object.values(groupArray)),
        $('.additional-info-family-summary-container').empty()
      for (let fm = 0; fm < values.length; fm++) {
        addFamilyLabelHtml = ''
        for (let afm = 0; afm < values[fm].length; afm++)
          addFamilyLabelHtml +=
            '<tr><td><span class="bold">' +
            values[fm][afm].label +
            '</span></td><td><span class="value-input">' +
            values[fm][afm].value +
            '</span></td></tr>'
        ;(headerLabel = 0 == fm ? '<h5>Family Members</h5>' : ''),
          $('.additional-info-family-summary-container').append(
            headerLabel + '<table>' + addFamilyLabelHtml + '</table>'
          )
      }
    }
    ;(policyLink =
      'ELS' == schoolSelected
        ? 'https://www.els.edu/terms-of-use'
        : 'Greystone College' == schoolSelected
        ? 'Canada' == countrySelected
          ? 'https://www.ilsc.com/greystone-college/canada/policies'
          : 'https://www.ilsc.com/greystone-college/australia/policies'
        : 'https://www.ilsc.com/language-schools/policies-procedures'),
      (accommLink =
        'ELS' == schoolSelected
          ? 'https://assets.contentstack.io/v3/assets/blte6ca0397941e65d8/blt4eddec62c8d065d4/6298de59c040564c4585393f/ELS_Cancellation_Policy.pdf'
          : 'https://www.accommodations.ilsc.com/accommodation-booking-policy'),
      (contractLink =
        'Australia' == countrySelected
          ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-australia-terms-conditions.pdf'
          : 'Canada' == countrySelected
          ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf'
          : 'India' == countrySelected
          ? 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-india-terms-conditions.pdf'
          : 'https://www.ilsc.com/hubfs/pdf/applications-pricelists/student-contract-canada-terms-conditions.pdf'),
      (privacyLink =
        'ELS' == schoolSelected ? 'https://www.els.edu/privacy-policy' : ''),
      (tuitionLink =
        'ELS' == schoolSelected
          ? 'https://www.els.edu/admissions/tuition-fees'
          : ''),
      (policyHtml =
        'ELS' == schoolSelected
          ? 'By submitting this form by clicking the confirmation button below, you acknowledge that you have read and agreed to the <a href="' +
            policyLink +
            '" target="_blank">Terms of Use</a>, <a href="' +
            privacyLink +
            '" target="_blank">Privacy Policy</a>, and <a href="' +
            tuitionLink +
            '" target="_blank">Prices & Dates addendum</a>.'
          : 'To finalize your application, you must acknowledge that you have read and agreed to the policies and procedures that apply to your chosen study country, and, if applicable, the Accommodation Policy. You can download the policies and procedures from the following link, sign it, and attach your signed copy here now using the file attachment link, or you may send it by email later. <a href="' +
            contractLink +
            '" target="_blank" download>Download</a>'),
      $('.submit-policy-container').html(policyHtml),
      $('.step-breadcrumb-container').hide(),
      'ELS' != schoolSelected && printContractFileInput()
  },
  printContractFileInput = function () {
    $('.submit-policy-file-container').is(':empty') &&
      printFilesForm(
        fileUploadArray,
        !1,
        'Summary',
        'submit-policy-file-container'
      ),
      printHubSpotContractFile()
  },
  printHubSpotContractFile = function () {
    hbspt.forms.create({
      region: 'na1',
      portalId: '5020112',
      formId: contractUploadFormId,
      target: '#contract-hs-file-form'
    })
  },
  printPersonForm = function (
    formArray,
    enabled,
    categoryName,
    className,
    dVal
  ) {
    let result = formArray.filter(
        formArray => formArray.category == categoryName
      ),
      dateVar = $('.date-picker').length,
      dInt = dVal ? '_iterate_' + dVal : '',
      startDate = new Date(
        $('select[name=program_startdate_primary-input] option:checked').val()
      ),
      dateBirthTime = new Date($('input[name=student_dob]').val()).getTime(),
      age = calculate_age(dateBirthTime, startDate.getTime()),
      countrySelected = $(
        '.study-information-form.dropdown-container button.country-select'
      ).attr('data-selected'),
      parentSchool = schoolVal,
      applicationName = $('input[name=online_applicant_status]:checked').val()
    for (let stForm in result) {
      let inputName,
        inputLabel,
        labelId,
        labelForm,
        inputForm,
        inputFormHtml,
        optionHtml = '',
        classWidth = '',
        printInput = !0
      ;(inputName = result[stForm].inputName),
        (inputLabel =
          1 == result[stForm].required
            ? result[stForm].inputLabel + '<sup>*</sup>'
            : result[stForm].inputLabel),
        (labelId = _.camelCase(inputName)),
        (value = result[stForm].value),
        (helpTxt = result[stForm].helpText
          ? '<sup><i class="fas fa-info-circle" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="right" data-content="' +
            result[stForm].helpText +
            '"></i></sup>'
          : '')
      let requiredValue = 1 == result[stForm].required ? 'required' : '',
        disabledVal = ''
      if (
        (result[stForm].countryDependence &&
          (result[stForm].countryDependence.includes(countrySelected) ||
            (printInput = !1)),
        result[stForm].ageMax &&
          result[stForm].ageMax < age &&
          (printInput = !1),
        result[stForm].displayShow || (printInput = !1),
        result[stForm].disabled &&
          (disabledVal = result[stForm].disabled ? 'disabled' : ''),
        result[stForm].applicationRestriction &&
          (ar = result[stForm].applicationRestriction.split(',')),
        result[stForm].schoolParentDependence &&
          (result[stForm].schoolParentDependence.includes(parentSchool) ||
            (printInput = !1)),
        (applicationStatus =
          !result[stForm].applicationRestriction ||
          -1 == ar.indexOf(applicationName)),
        applicationStatus &&
          printInput &&
          !enabled &&
          result[stForm].category == categoryName)
      ) {
        switch (result[stForm].inputType) {
          case 'text':
            inputForm =
              "<input type='text' class='form-control' id='" +
              labelId +
              dInt +
              "' name='" +
              inputName +
              dInt +
              "' " +
              requiredValue +
              " data-category='" +
              categoryName +
              "' " +
              disabledVal +
              " value='" +
              value +
              "'>"
            break
          case 'text-area':
            ;(classWidth = 'full-width'),
              (inputForm =
                "<textarea class='form-control' rows='" +
                result[stForm].rows +
                "' cols='60' id='" +
                labelId +
                dInt +
                "' name='" +
                inputName +
                dInt +
                "' " +
                requiredValue +
                " data-category='" +
                categoryName +
                "'  " +
                disabledVal +
                '></textarea>')
            break
          case 'phone':
            inputForm =
              "<input type='tel' class='form-control' id='" +
              labelId +
              dInt +
              "' name='" +
              inputName +
              dInt +
              "' " +
              requiredValue +
              " data-category='" +
              categoryName +
              "' placeholder='example: +1 123 123 12345' value='" +
              value +
              "'  " +
              disabledVal +
              '>'
            break
          case 'email':
            inputForm =
              "<input type='email' class='form-control' id='" +
              labelId +
              dInt +
              "' name='" +
              inputName +
              dInt +
              "' " +
              requiredValue +
              " data-category='" +
              categoryName +
              "' value='" +
              value +
              "'  " +
              disabledVal +
              '>'
            break
          case 'dropdown':
            if (result[stForm].obj)
              for (let optionList in result[stForm].obj)
                (optionValue = result[stForm].obj[optionList]),
                  (optionHtml +=
                    "<option value='" +
                    optionValue +
                    "'>" +
                    optionValue +
                    '</option>')
            inputForm =
              "<select class='form-control' id='" +
              labelId +
              dInt +
              "' name='" +
              inputName +
              dInt +
              "' " +
              requiredValue +
              " data-category='" +
              categoryName +
              "' " +
              disabledVal +
              "><option disabled selected value=''>Choose " +
              result[stForm].inputLabel +
              '</option>' +
              optionHtml +
              '</select>'
            break
          case 'date-time':
            inputForm =
              "<input type='text' value='" +
              value +
              "' class='form-control date-picker' id='" +
              categoryName +
              '-datePicker-' +
              dateVar +
              dInt +
              "' name='" +
              inputName +
              dInt +
              "' " +
              requiredValue +
              " placeholder='YYYY-MM-DD' data-category='" +
              categoryName +
              "'  " +
              disabledVal +
              " onkeydown='event.preventDefault()'>"
            break
          case 'checkbox':
            ;(preHtml = ''),
              (postHtml = ''),
              (preContainerHtml = ''),
              (postContainerHtml = ''),
              result[stForm].preHtml &&
                ((preHtml = result[stForm].preHtml),
                (preContainerHtml =
                  '<div class="checkbox-container study-box-container">')),
              result[stForm].postHtml &&
                ((postHtml = result[stForm].postHtml),
                (postContainerHtml = '</div>')),
              (inputForm =
                preContainerHtml +
                preHtml +
                "<div class='checkbox-line'><input type='checkbox' value='" +
                value +
                "' class='form-control' id='" +
                labelId +
                dInt +
                "' name='" +
                inputName +
                dInt +
                "' " +
                requiredValue +
                " data-category='" +
                categoryName +
                "' " +
                disabledVal +
                '><label for=' +
                labelId +
                dInt +
                '>' +
                inputLabel +
                helpTxt +
                '</label></div>' +
                postHtml +
                postContainerHtml)
            break
          case 'radio-option':
            if (result[stForm].obj)
              for (let optionList in result[stForm].obj)
                if (
                  ((optionValue = result[stForm].obj[optionList].optionValue),
                  (optionLabel = result[stForm].obj[optionList].optionLabel),
                  (otherClass =
                    'option-other' ==
                      result[stForm].obj[optionList].optionType ||
                    'option-add' == result[stForm].obj[optionList].optionType ||
                    'option-multi' == result[stForm].obj[optionList].optionType
                      ? 'other-input'
                      : 'indenpendent-input'),
                  (optionHtml +=
                    '<div class="form-check" data-category="' +
                    categoryName +
                    '" ><input class="form-check-input ' +
                    otherClass +
                    '" type="radio" name="' +
                    inputName +
                    dInt +
                    '" id="' +
                    labelId +
                    'Radio' +
                    optionList +
                    dInt +
                    '" value="' +
                    optionValue +
                    '" ' +
                    requiredValue +
                    ' ' +
                    disabledVal +
                    '><label class="form-check-label" for="' +
                    labelId +
                    'Radio' +
                    optionList +
                    '">' +
                    optionLabel +
                    '</label></div>'),
                  'option-other' == result[stForm].obj[optionList].optionType &&
                    ((depClass = result[stForm].obj[optionList].dependentClass
                      ? 'dependent-target study-hide'
                      : ''),
                    (depTarget = result[stForm].obj[optionList].dependentClass
                      ? result[stForm].obj[optionList].dependentClass
                      : ''),
                    (optionHtml +=
                      "<input type='text' class='" +
                      depClass +
                      "' data-target='" +
                      depTarget +
                      "' name='" +
                      result[stForm].obj[optionList].optionName +
                      dInt +
                      "' placeholder='" +
                      result[stForm].obj[optionList].placeholder +
                      "' " +
                      disabledVal +
                      '>')),
                  'option-add' == result[stForm].obj[optionList].optionType &&
                    (optionHtml +=
                      '<div class="btn-container dependent-target study-hide"><div id="' +
                      result[stForm].obj[optionList].addClass +
                      '" class="btn btn-orange-outline">' +
                      result[stForm].obj[optionList].buttonLabel +
                      '</div></div><div class="' +
                      result[stForm].obj[optionList].addClass +
                      '-container"></div>'),
                  'option-multi' == result[stForm].obj[optionList].optionType)
                ) {
                  ;(inputName =
                    result[stForm].obj[optionList].optionMultiObj[0].inputName),
                    (labelId = _.camelCase(inputName)),
                    (requiredValue =
                      1 ==
                      result[stForm].obj[optionList].optionMultiObj[0].required
                        ? 'required'
                        : ''),
                    (dependentLabel =
                      result[stForm].obj[optionList].optionMultiObj[0]
                        .inputLabel),
                    (optionHtml +=
                      '<legend class="dependent-target study-hide">' +
                      dependentLabel +
                      '</legend>')
                  for (
                    let i = 0;
                    i <
                    result[stForm].obj[optionList].optionMultiObj[0].obj.length;
                    i++
                  )
                    (optionValue =
                      result[stForm].obj[optionList].optionMultiObj[0].obj[i]
                        .optionValue),
                      (optionLabel =
                        result[stForm].obj[optionList].optionMultiObj[0].obj[i]
                          .optionLabel),
                      (otherClass =
                        'option-other' ==
                        result[stForm].obj[optionList].optionMultiObj[0].obj[i]
                          .optionType
                          ? 'other-input'
                          : 'indenpendent-input'),
                      (optionHtml +=
                        '<div class="form-check multi-target dependent-target study-hide" data-category="' +
                        categoryName +
                        '" ><input class="form-check-input ' +
                        otherClass +
                        '" type="radio" name="' +
                        inputName +
                        dInt +
                        '" id="' +
                        labelId +
                        'Radio' +
                        i +
                        dInt +
                        '" value="' +
                        optionValue +
                        '" ' +
                        requiredValue +
                        ' ' +
                        disabledVal +
                        '><label class="form-check-label" for="' +
                        labelId +
                        'Radio' +
                        i +
                        '">' +
                        optionLabel +
                        '</label></div>'),
                      'option-other' ==
                        result[stForm].obj[optionList].optionMultiObj[0].obj[i]
                          .optionType &&
                        ((depClass = result[stForm].obj[optionList]
                          .optionMultiObj[0].obj[i].dependentClass
                          ? 'dependent-target study-hide'
                          : ''),
                        (depTarget = result[stForm].obj[optionList]
                          .optionMultiObj[0].obj[i].dependentClass
                          ? result[stForm].obj[optionList].optionMultiObj[0]
                              .obj[i].dependentClass
                          : ''),
                        (optionHtml +=
                          "<input type='text' class='" +
                          depClass +
                          "' data-target='" +
                          depTarget +
                          "' name='" +
                          result[stForm].obj[optionList].optionMultiObj[0].obj[
                            i
                          ].optionName +
                          dInt +
                          "' placeholder='" +
                          result[stForm].obj[optionList].optionMultiObj[0].obj[
                            i
                          ].placeholder +
                          "' " +
                          disabledVal +
                          '>'))
                }
            inputForm = optionHtml
        }
        ;(labelForm =
          'radio-option' == result[stForm].inputType
            ? '<legend>' + inputLabel + helpTxt + '</legend>'
            : 'checkbox' == result[stForm].inputType
            ? ''
            : '<label for=' +
              labelId +
              dInt +
              '>' +
              inputLabel +
              helpTxt +
              '</label>'),
          (validationForm = "<div class='valid-feedback'></div>"),
          inputForm && (inputFormHtml = labelForm + inputForm + validationForm),
          inputFormHtml &&
            (result[stForm].hidden
              ? (hideForm = result[stForm].hidden ? 'study-hide' : 'study-show')
              : (hideForm = 'study-show'),
            $('.' + className).append(
              "<div class='form-group " +
                classWidth +
                ' ' +
                hideForm +
                "'>" +
                inputFormHtml +
                '</div>'
            ))
      }
    }
    $(function () {
      $('.date-picker').each(function () {
        $(this).datepicker({
          dateFormat: 'yy-mm-dd',
          changeMonth: !0,
          changeYear: !0,
          yearRange: '-70:+00',
          onSelect: function (dateText) {
            ;(dateObj = new Date(dateText)),
              $(this).attr('data-value', dateObj.getTime())
          }
        })
      })
    })
  },
  printStudenForm = function () {
    let formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject),
      applicationStatus = formJson.application_status,
      studentFormEnabled =
        formJson.agency_form_array[0].student_info_form_enabled,
      agencyFormEnabled = formJson.agency_form_array[0].agency_form_enabled,
      advisorFormEnabled = formJson.advisor_form_array[0].advisor_form_enabled,
      classStudentName = 'student-information-form'
    'Agent' == applicationStatus
      ? ($('.advisor-information-form').empty(),
        $('.agent-information-form').is(':empty') &&
          printPersonForm(
            studentInfoArray,
            agencyFormEnabled,
            'Agent',
            'agent-information-form'
          ),
        $('.' + classStudentName).is(':empty') &&
          printPersonForm(
            studentInfoArray,
            studentFormEnabled,
            'Student',
            classStudentName
          ),
        $('form#form-advisor').removeClass('form-show').addClass('form-hide'),
        $('form#form-agent,form#form-student')
          .removeClass('form-hide')
          .addClass('form-show'))
      : 'Walk-in Student Advisor' == applicationStatus
      ? ($('.agent-information-form').empty(),
        $('.advisor-information-form').is(':empty') &&
          printPersonForm(
            studentInfoArray,
            advisorFormEnabled,
            'Advisor',
            'advisor-information-form'
          ),
        $('.' + classStudentName).is(':empty') &&
          printPersonForm(
            studentInfoArray,
            studentFormEnabled,
            'Student',
            classStudentName
          ),
        $('form#form-agent').removeClass('form-show').addClass('form-hide'),
        $('form#form-advisor,form#form-student')
          .removeClass('form-hide')
          .addClass('form-show'))
      : 'Student' == applicationStatus &&
        ($('.agent-information-form').empty(),
        $('.advisor-information-form').empty(),
        $('.' + classStudentName).is(':empty') &&
          printPersonForm(
            studentInfoArray,
            studentFormEnabled,
            'Student',
            classStudentName
          ),
        $('form#form-student').removeClass('form-hide').addClass('form-show'),
        $('form#form-agent').removeClass('form-show').addClass('form-hide'),
        $('form#form-advisor').removeClass('form-show').addClass('form-hide')),
      $('#studentAddressCountry').change(function () {
        'Australia' == this.value
          ? $('#studentVisaTypeNumber')
              .parent()
              .removeClass('form-hide')
              .addClass('form-show')
          : $('#studentVisaTypeNumber')
              .parent()
              .removeClass('form-show')
              .addClass('form-hide')
      })
  },
  updateStudentInfoJson = function () {
    let formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject),
      agentInfoArray = [],
      studentInfoArray = []
    $('form#form-agent')
      .serializeArray()
      .forEach(function (inputAgentObj) {
        agentInfoArray.push({
          name: inputAgentObj.name,
          value: inputAgentObj.value
        })
      }),
      agentInfoArray.length > 0 &&
        (formJson.agency_form_array[0].agency_form_enabled = !0)
    for (let i = 0; i < agentInfoArray.length; i++)
      formJson.agency_form_array[0][agentInfoArray[i].name] =
        agentInfoArray[i].value
    $('form#form-student')
      .serializeArray()
      .forEach(function (inputStdObj) {
        studentInfoArray.push({
          name: inputStdObj.name,
          value: inputStdObj.value
        })
      }),
      studentInfoArray.length > 0 &&
        (formJson.student_info_form_array[0].student_form_enabled = !0)
    for (let i = 0; i < studentInfoArray.length; i++)
      formJson.student_info_form_array[0][studentInfoArray[i].name] =
        studentInfoArray[i].value
    localStorage.setItem(formJsonName, JSON.stringify(formJson))
  },
  updateProgramJson = function () {
    let formObjectReset = localStorage.getItem(formJsonName),
      formJsonReset = JSON.parse(formObjectReset),
      programArray = []
    dependentArray = []
    for (let i = 0; i < 6; i++)
      formJsonReset.program_form_array[0].program_additional_info[0].visa_form_dependent[
        i
      ] = {}
    localStorage.setItem(formJsonName, JSON.stringify(formJsonReset))
    let formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject)
    $('form#study-form')
      .serializeArray()
      .forEach(function (inputProgramObj) {
        programArray.push({
          name: inputProgramObj.name,
          value: inputProgramObj.value
        })
      }),
      programArray.length > 0 &&
        (formJson.program_form_array[0].program_form_enabled = !0)
    for (let i = 0; i < programArray.length; i++)
      (keyValue = programArray[i].name),
        (val = programArray[i].value),
        1 == programArray[i].value
          ? (val = 'Yes')
          : 0 == programArray[i].value && (val = 'No'),
        keyValue.includes('dependent')
          ? ((splitName = programArray[i].name.split('_iterate_')),
            (iterateVal = splitName[1]),
            dependentArray.push({
              iterate: iterateVal,
              name: splitName[0],
              value: val
            }))
          : keyValue.includes('alternate-input')
          ? keyValue.includes('additional')
            ? (formJson.program_form_array[0].program_alternate_array[0].program_additional_info[0][
                programArray[i].name.replace('_alternate-input', '')
              ] = val)
            : (formJson.program_form_array[0].program_alternate_array[0][
                programArray[i].name.replace('_alternate-input', '')
              ] = val)
          : keyValue.includes('additional')
          ? (formJson.program_form_array[0].program_additional_info[0][
              programArray[i].name.replace('_primary-input', '')
            ] = val)
          : (formJson.program_form_array[0][
              programArray[i].name.replace('_primary-input', '')
            ] = val)
    if (dependentArray.length > 0) {
      ;(groupedDependent = groupBy(dependentArray, 'iterate')),
        (groupArray = new Object()),
        (groupArray = groupedDependent),
        (values = Object.values(groupArray))
      for (let i = 0; i < values.length; i++)
        for (let x = 0; x < values[i].length; x++)
          formJson.program_form_array[0].program_additional_info[0].visa_form_dependent[
            i
          ][values[i][x].name] = values[i][x].value
    }
    localStorage.setItem(formJsonName, JSON.stringify(formJson)),
      deleteCookie('program-obj')
  },
  updateAccommodationJson = function () {
    let formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject),
      accommodationInfoArray = []
    $('form#accommodation-form')
      .serializeArray()
      .forEach(function (inputAgentObj) {
        accommodationInfoArray.push({
          name: inputAgentObj.name,
          value: inputAgentObj.value
        })
      }),
      accommodationInfoArray.length > 0 &&
        (formJson.accommodation_form_array[0].accommodation_form_enabled = !0)
    for (let i = 0; i < accommodationInfoArray.length; i++)
      formJson.accommodation_form_array[0][accommodationInfoArray[i].name] =
        accommodationInfoArray[i].value
    localStorage.setItem(formJsonName, JSON.stringify(formJson)),
      deleteCookie('accom-type-obj')
  },
  getSchoolCountryList = function () {
    let dropElement =
        '.study-information-form.dropdown-container ul.drop-country',
      tableId = schoolCountryListTable,
      schoolParentQuery =
        'ELS' == schoolVal ? '&country__eq=USA' : '&country__neq=USA',
      api_url =
        'https://api.hubapi.com/hubdb/api/v2/tables/' +
        tableId +
        '/rows?portalId=' +
        portalId +
        (schoolParentQuery + '&location_type__in=Country,Online&enable__eq=1')
    ;(api_url = encodeURI(api_url)),
      0 == $(dropElement + ' li').length &&
        $.get(api_url)
          .done(function (data) {
            let dataObject = data.objects
            if (
              ($(dropElement).append(
                '<li class="disabled">Choose your Country</li>'
              ),
              dataObject.length > 0)
            ) {
              for (let i = 0; i < dataObject.length; i++)
                (countryValue = dataObject[i].values[1]),
                  (listHtml =
                    "<li class='dropdown-item' data-value='" +
                    countryValue +
                    "' tranlsate='no'>" +
                    countryValue +
                    '</li>'),
                  $(dropElement).append(listHtml)
              printDropSelect('.country-dropdown'),
                $(
                  '.study-information-form.dropdown-container ul.drop-country li.dropdown-item'
                ).click(function () {
                  $(
                    '.study-information-form .study-box-container:not(.country-select-container)'
                  ).addClass('disabled'),
                    $('.study-information-form .input-container')
                      .removeClass('study-show')
                      .addClass('study-hide'),
                    (selectedValue = $(this).attr('data-value')),
                    $('input[name=program_country]')
                      .val(selectedValue)
                      .trigger('change'),
                    printSchoolSelection(selectedValue)
                }),
                enableCountryBtn()
            } else
              (listHtml = 'No Country Available at this time.'),
                $(
                  '#.study-information-form.dropdown-container .btn.country-select span.selected-text'
                ).text(listHtml)
          })
          .fail(function () {
            ;(listHtml = 'No Country Available at this time.'),
              $(
                '#.study-information-form.dropdown-container .btn.country-select span.selected-text'
              ).text(listHtml)
          })
  },
  resetInsuranceOption = function () {
    $('#insurance-option-container').empty()
  },
  resetSchoolProgram = function () {
    $('.study-program-selection.study-box-container').addClass('disabled'),
      $(
        '.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container,.accommodation-airport-transfer-details,.accommodation-details,.accommodation-homestay-details'
      )
        .removeClass('study-show')
        .addClass('study-hide'),
      $('.additional-program-form').empty(),
      $('.additional-notes-container .additional-notes-input').empty(),
      $('.week-input').empty(),
      $('input[name=program_weeks_primary-input]').attr('disabled', !0).val(''),
      $('.additional-files-container').empty(),
      $('.airport-transfer-details').empty(),
      $('#accommodation-type-option-container').empty(),
      $('.homestay-details').empty(),
      $('input[name=accommodation_option]').prop('checked', !1),
      !$('.accommodation-details').is(':empty') &&
        $('input[name=program_campus]').is(':checked') &&
        printAccomLocationOption()
  },
  resetCampusProgram = function () {
    $(
      '.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container'
    )
      .removeClass('study-show')
      .addClass('study-hide'),
      $('input[name=program_is_coop_primary-input]').prop('checked', !1),
      $('.additional-notes-container .additional-notes-input').empty()
  },
  resetProgramFormField = function (elementStatus, formElement, emptyElement) {
    'primary-input' == elementStatus &&
      $('.study-program-alternate')
        .removeClass('study-show')
        .addClass('study-hide'),
      formElement &&
        ($(formElement).removeClass('study-show').addClass('study-hide'),
        $('input,select', formElement).attr('disabled', !0)),
      emptyElement && $(emptyElement).empty(),
      $('.additional-notes-container')
        .removeClass('study-show')
        .addClass('study-hide'),
      $('.additional-notes-container .additional-notes-input').empty(),
      $('.additional-files-container').empty(),
      resetLaSalleOption(elementStatus)
  },
  resetAccommodationDetails = function () {
    $('input[name=accommodation_type]').prop('checked', !1),
      $('.form-group.accommodation-details')
        .removeClass('study-show')
        .addClass('study-hide'),
      $('.form-group.accommodation-details input').attr('disabled', !0),
      $('.accommodation-homestay-details')
        .removeClass('study-show')
        .addClass('study-hide'),
      $('.accommodation-homestay-details input').attr('disabled', !0)
  },
  resetAdditionalFiles = function () {
    $('.additional-files-container').empty()
  },
  printWeeksOption = function (selectedProgramArray, element) {
    let dataObject = selectedProgramArray,
      optionHtml = ''
    if (dataObject.length > 0) {
      for (let i = 0; i < dataObject.length; i++)
        optionHtml +=
          '<div class="form-check"><label class="form-check-label" for="program-weeks-' +
          dataObject[i].program_id +
          '">' +
          dataObject[i].program_length +
          ' weeks</label></div>'
      $(
        '.study-program-selection .input-container.schedule-input.' +
          element +
          ' .week-input'
      ).html('<label>Number of Weeks</label>' + optionHtml)
    }
  },
  printAlternateOption = function () {
    ;(optionHtml =
      '<label>Are you also applying for Greystone College programs?</label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="is_alternate_apply" id="no-alternate" required><label class="form-check-label" for="no-alternate">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="is_alternate_apply" id="yes-alternate"><label class="form-check-label" for="yes-alternate">Yes</label></div>'),
      (className =
        '.study-program-selection .input-container.alternate-initial .study-program-alternate-option'),
      $(className).is(':empty') && $(className).html(optionHtml),
      $('.study-program-selection .input-container.alternate-initial')
        .removeClass('study-hide')
        .addClass('study-show')
  },
  printScheduleOption = function (selectedProgramArray, element) {
    let dataObject = selectedProgramArray,
      selected = $(
        '.study-program-dropdown .' + element + ' select option:selected'
      ).attr('data-id'),
      selectedMinAge = $(
        '.study-program-dropdown .' + element + ' select option:selected'
      ).attr('data-min-age'),
      selectedMaxAge = $(
        '.study-program-dropdown .' + element + ' select option:selected'
      ).attr('data-max-age'),
      optionHtml = ''
    if (
      ((singleOptionChek = 1 == dataObject.length ? 'checked' : ''),
      (selectedMinAge = selectedMinAge || 0),
      (selectedMaxAge = selectedMaxAge || 99),
      dataObject.length > 0)
    ) {
      for (let i = 0; i < dataObject.length; i++)
        (lasalleVar = dataObject[i].laSalleEligible
          ? dataObject[i].laSalleEligible
          : ''),
          (optionHtml +=
            '<div class="form-check"><input class="form-check-input ' +
            element +
            '" value="' +
            dataObject[i].program_schedule +
            '" type="radio" name="program_schedule__' +
            element +
            '" data-weeks="' +
            dataObject[i].program_length +
            '" data-parent-id="' +
            dataObject[i].parent_program_id +
            '" id="' +
            dataObject[i].program_id +
            '" data-lasalle-eligible="' +
            lasalleVar +
            '" ' +
            singleOptionChek +
            ' required><label class="form-check-label" for="' +
            dataObject[i].program_id +
            '">' +
            dataObject[i].program_schedule +
            '</label></div>')
      $(
        '.study-program-selection .input-container.schedule-input.' +
          element +
          ' .time-input'
      ).html('<label>Choose Schedule</label>' + optionHtml),
        $(
          '.study-program-selection.study-box-container .input-container.schedule-input.' +
            element
        )
          .removeClass('study-hide')
          .addClass('study-show'),
        printWeeksOption(dataObject, element),
        1 == dataObject.length &&
          ($('input[name=program_weeks_' + element)
            .val(dataObject[0].program_length)
            .attr('disabled', !1),
          printStartDates(
            dataObject[0].program_id,
            element,
            selectedMinAge,
            selectedMaxAge
          ))
    } else
      $(
        '.study-program-selection .input-container.schedule-input .time-input,.study-program-selection .input-container.schedule-input.' +
          element +
          ' .week-input'
      ).empty(),
        printStartDates(selected, element, selectedMinAge, selectedMaxAge)
  },
  printProgramOption = function (selectedProgram, element, minAge, maxAge) {
    let selectedCampus = $('input[name=program_campus]:checked').attr('id'),
      api_url =
        ($('input[name=program_school]:checked').attr('data-school'),
        'https://api.hubapi.com/hubdb/api/v2/tables/' +
          programLSListTable +
          '/rows?portalId=' +
          portalId +
          ('&campus_location__in=' +
            selectedCampus +
            '&programs_available__in=' +
            selectedProgram +
            '&is_program_price__eq=1&enable__eq=1&orderBy=category')),
      programOptionArray = [],
      optionProgramHtml = ''
    ;(api_url = encodeURI(api_url)),
      $.ajax({
        url: api_url,
        type: 'get',
        async: !1,
        success: function (data) {
          let dataObject = data.objects
          for (let i = 0; i < dataObject.length; i++)
            (scheduleName = dataObject[i].values[3].name),
              programOptionArray.push({
                program_id: dataObject[i].id,
                schedule_name: dataObject[i].values[3].name,
                item_name: dataObject[i].values[4],
                schedule_id: scheduleName.replace(/\s/g, ''),
                group_id: dataObject[i].values[13][0].id,
                campus_country: dataObject[i].values[26].name
              })
          let programPriceGroupedByGroupId = groupBy(
              programOptionArray,
              'group_id'
            ),
            groupArray = new Object()
          groupArray = programPriceGroupedByGroupId
          Object.keys(groupArray)
          let programGroupedArray = [],
            values = Object.values(groupArray)
          for (let i = 0; i < values.length; i++)
            for (let x = 0; x < values[i].length; x++)
              0 == x &&
                programGroupedArray.push({
                  program_id: values[i][x].program_id,
                  campus_country: values[i][x].campus_country,
                  group_id: values[i][x].group_id,
                  item_name: values[i][x].item_name,
                  schedule_id: values[i][x].schedule_id,
                  schedule_name: values[i][x].schedule_name
                })
          if (
            ((singleOptionChek =
              1 == programGroupedArray.length ? 'checked' : ''),
            programGroupedArray.length > 0)
          ) {
            for (let i = 0; i < programGroupedArray.length; i++)
              optionProgramHtml +=
                '<div class="form-check"><input class="form-check-input ' +
                element +
                '" value="' +
                programGroupedArray[i].schedule_name +
                '-' +
                programGroupedArray[i].item_name +
                '" type="radio" name="program_option__' +
                element +
                '"  data-parent-id="' +
                programGroupedArray[i].group_id +
                '" id="' +
                programGroupedArray[i].program_id +
                '" ' +
                singleOptionChek +
                ' required><label class="form-check-label" for="' +
                programGroupedArray[i].program_id +
                '">' +
                programGroupedArray[i].schedule_name +
                '-' +
                programGroupedArray[i].item_name +
                '</label></div>'
            $(
              '.study-program-selection .input-container.program-option-input.' +
                element +
                ' .program-schedule-input'
            ).html('<label>Choose Program Option</label>' + optionProgramHtml),
              $(
                '.study-program-selection.study-box-container .input-container.program-option-input.' +
                  element
              )
                .removeClass('study-hide')
                .addClass('study-show')
          }
          1 == programGroupedArray.length &&
            printStartDates(selectedProgram, element, minAge, maxAge)
        }
      })
  },
  printLaSalleOption = function (element) {
    ;(isLasalleOptionHtml =
      "<label>Are you also applying for LaSalle partnership program?</label><div class='form-check'><input class='form-check-input " +
      element +
      "' value='No' type='radio' name='option_lasalle_parthership_" +
      element +
      "' id='no-'" +
      element +
      "'><label class='form-check-label' for='no-" +
      element +
      "'>No</label></div><div class='form-check'><input class='form-check-input " +
      element +
      "' value='Yes' type='radio' name='option_lasalle_parthership_" +
      element +
      "' id='yes-'" +
      element +
      "'><label class='form-check-label' for='yes-" +
      element +
      "'>Yes</label></div>"),
      (birthOptionHtml =
        "<div class='partner-info study-hide'><div class='form-group'><label for='partner-birth-city-" +
        element +
        "'>Enter City of Birth<sup>*</sup></label><input class='form-control' id='partner-birth-city-" +
        element +
        "' type='text' name='student_city_birth_" +
        element +
        "' disabled required></div><div class='form-group'><label for='partner-birth-state-" +
        element +
        "'>Enter Province/State of Birth<sup>*</sup></label><input class='form-control' type='text' id='partner-birth-state-" +
        element +
        "' name='student_prov_state_birth_" +
        element +
        "' disabled required></div></div>"),
      $(
        '.study-program-selection .partner-input.' +
          element +
          ' .partner-option-input'
      ).html(isLasalleOptionHtml + birthOptionHtml),
      $('.study-program-selection .partner-input.' + element)
        .removeClass('study-hide')
        .addClass('study-show')
  },
  printStartDates = function (selectedProgram, element, minAge, maxAge) {
    let selectedCampus = $('input[name=program_campus]:checked').attr('id'),
      selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      selectedCountry = $('input[name=program_country]').val(),
      selectedSchedule = $(
        'input[name=program_option__primary-input]:checked'
      ).val(),
      dateBirthTime = new Date($('input[name=student_dob]').val()).getTime()
    if (
      ('Language School' == selectedParentSchool
        ? (tableId = startDateTableLS)
        : 'Greystone College' == selectedParentSchool
        ? (tableId = startDateTableGC)
        : 'ELS' == selectedParentSchool && (tableId = startDateTableELS),
      'alternate-input' == element &&
        ((tableId = startDateTableGC),
        (primaryStartDate = $(
          'select[name=program_startdate_primary-input] option:selected'
        ).attr('data-value')),
        (primaryDurationInt = parseInt(
          $(
            'select[name=program_option_duration_primary-input] option:selected'
          )
            .val()
            .slice(0, 2)
        )),
        (primaryDuration = 7 * primaryDurationInt),
        (epochPrimaryStartDate =
          parseInt(primaryStartDate) + 864e5 * primaryDuration)),
      'undefined' != typeof tableId)
    ) {
      dateQuery =
        'alternate-input' == element
          ? '&start_dates__gt=' + epochPrimaryStartDate
          : ''
      let queryParam =
          '&program__in=' +
          selectedProgram +
          '&campus__in=' +
          selectedCampus +
          dateQuery,
        api_url =
          'https://api.hubapi.com/hubdb/api/v2/tables/' +
          tableId +
          '/rows?portalId=' +
          portalId +
          queryParam
      ;(api_url = encodeURI(api_url)),
        (foundNoneHtml =
          "<option disabled selected value=''>No Start Dates Available</option>"),
        $(
          '.study-program-start-date-dropdown .' +
            element +
            ' select.form-control'
        ).html(
          "<option disabled selected value=''>No Start Dates Available</option>"
        ),
        $.get(api_url)
          .done(function (data) {
            let dataObject = data.objects
            if (
              ((currentDate = new Date()),
              dataObject.sort((a, b) => a.values[3] - b.values[3]),
              dataObject.length > 0)
            ) {
              ;(optionHtml =
                "<option disabled selected value=''>Choose Start Date</option>"),
                (enableOption = !1)
              for (let i = 0; i < dataObject.length; i++)
                if (
                  ((dateObj = new Date(dataObject[i].values[3])),
                  (dateObjCalc = new Date(dataObject[i].values[3])),
                  (dateObjCalcMinor = new Date(dataObject[i].values[3])),
                  (epochVal = dataObject[i].values[3]),
                  currentDate.getTime() <= epochVal &&
                    ((minDob = subtractYears(minAge, dateObjCalc)),
                    (minorDob = subtractYears(18, dateObjCalcMinor)),
                    dateBirthTime <= minDob))
                ) {
                  if (
                    ((yearVal = dateObj.getUTCFullYear()),
                    (monthVal = months[dateObj.getUTCMonth()]),
                    (monthInt = monthsInt[dateObj.getUTCMonth()]),
                    (dayVal = dateObj.getUTCDate()),
                    (dateTxt = monthVal + ' ' + dayVal + ', ' + yearVal),
                    (monthInt =
                      monthInt.length < 2 ? '0' + monthInt : monthInt),
                    (dayVal =
                      dayVal.toString().length < 2
                        ? '0' + dayVal.toString()
                        : dayVal),
                    (dateInt = yearVal + '-' + monthInt + '-' + dayVal),
                    (weekAvailableArray = []),
                    dataObject[i].values[5])
                  )
                    for (let x = 0; x < dataObject[i].values[5].length; x++)
                      weekAvailableArray.push(dataObject[i].values[5][x].name)
                  ;(optionHide =
                    'Australia' == selectedCountry &&
                    'Language School' == selectedParentSchool &&
                    (selectedSchedule.includes('Evening') ||
                      selectedSchedule.includes('Part Time')) &&
                    dateBirthTime > minorDob
                      ? 'hidden disabled'
                      : ''),
                    (optionHtml =
                      optionHtml +
                      '<option ' +
                      optionHide +
                      " value='" +
                      dateInt +
                      "' data-value='" +
                      dataObject[i].values[3] +
                      "' data-week-available='" +
                      weekAvailableArray.toString() +
                      "'>" +
                      dateTxt +
                      '</option>'),
                    (enableOption = !0)
                }
              ;(ageQualifyMessage =
                "<option disabled selected value=''>No Start Dates Available. Possible reason - There is an age requirement for this program. Minimum age:" +
                minAge +
                '</option>'),
                enableOption
                  ? ($(
                      '.' +
                        element +
                        ' .study-program-start-date-dropdown select.startdate-dropdown'
                    ).html(optionHtml),
                    $(
                      '.' +
                        element +
                        ' .study-program-start-date-dropdown select.startdate-dropdown'
                    ).prop('disabled', !1),
                    0 ==
                      $(
                        '.' +
                          element +
                          ' .study-program-start-date-dropdown select.startdate-dropdown option:not(:disabled)'
                      ).length &&
                      $(
                        '.' +
                          element +
                          ' .study-program-start-date-dropdown select.form-control'
                      )
                        .prop('disabled', !1)
                        .html(ageQualifyMessage))
                  : $(
                      '.' +
                        element +
                        ' .study-program-start-date-dropdown select.form-control'
                    )
                      .prop('disabled', !1)
                      .html(ageQualifyMessage)
            } else
              $(
                '.' +
                  element +
                  ' .study-program-start-date-dropdown select.form-control'
              )
                .prop('disabled', !1)
                .html(foundNoneHtml)
            $(
              '.study-program-selection.study-box-container .input-container.date-input.' +
                element
            )
              .removeClass('study-hide')
              .addClass('study-show')
          })
          .fail(function (jqXHR, textStatus, error) {
            console.log('Something went wrong: ' + error),
              $(
                '.study-program-start-date-dropdown .' +
                  element +
                  ' select.form-control'
              ).html(
                "<option disabled selected value=''>Cannot find Start Dates. Try another Program.</option>"
              )
          })
    }
  },
  printProgramDuration = function (element) {
    let durationArray = $(
      'select[name=program_startdate_primary-input] option:selected'
    )
      .attr('data-week-available')
      .split(',')
    if (
      ((className = $(
        '.study-program-selection .program-option-duration-input.' +
          element +
          ' .duration-dropdown select'
      )),
      (optionHtml =
        '<option disabled selected value="">Choose Duration</option>'),
      'primary-input' == element)
    ) {
      if ((className.empty(), '' != durationArray[0]))
        for (let i = 0; i < durationArray.length; i++)
          (weekText = '1' == durationArray[i] ? 'week' : 'weeks'),
            (optionHtml +=
              '<option class="dropdown-item" data-item="' +
              durationArray[i] +
              ' ' +
              weekText +
              '" value="' +
              durationArray[i] +
              ' ' +
              weekText +
              '">' +
              durationArray[i] +
              ' ' +
              weekText +
              '</option>')
      else
        for (let z = 1; z < 53; z++)
          (weekText = 1 == z ? 'week' : 'weeks'),
            (optionHtml +=
              '<option class="dropdown-item" data-item="' +
              z +
              ' ' +
              weekText +
              '" value="' +
              z +
              ' ' +
              weekText +
              '">' +
              z +
              ' ' +
              weekText +
              '</a>')
      $('.program-option-duration-input.primary-input')
        .removeClass('study-hide')
        .addClass('study-show'),
        className.html(optionHtml).attr('disabled', !1)
    }
  },
  groupBy = (array, key) =>
    array.reduce(
      (result, currentValue) => (
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        ),
        result
      ),
      {}
    ),
  printProgram = function (selectedCampus, element, pairable) {
    let selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      selectedCountry = $('input[name=program_country]').val()
    'Greystone College' == selectedParentSchool || pairable
      ? ((initElement =
          '.study-program-selection .additional-input-container.' +
          element +
          ' .additional-program-form'),
        $(initElement).empty(),
        $(initElement).is(':empty') &&
          ((coopText = '52464878081' == selectedCampus ? 'Practicum' : 'Co-Op'),
          (academicHtml =
            '52464878081' != selectedCampus
              ? '<div class="form-check"><input class="form-check-input ' +
                element +
                '" value="0" type="radio" name="program_is_coop_' +
                element +
                '" id="no-coop" required><label class="form-check-label" for="no-coop">Academic</label></div>'
              : ''),
          (coopHtml =
            'Australia' != selectedCountry
              ? '<div class="form-check"><input class="form-check-input ' +
                element +
                '" value="1" type="radio" name="program_is_coop_' +
                element +
                '" id="yes-coop"><label class="form-check-label" for="yes-coop">' +
                coopText +
                '</label></div>'
              : ''),
          (optionHtml =
            '<label>Choose Program Type</label>' + academicHtml + coopHtml),
          $(initElement).html(optionHtml)),
        $('.study-program-selection.study-box-container').removeClass(
          'disabled'
        ),
        $('.study-program-selection .additional-input-container.' + element)
          .removeClass('study-hide')
          .addClass('study-show'),
        pairable &&
          ($('.study-program-alternate')
            .removeClass('study-hide')
            .addClass('study-show'),
          $('.alternate-initial').append(
            '<input name="program_school_alternate-input" value="Greystone College" type="hidden">'
          )))
      : printProgramDrop(selectedCampus, 0, element)
  },
  printProgramDrop = function (selectedCampus, isCoop, element) {
    let selectedSchool = $('input[name=program_school]:checked').attr('id'),
      selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      dropContainerEl =
        '.study-program-selection.study-box-container .input-container.program-input.' +
        element,
      printDropDownArray = []
    if (
      ((programArray = []),
      (isProla = !1),
      'Language School' == selectedParentSchool
        ? ((tableId = programTableLS),
          (campusProp = 'campus'),
          (objNum = 2),
          (coopBool = ''),
          (minAgeObjNum = 16),
          (maxAgeObjNum = 17))
        : 'Greystone College' == selectedParentSchool
        ? ((tableId = programTableGC),
          (campusProp = 'new_campus'),
          (objNum = 3),
          (coopBool = 1 == isCoop ? '&is_co_op__eq=1' : '&is_co_op__eq=0'))
        : 'ELS' == selectedParentSchool &&
          ((tableId = programTableELS),
          (campusProp = 'campus'),
          (objNum = 2),
          (minAgeObjNum = 17),
          (maxAgeObjNum = 18),
          (coopBool = '')),
      'alternate-input' == element &&
        ((selectedParentSchool = 'Greystone College'),
        (selectedSchool = '81771084433'),
        (tableId = programTableGC),
        (campusProp = 'new_campus'),
        (objNum = 3)),
      'undefined' != typeof campusProp)
    ) {
      let queryParam =
          '&' +
          campusProp +
          '__in=' +
          selectedCampus +
          '&schools__in=' +
          selectedSchool +
          '&enable=1' +
          coopBool +
          '&show_quote_tool=1&add_on_program=0',
        api_url =
          'https://api.hubapi.com/hubdb/api/v2/tables/' +
          tableId +
          '/rows?portalId=' +
          portalId +
          queryParam
      ;(api_url = encodeURI(api_url)),
        $.get(api_url).done(function (data) {
          let dataObject = data.objects
          if (
            (dataObject.sort((a, b) =>
              a.values[objNum] > b.values[objNum] ? 1 : -1
            ),
            dataObject.length > 0)
          )
            if ('Greystone College' == selectedParentSchool) {
              laSalleEligibleArr = []
              for (let i = 0; i < dataObject.length; i++) {
                if (
                  ((minAge = dataObject[i].values[37]
                    ? dataObject[i].values[37][0].name
                    : ''),
                  dataObject[i].values[39] &&
                    dataObject[i].values[39].length > 0)
                )
                  for (let x = 0; x < dataObject[i].values[39].length; x++)
                    laSalleEligibleArr.push(dataObject[i].values[39][x].id)
                programArray.push({
                  parent_program_id: dataObject[i].values[29][0].id,
                  program_id: dataObject[i].id,
                  program_name: dataObject[i].values[3],
                  program_schedule: dataObject[i].values[10],
                  program_length: dataObject[i].values[8],
                  is_coop: dataObject[i].values[9],
                  min_age: minAge,
                  max_age: '',
                  laSalleEligible: laSalleEligibleArr.toString()
                })
              }
              let groupProgram = groupBy(programArray, 'program_name'),
                groupArray = new Object()
              ;(groupArray = groupProgram),
                (values = Object.values(groupArray)),
                (uniqueProgramArray = [])
              for (let i = 0; i < values.length; i++)
                for (let x = 0; x < values[i].length; x++)
                  0 == x &&
                    uniqueProgramArray.push({
                      program_id: values[i][x].parent_program_id,
                      program_name: values[i][x].program_name,
                      is_prola: 0,
                      min_age: values[i][x].min_age,
                      max_age: values[i][x].max_age
                    })
              ;(printDropDownArray = uniqueProgramArray),
                localStorage.setItem(programObjGC, JSON.stringify(programArray))
            } else if (
              'Language School' == selectedParentSchool ||
              'ELS' == selectedParentSchool
            ) {
              for (let i = 0; i < dataObject.length; i++)
                (minAge =
                  void 0 !== dataObject[i].values[minAgeObjNum]
                    ? dataObject[i].values[minAgeObjNum][0].name
                    : ''),
                  (maxAge =
                    void 0 !== dataObject[i].values[maxAgeObjNum]
                      ? dataObject[i].values[maxAgeObjNum][0].name
                      : ''),
                  programArray.push({
                    program_id: dataObject[i].id,
                    program_name: dataObject[i].values[2],
                    is_prola: dataObject[i].values[10],
                    min_age: minAge,
                    max_age: maxAge
                  })
              printDropDownArray = programArray
            } else {
              for (let i = 0; i < dataObject.length; i++)
                programArray.push({
                  program_id: dataObject[i].id,
                  program_name: dataObject[i].values[2],
                  is_prola: !1,
                  min_age: '',
                  max_age: ''
                })
              printDropDownArray = programArray
            }
          if (
            ($('.study-program-selection.study-box-container').removeClass(
              'disabled'
            ),
            printDropDownArray.length > 0)
          ) {
            optionHtml =
              "<option disabled selected value=''>Choose Program</option>"
            for (let i = 0; i < printDropDownArray.length; i++)
              (optionValue = printDropDownArray[i].program_name),
                (isProla = 0 != printDropDownArray[i].is_prola),
                (optionHtml =
                  optionHtml +
                  "<option data-id='" +
                  printDropDownArray[i].program_id +
                  "' value='" +
                  optionValue +
                  "' data-min-age='" +
                  printDropDownArray[i].min_age +
                  "' data-max-age='" +
                  printDropDownArray[i].max_age +
                  "'  data-prola='" +
                  isProla +
                  "' data-value='" +
                  optionValue +
                  "'>" +
                  optionValue +
                  '</option>')
            $('.' + element + ' .study-program-dropdown select')
              .html(optionHtml)
              .attr('name', 'program_name_' + element)
              .attr('id', 'program-name-' + element)
              .addClass(element),
              $(dropContainerEl)
                .removeClass('study-hide')
                .addClass('study-show'),
              $(dropContainerEl + ' select').attr('disabled', !1)
          } else
            $(
              '.study-program-selection.study-box-container .input-container.program-input.' +
                element
            )
              .removeClass('study-hide')
              .addClass('study-show'),
              $('.study-program-dropdown select.' + element).html(
                '<option value="" selected disabled>No Programs available</option>'
              )
        })
    }
  },
  printCampus = function (selected) {
    let countrySelected = $(
        '.study-information-form.dropdown-container button.country-select'
      ).attr('data-selected'),
      api_url =
        'https://api.hubapi.com/hubdb/api/v2/tables/' +
        campusTable +
        '/rows?portalId=' +
        portalId +
        ('&enable__eq=1&country__in=' +
          countrySelected +
          '&schools__in=' +
          selected)
    ;(api_url = encodeURI(api_url)),
      $.get(api_url).done(function (data) {
        let dataObject = data.objects
        if (
          (dataObject.sort((a, b) => (a.values[4] > b.values[4] ? 1 : -1)),
          (campusArray = []),
          dataObject.length > 0)
        ) {
          for (let i = 0; i < dataObject.length; i++)
            (initials = dataObject[i].values[1].match(/\b(\w)/g)),
              (boxName = dataObject[i].values[6]
                ? ''
                : initials.join('').toUpperCase()),
              (thumbNail = dataObject[i].values[6]
                ? "style=background:url('" +
                  dataObject[i].values[6].url +
                  "') no-repeat;"
                : ''),
              campusArray.push({
                id: dataObject[i].id,
                initials: boxName,
                school: selected,
                value: dataObject[i].values[1],
                stateProv: dataObject[i].values[4],
                thumbnail: thumbNail
              })
          let groupCampus = groupBy(campusArray, 'stateProv'),
            groupArray = new Object()
          ;(groupArray = groupCampus),
            (groupHtml = ''),
            (arr = Object.values(groupArray)),
            (childArrayLength = arr.reduce((a, b) => a + b.length, 0)),
            (groupAction = arr.length < childArrayLength)
          for (let x in groupArray) {
            ;(title = x), (listHtml = '')
            for (let i = 0; i < groupArray[x].length; i++)
              groupArray[x][i].length > 1 && (multiList = !0),
                (listHtml +=
                  '<li class="hs-form-radio campus-select-radio form-check"><label id="campus-select" for="' +
                  groupArray[x][i].id +
                  '" class="box-selection"><div class="box-color" data-value="' +
                  groupArray[x][i].id +
                  '" ' +
                  groupArray[x][i].thumbnail +
                  '>' +
                  groupArray[x][i].initials +
                  '</div><input type="radio" name="program_campus" data-state-prov="' +
                  groupArray[x][i].stateProv +
                  '" data-school="' +
                  groupArray[x][i].school +
                  '" value="' +
                  groupArray[x][i].value +
                  '" id="' +
                  groupArray[x][i].id +
                  '" required><span>' +
                  groupArray[x][i].value +
                  '</span></label></li>')
            groupAction
              ? (groupHtml +=
                  '<div>' + listHtml + '<h5>' + title + '</h5></div>')
              : (groupHtml += listHtml)
          }
          $('.study-campus-selection.study-box-container').removeClass(
            'disabled'
          ),
            $('.study-campus-selection ul.inputs-list').html(groupHtml),
            $('.study-campus-selection.study-box-container .input-container')
              .removeClass('study-hide')
              .addClass('study-show')
        }
      })
  },
  printSchoolSelection = function () {
    let countrySelected = $(
        '.study-information-form.dropdown-container button.country-select'
      ).attr('data-selected'),
      tableId = schoolTypeListTable,
      countryQuery =
        'ELS' == schoolVal
          ? '&parent_school__in=ELS'
          : '&parent_school__ne=ELS',
      api_url =
        'https://api.hubapi.com/hubdb/api/v2/tables/' +
        tableId +
        '/rows?portalId=' +
        portalId +
        (countryQuery + '&location_country__in=' + countrySelected),
      listHtml = ''
    ;(api_url = encodeURI(api_url)),
      $.get(api_url).done(function (data) {
        let dataObject = data.objects
        if (
          (dataObject.sort((a, b) => (a.values[1] > b.values[1] ? 1 : -1)),
          dataObject.length > 0)
        ) {
          for (let i = 0; i < dataObject.length; i++)
            (initials = dataObject[i].values[3][0].name.match(/\b(\w)/g)),
              (boxName = dataObject[i].values[6]
                ? ''
                : initials.join('').toUpperCase()),
              (thumbNail = dataObject[i].values[6]
                ? "style=background:url('" +
                  dataObject[i].values[6].url +
                  "') no-repeat;"
                : ''),
              (listHtml +=
                '<li class="hs-form-radio school-select-radio form-check"><label id="school-select" for="' +
                dataObject[i].id +
                '" class="box-selection"><div class="box-color center" data-value="' +
                dataObject[i].id +
                '" ' +
                thumbNail +
                '>' +
                boxName +
                '</div><input type="radio" class="form-check-input" name="program_school" data-pairable="' +
                dataObject[i].values[5] +
                '" value="' +
                dataObject[i].values[1] +
                '" data-school="' +
                dataObject[i].values[3][0].name +
                '" id="' +
                dataObject[i].id +
                '" required><span>' +
                dataObject[i].values[1] +
                '</span></label></li>')
          $('.study-school-selection.study-box-container').removeClass(
            'disabled'
          ),
            $('.study-school-selection ul.inputs-list').html(listHtml),
            $('.study-school-selection.study-box-container .input-container')
              .removeClass('study-hide')
              .addClass('study-show')
        }
      })
  },
  printProgramHubspotFileForm = function () {
    hbspt.forms.create({
      region: 'na1',
      portalId: '5020112',
      formId: programUploadFormId,
      target: '#program-hs-file-form'
    })
  },
  printAdditionalInfo = function () {
    let countrySelected = $(
        '.study-information-form.dropdown-container button.country-select'
      ).attr('data-selected'),
      selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      inputHtml = ($('input[name=is_alternate_apply]:checked').val(), ''),
      additionalHtml = '',
      isProla =
        'true' ==
          $('select[name=program_name_primary-input] option:selected').attr(
            'data-prola'
          ) ||
        'true' ==
          $('select[name=program_name_alternate-input] option:selected').attr(
            'data-prola'
          )
    ;(prolaHtml =
      '<div class="form-group"><label for="inputProlaNumber">ILSC Academic Placement Test Number (if applicable)</label><input type="text" name="additional_prola_number" id="inputProlaNumber"><div class="valid-feedback"></div></div>'),
      (usiHtml =
        '<div class="form-group"><label for="inputUsiNumber">USI Number<sup>*</sup></label><input type="text" name="additional_usi_number" id="inputUsiNumber"><div class="valid-feedback"></div></div>'),
      (visaRadioHtml =
        '<label>Have you ever been refused a visa for any country including Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_refusal" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_refusal" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>'),
      (visaFileHtml =
        '<div class="form-group gte-file-input study-hide"><label for="gte-file">Upload Genuine Temporary Entrant - Statement of Purpose Copy (jpeg,png,pdf) (<a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant#:~:text=%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8BAll,to%20apply%20for%20permanent%20residence" target="_blank">more info</a>)<br><span class="footnote">*Further documents might be required throughout the application process.</span></label><input type="file" name="program_gte_file_upload" id="gte-file" accept="jpeg,jpg,pdf,png" data-bind="gte_copy"><input type="hidden" name="program_gte_file_upload" value="" readonly><div class="valid-feedback"></div></div>'),
      (applyVisaHtml =
        '<label>Applying student visa outside of Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_apply" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_apply" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>'),
      (visaOptionUsHtml =
        '<label>What Visa will you apply for?<sup>*</sup></label><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio0" value="Student" required><label class="form-check-label" for="studentVisaOptionRadio0">Student</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio1" value="Visitor" required=""><label class="form-check-label" for="studentVisaOptionRadio1">Visitor</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio2" value="Working Holiday" required=""><label class="form-check-label" for="studentVisaOptionRadio2">Working Holiday</label></div><div class="form-check" data-category="Student"><input class="form-check-input other-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio3" value="Other" required=""><label class="form-check-label" for="studentVisaOptionRadio3">Other</label></div><input type="text" class="dependent-target study-hide" data-target="student_visa_option" name="student_visa_option_other_specified" placeholder="Specify Other"><div class="valid-feedback"></div>'),
      (visaRadioUsHtml =
        '<label>Are you in possession of a valid US student visa and would like to transfer from another institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-no" required><label class="form-check-label" for="visa-transfer-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>'),
      (visaTransferInputUsHtml =
        '<div class="form-group visa-transfer-input study-hide"><label for="visa-transfer">Name of the institution you are attending?</label><input type="text" name="additional_visa_transfer_name" id="visa-transfer" disabled><div class="valid-feedback"></div></div>'),
      (visaTransferAttendanceInputUsHtml =
        '<div class="form-group visa-transfer-attendance-input study-hide"><label for="visa-transfer-attendance">What was your last date of attendance?</label><input type="date" name="another_institution_last_date_of_attendance" id="visa-transfer-attendance" disabled><div class="valid-feedback"></div></div>'),
      (visaFormRadioUsHtml =
        '<label>Do you need a Form I-20 to apply for a student visa?<sup>*</sup><sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-trigger="hover" data-content="ELS Language Centers is authorized to provide you with a Certificate of Eligibility (Form I-20), which must be presented when applying for a student (F-1)"></i></sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_visa_form_us" id="visa-form-question-no" required><label class="form-check-label" for="visa-form-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_visa_form_us" id="visa-form-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>'),
      (visaFormAddDependentButtonHtml =
        '<div class="form-group visa-form-input study-hide"><label for="add-visa-dependent">Please list and dependents who will travel with you to the US and require an F-2 visa. You must enter dependent\'s name the same way it appears on the passport, and use a space for any special characters.</label><div class="btn-container"><div id="add-visa-dependent" class="btn btn-orange-outline">Add Dependent</div></div><div class="dependents-container"></div></div>'),
      (collegeRadioUsHtml =
        '<label>Student plans on attending a college or university?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_college_question_us" id="college-question-no" required><label class="form-check-label" for="college-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_college_question_us" id="college-question-yes" required><label class="form-check-label" for="college-question-yes">Yes</label></div>'),
      (collegeAcceptRadioUsHtml =
        '<div class="form-group college-acceptance study-hide"><label>Has the student already been accepted to a US institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="additional_college_accept_question_us" id="college-accept-question-no" required disabled><label class="form-check-label" for="college-accept-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="additional_college_accept_question_us" id="college-accept-question-yes" required disabled><label class="form-check-label" for="college-accept-question-yes">Yes</label></div></div>'),
      (collegeInputUsHtml =
        '<div class="form-group college-input study-hide"><label for="college-input">Please write the name of the US institution below</label><input type="text" name="additional_college_name" id="additional_college_name" disabled><div class="valid-feedback"></div></div>'),
      (additionalNotesHtml =
        '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program study</label><textarea name="study_additional_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>'),
      'Australia' == countrySelected
        ? ((inputHtml =
            'Greystone College' == selectedParentSchool
              ? prolaHtml + usiHtml
              : prolaHtml),
          (additionalHtml =
            inputHtml +
            visaRadioHtml +
            visaFileHtml +
            applyVisaHtml +
            additionalNotesHtml),
          hbspt.forms.create({
            region: 'na1',
            portalId: '5020112',
            formId: programUploadFormId,
            target: '#program-hs-file-form'
          }))
        : 'Canada' == countrySelected
        ? ((inputHtml =
            'Greystone College' == selectedParentSchool || isProla
              ? prolaHtml
              : ''),
          (additionalHtml = inputHtml + additionalNotesHtml))
        : 'USA' == countrySelected &&
          (additionalHtml =
            visaOptionUsHtml +
            visaFormRadioUsHtml +
            visaFormAddDependentButtonHtml +
            visaRadioUsHtml +
            visaTransferInputUsHtml +
            visaTransferAttendanceInputUsHtml +
            collegeRadioUsHtml +
            collegeAcceptRadioUsHtml +
            collegeInputUsHtml +
            additionalNotesHtml),
      '' != additionalHtml &&
        ($('.additional-notes-container .additional-notes-input').html(
          additionalHtml
        ),
        $('.additional-notes-container')
          .removeClass('study-hide')
          .removeClass('disabled')
          .addClass('study-show'))
  },
  uploadFile = function (dataStep) {
    ;(emailVar = $('input[name=student_email]').val()),
      'additional-select' == dataStep
        ? ((formName = 'additional-form'),
          (hsFormId = additionalUploadFormId),
          (targetId = 'additional-hs-file-form'),
          (submitVar = !0))
        : 'study-program-select' == dataStep
        ? ((formName = 'study-form'),
          (hsFormId = programUploadFormId),
          (targetId = 'program-hs-file-form'),
          (submitVar = !0))
        : 'submit-select' == dataStep &&
          ((formName = 'submit-complete'),
          (hsFormId = contractUploadFormId),
          (targetId = 'contract-hs-file-form '),
          (submitVar = !0)),
      (submitVar = 'false' != $('#' + formName).attr('data-submit')),
      submitVar ||
        ($('#' + formName + ' input[type=file]').length > 0 &&
          ($('#' + formName + ' input[type=file]').each(function () {
            ;(fileName = $(this).attr('name')),
              (dataBind = $(this).attr('data-bind')),
              (fileVar = $('input[name=' + fileName + ']')[0].files),
              ($('#' + targetId + ' input[name=' + dataBind + ']')[0].files =
                fileVar)
          }),
          $('#' + targetId + ' input[name=email]').val(emailVar),
          $('form#hsForm_' + hsFormId).submit()))
  },
  updateStatusJson = function () {
    let statusValue = $('input[name=online_applicant_status]:checked').val(),
      formObject = localStorage.getItem(formJsonName),
      formJson = JSON.parse(formObject)
    ;(formJson.application_status = statusValue),
      (formJson.application_enabled = !0),
      localStorage.setItem(formJsonName, JSON.stringify(formJson))
  },
  submitForm = function (dataStep) {
    let emailVar = $('input[name=student_email]').val()
    switch (dataStep) {
      case 'student-info-select':
        ;(guid = studentGuid),
          (formName = 'form-student'),
          (formNameAgent = 'form-agent'),
          (formNameAdvisor = 'form-advisor'),
          (formStatus = 'form-status'),
          (arr = studentInfoArray)
        break
      case 'study-program-select':
        ;(guid = studyGuid),
          (formName = 'study-form'),
          (arr = programInfoArray),
          (arrDependent = dependentInputArray),
          uploadFile('study-program-select')
        break
      case 'accommodation-select':
        ;(guid = accommodationGuid),
          (formName = 'accommodation-form'),
          (arr = accommodationInfoArray),
          (arrAdditional = accommodationAdditionalArray)
        break
      case 'additional-select':
        ;(guid = additionalGuid),
          (arr = additionalInfoArray),
          (arrFamily = familyMemberInfoArray),
          (formName = 'additional-form'),
          uploadFile('additional-select')
        break
      case 'submit-select':
        ;(guid = completeGuid),
          (formName = 'submit-complete'),
          (arr = completeInfoArray),
          uploadFile('submit-select')
    }
    if ('undefined' != typeof formName) {
      ;(formTempArray = $('form#' + formName).serializeArray()),
        (forSubmitStr = $('form#' + formName).attr('data-submit')),
        (formSubmit = 'false' != forSubmitStr)
      let url =
          'https://api.hsforms.com/submissions/v3/integration/submit/' +
          portalId +
          '/' +
          guid,
        tempArray = []
      if (
        ((formFieldsArray = []),
        (url = encodeURI(url)),
        'undefined' != typeof formNameAgent)
      ) {
        formAgentTempArray = $('form#' + formNameAgent).serializeArray()
        for (let i = 0; i < formAgentTempArray.length; i++)
          for (let x = 0; x < arr.length; x++)
            formAgentTempArray[i].name == arr[x].inputName &&
              arr[x].objInputName &&
              tempArray.push({
                objName: arr[x].objInputName,
                value: formAgentTempArray[i].value
              })
      }
      if ('undefined' != typeof formNameAdvisor) {
        formAdvisorTempArray = $('form#' + formNameAdvisor).serializeArray()
        for (let y = 0; y < formAdvisorTempArray.length; y++)
          for (let x = 0; x < arr.length; x++)
            formAdvisorTempArray[y].name == arr[x].inputName &&
              arr[x].objInputName &&
              tempArray.push({
                objName: arr[x].objInputName,
                value: formAdvisorTempArray[y].value
              })
      }
      if ('undefined' != typeof formStatus) {
        formStatusTempArray = $('form#' + formStatus).serializeArray()
        for (let i = 0; i < formStatusTempArray.length; i++)
          for (let x = 0; x < arr.length; x++)
            formStatusTempArray[i].name == arr[x].inputName &&
              arr[x].objInputName &&
              tempArray.push({
                objName: arr[x].objInputName,
                value: formStatusTempArray[i].value
              })
      }
      let dependentArray = [],
        familyArray = []
      for (let i = 0; i < formTempArray.length; i++)
        for (let x = 0; x < arr.length; x++)
          formTempArray[i].name == arr[x].inputName &&
            arr[x].objInputName &&
            'email' != arr[x].objInputName &&
            (formTempArray[i].name.includes('program_is_coop_')
              ? (booleanVar = formTempArray[i].name.includes('program_is_coop_')
                  ? 1 == formTempArray[i].value
                    ? 'Co-Op'
                    : 0 == formTempArray[i].value
                    ? 'Academic'
                    : formTempArray[i].value
                  : 1 == formTempArray[i].value
                  ? 'Yes'
                  : 0 == formTempArray[i].value
                  ? 'No'
                  : formTempArray[i].value)
              : (booleanVar = formTempArray[i].name.includes('duration')
                  ? parseInt(formTempArray[i].value.slice(0, 2))
                  : formTempArray[i].name.includes('insurance')
                  ? 1 == formTempArray[i].value
                    ? 'Yes'
                    : 'No'
                  : formTempArray[i].value),
            tempArray.push({
              objName: arr[x].objInputName,
              value: booleanVar
            }))
      if ('undefined' != typeof arrFamily) {
        for (let i = 0; i < formTempArray.length; i++)
          formTempArray[i].name.includes('additional_family') &&
            ((booleanVar =
              1 == formTempArray[i].value
                ? 'Yes'
                : 0 == formTempArray[i].value
                ? 'No'
                : formTempArray[i].value),
            (splitName = formTempArray[i].name.split('_iterate_')),
            (iterateVal = splitName[1]),
            familyArray.push({
              iterate: iterateVal,
              name: splitName[0],
              value: booleanVar
            }))
        if (familyArray.length > 0) {
          ;(groupedDependent = groupBy(familyArray, 'iterate')),
            (groupArray = new Object()),
            (groupArray = groupedDependent),
            (values = Object.values(groupArray)),
            (famGroup = '')
          for (let i = 0; i < values.length; i++) {
            famStr = ''
            for (let x = 0; x < values[i].length; x++)
              famStr =
                famStr +
                '\r\n' +
                values[i][x].name
                  .replace('additional_family_', '')
                  .replace('_', ' ') +
                ': ' +
                values[i][x].value
            famGroup = famGroup + '[' + famStr + '\r\n]\r\n'
          }
          formFieldsArray.push({
            objectTypeId: '0-1',
            name: 'family_members_traveling_with',
            value: famGroup
          })
        }
      }
      if ('undefined' != typeof arrDependent) {
        for (let i = 0; i < formTempArray.length; i++)
          formTempArray[i].name.includes('additional_dependent') &&
            ((booleanVar =
              1 == formTempArray[i].value
                ? 'Yes'
                : 0 == formTempArray[i].value
                ? 'No'
                : formTempArray[i].value),
            (splitName = formTempArray[i].name.split('_iterate_')),
            (iterateVal = splitName[1]),
            dependentArray.push({
              iterate: iterateVal,
              name: splitName[0],
              value: booleanVar
            }))
        if (dependentArray.length > 0) {
          ;(groupedDependent = groupBy(dependentArray, 'iterate')),
            (groupArray = new Object()),
            (groupArray = groupedDependent),
            (values = Object.values(groupArray)),
            (depGroup = '')
          for (let i = 0; i < values.length; i++) {
            depStr = ''
            for (let x = 0; x < values[i].length; x++)
              depStr =
                depStr +
                '\r\n' +
                values[i][x].name
                  .replace('additional_dependent_', '')
                  .replace('_', ' ') +
                ': ' +
                values[i][x].value
            depGroup = depGroup + '[' + depStr + '\r\n]\r\n'
          }
          formFieldsArray.push({
            objectTypeId: '0-1',
            name: 'form_i_20_dependents',
            value: depGroup
          })
        }
      }
      if ('undefined' != typeof arrAdditional) {
        formAddArray = $('form#' + formName).serializeArray()
        for (let i = 0; i < formAddArray.length; i++)
          for (let x = 0; x < arrAdditional.length; x++)
            formAddArray[i].name == arrAdditional[x].inputName &&
              arrAdditional[x].objInputName &&
              tempArray.push({
                objName: arrAdditional[x].objInputName,
                value: formAddArray[i].value
              })
      }
      formFieldsArray.push({
        objectTypeId: '0-1',
        name: 'email',
        value: emailVar
      })
      for (let i = 0; i < tempArray.length; i++)
        (valueTemp = '' == tempArray[i].value ? 'n/a' : tempArray[i].value),
          formFieldsArray.push({
            objectTypeId: '0-1',
            name: tempArray[i].objName,
            value: valueTemp
          })
      let formArray = {
        fields: formFieldsArray,
        context: {
          pageUri: 'www.ilsc.com/online-application',
          pageName: 'Online Application - Student Info'
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: !0,
            text: 'I agree to allow ILSC to store and process my personal data.'
          }
        }
      }
      formSubmit ||
        $.ajax({
          type: 'POST',
          url: url,
          data: JSON.stringify(formArray),
          contentType: 'application/json',
          dataType: 'json',
          success: function () {
            $('form#' + formName).attr('data-submit', !0)
          }
        })
    }
  }

$('.applicant-status-boxes .box-color').click(function () {
  $('.applicant-status-boxes .box-color').removeClass('selected'),
    $(this).addClass('selected'),
    enableNextButton('form#form-status')
})
const enableCountryBtn = function () {
  $('.country-dropdown ul.drop-country li.dropdown-item').click(function () {
    $('.country-dropdown ul.drop-country li.dropdown-item').removeClass(
      'selected'
    ),
      $(this).addClass('selected'),
      enableNextButton('.study-information-form')
  })
}

$('.section-application-form .step-container .btn.next').on(
  'click',
  function () {
    let dataStepVar = $(this).attr('data-step'),
      dataForm = $(this).attr('data-form'),
      validCheck = $(this).attr('data-check')
    ;(validVar = 1 == validateForm(dataStepVar, dataForm, validCheck)),
      validVar &&
        ($('.application-step-form-slide').slick('slickNext'),
        window.scrollTo(0, 0),
        $(this)
          .closest('.step-container')
          .attr('data-complete', !0)
          .attr('data-init', !0))
  }
),
  $(document).on('click', 'ul.drop-country li', function () {
    resetSchoolProgram()
  }),
  $(document).on('click', '.school-select-radio .box-color', function () {
    let selected = $(this).attr('data-value')
    $('.school-select-radio .box-color').removeClass('selected'),
      $(this).addClass('selected'),
      resetSchoolProgram(),
      printCampus(selected)
  }),
  $(document).on(
    'click',
    'input[name=student_dob], .campus-select-radio .box-color',
    function () {
      $(this).is(':input')
        ? (selected = $('.campus-select-radio .box-color.selected').attr(
            'data-value'
          ))
        : ((selected = $(this).attr('data-value')),
          $('.campus-select-radio .box-color').removeClass('selected'),
          $(this).addClass('selected')),
        $(
          '.study-program-selection .additional-input-container,.study-program-selection .input-container,.additional-notes-container'
        )
          .removeClass('study-show')
          .addClass('study-hide'),
        $('input[name=program_is_coop_primary-input]').prop('checked', !1),
        $('.additional-notes-container .additional-notes-input').empty(),
        $('input[name=accommodation_type]').prop('checked', !1),
        $('.form-group.accommodation-details')
          .removeClass('study-show')
          .addClass('study-hide'),
        $('.form-group.accommodation-details input').attr('disabled', !0),
        $('.accommodation-homestay-details')
          .removeClass('study-show')
          .addClass('study-hide'),
        $('.accommodation-homestay-details input').attr('disabled', !0),
        printProgram(selected, 'primary-input')
    }
  ),
  $(document).on('change', 'select[name=student_nationality]', function () {
    $('.additional-files-container').empty()
  })
const coopAction = function (tEl, element) {
    let campusSelected = $('input[name=program_campus]:checked').val(),
      selected = $(tEl).val()
    resetProgramFormField(
      element,
      '.' + element + '.schedule-input,.' + element + '.date-input'
    ),
      printProgramDrop(campusSelected, selected, element)
  },
  updatePrgStartDate = function () {
    $('option:selected', tEl).attr('data-id'),
      $('option:selected', tEl).attr('data-min-age'),
      $('option:selected', tEl).attr('data-max-age'),
      $('input[name=program_school]:checked').attr('data-school'),
      $(
        '.' + element + ' input[name=program_is_coop_' + element + ']:checked'
      ).val()
  },
  programAction = function (tEl, element, pair) {
    let selected = $('option:selected', tEl).attr('data-id'),
      selectedMinAge = $('option:selected', tEl).attr('data-min-age'),
      selectedMaxAge = $('option:selected', tEl).attr('data-max-age'),
      selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      ),
      coopValue = $(
        '.' + element + ' input[name=program_is_coop_' + element + ']:checked'
      ).val()
    if (
      (resetProgramFormField(
        element,
        '.' +
          element +
          '.program-option-input,.' +
          element +
          '.schedule-input,.' +
          element +
          '.date-input,.' +
          element +
          '.program-option-duration-input',
        '.' + element + '.week-input'
      ),
      'Greystone College' == selectedParentSchool || pair)
    ) {
      let programObject = localStorage.getItem(programObjGC),
        programSelected = JSON.parse(programObject).filter(
          v => v.parent_program_id == selected && v.is_coop == coopValue
        )
      printScheduleOption(programSelected, element)
    } else
      'Language School' == selectedParentSchool
        ? printProgramOption(selected, element, selectedMinAge, selectedMaxAge)
        : printStartDates(selected, element, selectedMinAge, selectedMaxAge)
  },
  programOptionAction = function (tEl, element) {
    let selected = $('select.study-program-select option:selected').attr(
        'data-id'
      ),
      selectedMinAge = $('select.study-program-select  option:selected').attr(
        'data-min-age'
      ),
      selectedMaxAge = $('select.study-program-select  option:selected').attr(
        'data-max-age'
      )
    printStartDates(selected, element, selectedMinAge, selectedMaxAge)
  },
  resetLaSalleOption = function () {
    $('.partner-input.' + element)
      .removeClass('study-show')
      .addClass('study-hide'),
      $('.partner-input.' + element + ' input').attr('disabled', !0)
  },
  scheduleAction = function (tEl, element) {
    let selectedId = $(tEl).attr('id'),
      selectedWeeks = $(tEl).attr('data-weeks'),
      selectedLasalle = $(tEl).attr('data-lasalle-eligible'),
      campusSelected = $('input[name=program_campus]:checked').attr('id'),
      selected = $(tEl).val(),
      coopValue = $(
        '.' + element + ' input[name=program_is_coop_' + element + ']:checked'
      ).val(),
      programObject = localStorage.getItem(programObjGC),
      programArray = JSON.parse(programObject)
    ;(programSelected = programArray.filter(
      v =>
        v.parent_program_id == selectedId &&
        v.is_coop == coopValue &&
        v.program_schedule == selected
    )),
      (selectedMinAge = $(
        '.study-program-dropdown select.' + element + ' option:selected'
      ).attr('data-min-age')),
      (selectedMaxAge = $(
        '.study-program-dropdown select.' + element + ' option:selected'
      ).attr('data-max-age')),
      resetProgramFormField('.' + element + '.date-input'),
      $('input[name=program_weeks_' + element)
        .val(selectedWeeks)
        .attr('disabled', !1),
      printStartDates(selectedId, element, selectedMinAge, selectedMaxAge),
      selectedLasalle && selectedLasalle.includes(campusSelected)
        ? printLaSalleOption(element)
        : resetLaSalleOption(element)
  },
  partnerOptionAction = function (tEl, element) {
    'Yes' == $(tEl).val()
      ? ($('.' + element + ' .partner-info')
          .removeClass('study-hide')
          .addClass('study-show'),
        $('.' + element + ' .partner-info input').attr('disabled', !1))
      : ($('.' + element + ' .partner-info')
          .removeClass('study-show')
          .addClass('study-hide'),
        $('.' + element + ' .partner-info input').attr('disabled', !0))
  },
  startDateAction = function (element) {
    let isPairable = $('input[name=program_school]:checked').attr(
        'data-pairable'
      ),
      selectedParentSchool = $('input[name=program_school]:checked').attr(
        'data-school'
      )
    ;('Language School' != selectedParentSchool &&
      'ELS' != selectedParentSchool) ||
      printProgramDuration(element),
      1 == isPairable &&
        'alternate-input' != element &&
        ((optionHtml =
          '<label>Are you also applying for Greystone College programs?</label><div class="form-check"><input class="form-check-input" value="0" type="radio" name="is_alternate_apply" id="no-alternate" required><label class="form-check-label" for="no-alternate">No</label></div><div class="form-check"><input class="form-check-input" value="1" type="radio" name="is_alternate_apply" id="yes-alternate"><label class="form-check-label" for="yes-alternate">Yes</label></div>'),
        (className =
          '.study-program-selection .input-container.alternate-initial .study-program-alternate-option'),
        $(className).is(':empty') && $(className).html(optionHtml),
        $('.study-program-selection .input-container.alternate-initial')
          .removeClass('study-hide')
          .addClass('study-show')),
      printAdditionalInfo(),
      $(function () {
        let startDate = new Date(
            parseInt(
              $(
                'select[name=program_startdate_primary-input] option:checked'
              ).attr('data-value')
            )
          ),
          weekBefore = startDate.setDate(startDate.getDate() - 3)
        'ELS' == selectedParentSchool
          ? $(
              '.accommodation-checkin-date-picker,.accommodation-checkout-date-picker'
            ).attr('disabled', !1)
          : $('.accommodation-checkin-date-picker').attr('disabled', !1),
          $(
            '.accommodation-checkin-date-picker,.accommodation-checkout-date-picker'
          ).datepicker('setDate', null),
          $(
            '.accommodation-checkin-date-picker,.accommodation-checkout-date-picker'
          ).datepicker('destroy'),
          $(
            '.accommodation-checkin-date-picker,.accommodation-checkout-date-picker'
          ).datepicker({
            minDate: new Date(weekBefore),
            dateFormat: 'yy-mm-dd',
            changeMonth: !0,
            changeYear: !0,
            onSelect: function (dateText) {
              ;(dateObj = new Date(dateText)),
                $(this).attr('data-value', dateObj.getTime()),
                $(this).hasClass('accommodation-checkin-date-picker') &&
                  ($('.accommodation-name-option').is(':empty') &&
                    printAccommodationName(),
                  calcAccomCheckOutDate())
            },
            beforeShowDay: function (date) {
              return 'ELS' == selectedParentSchool ||
                6 == date.getDay() ||
                0 == date.getDay()
                ? [!0]
                : [!1]
            }
          })
      })
  },
  durationAction = function (element) {
    if (
      'primary-input' == element &&
      '1' == $('input[name=is_alternate_apply]:checked').val() &&
      !$('.alternate-input .study-program-start-date-dropdown').is(':empty')
    ) {
      let selectedId = $(
          'input[name=program_schedule__alternate-input]:checked'
        ).attr('id'),
        selectedMinAge = $(
          '.study-program-dropdown select.' + element + ' option:selected'
        ).attr('data-min-age'),
        selectedMaxAge = $(
          '.study-program-dropdown select.' + element + ' option:selected'
        ).attr('data-max-age')
      printStartDates(
        selectedId,
        'alternate-input',
        selectedMinAge,
        selectedMaxAge
      )
    }
    let schoolSelected = $('input[name=program_school]').val()
    'ELS' == schoolSelected &&
      ((startDate = parseInt(
        $('select[name=program_startdate_primary-input] option:checked').attr(
          'data-value'
        )
      )),
      (primaryDurationInt = parseInt(
        $('select[name=program_option_duration_primary-input] option:selected')
          .val()
          .slice(0, 2)
      )),
      (primaryDuration = 7 * primaryDurationInt),
      (endDate = startDate + 864e5 * primaryDuration),
      (checkOutDateObj = new Date(endDate)),
      (checkOutDate = checkOutDateObj.setDate(checkOutDateObj.getDate() + 3)),
      $('.accommodation-checkout-date-picker').datepicker('destroy'),
      $('.accommodation-checkout-date-picker').datepicker({
        minDate: new Date(endDate),
        maxDate: new Date(checkOutDate),
        dateFormat: 'yy-mm-dd',
        changeMonth: !0,
        changeYear: !0,
        onSelect: function (dateText) {
          ;(dateObj = new Date(dateText)),
            $(this).attr('data-value', dateObj.getTime())
        },
        beforeShowDay: function (date) {
          return 'ELS' == schoolSelected ||
            6 == date.getDay() ||
            0 == date.getDay()
            ? [!0]
            : [!1]
        }
      }))
  }

$(document).on('change', 'select[name=student_address_country]', function () {
  ;(selected = $('option:selected', this).val()),
    'Australia' == selected
      ? $('input[name=australia_visa_type_number]')
          .attr('disabled', !1)
          .parent()
          .removeClass('study-hide')
          .addClass('study-show')
      : $('input[name=australia_visa_type_number]')
          .attr('disabled', !0)
          .parent()
          .removeClass('study-show')
          .addClass('study-hide')
}),
  $(document).on(
    'click',
    '.primary-input input[name=program_is_coop_primary-input],.alternate-input input[name=program_is_coop_alternate-input]',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        coopAction(this, element)
    }
  ),
  $(document).on('change', 'select.study-program-select', function () {
    $(this).hasClass('alternate-input')
      ? ((element = 'alternate-input'), (pairable = !0))
      : ((element = 'primary-input'), (pairable = !1)),
      programAction(this, element, pairable)
  }),
  $(document).on('change', 'input[name=program_country]', function () {
    $('#insurance-option-container').empty()
  }),
  $(document).on(
    'click',
    '.primary-input input[name=program_option__primary-input]',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        programOptionAction(0, element)
    }
  ),
  $(document).on(
    'click',
    '.primary-input input[name=program_schedule__primary-input],.alternate-input input[name=program_schedule__alternate-input]',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        scheduleAction(this, element)
    }
  ),
  $(document).on(
    'click',
    '.primary-input input[name=option_lasalle_parthership_primary-input],.alternate-input input[name=option_lasalle_parthership_alternate-input]',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        partnerOptionAction(this, element)
    }
  ),
  $(document).on(
    'change',
    '.primary-input .study-program-start-date-dropdown select.primary-input,.alternate-input .study-program-start-date-dropdown select.alternate-input',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        startDateAction(element)
    }
  ),
  $(document).on(
    'change',
    '.primary-input select[name=program_option_duration_primary-input]',
    function () {
      $(this).hasClass('alternate-input')
        ? (element = 'alternate-input')
        : (element = 'primary-input'),
        durationAction(element)
    }
  ),
  $(document).on(
    'click',
    '.alternate-input input[name=is_alternate_apply]',
    function () {
      let selectedValue = $(this).val(),
        campusSelected = $('input[name=program_campus]:checked').val()
      1 == selectedValue
        ? (printProgram(campusSelected, 'alternate-input', !0),
          $(
            '.study-program-alternate input,.study-program-alternate select'
          ).attr('disabled', !1))
        : ($(
            '.alternate-initial input[name=program_school_alternate-input]'
          ).remove(),
          $('.study-program-alternate')
            .removeClass('study-show')
            .addClass('study-hide'),
          $(
            '.study-program-alternate input,.study-program-alternate select'
          ).attr('disabled', !0))
    }
  ),
  $(document).on('click', 'input[name=additional_visa_refusal]', function () {
    '1' == $(this).val()
      ? ($('.gte-file-input').removeClass('study-hide').addClass('study-show'),
        $('.gte-file-input input').attr('required', !0))
      : ($('.gte-file-input').removeClass('study-show').addClass('study-hide'),
        $('.gte-file-input input').attr('required', !1))
  }),
  $(document).on(
    'click',
    'input[name=additional_visa_transfer_us]',
    function () {
      '1' == $(this).val()
        ? ($('.visa-transfer-input,.visa-transfer-attendance-input')
            .removeClass('study-hide')
            .addClass('study-show'),
          $('.visa-transfer-input input,.visa-transfer-attendance-input input')
            .attr('required', !0)
            .attr('disabled', !1))
        : ($('.visa-transfer-input,.visa-transfer-attendance-input')
            .removeClass('study-show')
            .addClass('study-hide'),
          $('.visa-transfer-input input,.visa-transfer-attendance-input input')
            .attr('required', !1)
            .attr('disabled', !0))
    }
  ),
  $(document).on('click', 'input[name=additional_visa_form_us]', function () {
    '1' == $(this).val()
      ? ($('.visa-form-input').removeClass('study-hide').addClass('study-show'),
        $('.visa-form-input input').attr('required', !0).attr('disabled', !1))
      : ($('.visa-form-input').removeClass('study-show').addClass('study-hide'),
        $('.visa-form-input input').attr('required', !1).attr('disabled', !0))
  }),
  $(document).on(
    'click',
    'input[name=additional_college_question_us]',
    function () {
      '1' == $(this).val()
        ? ($('.college-acceptance')
            .removeClass('study-hide')
            .addClass('study-show'),
          $('.college-acceptance input')
            .attr('required', !0)
            .attr('disabled', !1))
        : ($('.college-acceptance')
            .removeClass('study-show')
            .addClass('study-hide'),
          $('.college-acceptance input')
            .attr('required', !1)
            .attr('disabled', !0))
    }
  ),
  $(document).on(
    'click',
    'input[name=additional_college_question_us]',
    function () {
      '1' == $(this).val()
        ? ($('.college-acceptance')
            .removeClass('study-hide')
            .addClass('study-show'),
          $('.college-acceptance input')
            .attr('required', !0)
            .attr('disabled', !1))
        : ($('.college-acceptance')
            .removeClass('study-show')
            .addClass('study-hide'),
          $('.college-acceptance input')
            .attr('required', !1)
            .attr('disabled', !0))
    }
  ),
  $(document).on(
    'click',
    'input[name=additional_college_accept_question_us]',
    function () {
      '1' == $(this).val()
        ? ($('.college-input').removeClass('study-hide').addClass('study-show'),
          $('.college-input input').attr('required', !0).attr('disabled', !1))
        : ($('.college-input').removeClass('study-show').addClass('study-hide'),
          $('.college-input input').attr('required', !1).attr('disabled', !0))
    }
  ),
  $(document).on('click', '#add-visa-dependent', function () {
    ;(dValue = $('.dependents-container >div').length + 1),
      (dClass = 'dependent-person-' + dValue),
      dValue < 4 &&
        ($('.dependents-container').append(
          '<div class="' +
            dClass +
            ' d-class"><i class="far fa-minus-square"></i><h4>Dependent #<span class="int-d-val">' +
            dValue +
            '</span></h4>'
        ),
        printPersonForm(dependentInputArray, !1, 'Dependent', dClass, dValue))
  }),
  $(document).on('click', '.d-class i.fa-minus-square', function () {
    $(this).parent().remove(),
      $('.dependents-container >div').each(function (i) {
        ;(dValueNew = i + 1),
          (dClass = 'dependent-person-' + dValueNew),
          $(this).removeClass().addClass(dClass).addClass('d-class'),
          $('span.int-d-val', this).html(dValueNew)
      })
  }),
  $(document).on('mouseenter', 'i[data-toggle="popover"]', function () {
    $(this)
      .popover({
        trigger: 'hover',
        html: !0
      })
      .popover('show')
  }),
  $(document).on('change', 'input[name=online_applicant_status]', function () {
    ;(statusName = $(this).val()),
      'Student' == statusName
        ? ($('select[name=student_preferred_language]')
            .parent()
            .removeClass('study-hide')
            .addClass('study-show'),
          $('select[name=student_preferred_language]').prop('disabled', !1))
        : ($('select[name=student_preferred_language]')
            .parent()
            .removeClass('study-show')
            .addClass('study-hide'),
          $('select[name=student_preferred_language]').prop('disabled', !0))
  })
const applicationFormSlider = function () {
  $('.application-step-form-slide').slick({
    accessibility: !1,
    arrows: !1,
    dots: !1,
    draggable: !1,
    infinite: !1,
    speed: 500,
    fade: !0,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: !1,
    swipe: !1,
    touchMove: !1
  })
}

$(document).ready(function () {
  $('.application-step-form-slide').slick({
    accessibility: !1,
    arrows: !1,
    dots: !1,
    draggable: !1,
    infinite: !1,
    speed: 500,
    fade: !0,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: !1,
    swipe: !1,
    touchMove: !1
  })
})
//# sourceURL=https://cdn2.hubspot.net/hub/5020112/hub_generated/template_assets/85518743849/1683213656105/ILSC_Website/template-resources/javascript/internal/application-form/applicant-form.js
