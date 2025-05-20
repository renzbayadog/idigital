function filterDataTable(tablebodyId, searchValue) {
    var value = searchValue.toLowerCase();
    $(tablebodyId).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
}