(function () {
	"use strict";

	frappe.provide("frappe.ui.toolbar");

	frappe.ui.toolbar.show_about = function () {
		const branding = frappe.boot?.xunoia?.branding || {};

		const productName = branding.product_name || "Xunoia";
		const companyName = branding.company_name || "Xunoia";
		const logo = branding.logo || "/assets/whitelabel/images/xunoia-logo.png";

		const dialog = new frappe.ui.Dialog({
			title: __("About {0}", [productName]),
			size: "small",
		});

		const body = `
			<div class="xunoia-about">
				<img
					class="xunoia-about-logo"
					src="${frappe.utils.escape_html(logo)}"
					alt="${frappe.utils.escape_html(productName)}"
				>

				<h3 class="xunoia-about-title">
					${frappe.utils.escape_html(productName)}
				</h3>

				<p class="xunoia-about-company">
					${frappe.utils.escape_html(companyName)}
				</p>

				<div class="xunoia-about-links">
					${
						branding.website_url
							? `<a href="${frappe.utils.escape_html(branding.website_url)}" target="_blank" rel="noopener noreferrer">
								Website
							</a>`
							: ""
					}

					${
						branding.documentation_url
							? `<a href="${frappe.utils.escape_html(branding.documentation_url)}" target="_blank" rel="noopener noreferrer">
								Documentation
							</a>`
							: ""
					}

					${
						branding.support_url
							? `<a href="${frappe.utils.escape_html(branding.support_url)}" target="_blank" rel="noopener noreferrer">
								Support
							</a>`
							: ""
					}
				</div>
			</div>
		`;

		dialog.$body.html(body);

		dialog.show();
	};
})();
