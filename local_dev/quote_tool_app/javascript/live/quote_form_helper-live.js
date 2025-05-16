const parseQueryStringToDictionary = function(queryString) {
	var dictionary = {};
	
	// remove the '?' from the beginning of the
	// if it exists
	if (queryString.indexOf('?') === 0) {
		queryString = queryString.substr(1);
	}
	
	// Step 1: separate out each key/value pair
	var parts = queryString.split('&');
	
	for(var i = 0; i < parts.length; i++) {
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

const   agencyName = dict.a ? dict.a : '',
        agencyContactPerson = dict.f ? dict.f+' '+dict.l : '',
        agencyEmail = dict.e ? dict.e : '',
        agencyPhone = dict.t ? dict.t : '',
        agencyRegion = dict.r ? dict.r : '',
        appStatus = dict.status ? dict.status : '';

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
const countryInfoList = [
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

const studentInfoArray = [
    {
        inputLabel: 'Are you a student or are you an education agent/agency applying on behalf of a student?',
        inputName: 'online_applicant_status',
        objInputName: 'online_application_status',
        inputType: 'radio-option',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        groupClass: 'status',
        obj:[
            {
              optionLabel:'Agent',
              optionValue:'Agent',
              optionType:'strict'
            },
            {
                optionLabel:'Student',
                optionValue:'Student',
                optionType:'option-multi',
                optionMultiObj:[
                  {
                      inputLabel:'Are you currently working with an education agent/agency?',
                      inputName:'applicant_student_current_agency',
                      objectName:'are_you_currently_working_with_an_education_agent_agency_',
                      inputType: 'radio-option',
                      required: true,
                      value:'',
                      obj:[
                          {
                              optionLabel:'Yes',
                              optionValue:'Yes',
                optionType:'strict'
            },
            {
                              optionLabel:'No',
                              optionValue:'No',
                optionType:'strict'
            }
                      ]
                  },
                  {
                    inputLabel: 'Are you a current student at ELS?',
                    inputName: 'are_you_a_current_student',
                    objInputName: 'are_you_a_current_student',
                    inputType: 'radio-option',
                    required: true,
                    value:'',
                    obj:[
                        {
                            optionLabel:'Yes',
                            optionValue:'Yes',
                            optionType:'strict'
                        },
                        {
                            optionLabel:'No',
                            optionValue:'No',
                            optionType:'strict'
                        }
                    ]
                  }
              ],
              dependentClass:'online_applicant_status'
            }
        ],
        displayShow:true
    },
    {
        inputLabel: 'Are you currently working with an education agent/agency?',
        inputName: 'applicant_student_current_agency',
        objInputName: 'are_you_currently_working_with_an_education_agent_agency_',
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        groupClass: 'status',
        displayShow: false
    },
    {
        inputLabel: 'Will the student be over 18 upon arrival to the school?',
        inputName: 'applicant_age_status',
        objInputName: 'applicant_age_status',
        inputType: 'radio-option',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        groupClass: 'status',
        obj:[
            {
                optionLabel:'Yes',
                optionValue:'Yes',
                optionType:'strict'
            },
            {
                optionLabel:'No',
                optionValue:'No',
                optionType:'strict'
            }
        ],
        displayShow:true
    },
    {
        inputLabel: 'Are you a current student at ELS?',
        inputName: 'are_you_a_current_student',
        objInputName: 'are_you_a_current_student',
        inputType: 'radio-option',
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        groupClass: 'status',
        obj:[
            {
                optionLabel:'Yes',
                optionValue:'Yes',
                optionType:'strict'
            },
            {
                optionLabel:'No',
                optionValue:'No',
                optionType:'strict'
            }
        ],
        displayShow:false
    },
    {
        inputLabel: 'Agency Name',
        inputName: 'agency_name',
        objInputName: 'agent_name',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: agencyName,
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'agent',
        disabled: true
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
        displayShow:true,
        groupClass: 'agent'
    },
    {
        inputLabel: 'Agency Contact Person',
        inputName: 'agency_contact_person',
        objInputName: 'agency_contact_person',
        inputType: 'text',
        required: true,
        category: 'Student',
        value: agencyContactPerson,
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'agent',
        disabled: true
    },
    {
        inputLabel: "Agency Contact's email",
        inputName: 'agency_contacts_email',
        objInputName: 'agency_contact_email',
        inputType: 'email',
        required: true,
        category: 'Student',
        value: agencyEmail,
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'agent',
        disabled: true
    },
    {
        inputLabel: "Agency telephone number",
        inputName: 'agency_contacts_phone',
        objInputName: 'agency_contact_telephone_number',
        inputType: 'phone',
        required: false,
        category: 'Agent',
        value:agencyPhone,
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'agent'
    },
    {
        inputLabel: 'Student Advisor - Campus Location',
        inputName: 'advisor_campus',
        objInputName: 'advisor_campus',
        inputType: 'dropdown',
        required: true,
        category: 'Advisor',
        value:'',
        obj:campusList,
        schoolParentDependence: 'ILSC',
        displayShow:true,
        groupClass: 'advisor'
    },
    {
        inputLabel: 'Student Advisor - Campus Location',
        inputName: 'advisor_campus',
        objInputName: 'advisor_campus',
        inputType: 'dropdown',
        required: true,
        category: 'Advisor',
        value:'',
        obj:campusListELS,
        schoolParentDependence: 'ELS',
        displayShow:true,
        groupClass: 'advisor'
    },
    {
        inputLabel: "Student Advisor - Name",
        inputName: 'advisor_name',
        objInputName: 'advisor_name',
        inputType: 'text',
        required: true,
        category: 'Advisor',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'advisor'
    },
    {
        inputLabel: "Student Advisor - Email",
        inputName: 'advisor_email',
        objInputName: 'advisor_email',
        inputType: 'email',
        required: true,
        category: 'Advisor',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'advisor'
    },
    {
        inputLabel: "First Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your first name as written in your passport)</span>",
        inputName: 'student_first_name',
        objInputName: 'firstname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Given Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your given name as written in your passport)</span>",
        inputName: 'student_first_name',
        objInputName: 'firstname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Middle Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your middle name as written in your passport)</span>",
        inputName: 'student_middle_name',
        objInputName: 'middle_name',
        inputType: 'text',
        required: false,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Last Name &nbsp;&nbsp;<span class='disclaimer'>(Fill in your last name as written in your passport)</span>",
        inputName: 'student_last_name',
        objInputName: 'lastname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Surname &nbsp;&nbsp;<span class='disclaimer'>(Fill in your surname as written in your passport)</span>",
        inputName: 'student_last_name',
        objInputName: 'lastname',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Student's Email",
        inputName: 'student_email',
        objInputName: 'email',
        inputType: 'email',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Confirm Email",
        inputName: 'student_email_confirm',
        objInputName: '',
        inputType: 'email',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Phone number",
        inputName: 'student_phone_number',
        objInputName: 'phone',
        inputType: 'phone',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Current Address",
        inputName: 'student_address',
        objInputName: 'student_complete_address',
        inputType: 'text-area',
        rows:'1',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Foreign Address",
        inputName: 'student_address',
        objInputName: 'student_complete_address',
        inputType: 'text-area',
        rows:'1',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "City",
        inputName: 'student_address_city',
        objInputName: 'city',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "State/Province",
        inputName: 'student_address_province_state',
        objInputName: 'state',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "State/Province",
        inputName: 'student_address_province_state',
        objInputName: 'state',
        inputType: 'text',
        required: false,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Postal Code",
        inputName: 'student_address_postal_code',
        objInputName: 'zip',
        inputType: 'text',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Country",
        inputName: 'student_address_country',
        objInputName: 'country_of_residence',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        obj:countryList,
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Current Visa Type Number",
        inputName: 'visa_type_number',
        objInputName: 'australia_visa_type_number',
        inputType: 'text',
        disabled: true,
        required: false,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        hidden: true,
        displayShow:false,
        groupClass: 'student'
    },
    {
        inputLabel: "Nationality",
        inputName: 'student_nationality',
        objInputName: 'nationality',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        obj:countryList,
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Date of Birth",
        inputName: 'student_dob',
        objInputName: 'birthdate',
        inputType: 'date-time',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "City of birth",
        inputName: 'student_city_birth',
        objInputName: 'city_of_birth__c',
        inputType: 'text',
        required: false,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        requiredDependence:'ELS',
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Country of birth",
        inputName: 'student_country_birth',
        objInputName: 'country_of_birth',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        obj:countryList,
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Gender",
        inputName: 'student_gender',
        objInputName: 'gender_student',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        obj:[
            "Male",
            "Female",
            "Non-Binary"
        ],
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Gender",
        inputName: 'student_gender',
        objInputName: 'gender_student',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        obj:[
            "Male",
            "Female"
        ],
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Native Language",
        inputName: 'student_native_language',
        objInputName: 'first_language__cloned_',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        obj:languageListNative,
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Native Language",
        inputName: 'student_native_language',
        objInputName: 'first_language__cloned_',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ELS',
        obj:languageListNative_ELS,
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Preferred Language",
        inputName: 'student_preferred_language',
        objInputName: 'preferred_language_spoken__c',
        inputType: 'dropdown',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC,ELS',
        obj:languageList,
        displayShow:true,
        applicationRestriction:'Walk-in Student Advisor,Agent',
        groupClass: 'student'
    },
    {
        inputLabel: "What Visa will you apply for?",
        inputName: 'student_visa_option',
        objInputName: 'visa_status_in_your_country_of_study',
        inputType: 'radio-option',
        required: true,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        obj:[
            {
                optionLabel:'Student',
                optionValue:'Student',
                optionType:'strict'
            },
            {
                optionLabel:'Visitor',
                optionValue:'Visitor',
                optionType:'strict'
            },
            {
                optionLabel:'Working Holiday',
                optionValue:'Working Holiday',
                optionType:'strict'
            },
            {
                optionLabel:'Other',
                optionValue:'Other',
                optionType:'option-other',
                optionName:'student_visa_option_other_specified',
                dependentClass:'student_visa_option',
                placeholder:'Specify Other'
            }
        ],
        displayShow:true,
        groupClass: 'student'
    },
    {
        inputLabel: "Please specify visa",
        inputName: 'student_visa_option_other_specified',
        objInputName: 'student_visa_option_other_specified',
        inputType: 'text',
        required: false,
        category: 'Student',
        value:'',
        schoolParentDependence: 'ILSC',
        displayShow:false,
        groupClass: 'student'
    },
    {
        inputLabel: 'Emergency Contact',
        inputName: 'additional_emergency_contact_name',
        objInputName: 'name_of_emergency_contact',
        inputType: 'text',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {
        inputLabel: 'Emergency Contact Phone Number',
        inputName: 'additional_emergency_contact_phone',
        objInputName: 'emergency_contact_phone__',
        inputType: 'phone',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {
        inputLabel: 'Emergency Contact Email',
        inputName: 'additional_emergency_contact_email',
        objInputName: 'emergency_contact_email',
        inputType: 'email',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {
        inputLabel: 'Guardian Contact',
        inputName: 'additional_guardian_contact_name',
        objInputName: 'name_of_guardian_contact',
        inputType: 'text',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {
        inputLabel: 'Gaurdian Contact Phone Number',
        inputName: 'additional_guardian_contact_phone',
        objInputName: 'guardian_contact_phone__',
        inputType: 'phone',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {
        inputLabel: 'Guardian Contact Email',
        inputName: 'additional_guardian_contact_email',
        objInputName: 'guardian_contact_email',
        inputType: 'email',
        required: true,
        category: 'Student',
        schoolParentDependence: 'ILSC,ELS',
        value:'',
        displayShow:true,
        groupClass: 'additional',
        disabled: true
    },
    {

        inputLabel: 'Do you need ELS to organize your medical insurance?<span class="disclaimer">(All ELS Students must have health insurance valid in the US. If you cannot provide proof of your own insurance in English, you must enroll in the ELS Student Health Plan.)</span>',
        inputName: 'insurance_option',
        objInputName: 'medical_insurance',
        inputType: 'radio-option',
        required: true,
        schoolParentDependence: 'ELS',
        category: 'Student',
        value:'',
        obj:[
            {
                optionLabel:'No',
                optionValue:'No',
                optionType:'strict'
            },
            {
                optionLabel:'Yes',
                optionValue:'Yes',
                optionType:'strict',
            }
        ],
        displayShow:true,
        groupClass: 'insurance'
    },
    {
        inputLabel: privacyAgreementLabel,
        inputName: 'student_privacy_consent',
        inputType: 'checkbox',
        required: true,
        category: 'Student',
        value:'Yes',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        preHtml: privacyAgreementPreHtml,
        postHtml: privacyAgreementPostHtml,
        groupClass: 'privacy'
    },
    {
        inputLabel: 'Yes I read and agree to the above statement of release',
        inputName: 'release_form_agreement',
        objInputName: 'release_form_agreement',
        inputType: 'checkbox',
        required: true,
        category: 'Student',
        value:'Yes I read and agree to the financial/information statement of release',
        schoolParentDependence: 'ILSC,ELS',
        displayShow:true,
        preHtml: preFinancialHtml,
        postHtml: postFinancialHtml,
        groupClass: 'release'
    },
    {
      inputLabel: "E-signature Digital Confirmation",
      inputName: 'e_signature_digital_confirmation',
      objInputName: 'e_signature_digital_confirmation',
      inputType: 'text',
      required: true,
      category: 'Application',
      value:'',
      displayShow:false
  }
];

const validateForm = function(dataFormArr,validCheck){
    let validArray = [],
    dataForm = dataFormArr.split(','),
    formName = 'enroll-form',
    forSubmitStr = $('form#' + formName).attr('data-submit'),
    formSubmit = forSubmitStr == 'false' ? false : true;

if(validCheck == 'true'){
    for (let i = 0; i < dataForm.length; i++){
        $("form#"+dataForm[i]).validate({
            ignore: [],
            errorPlacement: function (error, element) {
                if ( element.is(":radio") ) {
                    error.insertBefore( element );
                }
                else { // This is the default behavior of the script
                    error.insertAfter( element );
                }
            },
            rules: {
                'student_email_confirm':{
                    equalTo: '[name=student_email]'
                }
            },
            messages: {
                'student_email_confirm': {
                    required: ' Please make sure confirm email matches email',
                    
                }
            },
            errorElement: 'label',
            focusInvalid: false, 
            invalidHandler: function(form, validator) {

                if (!validator.numberOfInvalids())
                    return;

                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top-140
                }, 100);
                
            }
        });
            
        let className = 'form#'+dataForm[i];
        
        if($(className).valid()){
            validArray.push(true);
        }else{
            validArray.push(false);
        }
        
    }
}else{
    
    validArray.push(true);
}

if(!validArray.includes(false)){
        
    if(!formSubmit){
        setTimeout(submitStudentForm,10);
        setTimeout(sendProgramEnrolForm,100);
        setTimeout(sendAccommodationEnrolForm,200); 
        setTimeout(sendPaymentEnrolForm,250);
    }
    return true;
    
}else{
    return false;
}

};

const goToPaymentSummary = function(dataTarget){

        if(dataTarget){
          el = $('#'+dataTarget);
          slideIndex = $('.quote-step-slide .quote-slide').index(el);
          $('.quote-step-slide').slick("slickGoTo", slideIndex);
          window.scrollTo(0,0);
          $('#quote-enroll-container').attr('data-complete',true);
          printPaymentSummary();
        }
};

const printPaymentSummary = function(){
    let formObject = localStorage.getItem('quote-obj'),
        email = $('input[name=student_email]').val(),
        firstName = $('input[name=student_first_name]').val(),
        middleName = $('input[name=student_middle_ename]').val() != '' ? ' '+$('input[name=student_middle_name]').val() : '',
        lastName = $('input[name=student_last_name]').val(),
        fullName = firstName+middleName+' '+lastName,
        quoteObj = JSON.parse(formObject),
        quoteSelected = quoteObj.quote_selection - 1, 
        depositTotal = quoteObj.quote_deposit_amount_selection,
        serviceFee = depositTotal*serviceFeePercent,
        programSchoolName = quoteObj.program_school_name,
        currencyVal = quoteObj.quote_array[quoteSelected].show_currency,
        destinationCurrency = $('input[name=destination_currency_selection').val(),
        destinationDepositVal = quoteValueFormatter(depositTotal,destinationCurrency),
        depositVal = currencyVal == destinationCurrency ?  destinationDepositVal : currencyToCountryFormatter(depositTotal,currencyVal),
        paymentMessage = '<p>Thank you for enrolling with '+programSchoolName+'!</p><p>We&apos; ve received your application and will begin reviewing it soon. To ensure priority processing, please submit a deposit payment of <span id="depoist-amt">'+depositVal+'</span>. Please note that your enrollment can only be guaranteed once we&apos;ve received full payment as well as confirmed program and housing availability on your chosen start dates. We will be in touch with you to confirm.</p>',
        summaryHtml = "<table class='payment-summary-tbl'> <tr> <td>Full Name:</td> <td>"+fullName+"</td> </tr> <tr> <td>Email address:</td> <td>"+email+"</td> </tr> <tr> <td>Deposit payable to secure your place:</td> <td>"+depositVal+"</td> </tr> <tr> <td>Deposit Amount converted (approx):</td> <td>"+destinationDepositVal+"<span class='footnote'>&nbsp;&nbsp;&nbsp;"+serviceFeeMessage+" (aprox. "+quoteValueFormatter(round(serviceFee,2).toFixed(2),destinationCurrency)+")</span></td> </tr> </table>";


        $('#payment-message').html(paymentMessage);
        $('.payment-summary-details').html(summaryHtml);

};
const callPaymentStripe = function(){
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject),
        $modal = $('#paymentModal'),
        depositVal = parseFloat(quoteObj.quote_deposit_amount_selection),
        totalDepositCharge = depositVal + (depositVal*serviceFeePercent),
        paymentAmount = round(totalDepositCharge,2).toFixed(2) * 100,
        pId = quoteObj.p_id,
        email = $('input[name=student_email]').val();

        payTargetUrl =  payUrl +'?email='+ email +'&amount='+paymentAmount+'&code='+pId;
        location.href =  payTargetUrl;
          
    //find the iframe in the modal and set the source
    //$modal.find('iframe').attr('src', payUrl +'?email='+ email +'&amount='+paymentAmount+'&code='+pId);
    //open the modal
    //$modal.modal('show');

    return true;
};

const submitStudentForm = function () {
    let emailVar = $('input[name=student_email]').val(),
        applicationStatus = $('input[name=online_applicant_status]:checked').val(),
        firstName = $('input[name=student_first_name]').val(),
        middleName = $('input[name=student_middle_ename]').val() != '' ? ' '+$('input[name=student_middle_name]').val() : '',
        lastName = $('input[name=student_last_name]').val(),
        fullName = firstName+middleName+' '+lastName,
        signatureName = applicationStatus == 'Agent' ? $('input[name=agency_contact_person]').val() : fullName,
        guid = studentGuid,
        formName = 'enroll-form',
        todayDate = new Date(),
        currentMonth = todayDate.getMonth() + 1,
        timeStamp = todayDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
        timeZoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone,
        todayDateStr = todayDate.getDate()+'/'+currentMonth+'/'+todayDate.getFullYear()+' '+timeStamp+ ' (Timezone: '+timeZoneStr+')',
        arr = studentInfoArray;

    if (typeof formName !== 'undefined') {

        formTempArray = $('input[type!=file],select,textarea','form#' + formName).serializeArray();
        forSubmitStr = $('form#' + formName).attr('data-submit');
        formSubmit = forSubmitStr == 'false' ? false : true;

        let url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + guid,
            tempArray = [];
        formFieldsArray = [];
        url = encodeURI(url);

        for (let i = 0; i < formTempArray.length; i++) {
            for (let x = 0; x < arr.length; x++) {
                if (formTempArray[i].name == arr[x].inputName) {
                    if (arr[x].objInputName && arr[x].objInputName != 'email') {
                        if (formTempArray[i].name.includes('program_is_coop_')) {
                            booleanVar = formTempArray[i].name.includes('program_is_coop_') ? formTempArray[i].value == 1 ? 'Co-Op' : formTempArray[i].value == 0 ? 'Academic' : formTempArray[i].value == 2 ? 'Micro-Credentials'  : formTempArray[i].value : formTempArray[i].value == 1 ? 'Yes' : formTempArray[i].value == 0 ? 'No' : formTempArray[i].value;
                        } else {
                            booleanVar = formTempArray[i].name.includes('duration') ? parseInt(formTempArray[i].value.slice(0, 2)) : formTempArray[i].name.includes('insurance') ? formTempArray[i].value == 1 ? 'Yes' : 'No' : formTempArray[i].value;
                        }
                        if(arr[x].objInputName != ''){
                            tempArray.push({
                                'objName': arr[x].objInputName,
                                'value': booleanVar
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
        });

        digitalConfirmationTxt ='Electronic Signature Received: '+signatureName+' '+todayDateStr;

        formFieldsArray.push({
          "objectTypeId": "0-1",
          "name": 'e_signature_digital_confirmation',
          "value": digitalConfirmationTxt
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
            "fields": removeDupes(formFieldsArray),
            "context": {
                "pageUri": pageUri,
                "pageName": "Quote Application - Student Info",
                "hutk": getCookie('hubspotutk')
            },
            "legalConsentOptions": {
                "consent": { // Include this object when GDPR options are enabled
                    "consentToProcess": true,
                    "text": consentAgreeTxt,
                }
            }
        };

      
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(formArray),
            contentType: "application/json",
            dataType: 'json',
            success: function() {
                $('form#'+formName).attr('data-submit',true);
                console.log('Student Info Success!');
            }
        });
       
    }
};

const sendProgramEnrolForm = function(){
    let formObject = localStorage.getItem('quote-obj'),
        url = 'https://api.hsforms.com/submissions/v3/integration/submit/'+portalId+'/'+fEnrollGuid,
        email = $('input[name=student_email]').val(),
        quoteObj = JSON.parse(formObject),
        quoteSelected = quoteObj.quote_selection,
        quoteVal = parseInt(quoteSelected) - 1,
        programStartDateStr = quoteObj.quote_array[quoteVal].program.start_date,
        pStartDatedateObj = new Date(programStartDateStr),
        programStartDate  = pStartDatedateObj.getTime();

    url = encodeURI(url);
        
    let formFieldsArray = [
      
        {
          "objectTypeId": "0-1",
          "name": "email",
          "value": email
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_school_selection",
          "value": quoteObj.school_name
        },
        {
            "objectTypeId": "0-1",
            "name": "study_school",
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
        },
        {
          "objectTypeId": "0-1",
          "name": "quote_program_school_selection",
          "value": quoteObj.program_school_name
        },
        {
            "objectTypeId": "0-1",
            "name": "study_campus",
            "value": quoteObj.quote_array[quoteVal].campus,
        },
        {
            "objectTypeId": "0-1",
            "name": "study_country",
            "value": quoteObj.quote_array[quoteVal].campus_country,
        },
        {
            "objectTypeId": "0-1",
            "name": "program_name",
            "value": quoteObj.quote_array[quoteVal].program.option_program,
        },
        {
            "objectTypeId": "0-1",
            "name": "program_schedule",
            "value": quoteObj.quote_array[quoteVal].program.option_schedule,
        },
        {
            "objectTypeId": "0-1",
            "name": "program_start_date",
            "value": programStartDate,
        },
        {
            "objectTypeId": "0-1",
            "name": "weeks_of_study",
            "value": quoteObj.quote_array[quoteVal].program.duration,
        }
    ];
  
    for (let i = 0; i < quoteObj.quote_array.length; i++){
        quoteNum = i + 1;
        countryOriginCurrency = quoteObj.country_origin_currency;
        showCurrency = quoteObj.quote_array[i].show_currency;
        conversionRate = 1;
        if(countryOriginCurrency != showCurrency){
          conversionRate = $('input[name=quote_'+quoteNum+'_exchange_rate]').val();
        }
        
        programTotalPriceInt = parseInt(quoteObj.quote_array[i].program.program_total_price) / conversionRate;
       
        programTotalPrice = programTotalPriceInt.toFixed();
        
        programTotalStandardPriceInt = parseInt(quoteObj.quote_array[i].program.program_total_standard_price) / conversionRate;
        programTotalStandardPrice = programTotalStandardPriceInt.toFixed();
        registrationFee = parseInt(quoteObj.quote_array[i].program.registration_fee) / conversionRate;
        registrationFee = registrationFee.toFixed();
        additionalFee = parseInt(quoteObj.quote_array[i].program.additional_fee) / conversionRate;
        additionalFee = additionalFee.toFixed();
        materialFee = parseInt(quoteObj.quote_array[i].program.material_fee) / conversionRate;
        materialFee = materialFee.toFixed();
        accommodationPrice = parseInt(quoteObj.quote_array[i].accommodation.accommodation_total_price) / conversionRate;
        accommodationPrice = accommodationPrice.toFixed();
        airportFee = parseInt(quoteObj.quote_array[i].accommodation.airport_transfer_total_price) / conversionRate;
        airportFee = airportFee.toFixed();
        placementFee = parseInt(quoteObj.quote_array[i].accommodation.placement_fee) / conversionRate;
        placementFee = placementFee.toFixed();
       
        totalAmount = quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].quote_total_price) - parseInt(quoteObj.quote_array[i].promo.promo_code_value) : parseInt(quoteObj.quote_array[i].quote_total_price);
        
        totalPrice = totalAmount / conversionRate;
        
        accommodationEnable = quoteObj.quote_array[i].accommodation.accommodation_enable;
        
        familyAdultAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult);
        familyChildAddEnable = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child);
        familyChildPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_child_total_price);
        familyAdultPrice = parseInt(quoteObj.quote_array[i].accommodation.family_additional_adult_total_price);
         
        showFamilyChildAdd = 'none';
        showFamilyAdultAdd = 'none';
         
        if(familyChildAddEnable > 0){
           showFamilyChildAdd = 'block';
         }
        if(familyAdultAddEnable > 0){
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
  
        if(quoteObj.quote_array[i].promo.promo_auto_enabled){
          if(promoAutoValArr.length > 0){
            for(let z = 0; z < promoAutoValArr.length; z++){
  
              autoValInt = convertPercentDollarVal(promoAutoValArr[z],promoAutoCategoryArray[z],promoAutoTypeArray[z],i);
  
              autoVal = parseInt(autoValInt)/conversionRate;
              promoAutoTotalVal += parseFloat(autoVal);
              autoVal = autoVal;
              promoAutoValArray.push(
                currencyModFormatter(autoVal,showCurrency)
              )
            }
            promoAutoTotalVal = promoAutoTotalVal/conversionRate;
          }
  
        }
        promoAutoValStr = promoAutoValArray.length > 0 ? promoAutoValArray.toString().replace('00,','|') : 'n/a';
  
        promoCodeCategory = quoteObj.quote_array[i].promo.promo_code_category;
        promoCodeType = quoteObj.quote_array[i].promo.promo_code_discount_type;
        promoCodeTotal =  quoteObj.quote_array[i].promo.promo_code_enabled ? parseInt(quoteObj.quote_array[i].promo.promo_code_value) : 0;
  
  
  
        promoCodeVal = quoteObj.quote_array[i].promo.promo_code_enabled ? convertPercentDollarVal(promoCodeTotal,promoCodeCategory,promoCodeType,i) : 0;
        promoCodeVal = parseInt(promoCodeVal)/conversionRate;
        
        if(programTotalStandardPriceInt > programTotalPriceInt){     
          discountPrice = programTotalStandardPriceInt - programTotalPriceInt + promoAutoTotalVal + promoCodeVal;
          discountPrice = parseFloat(discountPrice);
          discountPrice = currencyModFormatter(discountPrice,showCurrency);  
          showDiscount = 'revert';
        }
        showAccommodation = 'none';
        if(accommodationEnable == 'true'){
          showAccommodation = 'block';
        }
    
        if(quoteObj.quote_array[i].quote_enabled){
          
            formFieldsArray.push(
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_campus_selection",
              "value": quoteObj.quote_array[i].campus 
            },
             {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_campus_country_selection",
              "value": quoteObj.quote_array[i].campus_country 
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_selection",
              "value": quoteObj.quote_array[i].program.option_program
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_selection",
              "value": quoteObj.quote_array[i].program.option_schedule
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_description",
              "value": quoteObj.quote_array[i].program.option_schedule_description
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_standard_price_selection",
              "value": currencyModFormatter(programTotalStandardPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_price_selection",
              "value": currencyModFormatter(programTotalPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_duration_selection",
              "value": quoteObj.quote_array[i].program.duration
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_registration_fee",
              "value":currencyModFormatter(registrationFee,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_registration_description",
              "value": quoteObj.quote_array[i].program.registration_description
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_additional_fee",
              "value":currencyModFormatter(additionalFee,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_additional_fee_description",
              "value":quoteObj.quote_array[i].program.additional_item_name + ' - ' + quoteObj.quote_array[i].program.additional_fee_description
            },
            
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_material_fee",
              "value":currencyModFormatter(materialFee,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_note",
              "value":quoteObj.quote_array[i].program.program_note
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult_show",
              "value":showFamilyAdultAdd
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child_show",
              "value":showFamilyChildAdd
            },
              {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child",
              "value": quoteObj.quote_array[i].accommodation.family_additional_child
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult",
              "value": quoteObj.quote_array[i].accommodation.family_additional_adult
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child_price",
              "value": currencyModFormatter(familyChildPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult_price",
              "value": currencyModFormatter(familyAdultPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_show",
              "value":showAccommodation
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_program",
              "value": quoteObj.quote_array[i].accommodation.option_accommodation
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_duration",
              "value": quoteObj.quote_array[i].accommodation.length_of_stay
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_check_in_date",
              "value": quoteObj.quote_array[i].accommodation.check_in_date
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_total_price",
              "value":currencyModFormatter(accommodationPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_airport_transfer",
              "value": quoteObj.quote_array[i].accommodation.option_airport_transfer
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_airport_transfer_fee",
              "value":currencyModFormatter(airportFee,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_placement_fee",
              "value":currencyModFormatter(placementFee,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_note",
              "value":quoteObj.quote_array[i].accommodation.accommodation_note_plain
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_discount_show",
              "value":showDiscount
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_total_price_discount",
              "value":discountPrice
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_show",
              "value":showPromoAuto
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_name",
              "value":quoteObj.quote_array[i].promo.promo_auto_code_name
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_description",
              "value":quoteObj.quote_array[i].promo.promo_auto_description
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_value",
              "value":promoAutoValStr
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_show",
              "value":showPromoCode
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code",
              "value":quoteObj.quote_array[i].promo.promo_code
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_name",
              "value":quoteObj.quote_array[i].promo.promo_code_name
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_description",
              "value":quoteObj.quote_array[i].promo.promo_code_description
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_value",
              "value":currencyModFormatter(promoCodeVal,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_total_price",
              "value":currencyModFormatter(totalPrice,showCurrency)
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_start_date",
              "value":quoteObj.quote_array[i].program.start_date
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_show",
              "value": "block"
            }
          );
        }else{
         formFieldsArray.push(
          {
            "objectTypeId": "0-1",
            "name": "quote_"+quoteNum+"_show",
            "value": "none"
          },
           {
            "objectTypeId": "0-1",
            "name": "quote_"+quoteNum+"_outlook_show",
            "value": "mso-hide:all"
          },
           {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_campus_selection",
              "value": "n/a"
            },
             {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_campus_country_selection",
              "value": "n/a" 
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_selection",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_selection",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_description",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_standard_price_selection",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_price_selection",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_schedule_duration_selection",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_registration_fee",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_registration_description",
              "value": "n/a"
            },
           
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_additional_fee",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_additional_fee_description",
              "value": "n/a"
            },
            
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_material_fee",
              "value" :0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_note",
              "value":"none"
            },
           {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult_show",
              "value":"none"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child_show",
              "value":"none"
            },
              {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_child_price",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_family_add_adult_price",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_show",
              "value":"none"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_program",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_duration",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_check_in_date",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_total_price",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_airport_transfer",
              "value": "n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_airport_transfer_fee",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_placement_fee",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_accommodation_note",
              "value":"n/a"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_discount_show",
              "value":"none"
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_program_total_price_discount",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_show",
              "value":'none'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_name",
              "value":'n/a'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_description",
              "value":'n/a'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_auto_value",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_show",
              "value":'none'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code",
              "value":'n/a'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_name",
              "value":'n/a'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_description",
              "value":'n/a'
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_promo_code_value",
              "value":0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_total_price",
              "value": 0
            },
            {
              "objectTypeId": "0-1",
              "name": "quote_"+quoteNum+"_start_date",
              "value":"n/a"
            }       
         );
        }
    
      }
  
    
    
    let formArray = {
      "fields" : formFieldsArray,
      "context" : {
        "pageUri" : pageUri,
        "pageName": "Quote Application - Program Info",
        "hutk": getCookie('hubspotutk')
      },
      "legalConsentOptions" :{
        "consent": { // Include this object when GDPR options are enabled
          "consentToProcess": true,
          "text": consentAgreeTxt,
        }
      }
    };
    
    console.log(formArray);
   
   $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(formArray), 
        success: function(data) {
        console.log('Program Info Success!');
        },
        contentType: "application/json",
        dataType: 'json'
    });
    
};
const sendAccommodationEnrolForm = function(){
    let formObject = localStorage.getItem('quote-obj'),
        url = 'https://api.hsforms.com/submissions/v3/integration/submit/'+portalId+'/'+accommGuid,
        email = $('input[name=student_email]').val(),
        quoteObj = JSON.parse(formObject),
        quoteSelected = parseInt(quoteObj.quote_selection) - 1,
        accommodationEnable = quoteObj.quote_array[quoteSelected].accommodation.accommodation_enable,
        accommTypeArr = quoteObj.quote_array[quoteSelected].accommodation.option_accommodation.split('-'),
        accommType = accommTypeArr[0].toString().trim(),
        accommodationName = accommType.includes('Residence') ? accommTypeArr[1].toString().trim() : 'Homestay',
        accommTypeName = accommType.includes('Homestay') ? 'Homestay' : accommType.includes('Residence') ? 'Residence' : '',
        airportTransferVal = quoteObj.quote_array[quoteSelected].accommodation.option_airport_transfer ? quoteObj.quote_array[quoteSelected].accommodation.option_airport_transfer : 'No';

    url = encodeURI(url);

    if(accommodationEnable == 'true'){
        formFieldsArray = [
        
            {
            "objectTypeId": "0-1",
            "name": "email",
            "value": email
            },
            {
            "objectTypeId": "0-1",
            "name": "need_homestay_or_aa",
            "value": "Yes"
            },
            {
            "objectTypeId": "0-1",
            "name": "accommodation_type",
            "value": accommTypeName
            },
            {
            "objectTypeId": "0-1",
            "name": "accommodation_location",
            "value": quoteObj.quote_array[quoteSelected].campus
            },
            {
            "objectTypeId": "0-1",
            "name": "accommodation_name",
            "value": accommodationName
            },
            {
            "objectTypeId": "0-1",
            "name": "check_in_date",
            "value": quoteObj.quote_array[quoteSelected].accommodation.check_in_date
            },
            {
            "objectTypeId": "0-1",
            "name": "weeks_of_stay",
            "value": quoteObj.quote_array[quoteSelected].accommodation.length_of_stay
            },
            {
            "objectTypeId": "0-1",
            "name": "airport_transfer_type",
            "value": airportTransferVal
            }
            
        ];

        
    }else{
        formFieldsArray = [
        
            {
            "objectTypeId": "0-1",
            "name": "email",
            "value": email
            },
            {
            "objectTypeId": "0-1",
            "name": "need_homestay_or_aa",
            "value": "No"
            },
            {
            "objectTypeId": "0-1",
            "name": "airport_transfer",
            "value":  airportTransferVal
            }
        ]
    }
    let formArray = {
        "fields" : formFieldsArray,
        "context" : {
        "pageUri" : pageUri,
        "pageName": "Quote Application - Accommodation Info",
        "hutk": getCookie('hubspotutk')
        },
        "legalConsentOptions" :{
        "consent": { // Include this object when GDPR options are enabled
            "consentToProcess": true,
            "text": consentAgreeTxt,
        }
        }
    }; 

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(formArray), 
        success: function(data) {
            console.log('Accommodation Info Success!')
        },
        contentType: "application/json",
        dataType: 'json'
    });       
   
};
const sendPaymentEnrolForm = function(){
    let formObject = localStorage.getItem('quote-obj'),
        url = 'https://api.hsforms.com/submissions/v3/integration/submit/'+portalId+'/'+paymentGuid,
        email = $('input[name=student_email]').val(),
        quoteObj = JSON.parse(formObject),
        pId = pSecureId();

        quoteObj.p_id = pId;

    url = encodeURI(url);

    let formFieldsArray = [
      
        {
          "objectTypeId": "0-1",
          "name": "email",
          "value": email
        },
        {
        "objectTypeId": "0-1",
        "name": "fullAmount",
        "value": quoteObj.quote_total_amount_selection
        },
        {
        "objectTypeId": "0-1",
        "name": "depositAmount",
        "value": quoteObj.quote_deposit_amount_selection
        },
        {
        "objectTypeId": "0-1",
        "name": "quote_payable_currency",
        "value": quoteObj.quote_currency_selection
        },
        {
        "objectTypeId": "0-1",
        "name": "quote_deposit_payable_currency",
        "value": quoteObj.quote_deposit_amount_currency
        },
        {
        "objectTypeId": "0-1",
        "name": "chosen_quote",
        "value": quoteObj.quote_selection
        },
        {
        "objectTypeId": "0-1",
        "name": "enrolled_and_proceeded_to_payment",
        "value": 'Yes'
        },
        {
          "objectTypeId": "0-1",
          "name": "payment_security_code",
          "value": pId
        }
        
    ];

    let formArray = {
        "fields" : formFieldsArray,
        "context" : {
          "pageUri" : pageUri,
          "pageName": "Quote Application - Payment Info",
          "hutk": getCookie('hubspotutk')
        },
        "legalConsentOptions" :{
          "consent": { // Include this object when GDPR options are enabled
            "consentToProcess": true,
            "text": consentAgreeTxt,
          }
        }
      };
      
    console.log(formArray);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(formArray), 
        success: function(data) {
            $('.btn.btn-enroll','#quote-enroll-container').removeClass('loader');
            goToPaymentSummary('enroll-payment');
        },
        contentType: "application/json",
        dataType: 'json'
    });

    localStorage.setItem('quote-obj', JSON.stringify(quoteObj));

};
const removeDupes = (arr, map = new Map()) => {
    arr.forEach(o => map.set(o.name, o));

    return [...map.values()];
};

const getCookie = function(name){
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2){
        return parts.pop().split(";").shift();
    }    
};
const quoteValueFormatter = function(num,curr){
    let toCurrency = curr,
        priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: toCurrency, currencyDisplay: 'code' }).format(num);
    return priceFormat;
  };
const currencyToDestinationFormatter = function(num,curr){
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject),
        quoteSelected = quoteObj.quote_selection
        xRate = $('input[name=quote_'+quoteSelected+'_exchange_rate]').val(),
        convertVal = num/xRate;

    priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, currencyDisplay: 'code' }).format(convertVal);
return priceFormat;
};
const currencyToCountryFormatter = function(num,curr){
    let formObject = localStorage.getItem('quote-obj'),
        quoteObj = JSON.parse(formObject),
        quoteSelected = quoteObj.quote_selection
        xRate = $('input[name=quote_'+quoteSelected+'_exchange_rate]').val(),
        convertVal = num*xRate;
        
    priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, currencyDisplay: 'code' }).format(convertVal);
return priceFormat;
};

const enrolSwitch = function(el){
    let actionType = $(el).attr('data-action'),
        returnType = false;
    $(el).addClass('loader');
    $('.target-error').remove();
 
    switch(actionType){
        case 'btn-enroll':
            let dataForm = $(el).attr('data-form'),
                validCheck = $(el).attr('data-check');
                returnType = validateForm(dataForm,validCheck) ? true : false;
                
            break;

        case 'btn-pay':
            returnType = callPaymentStripe() ? true : false;
            break;

    };

    if(returnType){
      setTimeout(function(){$(el).removeClass('loader')},1500);
    }else{
      $(el).removeClass('loader');
    }
}


const paymentConfirmRedirect = function(){
    $('#paymentModal').modal('hide');
    window.location.href = paymentRedirectUrl;
};

const pSecureId = function(){
  let psId = Math.random().toString(36).slice(2).toUpperCase();
  return psId;
}

//listener Events
$('.btn[data-type=btn-process]').click(function(){
    enrolSwitch(this);
});
$('.btn.btn-close','#paymentModal').click(function(){
    $('.btn.btn-pay','#enroll-payment').removeClass('loader');
});
window.closePaymentModal = function(){
    $('.btn.btn-pay','#enroll-payment').text('Payment complete').attr('disabled',true);
    $('.btn-close','#paymentModal').hide();
    setTimeout(paymentConfirmRedirect,5000);
};
$(document).on( 'click', 'input.other-input', function () {
  if($(this).parent().next().hasClass('dependent-group')){
    $(this).parent().next('.dependent-group').find('.dependent-target').removeClass('study-hide').addClass('study-show');
    $(this).parent().next('.dependent-group').find('input').attr('disabled',false);
  }else{
  if(!$(this).parent().hasClass('multi-target')){
      $(this).parent().siblings('.dependent-target:lt(4)').removeClass('study-hide').addClass('study-show').attr('disabled',false).children('input').attr('disabled',false);
  }else{
      $(this).parent().next('input').removeClass('study-hide').addClass('study-show').attr('disabled',false).prop('checked', false);
    }
  }
});
$(document).on( 'click', 'input.indenpendent-input', function () {  
  if($(this).parent().nextAll(':lt(2)').hasClass('dependent-group')){
    $(this).parent().nextAll('.dependent-group:lt(2)').find('.dependent-target').removeClass('study-show').addClass('study-hide');
    $(this).parent().nextAll('.dependent-group:lt(2)').find('input').attr('disabled',true);
  }else{  
  if($(this).parent().hasClass('multi-target')){
      $(this).parent().siblings('input.dependent-target').not('other-input').removeClass('study-show').addClass('study-hide').attr('disabled',true).children('input').attr('disabled',true);  
 }else{
     $(this).parent().siblings('.dependent-target:lt(4)').removeClass('study-show').addClass('study-hide').attr('disabled',true).children('input').attr('disabled',true).prop('checked', false);  
    }
 }    
});