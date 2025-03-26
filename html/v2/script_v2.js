document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");
    const currentPageSpan = document.getElementById("current-page");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const itemsPerPage = 25;
    let currentPage = 1;
    const totalPages = Math.ceil(countries.length / itemsPerPage);

    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCountries = countries.slice(startIndex, endIndex);

        const rows = paginatedCountries.map(country => {
            const name = country.translations?.fr || country.name;
            const population = country.population.toLocaleString();
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
            const continent = country.region || "N/A";
            const flagUrl = country.flags?.png || country.flag;

            return `
                <tr>
                    <td>${name}</td>
                    <td>${population}</td>
                    <td>${area}</td>
                    <td>${density}</td>
                    <td>${continent}</td>
                    <td><img src="${flagUrl}" alt="Drapeau de ${name}" width="50"></td>
                </tr>
            `;
        }).join("");

        tableBody.innerHTML = rows;
        currentPageSpan.textContent = currentPage;

        prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
        nextBtn.style.display = currentPage === totalPages ? "none" : "inline-block";
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    renderTable();
});
