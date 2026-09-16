app_name = "whitelabel"
app_title = "Xunoia"
app_publisher = "Xunoia"
app_description = "Xunoia white-label customization for Frappe"
app_license = "MIT"

app_logo_url = "/assets/whitelabel/images/xunoia-logo.png"

app_include_css = [
	"/assets/whitelabel/css/xunoia.css",
]

app_include_js = [
	"/assets/whitelabel/js/xunoia.js",
]

web_include_css = [
	"/assets/whitelabel/css/xunoia-web.css",
]

website_context = {
	"favicon": "/assets/whitelabel/images/favicon.png",
}

extend_bootinfo = "whitelabel.api.boot_session"

after_migrate = [
	"whitelabel.api.after_migrate",
]
