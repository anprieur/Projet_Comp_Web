class Language {
    static all_languages={};

    constructor (i, n)
    {
        this._iso=i;
        this._nom=n;
    }

    toString() { return `${this._nom} (${this._iso})`}

    static fill_languages() {
        countries.forEach(country => {
            const currencyData = country["languages"];
            if (currencyData) {
              currencyData.forEach(language => {
                Language.all_languages[language["iso639_2"]] = new Language(
                    language["iso639_2"], 
                    language["name"]
                );
              });
            }
        });
    }

}

Language.fill_languages();
// console.table(Language.all_languages);
// console.log(Language.all_languages["pus"].toString());
