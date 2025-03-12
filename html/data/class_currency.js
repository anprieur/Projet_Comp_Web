class Currency {
    static all_currencies;

    constructor (c, n, s)
    {
        this._code=c;
        this._nom=n;
        this._symbole=s;
    }

    toString() { return `${this._code}, ${this._nom}, ${this._symbole}`}

    fill_curencies() {
        countries.forEach( countrie =>{
            all_currencies[countrie["currencies"][0]["code"]] = new Currency(countrie["currencies"][0]["code"], countrie["currencies"][0]["name"], countrie["currencies"][0]["symbol"]);
        });
    }

}
