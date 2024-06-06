fetch('http://0.0.0.0:5000/sessions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        email: 'israelinene91@gmail.com',
        password: 'Oline.inc.'
    })
})
.then(response => {
    if (!response.ok) {
        return response.text().then(err => { throw new Error(err); });
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});
