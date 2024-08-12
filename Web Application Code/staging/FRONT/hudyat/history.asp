
<!--#include file="head_metronic.asp"-->
<!--#include file="navigation.asp"-->
	<!--begin::Content-->
		<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
			<!--begin::Toolbar-->
			<div class="toolbar" id="kt_toolbar">
				<!--begin::Container-->
				<div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
					<!--begin::Page title-->
					<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
						<!--begin::Title-->
							<h1 class="d-flex text-dark fw-bolder fs-3 align-items-center my-1">History
							<!--begin::Separator-->
							<span class="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1"></span>
							<!--end::Separator-->
							<!--begin::Description-->
							<!-- <span class="text-muted fs-7 fw-bold mt-2">#XRS-45670</span> -->
							<!--end::Description--></h1>
						<!--end::Title-->
					</div>
					<!--end::Page title-->
					<!--end::Actions-->
				</div>
				<!--end::Container-->
			</div>
			<!--end::Toolbar-->
						
			<div class="post d-flex flex-column-fluid" id="kt_post">
				<!--begin::Container-->
				<div id="kt_content_container" class="container-fluid"  style="padding-top:65px">

								<!--begin::Table-->
								<div class="card card-flush">
									<!--begin::Card header-->
									<div class="card-header mt-5">
										<!--begin::Card title-->
										<div class="card-title flex-column">
											<!-- <h3 class="fw-bolder mb-1">Project Spendings</h3>
											<div class="fs-6 text-gray-400">Total $260,300 sepnt so far</div> -->
										</div>
										<!--begin::Card title-->
										<!--begin::Card toolbar-->
										<div class="card-toolbar my-1">
											<div class="me-4 my-1 d-flex align-items-center position-relative my-1">
												<!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
												<span class="svg-icon svg-icon-3 position-absolute ms-3">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
														<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
													</svg>
												</span>
												<!--end::Svg Icon-->
												<input type="text" id="filter" class="form-control form-control-solid form-select-sm w-200px ps-9" placeholder="Search Record" />
											</div>
										</div>
										<!--begin::Card toolbar-->
									</div>
									<!--end::Card header-->
									<!--begin::Card body-->
									<div class="card-body pt-0">
										<!--begin::Table container-->
											<div class="me-4 my-1">
												<div id="grid"></div>
											</div>
										<!--end::Table container-->
									</div>
									<!--end::Card body-->
								</div>
								<!--end::Card-->
				</div>
			</div>
		</div>
<script src="history.js?t=<% Write(nocache_time) %>"></script>
<% FooterIndicator = False %>
<!--#include file="footer_metronic.asp"-->