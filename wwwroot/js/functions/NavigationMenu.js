$(document).ready(function () {

    $body = $("body");
    
    loadMenu();

    function loadMenu() {
        $.ajax({
            url: '/api/menu/getmenu',
            type: 'GET',
            success: function (menu) {   
                var menuTemplate = '';
                for (let i = 0; i < menu.length; i++) {
                    menuTemplate += traverseMenu(menu[i]);
                }
                $('.main_menu #menu-container').html(menuTemplate);
                hoverSelectedNav();
            }
        });
    }
    
    function traverseMenu(currMenu) {
        let link = '';
        if (currMenu.link) link = 'href="' + currMenu.link + '"';
        let menuTemplate = '<li id="indic-' + currMenu.menuId + '" class="menu">';

        var disableFunc= "";

        if(currMenu.processControl === false){
            menuTemplate += '<a id="menu-id" data-id="' + currMenu.menuId + '" data-name="' + currMenu.name + '" ' + link + '>';
            menuTemplate += currMenu.name;
            if (currMenu.hasChildMenu) menuTemplate += '<span class="fa fa-chevron-down"></span>';
            menuTemplate += '</a>';
        }else{
            menuTemplate += '<a id="menu-id" class="btn disabled" data-id="' + currMenu.menuId + '" data-name="' + currMenu.name + '" ' + link + '>';
            menuTemplate += currMenu.name;
            if (currMenu.hasChildMenu) menuTemplate += '<span class="fa fa-chevron-down"></span>';
            menuTemplate += '</a>';
        }        

        if (currMenu.submenus.length > 0) {
            menuTemplate += '<ul id=submenuIndic-' + currMenu.menuId + ' class="nav child_menu">';

            for (let i = 0; i < currMenu.submenus.length; i++) {
                let submenu = currMenu.submenus[i];
                menuTemplate += traverseMenu(submenu);
            }
            menuTemplate += '</ul>';
        }

        menuTemplate += '</li>';
        return menuTemplate;
    }

    $("#menu-container").on('click', '#menu-id', function (e) { 

        e.preventDefault();

        var parentId = $(this).attr('data-id');
        var link = $(this).attr('href');

        var indicLIMenu = '#indic-' + parentId + '';
        var indicULMenu = '#submenuIndic-' + parentId + '';

        if ($('li.menu').hasClass('active') || $('li.menu').hasClass('current-page')) {

            var activeClass = $('li.menu.active').attr("id");
            var menuID = activeClass.split("-")[1];
            var liParentID = '#indic-' + menuID + '';
            var ulParentID = '#submenuIndic-' + menuID + '';

            if ($(indicLIMenu).parents(".child_menu").length > 0) { // if the current click has [parent ul child_menu]

                //clear active class
                $(indicLIMenu).siblings('.menu.active').removeClass('active');

                //check if selected has active class
                if ($(indicLIMenu).hasClass('active')) {
                    $(indicLIMenu).removeClass('active');
                    $(indicULMenu).css({ display: "none" });
                }
                else {
                    $(indicLIMenu).addClass("active");
                    $(indicULMenu).css('display', 'inline-block');
                }
            } else {

                if (indicLIMenu !== liParentID && indicULMenu !== ulParentID) {
                    $(indicLIMenu).addClass("active");
                    $(indicULMenu).css('display', 'inline-block');
                }

                $(liParentID).removeClass('active');
                $(ulParentID).css({ display: "none" });
            }
        }else {
            $(indicLIMenu).addClass("active");
            $(indicULMenu).css('display', 'inline-block');
        }

        //local storage is use when refreshing the page
        if (link !== "" && link !== null && link !== undefined) {
            //reference for selected menu
            localStorage.setItem("currentPageNav", indicLIMenu);
            window.location.href = link;
        }
    });

    function hoverSelectedNav() {

        var indicLIMenu = localStorage.getItem("currentPageNav");
        $(indicLIMenu).parentsUntil("li .menu").addClass('active');
        if (indicLIMenu !== "" || indicLIMenu !== null) {
            var parentsULCount = $(indicLIMenu).parents('.child_menu').length;
            if (parentsULCount == 2) {

                var firstulID = '#' + $(indicLIMenu).parents('.child_menu').eq(0).attr('id') + '';
                var firstliID = '#' + $(firstulID).parent().attr('id') + '';

                var ulID = '#' + $(indicLIMenu).parents('.child_menu').eq(1).attr('id') + '';
                var liID = '#' + $(ulID).parent().attr('id') + '';

                $(liID).addClass("active");
                $(firstliID).addClass("active");

                $(ulID).css('display', 'inline-block');
                $(firstulID).css('display', 'inline-block');

                $(indicLIMenu).addClass("active");

            } else if (parentsULCount == 1) {

                var aUL = '#' + $(indicLIMenu).parents('.child_menu').eq(0).attr('id') + '';
                var aLI = '#' + $(firstulID).parent().attr('id') + '';

                $(indicLIMenu).addClass("active");
                $(aLI).addClass("active");
                $(aUL).css('display', 'inline-block');

            } else {
                $(indicLIMenu).addClass("active");
            }
        }
    }

    $(".js-logout").click(function (e) {
        e.preventDefault();
        RemoveLocalStorageCurrentPageNav()
        window.location.href = $(this).attr('href');
    });
});