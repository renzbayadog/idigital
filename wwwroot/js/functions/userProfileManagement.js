$(document).ready(function () {

    let oUserInfo = {
        Id:0,
        FirstName: "",
        MiddleInitial: "",
        LastName: "",
        Email: "",
        PhoneNumber: ""
    }

    let oUserChangePassword = {
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
        UserId: 0
    }

    let oAgentDetails = {
        Sex: "",
        Address: "",
        AgentInitials:""
    }

    var SESSION_USER_ID = $("#SESSION_USER_ID").val();

    LoadUpdateProfileForm();
    LoadChangePasswordForm();
    LoadProfilePicture();

    //load update profile form
    function LoadUpdateProfileForm() {

        $("#loadingUpdateProfile").show();

        var $pageContent = $("<div/>");
        $pageContent.load("/profile/update/", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                $("#loadingUpdateProfile").hide();
                UnobtrusiveValidation($pageContent);
            }
        });

        $("#tab_content1").html($pageContent);
    }

    //load change password form
    function LoadChangePasswordForm() {

        $("#loadingChangePassword").show();

        var $pageContent = $("<div/>");
        $pageContent.load("/profile/changePassword", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                $("#loadingChangePassword").hide();
                UnobtrusiveValidation($pageContent);
            }
        });

        $("#tab_content2").html($pageContent);
    }   

    //load profile picture
    function LoadProfilePicture() {

        PostAjax('/api/upload/profile/'+SESSION_USER_ID+'', null).done(function (ftpFile) {
            RemoveLoading();

            if (ftpFile.filePath !== "" && ftpFile.filePath !== null && ftpFile.filePath !== undefined) {

                $('#js-myProfilePicture').attr('src', ftpFile.filePath);
            }
        }).fail(function (errMsg) {
            RemoveLoading();
        });
    }

    //view upload picture
    $(".profile_left").on('click', '.popup-upload-image', function (e) {

        e.preventDefault();

        OpenModal("#js-upload-profile-picture", "");
    });

    //upload picture
    $("#js-upload-image-btn").click(function () {

        var files = document.getElementById('js-file').files;

        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //var base64 = base64Image;
                var model = {
                    Base64String: e.target.result,
                    ImageName: "",
                    ImageSize: ""
                };
                //need the user id session of user
                PostAjax('/api/upload/uploadImage/'+SESSION_USER_ID+'', model).done(function (ftpFile) {
                    RemoveLoading();
                    $("#js-upload-profile-picture").modal('toggle');
                    $('#js-profilePicture').attr('src', ftpFile.filePath);
                    $('#js-myProfilePicture').attr('src', ftpFile.filePath);
                }).fail(function (errMsg) {
                    RemoveLoading();
                    ErrorMessage("Error", errMsg.responseText);
                });
            };
            reader.readAsDataURL(files[0]);
        } else {
            ErrorMessage("Error", "Please select file!")
        }
    });

    //update profile
    $("#tab_content1").on('submit', '.profile-form', function (e) {
        e.preventDefault();

        oUserInfo.Id = $("#js-user-id-personal").val();
        oUserInfo.FirstName = $("#js-update-fname").val();
        oUserInfo.MiddleInitial = $("#js-update-mname").val();
        oUserInfo.LastName = $("#js-update-lname").val();
        oUserInfo.Email = $("#js-update-email").val();
        oUserInfo.PhoneNumber = $("#js-update-phone").val();

        oAgentDetails.Sex = $("#js-update-sex").val();
        oAgentDetails.Address = $("#js-update-address").val();
        oAgentDetails.AgentInitials = $("#js-update-initials").val();

        var ProfileVM = {
            UserDetails: oUserInfo,
            RoleDetails: null,
            AgentDetails: oAgentDetails
        }
        
        PostAjax("/api/account/updateProfile", ProfileVM).done(function (data) {
            RemoveLoading();
            SuccessMessage("Updated", "Successfully updated profile");

        }).fail(function (errMsg) {
            ErrorMessage("Error", errMsg.responseText)
            RemoveLoading();
        });
    });

    //change Password
    $("#tab_content2").on('submit', '.changePassword-form', function (e) {

        e.preventDefault();

        oUserChangePassword.OldPassword = $("#js-oldPassword").val();
        oUserChangePassword.NewPassword = $("#js-newPassword").val();
        oUserChangePassword.ConfirmPassword = $("#js-confirmPassword").val();
        oUserChangePassword.UserId = $("#js-userId").val();

        PostAjax("/api/account/changePassword", oUserChangePassword).done(function () {

            RemoveLoading();
            SuccessMessage("Updated", "Password successfully updated!");
            clearPasswordFields();

        }).fail(function (errMsg) {
            RemoveLoading();
            WarningMessage("Warning", errMsg.responseText);
        });
    });

    //toggle show/hide password
    $("#tab_content2").on('click','.toggle-password', function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    function clearPasswordFields() {
        $("#js-oldPassword").val('');
        $("#js-newPassword").val('');
        $("#js-confirmPassword").val('');
    }
})