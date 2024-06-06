
const apiUrl = 'http://127.0.0.1:5000';
const container = document.getElementById('matches-container');
container.innerHTML = '';

async function profile() {
    try {
        const response = await fetch(`${apiUrl}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            const headerElement = document.querySelector('.welcome.container-fluid h2');
            headerElement.textContent = `Welcome to finder, ${result.first_name}`;
        } else {
            alert(result.message);
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
        window.location.href = '/login.html';
    }
}

profile();



document.getElementById('profile-icon').addEventListener('click', function() {
    document.getElementById('dropdown-content').classList.toggle('show');
});

window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


document.querySelector('.explore').addEventListener('click', function() {
    const topN = 5; 

    fetch(`${apiUrl}/finder`,
        {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.match);
            displayMatches(data.match);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function displayMatches(matches) {
    const container = document.getElementById('matches-container');
    container.innerHTML = ''; 

    matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.classList.add('card', 'match');
        
        const matchImage = document.createElement('img');
        matchImage.src = 'https://placehold.co/100x100';
        matchImage.classList.add('card-img-top', 'match-img');
        matchImage.alt = 'match image';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `${match.name}`; // Replace with actual user name if available

        const cardCompatibility = document.createElement('p');
        cardCompatibility.innerHTML = `Compatibility: <span style="color: red; font-weight: 600;">${match.compatibility.toFixed(2)}%</span>`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCompatibility);

        matchCard.appendChild(matchImage);
        matchCard.appendChild(cardBody);

        container.appendChild(matchCard);
    });
}
