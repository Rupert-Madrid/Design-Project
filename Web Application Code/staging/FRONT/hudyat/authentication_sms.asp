<!--#include file="head_metronic.asp"-->
<!DOCTYPE html>
<html lang="en">
	<!--begin::Head-->
	<head>
		<title><% Write(program_name) %></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="article" />
		<link rel="shortcut icon" href="resources/favicon.png" />
		<!--begin::Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<!--end::Fonts-->
		<!--begin::Global Stylesheets Bundle(used by all pages)-->
		<link href="dist/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="dist/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<!--end::Global Stylesheets Bundle-->
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body id="kt_body" class="bg-body">
		<!--begin::Main-->
		<!--begin::Root-->
		<div class="d-flex flex-column flex-root">
			<!--begin::Authentication - Two-stes -->
			<div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style="background-image: url(dist/assets/media/illustrations/sketchy-1/14.png">
				<!--begin::Content-->
				<div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<!--begin::Logo-->
					<a href="#!" class="mb-12">
						<img alt="Logo" src="resources/tella.png" class="h-100px" />
					</a>
					<!--end::Logo-->
					<!--begin::Wrapper-->
					<div class="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<!--begin::Form-->
						<form class="form w-100 mb-10" novalidate="novalidate"  id="kt_sing_in_two_steps_form">
							<!--begin::Icon-->
							<div class="text-center mb-10">
								<img alt="Logo" class="mh-125px" src="dist/assets/media/svg/misc/smartphone.svg" />
							</div>
							<!--end::Icon-->
							<!--begin::Heading-->
							<div class="text-center mb-10">
								<!--begin::Title-->
								<h1 class="text-dark mb-3">Two Step Verification</h1>
								<!--end::Title-->
								<!--begin::Sub-title-->
								<div class="text-muted fw-bold fs-5 mb-5">Enter the verification code we sent to</div>
								<!--end::Sub-title-->
								<!--begin::Mobile no-->
								<div class="fw-bolder text-dark fs-3">******7859</div>
								<!--end::Mobile no-->
							</div>
							<!--end::Heading-->
							<!--begin::Section-->
							<div class="mb-10 px-md-10">
								<!--begin::Label-->
								<div class="fw-bolder text-start text-dark fs-6 mb-1 ms-1">Type your 4 digit security code</div>
								<!--end::Label-->
								<!--begin::Input group-->
								<div class="d-flex flex-wrap flex-stack">
									<input type="text" tabindex="1" data-inputmask="'mask': '9', 'placeholder': ''" maxlength="1" class="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" identity="passcode" value="" />
									<input type="text" tabindex="2" data-inputmask="'mask': '9', 'placeholder': ''" maxlength="1" class="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" identity="passcode" value="" />
									<input type="text" tabindex="3" data-inputmask="'mask': '9', 'placeholder': ''" maxlength="1" class="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" identity="passcode" value="" />
									<input type="text" tabindex="4" data-inputmask="'mask': '9', 'placeholder': ''" maxlength="1" class="form-control form-control-solid h-60px w-60px fs-2qx text-center border-primary border-hover mx-1 my-2" identity="passcode" value="" />
								</div>
								<!--begin::Input group-->
							</div>
							<!--end::Section-->
							<!--begin::Submit-->
							<div class="d-flex flex-center">
								<button type="button" id="kt_sing_in_two_steps_submit" class="btn btn-lg btn-primary fw-bolder">
									<span class="indicator-label">Submit</span>
									<span class="indicator-progress">Please wait...
									<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
							<!--end::Submit-->
						</form>
						<!--end::Form-->
						<!--begin::Notice-->
						<div class="text-center fw-bold fs-5">
							<span class="text-muted me-1">Didn’t get the code ?</span>
							<a href="#!" type="button" class="link-primary fw-bolder fs-5 me-1" id="requestNewTest">Resend</a>
						</div>
						<!--end::Notice-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Content-->
			</div>
			<!--end::Authentication - Two-stes-->
		</div>
		<!--end::Root-->
		<!--end::Main-->
		<!--begin::Javascript-->
		<script>var hostUrl = "dist/assets/";</script>
		<!--begin::Global Javascript Bundle(used by all pages)-->
		<script src="dist/assets/plugins/global/plugins.bundle.js"></script>
		<script src="dist/assets/js/scripts.bundle.js"></script>
		<script src="libraries/store.min.js"></script>
		<!--end::Global Javascript Bundle-->
		<!--begin::Page Custom Javascript(used by this page)-->
		<script src="authentication_sms.js"></script>
		<!--end::Page Custom Javascript-->
		<!--end::Javascript-->
	</body>
	<!--end::Body-->
</html>