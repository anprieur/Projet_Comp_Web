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

console.log(outsideTheContinent());


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

console.log(moreNeighbors());


function neighborless() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        if (!country._voisins || country._voisins.length == 0) {
            result.push(country);
        }
    });

    return result;
}

console.log(neighborless());


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

console.log(moreLanguages());


function withCommonLanguage() {
    const result = [];
    const who = {};

    Object.values(Country.all_countries).forEach(country => {
        if (country._voisins && country._voisins.length > 0) {
            countryData = countries.find(c => c.alpha3Code === country._code);

            const hasNeighborwithCommonLanguage = country._voisins.some(neighborCode => {
                const neighbor = Country.all_countries[neighborCode];
                const neighborData = countries.find(c => c.alpha3Code === neighbor._code);
                
                // A modif
                // return neighbor && neighbor._continent !== country._continent;
            });

            if (hasNeighborwithCommonLanguage) {
                result.push(country);
            }
        }
    });

    return result;
}

console.log(withCommonLanguage());