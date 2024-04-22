const loginServerPort = 3005;
const listingServerPort = 3010;
const loginServerUrl = "http://" + self.location.hostname + ":" + loginServerPort;
const listingServerUrl = "http://" + self.location.hostname + ":" + listingServerPort;

function AttemptLogin(username, password, event)
{
    const details = new URLSearchParams({
        'username':username,    
        'password':password
    })

    PostHelper(loginServerUrl + "/login/", details, event);
}

function LogOutOfToken()
{
    localStorage.removeItem("token");
}

function GetToken()
{
    return localStorage.getItem("token");
}

function VerifyToken(onsuccess, onfailure)
{
    const token = GetToken();

    const details = new URLSearchParams({
        'token':token
    })

    PostHelper(loginServerUrl + "/verify/", details, (response) => {
        if (response == null)
        {
            onfailure()
            return;
        }
    
        // Error with registering.
        if (response.error)
        {
            onfailure()
            return;
        }

        onsuccess(response)
    });
}

function AttemptRegister(username, password, event)
{
    const details = new URLSearchParams({
        'username':username,    
        'password':password
    })

    PostHelper(loginServerUrl + "/register/", details, event);
}
