(function () {
	"use strict";

	function get_branding() {
		return frappe.boot?.xunoia?.branding || {};
	}

	function apply_branding() {
		const branding = get_branding();

		if (!branding) {
			return;
		}

		if (branding.product_name) {
			document.title = branding.product_name;
		}

		const logo = document.querySelector(".app-logo img");

		if (logo && branding.logo) {
			logo.src = branding.logo;
		}

		const logo_container = document.querySelector(".app-logo");

		if (logo_container && branding.product_name) {
			logo_container.setAttribute("title", branding.product_name);
		}
	}

	function override_about() {
		if (!frappe.ui || !frappe.ui.toolbar) {
			return;
		}

		frappe.ui.toolbar.show_about = function () {
			const branding = get_branding();

			const product_name = branding.product_name || "Xunoia";
			const company_name = branding.company_name || "Xunoia";
			const logo =
				branding.logo ||
				"/assets/whitelabel/images/xunoia-logo.png";

			const dialog = new frappe.ui.Dialog({
				title: __("About {0}", [product_name]),
				size: "small",
			});

			const website = branding.website_url
				? `<a href="${branding.website_url}" target="_blank" rel="noopener noreferrer">
						Website
					</a>`
				: "";

			const documentation = branding.documentation_url
				? `<a href="${branding.documentation_url}" target="_blank" rel="noopener noreferrer">
						Documentation
					</a>`
				: "";

			const support = branding.support_url
				? `<a href="${branding.support_url}" target="_blank" rel="noopener noreferrer">
						Support
					</a>`
				: "";

			dialog.$body.html(`
				<div class="xunoia-about">
					<img
						class="xunoia-about-logo"
						src="${logo}"
						alt="${product_name}"
					>

					<h3 class="xunoia-about-title">
						${product_name}
					</h3>

					<p class="xunoia-about-company">
						${company_name}
					</p>

					<div class="xunoia-about-links">
						${website}
						${documentation}
						${support}
					</div>
				</div>
			`);

			dialog.show();

			return false;
		};
	}

	function init() {
		override_about();
		apply_branding();
	}

	frappe.ready(init);

	$(document).on("app_ready", init);
})();
