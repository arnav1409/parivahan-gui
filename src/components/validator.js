class Validator {
    fullName = {
        rules: [
            {
                test: (value) => {
                    return value.length;
                },
                message: '*required'
            },
            {
                test: (value) => {
                    return  /^[a-zA-Z ]+$/.test(value);
                },
                message: 'Please Enter a valid name'
            }
            
        ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};

email = {
    rules: [
        {

            test: (value) => {
                value = value + "@gslab.com";
                return value;
            },
            message: '*required'
        },
        {
            test: (value) => {
                value = value + "@gslab.com";
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Invalid email'
        }
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
phoneNumber = {
    rules: [
        {
            test: (value) => {
                return value;
            },
            message: '*required'
        },
        {
            test: (value) => {
                return /^((?!(0))[0-9]{10})$/.test(value);
            },
            message: '*Enter Valid Number'
        }
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
/********************************************Offer A ride ********************************************************/

startingPoint = {
    rules: [
        {
            test: (value) => {
                console.log(value.length)
                return value.length;
            },
            message: '*required'
        },
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
endingPoint = {
    rules: [
        {
            test: (value) => {
                return value.length;
            },
            message: '*required'
        },
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};

gender = {
    rules: [
        {
            test: (value) => {
                return value;
            },
            message: '*required'
        },
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
vehicle = {
    rules: [
        {
            test: (value) => {
                return value;
            },
            message: '*required'
        },
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};

/**********************************OfferCode***************/
offerCode = {
    rules: [
        {
            test: (value) => {
                return /^\d{1,5}$/.test(value);
            },
            message: '*Enter Valid OfferCode'
        }
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
bookingCode = {
    rules: [
        {
            test: (value) => {
                return /^\d{1,5}$/.test(value);
            },
            message: '*Enter Valid BookingCode'
        }
    ],
    errorMsg: '',
    valid: false,
    state: '',
    value: '',
    touched: false
};
/********************************************/
isValueValid = function (fieldName, value) {
    const fieldVd = this[fieldName];
    fieldVd.errorMsg = '';
    fieldVd.state = value;
    fieldVd.valid = true;
    fieldVd.value = value;
    fieldVd.touched = true;
    const rules = fieldVd.rules;
    for (let i = 0; i < rules.length; i++) {
        if (!rules[i].test(value)) {
            fieldVd.errorMsg = rules[i].message;
            console.log(rules[i].message)
            fieldVd.valid = false;
            return false;
        }
    }
    return true;
}

isFormValid = function (fieldNames) {
    let formValid = true;
    console.log(fieldNames)
    for (let i = 0; i < fieldNames.length; i++) {
        if (!this.isValueValid(fieldNames[i], this[fieldNames[i]].value)) {
            formValid = false;
        }
    }
    return formValid;
}

isLoginValid = function (fieldNames) {
    let loginValid = true;
    for (let i = 0; i < fieldNames.length; i++) {
        if (!this.isValueValid(fieldNames[i], this[fieldNames[i]].value)) {
            loginValid = false;
        }
    }
    return loginValid;
}


}
export default Validator;