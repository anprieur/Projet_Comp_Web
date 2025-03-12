class Currency {
    static all_currencies={};

    constructor (c, n, s)
    {
        this._code=c;
        this._nom=n;
        this._symbole=s;
    }

    toString() { return `${this._code}, ${this._nom}, ${this._symbole}`}

    static fill_curencies() {
        countries.forEach(country => {
            const currencyData = country["currencies"][0];
            if (currencyData) {
                Currency.all_currencies[currencyData["code"]] = new Currency(
                    currencyData["code"], 
                    currencyData["name"], 
                    currencyData["symbol"]
                );
            }
        });
    }

}

Currency.fill_curencies();
console.table(Currency.all_currencies);
console.log(Currency.all_currencies["AFN"].toString());
