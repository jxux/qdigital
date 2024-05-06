<template>
    <div class="layout-px-spacing dash_1">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active"><a href="javascript:;">Dashboard</a></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <ul class="navbar-nav flex-row ms-auto">
                <li class="nav-item more-dropdown">
                    <div class="dropdown custom-dropdown-icon">
                        <a href="javascript:;" class="nav-link dropdown-toggle" id="ddlSettings" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Settings</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                            <li><a class="dropdown-item" data-value="Settings" href="javascript:void(0);">Settings</a></li>
                            <li><a class="dropdown-item" data-value="Mail" href="javascript:void(0);">Mail</a></li>
                            <li><a class="dropdown-item" data-value="Print" href="javascript:void(0);">Print</a></li>
                            <li><a class="dropdown-item" data-value="Download" href="javascript:void(0);">Download</a></li>
                            <li><a class="dropdown-item" data-value="Share" href="javascript:void(0);">Share</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">
            <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-revenue">
                    <div class="widget-heading">
                        <h5>Revenue</h5>
                        <div class="dropdown btn-group">
                            <a href="javascript:;" id="ddlRevenue" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-more-horizontal"
                                >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlRevenue">
                                <li><a href="javascript:;" class="dropdown-item">Weekly</a></li>
                                <li><a href="javascript:;" class="dropdown-item">Monthly</a></li>
                                <li><a href="javascript:;" class="dropdown-item">Yearly</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="widget-content">
                        <div class="chart-title">Total Profit <span class="text-primary ms-1">$10,840</span></div>
                        <apex-chart v-if="revenue_options" height="325" type="area" :options="revenue_options" :series="revenue_series"></apex-chart>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-sales-category">
                    <div class="widget-heading">
                        <h5>Sales by Category</h5>
                    </div>
                    <div class="widget-content">
                        <apex-chart v-if="sales_donut_options" height="460" type="donut" :options="sales_donut_options" :series="sales_donut_series"></apex-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import "../assets/sass/widgets/widgets.scss";
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import ApexChart from "vue3-apexcharts";

    import { useMeta } from "../composables/use-meta";
    useMeta({ title: "Dashboard" });

    const store = useStore();

    //Revenue
    const revenue_series = ref([
        { name: "Income", data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000] },
        { name: "Expenses", data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000] },
    ]);
    const revenue_options = computed(() => {
        const is_dark = store.state.setting.is_dark_mode;
        return {
            chart: {
                fontFamily: "Nunito, sans-serif",
                zoom: { enabled: false },
                toolbar: { show: false },
            },
            dataLabels: { enabled: false },
            stroke: { show: true, curve: "smooth", width: 2, lineCap: "square" },
            dropShadow: { enabled: true, opacity: 0.2, blur: 10, left: -7, top: 22 },
            colors: is_dark ? ["#2196f3", "#e7515a"] : ["#1b55e2", "#e7515a"],
            markers: {
                discrete: [
                    { seriesIndex: 0, dataPointIndex: 6, fillColor: "#1b55e2", strokeColor: "#fff", size: 7 },
                    { seriesIndex: 1, dataPointIndex: 5, fillColor: "#e7515a", strokeColor: "#fff", size: 7 },
                ],
            },
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                crosshairs: { show: true },
                labels: { offsetX: 0, offsetY: 5, style: { fontSize: "12px", fontFamily: "Nunito, sans-serif", cssClass: "apexcharts-xaxis-title" } },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: function (value) {
                        return value / 1000 + "K";
                    },
                    offsetX: -10,
                    offsetY: 0,
                    style: { fontSize: "12px", fontFamily: "Nunito, sans-serif", cssClass: "apexcharts-yaxis-title" },
                },
            },
            grid: {
                borderColor: is_dark ? "#191e3a" : "#e0e6ed",
                strokeDashArray: 5,
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: false } },
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                offsetY: 0,
                fontSize: "16px",
                fontFamily: "Nunito, sans-serif",
                markers: { width: 10, height: 10, strokeWidth: 0, strokeColor: "#fff", fillColors: undefined, radius: 12, onClick: undefined, offsetX: 0, offsetY: 0 },
                itemMargin: { horizontal: 20, vertical: 5 },
            },
            tooltip: { theme: "dark", marker: { show: true }, x: { show: false } },
            fill: {
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: is_dark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: is_dark ? [100, 100] : [45, 100],
                },
            },
        };
    });

    //Daily Sales
    const daily_sales_series = ref([
        { name: "Sales", data: [44, 55, 41, 67, 22, 43, 21] },
        { name: "Last Week", data: [13, 23, 20, 8, 13, 27, 33] },
    ]);
    const daily_sales_options = computed(() => {
        return {
            chart: { toolbar: { show: false }, stacked: true, stackType: "100%" },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 1 },
            colors: ["#e2a03f", "#e0e6ed"],
            responsive: [{ breakpoint: 480, options: { legend: { position: "bottom", offsetX: -10, offsetY: 0 } } }],
            xaxis: { labels: { show: false }, categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"] },
            yaxis: { show: false },
            fill: { opacity: 1 },
            plotOptions: { bar: { horizontal: false, columnWidth: "25%" } },
            legend: { show: false },
            grid: {
                show: false,
                xaxis: { lines: { show: false } },
                padding: { top: 10, right: -20, bottom: -20, left: -20 },
            },
        };
    });

    //Total Orders
    const total_orders_series = ref([{ name: "Sales", data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40] }]);
    const total_orders_options = computed(() => {
        const is_dark = store.state.setting.is_dark_mode;
        return {
            chart: { sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: is_dark ? ["#1abc9c"] : ["#fff"],
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            yaxis: { min: 0, show: false },
            grid: { padding: { top: 125, right: 0, bottom: 0, left: 0 } },
            fill: {
                opacity: 1,
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: is_dark ? 0.3 : 0.4,
                    opacityTo: 0.05,
                    stops: is_dark ? [100, 100] : [45, 100],
                },
            },
            tooltip: { x: { show: false }, theme: "dark" },
        };
    });

    //Sales by Category
    const sales_donut_series = ref([985, 737, 270]);
    const sales_donut_options = computed(() => {
        const is_dark = store.state.setting.is_dark_mode;
        const option = {
            chart: {},
            dataLabels: { enabled: false },
            expandOnClick: is_dark ? false : true,
            stroke: { show: true, width: 25, colors: is_dark ? "#0e1726" : "#fff" },
            colors: is_dark ? ["#5c1ac3", "#e2a03f", "#e7515a", "#e2a03f"] : ["#e2a03f", "#5c1ac3", "#e7515a"],
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: { width: 10, height: 10 },
                height: 50,
                offsetY: 20,
                itemMargin: { horizontal: 8, vertical: 0 },
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "65%",
                        background: "transparent",
                        labels: {
                            show: true,
                            name: { show: true, fontSize: "29px", fontFamily: "Nunito, sans-serif", offsetY: -10 },
                            value: {
                                show: true,
                                fontSize: "26px",
                                fontFamily: "Nunito, sans-serif",
                                color: is_dark ? "#bfc9d4" : undefined,
                                offsetY: 16,
                                formatter: function (val) {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: "Total",
                                color: "#888ea8",
                                fontSize: "29px",
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce(function (a, b) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ["Apparel", "Sports", "Others"],
        };

        if (is_dark) {
            option["states"] = {
                hover: { filter: { type: "none" } },
                active: { filter: { type: "none" } },
            };
        }

        return option;
    });
</script>
