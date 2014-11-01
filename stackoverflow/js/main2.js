$(document).ready(function() {
    
    /* Variables */
    testData = jQuery.parseJSON(data);
    console.log(testData);
    window.questions = testData.questions;
    console.log(questions);
    allTags = testData.tags;
    var instructions = testData.instructions;
    tagTimes = testData.tagTimes;

    var save_session_url = '../php/save_session_log.php';
	var end_session_url = '../php/end_session.php';
	var submit_test_url = '../php/submit_test.php';
    var session_log = "\n";
    
		
    /* Display test scenario instructions */
	/*$('#instructions').find('p').text(instructions);
    $('#instructions').modal('toggle');*/
    
    /* Main logging function. All messages are appended to a string that is sent over to server when the session ends */
	var log_message = function(message) {
 		console.log(message);
		session_log += (message + '\n');
	}
    
    var relativeDate = function(date) {
        return $.timeago(Date.parse(date));
    }

	var formattedDate = function(email) {
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        
        var date = new Date(email.dateSent);
    	return (monthNames[date.getMonth()] + " " + date.getDate());
	}

    var session_start = new Date();
	log_message('Started Test '+current_test+' on: ' + session_start);

	/* Returns a timestamp of the exact second since the sessions started
	   For example, if session started at 3:00, this function will return
	   60 at 3:01 */
	var get_timestamp = function() {
		return ((new Date().getTime()) - session_start.getTime())/1000;
	}

    function makeQuestionListingString(score, numAnswers, questionNumber, title, tags, posterName, timePosted) {
        var tagString = "";
        var currTimes = [];
        for(var tag = 0; tag < tags.length; tag++) {
            tagString += '<span class="tag" data-tagTime="' + tagTimes[allTags.indexOf(tags[tag])] + '">' + tags[tag] + '</span>';
            currTimes.push(tagTimes[allTags.indexOf(tags[tag])]);
        }

        questionTime = calculateQuestionTime(currTimes);

        var questionItem = ['<table class="questionLayout" cellpadding="10">',
                            '<tr>',
                                '<td rowspan="4">',
                                    '<div class="stat">' + score + '</div>',
                                    '<div class="statLabel">' + ((score == 1) ? 'point' : 'points') + '</div>',
                                '</td>',

                                '<td rowspan=4">',
                                    '<div class="stat">' + numAnswers + '</div>',
                                    '<div class="statLabel">' + ((numAnswers == 1) ? 'answer' : 'answers') + '</div>',
                                '</td>',                              
                            '</tr>',
                            '<tr>',
                                '<td>',
                                    '<div class="postTitle"><a data-questionNumber="' + questionNumber + '" class="titleLink">' + title + '</a></div>',
                                '</td>',
                            '</tr>',
                            '<tr>',
                                '<td>',
                                    '<div class="tags">',
                                        tagString,
                                        '<span class="questionTime">Estimated time: ' + questionTime,                                         
                                    '</div>',
                                '</td>',

                                '<td>',
                                    '<div class="postInfo">posted by ' + posterName + ' ' + timePosted + '.</div>',
                                '</td>',
                            '</tr>',

                    '</table>'].join('\n');
        return questionItem;
    }

    function makeQuestionDetailString(title, postScore, postBodyText, tags, timePosted, posterName, numAnswers) {
        var tagString = '';
        var currTimes = [];

        for(var tag = 0; tag < tags.length; tag++) {
            tagString += '<span class="tag" data-tagTime="' + tagTimes[allTags.indexOf(tags[tag])] + '">' + tags[tag] + '</span>';
            currTimes.push(tagTimes[allTags.indexOf(tags[tag])]);
        }

        questionTime = calculateQuestionTime(currTimes);

        var postString = ['<table class="questionDetailTable">',
            '<tr>',
                '<span class="questionDetailTitle">' + title + '</span>',
            '</tr>',
            '<hr class="emphasisDividerFlipped">',
            '<tr class="postContent">',
                '<td valign="top">',
                    '<div class="votingBox">',
                        '<table class="votingBoxTable">',
                            '<tr><td valign="bottom"><div class="arrow post-arrow up-arrow"></div></td></tr>',
                            '<tr><td><div class="detailStat">' + postScore + '</div></td></tr>',
                            '<tr><td valign="top"><div class="arrow post-arrow down-arrow"></div></td></tr>',
                        '</table>',
                    '</div>',
                '</td>',
                '<td colspan="3" valign="top">',
                    '<div class="bodyText">',
                        postBodyText,
                    '</div>',
                '</td>',
            '</tr>',
            '<tr class="postDetailInfo">',
                '<td></td>',
                '<td>',
                    '<div class="detailTags">',
                        tagString,
                        '<span class="questionTime">Estimated time: ' + questionTime,
                    '</div>',
                '</td>',
                '<td>',
                    '<div class="detailPostInfo">',
                        '<span class="postInfoTime">posted ' + timePosted + '</span>',
                        '<div class="postInfoPoster">' + posterName + '</div>',
                    '</div>',
                '</td>',
            '</tr>',
         '</table>',
         '<div class="numAnswersDisplay">' + numAnswers + ' ' + ((numAnswers == 1) ? 'answer' : 'answers') + '</div>',
         '<hr class="emphasisDivider">'].join('\n');

         return postString;
    }

    function makeAnswerString(answerScore, answerBodyText, answerDatePosted, answerPosterName) {
        answersString = ['<table class="answersTable">',
                '<tr class="answerContent">',
                    '<td valign="top" align="left" class="answerVotingCell">',
                    //'<td colspan="4" valign="top">',
                        '<div class="answerVotingBox">',
                            '<table class="answerVotingBoxTable">',
                                '<tr><td><div class="arrow answer-arrow up-arrow"></div></td></tr>',
                                '<tr><td><div class="answerDetailStat">' + answerScore + '</div></td></tr>',
                                '<tr><td><div class="arrow answer-arrow down-arrow"></div></td></tr>',
                            '</table>',
                        '</div>',
                    '</td>',
                    '<td colspan="3" valign="top">',
                        '<div class="answerBodyText">',
                            answerBodyText,
                        '</div>',
                    '</td>',
                '</tr>',
                '<tr class="answerDetailInfo">',
                    '<td colspan="3">',
                        '<div class="detailAnswerInfo">',
                            '<div class="answerInfoTime">posted ' + answerDatePosted + '</div>',
                            '<div class="answerInfoPoster">' + answerPosterName + '</div>',
                        '</div>',
                    '</td>',
                '</tr>',
             '</table>',
             '<hr class="spacer">'].join("\n");

        return answersString;
    }

    /* Populate question list */
    function populateQuestionList() {
        console.log(questions);
        $("#questionList").html("");
        for(var questionNumber = 0; questionNumber < questions.length; questionNumber++) {
            var currQuestion = questions[questionNumber];
            var posterName = currQuestion.poster.name;
            var timePosted = relativeDate(currQuestion.date);
            var title = currQuestion.title;
            var tags = currQuestion.tags;
            var numAnswers = currQuestion.answers.length;
            var score = currQuestion.score;
            var tagString = "";
            var currTimes = [];
            var questionTime = 0;
            
            questionItem = makeQuestionListingString(score, numAnswers, questionNumber, title, tags, posterName, timePosted);

            $("#questionList").append(questionItem);
        }
        updateTooltips();
        initTitles();
    }
    populateQuestionList();
    function populatePost(postNumber) {
        var currQuestion = questions[postNumber];
        var title = currQuestion.title;
        var postScore = currQuestion.score;
        var tags = currQuestion.tags;
        var timePosted = relativeDate(currQuestion.date);
        var posterName = currQuestion.poster.name;
        var postBodyText = currQuestion.bodyText;
        var tagString = "";
        var numAnswers = currQuestion.answers.length;
        var currTimes = [];
        var questionTime = 0;
        
        

        postString = makeQuestionDetailString(title, postScore, postBodyText, tags, timePosted, posterName, numAnswers);
        
    
         var answersString = '';
         for(var answer = 0; answer < numAnswers; answer++) {
            var currAnswer = currQuestion.answers[answer];
            var answerBodyText = currAnswer.bodyText;
            var answerPosterName = currAnswer.poster.name;
            var answerScore = currAnswer.score;
            var answerDatePosted = relativeDate(currAnswer.date);
            answersString += makeAnswerString(answerScore, answerBodyText, answerDatePosted, answerPosterName);
         }
        
        $("#mainDetailArea").html(postString + "\n" + answersString);
        updateTooltips();

    }
    function initTitles() {
        $(".titleLink").click(function() {
            var postNumber = $(this).attr("data-questionNumber");
            populatePost(postNumber);
            $("#backButton").css("display", "block");
            $("#questionListArea").animate({
                marginLeft: "-125%"
            }, 250);

            $("#newQuestionButton").animate({
                left: "-125%"
            }, 250);

            $("#questionDetailArea").animate({
                marginLeft: "25%"
            }, 250);

            $("#newAnswerButton").animate({
                left: "75%"
            }, 250);
            console.log("clicked");
        });
    

        $("#backButton").click(function() {
            $("#questionDetailArea").animate({
                marginLeft: "175%"
            }, 250);

            $("#newAnswerButton").animate({
                left: "195%"
            }, 250);

            $("#backButton").css("display", "none");
            $("#questionListArea").animate({
                marginLeft: "25%"
            }, 250);
            $("#newQuestionButton").animate({
                left: "75%"
            }, 250);

        });
    }

    function updateTooltips() {
        $(".tag").each(function(){
            $(this).qtip({
                content: {
                    text: '<strong>' + $(this).attr('data-tagTime') + ' minutes</strong>',
                    title: '<strong>Expected Time</strong>'
                },
                style: {
                    classes: 'qtip-bootstrap qtip-rounded'
                },
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    target: $(this)
                }
            });

        });
    }

    function calculateQuestionTime(data) {
        min = Math.min.apply(Math, data);
        if(min ==  NaN || min == undefined) {
            return "N/A";
        } else {
            return Math.min.apply(Math, data);
        }
    }

    function newPostPopupUpdateTime(event, ui) {
        enteredTags = $("#postTagsField").tagit("assignedTags");
        var estimate;
        times = [];
        if(enteredTags.length == 0) {
            estimate = 'N/A';
        } else {
            for(var i = 0; i < enteredTags.length; i++) {
                tagTime = tagTimes[allTags.indexOf(enteredTags[i])];
                if(tagTime != undefined) {
                    times.push(tagTime);
                }
                
            }
            time = calculateQuestionTime(times);
            if(time == Infinity) {
                estimate = 'N/A';
            } else {
                estimate = time + ((time == 1) ? ' minute' : ' minutes');
            }
            
        }
        $("#newQuestionPopupEstimatedTime").text(estimate );
    }

    $("#newQuestionButton").magnificPopup({
        type: 'inline',
        midClick: true,
        callbacks: {
            afterClose: function() {
                $("#postTagsField").tagit("removeAll");
                $("#postTitleField, #postBodyField").val("");
            }
        }
    });

    $("#postTagsField").tagit({
        availableTags: allTags,
        afterTagAdded: newPostPopupUpdateTime,
        afterTagRemoved: newPostPopupUpdateTime,
        tagLimit: 5
    });

    $("#newQuestionSubmitButton").click(function() {
        console.log("clicked");
        testData.questions.push({answers: [], bodyText: $("#postBodyField").val(), date: new Date(), poster: {emailAddress: "test@you.com", name: "You"}, score: 0, tags: $("#postTagsField").tagit("assignedTags"), title: $("#postTitleField").val()});
        window.questions = testData.questions;
        populateQuestionList();
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

});
