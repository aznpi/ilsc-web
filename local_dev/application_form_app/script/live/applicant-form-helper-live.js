const parseQueryStringToDictionary = function (queryString) {
    var dictionary = {};

    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    }

    // Step 1: separate out each key/value pair
    var parts = queryString.split('&');

    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        // Step 2: Split Key/Value pair
        var keyValuePair = p.split('=');

        // Step 3: Add Key/Value pair to Dictionary object
        var key = keyValuePair[0];
        var value = keyValuePair[1];

        // decode URI encoded string
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, ' ');

        dictionary[key] = value;
    }

    // Step 4: Return Dictionary Object
    return dictionary;
}

var queryString = document.location.search;
var dict = parseQueryStringToDictionary(queryString);

const agencyName = dict.a ? dict.a : '',
    agencyContactPerson = dict.f ? dict.f + ' ' + dict.l : '',
    agencyEmail = dict.e ? dict.e : '',
    agencyPhone = dict.t ? dict.t : '',
    agencyRegion = dict.r ? dict.r : '',
    appStatus = dict.status ? dict.status : '';

if (dict.a) {
    $('.option-agent').removeClass('study-hide').addClass('study-show');
    $('.option-advisor').removeClass('study-show').addClass('study-hide');
    $('.option-student').removeClass('study-show').addClass('study-hide');

} else {
    if (schoolVal == 'ELS') {
        //$('.option-agent').removeClass('study-hide').addClass('study-show');
        $('.option-advisor').removeClass('study-show').addClass('study-hide');
        if (!enablePayment) {
            $('.fixed-side-menu ul.fixed-side-menu-list li.payment-select').hide();
        }
    }
    if (appStatus == 'walk-in' || appStatus == 'direct-sales') {
        $('.option-advisor').removeClass('study-hide').addClass('study-show');
        $('.option-advisor span.status-title').html('Walk-In');
        $('.option-agent').removeClass('study-show').addClass('study-hide');
        $('.option-student').removeClass('study-show').addClass('study-hide');

        if (appStatus == 'direct-sales') {
            $('.option-direct-sales').removeClass('study-hide').addClass('study-show');
            $('.option-advisor').removeClass('study-show').addClass('study-hide');
        }
    }
}


const affiliateForm = [{
    //add this to studenForm Array as well
    inputLabel: "Amazonian Alias",
    inputName: 'affiliate_amazonian_alias',
    objInputName: 'affiliate_amazonian_alias',
    affiliateCode: 'Amazon',
    inputType: 'text',
    required: true,
    category: 'Student-Affiliate',
    value: '',
    schoolParentDependence: 'ILSC',
    displayShow: true

}]

const languageListNative = [
    "Albanian",
    "Arabic",
    "Bulgarian",
    "Cantonese",
    "Czech",
    "English",
    "Farsi",
    "French",
    "German",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Kurdish",
    "Mandarin",
    "Mongolian",
    "Nepalese",
    "Philippino",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Slovak",
    "Spanish",
    "Tamil",
    "Thai",
    "Turkish",
    "Ukranian",
    "Uzbek",
    "Vietnamese",
    "Other"
];
const languageListNative_ELS = [
    "Albanian",
    "Arabic",
    "Bulgarian",
    "Cantonese",
    "Chinese",
    "Czech",
    "English",
    "Farsi",
    "French",
    "German",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Kurdish",
    "Mongolian",
    "Nepalese",
    "Philippino",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Slovak",
    "Spanish",
    "Tamil",
    "Thai",
    "Turkish",
    "Ukranian",
    "Uzbek",
    "Vietnamese",
    "Other"
];
const campusList = [
    "Montreal",
    "Toronto",
    "Vancouver",
    "Adelaide",
    "Brisbane",
    "Melbourne",
    "Perth",
    "Sydney",
    "New Delhi"
];
const campusListELS = [
    "Chicago",
    "Cincinnati",
    "Cleveland",
    "Houston",
    "Los Angeles County",
    "Melbourne",
    "Nashville",
    "New York",
    "Philadelphia",
    "San Francisco",
    "St. Paul",
    "St. Petersburgh",
    "Tampa"
];
const languageList = [
    "Arabic",
    "Chinese Simplified",
    "Chinese Traditional",
    "English",
    "French",
    "Japanese",
    "Korean",
    "Portuguese",
    "Thai",
    "Turkish",
    "Vietnamese",
    "Russian",
    "Other"
];
const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote d&#39;Ivoire",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern and Antarctic Lands",
    "Gabon",
    "Gambia ",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands ",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Reunion",
    "Saint Barthélemy",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan ",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands ",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates ",
    "United Kingdom",
    "United States Minor Outlying Islands ",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "British Virgin Islands",
    "U.S. Virgin Islands",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsInt = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const month0Base = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const disablePaymentCountryList = [
    "Bangladesh",
    "Bolivia",
    "Myanmar (Burma)",
    "Cambodia",
    "Costa Rica",
    "El Salvador",
    "French Polynesia",
    "India",
    "Kazakhstan",
    "Nepal",
    "Philippines",
    "Russia Federation",
    "Sri Lanka",
    "Ukraine",
    "Venezuela",
    "Benin",
    "Angola",
    "Sudan",
    "East Timor",
    "Syria",
    "Latvia",
    "Iran",
    "Mali",
    "Guyana",
    "Guatemala",
    "Iraq",
    "Seychelles",
    "Tanzania",
    "Ghana",
    "Zambia",
    "Belize",
    "Curaçao",
    "Bahrain",
    "Congo",
    "Guinea-Bissau",
    "Namibia",
    "Comoros",
    "South Africa",
    "Central African Republic",
    "Democratic Republic of the Congo",
    "Georgia",
    "Jamaica",
    "Turkmenistan",
    "Yemen",
    "Eritrea",
    "Puerto Rico",
    "Guinea",
    "Chad",
    "Somalia",
    "Madagascar",
    "Aruba",
    "Equatorial Guinea",
    "Libya",
    "Malawi",
    "Liechtenstein",
    "Nigeria",
    "Kuwait",
    "Jordan",
    "Kenya",
    "Palestine",
    "Djibouti",
    "Lebanon",
    "Brunei",
    "Liberia",
    "Azerbaijan",
    "Cuba",
    "Czech Republic",
    "Burkina Faso",
    "Mauritania",
    "Swaziland",
    "San Marino",
    "Israel",
    "Tajikistan",
    "Cameroon",
    "Iceland",
    "Oman",
    "Armenia",
    "Gabon",
    "Mozambique",
    "Luxembourg",
    "Algeria",
    "Slovenia",
    "Lesotho",
    "Western Sahara",
    "South Sudan",
    "Moldova",
    "Belarus",
    "Mauritius",
    "Albania",
    "Senegal",
    "Honduras",
    "Ethiopia",
    "Haiti",
    "Burundi",
    "Afghanistan",
    "Macedonia (FYROM)",
    "French Guiana",
    "Egypt",
    "Sierra Leone",
    "Cape Verde",
    "Pakistan",
    "Gambia",
    "Qatar",
    "Slovakia",
    "Serbia",
    "Bosnia and Herzegovina",
    "Bhutan",
    "Romania",
    "Togo",
    "Niger",
    "Cote d'Ivoire",
    "Rwanda",
    "Uzbekistan",
    "Nicaragua",
    "Botswana",
    "Dominican Republic",
    "Uganda",
    "Zimbabwe",
    "Suriname",
    "Montenegro",
    "Dominica"
];


//Step Student From
//create form arrays
const completeInfoArray = [
    {
        inputLabel: "Online Completed",
        inputName: 'online-application-completion',
        objInputName: 'online_application_complete',
        inputType: 'text',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Policy Acknowledgemint",
        inputName: 'policy_acknowledgement',
        objInputName: 'policy_acknowledgement',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I read and agree to the above statement of release",
        inputName: 'release_checkbox',
        objInputName: 'release_form_agreement',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the student declaration form statement",
        inputName: 'ilsc_student_declaration_checkbox',
        objInputName: 'student_declaration_and_acknowledgement_for_ilsc_language_schools_canada',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the student declaration form statement",
        inputName: 'greystone_student_declaration_checkbox',
        objInputName: 'student_declaration_and_acknowledgement_for_greystone_college_canada',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the agent declaration form statement",
        inputName: 'ilsc_agent_declaration_checkbox',
        objInputName: 'agent_declaration_and_acknowledgement_for_ilsc_language_schools_canada',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the agent declaration form statement",
        inputName: 'greystone_agent_declaration_checkbox',
        objInputName: 'agent_declaration_and_acknowledgement_for_greystone_college_canada',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the student declaration form statement",
        inputName: 'greystone_ilsc_student_declaration_checkbox',
        objInputName: 'student_declaration_and_acknowledgement_for_greystone_college_ilsc',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I agree to the agent declaration form statement",
        inputName: 'greystone_ilsc_agent_declaration_checkbox',
        objInputName: 'agent_declaration_and_acknowledgement_for_greystone_college_ilsc',
        inputType: 'checkbox',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Yes, I read and agree to the above statement of FINANCIAL CERTIFICATION/PROOF OF FUNDS",
        inputName: 'proof_of_funds_checkbox',
        objInputName: 'financial_certification_proof_of_funds',
        inputType: 'checkbox',
        required: false,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "E-signature Digital Confirmation",
        inputName: 'e_signature_digital_confirmation',
        objInputName: 'e_signature_digital_confirmation',
        inputType: 'text',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Primary Terms And Conditions Url",
        inputName: 'primary_application_terms_and_condition_policy_url',
        objInputName: 'primary_application_terms_and_condition_policy_url',
        inputType: 'text',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Secondary Terms And Conditions Url",
        inputName: 'secondary_application_terms_and_condition_policy_url',
        objInputName: 'secondary_application_terms_and_condition_policy_url',
        inputType: 'text',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Accommodation Policy Url",
        inputName: 'accommodation_policy_url',
        objInputName: 'accommodation_policy_url',
        inputType: 'text',
        required: true,
        category: 'Application',
        value: '',
        displayShow: false
    }
];
const juniorFamilyMembersInputArray = [
    {
        inputLabel: "Family Member Gender",
        inputName: 'jr_family_member_gender',
        inputType: 'dropdown',
        required: true,
        category: 'FamilyMember',
        value: '',
        obj: [
            "Male",
            "Female"
        ],
        displayShow: true
    },
    {
        inputLabel: "Family Member Age Type",
        inputName: 'jr_family_member_age_type',
        inputType: 'dropdown',
        required: true,
        category: 'FamilyMember',
        value: '',
        obj: [
            "Child",
            "Adult"
        ],
        displayShow: true
    },
    {
        inputLabel: "Family Member First Name",
        inputName: 'jr_family_member_first_name',
        inputType: 'text',
        required: true,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Family Member Middle Name",
        inputName: 'jr_family_member_middle_name',
        inputType: 'text',
        required: false,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Family Member Last Name",
        inputName: 'jr_family_member_last_name',
        inputType: 'text',
        required: true,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Date of Birth",
        inputName: 'jr_family_member_dob',
        inputType: 'date-time',
        required: true,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Relationship to Student",
        inputName: 'jr_family_member_relationship',
        inputType: 'dropdown',
        required: true,
        category: 'FamilyMember',
        value: '',
        obj: [
            "Brother",
            "Sister",
            "Mother",
            "Father"
        ],
        displayShow: true
    },
    {
        inputLabel: "Passport",
        inputName: 'jr_family_member_passport',
        inputType: 'text',
        required: true,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Passport Expiry Date",
        inputName: 'jr_family_member_passport_expiry_date',
        inputType: 'date-time-expiry',
        required: true,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Visa Status",
        inputName: 'jr_family_member_visa_status',
        inputType: 'radio-option',
        required: true,
        category: 'FamilyMember',
        value: '',
        obj: [
            {
                optionLabel: 'Student',
                optionValue: 'Student',
                optionType: 'strict'
            },
            {
                optionLabel: 'Visitor',
                optionValue: 'Visitor',
                optionType: 'strict'
            },
            {
                optionLabel: 'Other',
                optionValue: 'Other',
                optionType: 'option-other',
                optionName: 'family_member_visa_option_other_specified',
                dependentClass: 'jr_family_member_visa_status',
                placeholder: 'Specify Other'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Please specify other visa type",
        inputName: 'family_member_visa_option_other_specified',
        inputType: 'text',
        required: false,
        category: 'FamilyMember',
        value: '',
        displayShow: false
    },
    {
        inputLabel: "Email",
        inputName: 'jr_family_member_email',
        inputType: 'email',
        required: false,
        category: 'FamilyMember',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "T-Shirt Size",
        inputName: 'jr_family_member_t_shirt_size',
        inputType: 'dropdown',
        required: true,
        category: 'FamilyMember',
        value: '',
        obj: [
            "Small",
            "Medium",
            "Large",
            "X-Large"
        ],
        displayShow: true
    }

];
const dependentInputArray = [
    {
        inputLabel: "Dependent First Name",
        inputName: 'additional_dependent_first_name',
        inputType: 'text',
        required: true,
        category: 'Dependent',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Dependent Last Name",
        inputName: 'additional_dependent_last_name',
        inputType: 'text',
        required: true,
        category: 'Dependent',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Date of Birth",
        inputName: 'additional_dependent_dob',
        inputType: 'date-time',
        required: true,
        category: 'Dependent',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Birth of Country",
        inputName: 'additional_dependent_address_country',
        inputType: 'dropdown',
        required: true,
        category: 'Dependent',
        value: '',
        obj: countryList,
        displayShow: true
    },
    {
        inputLabel: "Nationality",
        inputName: 'additional_dependent_nationality',
        inputType: 'dropdown',
        required: true,
        category: 'Dependent',
        value: '',
        obj: countryList,
        displayShow: true
    },
    {
        inputLabel: "Gender",
        inputName: 'additional_dependent_gender',
        inputType: 'dropdown',
        required: true,
        category: 'Dependent',
        value: '',
        obj: [
            "Male",
            "Female"
        ],
        displayShow: true
    },
    {
        inputLabel: "Relationship to Student",
        inputName: 'additional_dependent_relationship',
        inputType: 'dropdown',
        required: true,
        category: 'Dependent',
        value: '',
        obj: [
            "Child",
            "Spouse"
        ],
        displayShow: true,
        helpText: 'According to F-1 Visa regulations, only spouses and children are eligible for an F-2'
    }
];
const studentInfoArray = [
    {
        inputLabel: 'Application Status',
        inputName: 'online_applicant_status',
        objInputName: 'online_application_status',
        inputType: 'radio-option',
        required: false,
        category: 'Application',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        obj: [
            {
                optionLabel: 'Student',
                optionValue: 'Student',
                optionType: 'strict'
            },
            {
                optionLabel: 'Agent',
                optionValue: 'Agent',
                optionType: 'strict'
            },
            {
                optionLabel: 'Student Advisor',
                optionValue: 'Walk-in Student Advisor',
                optionType: 'strict'
            }
        ],
        displayShow: false
    },
    {
        inputLabel: 'Agency Name',
        inputName: 'agency_name',
        objInputName: 'agent_name',
        inputType: 'text',
        required: true,
        category: 'Agent',
        value: agencyName,
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: 'Agency Head Office Country',
        inputName: 'agency_head_office_country_region',
        objInputName: 'agency_head_office_country_region',
        inputType: 'text',
        required: true,
        category: 'Agent',
        value: agencyRegion,
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: 'Agency Contact Person',
        inputName: 'agency_contact_person',
        objInputName: 'agency_contact_person',
        inputType: 'text',
        required: true,
        category: 'Agent',
        value: agencyContactPerson,
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Agency Contact's email",
        inputName: 'agency_contacts_email',
        objInputName: 'agency_contact_email',
        inputType: 'email',
        required: true,
        category: 'Agent',
        value: agencyEmail,
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Agency telephone number",
        inputName: 'agency_contacts_phone',
        objInputName: 'agency_contact_telephone_number',
        inputType: 'phone',
        required: false,
        category: 'Agent',
        value: agencyPhone,
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: 'Enrolment Advisor',
        inputName: 'enrolment_advisor',
        objInputName: 'enrolment_advisors',
        inputType: 'dropdown',
        required: false,
        category: 'Advisor',
        value: '',
        source: 'local-storage',
        obj: 'advisor-array',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: 'Student Advisor - Campus Location',
        inputName: 'advisor_campus',
        objInputName: 'advisor_campus',
        inputType: 'dropdown',
        required: true,
        category: 'Advisor',
        value: '',
        obj: campusList,
        schoolParentDependence: 'ILSC',
        displayShow: true
    },
    {
        inputLabel: 'Student Advisor - Campus Location',
        inputName: 'advisor_campus',
        objInputName: 'advisor_campus',
        inputType: 'dropdown',
        required: true,
        category: 'Advisor',
        value: '',
        obj: campusListELS,
        schoolParentDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "Student Advisor - Name",
        inputName: 'advisor_name',
        objInputName: 'advisor_name',
        inputType: 'text',
        required: true,
        category: 'Advisor',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Student Advisor - Email",
        inputName: 'advisor_email',
        objInputName: 'advisor_email',
        inputType: 'email',
        required: true,
        category: 'Advisor',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Amazonian Alias",
        inputName: 'affiliate_amazonian_alias',
        objInputName: 'affiliate_alias',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: false
    },
    {
        inputLabel: "Promo Code",
        inputName: 'student_promo_code',
        objInputName: 'student_promo_code',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: false,
        hiddenEnable:true
    },
    {
        inputLabel: "First Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your first name as written in your passport)</span>",
        inputName: 'student_first_name',
        objInputName: 'firstname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: true
    },
    {
        inputLabel: "Given Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your given name as written in your passport)</span>",
        inputName: 'student_first_name',
        objInputName: 'firstname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "Middle Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your middle name as written in your passport)</span>",
        inputName: 'student_middle_name',
        objInputName: 'middle_name',
        inputType: 'text',
        required: false,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Last Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your last name as written in your passport)</span>",
        inputName: 'student_last_name',
        objInputName: 'lastname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: true
    },
    {
        inputLabel: "Surname &nbsp;&nbsp;<span class='disclaimer'>(Fill in your surname as written in your passport)</span>",
        inputName: 'student_last_name',
        objInputName: 'lastname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "Email",
        inputName: 'student_email',
        objInputName: 'email',
        inputType: 'email',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Phone number",
        inputName: 'student_phone_number',
        objInputName: 'phone',
        inputType: 'phone',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Current Address",
        inputName: 'student_address',
        objInputName: 'student_complete_address',
        inputType: 'text-area',
        rows: '1',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: true
    },
    {
        inputLabel: "Foreign Address",
        inputName: 'student_address',
        objInputName: 'student_complete_address',
        inputType: 'text-area',
        rows: '1',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "City",
        inputName: 'student_address_city',
        objInputName: 'city',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "State/Province",
        inputName: 'student_address_province_state',
        objInputName: 'state',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: true
    },
    {
        inputLabel: "State/Province",
        inputName: 'student_address_province_state',
        objInputName: 'state',
        inputType: 'text',
        required: false,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "Postal Code",
        inputName: 'student_address_postal_code',
        objInputName: 'zip',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "Country",
        inputName: 'student_address_country',
        objInputName: 'country_of_residence',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        obj: countryList,
        displayShow: true
    },
    {
        inputLabel: "Current Visa Type Number",
        inputName: 'visa_type_number',
        objInputName: 'australia_visa_type_number',
        inputType: 'text',
        disabled: true,
        required: false,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        hidden: true,
        displayShow: true
    },
    {
        inputLabel: "Nationality",
        inputName: 'student_nationality',
        objInputName: 'nationality',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        obj: countryList,
        displayShow: true
    },
    {
        inputLabel: "Date of Birth",
        inputName: 'student_dob',
        objInputName: 'birthdate',
        inputType: 'date-time',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true
    },
    {
        inputLabel: "City of birth",
        inputName: 'student_city_birth',
        objInputName: 'city_of_birth__c',
        inputType: 'text',
        required: false,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        requiredDependence: 'ELS',
        displayShow: true
    },
    {
        inputLabel: "Country of birth",
        inputName: 'student_country_birth',
        objInputName: 'country_of_birth',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        obj: countryList,
        displayShow: true
    },
    {
        inputLabel: "Gender",
        inputName: 'student_gender',
        objInputName: 'gender_student',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        obj: [
            "Male",
            "Female",
            "Non-Binary"
        ],
        displayShow: true
    },
    {
        inputLabel: "Gender",
        inputName: 'student_gender',
        objInputName: 'gender_student',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        obj: [
            "Male",
            "Female"
        ],
        displayShow: true
    },
    {
        inputLabel: "Native Language",
        inputName: 'student_native_language',
        objInputName: 'first_language__cloned_',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        obj: languageListNative,
        displayShow: true
    },
    {
        inputLabel: "Native Language",
        inputName: 'student_native_language',
        objInputName: 'first_language__cloned_',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ELS',
        obj: languageListNative_ELS,
        displayShow: true
    },
    {
        inputLabel: "Preferred Language",
        inputName: 'student_preferred_language',
        objInputName: 'preferred_language_spoken__c',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC,ELS',
        obj: languageList,
        displayShow: true,
        applicationRestriction: 'Walk-in Student Advisor,Agent'
    },
    {
        inputLabel: "What Visa will you apply for?",
        inputName: 'student_visa_option',
        objInputName: 'visa_status_in_your_country_of_study',
        inputType: 'radio-option',
        required: true,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        simpleDisable:true,
        obj: [
            {
                optionLabel: 'Student',
                optionValue: 'Student',
                optionType: 'strict'
            },
            {
                optionLabel: 'Visitor',
                optionValue: 'Visitor',
                optionType: 'strict'
            },
            {
                optionLabel: 'Working Holiday',
                optionValue: 'Working Holiday',
                optionType: 'strict'
            },
            {
                optionLabel: 'Other',
                optionValue: 'Other',
                optionType: 'option-other',
                optionName: 'student_visa_option_other_specified',
                dependentClass: 'student_visa_option',
                placeholder: 'Specify Other'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Please specify visa",
        inputName: 'student_visa_option_other_specified',
        objInputName: 'student_visa_option_other_specified',
        inputType: 'text',
        required: false,
        category: 'Student',
        value: '',
        schoolParentDependence: 'ILSC',
        displayShow: false
    },
    {
        inputLabel: privacyAgreementLabel,
        inputName: 'student_privacy_consent',
        inputType: 'checkbox',
        required: true,
        category: 'Student',
        value: 'Yes',
        schoolParentDependence: 'ILSC,ELS',
        displayShow: true,
        preHtml: privacyAgreementPreHtml,
        postHtml: privacyAgreementPostHtml
    },
];

const programSkillPlusArray = [

    {
        inputLabel: "Skill Plus Program",
        inputName: 'program-skills-plus-class_primary-input',
        objInputName: 'program_name',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Skill Plus Program Start Date",
        inputName: 'program-skills-plus-start-date_primary-input',
        objInputName: 'start_date',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Skill Plus Program Duration",
        inputName: 'program-skills-plus-duration_primary-input',
        objInputName: 'duration',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: false
    }
]

const programAdditionalComboArray = [
    {
        inputLabel: "Program",
        inputName: 'program_name_primary-input',
        objInputName: 'program_name',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Greystone College,ELS,Online,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Option",
        inputName: 'program_option_primary-input',
        objInputName: 'program_schedule',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Start Date",
        inputName: 'program_startdate_primary-input',
        objInputName: 'program_start_date',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Greystone College,ELS,Online,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Type",
        inputName: 'program_is_coop_primary-input',
        objInputName: 'program_type',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },

    {
        inputLabel: "Program Schedule",
        inputName: 'program_schedule_primary-input',
        objInputName: 'program_schedule',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_weeks_primary-input',
        objInputName: 'weeks_of_study',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_option_duration_primary-input',
        objInputName: 'weeks_of_study',
        inputAssign: 'primary',
        schoolDependence: 'Language School',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Additional Programs",
        inputName: 'program_additional',
        objInputName: 'additional_programs',
        inputAssign: 'primary',
        schoolDependence: 'ILSC,Greystone College,ELS',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Type",
        inputName: 'program_is_coop_alternate-input',
        objInputName: 'additional_program_type',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program",
        inputName: 'program_name_alternate-input',
        objInputName: 'additional_program_name',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Schedule",
        inputName: 'program_schedule_alternate-input',
        objInputName: 'additional_program_schedule',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_weeks_alternate-input',
        objInputName: 'additional_study_of_weeks',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Start Date",
        inputName: 'program_startdate_alternate-input',
        objInputName: 'additional_program_start_date',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: false
    }
];

const programInfoArray = [
    {
        inputLabel: "Study Destination",
        inputName: 'program_country',
        objInputName: 'study_country',
        inputAssign: 'primary',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "School",
        inputName: 'program_school',
        objInputName: 'study_school',
        inputAssign: 'primary',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Campus",
        inputName: 'program_campus',
        objInputName: 'study_campus',
        inputAssign: 'primary',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program",
        inputName: 'program_name_primary-input',
        objInputName: 'program_name',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Greystone College,ELS,Online,Junior',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program Option",
        inputName: 'program_option_primary-input',
        objInputName: 'program_schedule',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program Start Date",
        inputName: 'program_startdate_primary-input',
        objInputName: 'program_start_date',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Greystone College,ELS,Online,Junior',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Are you also applying for Greystone College programs?",
        inputName: 'is_alternate_apply',
        objInputName: 'apply_for_a_program_at_greystone_college',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program Type",
        inputName: 'program_is_coop_primary-input',
        objInputName: 'program_type',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },

    {
        inputLabel: "Program Schedule",
        inputName: 'program_schedule_primary-input',
        objInputName: 'program_schedule',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_weeks_primary-input',
        objInputName: 'weeks_of_study',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_option_duration_primary-input',
        objInputName: 'weeks_of_study',
        inputAssign: 'primary',
        schoolDependence: 'Language School',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Additional Programs",
        inputName: 'program_additional',
        objInputName: 'additional_programs',
        inputAssign: 'primary',
        schoolDependence: 'ILSC,Greystone College,ELS',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program Type",
        inputName: 'program_is_coop_alternate-input',
        objInputName: 'additional_program_type',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "School",
        inputName: 'program_school_alternate-input',
        objInputName: 'additional_study_school',
        inputAssign: 'alternate',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "Program",
        inputName: 'program_name_alternate-input',
        objInputName: 'additional_program_name',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program Schedule",
        inputName: 'program_schedule_alternate-input',
        objInputName: 'additional_program_schedule',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Number of Weeks",
        inputName: 'program_weeks_alternate-input',
        objInputName: 'additional_study_of_weeks',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "Program Start Date",
        inputName: 'program_startdate_alternate-input',
        objInputName: 'additional_program_start_date',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program',
        displayShow: true
    },
    {
        inputLabel: "ILSC Academic Placement Test Number",
        inputName: 'additional_prola_number',
        objInputName: 'prola_number',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Choose T-shirt size for student",
        inputName: 'additional_shirt_size',
        objInputName: 'junior_camp_programs_t_shirt_size',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Have you or your student taken the Pre-Arrival Language Placement test?",
        inputName: 'additional_prola_taken',
        objInputName: 'prola_taken',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Are you applying for your visa outside or inside Australia?",
        inputName: 'additional_visa_apply',
        objInputName: 'are_you_applying_for_your_visa_outside_or_inside_australia',
        inputAssign: 'primary',
        schoolDependence: 'ILSC,Greystone College',
        countryDependence: 'Australia',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "What kind of visa you are currently holding?",
        inputName: 'additional_australia_visa',
        objInputName: 'australia_visa',
        inputAssign: 'primary',
        schoolDependence: 'ILSC,Greystone College',
        countryDependence: 'Australia',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Student Visa Other Specify",
        inputName: 'additional_australia_visa_specify',
        objInputName: 'student_visa_option_other_specified',
        inputType: 'text',
        inputAssign: 'primary',
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Upload a copy of your current visa letter",
        inputName: 'additional_australia_visa_letter_file_upload',
        objInputName: 'australia_current_visa_letter',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Are you currently studying at ILSC or Greystone College?",
        inputName: 'additional_australia_current_study',
        objInputName: 'are_you_currently_ilsc_greystone_college_student_',
        inputAssign: 'primary',
        schoolDependence: 'ILSC,Greystone College',
        countryDependence: 'Australia',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Please provide us your current studying campus and student ID numbe",
        inputName: 'additional_australia_student_id',
        objInputName: 'ilsc_greystone_college_student_id',
        inputType: 'text',
        inputAssign: 'primary',
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Upload all the visa copies you have previously since arriving in Australia",
        inputName: 'additional_australia_visa_previous_file_upload',
        objInputName: 'visa_copy',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Write the name of the Education Provider",
        inputName: 'australia_study_other_provider',
        objInputName: 'australia_educational_provider_name',
        inputType: 'text',
        inputAssign: 'primary',
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Upload LoA (Leave of absence)",
        inputName: 'additional_australia_loe_file_upload',
        objInputName: 'loe',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Upload CoE (Confirmation of Enrollment)",
        inputName: 'additional_australia_coe_file_upload',
        objInputName: 'coe',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Australia',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Are you currently inside Canada?",
        inputName: 'additional_inside_canada',
        objInputName: 'are_you_currently_inside_canada',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        countryDependence: 'Canada',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Additional Information Notes",
        inputName: 'study_additional_information_and_notes',
        objInputName: 'study_additional_information_and_notes',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College,Language Schools,ELS',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Additional Information Notes",
        inputName: 'study_additional_online_information_and_notes',
        objInputName: 'online_additional_information_and_notes',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College,Language Schools,ELS',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Choose preferred currency for payment",
        inputName: 'study_additional_preferred_currency_payment',
        objInputName: 'preferred_currency_payment',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools',
        category: 'Program Additional',
        displayShow: false,
        hiddenEnable:true
    },
    {
        inputLabel: "USI Number",
        inputName: 'additional_usi_number',
        objInputName: 'usi_number',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        countryDependence: 'Australia',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Have you ever been refused a visa for any country including Australia?",
        inputName: 'additional_visa_refusal',
        objInputName: 'australia_visa_refusal_history',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        countryDependence: 'Australia',
        category: 'Program Additional',
        displayShow: false
    },
    {
        inputLabel: "Are you in possession of a valid US student visa and would like to transfer from another institution?",
        inputName: 'additional_visa_transfer_us',
        objInputName: 'valid_us_student_visa__transfer_from_another_institution',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true
    },
    {
        inputLabel: "Name of the institution you are attending",
        inputName: 'additional_visa_transfer_name',
        objInputName: 'us_visa_name_of_the_institution_student_are_attending',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "What was your last date of attendance?",
        inputName: 'another_institution_last_date_of_attendance',
        objInputName: 'another_institution_last_date_of_attendance',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "What Visa will you apply for?",
        inputName: 'student_visa_option',
        objInputName: 'els_visa_status',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "Please specify visa",
        inputName: 'student_visa_option_other_specified',
        objInputName: 'student_visa_option_other_specified',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true
    },
    {
        inputLabel: "Do you need a Form I-20 to apply for a student visa?",
        inputName: 'additional_visa_form_us',
        objInputName: 'do_you_need_a_form_i_20_to_apply_for_a_student_visa_',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "Form I-20 Dependents",
        inputName: 'form_i_20_dependents',
        objInputName: 'form_i_20_dependents',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: false

    },
    {
        inputLabel: "Do you plan on attending college or university?",
        inputName: 'additional_college_question_us',
        objInputName: 'student_plans_on_attending_a_college_or_university',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "Has the student already been accepted to a US institution?",
        inputName: 'additional_college_accept_question_us',
        objInputName: 'has_the_student_already_been_accepted_to_a_us_institution_',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "Name of the US institution",
        inputName: 'additional_college_name',
        objInputName: 'name_of_the_us_institution',
        inputAssign: 'primary',
        schoolDependence: 'ELS',
        category: 'Program Additional',
        displayShow: true

    },
    {
        inputLabel: "Genuine Temporary Entrant - Statement of Purpose Copy (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'program_gte_file_upload',
        objInputName: 'gte_copy',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: true,
        countryDependence: 'Australia',
        nationalityDependence: 'Turkey',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Flight details that shows your arrival date in Canada (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'program_inside_flight_file_upload',
        objInputName: 'flight_details',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Canada',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Study Permit or your Canadian visa (TRV or eTA) (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'program_inside_permit_file_upload',
        objInputName: 'study_permit_or_canadian_visa',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Canada',
        schoolDependence: 'ILSC,Greystone College'
    },
    {
        inputLabel: "Are you also applying for LaSalle partnership program?",
        inputName: 'option_lasalle_parthership_primary-input',
        objInputName: 'are_you_also_applying_for_lasalle_partnership_program_',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "City of Birth",
        inputName: 'student_city_birth_primary-input',
        objInputName: 'city_of_birth__c',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "Province/State of Birth",
        inputName: 'student_prov_state_birth_primary-input',
        objInputName: 'province_state_of_birth',
        inputAssign: 'primary',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "Are you also applying for LaSalle partnership program?",
        inputName: 'option_lasalle_parthership_alternate-input',
        objInputName: 'are_you_also_applying_for_lasalle_partnership_program_',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "City of Birth",
        inputName: 'student_city_birth_alternate-input',
        objInputName: 'city_of_birth__c',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "Province/State of Birth",
        inputName: 'student_prov_state_birth_alternate-input',
        objInputName: 'province_state_of_birth',
        inputAssign: 'alternate',
        schoolDependence: 'Greystone College',
        category: 'Program Partner',
        displayShow: true

    },
    {
        inputLabel: "Add Skills Plus Class",
        inputName: 'is-skills-plus-apply',
        objInputName: 'add_skills_plus',
        inputAssign: 'primary',
        schoolDependence: 'Language Schools,Junior',
        category: 'Program',
        displayShow: false
    },
    {
        inputLabel: "English Language Level Self-Assessment form (PDF)",
        inputName: 'program_skills_plus_file_upload',
        objInputName: 'english_language_level_self_assessment_form',
        inputType: 'file',
        category: 'Program Additional',
        inputAssign: 'primary',
        displayShow: false,
        countryDependence: 'Canada',
        schoolDependence: 'ILSC'
    }

];

const accommodationInfoArray = [
    {
        inputLabel: "Do you want to book your accommodation with us?",
        inputName: 'accommodation_option',
        objInputName: 'need_homestay_or_aa',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Accommodation Type",
        inputName: 'accommodation_type',
        objInputName: 'accommodation_type',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Accommodation Confirmation Code",
        inputName: 'accommodation_guesty_code',
        objInputName: 'accommodation_confirmation_code',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India',
    },
    {
        inputLabel: "Accommodation location",
        inputName: 'accommodation_location',
        objInputName: 'accommodation_location',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Check-In Date",
        inputName: 'accommodation_checkin_datepicker',
        objInputName: 'check_in_date',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Check-Out Date",
        inputName: 'accommodation_checkout_datepicker',
        objInputName: 'check_out_date',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Stay Duration",
        inputName: 'accommodation_duration',
        objInputName: 'weeks_of_stay',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Accommodation Name",
        inputName: 'accommodation_name',
        objInputName: 'accommodation_name',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Do you need an airport transfer?",
        inputName: 'accommodation_airport_transfer_option',
        objInputName: 'airport_transfer',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Airport",
        inputName: 'accommodation_airport_brisbane_option',
        objInputName: 'brisbane_airport',
        category: 'Accommodation',
        countryDependence: 'Australia',
        campusDependence: 'Brisbane'
    },
    {
        inputLabel: "Arrival Date",
        inputName: 'airport_arrival_datepicker',
        objInputName: 'arrival_date',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Departure Date",
        inputName: 'airport_departure_datepicker',
        objInputName: 'departure_date',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Airline and Flight Number (if applicable)",
        inputName: 'airpirort_airline_flight',
        objInputName: 'airline_and_flight_number',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Will you be booking unaccompanied minor service through your airline?",
        inputName: 'accommodation_airport_book_minor_option',
        objInputName: 'airline_unaccompanied_minor_service',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Additional information and comments",
        inputName: 'accommodation_airport_minor_comments',
        objInputName: 'interests_and_other_comments',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    }
];


const accommodationAdditionalArray = [
    {
        inputLabel: "Do you take daily medication?",
        inputName: 'accommodation_medication_option',
        objInputName: 'do_you_take_daily_medication_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        countryDependence: 'Canada,Australia,India,USA',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'accommodation_medication_specified',
                dependentClass: 'accommodation_medication_option',
                placeholder: 'Specify'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_medication_specified',
        inputLabel: 'Specify Medication',
        objInputName: 'daily_medicine',
        countryDependence: 'Canada,Australia,India,USA',
        displayShow: false
    },
    {
        inputLabel: "Do you have any allergies?",
        inputName: 'accommodation_allergies_option',
        objInputName: 'any_allergies',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        countryDependence: 'Canada,Australia,India',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'accommodation_allergies_specified',
                dependentClass: 'accommodation_allergies_option',
                placeholder: 'Specify'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_allergies_specified',
        inputLabel: 'Specify Allergies',
        objInputName: 'do_you_have_any_allergies_',
        countryDependence: 'Canada,Australia,India',
        displayShow: false
    },
    {
        inputLabel: "Do you require a special diet?",
        inputName: 'accommodation_homestay_add_diet_option',
        objInputName: 'do_you_require_a_special_diet_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'Canada,Australia,India',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'accommodation_homestay_add_diet_specified',
                dependentClass: 'accommodation_add_diet_option',
                placeholder: 'Specify'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Do you have any food allergies?",
        inputName: 'accommodation_homestay_add_diet_option',
        objInputName: 'do_you_require_a_special_diet_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'accommodation_homestay_add_diet_specified',
                dependentClass: 'accommodation_add_diet_option',
                placeholder: 'Please specify your foor allergies'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_homestay_add_diet_specified',
        inputLabel: 'Specify Diet',
        objInputName: 'special_diet',
        countryDependence: 'Canada,Australia,India',
        displayShow: false
    },
    {
        inputLabel: "Are you comfortable with children in the home?",
        inputName: 'accommodation_homestay_add_comfortable_children_option',
        objInputName: 'are_you_comfortable_with_children_in_the_home_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'Canada,Australia,India',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-multi',
                optionMultiObj: [
                    {
                        inputLabel: 'Age of children you are comfortable with at home?',
                        inputName: 'accommodation_homestay_add_comfortable_children_specified',
                        objectName: 'accommodation_homestay_add_comfortable_children_specified',
                        inputType: 'radio-option',
                        required: false,
                        value: '',
                        obj: [
                            {
                                optionLabel: '12 years and under',
                                optionValue: '12 years and under',
                                optionType: 'strict'
                            },
                            {
                                optionLabel: '13+',
                                optionValue: '13+',
                                optionType: 'strict'
                            },
                            {
                                optionLabel: 'All of the above',
                                optionValue: 'All ages',
                                optionType: 'strict'
                            }
                        ]
                    }
                ],
                dependentClass: 'accommodation_homestay_add_comfortable_children_option'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_homestay_add_comfortable_children_specified',
        inputLabel: 'Specify',
        objInputName: 'specify_homestay_children_in_home',
        countryDependence: 'Canada,Australia,India',
        displayShow: false
    },
    {
        inputLabel: "Are you comfortable with other students in the home?",
        inputName: 'accommodation_homestay_add_comfortable_other_students_option',
        objInputName: 'other_students',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'Canada,Australia,India',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'option-other',
                optionName: 'accommodation_homestay_add_comfortable_other_students_specified',
                dependentClass: 'accommodation_homestay_add_comfortable_other_students_option',
                placeholder: 'Specify'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_homestay_add_comfortable_other_students_specified',
        inputLabel: 'Specify Student Preference',
        objInputName: 'other_students_specify_preference',
        countryDependence: 'Canada,Australia,India',
        displayShow: false
    },
    {
        inputLabel: "Will you accept children under age 6 in the home?",
        inputName: 'accommodation_homestay_add_under_children_option',
        objInputName: 'accept_family_with_children_under_age_6',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Do you smoke?",
        inputName: 'accommodation_homestay_add_smoke_option',
        objInputName: 'do_you_smoke_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'Canada,Australia,India,USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true,
        helpText: 'Please note that most families do not allow.'
    },
    {
        inputLabel: "Do you consume alcohol?",
        inputName: 'accommodation_homestay_add_alcohol_option',
        objInputName: 'do_you_consume_alcohol',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Will you accept a family that permits alcohol?",
        inputName: 'accommodation_homestay_add_alcohol_permits_option',
        objInputName: 'accept_a_family_that_consumes_alcohol',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Are you comfortable with pets in the home?",
        inputName: 'accommodation_homestay_add_comfortable_pets_option',
        objInputName: 'are_you_comfortable_with_pets_in_the_home_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'Canada,Australia,India',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'option-other',
                optionName: 'accommodation_homestay_add_comfortable_pets_specified',
                dependentClass: 'accommodation_homestay_add_comfortable_pets_option',
                placeholder: 'Specify'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Do you accept pets in home?",
        inputName: 'accommodation_homestay_add_comfortable_pets_option',
        objInputName: 'are_you_comfortable_with_pets_in_the_home_',
        inputType: 'radio-option',
        required: true,
        category: 'Accommodation-Homestay',
        value: '',
        countryDependence: 'USA',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-multi',
                optionMultiObj: [
                    {
                        inputLabel: 'Do you have any pet allergies?',
                        inputName: 'accommodation_homestay_pet_allergy_option',
                        objInputName: 'allergic_to_any_pets',
                        inputType: 'radio-option',
                        required: true,
                        value: '',
                        obj: [
                            {
                                optionLabel: 'No',
                                optionValue: 'No',
                                optionType: 'strict'
                            },
                            {
                                optionLabel: 'Yes',
                                optionValue: 'Yes',
                                optionType: 'option-other',
                                optionName: 'accommodation_homestay_pet_allergy_specified',
                                dependentClass: 'accommodation_pet_allergy_option',
                                placeholder: 'Please specify your pet allergies.'
                            }
                        ]
                    }
                ],
                dependentClass: 'accommodation_homestay_add_comfortable_pets_option'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: 'Do you have any pet allergies?',
        inputName: 'accommodation_homestay_pet_allergy_option',
        objInputName: 'allergic_to_any_pets',
        category: 'Accommodation-Homestay',
        countryDependence: 'USA',
        displayShow: false
    },
    {
        inputName: 'accommodation_homestay_pet_allergy_specified',
        inputLabel: 'Please specify your pet allergies.',
        objInputName: 'type_of_pet_allergy',
        category: 'Accommodation-Homestay',
        countryDependence: 'USA',
        displayShow: false
    },
    {
        inputName: 'accommodation_homestay_add_comfortable_pets_specified',
        inputLabel: 'Specify Pet Preference',
        objInputName: 'type_of_pet_not_preferred',
        category: 'Accommodation-Homestay',
        countryDependence: 'Canada,Australia,India',
        displayShow: false
    },
    {
        inputLabel: "Please tell your host about yourself in the space below.",
        inputName: 'accommodation_homestay_add_student_description',
        objInputName: 'tell_your_host_about_yourself',
        inputType: 'text-area',
        rows: '15',
        required: false,
        category: 'Accommodation-Homestay',
        value: '',
        displayShow: true,
        countryDependence: 'USA'
    },
    {
        inputLabel: "Please add any other requests if applicable.",
        inputName: 'accommodation_homestay_add_notes',
        objInputName: 'additional_notes_on_accommodation',
        inputType: 'text-area',
        rows: '15',
        required: false,
        category: 'Accommodation-Homestay',
        value: '',
        displayShow: true,
        countryDependence: 'USA'
    },
    {
        inputLabel: "Please add any other requests if applicable.",
        inputName: 'accommodation_additional_notes_residence',
        objInputName: 'additional_notes_on_accommodation',
        inputType: 'text-area',
        rows: '15',
        required: false,
        category: 'Accommodation-Residence',
        value: '',
        displayShow: true,
        countryDependence: 'USA'
    }
];

const fileUploadArray = [
    {
        inputLabel: "Passport Copy or ID (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'additional_passport_file',
        objInputName: 'passport_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "Passport Photo Page (for you and dependents) (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'additional_passport_file',
        objInputName: 'passport_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'ELS'
    },
    {
        inputLabel: "High School Diploma Copy (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'additional_high_school_file',
        objInputName: 'diploma_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'Greystone College'
    },
    {
        inputLabel: "Visa Copy (or the certificate of residencey, residence status, etc.) (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'additional_visa_file',
        objInputName: 'visa_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        residenceDependence: 'Australia',
        visaOptionDependence: 'Working Holiday'
    },
    {
        inputLabel: "Add additional files that are important for your enrollment process (jpeg,png,pdf; max. size: 1mb)<br> 1:",
        inputName: 'additional_files',
        objInputName: 'additional_files',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "2:",
        inputName: 'additional_files_2',
        objInputName: 'additional_files_2',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "3:",
        inputName: 'additional_files_3',
        objInputName: 'additional_files_3',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "4:",
        inputName: 'additional_files_4',
        objInputName: 'additional_files_4',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "5:",
        inputName: 'additional_files_5',
        objInputName: 'additional_files_5',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "6:",
        inputName: 'additional_files_6',
        objInputName: 'additional_files_6',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        displaySchool: 'Language School,Greystone College'
    },
    {
        inputLabel: "Genuine Temporary Entrant - Statement of Purpose Copy (jpeg,png,pdf; max. size: 1mb) (<a href='https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant#:~:text=%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8BAll,to%20apply%20for%20permanent%20residence' target='_blank'>More Info</a>)",
        helperHtml: '<p>Further documents might be required throughout the application process.</p>',
        inputName: 'additional_gte_file',
        objInputName: 'gte_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: true,
        displayShow: true,
        enableMultiple: false,
        countryDependence: 'Australia',
        nationalityDependence: 'Turkey',
        displaySchool: 'ILSC,Greystone College'
    },
    {
        helperHtml: '<p>Each application requires financial certification, IN ENGLISH, if requesting a Form I-20. This means you must provide proof that you will have enough funds to meet your living and tuition expenses, as well as living expenses for family members who might travel with you on student-dependent (F-2) visas. Any ONE of the following is acceptable:</p><ol class="alpha"><li>A current personal bank statement or an original letter from your bank, OR</li><li>Both a <a href="https://assets.contentstack.io/v3/assets/blte6ca0397941e65d8/bltb8a1447c0841a194/6298de5961670f0fb5dd0866/ELS_Affidavit_of_Support.pdf" target="_blank" download>letter/affidavit</a> of support from your parents or other source of support stating that they will be responsible for your expenses during your stay at ELS, AND a bank statement verifying their financial ability to meet your expenses, OR</li><li>A letter guaranteeing financial support from your employer, OR</li><li>An original scholarship letter from your government or other organization.</li></ol><p>Please upload the following files below before proceeding to the next step in the application.</p>',
        inputLabel: "Financial Certification (jpeg,png,pdf; max. size: 1mb)",
        inputName: 'additional_financial_cert_file',
        objInputName: 'financial_certification',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'ELS'
    },
    {
        inputLabel: "Affidavit Support (See Section B above) (jpeg,png,pdf; max. size: 1mb) (<a href='https://assets.contentstack.io/v3/assets/blte6ca0397941e65d8/bltb8a1447c0841a194/6298de5961670f0fb5dd0866/ELS_Affidavit_of_Support.pdf' target='_blank' download>download form</a>)",
        inputName: 'additional_affidavit_file',
        objInputName: 'affidivat_file_copy',
        inputType: 'file',
        category: 'Additional',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'ELS'
    },
    {
        inputLabel: "Student Contract (pdf)",
        inputName: 'student_contract_terms_and_conditions',
        objInputName: 'student_contract_terms_and_conditions',
        inputType: 'file',
        category: 'Summary',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'Language School',
        schoolDependence: 'ILSC Adult Student 16+,ILSC Families & Juniors 9-17'
    },
    {
        inputLabel: "Student Contract and Terms and Conditions (pdf)",
        inputName: 'student_contract_terms_and_conditions',
        objInputName: 'student_contract_terms_and_conditions',
        inputType: 'file',
        category: 'Summary',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'Greystone College',
        schoolDependence: 'Greystone College',
    },
    {
        inputLabel: "Supplemental Form (pdf)",
        inputName: 'terms_and_conditions_file',
        objInputName: 'terms_and_conditions_file',
        inputType: 'file',
        category: 'Summary',
        value: '',
        required: false,
        displayShow: true,
        enableMultiple: false,
        displaySchool: 'Language School',
        schoolDependence: 'ILSC Families & Juniors 9-17'
    }
];
const familyMemberInfoArray = [
    {
        inputLabel: "Family Full Name",
        inputName: 'additional_family_full_name',
        inputType: 'text',
        required: true,
        category: 'Additional',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Relationship",
        inputName: 'additional_family_relationship',
        inputType: 'text',
        required: true,
        category: 'Additional',
        value: '',
        displayShow: true
    }
];
const additionalInfoArray = [
    {
        inputLabel: 'Yes, for good and valuable consideration, the receipt and sufficiency of which is acknowledged, I, the parent or legal guardian, of the child (or legal guardian if the student is unable to enter into binding agreements in the jurisdiction in which the School operates) hereby agrees as above.',
        inputName: 'jr-waiver-confirmation',
        objInputName: 'jr_waiver_confirmation',
        category: 'Additional-Junior',
        countryDependence: 'Canada',
        required: true,
        displayShow: true
    },
    {
        inputLabel: 'Yes, I confirm that I have read, understood and agree to the above rules and consequences.',
        inputName: 'jr-rules-confirmation',
        objInputName: 'jr_rules_confirmation',
        category: 'Additional-Junior',
        countryDependence: 'Canada',
        required: true,
        displayShow: true
    },
    {
        inputLabel: 'Should my child require medical attention during the course, I consent to this and authorize an ILSC Team member to bring them to the doctor, clinic and/or hospital.',
        inputName: 'jr-medical-confirmation',
        objInputName: 'jr_medical_confirmation',
        category: 'Additional-Junior',
        countryDependence: 'Canada',
        required: true,
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Parent/Gaurdian First Name",
        inputName: 'parent_guardian_first_name',
        objInputName: 'parent_guardian_first_name',
        category: 'Additional-Junior',
        countryDependence: 'Canada',
        required: true,
        displayShow: true
    },
    {
        inputLabel: "Parent/Gaurdian Last Name",
        inputName: 'parent_guardian_last_name',
        objInputName: 'parent_guardian_last_name',
        category: 'Additional-Junior',
        countryDependence: 'Canada',
        required: true,
        displayShow: true
    },
    {
        inputLabel: "Do you need an airport transfer?",
        inputName: 'accommodation_airport_transfer_option',
        objInputName: 'airport_transfer',
        category: 'Additional',
        countryDependence: 'Canada,Australia,India,USA',
    },

    {
        inputLabel: "Airport",
        inputName: 'accommodation_airport_brisbane_option',
        objInputName: 'brisbane_airport',
        category: 'Additional',
        countryDependence: 'Australia',
        campusDependence: 'Brisbane'
    },
    {
        inputLabel: "Arrival Date",
        inputName: 'airport_arrival_datepicker',
        objInputName: 'arrival_date',
        category: 'Additional',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Departure Date",
        inputName: 'airport_departure_datepicker',
        objInputName: 'departure_date',
        category: 'Additional',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Airline and Flight Number (if applicable)",
        inputName: 'airpirort_airline_flight',
        objInputName: 'airline_and_flight_number',
        category: 'Additional',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {
        inputLabel: "Will you be booking unaccompanied minor service through your airline?",
        inputName: 'accommodation_airport_book_minor_option',
        objInputName: 'airline_unaccompanied_minor_service',
        category: 'Accommodation',
        countryDependence: 'Canada,Australia,India,USA',
    },
    {

        inputLabel: 'Do you need ILSC/Greystone College/ELS to organize your Overseas Student Health Coverage (medical insurance)?',
        inputName: 'insurance_option',
        objInputName: 'medical_insurance',
        inputType: 'radio',
        required: true,
        category: 'Additional',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict',
            }
        ],
        displayShow: false
    },
    {
        inputLabel: 'Medical Insurance Start Date',
        inputName: 'medical_start_datepicker',
        objInputName: 'medical_insurance_start_date',
        inputType: 'date-time',
        required: false,
        category: 'Additional',
        value: '',
        displayShow: false
    },
    {
        inputLabel: 'Medical Insurance End Date',
        inputName: 'medical_end_datepicker',
        objInputName: 'medical_insurance_end_date',
        inputType: 'date-time',
        required: false,
        category: 'Additional',
        value: '',
        displayShow: false
    },
    {
        inputLabel: 'Emergency Contact',
        inputName: 'additional_emergency_contact_name',
        objInputName: 'name_of_emergency_contact',
        inputType: 'text',
        required: true,
        category: 'Additional',
        value: '',
        displayShow: true
    },
    {
        inputLabel: 'Emergency Contact Phone Number',
        inputName: 'additional_emergency_contact_phone',
        objInputName: 'emergency_contact_phone__',
        inputType: 'phone',
        required: true,
        category: 'Additional',
        value: '',
        displayShow: true
    },
    {
        inputLabel: 'Emergency Contact Email',
        inputName: 'additional_emergency_contact_email',
        objInputName: 'emergency_contact_email',
        inputType: 'email',
        required: true,
        category: 'Additional',
        value: '',
        displayShow: true
    },
    {
        inputLabel: "Is there any health-related information you would like to share with us?",
        inputName: 'additional_health_condition_option',
        objInputName: 'do_you_have_any_physical_or_mental_medical_conditions_',
        inputType: 'radio-option',
        required: true,
        category: 'Additional',
        countryDependence: 'Australia',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'additional_health_condition_specified',
                dependentClass: 'additional_health_condition_option',
                placeholder: 'Please specify with details'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Do you have any health conditions we should be aware of before you enroll in studies with us?",
        inputName: 'additional_health_condition_option',
        objInputName: 'do_you_have_any_physical_or_mental_medical_conditions_',
        inputType: 'radio-option',
        required: true,
        category: 'Additional',
        countryDependence: 'Canada',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'additional_health_condition_specified',
                dependentClass: 'additional_health_condition_option',
                placeholder: 'Please specify with details'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Do you have any medical conditions we should be aware of?",
        inputName: 'additional_health_condition_option',
        objInputName: 'do_you_have_any_physical_or_mental_medical_conditions_',
        inputType: 'radio-option',
        required: true,
        category: 'Additional',
        schoolParentDependence: 'ELS',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'additional_health_condition_specified',
                dependentClass: 'additional_health_condition_option',
                placeholder: 'Specify'
            }
        ],
        displayShow: true
    },
    {
        inputName: 'additional_health_condition_specified',
        inputLabel: 'Specify Health Condition',
        objInputName: 'student_s_physical_or_mental_medical_conditions',
        displayShow: false
    },
    {
        inputLabel: "Are you travelling with family members?",
        inputName: 'additional_travel_family_members_option',
        objInputName: 'travelling_with_family_members',
        inputType: 'radio-option',
        omitProgramType: 'Online',
        required: true,
        category: 'Additional',
        schoolParentDependence: 'ILSC',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-add',
                dependentClass: 'additional_travel_family_members_option',
                addClass: 'additional-family-member',
                buttonLabel: 'Add Family Member',
            }
        ],
        displayShow: true
    },
    {
        inputLabel: "Are you travelling with a group?",
        inputName: 'additional_travelling_group_option',
        objInputName: 'travelling_with_a_group',
        inputType: 'radio-option',
        omitProgramType: 'Online',
        required: true,
        category: 'Additional',
        schoolParentDependence: 'ILSC',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'option-other',
                optionName: 'accommodation_travelling_group_specified',
                dependentClass: 'additional_travelling_group_option',
                placeholder: 'Please let us know the Full Name and Relationship of whom you will be travelling with.'

            }
        ],
        displayShow: true
    },
    {
        inputName: 'accommodation_travelling_group_specified',
        inputLabel: 'Please let us know the Full Name and Relationship of whom you will be travelling with.',
        objInputName: 'name_of_travelling_group',
        displayShow: false
    },
    {
        inputLabel: 'Have you already been accepted to a US institution?',
        inputName: 'additional_accepted_college_option',
        objInputName: 'has_the_student_already_been_accepted_to_a_us_institution_',
        displayShow: false
    },
    {
        inputName: 'accommodation_accepted_college_specified',
        inputLabel: 'Please write the name of the US Institution below.',
        objInputName: 'name_of_the_us_institution',
        displayShow: false
    },
    {
        inputLabel: "Do you need a custodian letter or a minor consent form?",
        inputName: 'additional_minor_consent_form_option',
        objInputName: 'custodian_letter',
        inputType: 'radio-option',
        required: true,
        category: 'Additional',
        schoolParentDependence: 'ILSC',
        value: '',
        ageMax: '18',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
                optionType: 'strict'
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
                optionType: 'strict'
            }
        ],
        displayShow: true
    },
    {
        inputLabel: 'Medical Name:',
        inputName: 'medical_name',
        objInputName: 'medical_name',
        inputType: 'text',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Does your child take any medication(s)?",
        inputName: 'medical_medicine_option',
        objInputName: 'child_medication_option',
        required: true,
        category: 'Additional-Junior-Medical',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        value: '',
        displayShow: false,
    },
    {
        inputLabel: 'Dosage:',
        inputName: 'medical_dosage',
        objInputName: 'medical_dosage',
        inputType: 'text',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Is this a Controlled Drug?",
        inputName: 'medical_controlled_drug',
        objInputName: 'medical_controlled_drug',
        inputType: 'radio-option',
        required: true,
        category: 'Additional-Junior-Medical',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
            }
        ],
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: 'Method of administration:',
        inputName: 'medical_method_administration',
        objInputName: 'medical_method_administration',
        inputType: 'text',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: 'Time of administration:',
        inputName: 'medical_time_administration',
        objInputName: 'medical_time_administration',
        inputType: 'text',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Medication Administration Start Date:",
        inputName: 'medication_administration_start_date',
        objInputName: 'medication_administration_start_date',
        inputType: 'date-time',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Medication Administration End Date:",
        inputName: 'medication_administration_end_date',
        objInputName: 'medication_administration_end_date',
        inputType: 'date-time-expiry',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Specific Instructions for Medication Administration:",
        inputName: 'medical_administration_instructions',
        objInputName: 'medical_administration_instructions',
        inputType: 'text-area',
        rows: '5',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Is this medication to be self-administered by the child?",
        inputName: 'medical_self_administer',
        objInputName: 'medical_self_administer',
        inputType: 'radio-option',
        required: true,
        category: 'Additional-Junior-Medical',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        value: '',
        obj: [
            {
                optionLabel: 'No',
                optionValue: 'No',
            },
            {
                optionLabel: 'Yes',
                optionValue: 'Yes',
            }
        ],
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Potential side effects of Medication:",
        inputName: 'medical_side_effects',
        objInputName: 'medical_side_effects',
        inputType: 'text-area',
        rows: '5',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Plan of Management for Side Effects:",
        inputName: 'medical_management_side_effects',
        objInputName: 'medical_management_side_effects',
        inputType: 'text-area',
        rows: '5',
        required: true,
        category: 'Additional-Junior-Medical',
        value: '',
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        displayShow: true,
        disabled: true
    },
    {
        inputLabel: "Attachment *: A doctor's note or a copy of the prescription:",
        inputName: 'medical_prescription_note',
        objInputName: 'medical_prescription_note',
        inputType: 'file',
        category: 'Additional-Junior-Medical',
        displayShow: true,
        required: true,
        schoolParentDependence: 'ILSC',
        schoolDependence: 'Junior',
        disabled: true
    }

];

const jrWaiverCAArray = [
    {
        textVal: 'I confirm that my child is capable of participating safely in the full program and all activities unless I advise you otherwise in writing and I acknowledge that such participation involves risks and hazards incidental thereto all of which are assumed by me. I agree to be responsible for any extra expenses incurred by my child or by the School or its employees, homestay families, Uniglobe Specialty Travel Ltd. DBA West Trek Tours., or other third-party service providers or representatives and their respective officers, employees and agents.'
    },
    {
        textVal: 'I hereby waive, release and absolve and agree to indemnify and save harmless the School, its employees, homestay families, Uniglobe Specialty Travel Ltd. DBA West Trek Tours., The Bubble (Toronto), Rock Oasis (Toronto), The Hive (Vancouver) or other third-party service providers or representatives and their respective officers, employees and agents from any and all liability on any basis, whether in contract, tort or otherwise, arising from my child\'s participation in their program, including damages of any kind and nature whatsoever, except such as results solely from its or their willful neglect or willful default.'
    },
    {
        textVal: 'Unless I have expressed in writing my choice to opt out, I acknowledge and accept that during my child\'s participation in the ILSC Junior Camp program, my child may be photographed, video taped or audio taped and I hereby grant ILSC unrestricted and non-expiring permission and all rights to use or license such media for any advertising or promotional purposes that ILSC may deem appropriate, and I waive any right to any royalties related to the use of the same.'
    },
    {
        textVal: 'For students attending our Canadian programs, the laws applicable in the province of: British Columbia shall govern this <b>Waiver</b> if attending Junior Camp programs offered by ILSC-Vancouver; Ontario shall govern this <b>Waiver</b> if attending Junior Camp programs offered by ILSC-Toronto; Quebec shall govern this Waiver if attending Junior Camp programs offered by ILSC-Montreal LLC. I accept the courts of the province/state in which I am attending School. If a portion of this <b>Waiver</b> shall be found to be wholly or partially invalid, this Waiver will be interpreted as if the invalid portion had not been a part of this <b>Waiver</b>.'
    },
    {
        textVal: 'This <b>Waiver</b> shall be effective and binding upon my heirs, next of kin, executors, administrators, families or representatives.'
    },
    {
        textVal: 'I understand that there are times during the Junior Camp program when my child may use public or chartered transportation to participate in field trips to local parks, museums, etc. and i give permission for my child to attend these field trip and and where necessary travel in passenger vans, automobiles, buses etc. that are operated by licensed, third-party, transportation companies.'
    },
    {
        textVal: 'I agree and acknowledge that should my child be refused entry at any border crossing, or should a school activity itinerary be necessarily altered or otherwise interrupted due to acts of a political or social nature, or due to a natural “Act of God”, neither the school nor its employees, homestay families, third-party service providers, nor representatives shall be held responsible for any additional costs or expenses which my child or I, may incur as a result of such occurrence.'
    },
    {
        textVal: 'In signing this <b>Waiver</b>, I am not relying upon any oral or written statements made by the School or its employees, homestay families, Uniglobe Specialty Travel Ltd. DBA West Trek Tours., or other third-party service providers or representatives other than as written in this <b>Waiver</b>.'
    },
    {
        textVal: 'I have read and fully understand the contents of this <b>Waiver</b> and I am aware that by signing this Waiver, I am waiving certain legal rights which I or my family, next of kin, executors, administrators, and assigns may have against the School or its employees, homestay families, Uniglobe Specialty Travel Ltd. DBA West Trek Tours., The Bubble (Toronto), Rock Oasis (Toronto), The Hive (Vancouver) or other third-party service providers, or representatives.'
    }

];

const insideCountryHtml = '<label>Are you currently inside Canada?<sup>*</sup><span class="footnote">If yes, please submit your Study Permit or your Canadian visa (TRV or eTA) with your flight details that shows your arrival date in Canada. This information it&apos;s required to process your registration.</span></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_inside_canada" id="inside-question-no" checked required><label class="form-check-label" for="inside-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_inside_canada" id="inside-question-yes" required><label class="form-check-label" for="inside-question-yes">Yes</label></div>',
    insidePermitFileHtml = '<div class="form-group inside-file-input study-hide"><label for="inside-permit-file">(Upload) Study Permit or your Canadian visa (TRV or eTA) (jpeg,png,pdf; max. size: 1mb)</label><input type="file" onchange="checkSize(\'inside-permit-file\')" name="program_inside_permit_file_upload" id="inside-permit-file" accept="jpeg,jpg,pdf,png" data-bind="study_permit_or_canadian_visa" disabled><input type="hidden" name="program_inside_permit_file_upload" value="" readonly disabled><div class="valid-feedback"></div></div>',
    insideFlightFileHtml = '<div class="form-group inside-file-input study-hide"><label for="inside-flight-file">(Upload) Flight details that shows your arrival date in Canada (jpeg,png,pdf; max. size: 1mb)</label><input type="file" onchange="checkSize(\'inside-flight-file\')" name="program_inside_flight_file_upload" id="inside-flight-file" accept="jpeg,jpg,pdf,png" data-bind="flight_details" disabled><input type="hidden" name="program_inside_flight_file_upload" value="" readonly disabled><div class="valid-feedback"></div></div>',
    shirtRadioHtml = '<label>Choose T-shirt size for camp participant:<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="Small" type="radio" name="additional_shirt_size" id="shirt-size-small" required><label class="form-check-label" for="shirt-size-small">Small</label></div><div class="form-check"><input class="form-check-input" value="Medium" type="radio" name="additional_shirt_size" id="shirt-size-medium" required><label class="form-check-label" for="shirt-size-medium">Medium</label></div><div class="form-check"><input class="form-check-input" value="Large" type="radio" name="additional_shirt_size" id="shirt-size-large" required><label class="form-check-label" for="shirt-size-large">Large</label></div><div class="form-check"><input class="form-check-input" value="X-Large" type="radio" name="additional_shirt_size" id="shirt-size-xl" required><label class="form-check-label" for="shirt-size-xl">X-Large</label></div>',
    jrFamilyMemberButtonHtml = '<div class="form-group jr-family-member-form-input"><label for="add-jr-family-member">Please fill out additional family member information for each additional person attending.</label><div class="btn-container"><div id="add-jr-family-member" class="btn btn-orange-outline">Add Family Member</div></div><div class="jr-family-member-container"></div></div>',
    prolaHtml = '<div class="form-group"><label>Have you or your student taken the Pre-Arrival Language Placement test?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_prola_taken" id="prola-question-no" checked required><label class="form-check-label" for="prola-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_prola_taken" id="prola-question-yes" required><label class="form-check-label" for="prola-question-yes">Yes</label></div></div><div class="form-group disabled" id="prola-group"><label for="inputProlaNumber">ILSC General/Academic English Placement Test (if applicable)</label><input type="text" name="additional_prola_number" id="inputProlaNumber" disabled><div class="valid-feedback"></div></div>',
    usiHtml = '<div class="form-group"><label for="inputUsiNumber">USI Number</label><input type="text" name="additional_usi_number" id="inputUsiNumber"><div class="valid-feedback"></div></div>',
    visaRadioHtml = '<label>Have you ever been refused a visa for any country including Australia?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_refusal" id="visa-question-no" required><label class="form-check-label" for="visa-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_refusal" id="visa-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>',
    visaFileHtml = '<div class="form-group gte-file-input study-hide"><label for="gte-file">Upload Genuine Student Assessment - Statement of Purpose Copy (jpeg,png,pdf; max. size: 1mb) (<a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant#:~:text=%E2%80%8B%E2%80%8B%E2%80%8B%E2%80%8BAll,to%20apply%20for%20permanent%20residence" target="_blank">more info</a>)<br><span class="footnote">*Further documents might be required throughout the application process.</span></label><input type="file" onchange="checkSize(\'gte-file\')" name="program_gte_file_upload" id="gte-file" accept="jpeg,jpg,pdf,png" data-bind="gte_copy" disabled><input type="hidden" name="program_gte_file_upload" value="" readonly disabled><div class="valid-feedback"></div></div>',
    visaOptionUsHtml = '<label>What Visa will you apply for?<sup>*</sup></label><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio0" value="F-1" required><label class="form-check-label" for="studentVisaOptionRadio0">F-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio1" value="F-2" required=""><label class="form-check-label" for="studentVisaOptionRadio1">F-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio2" value="B-1" required=""><label class="form-check-label" for="studentVisaOptionRadio2">B-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio3" value="B-2" required=""><label class="form-check-label" for="studentVisaOptionRadio3">B-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio4" value="J-1" required=""><label class="form-check-label" for="studentVisaOptionRadio4">J-1</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio5" value="J-2" required=""><label class="form-check-label" for="studentVisaOptionRadio5">J-2</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio6" value="ESTA" required=""><label class="form-check-label" for="studentVisaOptionRadio6">ESTA</label></div><div class="form-check" data-category="Student"><input class="form-check-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio7" value="Resident/Green Card" required=""><label class="form-check-label" for="studentVisaOptionRadio7">Resident/Green Card</label></div><div class="form-check" data-category="Student"><input class="form-check-input other-input" type="radio" name="student_visa_option" id="studentVisaOptionRadio8" value="Other" required=""><label class="form-check-label" for="studentVisaOptionRadio8">Other</label></div><input type="text" class="dependent-target study-hide" data-target="student_visa_option" name="student_visa_option_other_specified" placeholder="Specify Other"><div class="valid-feedback"></div>',
    visaRadioUsHtml = '<label>Are you in possession of a valid US student visa and would like to transfer from another institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-no" required><label class="form-check-label" for="visa-transfer-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_transfer_us" id="visa-transfer-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div>',
    visaTransferInputUsHtml = '<div class="form-group visa-transfer-input study-hide"><label for="visa-transfer">Name of the institution you are attending?</label><input type="text" name="additional_visa_transfer_name" id="visa-transfer" disabled><div class="valid-feedback"></div></div>',
    visaTransferAttendanceInputUsHtml = '<div class="form-group visa-transfer-attendance-input study-hide"><label for="visa-transfer-attendance">What was your last date of attendance?</label><input type="date" name="another_institution_last_date_of_attendance" id="visa-transfer-attendance" disabled><div class="valid-feedback"></div></div>',
    visaFormRadioUsHtml = '<div class="i-form"><label>Do you need a Form I-20 to apply for a student visa?<sup>*</sup><sup><i class="fas fa-info-circle" data-container="body" data-toggle="popover" data-placement="right" data-trigger="hover" data-content="ELS Language Centers is authorized to provide you with a Certificate of Eligibility (Form I-20), which must be presented when applying for a student (F-1). Intensive and Semi-Intensive with a minumum of 4 weeks program are eligible for this visa type."></i></sup><div class="footnote">ELS Intensive and Semi-Intensive study programs are considered full-time study programs and are eligible for an I-20. The I-20 is required to apply for your F-1 student visa. Please note that the American Explorer program is not eligible for an I-20.</div></label><div class="form-check"><input type="hidden" value="No" name="additional_visa_form_us" disabled><input class="form-check-input" value="No" type="radio" name="additional_visa_form_us" id="visa-form-question-no" required><label class="form-check-label" for="visa-form-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_visa_form_us" id="visa-form-question-yes" required><label class="form-check-label" for="visa-question-yes">Yes</label></div></div>',
    visaFormAddDependentButtonHtml = '<div class="form-group visa-form-input study-hide"><label for="add-visa-dependent">Please list and dependents who will travel with you to the US and require an F-2 visa. You must enter dependent\'s name the same way it appears on the passport, and use a space for any special characters.</label><div class="btn-container"><div id="add-visa-dependent" class="btn btn-orange-outline">Add Dependent</div></div><div class="dependents-container"></div></div>',
    collegeRadioUsHtml = '<label>Do you plan on attending college or university?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_question_us" id="college-question-no" required><label class="form-check-label" for="college-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_question_us" id="college-question-yes" required><label class="form-check-label" for="college-question-yes">Yes</label></div>',
    collegeAcceptRadioUsHtml = '<div class="form-group college-acceptance study-hide"><label>Have you already been accepted to a US institution?<sup>*</sup></label><div class="form-check"><input class="form-check-input" value="No" type="radio" name="additional_college_accept_question_us" id="college-accept-question-no" required disabled><label class="form-check-label" for="college-accept-question-no">No</label></div><div class="form-check"><input class="form-check-input" value="Yes" type="radio" name="additional_college_accept_question_us" id="college-accept-question-yes" required disabled><label class="form-check-label" for="college-accept-question-yes">Yes</label></div></div>',
    collegeInputUsHtml = '<div class="form-group college-input study-hide"><label for="college-input">Please write the name of the US institution below</label><input type="text" name="additional_college_name" id="additional_college_name" disabled><div class="valid-feedback"></div></div>',
    additionalNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program of study</label><textarea name="study_additional_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>',
    additionalOnlineNotesHtml = '<div class="form-group college-input study-show"><label for="additional-notes-input">Enter any additional notes regarding your program study</label><textarea name="study_additional_online_information_and_notes" id="additional-notes-input" cols="50" rows="10"></textarea><div class="valid-feedback"></div></div>',
    additionalCurrencyPaymentOptionHtml = '<div class="form-group study-show"><label for="study_additional_preferred_currency_payment">Choose preferred currency for payment<sup>*</sup></label><select class="form-control" id="study_additional_preferred_currency_payment" name="study_additional_preferred_currency_payment" required><option disabled selected value="">Choose preferred currency for payment</option><option value="CAD">CAD (Canadian dollar)</option><option value="AUD">AUD (Australian dollar)</option></select><div class="valid-feedback"></div></div>',
    australiaVisaHtml = '<label> Are you applying for your visa outside or inside Australia?<sup>*</sup> </label> <div class="form-check"> <input class="form-check-input" value="Outside" type="radio" name="additional_visa_apply" id="visa-question-yes" required> <label class="form-check-label" for="visa-question-yes">Outside</label> </div> <div class="form-check"> <input class="form-check-input" value="Inside" type="radio" name="additional_visa_apply" id="visa-question-no" required> <label class="form-check-label" for="visa-question-no">Inside</label> </div> <div class="form-group australia-visa-container study-hide" style="margin-left:20px;"> <div class="form-group current-visa-container"> <label> What kind of visa you are currently holding?<sup>*</sup> </label> <div class="form-check"> <input class="form-check-input" value="Visitor Visa" type="radio" name="additional_australia_visa" id="australia-visa-visitor" disabled required> <label class="form-check-label" for="australia-visa-visitor">Visitor Visa</label> </div> <div class="form-check"> <input class="form-check-input" value="Student Visa 500" type="radio" name="additional_australia_visa" id="australia-visa-student-500" disabled required> <label class="form-check-label" for="australia-visa-student-500">Student Visa 500</label> </div> <div class="form-check"> <input class="form-check-input" value="Student Visa Dependant" type="radio" name="additional_australia_visa" id="australia-visa-student-dependant" disabled required> <label class="form-check-label" for="australia-visa-student-dependant">Student Visa Dependant</label> </div> <div class="form-check"> <input class="form-check-input" value="Working Holiday" type="radio" name="additional_australia_visa" id="australia-visa-working-holiday" disabled required> <label class="form-check-label" for="australia-visa-working-holiday">Working Holiday</label> </div> <div class="form-check"> <input class="form-check-input" value="Temporary Work Activity Visa (408 - COVID)" type="radio" name="additional_australia_visa" id="australia-visa-temp" disabled required> <label class="form-check-label" for="australia-visa-temp">Temporary Work Activity Visa (408 - COVID)</label> </div> <div class="form-check"> <input class="form-check-input" value="Other type of Visa" type="radio" name="additional_australia_visa" id="australia-visa-other" disabled required> <label class="form-check-label" for="australia-visa-other">Other type of Visa</label> </div> <div class="form-group study-hide australia-visa-other-specified-container"> <label for="australia-visa-other-specify">Student Visa Other Specify<sup>*</sup></label><input type="text" name="additional_australia_visa_specify" id="australia-visa-other-specify" required disabled><div class="valid-feedback"></div> </div> </div> <div class="form-group"> <label for="visa-letter-file">Upload a copy of your current visa letter (jpeg,png,pdf; max. size: 1mb) <sup>*</sup></label> <input type="file" onchange="checkSize(\'visa-letter-file\')" name="additional_australia_visa_letter_file_upload" id="visa-letter-file" accept="jpeg,jpg,pdf,png" data-bind="australia_current_visa_letter" disabled required> <input type="hidden" name="additional_australia_visa_letter_file_upload" value="" readonly disabled> <div class="valid-feedback"></div> </div> <div class="form-group"> <label> Are you currently studying at ILSC or Greystone College?<sup>*</sup> </label> <div class="form-check"> <input class="form-check-input" value="No" type="radio" name="additional_australia_current_study" id="australia-current-study-no" disabled required> <label class="form-check-label" for="australia-current-study-no">No</label> </div> <div class="form-check"> <input class="form-check-input" value="Yes" type="radio" name="additional_australia_current_study" id="australia-current-study-yes" disabled required> <label class="form-check-label" for="australia-current-study-yes">Yes</label> </div> <div class="form-group study-hide australia-student-id-container"> <label for="australia-student-id">Please provide us your current studying campus and student ID number<sup>*</sup></label><input type="text" name="additional_australia_student_id" id="australia-student-id" required disabled><div class="valid-feedback"></div> </div> </div> <div class="form-group"> <label for="visa-previous-file">Upload all the visa copies you have previously since arriving in Australia (jpeg,png,pdf; max. size: 1mb) <sup>*</sup><br><span class="footnote">(You can upload max. 5 files by selecting multiple files at the same time in the select window.)</span></label> <input type="file" onchange="checkSize(\'visa-previous-file\')" name="additional_australia_visa_previous_file_upload" id="visa-previous-file" accept="jpeg,jpg,pdf,png" data-bind="visa_copy" disabled multiple> <input type="hidden" name="additional_australia_visa_previous_file_upload" value="" readonly disabled> <div class="valid-feedback"></div> </div> <label> Are you going to study with another education provider in Australia after you finish your course at ILSC/Greystone College?<sup>*</sup> </label> <div class="form-check"> <input class="form-check-input" value="No" type="radio" name="additional_study_other" id="study-other-no" required> <label class="form-check-label" for="study-other-no">No</label> </div> <div class="form-check"> <input class="form-check-input" value="Yes" type="radio" name="additional_study_other" id="study-other-yes" required> <label class="form-check-label" for="study-other-yes">Yes</label> </div> <div class="form-group study-other-australia-container study-hide" style="margin-left:20px;"> <div class="form-group"> <label for="study-other-provider">Write the name of the Education Provider<sup>*</sup></label><input type="text" name="australia_study_other_provider" id="study-other-provider" required disabled><div class="valid-feedback"></div> </div> <div class="form-group"> <label for="loa-file">Upload LoA (Letter of Acceptance) (jpeg,png,pdf; max. size: 1mb)</label> <input type="file" onchange="checkSize(\'loa-file\')" name="additional_australia_loa_file_upload" id="loa-file" accept="jpeg,jpg,pdf,png" data-bind="loa" disabled> <input type="hidden" name="additional_australia_loa_file_upload" value="" readonly disabled> <div class="valid-feedback"></div> </div> <div class="form-group"> <label for="coe-file">Upload CoE (Confirmation of Enrollment) (jpeg,png,pdf; max. size: 1mb)</label> <input type="file" onchange="checkSize(\'coe-file\')" name="additional_australia_coe_file_upload" id="coe-file" accept="jpeg,jpg,pdf,png" data-bind="coe" disabled> <input type="hidden" name="additional_australia_coe_file_upload" value="" readonly disabled> <div class="valid-feedback"></div> </div> </div> </div>';

const validateForm = function (dataStepVar, dataFormArr, validCheck) {
    let validArray = [],
        dataForm = dataFormArr.split(',');

    if (validCheck == 'true') {
        for (let i = 0; i < dataForm.length; i++) {
            $("form#" + dataForm[i]).validate({
                ignore: [],
                errorPlacement: function (error, element) {
                    if (element.is(":radio")) {
                        error.insertBefore(element);
                    }
                    else { // This is the default behavior of the script
                        error.insertAfter(element);
                    }
                },
                rules: {
                    'program_startdate_primary-input': {
                        required: true
                    }
                },
                messages: {
                    'program_startdate_primary-input': {
                        required: "Please select a program start date. If none available, you may not be qualified for any programs due to your age. Please contact our representatives to inquire."
                    }
                },
                errorElement: 'label',
                focusInvalid: false,
                invalidHandler: function (form, validator) {

                    if (!validator.numberOfInvalids())
                        return;

                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top - 140
                    }, 100);

                }
            });

            let className = 'form#' + dataForm[i];

            if ($(className).valid()) {
                validArray.push(true);
            } else {
                validArray.push(false);
            }

        }
    } else {

        validArray.push(true);
    }

    if (!validArray.includes(false)) {

        updateLocalJson(dataStepVar);
        submitForm(dataStepVar);
        $('.fixed-side-menu .' + dataStepVar).addClass('complete');
        if (dataStepVar == 'additional-select') {
            $('.fixed-side-menu .submit-select').addClass('complete');
        }
        return true;

    } else {
        return false;
    }
};

const createAdvisorInfo = function () {
    let queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        enableEnrolmentAdvisor = urlParams.get('enrolmentAdvisorStatus'),
        selectedSchool = schoolVal == 'ILSC' ? 'Language School' : schoolVal == 'ELS' ? 'ELS' : 'Language School',
        queryParam = '&school__in=' + selectedSchool;
    api_url = api_url = apiUrl + enrolmentAdvisorTable + '/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);
    advisorArray = [];

    if (enableEnrolmentAdvisor !== null) {
        $.get(api_url).done(function (data) {
            let dataObject = data.results;

            if (dataObject.length > 0) {
                for (let i = 0; i < dataObject.length; i++) {
                    advisorArray.push({
                        'label': dataObject[i].values.advisor_name,
                        'value': dataObject[i].values.advisor_id
                    })
                }
            }
            localStorage.setItem('advisor-array', JSON.stringify(advisorArray));
        });


    }

};

const hideShowEnrolmentAdvisorForm = function (enable) {
    let el = 'select:not(#enrolmentAdvisor), input:not(#enrolmentAdvisor)',
        parentEl = '.advisor-information-form';
    $('select#enrolmentAdvisor option:first-child').prop('disabled', false);
    if (enable !== null) {
        $(el, parentEl).parent().addClass('study-hide').removeClass('study-show');
        $(el, parentEl).prop('disabled', true);
        if (enable != '') {
            $('select#enrolmentAdvisor option[data-id=' + enable + ']').prop('selected', true);
        }
    } else {
        $(el, parentEl).parent().addClass('study-show').removeClass('study-hide');
        $(el, parentEl).prop('disabled', false);
    }
}

const getExchangeRate = function () {
    let fromCurrency = currencyVal,
        toCurrency = $('input[name=program_country_currency]').val(),
        exHost = 'api.frankfurter.app';

    if (fromCurrency != toCurrency) {
        let fetchedData = fetch("https://" + exHost + "/latest?from=" + fromCurrency + "&to=" + toCurrency)
            .then(resp => resp.json())
            .then((data) => {
                let conversionNum = data.rates[toCurrency];
                $('input[name=xchange-rate]').val(round(conversionNum, 2).toFixed(2));
            }).catch(e => {
                $('input[name=xchange-rate]').val(1);
            });
    } else {
        $('input[name=xchange-rate]').val(1);
    }
};
const xConversion = function (num) {
    let xRate = $('input[name=xchange-rate]').val(),
        price = xRate * num;
    price = price.toFixed(2);
    return price;
};
const currencyToCountryFormatter = function (num, curr) {
    priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, currencyDisplay: 'code' }).format(num);
    return priceFormat;
};

const printDropSelect = function (className) {

    $(className + " li.dropdown-item").on("click", function () {
        let getValue = $(this).attr('data-value');
        $(this).parent().siblings("button.dropdown-select").attr('data-selected', getValue);
        $(this).parent().siblings("button.dropdown-select").find('span.selected-text').text(getValue);

    });
}
$(".section-application-form .step-container .btn-container .btn.prev").on("click", function () {
    let dataStep = $(this).attr('data-step'),
        queryString = document.location.search,
        dict = parseQueryStringToDictionary(queryString),
        affiliateEnable = dict.affiliate ? true : false;
    window.scrollTo(0, 0);
    $('.step-breadcrumb-container').show();

    if (!affiliateEnable) {
        if (dataStep == 'additional-select') {
            let schoolNameSelected = $('input[name=program_school]:checked').val(),
                countrySelected = $('input[name=program_country]').val(),
                currentSlide = $('.application-step-form-slide').slick('slickCurrentSlide');

            if (schoolNameSelected == 'ELS Youth') {
                $('.application-step-form-slide').slick('slickGoTo', currentSlide - 2);
            } else {
                if (countrySelected == 'Online') {
                    $('.application-step-form-slide').slick('slickGoTo', currentSlide - 2);
                } else {
                    $('.application-step-form-slide').slick('slickPrev');
                }
            }
        } else {
            $('.application-step-form-slide').slick('slickPrev');
        }
    }

});
const resetNextButton = function (stepClass) {
    $(stepClass + " button.next").removeClass('enable').addClass('disable');
};
const enableNextButton = function (stepClass) {
    $(stepClass + " button.next").removeClass('disable').addClass('enable')
};


const subtractYears = function (numOfYears, date) {

    let d = new Date(date.getTime());

    d.setFullYear(date.getFullYear() - parseInt(numOfYears));

    return d.getTime();

}

$(document).on('click', 'input.other-input', function () {
    if (!$(this).parent().hasClass('multi-target')) {
        $(this).parent().siblings('.dependent-target:lt(4)').removeClass('study-hide').addClass('study-show').attr('disabled', false).children('input').attr('disabled', false);
    } else {
        $(this).parent().next('input').removeClass('study-hide').addClass('study-show').attr('disabled', false);
    }
});
$(document).on('click', 'input.indenpendent-input', function () {
    if ($(this).parent().hasClass('multi-target')) {
        $(this).parent().siblings('input.dependent-target').not('other-input').removeClass('study-show').addClass('study-hide').attr('disabled', true).children('input').attr('disabled', true);
    } else {
        $(this).parent().siblings('.dependent-target:lt(4)').removeClass('study-show').addClass('study-hide').attr('disabled', true).children('input').attr('disabled', true);
    }
});
$(document).on('change', 'input:file', function () {
    if ($(this).get(0).files.length !== 0) {
        $(this).next('input:hidden').val($(this).get(0).files[0].name);
    }
});

const returnComboVal = function (inputName) {
    let valueCombo = inputName.indexOf('combo') != -1 ? inputName.substr(inputName.indexOf('_combo-') + 7, 99) : '1';
    return valueCombo;
}

const returnComboName = function (inputName) {
    let nameCombo = inputName.indexOf('combo') != -1 ? inputName.substr(inputName.indexOf('_combo'), 99) : '';
    return nameCombo;
}

const calculate_age = function (dob, dateInput) {
    var diff_ms = dateInput - dob;
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
const addWeeks = function (date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);

    return date;
};

const subtractWeeks = function (date, weeks) {
    date.setDate(date.getDate() - 7 * weeks);

    return date;
};

$(document).ready(function () {
    let item_length = 5;
    $('.step-breadcrumb-container .last-step').text(item_length);
    $('.application-step-form-slide').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        let slideNumber = currentSlide + 1,
            nextNumber = slideNumber + 1,
            prevNumber = slideNumber - 1,
            classNumber = 'step-' + (slideNumber),
            prevClassNumber = 'step-' + (prevNumber),
            nextClassNumber = 'step-' + (nextNumber);
        $('.current-step').text(slideNumber);
        $(".step-breadcrumb-container .step-number >div").each(function () {

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        $(".fixed-side-menu ul >li").each(function () {

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        $('.' + classNumber).addClass('active');
        //$('.'+nextClassNumber+',.'+prevClassNumber).removeClass('active');
    });

});

$(document).on('click', '.fixed-side-menu ul li.complete a', function () {
    let step = $(this).parent().attr('data-step'),
        dataForm = $('.slick-current button.next').attr('data-form'),
        validCheck = $('.slick-current button.next').attr('data-check'),
        dataInit = $('.slick-current .step-container').attr('data-init') == 'false' ? false : true;

    if ($('.slick-current').attr('data-slick-index') != 5) {
        if (dataInit) {
            submitVar = validateForm(step, dataForm, validCheck) == true ? true : false;
        } else {
            submitVar = true;
        }
    } else {
        submitVar = true;
    }

    if (submitVar) {
        step = $(this).parent().attr('data-step');
        if (step == 5) {
            printHubspotFileForm();
        } else if (step == 6) {
            printApplicationSummary();
        }
        $('.application-step-form-slide').slick('slickGoTo', step - 1);
        window.scrollTo(0, 0);
    }

});

const returnDocumentLang = function () {
    let langCode = document.documentElement.lang != 'en' ? document.documentElement.lang : '';
    return langCode;

}

const round = function (value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

$(document).on('click', '.edit-form', function () {
    step = $(this).attr('data-step');
    if (step == 5) {
        printHubspotFileForm();
    }
    $('.application-step-form-slide').slick('slickGoTo', step - 1);
    window.scrollTo(0, 0);
});
$(document).on('change', 'form[data-submit=true]', function () {
    dataStep = $(this).closest('.step-container').find('button.next').attr('data-step');
    $('.fixed-side-menu ul li.' + dataStep).removeClass('complete').nextAll('li').removeClass('complete');
    $(this).attr('data-submit', false);
});
$(document).on('change', 'select[name=study_additional_preferred_currency_payment]', function () {
    let selectedCurrency = $(this).find(':selected').val(),
        selectedSchool = $('input[name=program_school]:checked').attr('id'),
        queryParam = '&currency__in=' + selectedCurrency + '&schools__in=' + selectedSchool;
    api_url = apiUrl + '93639180/rows?portalId=' + portalId + queryParam;
    api_url = encodeURI(api_url);
    priceArray = [];
    $('input[name=program_country_currency]').val(selectedCurrency);

    /*$.get(api_url).done(function (data) {
        let dataObject = data.results;
        
        if (dataObject.length > 0) {
            for (let i = 0; i < dataObject.length; i++) {
               priceArray.push(dataObject[i].values.price);
            }
            depositVal = Math.min(priceArray);
            $('input[name=calculated-deposit-amt]').val(depositVal.toFixed(2));
        }else{
            $('input[name=calculated-deposit-amt]').val(parseInt(depositAmt).toFixed(2));
        }
    });
    */

});
$(document).on('click', 'button[data-type=btn-proceed-payment]', function () {
    sendPaymentEnrolForm();
    printPaymentSummary();
    $('.application-step-form-slide').slick('slickNext');
    window.scrollTo(0, 0);
});
$(document).on('click', 'button[data-action=btn-pay]', function () {
    $(this).addClass('loader');
    callPaymentStripe();
});
const checkCookieRedirectModal = function () {

    let isCookie = getInitCookie('__hstc');

    if (!navigator.cookieEnabled || isCookie == null) {
        htmlString = "<h3>Note: Our Application form requires that you have <a href='http://www.whatarecookies.com/enable.asp' rel='noopener' target='_blank'>http cookies turned on</a> to ensure we accurately receive your details. Please check your cookies settings before you start, and make sure you are not browsing in private or incognito mode. Once you have changed your settings, please refresh the page to start using the quote tool.</h3><h4 class='center'><a href='#' onClick='location.reload();'>refresh page</a></h4>";
        //$('.section-application-form .app-step-container').html(htmlString);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    checkCookieRedirectModal();
});

$(window).scroll(function () {
    var threshold = 50;
    if ($(window).scrollTop() >= threshold)
        $('nav.fixed-side-menu').addClass('fixed');
    else
        $('nav.fixed-side-menu').removeClass('fixed');
    var check = $(".section-application-form").height() - $("nav.fixed-side-menu").height() - 21;
    if ($(window).scrollTop() >= check)
        $('nav.fixed-side-menu').addClass('bottom');
    else
        $('nav.fixed-side-menu').removeClass('bottom');
});

const getCookie = function (name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
};

const ucfirst = function (str, force) {
    str = force ? str.toLowerCase() : str;
    return str.replace(/(\b)([a-zA-Z])/,
        function (firstLetter) {
            return firstLetter.toUpperCase();
        });
}
const titleCase = function (str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
};
const checkSize = function (id) {
    var inputElement = $('#' + id),
        elementId = document.getElementById(id);

    inputElement.siblings('label.error').remove();

    var files = elementId.files; //this is an 
    var fileLimit = files.length > 1 ? 4000 : 1000; // limit the file size goes here
    var fileSize = 0;
    if (inputElement.val() != '') {
        nameArr = [],
            totalSize = 0;
        for (var i = 0; i < files.length; i++) {
            var fileName = files[i].name;
            nameArr.push(fileName);
            totalSize += files[i].size;
        }
        fileSize = totalSize;
        if (files.length > 1) {
            inputElement.siblings('.valid-feedback').html(nameArr.toString());
        } else {
            inputElement.siblings('.valid-feedback').empty();
        }
    }

    var fileSizeInKB = (fileSize / 1024); // this would be converted byte into kilobyte

    if (files.length < 6) {
        if (fileSizeInKB < fileLimit) {
            inputElement.siblings('label.error').remove();
        } else {
            showLimit = parseInt(fileLimit / 1000);
            messageHtml = '<label id="' + id + '-error" class="error" for="' + id + '">File is too large. Max file size accepted: ' + showLimit + 'mb</label>';
            inputElement.after(messageHtml);
            inputElement.val(''); // input form set to be empty
        }
    } else {
        messageHtml = '<label id="' + id + '-error" class="error" for="' + id + '">Exceeded max. number of files: 5 files max.</label>';
        inputElement.after(messageHtml);
        inputElement.val(''); // input form set to be empty
    }
}
$(document).on("keyup", '.student-information-form input[name*=name]', function () {
    // force: true to lower case all letter except first
    var cp_value = ucfirst($(this).val(), true);

    // to capitalize all words  
    //var cp_value= ucwords($(this).val(),true) ;


    $(this).val(cp_value);

});

const addSpinner = () => {
    $('.app-step-container').prepend('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
}

const removeSpinner = () => {
    $('.app-step-container .lds-ring').remove();
}
