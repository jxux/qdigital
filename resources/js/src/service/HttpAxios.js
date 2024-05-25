// import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const url_servidor = "https://qdigital.test/api/";

export const http = () => {

    // const authStore = useAuthStore();
    const interceptor = axios.create({
        baseURL: url_servidor,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + store.state.auth.authToken,
        }
    });

    // configurar e interceptar errores (401, 403, 500)
    interceptor.interceptors.response.use(
        (response) => {
            return response
        },

        (error) => {
            if (error.response.status >= 500) {
                new window.Swal({
                    type: 'error',
                    title: 'Vaya...',
                    text: '¡Algo salió mal! Inténtalo de nuevo.',
                    reverseButtons: true,
                    confirmButtonText: 'De acuerdo',
                    cancelButtonText: 'Cancelar'
                })
            }else if(error.response.status === 401) {
                // localStorage.removeItem("activeUser")
                router.push({ name: 'auth.login' })
            // }else if (error.response.status == 422) {
            //     return error
            // }else{
            //     location.href ='/not-authorization'
            }

            return Promise.reject(error)
        }
    )
    return interceptor;
}
