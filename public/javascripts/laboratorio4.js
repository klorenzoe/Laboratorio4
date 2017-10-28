function loadJWT()
{
    var password = document.getElementById('JSON_PASSWORD').value;
    var content = document.getElementById('JSON_CONTENT').value;
    document.location.href=  "/JWT/" + password +"&&"+ content;
}
