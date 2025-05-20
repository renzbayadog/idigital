$(document).ready(function () {

    loadRole();   

    //load role
    function loadRole() {

        $("#js-table-Role #js-load-role").html(""); //view row data
        
        GetAjax("/api/role/list", null).done(function(response){

            RemoveLoading();

            var responseDataRole = response;

            var roleList = [];

            var i;
            for (i = 0; i < responseDataRole.length; i++) {

                var oRole = {
                    RoleId: responseDataRole[i].roleId,
                    RoleName: responseDataRole[i].name,
                    RoleDescription: responseDataRole[i].description
                };

                roleList.push(oRole);
            }

            if (roleList.length > 0) {

                var i;
                for (i = 0; i < roleList.length; i++) {

                    var tableBody = '<tr id="selected-row-' + roleList[i].RoleId + '">';
                    tableBody += '<td>' + roleList[i].RoleName + '</td>';
                    tableBody += '<td>' + roleList[i].RoleDescription + '</td>';
                    tableBody += '<td><a href="/role/roleMaintenance/new/' + roleList[i].RoleId + '" class="btn btn-link btn-sm popup">Edit</a><a href="/api/role/delete/' + roleList[i].RoleId + '" id="js-role-delete" data-id=' + roleList[i].RoleId + ' class="btn btn-link btn-sm">Delete</a></td>';
                    tableBody += '</tr>';

                    $("#js-table-Role #js-load-role").append(tableBody); //view row data
                }
            } else {
                $("#js-table-Role #js-load-role").append('<tr><td colspan="2">No results found</td></tr>');
            }
        });
    }

    //filter data
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        filterDataTable("#js-load-role tr", value)
    });

    //view update role in side
    $(".js-role-container").on('click', '.popup', function (e) {

        e.preventDefault();

        $("#role-update-container .load-update-role").html("");
        $("#js-loading-page").show();

        let pageContent = $("#role-update-container .load-update-role");
        pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                $("#js-loading-page").hide();
                UnobtrusiveValidation(pageContent); //load validation
            }if (statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        }); 
    });

    //create and update role
    $(".load-update-role").on('submit', '#js-role-form', function (e) {
        e.preventDefault();

        let roleId = $("#js-roleId").val();
        
        let apiUrl= "";
        let msg ="";

        if(parseInt(roleId) > 0){
            apiUrl = '/api/role/' + roleId + '/update';
            msg = 'Updated';
        }else{
            apiUrl = '/api/role/add'; 
            msg = 'Created';
        }

        var rolesDTO = {
            Name: $("#js-role-name").val(),            
            Description: $("#js-role-description").val(),
            RoleId: roleId,
        };

        PostAjax(apiUrl, rolesDTO).done(function (response) {
            RemoveLoading();
            SuccessMessage(msg, 'Your file has been '+msg.toLowerCase()+'');
            loadRole();
            ClearRoleElement();

        }).fail(function (errMsg) {
            RemoveLoading();
            ErrorMessage("Error", errMsg.responseText)
        });
    });

    //delete role
    $(".js-role-container").on('click', '#js-role-delete', function (e) {

        e.preventDefault();

        var roleId = $(this).attr('data-id');
        var conf = ConfirmSwal("You won't be able to revert this!").then((result) => {
            if (result.value) {

                DeleteAjax('/api/role/delete/' + roleId + '', null).done(function(){
                    RemoveLoading();
                    SuccessMessage("Deleted", "Your file has been deleted");
                    loadRole();
                    ClearRoleElement();
                }).fail(function(errMsg){
                    RemoveLoading();
                    WarningMessage(errMsg.responseText);
                });
            }
        });
    });

    //clear role details
    $(".load-update-role").on('click', "#closeBtnRole", function(){
        ClearRoleElement();
    });

    function ClearRoleElement() {
        $("#role-update-container").find(".load-update-role")
            .html('<div class="text-center">Click <strong>Action</strong> to view its details</div>');
    }
});
