/**
 * Form Validation
 * Source: https://www.w3resource.com/javascript/form/javascript-form-validation.php
 * 
 * Her form elementine input filter girileceeek
 * Ve o elemandan uzaklaşınca hemen kontrole sokulacak
 */
class formValidation {

    constructor(formId, paintStatus, errorBorderColor) {

        if (typeof (formId) == "undefined") {
            this.formId = "";
        }
        else {
            this.formId = formId;
            //-> Form Id for check validation
        }

        if (typeof (paintStatus) == "undefined") {
            this.paintStatus = true;
            //-> Set status of invalid inputs will dye or NOT
        }
        else {
            this.paintStatus = paintStatus;
        }

        if (typeof (errorBorderColor) == "undefined") {
            this.errorBorderColor = "red";
            //-> Border color of invalid form input fields
        }
        else {
            this.errorBorderColor = errorBorderColor;
        }

        this.isValid = false;   //-> Validation Status
        this.invalidCounts = 0;
        this.errors = [];

        this.name = "formValidation";
        this.requiredStyleCleaner();
        this.select2 = new select2Input();
    }


    /**
     * Reset Form Set all elements their default value
     * DONE
     * @param {string} formId the form element "id" OR element "name"
     */
    formReset(formId) {
        if (typeof (formId) == "undefined" && this.formId == "") {
            console.error("Please set a 'formId' (Form Id or Form Name) as parameter in " + this.name + "." + this.formReset.name + "(formId) function.");
            return;
        }
        if (typeof (formId) == "undefined" && this.formId != "") {
            formId = this.formId;
        }
        else if (this.formId == "" && typeof (formId) != "undefined") {
            formId = formId;
        }

        for (let i = 0; i < document.forms[formId].length; i++) {

            if (document.forms[formId][i].localName == "select") {
                if (typeof (document.forms[formId][i][0]) != "undefined") {
                    if (document.forms[formId][i].className.includes("select2")) {
                        //-> Select2
                        $('#' + document.forms[formId][i].id).val(document.forms[formId][i][0].value);
                        $('#' + document.forms[formId][i].id).trigger('change'); // Notify any JS components that the value changed
                        this.select2.setSelect2BorderColor(document.forms[formId][i].id, ""); //-> Set select2 border none
                    }
                    else {
                        //-> Normal Select
                        document.forms[formId][i].selectedIndex = 0;
                        document.forms[formId][i].style.border = ""; //-> Reset Form border
                    }
                }
            }
            else if (document.forms[formId][i].type == "radio" || document.forms[formId][i].type == "checkbox") {
                //-> Bunlarda kırmızı olacak mı? Olmalı
                if (document.forms[formId][i].checked) {
                    document.forms[formId][i].checked = document.forms[formId][i].defaultChecked;
                }
            }
            else {
                //-> Don't remove hidden input value, submits and buttons and disabled buttons
                if (
                    document.forms[formId][i].type != "hidden" &&
                    document.forms[formId][i].type != "submit" &&
                    document.forms[formId][i].localName != "button" &&
                    document.forms[formId][i].disabled != true &&
                    document.forms[formId][i].readOnly != true
                ) {
                    document.forms[formId][i].value = document.forms[formId][i].defaultValue;
                    document.forms[formId][i].style.border = ""; //-> Reset Form border
                }
            }
        }

        this.invalidCounts = 0;
    }


    /**
     * Zeroing Form, Set all form elements empty
     * 
     * @param {string} formId the form element "id" OR element "name"
     * 
     * Hidden, disabled, readonly hatta buttonlarında sıfırlanıp sıfırlanmayacağı bilgisi gönderilmeli
     */
    formZeroing(formId) {
        if (typeof (formId) == "undefined" && this.formId == "") {
            console.error("Please set a 'formId' (Form Id or Form Name) as parameter in " + this.name + "." + this.formZeroing.name + "(formId) function.");
            return;
        }
        if (typeof (formId) == "undefined" && this.formId != "") {
            formId = this.formId;
        }
        else if (this.formId == "" && typeof (formId) != "undefined") {
            formId = formId;
        }

        for (let i = 0; i < document.forms[formId].length; i++) {

            if (document.forms[formId][i].localName == "select") {
                if (typeof (document.forms[formId][i][0]) != "undefined") {
                    if (document.forms[formId][i].className.includes("select2")) {
                        //-> Select2
                        $('#' + document.forms[formId][i].id).val(document.forms[formId][i][0].value);
                        $('#' + document.forms[formId][i].id).trigger('change'); // Notify any JS components that the value changed
                        this.select2.setSelect2BorderColor(document.forms[formId][i].id, ""); //-> Set select2 border none
                    }
                    else {
                        //-> Normal Select
                        document.forms[formId][i].selectedIndex = 0;
                        document.forms[formId][i].style.border = ""; //-> Reset Form border
                    }
                }
            }
            else if (document.forms[formId][i].type == "radio" || document.forms[formId][i].type == "checkbox") {
                if (document.forms[formId][i].checked) {
                    document.forms[formId][i].checked = false;
                }
            }
            else {
                //-> Don't remove hidden input value, submits and buttons and disabled buttons
                if (
                    document.forms[formId][i].type != "hidden" &&
                    document.forms[formId][i].type != "submit" &&
                    document.forms[formId][i].localName != "button" &&
                    document.forms[formId][i].disabled != true &&
                    document.forms[formId][i].readOnly != true
                ) {
                    document.forms[formId][i].value = "";
                    document.forms[formId][i].style.border = ""; //-> Reset Form border
                }
            }
        }

        this.invalidCounts = 0;
    }


    /**
     * Form Required Fields Style Cleaner
     */
    requiredStyleCleaner() {
        let style = document.createElement("style");
        style.innerHTML = `
        :invalid {
            box-shadow: none;
        }
        
        :-moz-submit-invalid {
            box-shadow: none;
        }
        
        :-moz-ui-invalid {
            box-shadow: none;
        }

        input[type="text"][disabled],
        [type=password][disabled],
        [type="date"][disabled],
        [type="url"][disabled], 
        [type="email"][disabled],
        [type="number"][disabled],
        [type="tel"][disabled],
        [type="week"][disabled],
        [type="month"][disabled],
        [type="time"][disabled],
        [type="color"][disabled],
        [type="datetime-local"][disabled]{
            color: inherit;
        }

        input[type=text], 
        [type=password], 
        [type="date"], 
        [type="url"], 
        [type="email"], 
        [type="number"], 
        [type="tel"], 
        [type="week"], 
        [type="month"], 
        [type="time"], 
        [type="color"], 
        [type="datetime-local"] {
            color: white;
        }
        `;
        document.head.append(style);
    }


    /**
     * To set border color of html element
     * @param {string} fieldId 
     * @param {string} errorColor 
     */
    paintBorderById(fieldId, errorColor) {
        if (typeof (fieldId) == "undefined") {
            console.error("Please set a 'fieldId' as parameter in " + this.name + "." + this.paintBorderById.name + "(fieldId) function.");
            return;
        }

        if (typeof (errorColor) == "undefined") {
            errorColor = this.errorBorderColor;
        }

        //-> Check if select2 
        if (
            document.getElementById(fieldId).localName == "select" &&
            typeof (document.getElementById(fieldId)[0]) != "undefined" &&
            document.getElementById(fieldId).className.includes("select2")
        ) {
            this.select2.setSelect2BorderColor(fieldId, errorColor);
            //-> Set select2 border error color
            if (errorColor != "") {
                this.invalidCounts++;
            }

        }
        else {
            if (
                document.getElementById(fieldId).type != "hidden" &&
                document.getElementById(fieldId).type != "submit" &&
                document.getElementById(fieldId).localName != "button" &&
                document.getElementById(fieldId).disabled != true
            ) {
                if (errorColor == "") {
                    document.getElementById(fieldId).style.border = "";
                }
                else {
                    document.getElementById(fieldId).style.border = "1px solid " + errorColor;
                    this.invalidCounts++;
                }
            }
        }
        //-> Checkbox ve Radio Buttonsların renklendirilmesine gerek yok html hallediyor zaten.
    }



    /**
     * To Check Form validations
     * @param {strign} formId Form Id or Form Name
     */
    validateRequiredFields(formId, errorColor) {
        //-> her form elemanını, döndürcez
        //-> sonra her elemanın id'sini checkRequiredField'a vercez
        //-> True ise dönen sonuç:
        //-> Validity kontrolü yapılacak
        //-> Valid değil ise, kırmızıya boyanaca
        //-> valid ise bir şey yapılmayacak.

        if (typeof (formId) == "undefined" && this.formId == "") {
            console.error("Please set a 'formId' (Form Id or Form Name) as parameter in " + this.name + "." + this.validateRequiredFields.name + "(formId) function.");
            return;
        }
        if (typeof (formId) == "undefined" && this.formId != "") {
            formId = this.formId;
        }
        else if (this.formId == "" && typeof (formId) != "undefined") {
            formId = formId;
        }

        if (typeof (errorColor) == "undefined") {
            errorColor = this.errorBorderColor;
        }

        this.invalidCounts = 0;
        this.errors = [];
        let fieldId = "";

        for (let i = 0; i < document.forms[formId].length; i++) {

            if (document.forms[formId][i] == null || document.forms[formId][i].id == "") {
                continue;
            }

            fieldId = document.forms[formId][i].id;


            if (this.checkRequiredField(document.forms[formId][i].id)) {

                this.paintBorderById(fieldId, ""); //-> Set Default Border Color: None

                //if (document.forms[formId][i].validity.valid) {

                let minLength, maxLength;
                let value = document.forms[formId][i].value;

                if (typeof (document.getElementById(document.forms[formId][i].id).dataset.validMin) != "undefined") {
                    minLength = document.getElementById(document.forms[formId][i].id).dataset.validMin;
                    if (value.length < minLength) {
                        this.paintBorderById(document.forms[formId][i].id, errorColor);
                        this.errors.push({
                            fieldId: document.forms[formId][i].id,
                            message: "Veri çok kısa"
                        });
                    }
                }

                if (typeof (document.getElementById(document.forms[formId][i].id).dataset.validMax) != "undefined") {
                    maxLength = document.getElementById(document.forms[formId][i].id).dataset.validMax;
                    if (value.length > maxLength) {
                        this.paintBorderById(document.forms[formId][i].id, errorColor);
                        this.errors.push({
                            fieldId: document.forms[formId][i].id,
                            message: "Veri çok uzun"
                        });
                    }
                }

                if (
                    document.forms[formId][i].localName == "select" &&
                    typeof (document.forms[formId][i][0]) != "undefined" &&
                    document.forms[formId][i].className.includes("select2")
                ) {
                    //-> or document.forms[formId][i][0].validity.valid kontrolü
                    if(document.forms[formId][i].value == ""){
                        this.paintBorderById(document.forms[formId][i].id, errorColor);
                        continue;
                    }
                }


                //-> Burada aşağıdaki validationlar olacak.
                //-> Bu validationlardan dönen sonuca göre bir durum olacak.
                if (typeof (document.getElementById(document.forms[formId][i].id).dataset.valid) != "undefined") {
                    switch (document.getElementById(document.forms[formId][i].id).dataset.valid) {

                        case "date":

                            break;

                        case "url":
                            if (!this.validateUrl(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir url giriniz"
                                });
                            }
                            break;

                        case "email":
                            console.log("Kontol dilecekk değer : " + fieldId);
                            if (!this.validateEmail(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir email giriniz"
                                });
                            }
                            break;

                        case "number":
                            if (!this.validateNumeric(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir sayı giriniz"
                                });
                            }
                            break;

                        case "numberplusminus":
                            if (!this.validateNumericPlusMinus(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir sayı giriniz"
                                });
                            }
                            break;

                        case "word":
                            if (!this.validateAlpha(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf giriniz"
                                });
                            }
                            break;

                        case "sentence":
                            if (!this.validateAlphaWithSpace(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf ve boşluk kullanabilirsiniz"
                                });
                            }
                            break;

                        case "sentencepoint":
                            if (!this.validateAlphaWithSpacePoint(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf, boşluk ve nokta kullanabilirsiniz"
                                });
                            }
                            break;

                        case "paragraph":
                            if (!this.validateParagraph(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf, sayı, boşluk ve .,/-\\:;\"'() karakterleri girebilirsiniz"
                                });
                            }
                            break;

                        case "alphanum":
                            if (!this.validateAlphaNumeric(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf ve sayı kullanabilirsiniz"
                                });
                            }
                            break;

                        case "alphanumspace":
                            if (!this.validateAlphaNumericWithSpace(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf, sayı ve boşluk kullanabilirsiniz"
                                });
                            }
                            break;

                        case "alphanumspacetire":
                            if (!this.validateAlphaNumericWithSpaceTire(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf, sayı, boşluk ve tire(-) kullanabilirsiniz"
                                });
                            }
                            break;

                        case "adres":
                            if (!this.validateAdress(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Sadece harf, sayı, boşluk ve .,/-\\:;\"'() karakterleri girebilirsiniz"
                                });
                            }
                            break;

                        case "ip":
                            if (!this.validateIpAddress(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir ip adresi giriniz (Ör: 198.149.24.45)"
                                });
                            }
                            break;

                        case "aecard":
                            if (!this.validateCardNumberAE(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir American Express kart numarası giriniz"
                                });
                            }
                            break;

                        case "mastercard":
                            if (!this.validateCardNumberMaster(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir Master Kart numarası giriniz"
                                });
                            }
                            break;

                        case "visacard":
                            if (!this.validateCardNumberVisa(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir Visa Kart numarası giriniz"
                                });
                            }
                            break;

                        case "creditcard":
                            if (
                                this.validateCardNumberAE(fieldId) ||
                                this.validateCardNumberMaster(fieldId) ||
                                this.validateCardNumberVisa(fieldId)
                            ) {
                                this.paintBorderById(document.forms[formId][i].id, "");
                            }
                            else {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir kart numarası giriniz"
                                });
                            }
                            break;

                        case "decimal":
                            if (!this.validateDecimal(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir ondalık sayı giriniz. Nokta ile ayırabilirsiniz"
                                });
                            }
                            //-> 14.55 gibi
                            break;

                        case "phone":
                            if (!this.validateNumeric(fieldId)) {
                                this.paintBorderById(document.forms[formId][i].id, errorColor);
                                this.errors.push({
                                    fieldId: document.forms[formId][i].id,
                                    message: "Geçerli bir telefon giriniz"
                                });
                            }
                            break;
                    }

                    if (!document.forms[formId][i].validity.valid) {
                        this.paintBorderById(document.forms[formId][i].id, errorColor);
                        this.errors.push({
                            fieldId: document.forms[formId][i].id,
                            message: "Geçersiz"
                        });
                    } 
                }//if

            }


        }

        if (this.invalidCounts > 0) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
    }


    //DUZENLENCEK
    validateRequiredField(fieldId) {
        //-> disabled olanlara atma.
        if (document.getElementById(fieldId).required) {
            if (document.getElementById(fieldId).validity.valid) {
                document.getElementById(fieldId).style.border = "";
            } else {
                document.getElementById(fieldId).style.border = "1px solid red";
            }
        }
    }


    /**
     * DONE
     * Check element needs validation control or NOT
     * 
     * @param {string} fieldId 
     */
    checkRequiredField(fieldId) {

        if (document.getElementById(fieldId) == null) {
            return false;
        }

        if (document.getElementById(fieldId).disabled == true) {
            //-> True means element is disabled
            return false;
        }

        if (document.getElementById(fieldId).hidden == true) {
            //-> True means, element is hidden
            return false;
        }

        if (document.getElementById(fieldId).readOnly == true) {
            //-> True means, element is readOnly
            return false;
        }

        if (
            document.getElementById(fieldId).type == "submit" ||
            document.getElementById(fieldId).localName == "button"
        ) {
            return false;
        }

        if (document.getElementById(fieldId).type == "radio") {
            let name = document.getElementById(fieldId).name;
            let radioGroup = document.getElementsByName(name);

            for (let i = 0; i < radioGroup.length; i++) {
                if (radioGroup[i].required) {
                    return true;
                }
            }
            return false;
        }

        if (document.getElementById(fieldId).type == "checkbox") {
            if (document.getElementById(fieldId).required) {
                return true;
            }
            return false;
        }

        if (document.getElementById(fieldId).required) {
            return true;
        }
        else {
            if (
                document.getElementById(fieldId).value != "" ||
                document.getElementById(fieldId).innerHTML != "" ||
                document.getElementById(fieldId).innerText != "" ||
                document.getElementById(fieldId).textContent != ""
            ) {
                return true;
            }
            else {
                return false;
            }
        }

    }


    validateIpAddress(fieldId) {
        let ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipRegex.test(document.getElementById(fieldId).value)) {
            return (true); // -> Valid IP Adress
        }
        return (false); // -> Invalid IP Adress
    }

    validateCardNumberAE(fieldId) {
        // -> Validate American Express Credit Cart Number
        let cardno = /^(?:3[47][0-9]{13})$/;
        if (document.getElementById(fieldId).value.match(cardno)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateUrl(fieldId) {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(document.getElementById(fieldId).value)) {
            return true; //-> Valid
        }
        else {
            return false;
        }
    }

    validateCardNumberVisa(fieldId) {
        // -> Validate Visa Credit Cart Number
        let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        if (document.getElementById(fieldId).value.match(cardno)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateCardNumberMaster(fieldId) {
        // -> Validate Mastercard Credit Cart Number
        let cardno = /^(?:5[1-5][0-9]{14})$/;
        if (document.getElementById(fieldId).value.match(cardno)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateEmail(fieldId) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (document.getElementById(fieldId).value.match(mailformat)) {
            return true; // -> Valid
        }
        else {
            return false;
        }

        //-> https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
        //-> https://code.iamcal.com/php/rfc822/full_regexp.txt
        //-> https://tools.ietf.org/html/rfc822#section-6.1
    }

    // -> With Turkish Characters Support
    validateAlpha(fieldId) {
        let letters = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateAlphaWithSpace(fieldId) {
        let letters = /^[A-Za-zığüşöçİĞÜŞÖÇ ]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateAlphaWithSpacePoint(fieldId) {
        let letters = /^[A-Za-zığüşöçİĞÜŞÖÇ .]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateAdress(fieldId) {
        let letters = /^[A-Za-zığüşöçİĞÜŞÖÇ .,/-\\:;"'()&]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateParagraph(fieldId) {
        let letters = /^[A-Za-zığüşöçİĞÜŞÖÇ .,/-\\:;"'()&]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateNumeric(fieldId) {
        let numbers = /^[0-9]+$/;
        if (document.getElementById(fieldId).value.match(numbers)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateNumericPlusMinus(fieldId) {
        let numbers = /^[-+]?[0-9]+$/;
        if (document.getElementById(fieldId).value.match(numbers)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateAlphaNumeric(fieldId) {
        let letters = /^[0-9a-zığüşöçİĞÜŞÖÇ]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support
    validateAlphaNumericWithSpace(fieldId) {
        let letters = /^[0-9a-zığüşöçİĞÜŞÖÇ ]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    // -> With Turkish Characters Support, Space and Tire(-)
    validateAlphaNumericWithSpaceTire(fieldId) {
        let letters = /^[0-9a-zığüşöçİĞÜŞÖÇ -]+$/;
        if (document.getElementById(fieldId).value.match(letters)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validateDecimal(fieldId) {
        let decimal = /^[-+]?[0-9]+\.[0-9]+$/;
        if (document.getElementById(fieldId).value.match(decimal)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
    }

    validatePhoneNumber(fieldId) {
        let phoneno = /^\d{12}$/;
        if (document.getElementById(fieldId).value.match(phoneno)) {
            return true; // -> Valid
        }
        else {
            return false;
        }
        // -> https://www.w3resource.com/javascript/form/phone-no-validation.php
    }

}


