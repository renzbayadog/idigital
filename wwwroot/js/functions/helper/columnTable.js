function SetColumnsInTable(tableIdName, storageKey) {

    //list of column selected from storage
    var listSelectedColumns = JSON.parse(window.localStorage.getItem(storageKey));

    if(listSelectedColumns !== null){
        var thead = $(tableIdName).find("thead");
        var tr = thead.find('tr');
        tr.children().each(function () {    
            var columnId = $(this).attr('id');    
            var isColumnIncluded = listSelectedColumns.includes(columnId);    
            if (isColumnIncluded) {
                $('' + tableIdName + ' #' + columnId + '').show();
            } else {
                $('' + tableIdName + ' #' + columnId + '').hide();
            }
        });
    }   
}

function SetSelectionOfColumn(tableIdName, storageKey) {

    $("#js-view-col").html("");

    //list of column selected from storage
    var listSelectedColumns = JSON.parse(window.localStorage.getItem(storageKey));
    var thead = $(tableIdName).find("thead");
    var tr = thead.find('tr');
    var columnCount = tr.children().length;

    var totalDiv = Math.ceil(columnCount / 4);

    //CREATE LOGIC FOR CREATE COL IN ROW
    var k;
    for (k = 1; k < (totalDiv + 1); k++) {

        var newCol = '<div class="col-md-4 col-sm-4 col-xs-4" id="col-no-' + k + '">';
            newCol += '</div>';

        $("#js-view-col").append(newCol);
    }

    tr.children().each(function () {
        var columnId = $(this).attr('id');
        var columnName = $(this).text();
        var isColumnIncluded = false;

        if (listSelectedColumns !== null) {
            isColumnIncluded = listSelectedColumns.includes(columnId);
        }

        let content = '';
        if (isColumnIncluded) {
            content = `<div class="checkbox">
                       <label><input type="checkbox" class="js-bulk-check" value="${columnId}" checked>${columnName}</label>
                       </div>`;
        } else {
            content = `<div class="checkbox">
                       <label><input type="checkbox" class="js-bulk-check" value="${columnId}">${columnName}</label>
                       </div>`;
        }

        for (var l = 1; l < (totalDiv + 1); l++) {

            var count = $('#col-no-' + l + '').children().length; //count the children of div columns

            if (count >= 5) {
                continue;
            } else {
                $('#col-no-' + l + '').append(content);
                break;
            }
        }
    });
}

function SetStorageData(storageKey, listSelectedColumns, tableIdName) {

    window.localStorage.removeItem(storageKey);

    //save selected columns in storage
    window.localStorage.setItem(storageKey, JSON.stringify(listSelectedColumns));

    //setup columns base on the selected columns
    SetColumnsInTable(tableIdName, storageKey)
}

$(document).ready(function () {

    $(".js-check-all").on('click', function () {

        var isChecked = $(this).is(':checked');

        if (isChecked) {
            $(".js-bulk-check").prop("checked", true);
        } else {
            $(".js-bulk-check").prop("checked", false);
        }
    });
});