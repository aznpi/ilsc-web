let ApplicationStatus="";

let form_obj={
    "application_enabled": false,
    "application_status":ApplicationStatus,
    "agency_form_array":[{
        "agency_form_enabled": false,
        
    }],
    "advisor_form_array":[{
        "advisor_form_enabled": false,
        
    }],
    "student_info_form_array":[{
        "student_form_enabled":false,
        
    }],
    "program_form_array":[{
        "program_form_enabled":false,
        "program_alternate_array":[{
            "program_alternate_additional_info":[{}],
        }],
        "program_additional_info":[{
            "visa_form_dependent":[{},{},{}]
        }]
       
    }],
    "accommodation_form_array":[{
        "accommodation_form_enabled": false,
        
    }],
    "additional_form_array":[{
        "additional_form_enabled": false,
        "additional_visa_info":[{
            "addition_family_members":[{},{},{},{},{}]
        }]
    }]
}

const setFormStorage = function(){
    localStorage.setItem("form-obj", JSON.stringify(form_obj));
    localStorage.removeItem("advisor-array");
    createAdvisorInfo();
}

$(document).ready(function () {
    setFormStorage();
    
  });