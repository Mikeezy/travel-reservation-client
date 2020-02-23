import Index from "./index/Index"
import SignUp from "./auth/SignUp"
import Login from "./auth/SignIn"
import SignUpConfirmation from "./auth/SignUpConfirmation"
import ResetPasswordConfirmation from "./auth/ResetPasswordConfirmation"
import ResetPassword from "./auth/ResetPassword"
import Bus from "./bus/Index"
import BusForm from "./bus/Form"
import Country from "./country/Index"
import CountryForm from "./country/Form"
import User from "./user/Index"
import UserForm from "./user/Form"
import Town from "./town/Index"
import TownForm from "./town/Form"
import Travel from "./travel/Index"
import TravelForm from "./travel/Form"
import Booking from "./travel/Booking"
import BookingForm from "./travel/FormBooking"


const routes = [{
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/travel",
        name: "Voyage",
        icon: "ni ni-map-big text-primary",
        component: Travel,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/travel/save",
        name: "Voyage",
        component: TravelForm,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/travel/getBookings/:id",
        name: "Réservation",
        component: Booking,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/travel/addBookings/:id",
        name: "Réservation",
        component: BookingForm,
        layout: "/admin",
        hidden : true,
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/bus",
        name: "Bus",
        icon: "ni ni-bus-front-12 text-primary",
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
        path: "/town",
        name: "Ville",
        icon: "ni ni-istanbul text-primary",
        component: Town,
        layout: "/admin",
        permission : ["super admin", "admin", "manager"]
    },
    {
        path: "/town/save",
        name: "Ville",
        component: TownForm,
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
        path: "/confirmation_/:token",
        name: "Confirmation",
        component: SignUp,
        layout: "/auth"
    },
    {
        path: "/signin",
        name: "Login",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/resetPassword/:token",
        name: "Mot de passe oublié",
        component: ResetPasswordConfirmation,
        layout: "/auth"
    },
    {
        path: "/resetPassword_",
        name: "Mot de passe oublié",
        component: ResetPassword,
        layout: "/auth"
    }
];
export default routes;