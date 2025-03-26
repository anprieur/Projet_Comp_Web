document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");
    const currentPageSpan = document.getElementById("current-page");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    
    const detailModal = document.getElementById("country-detail");
    const closeDetailBtn = document.getElementById("close-detail");
    
    const flagOverlay = document.getElementById("flag-overlay");
    const flagLarge = document.getElementById("flag-large");
    const closeFlagBtn = document.getElementById("close-flag");

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
                <tr data-name="${name}" data-population="${population}" 
                    data-area="${area}" data-density="${density}" data-continent="${continent}">
                    <td>${name}</td>
                    <td>${population}</td>
                    <td>${area}</td>
                    <td>${density}</td>
                    <td>${continent}</td>
                    <td><img src="${flagUrl}" alt="Drapeau de ${name}" width="50" class="flag-img"></td>
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

    // Gestion du clic sur un pays pour afficher les détails
    tableBody.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        if (!row) return;

        if (!event.target.classList.contains("flag-img")) {
            document.getElementById("detail-name").textContent = row.dataset.name;
            document.getElementById("detail-population").textContent = row.dataset.population;
            document.getElementById("detail-area").textContent = row.dataset.area;
            document.getElementById("detail-density").textContent = row.dataset.density;
            document.getElementById("detail-continent").textContent = row.dataset.continent;
            
            detailModal.classList.remove("hidden");
        }
    });

    // Fermeture de la zone de détail
    closeDetailBtn.addEventListener("click", () => {
        detailModal.classList.add("hidden");
    });

    // Gestion du clic sur un drapeau pour l'afficher en grand
    tableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("flag-img")) {
            flagLarge.src = event.target.src;
            flagOverlay.classList.remove("hidden");
        }
    });

    // Fermeture de l'affichage du drapeau
    closeFlagBtn.addEventListener("click", () => {
        flagOverlay.classList.add("hidden");
    });

    renderTable();
});
