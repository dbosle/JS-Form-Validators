# JS Form Validation Class
Javascript Form Validator

## Requireds
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



## data-valid-min and data-valid-max
```
<input type="tel" data-valid="phone" data-valid-min="9" data-valid-max="12" />
```
* Input range must be between 9 and 12.

