# JS Form Validation Class
Javascript Form Validator

## Usage
* Add following lines to your page.
```
<!-- Add Select2 if you have in your page -->
<script src="assets/libs/select2/select2.min.js"></script>
<script src="assets/js/select2status.js"></script>
    
<!-- Form Validation Class JS -->
<script src="assets/js/formValidation.js"></script>
<!-- Form Validation Class JS -->
```

## Requirements
* Every html form element must have unique `id` field.
* Every html form element must have `data-valid="*"` attribute, if you want to check validation this element value with specific data type.


## data-valid Types
```
data-valid="url"               //-> URL
data-valid="date"              //-> Date
data-valid="email"             //-> Email
data-valid="numeric"           //-> Numeric
data-valid="numericplusminus"  //-> Numeric, + and -
data-valid="word"              //-> Alphabetical
data-valid="sentence"          //-> Alphabetical and space
data-valid="paragraph"         //-> Alphabetical, numeric, space .,/-\\:;\"'()
data-valid="alphanum"          //-> Alphabetical, numeric
data-valid="alphanumspace"     //-> Alphabetical, numeric, space
data-valid="alphanumspacetire" //-> Alphabetical, numeric, space and tire(-)
data-valid="adres"             //-> Home Address
data-valid="ip"                //-> IP adres
data-valid="aecard"            //-> American Express Credit Card
data-valid="mastercard"        //-> Master Card
data-valid="visacard"          //-> Visa credit card
data-valid="creditcard"        //-> credit card
data-valid="decimal"           //-> 15.54 or 14
data-valid="phone"             //-> Numeric maximum 12 digits
```
* Usage:
```
<input type="text" id="emailInput1" data-valid="email" required >
//-> OR
<input type="email" id="emailInput2" data-valid="email" required >
```


## data-valid-min & data-valid-max
```
<input type="tel" data-valid="phone" data-valid-min="9" data-valid-max="12" />
```
* Input range must be between 9 and 12.



## Examples
```
<script>

let fv = new formValidation("formName");

....
....

//-> Form validation

fv.validateRequiredFields(); //-> To validate form fields

if (fv.isValid) {
  //-> Form is valid
}
else {
  //-> Form is invalid
  toastMessage("warning", "Formu eksiksiz doldurunuz!");
  printErrors(fv.errors); //-> Optional
}


</script>
```

## Usable Variables
```
fv.isValid => boolean true|false
fv.invalidCounts => errors count in numeric
fv.errors => errors array with "fieldId => message" format
```


## Usable Functions
```
fv.formReset("formName");   //-> To reset form to their default values
fv.formZeroing("formName"); //-> To reset All form to empty
...
And other all functions
```

