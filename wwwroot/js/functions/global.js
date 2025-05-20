$body = $("body");

//ADD LOADING
function AddLoading() {
    $body.addClass("loading");
}

//REMOVE LOADING
function RemoveLoading() {
    $body.removeClass("loading");
}

//FORM VALIDATION USING UNOBTRUSIVE LIBRARY
function UnobtrusiveValidation(pageContent) {
    $(".popup-form", pageContent).removeData('validator');
    $(".popup-form", pageContent).removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse('form');
}

//USE THIS FOR FORM DATA 
function ConvertToObject(formdata) {
    var data = {};
    $.each(formdata, function (index, obj) {
        data[obj.name] = (obj.value === "" || obj.value === "0") ? null : obj.value;
    });
    return data;
}

//date picker (set the value date)
function DatePicker(dateId) {
    $(dateId).datepicker({
        onSelect: function (dateText, inst) {
            var data = $(this).val();
            $(dateId).val(data);
        }
    });
}

//PARSE DATE
function ParseDate(date) {
    if(date == null){
        return "";
    }else{
        return Date.parse(date).toString('yyyy-MM-dd');
    }
}

function ParseDateWithTime(date) {
    if(date == null){
        return "";
    }else{
        return Date.parse(date).toString('MM/dd/yyyy h:mm tt');
    }
}

function setAndRemoveCheckboxInTableHeader(tableIdElem, trIdElem) {
    if ($('' + tableIdElem + ' th:first-child').attr('id') === "js-th-checkall") {
        $('' + tableIdElem + ' th:first-child').remove();

        var tblTitle = $('' + tableIdElem + " " + trIdElem + '').children().length;

        for (let i = 1; i < tblTitle; i++) {
            $('' + tableIdElem + ' #sorting-' + (i + 1) + '').attr('id', 'sorting-' + i + '');
        }
    }
}

//FOR SALES STATUS
function SaleslabelStatus(status) {

    // Pending: 1,
    // Approved: 2,
    // Rejected: 3,
    // Allocated: 4,
    // Packed: 5,
    // Dispatched: 6,
    // Delivered: 7,
    // Updated_Pending: 8,   
    // Approved_With_Update: 9,
    // Ongoing_Picklist: 10,
    // Request_To_Cancel: 11,
    // Cancelled: 12
    // Cleared: 13

    let labelBootstrap = "";

    if (status === 1) {
        labelBootstrap = "label label-warning";
    } else if (status === 2) {
        labelBootstrap = "label label-success";        
    } else if (status === 3) {
        labelBootstrap = "label label-danger";
    }else if (status === 4) {
        labelBootstrap = "label label-info";
    }else if (status === 5) {
            labelBootstrap = "label label-primary";    
    }else if (status === 6) {
        labelBootstrap = "";   
    }else if (status === 7) {
        labelBootstrap = "label label-default";   
    }else if (status == 8){
        labelBootstrap = "label label-warning";
    }else if (status == 9){
        labelBootstrap = "label label-warning";
    }else if (status == 10){
        labelBootstrap = "label label-warning";
    }else if (status == 11){
        labelBootstrap = "label label-warning";
    }else if (status == 12){
        labelBootstrap = "label label-danger";
    }else if (status == 13){
        labelBootstrap = "label label-success";
    }
    return labelBootstrap;
}

function RemoveLocalStorageCurrentPageNav(){    
    localStorage.removeItem('currentPageNav');
}

function numberWithCommas(x) {
    let a ;
    let formattedNumber = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let splitted = x.toString().split('.')[1];
    if(splitted === undefined){
        formattedNumber = formattedNumber + '.00';
    }else{        
        formattedNumber = formattedNumber + '0';
    }

    return formattedNumber;
}

function ReplaceSymbolAndAlphapeticalChar(text) {
    return text.replace(/[^0-9 ]+/g, '');
}

function CurrentWindowScrollTop() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    return top;
}

function loadingImageTable(tableIdElem, tableRowIdElem, colspan){
    $(tableRowIdElem).html("");

    let loading = `<tr>
                        <td colspan="${colspan}" style="text-align: center;"><img src="/img/wait.gif" width="30px" height="30px"/></td>
                  </tr>`;

   $(`${tableIdElem} ${tableRowIdElem}`).append(loading);
}

function ViewMaxLengthRemarks(remarks, maxLengthRemarks){
    let maxLength = maxLengthRemarks;
    let viewtransactionRemarks = remarks.Length <= maxLength ? remarks : `${remarks.substring(0, maxLength)}`;
    return viewtransactionRemarks;
}