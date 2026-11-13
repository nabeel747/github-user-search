
document.getElementById("searchBtn").addEventListener("click", function () {

    // Step 1: Get the username
    const username = document.getElementById("usernameInput").value.trim();

    // Step 2: Check if input is empty
    if (username === "") {
        alert("Please enter a GitHub username");
        return;
    }

    // Step 3: Build API URL
    const requestURL = "https://api.github.com/users/" + encodeURIComponent(username);

    // Step 4: Send request using Fetch API
    fetch(requestURL)

        // Step 5: Check response
        .then(function (response) {

            if (!response.ok) {
                throw new Error("User not found");
            }

            // Convert JSON response into JavaScript object
            return response.json();
        })

        // Step 6: Display user information
        .then(function (data) {

            // Display user image
            const image = document.getElementById("image");

            image.onerror = function () {
                image.onerror = null;
                image.src = "https://placehold.co/100x100?text=User";
            };

            image.src = data.avatar_url ||
                "https://placehold.co/100x100?text=User";

            // Display username
            document.getElementById("username").textContent = data.login;

            // Display followers
            document.getElementById("followers").textContent = data.followers;

            // Display repositories
            document.getElementById("repos").textContent = data.public_repos;

            // Display following
            document.getElementById("following").textContent = data.following;

            // Display GitHub profile link
            document.getElementById("profileLink").href = data.html_url;

        })

        // Step 7: Handle errors
        .catch(function (error) {
            alert(error.message);
        });

});

// Step 8: Search when Enter key is pressed
document.getElementById("usernameInput").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }

});
