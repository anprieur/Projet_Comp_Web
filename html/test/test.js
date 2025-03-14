function outsideTheContinent() {
    const result = [];

    Object.values(Country.all_countries).forEach(country => {
        const hasNeighborOutsideContinent = country._voisins.some(neighborCode => {
            const neighbor = Country.all_countries[neighborCode];
            return neighbor && neighbor._continent !== country._continent;
        });

        if (hasNeighborOutsideContinent) {
            result.push(country);
        }
    });

    return result;
}

console.log(outsideTheContinent());