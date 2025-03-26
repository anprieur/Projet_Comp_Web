document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("countries-table");

    // Vérifier si les pays sont bien chargés
    if (!countries || countries.length === 0) {
        console.error("Les pays ne sont pas encore disponibles.");
        return;
    }

    // Générer les lignes avec map()
    const rows = countries.map(country => {
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

    // Ajouter les lignes dans le tableau
    tableBody.innerHTML = rows;
});
