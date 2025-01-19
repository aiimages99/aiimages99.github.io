// JavaScript code to fetch posts from a sitemap, extract details, and populate related posts dynamically

document.addEventListener('DOMContentLoaded', async () => {
    const sitemapURL = '/aimodels-sitemap.xml';
    const relatedPost1 = document.getElementById('related-post-1');
    const relatedPost2 = document.getElementById('related-post-2');
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.style.display = 'none';
    relatedPost2.parentNode.appendChild(loadMoreButton);

    //style loadmore
    loadMoreButton.style.margin = '20px auto'; // Center the button horizontally
loadMoreButton.style.padding = '10px 20px'; // Add spacing inside the button
loadMoreButton.style.fontSize = '16px'; // Set a readable font size
loadMoreButton.style.fontWeight = 'bold'; // Make the text bold
loadMoreButton.style.color = '#fff'; // White text color
loadMoreButton.style.backgroundColor = '#007BFF'; // Blue background color
loadMoreButton.style.border = 'none'; // Remove border
loadMoreButton.style.borderRadius = '5px'; // Rounded corners
loadMoreButton.style.cursor = 'pointer'; // Change cursor to pointer on hover
loadMoreButton.style.transition = 'background-color 0.3s'; // Smooth background color transition

// Add hover effect using an event listener
loadMoreButton.addEventListener('mouseenter', () => {
    loadMoreButton.style.backgroundColor = '#0056b3'; // Darker blue on hover
});

loadMoreButton.addEventListener('mouseleave', () => {
    loadMoreButton.style.backgroundColor = '#007BFF'; // Original blue
});

    let posts = [];
    let currentIndex = 12; // Initial posts already loaded (4 in related-post-1 and 8 in related-post-2)

    try {
        // Fetch and parse the sitemap
        const sitemapResponse = await fetch(sitemapURL);
        const sitemapText = await sitemapResponse.text();

        const parser = new DOMParser();
        const sitemapXML = parser.parseFromString(sitemapText, 'application/xml');
        const locElements = sitemapXML.querySelectorAll('url > loc');

        // Extract post URLs
        posts = Array.from(locElements).map(el => el.textContent);

        // Load initial posts
        await loadPosts(0, 4, relatedPost1);
        await loadPosts(4, 12, relatedPost2);

        // Show the load more button
        loadMoreButton.style.display = 'block';

        // Load more posts on button click
        loadMoreButton.addEventListener('click', async () => {
            const nextIndex = currentIndex + 8;
            await loadPosts(currentIndex, nextIndex, relatedPost2);
            currentIndex = nextIndex;

            // Hide button if no more posts to load
            if (currentIndex >= posts.length) {
                loadMoreButton.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing sitemap:', error);
    }

    // Function to fetch Open Graph data and create related post elements
    async function loadPosts(start, end, container) {
        const fragment = document.createDocumentFragment();

        for (let i = start; i < end && i < posts.length; i++) {
            const postURL = posts[i];
            try {
                const response = await fetch(postURL);
                const htmlText = await response.text();
                const doc = new DOMParser().parseFromString(htmlText, 'text/html');

                const ogTitle = doc.querySelector('meta[property="og:title"]')?.content || 'No title available';
                const ogImage = doc.querySelector('meta[property="og:image"]')?.content || '';

                const postElement = document.createElement('div');
                postElement.className = 'related-post-item';
                postElement.innerHTML = `
                    <a href="${postURL}" target="_blank">
                        <div class="related-post-image" ><img src="${ogImage}"></div>
                        <div class="related-post-title">${ogTitle}</div>
                    </a>
                `;
                fragment.appendChild(postElement);
            } catch (error) {
                console.error('Error loading post:', postURL, error);
            }
        }

        container.appendChild(fragment);
    }
});
