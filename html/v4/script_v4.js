document.addEventListener("DOMContentLoaded", function () {

    ///////////////////////////////////////////////////
    ///                 Constante                   ///
    ///////////////////////////////////////////////////

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
    let filteredCountries = [...countries];



    ///////////////////////////////////////////////////
    ///                   V1                        ///
    ///////////////////////////////////////////////////

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
        const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

        tableBody.innerHTML = paginatedCountries.map((country, index) => {
            const name = country.translations?.fr || country.name;
            const population = country.population.toLocaleString();
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const density = country.area ? (country.population / country.area).toFixed(2) : "N/A";
            const continent = country.region || "N/A";
            const flagUrl = country.flags?.png || country.flag;

            return `
                <tr class="countries" 
                    data-index="${startIndex + index}" 
                    data-name='${name}'
                    data-languages='${JSON.stringify(country.languages.map(lang => lang.name))}'
                    data-continent='${continent}'
                >
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

        const totalFilteredPages = Math.ceil(filteredCountries.length / itemsPerPage);
        nextBtn.style.display = currentPage >= totalFilteredPages || totalFilteredPages === 0 ? "none" : "inline-block";
    }



    ///////////////////////////////////////////////////
    ///                   V2                        ///
    ///////////////////////////////////////////////////

    // Navigation entre les pages
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(filteredCountries.length / itemsPerPage)) {
            currentPage++;
            renderTable();
        }
    });



    ///////////////////////////////////////////////////
    ///                   V3                        ///
    ///////////////////////////////////////////////////

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



    ///////////////////////////////////////////////////
    ///                   V4                        ///
    ///////////////////////////////////////////////////

    // Input filtres
    const searchInput = document.querySelector('.search-input');
    const searchSelect = document.querySelectorAll('.search-select');
    const countryItems = document.querySelectorAll('.countries');

    const searchOptions = document.querySelector('.search-options');
    const selectElements = document.querySelectorAll('.search-select');
    const continentSelect = selectElements[0];
    const addedContinents = new Set();
    const langueSelect = selectElements[1];

    Object.values(Country.all_countries).forEach(country => {
        if (!addedContinents.has(country._continent)) {
            const option = document.createElement('option');
            option.value = country._continent;
            option.textContent = country._continent;
            continentSelect.appendChild(option);

            addedContinents.add(country._continent);
        }
    });

    Object.values(Language.all_languages).forEach(langue => {
        const option = document.createElement('option');
        option.value = langue._nom;
        option.textContent = langue._nom;
        langueSelect.appendChild(option);
    });


    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const continent = continentSelect.value;
        const langue = langueSelect.value;
    
        filteredCountries = countries.filter(country => {
            const nameMatch = (country.translations?.fr || country.name).toLowerCase().includes(query);
            const continentMatch = (continent === 'all' || continent === country.region);
            const langueMatch = (langue === 'all' || (country.languages?.some(lang => lang.name === langue)));
    
            return nameMatch && continentMatch && langueMatch;
        });
    
        currentPage = 1;
        renderTable();
    }
    
    searchInput.addEventListener('input', applyFilters);
    searchOptions.addEventListener('change', applyFilters);

    renderTable();
    
});
