from __future__ import annotations

import frappe


DEFAULT_BRANDING = {
    "company_name": "Xunoia",
    "product_name": "XunoiaERP",
    "logo": "/assets/xunoia_whitelabel/images/xunoia Icon copy.png",
    "favicon": "/assets/xunoia_whitelabel/images/favicon-32.png",
    "support_url": "https://support.xunoia.com",
    "documentation_url": "https://docs.xunoia.com",
    "website_url": "https://xunoia.com",
    "contact_url": "https://support.xunoia.com/contact",
}


PRODUCT_BRANDING = {
    "Accounting.xunoia.com": {
        **DEFAULT_BRANDING,
        "product_name": "Xunoia Accounting",
    },
    "ERP.xunoia.com": {
        **DEFAULT_BRANDING,
        "product_name": "Xunoia ERP",
    },
}


def get_branding() -> dict:
    site = frappe.local.site

    branding = PRODUCT_BRANDING.get(site, DEFAULT_BRANDING).copy()

    # Allow future site-level overrides through Site Config.
    custom = frappe.conf.get("xunoia_branding")

    if isinstance(custom, dict):
        branding.update(custom)

    return branding
