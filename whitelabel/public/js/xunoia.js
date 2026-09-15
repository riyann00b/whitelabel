(function () {
    "use strict";

    function branding() {
        const data = frappe.boot?.xunoia?.branding;

        if (!data) {
            return;
        }

        document.title = data.product_name;

        const logo = document.querySelector(".app-logo img");

        if (logo) {
            logo.src = data.logo;
        }

        const logoContainer = document.querySelector(".app-logo");

        if (logoContainer) {
            logoContainer.setAttribute("title", data.product_name);
        }
    }

    function run() {
        branding();
    }

    frappe.ready(run);

    $(document).on("app_ready", run);
})();
