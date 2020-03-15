/*
    //-> Add following lines to your page to use these functions

    <!-- Select2 CSS -->
    <link href="assets/libs/select2/select2.min.css" rel="stylesheet" type="text/css" />
    <!-- Select2 CSS -->

    <!-- Select2 JS -->
    <script src="assets/libs/select2/select2.min.js"></script>
    <script src="assets/js/select2status.js"></script>
    <!-- Select2 JS -->         

*/

class select2Input{

    constructor(textColor, placeholderTextColor){
        if (typeof (textColor) == "undefined") {
            this.textColor = "white";
        }
        else {
            this.textColor = textColor;
        }

        if (typeof (placeholderTextColor) == "undefined") {
            this.placeholderTextColor = "#98a6ad";
        }
        else {
            this.placeholderTextColor = placeholderTextColor;
        }

        this.addCssForSelect2();
    }

    /**
     * Use this function to set enabled/disabled select2
     * @param {string} id - the select2 element id 
     * @param {boolean} status - status for select2 element, for disabled [status = true]
     */
    setSelect2Disabled(id, status) {
        document.getElementById(id).disabled = status;
        if (status) {
            //-> Disabled
            this.setSelect2Color(id, this.placeholderTextColor);
        } else {
            //-> Enabled
            this.setSelect2Color(id, this.textColor);
        }
    }


    /**
     * To set select2 text color
     * @param {string} id select2 form id 
     * @param {string} color select2 text color 
     */
    setSelect2TextColor(id, color) {
        let selector = "#" + id + " + .select2 .select2-selection__rendered";
        $(selector).css("color", color);
    }


    /**
     * To set select2 border color
     * @param {string} id select2 form id
     * @param {string} color select2 border color 
     */
    setSelect2BorderColor(id, color){
        let selector = "#" + id + " + .select2 .select2-selection__rendered";
        let value = "";
        if(typeof(color) != "undefined" && color == ""){
            value = "";
            $(selector).css("border", value);
        }
        else {
            value = "1px solid " + color;
            $(selector).css("border", value);
        }
    }

    /**
     * Select2 Css for Dyeing
     */
    addCssForSelect2() {
        var style = document.createElement('style');
        style.type = 'text/css';
        let css = "";
        css += ".select2-selection__rendered {" +
            "background: #3b4452;" +
            "border-radius: .2rem;" + 
            "} ";
        css += ".select2-container--default.select2-container--disabled .select2-selection--single {" +
            "background-color: initial;" +
            "} ";
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    

}
