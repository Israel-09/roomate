$(document).ready(function() {
    $('#password').keyup(function() {
        const password = $(this).val();
        let strength = 0;

        if (password.length >= 8) {
            strength += 1;
        }

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            strength += 1;
        }

        if (/\d/.test(password) && /[^\w\s]/.test(password)) {
            strength += 1;
        }

        let strengthPercentage = (strength / 3) * 100;
        $('#passwordStrength').width(strengthPercentage + '%');

        if (strength == 0) {
            $('#passwordStrength').removeClass().addClass('progress-bar bg-danger');
        } else if (strength == 1) {
            $('#passwordStrength').removeClass().addClass('progress-bar bg-warning');
        } else if (strength == 2) {
            $('#passwordStrength').removeClass().addClass('progress-bar bg-info');
        } else {
            $('#passwordStrength').removeClass().addClass('progress-bar bg-success');
        }
    });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const urlEncodedData = new URLSearchParams(formData);

    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success response
        alert('Account successfully created.')
        window.location.href = '/login.html';
        console.log(data);
    })
    .catch(error => {
        // Handle error
        console.error('There was a problem with the fetch operation:', error);
    });
});