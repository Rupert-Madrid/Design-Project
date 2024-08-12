
<!--#include file="head_metronic.asp"-->
<!--#include file="navigation.asp"-->
<style>
    .k-grid-content td {
      position:relative;
    }
  </style>
					<!--begin::Content-->
					<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
						<!--begin::Post-->
						<div class="" id="kt_post">
							<!--begin::Container-->
							<div id="kt_content_container" class="container">
								<div class="row">
									<div class="col-md-6 col-lg-6">
										<div class="bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
											<form class="form w-100" novalidate="novalidate" id="kt_lesson_form">
												<input type="hidden" placeholder="" id="plan_code" name="plan_code" />
												<input type="hidden" placeholder="" id="course_code" name="course_code" />
												<!--begin::Heading-->
												<div class="mb-10">
													<a href="#!" id="back_courses"><h1 class="text-dark mb-3"><span class="fa fa-arrow-left"> &emsp;</span><span id="course_lbl"></span></h1></a>
												</div>
												<!--end::Heading-->
												<!--begin::Input group-->
												<div class="fv-row mb-7">
													<label class="form-label fw-bolder text-muted fs-6">Title</label>
													<input class="form-control form-control-lg form-control-solid" type="text" placeholder="" id="title" name="title" autocomplete="off" />
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="fv-row mb-7">
													<label class="form-label fw-bolder text-muted fs-6">Date</label>
													<input class="form-control form-control-lg form-control-solid" type="text" placeholder="" id="date" name="date" autocomplete="off" />
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="fv-row mb-7">
													<label class="form-label fw-bolder text-muted fs-6">Time</label>
													<div class="row">
														<div class="col-md-6 col-lg-6">
															<input class="form-control form-control-lg form-control-solid" type="time" placeholder="" id="timein" name="timein" autocomplete="off" />
														</div>
														<div class="col-md-6 col-lg-6">
															<input class="form-control form-control-lg form-control-solid" type="time" placeholder="" id="timeout" name="timeout" autocomplete="off" />
														</div>
													</div>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="fv-row mb-7">
													<label class="form-label fw-bolder text-muted fs-6">Type</label>
														<div class="radio-inline" style="width: 100%;">
															<label class="radio">
															<input type="radio" name="type" value="Discussion">
															<span></span>Discussion</label>
															<label class="radio">
															<input type="radio" name="type" value="Activity">
															<span></span>Activity</label>
															<label class="radio">
															<input type="radio" name="type" value="Recitation">
															<span></span>Recitation</label>
														</div>
												</div>
												<!--end::Input group-->
												</form>	
												<div id="grid"></div>
										</div>
									</div>
									<div class="col-md-6 col-lg-6">
										<div class="bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
											<div class="row">
												<h1 class="mb-3 text-center">Learner's Material</h1>
											</div>
											<!--begin::Card widget 20-->
												<a href="#!" onclick="uploadfiles()">
												<div class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10" >
										
												<!--begin::Card body-->
													<div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
															<img alt="Logo" src="resources/file logo.png" style="height: 370px;"/>
														<div class="text-center mb-10">
														</div>
													</div>
												<!--end::Card body-->
												</div>
												</a>
											<!--end::Card widget 20-->
												<div id="files_grid"></div>
											<!--begin::Actions-->
											<div class="text-center">
												<button type="button" id="kt_lesson_submit" class="btn btn-lg btn-primary w-100 mb-5">
													<span class="indicator-label">Save</span>
													<span class="indicator-progress">Please wait...
													<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button>
											</div>
											<!--end::Actions-->
										</div>
									</div>
								</div>
							</div>
							<!--end::Container-->
						</div>
						<!--end::Post-->
					</div>
					<!--end::Content-->
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Page-->
		</div>
		<!--end::Root-->
<script src="lesson_plan.js?t=<% Write(nocache_time) %>"></script>
        <% FooterIndicator = False %>
            <!--#include file="footer_metronic.asp"-->
