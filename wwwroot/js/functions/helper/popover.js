//REMOVE POP OVER (Ensure that one popover is shown at a time- table list)
function RemovePopover() {
    var shownPopovers = document.getElementsByClassName("popover");
    if (shownPopovers.length > 1) {
        shownPopovers[0].remove();
    }
}

//use this for action link popover
function ViewActionLink(element, link, popovercontainer) {
    $(element).popover({
        trigger: 'click',
        placement: "bottom",
        html: true,
        container: popovercontainer,
        content: link
    });
}

$(document).ready(function () {
    //HIDE POP OVER WHEN CLICK ANY OF THE PAGE
    $('body').on('click', function (e) {
        $('.menu_icon').each(function () {
            // hide any open popovers when the anywhere else in the body is clicked
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.menu_icon').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

});