from __future__ import annotations

import frappe


DEFAULT_BRANDING = {
    "company_name": "Xunoia",
    "product_name": "Xunoia",
    "logo": "/assets/whitelabel/images/xunoia-logo.png",
    "favicon": "/assets/whitelabel/images/favicon.png",
    "website_url": "https://xunoia.com",
    "support_url": "https://support.xunoia.com",
    "documentation_url": "https://docs.xunoia.com",
    "contact_url": "https://support.xunoia.com/contact",
}


def get_branding() -> dict:
    branding = DEFAULT_BRANDING.copy()

    # Use Whitelabel Setting when available.
    if frappe.db.exists("DocType", "Whitelabel Setting"):
        settings = frappe.get_single("Whitelabel Setting")

        field_map = {
            "company_name": "company_name",
            "product_name": "product_name",
            "logo": "logo",
            "favicon": "favicon",
            "website_url": "website_url",
            "support_url": "support_url",
            "documentation_url": "documentation_url",
            "contact_url": "contact_url",
        }

        for target, fieldname in field_map.items():
            value = getattr(settings, fieldname, None)

            if value:
                branding[target] = value

    return branding
