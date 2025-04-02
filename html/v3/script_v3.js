document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");
    const currentPageSpan = document.getElementById("current-page");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const popup = document.getElementById("country-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupPopulation = document.getElementById("popup-population");
    const popupArea = document.getElementById("popup-area");
    const popupDensity = document.getElementById("popup-density");
    const popupContinent = document.getElementById("popup-continent");
    const closeBtn = document.querySelector(".close-btn");

    const flagPopup = document.getElementById("flag-popup");
    const flagImg = document.getElementById("flag-img");
    const closeFlagBtn = document.querySelector(".close-flag-btn");

    const itemsPerPage = 25;
    let currentPage = 1;
    const totalPages = Math.ceil(countries.length / itemsPerPage);

    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCountries = countries.slice(startIndex, endIndex);

        const rows = paginatedCountries.map((country, index) => {
            const name = country.translations?.fr || country.name;
            const population = country.population.toLocaleString();
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
            const continent = country.region || "N/A";

            return `
                <tr data-index="${startIndex + index}">
                    <td>${name}</td>
                    <td>${population}</td>
                    <td>${area}</td>
                    <td>${density}</td>
                    <td>${continent}</td>
                    <td><img class="country-flag" src="${country.flags?.png}" alt="Drapeau de ${name}" width="50" data-flag="${country.flags?.png}"></td>
                </tr>
            `;
        }).join("");

        tableBody.innerHTML = rows;
        currentPageSpan.textContent = currentPage;

        prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
        nextBtn.style.display = currentPage === totalPages ? "none" : "inline-block";

        document.querySelectorAll("#countries-table tr").forEach(row => {
            row.addEventListener("click", function (event) {
                if (!event.target.classList.contains("country-flag")) {
                    const country = countries[this.getAttribute("data-index")];
                    popupTitle.textContent = country.translations?.fr || country.name;
                    popupPopulation.textContent = country.population.toLocaleString();
                    popupArea.textContent = country.area ? country.area.toLocaleString() : "N/A";
                    popupDensity.textContent = country.area ? (country.population / country.area).toFixed(2) : "N/A";
                    popupContinent.textContent = country.region || "N/A";
                    popup.style.display = "block";
                }
            });
        });

        document.querySelectorAll(".country-flag").forEach(flag => {
            flag.addEventListener("click", function (event) {
                event.stopPropagation(); // Empêche l'affichage des détails du pays
                flagImg.src = this.dataset.flag;
                flagPopup.style.display = "block";
            });
        });
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

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    closeFlagBtn.addEventListener("click", () => {
        flagPopup.style.display = "none";
    });

    renderTable();
});
