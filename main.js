$(document).ready(function() {


	Email.generate();
	var session_log = 'Session started ;timestamp: ' + new Date().getTime/1000 + '\n'; 

	var already_suggested = false;
	var first_click = true;
	var email_editor_open = false;
	var maxSubjectAndPreviewLength = 150; //I calculated this number after testing the layout


	// Append_Emails
	for (var i = 0; i < Email.all.length; i++) {
		var email = Email.all[i];
		var subject = email.subject.substring(0,maxSubjectAndPreviewLength);
		var previewSize = (subject.length + 1 >= maxSubjectAndPreviewLength) ? 0: maxSubjectAndPreviewLength - subject.length - 2;
		var preview = email.content.substring(0, previewSize);

		$('ul.list-group').append('<li class="list-group-item email tracked click" id="email'+i+'"></li>');
		$('#email'+i).append('<span class="sender">' + email.sender.name + '</span>  ' + '<span class="subject">' + subject + '</span>\
							  <span class="preview"> &nbsp;&ndash;&nbsp;' + preview + '</span>' + '<span class="date">' + email.formattedDate() + '</span>');
	}

	/* This function will take care of recording the log of events. It could do so by writing to a file,
	outputting to the console, or any other way that seems reasonable */

	var log_message = function(message) {
		session_log += (message + '\n');
	}

	//Expand email
	$(document).on('click', '.email', function() {


		if (email_editor_open)
			$('#email_expanded_col').attr('class','col-md-5')
		else
			$('#email_expanded_col').attr('class','col-md-10')

		var id = $(this).attr('id');
		var index = parseInt(id.substring(5)); //i.e, 'email5' will yield 5
		var email = Email.all[index];

		$('.panel-title').text(email.subject);
		$('#email_expanded > .panel-body').append('<strong class="tracked" id="expanded_sender">' + email.sender.name +'</strong>' + '&lt;' + email.sender.email +'&gt<hr>');
		$('#email_expanded > .panel-body').append('<p class="tracked" id="expanded_content">' + email.content +'</p>');
		$('#email_expanded_col').show();
		$('#email_list').hide();


	});

	//Open New Message editor
	$('#nav_new_message').click(function() {
		email_editor_open = true;

		$('.preview').hide();
		$('#email_expanded_col').attr('class', 'col-md-5');
		$('#email_list').attr('class','col-md-5');
		$('#new_message_editor').show();
	});

	//Return to the main inbox
	$('#nav_inbox').click(function() {
		$('#email_expanded > .panel-heading > .panel-title').empty();
		$('#email_expanded > .panel-body').empty();
		$('#email_expanded_col').hide();

		if (email_editor_open)
			$('#email_list').attr('class','col-md-5')
		else
			$('#email_list').attr('class','col-md-10')

		$('#email_list').show();
	});

	/* Tracking functions */
	var stamp;
	$(document).on('mouseenter', '.tracked', function() {
		stamp = new Date().getTime()/1000;
		log_message('Entered element ' + $(this).prop('id')+'; timestamp: ' + stamp);
	});

	$(document).on('mouseleave', '.tracked', function() {
		stamp = new Date().getTime()/1000;
		log_message('Left element ' + $(this).prop('id')+'; timestamp: ' + stamp);
	});

	$(document).on('click', '.click', function() {
		stamp = new Date().getTime()/1000;
		log_message('Clicked element ' + $(this).prop('id')+'; timestamp: ' + stamp);
	});

	$(document).on('change keyup paste','.text', function() {
		stamp = new Date().getTime()/1000;
		log_message('Changed content of ' + $(this).prop('id') + ' to ' +
					$(this).val() + ';timestamp: ' + stamp);
	}); 


	
	//Make random suggestions
	$('#to_field').on('change keyup paste',function() {
		var content = $(this).val();

		if (content.indexOf(",") != -1 && !already_suggested) { //if there's a comma on the field
			already_suggested = true;

			//Select 3 random contacts and attach each
			for (var i = 0; i < 3; i++) {

				var index = Math.floor(Math.random()*Contact.all.length);
				var c = Contact.all[index];
				$('#predictions').append('<a href="#" class="contact_suggestion tracked click" id="'+c.email+'">'+c.name+'</a>&nbsp');
				log_message('Contact ' + JSON.stringify(c) + ' was suggested');			
			}
			$('#predictions').show();
		}
	});

	//Clicked Suggestion
	$(document).on('click','.contact_suggestion', function() {
		stamp = new Date().getTime()/1000;
		var email = $(this).prop('id');
		var comma = (first_click) ? ' ': ', ';
		$('#to_field').val($('#to_field').val() + comma + email); //append email to contents of to_field
		log_message('Changed content of to_field to ' + $('#to_field').val() + ';timestamp: ' + stamp);
		first_click = false;
	});

	//End Session
	$('#end_session').on('click', function() {
		$.ajax({
			type: 'POST',
			url:"get_data.php",
			data: session_log,
			success: function(data, status, jqXHR) {
				alert(data);
			}
		});
	});
});
