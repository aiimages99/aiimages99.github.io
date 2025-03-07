document.addEventListener('DOMContentLoaded', async () => {
    const sitemapURL = '/aimodels-sitemap.xml';

    const relatedPost1 = document.getElementById('related-post-1');
    const relatedPost2 = document.getElementById('related-post-2');
    const loadMoreButton = document.createElement('button');

    loadMoreButton.textContent = 'Load More';
    loadMoreButton.style.display = 'none';
    relatedPost2.parentNode.appendChild(loadMoreButton);

    // Style load more button
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

    // Add hover effect
    loadMoreButton.addEventListener('mouseenter', () => {
        loadMoreButton.style.backgroundColor = '#0056b3'; // Darker blue on hover
    });

    loadMoreButton.addEventListener('mouseleave', () => {
        loadMoreButton.style.backgroundColor = '#007BFF'; // Original blue
    });

    // Add loading animation on click
    const loadingClass = 'loading';
    const style = document.createElement('style');
    style.textContent = `
        .${loadingClass} {
            position: relative;
        }
        .${loadingClass}::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    let posts = [];
    let currentIndex = 12;

    try {
        const sitemapResponse = await fetch(sitemapURL);
        const sitemapText = await sitemapResponse.text();

        const parser = new DOMParser();
        const sitemapXML = parser.parseFromString(sitemapText, 'application/xml');
        const locElements = sitemapXML.querySelectorAll('url > loc');

        posts = Array.from(locElements).map(el => el.textContent);

        await loadPosts(0, 4, relatedPost1);
        await loadPosts(4, 12, relatedPost2);

        loadMoreButton.style.display = 'block';

        loadMoreButton.addEventListener('click', async () => {
            // Add loading animation
            loadMoreButton.classList.add(loadingClass);
            loadMoreButton.disabled = true;

            setTimeout(async () => {
                const nextIndex = currentIndex + 8;
                await loadPosts(currentIndex, nextIndex, relatedPost2);
                currentIndex = nextIndex;

                if (currentIndex >= posts.length) {
                    loadMoreButton.style.display = 'none';
                }

                // Remove loading animation
                loadMoreButton.classList.remove(loadingClass);
                loadMoreButton.disabled = false;
            }, 1000); // Simulate a 1-second loading delay
        });
    } catch (error) {
        console.error('Error fetching or parsing sitemap:', error);
    }

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
                postElement.style.opacity = '0'; // Start invisible
                postElement.style.transition = 'opacity 1.5s ease-in'; // Add fade-in effect
                postElement.innerHTML = `
                    <a href="${postURL}" target="_blank">
                        <div class="related-post-image"><img src="${ogImage}" alt="${ogTitle}"></div>
                        <div class="related-post-title">${ogTitle}</div>
                    </a>
                `;
                fragment.appendChild(postElement);

                // Lazy load each post with a slight delay
                setTimeout(() => {
                    postElement.style.opacity = '1'; // Fade in
                }, (i - start) * 200); // Delay each post by 200ms
            } catch (error) {
                console.error('Error loading post:', postURL, error);
            }
        }

        container.appendChild(fragment);
    }
});
