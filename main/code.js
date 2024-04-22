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

function OpenLatLong(lat, long)
{
    var url = "https://maps.google.com/?q=" + long + "," + lat;
    window.open(url);
}

function CreateListElement(username, description, phone, lat, long)
{
    var list_element = `<main>
    <div class="list">
      <div class="line">
        <div class="user">
          <div class="details">
            <h3 class="username">`+username+`</h3>
            <h3 class="description">`+description+`</h3>
          </div>
          <div class="phone">
            <p>+`+phone+`</p>
          </div>
          <div class="location">
            <button type="button" onclick="OpenLatLong(`+lat+`,`+long+`)">Find Location</button> 
          </div>
        </div>
      </div>
    </div>
    </main>`;

    let list = document.getElementById("myList");
    let li = document.createElement('li');
    li.innerHTML = list_element;
    list.appendChild(li);
}

function GetNearbyListings(distance)
{
    let list = document.getElementById("myList");
    while(list.firstChild) list.removeChild(list.firstChild);

    navigator.geolocation.getCurrentPosition((position) => {
        const details = new URLSearchParams({
            'lat':position.coords.longitude,    
            'long':position.coords.latitude,
            'distance': distance
        })
        PostHelper(listingServerUrl + "/search/", details, (response) => {
            isRegisteringOrLogginging = false;
            
            // Fails to connect to the server.
            if (response == null)
            {
                console.log("Failed to connect!");
                return;
            }
        
            // Error with registering.
            if (response.error)
            {
                console.log("Failed to get listings.")
                return;
            }
            
            response.listings.forEach((element) =>   
                CreateListElement(element.username, element.description, element.phoneNumber, element.lat, element.long)
            );
        });
    });
}

var slider = document.getElementById('myRange');
var slidercounter = document.getElementById('slidercount');
slidercounter.style.color = "green";
slidercounter.innerText = 'Distance: 16 (KM)';

slider.addEventListener('change', function() {
    slidercounter.innerText = 'Distance: ' + slider.value + ' (KM)';
    GetNearbyListings(slider.value);
});

GetNearbyListings(16)