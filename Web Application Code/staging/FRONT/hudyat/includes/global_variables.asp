<%
' File: global_variables.asp


' Declaration
Dim lang
Dim lang_asp
Dim FooterIndicator
FooterIndicator = True

Dim rest_api_url
Dim system_api_url
Dim acctg_api_url
Dim hotel_api_url
Dim email_url
Dim sms_url

Dim rest_rpt_url
Dim acctg_rpt_url
Dim hotel_rpt_url
Dim files_upload_url
Dim images_upload_url

Dim setting_logo_url
Dim setting_favicon_logo
Dim program_name
Dim program_version
Dim program_provider
Dim setting_defaultbg_url

Dim program_nav_icon
Dim program_owner
Dim program_owner_address
Dim program_owner_telno
Dim program_owner_website
Dim program_owner_email

Dim program_registeredto
Dim program_registeredto_address
Dim program_registeredto_telno
Dim program_registeredto_website
dim program_registeredto_email


Dim nocache_time
Dim main_url
Dim main_program_folder

' Declaration for User Session
Dim user_name
Dim user_id
Dim user_level
Dim user_shifting
Dim user_isloggedin
Dim user_terminal
Dim user_changefund
Dim user_trandate
Dim cookie_name
Dim vat
Dim active_user_limit
Dim access_module
Dim menu_selected
Dim authentication
Dim branch
Dim program_mouseactivitylimit
Dim expdate
Dim mode

authentication=false
menu_selected = "dashboard_bg.asp"


' Initialization
program_name     = "HUDYAT"
program_version  = "02.18.2024"
program_provider = "Taylor Inc."
setting_defaultbg_url        = "resources/calculator-385506_1920_v2.jpg"
active_user_limit = 3   'Set here the Allowable Active User ... Configure number of users to logged-in'
program_mouseactivitylimit = 600      ' 60 secs*2 * 5mins

main_url                  = GetDomain() + ":98"
main_program_folder       = ""
branch = "MAIN"

setting_favicon_logo      = "resources/logo.jpg"

program_nav_icon             = "resources/logo.jpg"
'program_nav_icon             = ""
program_owner                = "Taylor Inc."
program_owner_address        = ""
program_owner_telno          = ""
program_owner_website        = ""
program_owner_email          = ""

setting_logo_url             = "resources/logo.jpg"
setting_defaultbg_url        = "resources/calculator-385506_1920_v2.jpg"
program_registeredto         = "HUDYAT Philippines"
program_registeredto_address = "51 T. Santiago, Canumay West. Valenzuela City"
program_registeredto_telno   = "(045) 000-0000"
program_registeredto_website = "sample.com"
program_registeredto_email   = "trisha@gmail.com"
vat                          = 1.12

  ' Cookie parent name
cookie_name      = LCASE(program_name)
cookie_name      = REPLACE(cookie_name, " ", "_")



If Request.Cookies(cookie_name) = "" Then
  user_name        = ""
  user_shifting    = ""
  user_level       = ""
  user_terminal    = ""
  user_changefund  = ""
  user_trandate    = ""
  user_isloggedin  = ""
  expdate  = ""
  mode  = ""
Else
  user_id        = Request.Cookies(cookie_name)("user_id")
  user_name        = Request.Cookies(cookie_name)("user_name")
  user_shifting    = Request.Cookies(cookie_name)("shift")
  user_level       = Request.Cookies(cookie_name)("user_level")
  user_terminal    = Request.Cookies(cookie_name)("user_terminal")
  user_changefund  = Request.Cookies(cookie_name)("user_changefund")
  user_trandate    = Request.Cookies(cookie_name)("user_trandate")
  user_isloggedin  = Request.Cookies(cookie_name)("user_loggedin")
  expdate  = Request.Cookies(cookie_name)("expdate")
  Response.Cookies(cookie_name).Expires = expdate
  mode  = Request.Cookies(cookie_name)("mode")
End If


'API'
system_api_url   = main_url & "/systemapi"
hotel_api_url    = main_url & "/hotelapi"
acctg_api_url    = main_url & "/mainapi"
rest_api_url     = main_url & "/restoapi"

'REPORT'
hotel_rpt_url    = main_url & "/hotelrpt"
acctg_rpt_url    = main_url & "/mainrpt"
rest_rpt_url     = main_url & "/restorpt"
	
'RESOURCES (Files/Images)'
files_upload_url     = main_url & "/client_uploads/files/"
images_upload_url     = main_url & "/client_uploads/images/"
  
' Embed this to resources (css/js) that you dont want to cache by the browser
Randomize
nocache_time     = Rnd(100)
%>