document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://excel-backend.onrender.com/data"; // Update this with your backend URL

    let tableData = [];

    // Fetch data from the backend
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            tableData = data;
            populateTable(data);
            populateDropdowns(data);
        })
        .catch(error => console.error("Error fetching data:", error));

    function populateTable(data) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear the table
        data.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function populateDropdowns(data) {
        const uniqueValues = (colIndex) => [...new Set(data.map(row => row[colIndex]))];

        const dropdowns = {
            "filter-deets-me-name": 3,
            "filter-deets-beat": 4,
            "filter-fnr-me-name": 5,
            "filter-fnr-beat": 6
        };

        for (const [id, colIndex] of Object.entries(dropdowns)) {
            const dropdown = document.getElementById(id);
            dropdown.innerHTML = '<option value="">Select</option>';
            uniqueValues(colIndex).forEach(value => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                dropdown.appendChild(option);
            });
        }
    }

    // Event listeners for filtering
    document.getElementById("filter-button-1").addEventListener("click", function () {
        const filteredData = tableData.filter(row => row[7] < 1000);
        populateTable(filteredData);
    });

    document.getElementById("filter-button-2").addEventListener("click", function () {
        const filteredData = tableData.filter(row => row[7] < 500 && row[2].toLowerCase() === "yes");
        populateTable(filteredData);
    });
});
