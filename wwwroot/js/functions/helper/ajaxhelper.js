//CALL THIS FOR AJAX
function PostAjax(apiUrl, payloadVM, hasScreenLoading = true){  
   return $.ajax({
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(payloadVM),
        contentType: "application/json",  
        beforeSend: function () { 
            if(hasScreenLoading){
                AddLoading(); 
            }
        },     
    });
}

function PutAjax(apiUrl, payloadVM, hasScreenLoading = true){  
   return $.ajax({
        type: "PUT",
        url: apiUrl,
        data: JSON.stringify(payloadVM),
        contentType: "application/json",  
        beforeSend: function () { 
            if(hasScreenLoading){
                AddLoading(); 
            }
        },      
    });
}

function GetAjax(apiUrl, payloadVM, hasScreenLoading = true){
    return $.ajax({
        type: "GET",
        url: apiUrl,
        data: payloadVM,
        contentType: "application/json",  
        beforeSend: function ()
        {
            if(hasScreenLoading)
            {
                AddLoading(); 
                //xhr.setRequestHeader("Authorization", `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXlheXpreUBnbWFpbC5jb20iLCJqdGkiOiI2ZjU5MmI1Mi0wNTYyLTRlYTMtOWQ2Zi03NTkzZjk4NmM5MWQiLCJleHAiOjE2MTY5MzQwNDEsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6InVzZXIifQ.x5VMfwBgG3mCzsGyrTYJIHxcrGuJWSCmUQQnDVNpYjQ"}`);
            }
        }     
    });
}

function GetAjaxWithoutLoading(apiUrl, payloadVM, hasScreenLoading = false) {
    return $.ajax({
        type: "GET",
        url: apiUrl,
        data: payloadVM,
        contentType: "application/json",
        beforeSend: function () {
            if (hasScreenLoading) {
                AddLoading();
                //xhr.setRequestHeader("Authorization", `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXlheXpreUBnbWFpbC5jb20iLCJqdGkiOiI2ZjU5MmI1Mi0wNTYyLTRlYTMtOWQ2Zi03NTkzZjk4NmM5MWQiLCJleHAiOjE2MTY5MzQwNDEsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6InVzZXIifQ.x5VMfwBgG3mCzsGyrTYJIHxcrGuJWSCmUQQnDVNpYjQ"}`);
            }
        }
    });
}


function DeleteAjax(apiUrl, payloadVM, hasScreenLoading = true){
    return $.ajax({
        type: "DELETE",
        url: apiUrl,
        contentType: "application/json",  
        beforeSend: function () { 
            if(hasScreenLoading){
                AddLoading(); 
            }
        },    
    });
}