async function fetchHealthData() {
    // Define the URL with the API endpoint and parameters
    const apiUrl = 'https://health.gov/myhealthfinder/api/v3/myhealthfinder.json';
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;

    // Validate age input
    if (!age || isNaN(age) || age <= 0) {
        alert("Please enter a valid age."); // Show an alert if the age is invalid
        return; // Exit the function if age is invalid
    }

    // Construct the URL with parameters
    const urlWithParams = `${apiUrl}?age=${age}&sex=${gender}`;
    const fetchOptions = {
        method: 'GET'
    };

    try {
        const response = await fetch(urlWithParams, fetchOptions);
        const apiResult = await response.json();
        console.log(apiResult);

        const heading = apiResult.Result.MyHFHeading;
        const resources = apiResult.Result.Resources.all.Resource;

        // Create HTML elements to display the results
        const resultContainer = document.getElementById('healthInfoText');
        resultContainer.innerHTML = ''; // Clear previous content

        const headingElement = document.createElement('h3');
        headingElement.textContent = heading;
        resultContainer.appendChild(headingElement);

        resources.forEach(resource => {
            const paragraph = document.createElement('p');
            const link = document.createElement('a');
            link.textContent = resource.Title;
            link.href = resource.AccessibleVersion || '#'; // If AccessibleVersion is undefined, set '#' as href
            paragraph.appendChild(link);
            resultContainer.appendChild(paragraph);
        });

    } catch (error) {
        console.error(error);
    }
}