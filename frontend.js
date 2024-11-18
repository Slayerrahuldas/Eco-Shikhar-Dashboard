document.addEventListener("DOMContentLoaded", function () {
    const csvFileUrl = "./data.csv"; // Path to your CSV file

    let tableData = [];

    // Fetch and parse the CSV file
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split("\n");
            tableData = rows.slice(1).map(row => row.split(",")); // Remove headers and split by comma
            populateTable(tableData);
            populateDropdowns(tableData);
        })
        .catch(error => console.error("Error loading CSV:", error));

    function populateTable(data) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear existing rows
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
        const uniqueValues = (colIndex) =>
            [...new Set(data.map(row => row[colIndex]).filter(value => value !== ""))];

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

    // Search functionality
    document.getElementById("search-bar").addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = tableData.filter(row =>
            row[0].toLowerCase().includes(searchTerm) || row[1].toLowerCase().includes(searchTerm)
        );
        populateTable(filteredData);
    });

    // Filter Buttons
    document.getElementById("filter-button-1").addEventListener("click", function () {
        const filteredData = tableData.filter(row => parseFloat(row[7]) < 1000);
        populateTable(filteredData);
    });

    document.getElementById("filter-button-2").addEventListener("click", function () {
        const filteredData = tableData.filter(row =>
            parseFloat(row[7]) < 500 && row[2].toLowerCase() === "yes"
        );
        populateTable(filteredData);
    });
});
