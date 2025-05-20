$(document).ready(function(){

    GetRoles();
    
    //get the list of role
    function GetRoles(){

        $(".js-role-list").html('').append('<option value="0">All</option>');

        GetAjax("/api/role/list").done(function(role){

            console.log(role);

            var i;
            
            for(i = 0; i < role.length; i++)
            {
                $(".js-role-list").append('<option value=' + role[i].roleId + '>' + role[i].name + ' (' + role[i].description+')</option>');
            }

            $("#js-role-list").val("0");
        });
    }
});