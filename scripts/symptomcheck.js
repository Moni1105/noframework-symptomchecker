

async function fetchData() {
    const symptoms = document.getElementById('symptoms').value.trim(); // Get the value of the symptoms textarea

    if (!symptoms) {
        alert("Please enter symptoms."); // Show an alert if the symptoms variable is empty
        return; // Exit the function if symptoms are empty
    }

    const url = 'https://symptom-checker4.p.rapidapi.com/analyze?symptoms=%3CREQUIRED%3E';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.MY_APIKEY,
            'X-RapidAPI-Host': 'symptom-checker4.p.rapidapi.com'
        },
        body: JSON.stringify({
            symptoms: symptoms // Pass the symptoms value to the body
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);

        // Display potential causes
        const potentialCausesDiv = document.getElementById('potentialCauses');
        potentialCausesDiv.innerHTML = '<h2>Potential Causes:</h2>';
        result.potentialCauses.forEach(cause => {
            potentialCausesDiv.innerHTML += `<p>${cause}</p>`;
        });

        // Display follow-up questions
        const followupQuestionsDiv = document.getElementById('followupQuestions');
        followupQuestionsDiv.innerHTML = '<h2>Follow-up Questions:</h2>';
        result.followupQuestions.forEach(question => {
            followupQuestionsDiv.innerHTML += `<p>${question}</p>`;
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Error fetching data. Please try again later.');
    }
}

function clearFields() {
    document.getElementById('symptoms').value = ''; // Clear the textarea
    document.getElementById('potentialCauses').innerHTML = ''; // Clear the potentialCauses div
    document.getElementById('followupQuestions').innerHTML = ''; // Clear the followupQuestions div
}
