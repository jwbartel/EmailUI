$(document).ready(function() {


	Email.generate();

	var maxSubjectAndPreviewLength = 130; //I calculated this number after testing the layout
	for (var i = 0; i < Email.all.length; i++) {
		var email = Email.all[i];
		var subject = email.subject.substring(0,maxSubjectAndPreviewLength);
		var previewSize = (subject.length + 1 >= maxSubjectAndPreviewLength) ? 0: maxSubjectAndPreviewLength - subject.length - 2;
		var preview = email.content.substring(0, previewSize);

		$("#email_list").append("<div class='email' id='email"+i+"'></div>");
		$("#email"+i).append("<span class='sender'>" + email.sender.name + "</span>  " + "<span class='subject'>" + subject + "</span>\
							  <span class='preview'> &nbsp;&ndash;&nbsp;" + preview + "</span>" + "<span class='date'>" + email.formattedDate() + "</span>");
	}

	$(document).on("click", ".email", function() {
		var id = $(this).attr('id');
		var index = parseInt(id.substring(5)); //i.e, 'email5' will yield 5
		var email = Email.all[index];

		$("#email_expanded").append("<h3>" + email.subject +"</h3>");
		$("#email_expanded").append("<strong>" + email.sender.name +"</strong>" + "&lt;" + email.sender.email +"&gt<br>");
		$("#email_expanded").append("<p>" + email.content +"</p>");

		$("#new_email_editor").hide();
		$("#email_expanded").show();
		$("#email_list").hide();


	});

	$("#new_email").click(function() {
		$("#new_email_editor").show();	
		$("#email_expanded").hide();
		$("#email_list").hide();
			

	});

	$("#inbox").click(function() {
		$("#email_expanded").empty();
		$("#new_email_editor").hide();
		$("#email_expanded").hide();
		$("#email_list").show();
	});

});