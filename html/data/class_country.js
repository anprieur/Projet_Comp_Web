class Country {
    static all_countries={};

    constructor (c, n, cap, cont, pop, vois)
    {
        this._code=c;
        this._nom=n;
        this._capital=cap;
        this._continent=cont;
        this._population=pop;
        this._voisins=vois;
    }

    toString() { return `${this._code}, ${this._nom}, ${this._capital}, ${this._continent}, ${this._population} hab, (${this._voisins})`}

    static fill_countries() {
        countries.forEach(country => {
            Country.all_countries[country["alpha3Code"]] = new Country(
                    country["alpha3Code"], 
                    country["name"],
                    country["capital"],
                    country["region"],
                    country["population"],
                    country["borders"]
            );
        });
    }

}

Country.fill_countries();
console.table(Country.all_countries);
console.log(Country.all_countries["AFG"].toString());
