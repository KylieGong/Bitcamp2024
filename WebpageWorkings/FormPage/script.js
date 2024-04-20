document.getElementById("dataForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(event.target);
  const jsonData = {};

  // Convert form data to JSON
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  // Send JSON data to server
  fetch('/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data); // Print server response
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
