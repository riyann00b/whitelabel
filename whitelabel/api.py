from __future__ import annotations

import frappe

from whitelabel.config.branding import get_branding


def boot_session(bootinfo):
	branding = get_branding()

	bootinfo.xunoia = {
		"branding": branding,
	}

	if bootinfo.get("navbar_settings"):
		bootinfo.navbar_settings.help_dropdown = [
			{
				"name": "xunoia_help",
				"item_label": "Help Center",
				"item_type": "Route",
				"route": branding["support_url"] + "/help",
				"hidden": 0,
			},
			{
				"name": "xunoia_documentation",
				"item_label": "Documentation",
				"item_type": "Route",
				"route": branding["documentation_url"],
				"hidden": 0,
			},
			{
				"name": "xunoia_support",
				"item_label": "Contact Support",
				"item_type": "Route",
				"route": branding["contact_url"],
				"hidden": 0,
			},
			{
				"name": "xunoia_about",
				"item_label": "About Xunoia",
				"item_type": "Action",
				"action": "frappe.ui.toolbar.show_about()",
				"hidden": 0,
			},
		]


def after_migrate():
	pass
