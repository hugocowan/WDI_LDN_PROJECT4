//THis is instead of the satellizer package we used with angular.
class Auth {
    //static makes a singleton function appended to the constructor function,
    //not as a method on an object made by it.
    //It's so we can use this without making a new instance every page.
    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static getPayload() {
        const token = this.getToken();
        if (!token) return null;
        const parts = token.split('.');
        //This takes the payload part from the token:
        if (parts.length < 3) return null;
        //or:
        //Ignores first element in array, takes second, ignores rest.
        // const [ , encryptedPayload ] = token.split('.');

        //atob decrypts jwt payloads.
        return JSON.parse(atob(parts[1]));
    }

    static isAuthenticated() {
        const payload = this.getPayload();
        if (!payload) return false;
        const now = Math.round(Date.now() / 1000);
        //Will return false if the payload has expired.
        return now < payload.exp;
    }

    static isCurrentUser(user) {
        return this.isAuthenticated() && user._id === this.getPayload().sub;
    }
}

export default Auth;
