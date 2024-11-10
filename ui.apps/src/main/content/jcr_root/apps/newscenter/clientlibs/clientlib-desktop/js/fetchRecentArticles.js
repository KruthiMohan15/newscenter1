document.getElementById("fetchArticlesButton").addEventListener("click", fetchArticles);

function fetchArticles() {
    console.log("Fetching articles..."); // Log to check if the function is called
    fetch('/bin/newsportal/services/users') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            console.log("Articles data received:", data); // Log the data to check if it's correct
            displayArticles(data);  // Call function to display articles
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
            alert("An error occurred while fetching articles.");
        });
}

function displayArticles(articles) {
    console.log("Displaying articles..."); // Log to check if this function is called
    const container = document.getElementById("articlesContainer");
    container.innerHTML = "";  // Clear any existing content

    // Check if there are any articles
    if (Array.isArray(articles) && articles.length > 0) {
        articles.forEach(article => {
            console.log("Article:", article); // Log each article to see if it contains title and path

            // Create a new paragraph element for each article
            const articleElement = document.createElement("p");

            // Create a link element for the article
            const linkElement = document.createElement("a");
            linkElement.href = article.path;  // Set the link to the article's path
            linkElement.textContent = article.title;  // Set the link text to the article's title
            linkElement.target = "_blank";  // Open the link in a new tab

            // Append the link to the paragraph and the paragraph to the container
            articleElement.appendChild(linkElement);
            container.appendChild(articleElement);
        });
    } else {
        // If no articles, show a message
        const noArticlesMessage = document.createElement("p");
        noArticlesMessage.textContent = "No articles found.";
        container.appendChild(noArticlesMessage);
    }
}
