document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pageNumber = document.getElementById("page-number");
    let currentPage = 1;
    const countriesPerPage = 25;

    function renderTable(page) {
        tableBody.innerHTML = ''; // Clear the table before rendering

        // Slice the countries array to show only the countries for the current page
        const startIndex = (page - 1) * countriesPerPage;
        const endIndex = page * countriesPerPage;
        const countriesToDisplay = countries.slice(startIndex, endIndex);

        countriesToDisplay.forEach((country, index) => {
            const name = country.translations?.fr || country.name;
            const population = country.population.toLocaleString();
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
            const continent = country.region || "N/A";
            const flagUrl = country.flags?.png || country.flag;

            const row = document.createElement("tr");
            row.setAttribute("data-index", startIndex + index); // Add an index attribute to identify the country clicked

            row.innerHTML = `
                <td>${name}</td>
                <td>${population}</td>
                <td>${area}</td>
                <td>${density}</td>
                <td>${continent}</td>
                <td><img src="${flagUrl}" alt="Drapeau de ${name}" width="50" class="flag-img"></td>
            `;

            // Click event to show country details
            row.addEventListener("click", function () {
                showCountryDetails(startIndex + index, row);
            });

            tableBody.appendChild(row);
        });

        pageNumber.textContent = `Page ${page}`;

        // Enable or disable the pagination buttons based on the page
        prevButton.disabled = page === 1;
        nextButton.disabled = page === Math.ceil(countries.length / countriesPerPage);
    }

    // Function to show country details
    function showCountryDetails(index, row) {
        const country = countries[index];
        const name = country.translations?.fr || country.name;
        const population = country.population.toLocaleString();
        const area = country.area ? country.area.toLocaleString() : "N/A";
        const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
        const continent = country.region || "N/A";
        const flagUrl = country.flags?.png || country.flag;

        const detailsRow = document.createElement("tr");
        detailsRow.setAttribute("class", "country-details");

        detailsRow.innerHTML = `
            <td colspan="6" class="country-details-cell">
                <div>
                    <h3>Details du pays : ${name}</h3>
                    <p><strong>Nom en français :</strong> ${name}</p>
                    <p><strong>Population :</strong> ${population}</p>
                    <p><strong>Surface :</strong> ${area} km²</p>
                    <p><strong>Densité de population :</strong> ${density} hab/km²</p>
                    <p><strong>Continent :</strong> ${continent}</p>
                    <p><strong>Drapeau :</strong></p>
                    <img src="${flagUrl}" alt="Drapeau de ${name}" width="100">
                    <button class="close-details">Fermer</button>
                </div>
            </td>
        `;

        // Insert the details row after the clicked row
        row.insertAdjacentElement("afterend", detailsRow);

        // Close details when button clicked
        detailsRow.querySelector(".close-details").addEventListener("click", function () {
            detailsRow.remove(); // Remove the details row when closing
        });
    }

    // Handle pagination buttons
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < Math.ceil(countries.length / countriesPerPage)) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    // Initial render
    renderTable(currentPage);
});
