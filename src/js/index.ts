import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IUser {
    email: string
    password: string
}

const url: string = "https://anbo-authentication.azurewebsites.net/api/users"
// more advanced back end, try Firebase Authentication
// https://firebase.google.com/docs/auth/web/firebaseui

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        email: "",
        password: "",
        message: "",
        user: null
    },
    methods: {
        authenticate(email: string, password: string) {
            let url2: string = url + "/" + email + "/" + password
            console.log(url2)
            axios.get<IUser>(url2)
                .then((response: AxiosResponse<IUser>) => {
                    if (response.status == 200) {
                        this.user = response.data
                        this.message = "Welcome"
                    } else if (response.status == 204) { // no content
                        this.message = "Try again ..."
                    } else {
                        this.message = response.status + " " + response.statusText
                    }
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        }
    }
})