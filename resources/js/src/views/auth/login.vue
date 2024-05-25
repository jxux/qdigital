<template>
    <div class="form full-form auth-cover">
        <div class="form-container">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">
                                Iniciar sesión en <router-link to="/"><span class="text-logo-principal">Qucha</span><span class="text-logo-auxiliar">Digital</span></router-link>
                            </h1>
                            <p class="signup-link">Nuevo aqui? <router-link :to="{name: 'auth.register'}">Crea una cuenta</router-link></p>
                            <form class="text-start" @submit.prevent="login(form)">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input type="email" class="form-control" placeholder="demo@quchadigital.com" v-model="form.email" :class="[ errors.email ? (form.email ? 'is-valid' : 'is-invalid') : '']"/>
                                        <div v-for="err in errors.email" :key="err" class="invalid-feedback">{{ err }}</div>
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input :type="pwd_type" class="form-control" placeholder="Password" v-model="form.password" :class="[ errors.password ? (form.password ? 'is-valid' : 'is-invalid') : '']"/>
                                        <div v-for="err in errors.password" :key="err" class="invalid-feedback">{{ err }}</div>
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper toggle-pass d-flex align-items-center">
                                            <p class="d-inline-block">Mostrar contraseña</p>
                                            <label class="switch s-primary mx-2">
                                                <input @click="set_pwd_type" type="checkbox" class="custom-control-input" checked="null" v-model="check"/>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Ingresar</button>
                                        </div>
                                    </div>

                                    <div class="field-wrapper text-center keep-logged-in">
                                        <div class="checkbox-outline-primary custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" value="true" id="chkRemember" />
                                            <label class="custom-control-label" for="chkRemember">Mantenme conectado</label>
                                        </div>
                                    </div>

                                    <div class="field-wrapper">
                                        <router-link :to="{name: 'auth.pass-recovery'}" class="forgot-pass-link">¿Has olvidado tu contraseña?</router-link>
                                    </div>
                                </div>
                            </form>
                            <p class="terms-conditions">
                                © 2024 All Rights Reserved. <router-link to="/"><span class="text-logo-principal">Qucha</span><span class="text-logo-auxiliar">Digital</span></router-link> is a product of Arrangic Solutions LLP.
                                <a href="javascript:void(0);">Cookie Preferences</a>, <a href="javascript:void(0);">Privacy</a>, and <a href="javascript:void(0);">Terms</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-image">
                <div class="l-image"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import "../../assets/sass/authentication/auth.scss";
    import { ref, onMounted } from "vue";
    import { useMeta } from "../../composables/use-meta";
    useMeta({ title: "Iniciar Sessión" });
    import axios from "axios";

    const check = ref(false)
    const pwd_type = ref("password");
    const form = ref({ email: "", password: "" })
    const errors = ref({ email: null, password: null });
    const set_pwd_type = () => {
        check.value = true;
        if (pwd_type.value === "password") {
            pwd_type.value = "text";
        } else {
            pwd_type.value = "password";
        }
    };

    const login = async (form) => {
        await axios.post('api/login', form).then(
            (res) => {
                console.log(res)
                if (res.status){
                    authStore.authUser = res.data.data;
                    authStore.authPhoto = res.data.data.photo;
                    authStore.authToken = res.data.data.token;
                    location.href ='/app/dashboard'
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                errors.value = err.response.data.errors
            }
        );
    }
</script>
