function ClickCheckbox(state, event) {
    if (event.target.type !== 'checkbox' && event.target.type !== 'number') {

        let rowId = '#' + $(state).attr('id') + '';

        let tbodyId = '#' + $(state).parent('tbody').attr('id') + '';

        let inputChk = '.' + $('' + tbodyId + ' ' + rowId + ' td:first').children().attr('class') + '';
        let isChecked = $(inputChk).is(':checked');

        if (isChecked) {
            $(inputChk).prop('checked', false);
            $(state).removeClass('selected');
        } else {
            $(inputChk).prop('checked', true);
            $(state).addClass('selected');
        }
    }
}

function ClickCheckboxPicklistStocks(state, event) {
    if (event.target.type !== 'checkbox' && event.target.type !== 'number') {

        let titleLocationid = $(state).attr('id');

        let rowId = '#' + $(state).attr('id') + '';

        let tbodyId = '#' + $(state).parent('tbody').attr('id') + '';

        let inputChk = '.' + $('' + tbodyId + ' ' + rowId + ' td:last').children().attr('class') + '';
        let isChecked = $(inputChk).is(':checked');

        if (isChecked) {
            $(inputChk).prop('checked', false);
            $(state).removeClass('selected');

            $('.input-order-quantity-' + titleLocationid + '').prop('disabled', true);
        } else {
            $(inputChk).prop('checked', true);
            $(state).addClass('selected');

            $('.input-order-quantity-' + titleLocationid + '').prop('disabled', false);
        }
    }
}

function ClickCheckboxAll(state, tbodyId = "", attrNameTag = "", hasBulkButton = false, elementBulkContainer = "") {

    let elementId = '' + tbodyId + ' input:checkbox[name=' + attrNameTag + ']';

    if ($(state).is(':checked')) {

        $(elementId).prop('checked', true);

        $(elementId).each(function () {
            let dataIndexId = $(this).attr('data-indexId');
            $('' + tbodyId + ' #selected-row-' + dataIndexId + '').addClass('selected');
        });

        if (hasBulkButton) {
            $(elementBulkContainer).fadeIn(500);
        }

    } else {

        $(elementId).each(function () {
            let dataIndexId = $(this).attr('data-indexId');
            $('' + tbodyId + ' #selected-row-' + dataIndexId + '').removeClass('selected');
        });

        $(elementId).prop('checked', false);

        if (hasBulkButton) {
            $(elementBulkContainer).fadeOut(500);
        }
    }
}

function CheckedItemForHidingBulkBtn(tbodyId, attrNameTag, elementBulkContainer) {

    let countChk = $('' + tbodyId + ' input:checkbox[name=' + attrNameTag + ']:checked').length;

    if (countChk === 0) {
        $('#js-chk-all-title').prop('checked', false);
        $(elementBulkContainer).fadeOut(500);
    } else {
        $(elementBulkContainer).fadeIn(500);
    }
}

// NEW 
//CHECKBOX WITH DISABLE AND ENABLE BULK BUTTON

function ClickCheckboxWithButton(elementTableBodyId, elementBulkAction = "", chkAttrNameTag, checkAllElementId) {
    let countChk = $('' + elementTableBodyId + ' input:checkbox[name=' + chkAttrNameTag + ']:checked').length;
    if (countChk === 0) {
        UncheckCheckCheckboxHeader(checkAllElementId);
        $(elementBulkAction).prop('disabled', true);
    } else {
        $(elementBulkAction).prop('disabled', false);
    }
}

function ClickCheckboxAllWithButton(state, tbodyId = "", chkAttrNameTag = "", hasBulkButton = false, elementBulkAction = "") {

    let elementId = '' + tbodyId + ' input:checkbox[name=' + chkAttrNameTag + ']';

    if ($(state).is(':checked')) {

        $(elementId).prop('checked', true);

        $(elementId).each(function () {
            let dataIndexId = $(this).attr('data-indexId');
            $('' + tbodyId + ' #selected-row-' + dataIndexId + '').addClass('selected');
        });

        if (hasBulkButton) {
            $(elementBulkAction).prop('disabled', false);
        }

    } else {

        $(elementId).each(function () {
            let dataIndexId = $(this).attr('data-indexId');
            $('' + tbodyId + ' #selected-row-' + dataIndexId + '').removeClass('selected');
        });

        $(elementId).prop('checked', false);

        if (hasBulkButton) {
            $(elementBulkAction).prop('disabled', true);
        }
    }
}

function UncheckCheckCheckboxHeader(checkAllElementId) {
    $(checkAllElementId).prop('checked', false);
}

function DisabledBullkActionButton(elementBulkContainer) {
    $(elementBulkContainer).prop('disabled', true);
}