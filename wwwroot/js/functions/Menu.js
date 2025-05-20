$(document).ready(function () {
    $.fn.extend({
        treed: function (o) {
            var openedClass = 'glyphicon-minus-sign';
            var closedClass = 'glyphicon-plus-sign';
            if (typeof o != 'undefined') {
                if (typeof o.openedClass != 'undefined') {
                    openedClass = o.openedClass;
                }
                if (typeof o.closedClass != 'undefined') {
                    closedClass = o.closedClass;
                }
            }

            //initialize each of the top levels
            var tree = $(this);
            tree.addClass("tree");
            tree.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                branch.addClass('branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();

                        localStorage.removeItem('menu-state');
                        localStorage.setItem("menu-state", '#' + branch.attr('id') + '');
                    }
                });
                //toggle all menu
                branch.children().children().toggle();
            });

            //fire event from the dynamically added icon
            tree.find('.branch .indicator').each(function () {
                $(this).on('click', function () {
                    $(this).closest('li').click();
                });
            });
            //fire event to open branch if the li contains an anchor instead of text
            tree.find('.branch>a').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
            //fire event to open branch if the li contains a button instead of text
            tree.find('.branch>button').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
        }
    });
});

$(document).ready(function () {
    let SESSION_HIDDEN_USER_ROLE = $("#SESSION_HIDDEN_USER_ROLE").val().toUpperCase();
    let userRoleEnum = UserRole; //MAP TO GLOBAL_ENTITIES

    LoadAllMenu();

    function traverseMenu(currMenu) {
        let link = '';
        if (currMenu.link) link = 'href="' + currMenu.link + '"';
        let menuTemplate = '<li id="indic-' + currMenu.menuId + '">';
        menuTemplate += '<a id="menu-id" data-id="' + currMenu.menuId + '" href="#">';
        menuTemplate += currMenu.name;
        menuTemplate += '</a> ';

        //if (currMenu.hasChildMenu) menuTemplate += '<span class="fa fa-chevron-down"></span>';
        menuTemplate += '<p style="color:green;">';

        //if(SESSION_HIDDEN_USER_ROLE === userRoleEnum.ADMIN){
            menuTemplate += '<i href="/menu/new/' + currMenu.menuId + '" id="js-menu-id" class="fa fa-plus" data-state="indic-' + currMenu.menuId + '"></i> ';
            menuTemplate += '<i href="/menu/' + currMenu.menuId + '/update" id="js-update-menu-id" class="fa fa-edit" data-state="indic-' + currMenu.menuId + '"></i> ';
            menuTemplate += '<i href="" data-id="' + currMenu.menuId + '" class="fa fa-trash"  id="js-remove-submenu" data-state="indic-' + currMenu.menuId + '"></i> ';
            menuTemplate += '<i href="/menu/assignmentMenuRole/' + currMenu.menuId + '"  id="js-view-assign-role" class="fa fa-briefcase" data-state="indic-' + currMenu.menuId + '"></i> ';
        //}else if(SESSION_HIDDEN_USER_ROLE === userRoleEnum.ADMIN_CUSTOMER_OPERATION){
            /*menuTemplate += '<i href="/menu/' + currMenu.menuId + '/update" id="js-update-menu-id" class="fa fa-edit" data-state="indic-' + currMenu.menuId + '"></i> ';*/
        //}

        menuTemplate += '</p>';

        if (currMenu.submenus.length > 0) {
            menuTemplate += '<ul id=submenuIndic-' + currMenu.menuId + ' class="child_menu">';

            for (let i = 0; i < currMenu.submenus.length; i++) {
                let submenu = currMenu.submenus[i];
                menuTemplate += traverseMenu(submenu);
            }
            menuTemplate += '</ul>';
        }

        menuTemplate += '</li>';
        return menuTemplate;
    }

    //load LIST MENU
    function LoadAllMenu() {
        $("#tree1").html("");
        $.ajax({
            type: "GET",
            url: "/api/menu/AllMenu",
            success: function (menu) {
                RemoveLoading();
                if (menu.length !== 0 && menu.length !== null) {
                    var menuTemplate = '';
                    for (let i = 0; i < menu.length; i++) {
                        menuTemplate += traverseMenu(menu[i]);
                    }
                    $("#tree1").html(menuTemplate);

                    $('#tree1').treed();

                    loadState();
                }
            }
        });
    }

    function loadState() {

        let curr = localStorage.getItem("menu-state");
        if (curr !== "" || curr !== undefined || curr !== null) {
            var parentsULCount = $(curr).parents('.child_menu').length; //check if has child menu
            var tree = "#tree1";
            if (parentsULCount == 3) {
                let submenu = '#' + $(curr).parents('.child_menu').eq(0).parent().attr('id');
                $(tree).find(submenu).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(submenu).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(submenu).children('p:first').children('i').css('display', 'inline-block');

                let submenu1 = '#' + $(curr).parents('.child_menu').eq(1).parent().attr('id');
                $(tree).find(submenu1).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(submenu1).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(submenu1).children('p:first').children('i').css('display', 'inline-block');

                let menu = '#' + $(curr).parents('.child_menu').eq(2).parent().attr('id');
                $(tree).find(menu).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(menu).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(menu).children('p:first').children('i').css('display', 'inline-block');

                $(tree).find(curr).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(curr).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(curr).children('p:first').children('i').css('display', 'inline-block');
            } else if (parentsULCount == 2) {
                let submenu = '#' + $(curr).parents('.child_menu').eq(0).parent().attr('id');
                $(tree).find(submenu).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(submenu).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(submenu).children('p:first').children('i').css('display', 'inline-block');

                let menu = '#' + $(curr).parents('.child_menu').eq(1).parent().attr('id');
                $(tree).find(menu).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(menu).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(menu).children('p:first').children('i').css('display', 'inline-block');

                $(tree).find(curr).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(curr).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(curr).children('p:first').children('i').css('display', 'inline-block');
            } else if (parentsULCount == 1) {
                let menu = '#' + $(curr).parents('.child_menu').parent().attr('id');
                $(tree).find(menu).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(menu).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(menu).children('p:first').children('i').css('display', 'inline-block');

                $(tree).find(curr).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(curr).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(curr).children('p:first').children('i').css('display', 'inline-block');
            } else { //when click main menu root
                $(tree).find(curr).children('ul:first').children('li').css('display', 'list-item');
                $(tree).find(curr).children('i:first').removeClass().addClass('indicator glyphicon glyphicon-minus-sign');
                $(tree).find(curr).children('p:first').children('i').css('display', 'inline-block');
            }
        }
    }

    $("#tree1").mouseover(function (e) {
        if (e.target.nodeName == 'LI') {
            console.log(e.target);
        }
    });

    $("#tree1").mouseout(function (e) {
        if (e.target.nodeName == 'LI') {
        }
    });

    $(".load-menu").on('click', '.panel', function () {

        var ParentPanelId = $(this).attr('data-id');

        localStorage.setItem("ParentId", ParentPanelId);
    });

    //filter accordion
    $("#myInput").keyup(function () {
        var value = $(this).val().toLowerCase();
        $(".panel").each(function () {
            var targetValue = $(this).attr('data-name');
            if (targetValue.toLowerCase().indexOf(value) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    //mouse over to view the function for menu
    $(".js-menu-acc-container").on('mouseover', '#hover-panel', function () {

        var menuId = $(this).attr('data-id');

        var btn = '.view-button-mainMenu-' + menuId + '';

        $(btn).show();
    });

    //mouse out to hide the function for menu
    $(".js-menu-acc-container").on('mouseout', '#hover-panel', function () {
        var menuId = $(this).attr('data-id');

        var btn = '.view-button-mainMenu-' + menuId + '';

        $(btn).hide();
    });

    //view modal form for creating MENU
    $(".js-menu-acc-container").on('click', '#js-menu-id', function (e) {

        e.preventDefault();

        localStorage.removeItem('menu-state');
        localStorage.setItem("menu-state", '#' + $(this).attr('data-state') + '');

        //CLEAR ELEMENT EXCEPT LOADING DIV
        $("#js-modal-menu .modal-content").find("div:not(.loading-container)").remove();

        $("#js-modal-menu #js-loading-page").show();
        OpenModalWithLoading("#js-modal-menu");

        let pageContent = $("<div/>");
        pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {

                //HIDE LOADING
                $("#js-modal-menu #js-loading-page").hide();

                //APPEND TEMPLATE FROM SERVER TO MODAL CONTENT
                $("#js-modal-menu .modal-content").append(pageContent);

                //VALIDATION
                UnobtrusiveValidation(pageContent);

            } if (statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });

    //view modal form for updating MENU
    $(".js-menu-acc-container").on('click', "#js-update-menu-id", function (e) {

        e.preventDefault();

        localStorage.removeItem('menu-state');
        localStorage.setItem("menu-state", '#' + $(this).attr('data-state') + '');

        //CLEAR ELEMENT EXCEPT LOADING DIV
        $("#js-update-modal-menu .modal-content").find("div:not(.loading-container)").remove();

        $("#js-update-modal-menu #js-loading-page").show();
        OpenModalWithLoading("#js-update-modal-menu");

        let pageContent = $("<div/>");
        pageContent.load($(this).attr('href'), function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                $("#js-update-modal-menu #js-loading-page").hide();

                //APPEND TEMPLATE FROM SERVER TO MODAL CONTENT
                $("#js-update-modal-menu .modal-content").append(pageContent);

                //VALIDATION
                UnobtrusiveValidation(pageContent);
            } if (statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });

    //create menu
    $("#js-modal-menu .modal-content").on('submit', '#js-menu-form', function (e) {
        e.preventDefault();

        var parentId = $("#js-parentId").val();

        var menuVM = {
            Name: $("#js-menu-name").val(),
            ParentId: parentId,
            MenuSequence: $("#js-menu-sequence").val(),
            Description: $("#js-menu-description").val(),
            Link: $("#js-link").val()
        };

        PostAjax("/api/menu/add", menuVM).done(function () {

            RemoveLoading();
            clearInputFieldsForAddMenu();
            $("#js-modal-menu").modal('hide');
            //SuccessMessage("Created", "Your file has been Created.");
            //LoadAllMenu();
            //window.location.href = "/menu/menuMaintenance";
            //alert(parentId);

            LoadAllMenu();

        }).fail(function (errMsg) {
            RemoveLoading();
            ErrorMessage("Error", errMsg.responseText);
        });
    });

    //update menu
    $("#js-update-modal-menu .modal-content").on('submit', "#js-menu-update-form", function (e) {

        e.preventDefault();

        var parentId = $("#js-update-parentId").val();
        var menuId = $("#js-update-menuId").val();

        var menuVM = {
            Name: $("#js-update-menu-name").val(),
            MenuSequence: $("#js-update-menu-sequence").val(),
            ParentId: parentId,
            MenuId: menuId,
            Description: $("#js-update-menu-description").val(),
            Link: $("#js-update-link").val(),
            ProcessControl: $("#js-process-control").val()
        };

        PutAjax("/api/menu/update", menuVM).done(function () {

            RemoveLoading();
            clearInputFieldsForUpdateMenu();
            $("#js-update-modal-menu").modal('hide');
            //SuccessMessage("Updated", "Your file has been Updated.");
            //LoadAllMenu();
            //window.location.href = "/menu/menuMaintenance";
            LoadAllMenu();

        }).fail(function (errMsg) {
            RemoveLoading();
            ErrorMessage("Error", errMsg.responseText);
        });
    });

    //delete menu
    $(".js-menu-acc-container").on('click', '#js-remove-submenu', function (e) {
        e.preventDefault();

        var menuId = $(this).attr('data-id');
        var liElement = '#'+$(this).attr('data-state')+'';

        var result = ConfirmSwal("You will not be able to revert this file!").then((result) => {

            if (result.value) {

                DeleteAjax('/api/menu/delete/' + menuId + '', null).done(function () {

                    RemoveLoading();
                    clearRoleAssignElement();
                    //SuccessMessage("Deleted", "Your file has been deleted");
                    //LoadAllMenu();
                    //window.location.href = "/menu/menuMaintenance";
                    //LoadAllMenu();

                   $(liElement).remove();

                }).fail(function (errMsg) {
                    RemoveLoading();
                    ErrorMessage("Error", errMsg.responseText);
                });
            }
        });
    });

    function clearInputFieldsForUpdateMenu() {
        $("#js-update-menuId").val("");
        $("#js-update-parentId").val("");
        $("#js-update-menu-name").val("");
        $("#js-update-menu-description").val("");
        $("#js-update-link").val("");
    }

    function clearInputFieldsForAddMenu() {
        $("#js-parentId").val("");
        $("#js-menu-name").val("");
        $("#js-menu-description").val("");
        $("#js-link").val("");
    }

    function clearRoleAssignElement() {
        $("#role-container-assignment").find('.load-role-assignment')
            .html('<div class="text-center">Click <b>Assign Role</b> Action to view the details</div>');
    }
});