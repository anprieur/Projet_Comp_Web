document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");
    const currentPageSpan = document.getElementById("current-page");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const overlay = document.getElementById("popup-overlay");

    // Popups
    const countryPopup = document.getElementById("country-popup");
    const flagPopup = document.getElementById("flag-popup");
    const flagImage = document.getElementById("popup-flag-img");

    // Contenu de la popup des détails du pays
    const popupTitle = document.getElementById("popup-title");
    const popupNativeName = document.getElementById("popup-nativeName");
    const popupCapital = document.getElementById("popup-capital");
    const popupTimezones = document.getElementById("popup-timezones");
    const popupCallingCodes = document.getElementById("popup-callingCodes");
    const popupCurrencies = document.getElementById("popup-currencies");
    const popupLanguages = document.getElementById("popup-languages");
    const popupBorders = document.getElementById("popup-borders");

    const itemsPerPage = 25;
    let currentPage = 1;
    const totalPages = Math.ceil(countries.length / itemsPerPage);

    // Fonction pour afficher un popup avec blur
    function showPopup(popupElement) {
        if (!popupElement) {
            console.error("⚠️ L'élément popup est introuvable !");
            return;
        }
        popupElement.style.display = "block";
        document.body.classList.add("blurred"); // Ajoute un blur si nécessaire
    }
    
    function hidePopup(popupElement) {
        if (!popupElement) {
            console.error("⚠️ L'élément popup à fermer est introuvable !");
            return;
        }
        popupElement.style.display = "none";
        document.body.classList.remove("blurred"); // Supprime le blur
    }

    // Gestion des boutons de fermeture
    document.querySelectorAll(".close-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            hidePopup(this.closest(".popup"));
        });
    });

    // Affichage du tableau avec pagination
    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCountries = countries.slice(startIndex, endIndex);

        tableBody.innerHTML = paginatedCountries.map((country, index) => {
            const name = country.translations?.fr || country.name;
            const population = country.population.toLocaleString();
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
            const continent = country.region || "N/A";
            const flagUrl = country.flags?.png || country.flag;

            return `
                <tr data-index="${startIndex + index}">
                    <td class="country-row">${name}</td>
                    <td class="country-row">${population}</td>
                    <td class="country-row">${area}</td>
                    <td class="country-row">${density}</td>
                    <td class="country-row">${continent}</td>
                    <td><img src="${flagUrl}" alt="Drapeau de ${name}" class="country-flag" width="50" data-index="${startIndex + index}"></td>
                </tr>
            `;
        }).join("");

        currentPageSpan.textContent = currentPage;
        prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
        nextBtn.style.display = currentPage === totalPages ? "none" : "inline-block";

        addEventListeners();
    }

    // Ajoute les événements après chaque rendu du tableau
    function addEventListeners() {
        // Clic sur un pays (sauf le drapeau)
        document.querySelectorAll(".country-row").forEach(cell => {
            cell.addEventListener("click", function () {
                const rowIndex = this.parentNode.getAttribute("data-index");
                showCountryPopup(countries[rowIndex]);
            });
        });

        // Clic sur un drapeau
        document.querySelectorAll(".country-flag").forEach(flag => {
            flag.addEventListener("click", function (event) {
                event.stopPropagation(); // Empêche l'ouverture de la popup du pays
                const countryIndex = this.getAttribute("data-index");
                showFlagPopup(countries[countryIndex]);
            });
        });
    }

    // Affiche la popup des détails du pays
    function showCountryPopup(country) {
        popupTitle.textContent = country.translations?.fr || country.name;
        popupNativeName.textContent = country.nativeName || "N/A";
        popupCapital.textContent = country.capital || "N/A";
        popupTimezones.textContent = country.timezones?.join(", ") || "N/A";
        popupCallingCodes.textContent = country.callingCodes?.map(code => `+${code}`).join(", ") || "N/A";
        popupCurrencies.textContent = country.currencies?.map(c => `${c.name} (${c.symbol})`).join(", ") || "N/A";
        popupLanguages.textContent = country.languages?.map(lang => `${lang.name} (${lang.nativeName})`).join(", ") || "N/A";

        const bordersList = country.borders && country.borders.length > 0 ? country.borders.join(", ") : "Aucune frontière";


        showPopup(countryPopup);
    }

    // Affiche le drapeau en grand
    function showFlagPopup(country) {
        flagImage.src = country.flags.svg || country.flags.png;
        flagImage.alt = `Drapeau de ${country.translations?.fr || country.name}`;
        showPopup(flagPopup);
    }

    // Navigation entre les pages
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
