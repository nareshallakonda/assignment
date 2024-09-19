// validater.js
const fieldValidationRules = {
    pinCode: {
      pattern: /^\d{6}$/,
      message: 'PinCode must be exactly 10 digits!'
    },
    mobile: {
      pattern: /^\d{10}$/,
      message: 'Mobile number must be exactly 10 digits!'
    },
    aadhaar: {
      pattern: /^\d{12}$/,
      message: 'Aadhaar number must be exactly 12 digits!'
    }
  };
  
  const validateField = (type) => (_, value) => {
    const fieldRules = fieldValidationRules[type];
  
    if (!fieldRules) {
      return Promise.reject('Unknown field type!');
    }
  
    if (!value) {
      return Promise.reject('Please enter a value!');
    }
  
    if (!fieldRules.pattern.test(value)) {
      return Promise.reject(fieldRules.message);
    }
  
    return Promise.resolve();
  };
  
  export default validateField;
  