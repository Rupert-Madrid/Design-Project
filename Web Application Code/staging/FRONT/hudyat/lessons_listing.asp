
<!--#include file="head_metronic.asp"-->
<!--#include file="navigation.asp"-->
					<!--begin::Content-->
					<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
						<!--begin::Post-->
						<div class="" id="kt_post">
							<!--begin::Container-->
							<div id="kt_content_container" class="container">
								<div class="row">
									<!--begin::Heading-->
									<div>
										<a href="dashboard.asp"><h1 class="text-dark"><span class="fa fa-arrow-left"> &emsp;</span><span id="lesson_status_lbl"></span></h1></a>
									</div>
									<!--end::Heading-->
									<ul class="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2" role="tablist" id="dates">
									</ul>
									<div class="row">
										<div class="col-lg-6">
											<a href="#!" onclick="date_adjustment('-')" style="float:left"><h1 class="text-dark"><span class="fa fa-arrow-left"> &emsp;</span><span id="lesson_status_lbl"></span></h1></a>
										</div>
										<div class="col-lg-6">
											<a href="#!" onclick="date_adjustment('+')" style="float:right"><h1 class="text-dark"><span class="fa fa-arrow-right"> &emsp;</span><span id="lesson_status_lbl"></span></h1></a>
										</div>
									</div>

								</div>

								<div class="row g-6 g-xl-9 mb-6 mb-xl-9" id="lessons">
									<!--end::Col-->
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
<script src="lessons_listing.js?t=<% Write(nocache_time) %>"></script>
        <% FooterIndicator = False %>
            <!--#include file="footer_metronic.asp"-->
