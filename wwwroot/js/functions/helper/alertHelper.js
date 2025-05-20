
//CALL THIS IF ERROR MESSAGE TRIGGERED
function ErrorMessage(msgTitle, msgText) {

    return Swal.fire({
        position: 'top',
        type: 'error',
        title: msgTitle,
        text: msgText,
        allowOutsideClick: false
    });
}

//CALL THIS IF ERROR MESSAGE TRIGGERED
function WarningMessage(msgTitle, msgText) {
    return Swal.fire({
        position: 'top',
        type: 'warning',
        title: msgTitle,
        text: msgText,
        allowOutsideClick: false
    });
}

//CALL THIS IF SUCCESS MESSAGE TRIGGERED
function SuccessMessage(msgTitle, msgText) {

    return Swal.fire({
        position: 'top',
        type: 'success',
        title: msgTitle,
        text: msgText,
        // showConfirmButton: false,
        timer: 3000
    });
}

//MODAL LOADING REDIRECT TO OTHER PAGE
function RedirectPageLoading(titleMsg) {
    let timerInterval;
    return Swal.fire({
        title: titleMsg,
        html: '',
        timer: 1000,
        onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                // Swal.getContent().querySelector('strong')
                //     .textContent = Swal.getTimerLeft();
            }, 100);
        },
        onClose: () => {
            clearInterval(timerInterval);
        }
    });
}

//CALL THIS IF CONFIRMATION TRIGGERED
function ConfirmSwal(text) {
    return Swal.fire({
        position: 'top',
        //title: 'Are you sure?',
        text: text,
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    });
}