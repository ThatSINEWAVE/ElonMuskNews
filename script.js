// script.js

document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById('news-container');
    const moreNewsButton = document.getElementById('more-news');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://elonmu.sh/api';

    const fetchNews = async () => {
        try {
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            displayNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const displayNews = (news) => {
        // Clear the existing news content
        newsContainer.innerHTML = '';

        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const newsTitle = document.createElement('h2');
        newsTitle.className = 'news-title';
        newsTitle.textContent = news.title;

        const newsDescription = document.createElement('p');
        newsDescription.className = 'news-description';
        newsDescription.textContent = news.description;

        const newsImage = document.createElement('img');
        newsImage.className = 'news-image';
        newsImage.src = news.urlImage;
        newsImage.alt = news.title;

        const newsSource = document.createElement('div');
        newsSource.className = 'news-source';

        const sourceLink = document.createElement('a');
        sourceLink.href = news.url;
        sourceLink.target = '_blank';
        sourceLink.textContent = news.source;

        const publishDate = document.createElement('span');
        publishDate.textContent = new Date(news.publishDate).toLocaleDateString();

        newsSource.appendChild(sourceLink);
        newsSource.appendChild(publishDate);

        newsItem.appendChild(newsTitle);
        newsItem.appendChild(newsDescription);
        newsItem.appendChild(newsImage);
        newsItem.appendChild(newsSource);

        newsContainer.appendChild(newsItem);
    };

    moreNewsButton.addEventListener('click', fetchNews);

    // Fetch the first news on page load
    fetchNews();
});
