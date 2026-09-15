(function () {
    "use strict";

    const branding = frappe.boot?.xunoia?.branding;

    if (!branding) {
        return;
    }

    function setText(selector, value) {
        const element = document.querySelector(selector);

        if (element && value) {
            element.textContent = value;
        }
    }

    function setAttribute(selector, attribute, value) {
        const element = document.querySelector(selector);

        if (element && value) {
            element.setAttribute(attribute, value);
        }
    }

    function applyBranding() {
        setText(".app-logo .ellipsis", branding.product_name);
        setAttribute(".app-logo img", "src", branding.logo);
        setAttribute("link[rel='icon']", "href", branding.favicon);

        document.title = branding.product_name;
    }

    frappe.ready(() => {
        applyBranding();
    });

    frappe.router?.on?.("change", () => {
        applyBranding();
    });
})();
