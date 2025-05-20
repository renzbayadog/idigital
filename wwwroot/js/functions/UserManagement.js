$(document).ready(function () {

    let userFilterENT = ModelFilterUser; //see this in entities folder

    LoadUser(userFilterENT, 1);

    function LoadUser(userFilterENT, currentPage) {

        $(".profile_details").remove();

        GetAjax('/api/user/list/page' + currentPage + '', userFilterENT).done(function (users) {

            RemoveLoading();

            var jsonResponse = users;

            var pagination = {
                List: jsonResponse.list,
                CurrentPage: jsonResponse.currentPage,
                PageIndeces: jsonResponse.pageIndices,
                PageSummary: jsonResponse.pageSummary
            };

            var listUser = [];

            var i;
            for (i = 0; i < pagination.List.length; i++) {

                var oUser = {
                    Id: pagination.List[i].id,
                    UserName: pagination.List[i].userName,
                    Name: (pagination.List[i].lastName + "," + pagination.List[i].firstName),
                    UserRole: pagination.List[i].roleName,
                    RoleDescription: pagination.List[i].roleDescription,
                    Category: pagination.List[i].category,
                    IsDeleted: pagination.List[i].isDeleted,
                    FtpFile: pagination.List[i].ftpFile
                };

                listUser.push(oUser);
            }

            var templateUserList = "";

            var j;
            for (j = 0; j < listUser.length; j++) {

                var userDiv = '<div class="col-md-4 col-sm-4 col-xs-12 profile_details">';
                userDiv += '<div class="well profile_view">';

                userDiv += '<div class="col-sm-12">';

                userDiv += '<h4 class="brief"><i>' + listUser[j].UserRole + ' (' + listUser[j].RoleDescription + ')</i></h4>';

                userDiv += '<div class="left col-xs-7">';
                userDiv += '<h2>' + listUser[j].UserName + '</h2>';
                //userDiv += '<p><strong>About: </strong> Web Designer / UI. </p>';

                userDiv += '<ul class="list-unstyled">';
                //userDiv += '<li><i class="fa fa-building"></i> Address: </li>';
                //userDiv += ' <li><i class="fa fa-phone"></i> Phone #: </li>';
                userDiv += '</ul>';
                userDiv += '</div>';

                userDiv += '<div class="right col-xs-5 text-center">';

                if (listUser[j].FtpFile !== null) {

                    if (listUser[j].FtpFile.filePath !== null && listUser[j].FtpFile.filePath !== "") {
                        //userDiv += '<img src="' + listUser[j].FtpFile.filePath + '" alt="" class="img-circle img-responsive">';
                        userDiv += '<img src="/img/user.png" alt="" class="img-circle img-responsive">';
                    } else {

                        userDiv += '<img src="/img/user.png" alt="" class="img-circle img-responsive">';
                    }

                } else {

                    userDiv += '<img src="/img/user.png" alt="" class="img-circle img-responsive">';
                }

                userDiv += '</div>';

                userDiv += '</div>';

                userDiv += '<div class="col-xs-12 bottom text-center">';
                userDiv += '<div class="row">';
                userDiv += '<div class="col-xs-6 col-sm-6 emphasis">';
                userDiv += '<div style="padding:10px 0px 10px 10px; float:left;">';

                if (listUser[j].IsDeleted == true) {
                    userDiv += '<a><span class="label label-warning">Disabled</span></a>';
                } else {
                    userDiv += '<a><span class="label label-success">Enabled</span></a>';
                }

                if (listUser[j].IsDeleted == true) { //if user is disabled set to enable
                    userDiv += '<a href="" data-id="' + listUser[j].Id + '" id="js-popup-user-activate" class="btn btn-link btn-xs">Enable</a>';
                } else { //if user is disabled set to disabled
                    userDiv += '<a href="" data-id="' + listUser[j].Id + '" id="js-popup-user-deactivate" class="btn btn-link btn-xs">Disable</a>';
                }

                userDiv += '</div>';
                userDiv += '</div>';

                userDiv += '<div class="col-xs-6 col-sm-6 emphasis">';
                userDiv += '<div style="padding:10px 10px 10px 10px">';

                userDiv += '<a href="/user/new?userId=' + listUser[j].Id + '" id="js-popup-user-add" class="btn btn-link btn-xs">Update</a>';

                userDiv += '<a href="" id="js-popup-reset-password" data-userId=' + listUser[j].Id + ' data-userRole=' + listUser[j].UserRole + ' class="btn btn-link btn-xs">Reset Password</a>';

                userDiv += '</div>';
                userDiv += '</div>';
                userDiv += '</div>';
                userDiv += '</div>';

                userDiv += '</div>';
                userDiv += '</div>';

                templateUserList += userDiv;
            }

            templateUserList += '<div class="clearfix"></div>';

            $(templateUserList).insertAfter(".before-list");

            //LOAD PAGINATION
            LoadPagination(pagination.PageIndeces, pagination.CurrentPage);

            //PAGE HISTORY
            pageHistory(pagination.PageSummary);

        }).fail(function (errMsg) {
            RemoveLoading();
            ErrorMessage("Error", errMsg.responseText)
        });
    }

    //CLICK PAGINATION
    $(".pagination").on('click', function (event) {

        // Determine the active page index, 
        var pageIndex = 0;
        if ($(event.target).parent().attr('id') == 'js-next-btn') { //click next button

            pageIndex = parseInt($(this).parent().find('.active').attr('data-id')) + 1;
        }
        else if ($(event.target).parent().attr('id') == 'js-prev-btn') { //click prev button
            pageIndex = parseInt($(this).parent().find('.active').attr('data-id')) - 1;
        }
        else {
            pageIndex = parseInt($(event.target).parent().attr('data-id'));
        }

        userFilterENT.CurrentPage = pageIndex;
        userFilterENT.RoleId = $("#js-role-id").val() === "0" ? null : $("#js-role-id").val();
        userFilterENT.UserName = $("#js-search-username").val() === "" ? null : $("#js-search-username").val();
        LoadUser(userFilterENT, userFilterENT.CurrentPage);
    });

    //SEARCH USER
    $("#js-table-user-container").on('submit', '#search-user-form', function (e) {

        e.preventDefault();

        userFilterENT.CurrentPage = GetCurrentPagePagination();
        userFilterENT.RoleId = $("#js-role-id").val() === "0" ? null : $("#js-role-id").val();
        userFilterENT.UserName = $("#js-search-username").val() === "" ? null : $("#js-search-username").val();

        LoadUser(userFilterENT, userFilterENT.CurrentPage);
    });

    //VIEW MODAL RESET PASSWORD
    // $("#js-table-user-container").on('click', '#js-popup-reset-password', function (e) {
    //     e.preventDefault();

    //     //CLEAR ELEMENT EXCEPT LOADING DIV
    //     $("#js-resetPassword-form-modal .modal-content").find("div:not(.loading-container)").remove();
    //     //SHOW LOADING
    //     $("#js-resetPassword-form-modal #js-loading-page").show();
    //     OpenModalWithLoading("#js-resetPassword-form-modal");

    //     let pageContent = $("<div/>");

    //     pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr) {
    //         if (statusTxt == "success") {

    //             //HIDE LOADING
    //             $("#js-resetPassword-form-modal #js-loading-page").hide();

    //             //APEND TEMPLATE FROM SERVER TO MODAL CONTENT
    //             $("#js-resetPassword-form-modal .modal-content").append(pageContent);

    //             //VALIDATION
    //             UnobtrusiveValidation(pageContent);

    //         } if (statusTxt == "error") {
    //             alert("Error: " + xhr.status + ": " + xhr.statusText);
    //         }
    //     });
    // });

    //VIEW MODAL DETAILS FOR CREATE AND UPDATE USERS
    $("#js-table-user-container").on('click', '#js-popup-user-add', function (e) {
        e.preventDefault();

        //CLEAR ELEMENT EXCEPT LOADING DIV
        $("#js-user-form-modal .modal-content").find("div:not(.loading-container)").remove();
        //SHOW LOADING
        $("#js-user-form-modal #js-loading-page").show();
        OpenModalWithLoading("#js-user-form-modal");

        let pageContent = $("<div/>");

        pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {

                //HIDE LOADING
                $("#js-user-form-modal #js-loading-page").hide();

                //APEND TEMPLATE FROM SERVER TO MODAL CONTENT
                $("#js-user-form-modal .modal-content").append(pageContent);

                $(".js-role-select").on('change', function () {

                    $("#js-rbm-id").val("0");
                    $("#js-region-id").val("0");

                    var selected = parseInt($(".js-role-select").val());

                    if (selected === 2) { //cc role
                        $(".show-rbm").show();
                        $(".show-region").hide();

                    } else if (selected === 3) { //rbm role
                        $(".show-region").show();
                        $(".show-rbm").hide();
                    } else {
                        $(".show-region").hide();
                        $(".show-rbm").hide();
                    }
                });

                //VALIDATION
                UnobtrusiveValidation(pageContent);

            } if (statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });

    //---AJAX

    //ADD USER
    $("#js-user-form-modal .modal-content").on('submit', '#js-user-form', function (e) {

        e.preventDefault();


        let selectedRoleText = $(".js-role-select option:selected").html();

        let rbmId = $("#js-rbm-id").val();
        let regionId = $("#js-region-id").val();

        if (selectedRoleText.toLowerCase() === "cc") {

            if (rbmId === "0") {
                WarningMessage("Warning", "Please Select Assign Manager");
                return;
            }

        } else if (selectedRoleText.toLowerCase() === "rbm") {
            if (regionId === "0") {

                WarningMessage("Warning", "Please Select Region");
                return;
            }
        }


        let formData = $(this).serializeArray();
        let UserVM = ConvertToObject(formData);

        let id = $("#js-hidden-userid").val();

        let apiUrl = "";
        let msg = "";

        if (id !== undefined && id !== "" && id !== null) {

            apiUrl = "/api/user/update";
            msg = "Updated";

        } else {

            apiUrl = "/api/user/add";
            msg = "Created";
        }

        PostAjax(apiUrl, UserVM).done(function () {

            RemoveLoading();

            $("#js-user-form-modal").modal('hide');

            userFilterENT.CurrentPage = GetCurrentPagePagination();
            userFilterENT.RoleId = $("#js-role-id").val() === "0" ? null : $("#js-role-id").val();
            userFilterENT.UserName = $("#js-search-username").val() === "" ? null : $("#js-search-username").val();

            SuccessMessage(msg, 'User Successfully ' + msg + '').then((result) => {
                LoadUser(userFilterENT, userFilterENT.CurrentPage);
            });

        }).fail(function (errMsg) {
            RemoveLoading();
            ErrorMessage("Error", errMsg.responseText);
        });
    });

    //RESET PASSWORD
    $("#js-table-user-container").on('click', '#js-popup-reset-password', function (e) {

        e.preventDefault();

        let userId = $(this).attr('data-userId');

        let password = "techfactors";

        var resetPassword = {
            NewPassword: password,
            ConfirmPassword: password,
            UserId: userId
        };

        var conf = ConfirmSwal("Reset Password?").then((result) => {
            if (result.value) {
                PostAjax("/api/account/resetPassword", resetPassword).done(function () {

                    RemoveLoading();
                    //CloseModal("#js-resetPassword-form-modal");
                    SuccessMessage("Updated", "Password successfully updated!");


                }).fail(function (errMsg) {
                    RemoveLoading();
                    WarningMessage("Warning", errMsg.responseText);
                });
            }
        });

    });

    //DISABLED USER
    $("#js-table-user-container").on('click', '#js-popup-user-deactivate', function (e) {
        e.preventDefault();

        var userId = $(this).attr('data-id');

        var conf = ConfirmSwal("The user can't access his/her account!").then((result) => {
            if (result.value) {

                PostAjax('/api/user/disable/' + userId + '', null).done(function () {
                    RemoveLoading();

                    userFilterENT.CurrentPage = GetCurrentPagePagination();
                    userFilterENT.RoleId = $("#js-role-id").val() === "0" ? null : $("#js-role-id").val();
                    userFilterENT.UserName = $("#js-search-username").val() === "" ? null : $("#js-search-username").val();

                    SuccessMessage("Disabled", "User Sucessfully Disabled.").then((result) => {
                        LoadUser(userFilterENT, userFilterENT.CurrentPage);
                    });

                }).fail(function (errMsg) {
                    RemoveLoading();

                    ErrorMessage("Error", '"' + errMsg.responseText + '"');
                });
            }
        });
    });

    //ENABLED USER
    $("#js-table-user-container").on('click', '#js-popup-user-activate', function (e) {
        e.preventDefault();

        var userId = $(this).attr('data-id');

        var conf = ConfirmSwal("The user can access his/her account!").then((result) => {
            if (result.value) {
                PostAjax('/api/user/enable/' + userId + '', null).done(function () {
                    RemoveLoading();

                    userFilterENT.CurrentPage = GetCurrentPagePagination();
                    userFilterENT.RoleId = $("#js-role-id").val() === "0" ? null : $("#js-role-id").val();
                    userFilterENT.UserName = $("#js-search-username").val() === "" ? null : $("#js-search-username").val();

                    SuccessMessage("Enabled", "User Sucessfully Enabled.").then((result) => {
                        LoadUser(userFilterENT, userFilterENT.CurrentPage);
                    });

                }).fail(function (errMsg) {
                    RemoveLoading();
                    ErrorMessage("Error", '"' + errMsg.responseText + '"');
                });
            }
        });
    });

    //toggle show/hide password
    $("#js-resetPassword-form-modal").on('click', '.toggle-password', function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});