(function () {
    "use strict";

    function getBranding() {
        return frappe.boot?.xunoia?.branding;
    }

    function customizeNavbar() {
        const branding = getBranding();

        if (!branding) {
            return;
        }

        const breadcrumbs = document.querySelector("#navbar-breadcrumbs");

        if (!breadcrumbs) {
            return;
        }

        let title = document.querySelector(".xunoia-navbar-title");

        if (!title) {
            title = document.createElement("span");
            title.className = "xunoia-navbar-title";
            breadcrumbs.insertAdjacentElement("afterend", title);
        }

        title.textContent = branding.product_name;
    }

    frappe.ready(() => {
        customizeNavbar();
    });
})();
