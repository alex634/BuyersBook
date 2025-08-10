class Communication {
    constructor(url) {
        this.url = url;
    }
    
    async #get_All_Books() {
        const r = await fetch(this.url + "/books");
        
        if (r.status >= 300 || r.status < 200) {
            throw "Bad http status code";
        }

        const data = await r.json();

        return data.books;
    }

    async #get_All_Pages(book_Name) {
        const params = new URLSearchParams({book_name: book_Name});
        const r = await fetch(this.url + `/pages?${params.toString()}`); 

        if (r.status >= 300 || r.status < 200) {
            throw "Bad http status code";
        }

        const data = await r.json();

        return data.pages;
    }

    async #get_All_Pages_All_Books() {
        const books = await this.#get_All_Books();
        let pages = [];

        for (const book of books) {
            const params = new URLSearchParams({book_name: book.book_name});
            const r = await fetch(this.url + `/pages?${params.toString()}`); 

            if (r.status >= 300 || r.status < 200) {
                throw "Bad http status code";
            }

            const data = await r.json();

            pages = [...pages, ...data.pages];
        }

        return pages;
    }
    
    get_All_Books() {
        return this.#get_All_Books();
    }

    get_All_Pages(book_Name) {
        return this.#get_All_Pages(book_Name);
    }

    get_All_Pages_All_Books() {
        return this.#get_All_Pages_All_Books();
    }

    get_Image_Url(file_Name) {
        return `${this.url}/image/${file_Name}`;
    }

}

export default Communication;