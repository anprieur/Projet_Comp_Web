class Country {
    static all_countries={};

    constructor (c, n, cap, cont, pop)
    {
        this._code=c;
        this._nom=n;
        this._capital=cap;
        this._continent=cont;
        this._population=pop;
        this._voisins=[];
    }

    toString() { return `${this._code}, ${this._nom}, ${this._capital}, ${this._continent}, ${this._population} hab, (${this._voisins})`}

    static fill_countries() {
        countries.forEach(country => {
            Country.all_countries[language["iso639_2"]] = new Country(
                    language["iso639_2"], 
                    language["name"]);
        });
    }

}

Country.fill_countries();
console.table(Country.all_countries);
console.log(Country.all_countries["pus"].toString());
