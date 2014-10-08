$(document).ready(function() {
    
    /* Variables */
    var testData = jQuery.parseJSON(data);
    console.log(testData);
    var emails = testData.inbox;

    var save_session_url = '../php/save_session_log.php';
	var end_session_url = '../php/end_session.php';
	var submit_test_url = '../php/submit_test.php';
    var session_log = "\n";
    
	var already_predicted = false;
	var first_click = true;
	var flat_interface = (testData.predictionInterface === "flat")? true: false;
    //var predictionGroup = new PredictionGroup(testData.predictionGroup);
    var email_editor_open = false;
	var maxSubjectAndPreviewLength = 150; //I calculated this number after testing the layout
	
    /* Display test scenario instructions */
	$('#instructions').find('p').text(testData.instructions);
    $('#instructions').modal('toggle');

	/* Create contacts */
	for (var i = 0; i < testData.contacts.length; i++) {
        new Contact(testData.contacts[i]);
    }
    
    /* Main logging function. All messages are appended to a string that is sent over to server when the session ends */
	var log_message = function(message) {
 		console.log(message);
		session_log += (message + '\n');
	}
    
	var formattedDate = function(email) {
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        
        var date = new Date(email.dateSent);
    	return (monthNames[date.getMonth()] + " " + date.getDate());
	}

    var append_emails = function(emails) {
        $('.list-group').empty();
        for (var i = 0; i < emails.length; i++) {
            var email = emails[i];
            var subject = email.subject.substring(0,maxSubjectAndPreviewLength);
            var previewSize = (subject.length + 1 >= maxSubjectAndPreviewLength) ? 0: maxSubjectAndPreviewLength - subject.length - 2;
            var preview = email.content.substring(0, previewSize);

            $('ul.list-group').append('<li class="list-group-item email tracked click" id="email'+i+'"></li>');
            $('#email'+i).append('<span class="sender">' + email.sender.name + '</span>  ' + '<span class="subject">' + subject + '</span>');
            $('#email'+i).append('<span class="preview"> &nbsp;&ndash;&nbsp;' + preview + '</span>'); 
            $('#email'+i).append('<span class="date">' + formattedDate(email) + '</span>');
        }
    }
    append_emails(testData.inbox); 
    var session_start = new Date();
	log_message('Started Test '+current_test+' on: ' + session_start);

	/* Returns a timestamp of the exact second since the sessions started
	   For example, if session started at 3:00, this function will return
	   60 at 3:01 */
	var get_timestamp = function() {
		return ((new Date().getTime()) - session_start.getTime())/1000;
	}

	/* Attach prediction to 'To' field when selected */
    var attachPrediction = function(contact) {
		wrap_contact(contact) //append email to contents of to_field
	
		first_click = false;
    }
   
    /*var attachPredictionGroup = function(prediction_group) {
        var groups = prediction_group.subgroups;
        var contacts = prediction_group.contacts;

        for (var i = 0; i < groups.length; i++) {
            attachPredictionGroup(groups[i]);
        }

        for (var j = 0; j < contacts.length; j++) {
        	if (!contacts[j].deleted)
            	attachPrediction(contacts[j].name);
        }
    }*/

	//Expand email
	$(document).on('click', '.email', function() {
		if (email_editor_open)
			$('#email_expanded_col').attr('class','col-md-4')
		else
			$('#email_expanded_col').attr('class','col-md-10')

		var id = $(this).attr('id');
		var index = parseInt(id.substring(5)); //i.e, 'email5' will yield 5
		var email = emails[index];
        
       
		$('.panel-title').text(email.subject);
		$('#email_expanded > .panel-body').append('<strong class="tracked" id="expanded_sender">' + email.sender.name +'</strong>' + '&lt;' + email.sender.emailAddress + '&gt<br>');
        var sb = new StringBuilder();
            sb.append('<span class="receivers"> To ');
            var comma = " ";
            for (var j = 0; j < email.receivers.length; j++) {
                comma = (j == email.receivers.length - 1)?" ":", ";
                sb.append(email.receivers[j].name + comma);
            }
        $('#email_expanded > .panel-body').append(sb.toString() + '</span><hr>');
        $('#email_expanded > .panel-body').append('<p class="tracked" id="expanded_content">' + email.content +'</p>');
		$('#email_expanded_col').show();
		$('#email_list').hide();
	});

	//Open New Message editor
	$('#nav_new_message').click(function() {

		$("#testalert").alert();
		email_editor_open = true;

		$('.preview').hide();
		$('#email_expanded_col').attr('class', 'col-md-4');
		$('#email_list').attr('class','col-md-4');
		$('#new_message_editor').show();
	});
    
    //Open Sent 
    $('#nav_sent').click(function() {     
		$('#email_expanded > .panel-heading > .panel-title').empty();
		$('#email_expanded > .panel-body').empty();
		$('#email_expanded_col').hide();

		if (email_editor_open)
			$('#email_list').attr('class','col-md-4')
		else
			$('#email_list').attr('class','col-md-10')
        emails = testData.sent;
        append_emails(testData.sent);
		$('#email_list').show();
	});
    //Open inbox
	$('#nav_inbox').click(function() {
		$('#email_expanded > .panel-heading > .panel-title').empty();
		$('#email_expanded > .panel-body').empty();
		$('#email_expanded_col').hide();

		if (email_editor_open)
			$('#email_list').attr('class','col-md-4')
		else
			$('#email_list').attr('class','col-md-10')
        
        emails = testData.inbox;
        append_emails(testData.inbox);
		$('#email_list').show();
	});

	/* Tracking functions */
	$(document).on('mouseenter', '.tracked', function() {
		log_message('Entered element ' + $(this).prop('id')+'; timestamp: ' + get_timestamp());
	});

	$(document).on('mouseleave', '.tracked', function() {
		log_message('Left element ' + $(this).prop('id')+'; timestamp: ' + get_timestamp());
	});

	$(document).on('click', '.click', function() {
		log_message('Clicked element ' + $(this).prop('id')+'; timestamp: ' + get_timestamp());
	});

	$(document).on('change keyup paste','.text', function() {
		log_message('Changed content of ' + $(this).prop('id') + ' to ' +
					$(this).val() + ';timestamp: ' + get_timestamp());
	}); 

	/* Autocomplete contacts */
	$(function() {
        var contacts = [];
        for (var i = 0; i < testData.contacts.length; i++) {
            contacts.push(testData.contacts[i].name);
        }

		$('#to_field').autocomplete({
			source:contacts
		});
	});

	/* Wrap autocompleted contacts in the panel */
	$(document).on('click','.ui-corner-all', function() {
		var content = $('#to_field').val();
		if (content !== '') {
			wrap_contact(content);
    	}

    	$('#to_field').val('');

	});

	/* Trigger hover effect on input */
	$('#to_field').on('focus', function() {
		$('#to_field_outer').trigger('focus');
	})

    var wrap_contact = function(content) {
    		var sb = new StringBuilder();
    		sb.append('<span class="contact_wrapper wrapper">');
            sb.append('<span class="label label-info">');
            sb.append('<span class="tracked click to_field_contact_name">'+ content +'</span>');
            sb.append('<span class="glyphicon glyphicon-remove remove tracked click"></span>');
            sb.append('</span>');
            sb.append('</span>');
    		$('#to_field_outer div').append(sb.toString());
    		$('#to_field').val('');
            log_message('Added ' + content + ' to to_field;timestamp: ' + get_timestamp());
            /* Attach predictions */
			if (!already_predicted) {
				already_predicted = true;

	            $('#predictions').append('<span> Consider including: </span>');
	            //if (flat_interface)
	            	//$('#predictions').append(predictionGroup.buildFlatInterface());
	            //else
	            	//$('#predictions').append(predictionGroup.buildHierarchicalInterface());
                
                //log_message('Suggested contacts: ' + contactsToString(predictionGroup.contacts));
				$('#predictions').show();
			}
    }

    $(document).on('click', '.contact_wrapper span.remove', function() {
    	$(this).parents('.contact_wrapper').remove();
    })

    //Attach predictions
	$('#to_field').on('change keyup paste',function() {
		var content = $(this).val();
		if (content.indexOf(",") != -1) {
			wrap_contact(content.substring(0,content.length - 1));
		}
	});


    $(document).on('mouseenter','.prediction_group', function() {
        var id = $(this).data('group_id');
        $('.group'+id).css('color','#FF9966');
    });

    $(document).on('mouseleave','.prediction_group', function() {
        var id = $(this).data('group_id');
        $('.group'+id).css('color','#428bca');
    });

    
	$(document).on('click','.prediction', function() {
        var name = $(this).text();
	    attachPrediction(name);
    });

    /*$(document).on('click','.prediction_group', function() {
        var index = parseInt($(this).data('group_id'));
        attachPredictionGroup(PredictionGroup.all[index]);
    });
    
    $(document).on('click','prediction_wrapper span.remove', function() {
        //first, delete the contact from the group
        var group_index = parseInt($(this).data('group_id'));
        var contact_index = parseInt($(this).data('contact_id'));

        var group = PredictionGroup.all[group_index];
        group.deleteContact(contact_index);
    
        //remove contact node from html
        $(this).parent().remove();
    });*/
    
    var contactsToString = function(contacts) {
        var comma = " ";
        var sb = new StringBuilder();
        for (var i = 0; i < contacts.length; i++) {
            comma = (i == contacts.length-1)?" ":", ";
            sb.append(contacts[i].name + "<" + contacts[i].emailAddress + ">" + comma);
        }

        return sb.toString();
    }
    
    $('#send').on('click', function() {
        log_message('Ended Test ' + current_test + ' on: ' + new Date());
        /* Collect the values on the to_field */
        var contacts_selected = []
        
        $('span.to_field_contact_name').each(function() {
            var contact = Contact.all[$(this).text()]; //get the contact object using the name as a key
            if (!contact) { //nothing found
                contact = $(this).text();
            }
            contacts_selected.push(contact);
        });
        
        $.ajax({
            type:'POST',
            async:false,
            url:submit_test_url,
            data: {'data':session_log},
            success: function(data) {
                var selected = new StringBuilder();
                var comma = " ";
                
                var selected = contactsToString(contacts_selected);
                var expected = contactsToString(testData.correctSet);
                
                /* Display test scenario instructions */
                $('#results').find('.modal-body').append("<strong>Selected</strong>: " + selected);
                $('#results').find('.modal-body').append("<br><strong>Expected</strong>: " + expected);
                $('#results').modal('toggle');
            }
        });

     });
    
    /* Once the modal is clicked, reload the site  */
    $('#results').find('button').on('click', function() {
        window.location.reload(true);
    });
    
	$('#save_session').on('click', function() {
        log_message('Session ended on: ' + new Date());
		$.ajax({
			type: 'POST',
            async:false,
			url:save_session_url,
			data: {'data':session_log, 'end_session':true},
			success: function(data, status, jqXHR) {
                window.location.replace(data); //load a thank you page
			}
		});
	});

    $('#end_session').on('click', function () {
        var c = confirm("Are you sure?");
        if (c==true) {
            $.ajax({
                type: 'POST',
                url:end_session_url,
                success:function(data) {
                    window.location.replace(data);
                }
            });
        }
        
    });
    
	//Save session if window is closed
	$(window).unload(function() {
        log_message('Session paused on: ' + new Date());
		$.ajax({
			type: 'POST',
            async:false,
			url:save_session_url,
			data: {'data':session_log, 'end_session':false},
            success: function(data) {
            }
		});
	});
});
