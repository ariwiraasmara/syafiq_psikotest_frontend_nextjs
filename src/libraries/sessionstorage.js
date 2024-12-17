class sessionStorage {
    constructor() {}

    set(key, value) {
        try {
            return localStorage.setItem(key, value);
        }
        catch (e) {
            return e;
            console.log(e);
        }
    }
    
    get(key) {
        try {
            return localStorage.getItem(key);
        }
        catch (e) {
            return e;
            console.log(e);
        }
    }

    remove(key) {
        return localStorage.removeItem(key);
    }
}