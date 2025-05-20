//USE THIS FOR POPUP MODAL
function OpenModal(containerId, pageContent) {

    if (pageContent !== "" && pageContent !== null) {
        $(containerId).modal({
            backdrop: 'static',
            keyboard: false
        }).find('.modal-content').html(pageContent);
    } else {
        $(containerId).modal({
            backdrop: 'static',
            keyboard: false
        });
    }
}

function OpenModalWithLoading(containerId)
{
    $(containerId).modal({
        backdrop: 'static',
        keyboard: false
    });
}


//USE THIS TO CLOSE MODAL
function CloseModal(containerId) {
    $(containerId).modal('hide');
}