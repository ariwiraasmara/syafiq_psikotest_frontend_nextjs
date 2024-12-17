export default function localStorage() {
    function set(key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    function get(key) {
        try {
            localStorage.getItem(key);
        }
        catch (e) {
            console.log(e);
        }
    }

    function remove(key) {
        try {
            localStorage.removeItem(key);
        }
        catch (e) {
            console.log(e);
        }
    }
}



