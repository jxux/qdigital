<template>
    <div class="layout-px-spacing">
        <div class="maintanence text-center">
            <div class="container-fluid maintanence-content">
                <div class="">
                    <div class="maintanence-hero-img">
                        <img alt="logo" src="../assets/images/logo-q.svg" />
                    </div>
                    <h1 class="error-title">En mantenimiento</h1>
                    <p class="error-text">Gracias por visitarnos.</p>
                    <p class="text">
                        Actualmente estamos trabajando para realizar algunas mejoras <br />
                        para brindarle una mejor experiencia de usuario.
                    </p>
                    <p class="text">Por favor visítenos nuevamente en breve.</p>
                    <router-link to="/" class="btn btn-info mt-4 me-4">Inicio</router-link>
                    <router-link class="btn btn-info mt-4 me-4" :to="{name: 'auth.login'}">Ingresar</router-link>
                    <router-link class="btn btn-info mt-4" :to="{name: 'auth.register'}">Registrase</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import "../assets/sass/pages/error/style-maintanence.scss";

    import { useMeta } from "../composables/use-meta";
    useMeta({ title: "Mantenimiento" });
</script>
