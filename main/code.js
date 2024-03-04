var isRegisteringOrLogginging = false;

// Get the modal
var modal = document.getElementById('id01');

function ErrorLabel(error)
{
    document.getElementById("errorlabel").innerHTML = error;
    alert(error);
}

function GetUsername()
{
    return document.getElementById("uname").value;;
}

function GetPassword()
{
    return document.getElementById("psw").value;
}

function ValidateUsernamePassword()
{
    if (isRegisteringOrLogginging)
    {
        alert("Please wait...")
        return true;
    }

    const username = GetUsername();
    const password = GetPassword();

    if (username.length > 32 || username.length < 1)
    {
        ErrorLabel("Username is invalid (Please have a username between 1 to 32 characters!)");
        return true;
    }

    if (password.length > 32 || password.length < 1)
    {
        ErrorLabel("Password is invalid (Please have a password between 1 to 32 characters!)");
        return true;
    }

    return false;
}

document.getElementById("loginbutton").onclick = function()
{
    if (ValidateUsernamePassword()) return;

    const username = GetUsername();
    const password = GetPassword();

    isRegisteringOrLogginging = true;
    AttemptLogin(username, password, (response) => {
        isRegisteringOrLogginging = false;
        
        // Fails to connect to the server.
        if (response == null)
        {
            ErrorLabel("Cannot connect to server!");
            return;
        }
    
        // Error with registering.
        if (response.error)
        {
            ErrorLabel("Username already taken!");
            return;
        }
        
        // Successfully registered.
        alert("Succesfully logged in!")
        localStorage.setItem("token", response.token);
        modal.style.display = "none";
        window.location = '/profile/'; 
    }) 
}

document.getElementById("registerbutton").onclick = function()
{
    if (isRegisteringOrLogginging)
    {
        alert("Please wait...")
        return;
    }

    const username = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;

    if (username.length > 32 || username.length < 1)
    {
        ErrorLabel("Username is invalid (Please have a username between 1 to 32 characters!)");
        return;
    }

    if (password.length > 32 || password.length < 1)
    {
        ErrorLabel("Password is invalid (Please have a password between 1 to 32 characters!)");
        return;
    }

    isRegisteringOrLogginging = true;

    AttemptRegister(username, password, (response) => {
        isRegisteringOrLogginging = false;

        // Fails to connect to the server.
        if (response == null)
        {
            ErrorLabel("Cannot connect to server!");
            return;
        }
    
        // Error with registering.
        if (response.error)
        {
            ErrorLabel("Username already taken!");
            return;
        }
        
        // Successfully registered.
        alert("Succesfully signed up! Please log into your account.")
    }) 
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Check if they already logged in already.
VerifyToken((response) => {
    window.location = '/profile/'; 
}, () => {

})