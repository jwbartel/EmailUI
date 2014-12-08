$(document).ready(function() {
    
    /* Variables */
    testData = jQuery.parseJSON(data);
    console.log(testData);
    window.questions = testData.questions;
    //console.log(questions);
    allTags = testData.tags;
    var instructions = testData.instructions;
    tagTimes = testData.tagTimes;
    var save_session_url = '../php/save_session_log.php';
	var end_session_url = '../php/end_session.php';
	var submit_test_url = '../php/submit_test.php';
    var session_log = "\n";
    $("#algorithmDropdown").val(testData.algorithm);
	/*var relatedTags = {
        'java': ['c', 'c++', 'OOP', 'inheritance', 'c#', 'android'],
        'php': ['asp', 'mysql', '.net', 'ruby-on-rails', 'sql-server', 'ajax', 'xml'],
        'javascript': ['css', 'html', 'jquery', 'ajax'],
        'perl': ['ruby', 'python-2', 'python-3'],
        'ruby': ['ruby-on-rails', 'perl'],
        'python-2': ['python-3', 'java', 'inheritance'],
        'python-3': ['python-2', 'java', 'inheritance'],
        'asp': ['php', 'mysql', '.net', 'sql-server', 'xml'],
        'c': ['java', 'c++', 'c#', 'inheritance', 'OOP'],
        'c++': ['java', 'c', 'c#', 'inheritance', 'OOP'],
        'css': ['html', 'javascript', 'jquery'],
        'html': ['css', 'javascript', 'jquery', 'xml'],
        'assembly': ['c', 'memory'],
        'prolog': ['SAS', 'R', 'hadoop'],
        'SAS': ['R', 'prolog', 'hadoop'],
        'R': ['SAS', 'prolog', 'hadoop'],
        'OOP': ['java', 'c', 'c++', 'inheritance'],
        'hadoop': ['R', 'SAS', 'prolog'],
        'inheritance': ['OOP', 'java', 'c', 'c++'],
        'memory': ['java', 'c', 'c++', 'assembly'],
        'c#': ['java', 'c', 'c++', 'OOP', 'inheritance'],
        'android': ['java', 'ios', 'iphone'],
        'jquery': ['javascript', 'ajax', 'css', 'html'],
        'ios': ['objective-c', 'android', 'iphone'],
        'mysql': ['php', 'asp', '.net', 'sql-server'],
        'objective-c': ['iphone', 'ios', 'android', 'c', 'c++', 'java', 'inheritance', 'OOP'],
        'iphone': ['ios', 'android', 'java', 'objective-c'],
        '.net': ['asp', 'php', 'mysql'],
        'ruby-on-rails': ['php', 'asp', '.net'],
        'ruby': ['perl', 'ruby-on-rails'],
        'sql-server': ['mysql', 'php', 'asp', '.net'], 
        'ajax': ['php', 'javascript', 'jquery', 'asp'],
        'xml': ['html'],
        'bash': ['c']
    }*/
    var relatedTags = {
        "unc": ['duke', 'tokoto', 'paige', 'meeks', 'hicks', 'college', 'tar-heels', 'chapel-hill', 'north-carolina'],
        "duke": ['unc', 'okafor', 'sulaimon', 'cook', 'winslow', 'college', 'blue-devils', 'durham', 'north-carolina'],
        'acc': ['basketball', 'ncaa', 'tokoto', 'paige', 'meeks', 'hicks', 'okafor', 'sulaimon', 'cook', 'winslow', 'sports', 'college'],
        'nba': ['basketball', 'sports', 'nfl'],
        'basketball': ['acc', 'ncaa', 'football', 'tokoto', 'page', 'meeks', 'hicks', 'okafor', 'sulaimon', 'cook', 'winslow', 'tar-heels', 'blue-devils', 'sports'],
        'football': ['nfl', 'nba', 'sports'],
        'ncaa': ['sports', 'basketball', 'acc', 'nba', 'nfl', 'football'],
        'tokoto': ['unc', 'tar-heels', 'chapel-hill', 'north-carolina', 'sports', 'college', 'paige', 'meeks', 'hicks'],
        'paige': ['unc', 'tar-heels', 'chapel-hill', 'north-carolina', 'sports', 'college', 'tokoto', 'meeks', 'hicks'],
        'meeks': ['unc', 'tar-heels', 'chapel-hill', 'north-carolina', 'sports', 'college', 'tokoto', 'paige', 'hicks'],
        'hicks': ['unc', 'tar-heels', 'chapel-hill', 'north-carolina', 'sports', 'college', 'tokoto', 'paige', 'meeks'],
        'okafor': ['duke', 'blue-devils', 'durham', 'north-carolina', 'sports', 'college', 'sulaimon', 'cook', 'winslow'],
        'sulaimon': ['duke', 'blue-devils', 'durham', 'north-carolina', 'sports', 'college', 'okafor', 'cook', 'winslow'],
        'cook': ['duke', 'blue-devils', 'durham', 'north-carolina', 'sports', 'college', 'sulaimon', 'okafor', 'winslow'],
        'winslow': ['duke', 'blue-devils', 'durham', 'north-carolina', 'sports', 'college', 'sulaimon', 'cook', 'okafor'],
        'sports': ['tokoto', 'page', 'meeks', 'hicks', 'okafor', 'sulaimon', 'cook','college', 'nfl', 'nba', 'basketball', 'football', 'acc', 'ncaa', 'unc', 'duke', 'tar-heels', 'blue-devils'],
        'college': ['unc', 'duke', 'sports', 'tar-heels', 'blue-devils', 'tokoto', 'page', 'meeks', 'hicks', 'okafor', 'sulaimon', 'cook', 'acc', 'ncaa'],
        'class': ['computer-science', 'college'],
        'computer-science': ['class', 'college'],
        'tar-heels': ['unc', 'chapel-hill', 'tokoto', 'paige', 'meeks', 'hicks', 'college', 'blue-devils'],
        'blue-devils': ['duke', 'durham', 'okafor', 'sulaimon', 'cook', 'winslow', 'college', 'tar-heels'],
        'durham': ['duke', 'blue-devils', 'college'],
        'chapel-hill': ['unc', 'tar-heels', 'college'],
        'north-carolina': ['unc', 'duke', 'tar-heels', 'blue-devils', 'college', 'chapel-hill', 'durham']

    };
    console.log(relatedTags);
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

    function intersect(array1, array2) {
        res = array1.filter(function(n) {
            return array2.indexOf(n) != -1
        });

        //console.log("intersect " + array1 + "\t" + array2 + "\t" + res);
        return res;
    }

    function removeFromArray(source, target) {
        arr = source.slice(0);
        for(i = 0; i < target.length; i++) {
            index = arr.indexOf(target[i]);
            if(index != -1) {
                arr.splice(index, 1);
            }
        }
        //console.log("removeFromArray " + source + "\t" + target + "\t" + arr);
        return arr;
    }

    function getSuggestions(tags) {
        if(tags.length == 0) {
            return [];
        }
        //console.log(tags);
        res = relatedTags[tags[0]];
        //console.log(res);
        for(i = 1; i < tags.length; i++) {
            res = intersect(res, relatedTags[tags[i]]);
        }

        res = removeFromArray(res, tags);
        //console.log("getSuggestions " + res);
        return res;
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

        questionTime = calculateQuestionTime(tags, currTimes);

        var questionItem = ['<table class="questionLayout" cellpadding="10">',
                            '<tr>',
                                '<td rowspan="4" class="stattd">',
                                    '<div class="stat">' + score + '</div>',
                                    '<div class="statLabel">' + ((score == 1) ? 'point' : 'points') + '</div>',
                                '</td>',

                                '<td rowspan="4" class="stattd">',
                                    '<div class="stat">' + numAnswers + '</div>',
                                    '<div class="statLabel">' + ((numAnswers == 1) ? 'answer' : 'answers') + '</div>',
                                '</td>',                              
                            '</tr>',
                            '<tr>',
                                '<td class="titletd" colspan="2">',
                                    '<div class="postTitle"><a data-questionNumber="' + questionNumber + '" class="titleLink">' + title + '</a></div>',
                                '</td>',
                            '</tr>',
                            '<tr>',
                                '<td class="tagstd">',
                                    '<div class="tags">',
                                        tagString,
                                        '<span class="questionTime">Estimated time: ' + questionTime + ((questionTime == 1) ? ' minute' : ' minutes') + '</span>',                                         
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

        questionTime = calculateQuestionTime(tags, currTimes);

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
                        '<span class="questionTime">Estimated time: ' + questionTime + ' minutes',
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
        //console.log(questions);
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
        //console.log("repopulated");
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
        $("#mainDetailArea").attr("questionNumber", postNumber);
        

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
                left: "-125%"
            }, 250);

            $("#newQuestionButton").animate({
                left: "-125%"
            }, 250);

            $("#questionDetailArea").animate({
                left: "25%"
            }, 250);

            $("#newAnswerButton").animate({
                left: "75%"
            }, 250);
            //console.log("clicked");
        });
    

        $("#backButton").click(function() {
            $("#questionDetailArea").animate({
                left: "175%"
            }, 250);

            $("#newAnswerButton").animate({
                left: "195%"
            }, 250);

            $("#backButton").css("display", "none");
            $("#questionListArea").animate({
                left: "25%"
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
                    text: '<strong>' + $(this).attr('data-tagTime') + (($(this).attr('data-tagTime') == 1) ? ' minute' : ' minutes') + '</strong>',
                    title: '<strong>Expected Time</strong>'
                },
                style: {
                    classes: 'qtip-bootstrap qtip-rounded'
                },
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    target: $(this)
                },
                hide: {
                    event: 'click mouseleave'
                }
            });

        });
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
            time = calculateQuestionTime(enteredTags, times);
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

    $("#newAnswerButton").magnificPopup({
        type: 'inline',
        midClick: true,
        callbacks: {
            afterClose: function() {
                $("#answerBodyField").val("");
            }
        }
    })

    $("#settingsIcon").magnificPopup({
        type: 'inline',
        midClick: true
    });

    function newPostPopupUpdateSuggestions(tags) {
        suggestions = getSuggestions(tags);
        //console.log(suggestions);
        $("#newQuestionPopupSuggestions").html("");
        for(i = 0; i < suggestions.length; i++) {
            tag = suggestions[i];
            time = tagTimes[allTags.indexOf(tag)];
            html = '<span data-tagTime="' + time + '" class="suggestedTag tag">' + tag + '</span>';
            $("#newQuestionPopupSuggestions").append(html);
            rebindSuggestionClick();
        }
    }

    function rebindSuggestionClick() {
        $(".suggestedTag").click(function(event) {
            //console.log("clicked");
            tagName = $(this).text();
            $("#postTagsField").tagit("createTag", tagName);
            newPostPopupUpdateSuggestions($("#postTagsField").tagit("assignedTags"));
            
        });
        updateTooltips();
    }

    $("#postTagsField").tagit({
        availableTags: allTags,
        afterTagAdded: function(event, ui) {
            newPostPopupUpdateTime();
            newPostPopupUpdateSuggestions($("#postTagsField").tagit("assignedTags"));
        },
        afterTagRemoved: function(event, ui) {
            newPostPopupUpdateTime();
            newPostPopupUpdateSuggestions($("#postTagsField").tagit("assignedTags"));
        },
        tagLimit: 5
    });

    $("input.ui-widget-content").addClass("tagField");

    $("#newQuestionSubmitButton").click(function() {
        //console.log("clicked");
        testData.questions.push({answers: [], bodyText: $("#postBodyField").val(), date: new Date(), poster: {emailAddress: "test@you.com", name: "You"}, score: 0, tags: $("#postTagsField").tagit("assignedTags"), title: $("#postTitleField").val()});
        window.questions = testData.questions;
        populateQuestionList();
        $.magnificPopup.close();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        $(".questionLayout:last").effect("highlight", {color: "orange"}, 2000);
        
    });
    

    $("#newAnswerSubmitButton").click(function() {
        //console.log("clicked");
        questionNumber = parseInt($("#mainDetailArea").attr("questionNumber"));
        testData.questions[questionNumber].answers.push({bodyText: $("#answerBodyField").val(), date: new Date(), poster: {emailAddress: "test@you.com", name: "You"}, score: 0});
        window.questions = testData.questions;
        populatePost(questionNumber);
        $.magnificPopup.close();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        $(".answersTable:last, .detailAnswerInfo:last").effect("highlight", {color: "orange"}, 2000);
    });

    function calculateQuestionTime(tags, times) {
        var timeResult;
        $.ajax({
             type: "POST",
             async: false,
             url: "php/run_algorithm.php",
             data: {algorithm: testData.algorithm, json:JSON.stringify({tags:tags,times:times})},
             success: function(data) {
                timeResult = data;
                //console.log(timeResult);

             }
        });
        
        return timeResult;
    }

    $("#changeAlgorithmButton").click(function() {
        testData.algorithm = $("#algorithmDropdown").val();
        populateQuestionList();
        $.magnificPopup.close();
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
