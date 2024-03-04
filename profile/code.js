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