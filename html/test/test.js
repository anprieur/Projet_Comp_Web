function outsideTheContinent() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        if (country._voisins && country._voisins.length > 0) {
            const hasNeighborOutsideContinent = country._voisins.some(neighborCode => {
                const neighbor = Country.all_countries[neighborCode];
                return neighbor && neighbor._continent !== country._continent;
            });

            if (hasNeighborOutsideContinent) {
                result.push(country);
            }
        }
    });

    return result;
}

// console.log(outsideTheContinent());


function moreNeighbors() {
    let maxNeighbor=0, result;

    Object.values(Country.all_countries).forEach(country => {
        if (country._voisins && country._voisins.length > maxNeighbor) {
            maxNeighbor = country._voisins.length;
            result=country;
        }
    });

    return result;
}

// console.log(moreNeighbors());


function neighborless() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        if (!country._voisins || country._voisins.length == 0) {
            result.push(country);
        }
    });

    return result;
}

// console.log(neighborless());


function moreLanguages() {
    let maxLanguage=0, result;

    Object.values(Country.all_countries).forEach(country => {
        const countryData = countries.find(c => c.alpha3Code === country._code);

        if (countryData.languages && countryData.languages.length > maxLanguage) {
            maxLanguage = countryData.languages.length;
            result = countryData;
        }
    });

    //// Ici ca affiche tous les objets Language du pays
    // console.log(result.name);
    // Object.values(result.languages).forEach(language => {
    //     console.log(language);
    // });

    return result;
}

// console.log(moreLanguages());

function withCommonLanguage() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        const countryData = countries.find(c => c.alpha3Code === country._code);
        if (!countryData || !countryData.languages) return;

        if (!Array.isArray(country._voisins) || country._voisins.length === 0) return;

        let commonNeighbors = [];
        let commonLanguages = new Set();

        country._voisins.forEach(neighborCode => {
            const neighbor = Country.all_countries[neighborCode];
            if (!neighbor) return;

            const neighborData = countries.find(c => c.alpha3Code === neighbor._code);
            if (!neighborData || !neighborData.languages) return;

            const sharedLanguages = neighborData.languages.filter(lang =>
                countryData.languages.some(cl => cl.iso639_1 === lang.iso639_1)
            );

            if (sharedLanguages.length > 0) {
                commonNeighbors.push(neighbor);
                sharedLanguages.forEach(lang => commonLanguages.add(Language.all_languages[lang.iso639_2]));
            }
        });

        if (commonNeighbors.length > 0) {
            result.push({
                country,
                neighbors: commonNeighbors,
                languages: Array.from(commonLanguages)
            });
        }
    });

    return result;
}

// console.table(withCommonLanguage());

function withoutCommonCurrency() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        const countryData = countries.find(c => c.alpha3Code === country._code);
        if (!countryData || !countryData.currencies) return;

        if (!Array.isArray(country._voisins) || country._voisins.length === 0) return;

        const hasCommonCurrency = country._voisins.some(neighborCode => {
            const neighbor = Country.all_countries[neighborCode];
            if (!neighbor) return false;

            const neighborData = countries.find(c => c.alpha3Code === neighbor._code);
            if (!neighborData || !neighborData.currencies) return false;

            return neighborData.currencies.some(currency =>
                countryData.currencies.some(c => c.code === currency.code)
            );
        });

        if (!hasCommonCurrency) {
            result.push(country);
        }
    });

    return result;
}

// console.table(withoutCommonCurrency());

function sortingDecreasingDensity() {
    return Object.values(Country.all_countries)
        .map(country => {
            const countryData = countries.find(c => c.alpha3Code === country._code);
            return countryData && countryData.area
                ? { country, density: country._population / countryData.area }
                : { country, density: 0 };
        })
        .sort((a, b) => b.density - a.density)
        .map(item => item.country);
}

console.table(sortingDecreasingDensity());

function moreTopLevelDomains() {
    return Object.values(Country.all_countries).filter(country => {
        const countryData = countries.find(c => c.alpha3Code === country._code);
        return countryData && countryData.topLevelDomain && countryData.topLevelDomain.length > 1;
    });
}

// console.table(moreTopLevelDomains());




window.outsideTheContinent = outsideTheContinent;
window.moreNeighbors = moreNeighbors;
window.neighborless = neighborless;
window.moreLanguages = moreLanguages;
window.withCommonLanguage = withCommonLanguage;