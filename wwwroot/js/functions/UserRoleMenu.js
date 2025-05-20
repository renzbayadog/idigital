$(document).ready(function () {

    //view role assignment
    $(".js-menu-acc-container").on('click', "#js-view-assign-role", function (e) {

        e.preventDefault();      

        $("#role-container-assignment .load-role-assignment").html("");
        $("#js-loading-page").show();

        let pageContent = $("#role-container-assignment .load-role-assignment");
        pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr){
            if (statusTxt == "success") {
                $("#js-loading-page").hide();
            }if (statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });

    //click close for no assign menu
    $('.load-role-assignment').on('click', '#closeAssignRole', function () {
        clearRoleAssignElement(); // this function is in the global
    });

    //view modal form for assigning menu to role
    $(".js-menu-acc-container").on('click', '#js-user-role-menu', function (e) {

        e.preventDefault();

        var pageUrlRoleMenu = $(this).attr('href');

        var pageContent = $('<div/>');
        pageContent.load(pageUrlRoleMenu, function () {
            loadSelectionMenu();
        });

        $("#js-user-role-menu-modal").modal({
            backdrop: 'static',
            keyboard: false
        }).find('.modal-content').html(pageContent);
    });

    //assign menu to role
    $(".load-role-assignment").on('click','#js-assignRole-save', function(){

        var roleAssignment = [];

        $(".load-role-assignment input:checked").each(function(){
            roleAssignment.push($(this).val())
        });

        var conf = ConfirmSwal("Are you sure you want to continue?").then((result) => {
            if (result.value) {

                RemoveLoading();

                var model = {
                    RoleId: $("#js-roleId").val(),
                    MenuId: $("#js-menuId").val(),
                    RoleAssignments : roleAssignment
                };

                PostAjax("/api/menu/EditRoleMenuAssignment", model).done(function () {
                    RemoveLoading();
                    SuccessMessage("Assigned", "Successfully assigned menu to role");
                    clearRoleAssignElement(); // this function is in the global

                }).fail(function (errMsg) { 
                    RemoveLoading();
                    ErrorMessage("Error", errMsg.responseText);

                })
            }
        });

    });

    $(".load-role-assignment").on('click', '#js-assignRole-close', function(){
        clearRoleAssignElement(); // this function is in the global
    });

    function clearRoleAssignElement() {
        $("#role-container-assignment").find('.load-role-assignment')
            .html('<div class="text-center">Click <b>Assign Role</b> Action to view the details</div>');
    }
});