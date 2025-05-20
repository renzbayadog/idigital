function Sorting(sortElementId) {
    let columnName = $(sortElementId).attr('id');
    let parentTable = '#' + $('#' + columnName + '').parents('table').attr('id') + '';
    if ($('' + parentTable + ' #' + columnName + '').hasClass('fa fa-sort-amount-asc')) {
        $('' + parentTable + ' #' + columnName + '').removeClass('fa fa-sort-amount-asc').addClass('fa fa-sort-amount-desc');
        return '' + columnName + '_DESC';
    } else {
        $('' + parentTable + ' #' + columnName + '').removeClass('fa fa-sort-amount-desc').addClass('fa fa-sort-amount-asc');
        return '' + columnName + '_ASC';
    }
}    