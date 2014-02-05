$(document).ready(function() {


	Email.generate();
	var already_suggested = false;
	var first_click = true;

	var maxSubjectAndPreviewLength = 130; //I calculated this number after testing the layout
	for (var i = 0; i < Email.all.length; i++) {
		var email = Email.all[i];
		var subject = email.subject.substring(0,maxSubjectAndPreviewLength);
		var previewSize = (subject.length + 1 >= maxSubjectAndPreviewLength) ? 0: maxSubjectAndPreviewLength - subject.length - 2;
		var preview = email.content.substring(0, previewSize);

		$('#email_list').append('<div class="email" id="email'+i+'"></div>');
		$('#email'+i).append('<span class="sender">' + email.sender.name + '</span>  ' + '<span class="subject">' + subject + '</span>\
							  <span class="preview"> &nbsp;&ndash;&nbsp;' + preview + '</span>' + '<span class="date">' + email.formattedDate() + '</span>');
	}

	$(document).on('click', '.email', function() {
		var id = $(this).attr('id');
		var index = parseInt(id.substring(5)); //i.e, 'email5' will yield 5
		var email = Email.all[index];

		$('#email_expanded').append('<h3>' + email.subject +'</h3>');
		$('#email_expanded').append('<strong>' + email.sender.name +'</strong>' + '&lt;' + email.sender.email +'&gt<br>');
		$('#email_expanded').append('<p>' + email.content +'</p>');

		$('#new_email_editor').hide();
		$('#email_expanded').show();
		$('#email_list').hide();


	});

	$('#new_email').click(function() {
		$('#new_email_editor').show();	
		$('#email_expanded').hide();
		$('#email_list').hide();
	});

	$('#inbox').click(function() {
		$('#email_expanded').empty();
		
		//Clear email editor of data

		$('#new_email_editor').hide();
		$('#new_email_editor').children('input').val('');
		$('.contact_suggestion').remove();
		$('#predictions').hide();
		$('#message_field').empty();
		already_suggested = false;



		$('#email_expanded').hide();
		$('#email_list').show();
	});

	var time;
	$('#new_email_editor').find('input, #message_field, #predictions').on('mouseenter', function() {

		time = new Date().getTime() / 1000;
	});

	$('#new_email_editor').find('input, #message_field, #predictions').on('mouseleave', function() {

		time = (new Date().getTime() / 1000) - time;
		console.log('Hovered over ' +$(this).prop('id') + ' for ' + time * 1000 + 'milliseconds');
	});

	$('#new_email_editor').find('button').on('click', function() {
		time = new Date().getTime()/1000;
		console.log('Clicked ' + $(this).prop('id') +' at time ' + time);
	});

	$(document).on('click','.contact_suggestion', function() {
		time = new Date().getTime()/1000;
		console.log('Clicked ' + $(this).text() +' at time ' + time);
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
				$('#predictions').append('<a href="#" class="contact_suggestion" data-email="'+c.email+'">'+c.name+'</a>&nbsp');			
			}
			$('#predictions').show();
		}
	});

	
	$(document).on('click','.contact_suggestion', function() {
		var email = $(this).data('email');
		var comma = (first_click) ? ' ': ', ';
		$('#to_field').val($('#to_field').val() + comma + email); //append email to contents of to_field
		first_click = false;
	});


});