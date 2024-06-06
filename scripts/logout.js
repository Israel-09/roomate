document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    async function logout() {
        try {
            const apiUrl = 'http://127.0.0.1:5000';
            const response = await fetch(`${apiUrl}/sessions`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                // Redirect user to login page or perform any other action
                window.location.href = '/login.html';
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', errorData.message);
                // Handle logout failure
            }
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle error
        }
    }

    logout();
    document.getElementById('dropdown-content').classList.remove('show');
});