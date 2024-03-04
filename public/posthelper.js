function PostHelper(url, details, event)
{
    fetch(url, 
        {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Access-Control-Allow-Origin': '*'             
            },            
            body: details
        }
        )
    .then(function(data) {
        return data.json();

    })
    .then(function(data) {
        event(data);
    })
    .catch(function(error) {
        event(null)
    });
}