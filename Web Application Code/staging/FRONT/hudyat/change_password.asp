
<!--#include file="head_metronic.asp"-->
<!--#include file="navigation.asp"-->
					<!--begin::Content-->
					<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
			<div class="post d-flex flex-column-fluid" id="kt_post">
					<!--begin::Container-->
					<div id="kt_content_container" class="container-fluid">
							<!--begin::Authentication - Sign-in -->
							<div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
								
									<!--begin::Wrapper-->
									<div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
										<!--begin::Form-->
										<form class="form w-100" novalidate="novalidate" method="POST" id="change_pass_form" data-kt-redirect-url="index.asp" action="#">
											<input type="hidden" id="email" name="email" value="<% Write(email) %>">
											<div class="text-center mb-10">
												<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
													<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"/>
													<path d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z" fill="currentColor"/>
												</svg>
											</div>
											<!--end::Icon-->
											<!--begin::Heading-->
											<div class="text-center mb-10">
												<!--begin::Title-->
												<h1 class="text-dark mb-3">Change Password</h1>
												<!--end::Title-->
											</div>
											<!--end::Heading-->
											<!--begin::Input group-->
											<div class="fv-row mb-10">
												<!--begin::Wrapper-->
												<div class="d-flex flex-stack mb-2">
													<!--begin::Label-->
													<label class="form-label fw-bolder text-dark fs-6 mb-0">Old Password</label>
													<!--end::Label-->
												</div>
												<!--end::Wrapper-->
												<!--begin::Input-->
												<div class="position-relative mb-3">
													<input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="old_password" autocomplete="off" />
												</div>
												<!--end::Input-->
											</div>
											<!--end::Input group-->
											<!--begin::Input group-->
											<div class="fv-row mb-10" data-kt-password-meter="true">
												<!--begin::Wrapper-->
												<div class="d-flex flex-stack mb-2">
													<!--begin::Label-->
													<label class="form-label fw-bolder text-dark fs-6 mb-0">New Password</label>
													<!--end::Label-->
												</div>
												<!--end::Wrapper-->
												<!--begin::Input-->
												<div class="position-relative mb-3">
													<input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="password" autocomplete="off" />
													<span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
														<i class="bi bi-eye-slash fs-2"></i>
														<i class="bi bi-eye fs-2 d-none"></i>
													</span>
												</div>
												<!--end::Input-->
											</div>
											<!--end::Input group-->
											<!--begin::Actions-->
											<div class="text-center">
												<!--begin::Submit button-->
												<button type="submit" id="kt_changepass_submit" class="btn btn-lg btn-primary w-100 mb-5">
													<span class="indicator-label">Continue</span>
													<span class="indicator-progress">Please wait...
													<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button>
												<!--end::Submit button-->
											</div>
											<!--end::Actions-->
										</form>
										<!--end::Form-->
									</div>
									<!--end::Wrapper-->
							</div>
							<!--end::Authentication - Sign-in-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Page-->
				</div>
			</div>
		</div>
		<script>var hostUrl = "dist/assets/";</script>
		<!--begin::Global Javascript Bundle(used by all pages)-->
		<script src="dist/assets/plugins/global/plugins.bundle.js"></script>
		<script src="dist/assets/js/scripts.bundle.js"></script>
		<!--end::Global Javascript Bundle-->
		<!--begin::Page Custom Javascript(used by this page)-->
  <script src="libraries/js.cookie.min.js"></script>
		<script src="change_password.js"></script>
		<!--end::Page Custom Javascript-->
		<!--end::Javascript-->
	</body>
	<!--end::Body-->
</html>
