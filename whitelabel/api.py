from __future__ import annotations

import frappe

from whitelabel.config.branding import get_branding


def boot_session(bootinfo):
    bootinfo.xunoia = {
        "branding": get_branding(),
    }


def after_migrate():
    # Intentionally lightweight for Phase 1.
    # Branding will be synchronized here in a later phase.
    return
