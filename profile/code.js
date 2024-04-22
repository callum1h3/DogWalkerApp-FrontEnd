// Check if they already logged in already.
VerifyToken((response) => {
    
}, () => {
    window.location = '/'; 
})

function LogOut()
{
    LogOutOfToken();
    window.location = '/'; 
}

function CreateOrUpdate()
{
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(document.getElementById("fdescription").value);
        const details = new URLSearchParams({
            'token': GetToken(),
            'description': document.getElementById("fdescription").value,
            'phoneNumber': document.getElementById("fphone").value,
            'lat':position.coords.longitude,    
            'long':position.coords.latitude
        });
        
        PostHelper(listingServerUrl + "/createlist/", details, (response) => {
            if (response.success)
            {
                alert("Successfully update/created listing!");
            }
            else
            {
                alert("Failed to create listing!");
            }
        });
    });
}

function DeleteListing()
{
    const details = new URLSearchParams({
        'token': GetToken()
    })
    PostHelper(listingServerUrl + "/deletelist/", details, (response) => {
        if (response.success)
        {
            alert("Successfully deleted!");
        }
        else
        {
            alert("Failed to delete!");
        }
    });
}