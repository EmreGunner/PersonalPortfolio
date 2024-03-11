function generateQuery() {
    var keyword = document.getElementById('keyword').value;
    var siteSelect = document.getElementById('siteSelect').value;
    var site = siteSelect === "other" ? document.getElementById('site').value : siteSelect;
    var location = document.getElementById('location').value;
    var contactType = document.getElementById('contactType').value;
    var excludeTerms = document.getElementById('excludeTerms').value.split(',').map(term => '-' + term.trim()).join(' ');
        // Split the input on commas, prepend with '-inurl:' and join with spaces
        var excludeSites = document.getElementById('excludeSites').value.split(',')
        .map(path => '-inurl:' + path.trim())
        .join(' ');
    var relatedSite = document.getElementById('relatedSite').value;
    var relatedQueryPart = relatedSite ? 'related:' + relatedSite : '';
     // At the end of your generateQuery function, after displaying the results:
   
    var query = 'https://www.google.com/search?q=' + encodeURIComponent(keyword) +
                (location ? '+in+' + encodeURIComponent(location) : '') +
                '+intext:' + encodeURIComponent(contactType) +
                (site ? '+site:' + encodeURIComponent(site) : '') +
                ' ' + excludeTerms + 
                ' ' + excludeSites +
                ' ' + relatedQueryPart; // Add the related query part
                
                var resultDiv = document.getElementById('result');
                resultDiv.textContent = 'Generated Query URL: ' + query;
                resultDiv.style.display = 'block';

                var searchResultDiv = document.getElementById('searchResult');
                
                searchResultDiv.style.display = 'block'; // Now this will show below the result div

                var searchLink = document.getElementById('searchLink');
                searchLink.href = query; // Set the generated query URL to the href
                searchLink.textContent = 'Search on Google'; // User-friendly text
                
                // Display the result and searchResult sections
                document.getElementById('result').textContent = 'Generated Query URL: ' + query;
                   // Show the result and searchResult sections
                document.getElementById('result').style.display = 'block';

                document.getElementById('searchResult').style.display = 'flex';
                document.getElementById('searchResult').style.flexDirection = 'column';
                document.getElementById('searchResult').style.alignItems = 'flex-start';    
                // Show the search result section with the full URL and copy button
                var searchResult = document.getElementById('searchResult');
                searchResult.style.display = 'block';

                sendToMake(query); // This will send the query to Make.com

}

function toggleSiteInput() {
    var siteSelect = document.getElementById('siteSelect');
    var siteInput = document.getElementById('site');
    if (siteSelect.value === 'other') {
        siteInput.style.display = 'block';
    } else {
        siteInput.style.display = 'none';
    }
}

// Call toggleSiteInput on page load in case 'Other' is the default selected option
document.addEventListener('DOMContentLoaded', function() {
    toggleSiteInput();
});

// Function to copy the generated query to the clipboard
function copyToClipboard() {
    var query = document.getElementById('searchLink').href;
    navigator.clipboard.writeText(query).then(function() {
        alert('Copied to clipboard!');
    }, function(err) {
        alert('Error in copying text: ', err);
    });
}
function cleanResults() {
    // Hide and clear the result and searchResult sections
    document.getElementById('result').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('searchResult').style.display = 'none';
    var searchLink = document.getElementById('searchLink');
    searchLink.href = '#';
    searchLink.textContent = '';
}

function sendToMake(query) {
    fetch('https://hook.eu2.make.com/2kls3ubq48f3sfwc355xf59wdsy8gjvv', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() if the response is JSON
    })
    .then(data => {
        console.log('Success:', data);
        alert('Query sent to Make.com successfully.');
        console.log('Data:', query);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while sending the query to Make.com.');
    });
}
