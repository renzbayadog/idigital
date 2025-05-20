function LoadPagination(pageIndeces = [], currentPage) {

    $("#js-ul-pagination").html("");
    //lestyle = "background-color:#cc503b"
    if(pageIndeces.length > 0){
        pagnation = '<li id="js-prev-btn"><a class="page-link" style="cursor:pointer;">&laquo;</a></li>';//prev button

        for (var i = 0; i < pageIndeces.length; i++) {

            pagnation += '<li id="js-li-count-' + pageIndeces[i] + '" class="check page-item li-children-ref" data-id=' + pageIndeces[i] + '><a style="cursor:pointer;" class="page-link" id="click-User-pagination" data-id=' + i + '>' + pageIndeces[i] + '</a></li>';
        }

        pagnation += '<li id="js-next-btn"><a class="page-link" style="cursor:pointer;">&raquo;</a></li>';//next button

        $("#js-ul-pagination").append(pagnation);

        setButtonPaginationToActive(currentPage);
    }       
}

function LoadPaginationWithElementID(pageIndeces = [], currentPage, elementID){

    $(elementID).html("");

    if (pageIndeces.length > 0) {
        pagnation = '<li id="js-prev-btn"><a class="page-link" style="cursor:pointer;">&laquo;</a></li>';//prev button

        for (var i = 0; i < pageIndeces.length; i++) {

            pagnation += '<li id="js-li-count-' + pageIndeces[i] + '" class="check page-item li-children-ref" data-id=' + pageIndeces[i] + '><a style="cursor:pointer" class="page-link" id="click-User-pagination" data-id=' + i + '>' + pageIndeces[i] + '</a></li>';
        }

        pagnation += '<li id="js-next-btn"><a class="page-link" style="cursor:pointer;">&raquo;</a></li>';//next button

        $(elementID).append(pagnation);

        setButtonPaginationToActiveWithElementId(currentPage, elementID);
    }  

}

//SET BTN PAGINATION TO ACTIVE
function setButtonPaginationToActive(currentPage) {        

    var checkActiveClass = $('li.check').hasClass('active');
    var liPageActive = '#js-li-count-' + currentPage + '';
    $(liPageActive).addClass("active");

    //disabled enable button (prev and next)
    if($(liPageActive).next().attr('id') == 'js-next-btn'){
        $("#js-next-btn").hide();
    } else {
        $("#js-next-btn").show();
    }

    if($(liPageActive).prev().attr('id') == 'js-prev-btn'){
        $("#js-prev-btn").hide();
    } else {
        $("#js-prev-btn").show();
    }
}

function setButtonPaginationToActiveWithElementId(currentPage, elementId) {

    var checkActiveClass = $('' + elementId+ ' li.check').hasClass('active');
    var liPageActive = '' + elementId+ ' #js-li-count-' + currentPage + '';
    $(liPageActive).addClass("active");

    //disabled enable button (prev and next)
    if ($(liPageActive).next().attr('id') == 'js-next-btn') {
        $('' + elementId + ' #js-next-btn').hide();
    } else {
        $('' + elementId+' #js-next-btn').show();
    }

    if ($(liPageActive).prev().attr('id') == 'js-prev-btn') {
        $('' + elementId+' #js-prev-btn').hide();
    } else {

        $('' + elementId + ' #js-prev-btn').show();
    }
}

//PAGE HISTORY
function pageHistory(pageSummary){
    $("#js-page-history").html(pageSummary); //view pagination summary
}

function pageHistoryWithElementID(pageSummary, elementId) {
    $(elementId).html(pageSummary); //view pagination summary
}

//GET CURRENT PAGE IN PAGINATION
function GetCurrentPagePagination(){
    let currPage = parseInt($('li.check.active').attr('data-id'));
    if(currPage > 0){
        return currPage;
    }else{
        return 1;
    }
}

//final pagination
function GetPreviousPagination(){
    let currPage = parseInt($('li.check.active').attr('data-id'));
    if(currPage > 0){
        return currPage;
    }else{
        return 1;
    }
}
function SetActivePagination(state, event){
    var pageIndex = 0;
    if ($(event.target).parent().attr('id') == 'js-next-btn') { //click next button
        pageIndex = parseInt($(state).parent().find('.active').attr('data-id')) + 1;
    }
    else if ($(event.target).parent().attr('id') == 'js-prev-btn') { //click prev button
        pageIndex = parseInt($(state).parent().find('.active').attr('data-id')) - 1;
    }
    else {
        pageIndex = parseInt($(event.target).parent().attr('data-id'));
    }
    
    return pageIndex;
}