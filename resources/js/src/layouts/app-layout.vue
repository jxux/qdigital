<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <Header></Header>
        <!--  END NAVBAR  -->

        <!--  BEGIN MAIN CONTAINER  -->
        <div class="main-container" id="container" :class="[!$store.state.setting.is_show_sidebar ? 'sidebar-closed sbar-open' : '', $store.state.setting.menu_style === 'collapsible-vertical' ? 'collapsible-vertical-mobile' : '']">
            <!--  BEGIN OVERLAY  -->
            <div class="overlay" :class="{ show: !$store.state.setting.is_show_sidebar }" @click="$store.commit('setting/toggleSideBar', !$store.state.setting.is_show_sidebar)"></div>
            <div class="search-overlay" :class="{ show: $store.state.setting.is_show_search }" @click="$store.commit('setting/toggleSearch', !$store.state.setting.is_show_search)"></div>
            <!-- END OVERLAY -->

            <!--  BEGIN SIDEBAR  -->
            <Sidebar></Sidebar>
            <!--  END SIDEBAR  -->

            <!--  BEGIN CONTENT AREA  -->
            <div id="content" class="main-content">
                <router-view />

                <!-- BEGIN FOOTER -->
                <Footer></Footer>
                <!-- END FOOTER -->
            </div>
            <!--  END CONTENT AREA  -->
        </div>
    </div>
</template>

<script setup>
    import Header from "../components/layout/header.vue";
    import Sidebar from "../components/layout/sidebar.vue";
    import Footer from "../components/layout/footer.vue";
</script>
