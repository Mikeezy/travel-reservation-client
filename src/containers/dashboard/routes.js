import Index from "./index/Index"
import SignUp from "./auth/SignUp"
import Login from "./auth/SignIn"
import SignUpConfirmation from "./auth/SignUpConfirmation"
import Bus from "./bus/Index"
import BusForm from "./bus/Form"
import Country from "./country/Index"
import CountryForm from "./country/Form"
import User from "./user/Index"
import UserForm from "./user/Form"


const routes = [{
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/bus",
        name: "Bus",
        icon: "ni ni-delivery-fast text-primary",
        component: Bus,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/bus/save",
        name: "Bus",
        component: BusForm,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/country",
        name: "Pays",
        icon: "ni ni-world text-primary",
        component: Country,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/country/save",
        name: "Pays",
        component: CountryForm,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/user",
        name: "Utilisateur",
        icon: "ni ni-single-02 text-primary",
        component: User,
        layout: "/admin",
        permission : ["super admin", "admin"]
    },
    {
        path: "/user/save",
        name: "Utilisateur",
        component: UserForm,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin"]
    },
    {
        path: "/confirmation/:token",
        name: "Confirmation",
        component: SignUpConfirmation,
        layout: "/auth"
    },
    {
        path: "/signin",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: SignUp,
        layout: "/auth"
    }
];
export default routes;