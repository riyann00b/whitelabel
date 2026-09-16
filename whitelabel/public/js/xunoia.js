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
		if (!frappe.ui?.toolbar) {
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
				? `<a href="${branding.website_url}" target="_blank" rel="noopener noreferrer">Website</a>`
				: "";

			const documentation = branding.documentation_url
				? `<a href="${branding.documentation_url}" target="_blank" rel="noopener noreferrer">Documentation</a>`
				: "";

			const support = branding.support_url
				? `<a href="${branding.support_url}" target="_blank" rel="noopener noreferrer">Support</a>`
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

	function customize_help_menu() {
		const menu_items = document.querySelectorAll(
			".frappe-menu.context-menu .dropdown-menu-item"
		);

		menu_items.forEach((item) => {
			const title = item.querySelector(".menu-item-title");

			if (!title) {
				return;
			}

			const label = title.textContent.trim();

			// Remove Frappe Support completely
			if (label === "Frappe Support") {
				item.remove();
				return;
			}

			// Remove other unwanted Frappe items
			if (
				label === "System Health" ||
				label === "Keyboard Shortcuts"
			) {
				item.remove();
				return;
			}

			// Rename About
			if (label === "About") {
				title.textContent = "About Xunoia";

				const link = item.querySelector("a");

				if (link) {
					link.onclick = function (event) {
						event.preventDefault();
						event.stopPropagation();

						frappe.ui.toolbar.show_about();

						return false;
					};
				}
			}
		});
	}
		);

		menu_items.forEach((item) => {
			const title = item.querySelector(".menu-item-title");

			if (!title) {
				return;
			}

			const label = title.textContent.trim();

			if (label === "About") {
				title.textContent = "About Xunoia";

				const link = item.querySelector("a");

				if (link) {
					link.onclick = function (event) {
						event.preventDefault();
						event.stopPropagation();

						frappe.ui.toolbar.show_about();

						return false;
					};
				}

				return;
			}

			if (
				label === "Frappe Support" ||
				label === "System Health" ||
				label === "Keyboard Shortcuts"
			) {
				item.remove();
			}
		});
	}

	function watch_help_menu() {
		if (!document.body) {
			return;
		}

		observer.observe(document.body, {
			childList: true,
			subtree: true,


	function init() {
		override_about();
		apply_branding();
		watch_help_menu();
	}

	frappe.ready(init);

	$(document).on("app_ready", init);
})();
