    var delay = 500;
    var input = "";
    var formattedLog = []
    var timer;
    var current = 1;
    var pauseMarker;
    var isPaused = false;
    var description = "Replaying Log";
    var isFirstMC= true;
    var fileName = 'log.txt';

    function startReplay() {
	loadData();
	var mouseCoord = getFirstMouseCoordinates(); // start coordiantes of the mouse pointer
	alert("Press OK to Begin.");
	setUpCursor(mouseCoord.x, mouseCoord.y);
	executeTimer();
    };

    function setUpCursor(x, y) {
	$("body").append("<div id='box'></div>");
	$("#box").css("width", "20px");
	$("#box").css("height", "20px");
	$("#box").css("position", "absolute");
	$("#box").css("background-image", "url('play/cursor.png')");
	$("#box").css("background-size", "20px 20px");
	$("#box").css("z-index", "1");

    }

    function executeTimer() {
	if (!timer) {
	    timer = setTimeout(function() {
		replay();
	    }, delay);
	}
    };

    function replay() {
	if (current < formattedLog.length - 1) {
	    var type = formattedLog[current].type;
	    if (type == "mc") {
		moveMouse();
	    }
	    if (type == "enter") {
		clickById();
	    }
	    if (type == "click") {
		clickById();
	    }
	    if (type == "change") {
		typeText();
	    }
	    if (type == "leave") {

	    }
	    delay = formattedLog[current]['delay'];
	    current++;
	    setTimeout(function() {
		replay();
	    }, delay);
	} else {
	    setTimeout(function(){
	    $("#box").hide();
	    $("*").css("cursor", "default");
	    alert("End of Replay");}, 1000);
	    return;
	}
    };

    function loadData() {
	
	var file = "play/" + fileName;

	jQuery.get(file, function(data) {
	    var oReq = new XMLHttpRequest();
	    oReq.open("GET", file, true);
	    oReq.onload = function(e) {
	    data = oReq.responseText;
	    var lines = splitLines(data);
	    formattedLog = toArray(lines);
	    }
	    oReq.send();
	    return false;
	});

	function splitLines(args) {
	    var data = args;
	    var result = data.toString().split("\n");
	    return result;
	}

	function toArray(lines) {
	    var completeLog = [];
	    for (var i = 0; i < lines.length - 1; i++) {
		var individualInsturction = parseString(lines[i - 1], lines[i], lines[i + 1]);
		completeLog[i] = individualInsturction;
	    }
	    return completeLog;
	};
    }

    function parseString(before, currentline, next) {
	var time2 = parseFloat(next.match(/(\d+.\d+)$/));
	var action = String(currentline.match(/^\w+/));
	var parsedText = [];
	switch (action) {
	    case "Started":
		$("*").css("cursor", "none");
		break;
	    case "Entered":
		parsedText = enterArea(currentline);
		break;
	    case "Left":
		parsedText = leaveArea(currentline);
		break;
	    case "Clicked":
		parsedText = clickArea(currentline);
		break;
	    case "Added":
		//addPerson(currentline);
		break;
	    case "Suggested":
		break; //Should be suggested already.
	    case "Changed":
		parsedText = typing(before, currentline, next);
		break;
	    case "Mouse":
		parsedText = mouseMovement(currentline)
		break;
	    case "Ended":
		alert("Press OK to start replay.");
		break;
	    default:
		break;
	}

	parsedText['delay'] = (time2 - parsedText['delay']) * 1000;

	return parsedText;

    }

    function enterArea(line) {
	var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
	var result = line.match(re);
	//(type, delay, id, text, x, y)
	return new instuction('enter', result[5], result[2], null, null, null);
    }

    function clickArea(line) {
	var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
	var result = line.match(re);
	//(type, delay, id, text, x, y)
	return new instuction('click', result[5], result[2], null, null, null);
    }

    function leaveArea(line) {
	var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
	var result = line.match(re);
	//(type, delay, id, text, x, y)
	return new instuction('leave', result[5], result[2], null, null, null);

    }

    function typing(before, line, next) {
	var re = /(\w*)\s\w*(.{4})(\w*)(.{4})(.*(?=;))(.\w*.\s)(\d*.\d*)/
	var result = line.match(re);
	var text = ""
	var firstChange = false,
	    lastChange = false;

	if (String(before.match(/^\w+/)) != "Changed") {
	    firstChange = true;
	}

	if (String(next.match(/^\w+/)) != "Changed") {
	    lastChange = true;
	}

	if (firstChange && lastChange) {
	    text = result[5];

	} else {
	    if (firstChange) {
		var characters = next.match(re);
		if (characters[3] == result[3]) {
		    text = getCharFragments(result[5], characters[5], true, false);
		}

	    } else if (!lastChange) {
		var characters = next.match(re);
		if (characters[3] == result[3]) {
		    text = getCharFragments(result[5], characters[5], false, false);
		}

	    } else if (lastChange) {
		var characters = before.match(re);
		if (characters[3] == result[3]) {
		    text = getCharFragments(characters[5], result[5], false, true);
		}
	    }
	}
	//(type, delay, id, text, x, y)
	return new instuction('change', result[7], result[3], text, null, null);
    }

    function getCharFragments(currentLine, next, isFirst, isLast) {
	var charsTyped = "";
	if (isFirst) {
	    return next;
	}

	if (isLast) {
	    var secondToLast = currentLine;
	    var last = next;
	    if (last.length > secondToLast) {
		charsTyped = next.substring(secondToLast.length, last.length);
	    } else if (last.length < secondToLast) {
		charsTyped = "\\-" + (secondToLast.length - last.length);
	    }
	    return charsTyped;
	}

	if (currentLine.length <= next.length) {
	    charsTyped = next.substring(currentLine.length, next.length);

	} else if (currentLine.length > next.length && !lastChange) {
	    charsTyped = "\\-" + (currentLine.length - next.length) // '\\-#' indicates backspace
	}
	
	return charsTyped;
    }

    function mouseMovement(line) {
	var re = /(^Mouse Coordinates\s)(\d*)\s(\d*)(.\s\w*.\s)(\d*.\d*)/;
	var result = line.match(re);
	
	if (isFirstMC) {
	    setXY(result[2], result[3]);
	    isFirstMC = false;
	}
	//(type, delay, id, text, x, y)
	return new instuction('mc', result[5], null, null, result[2], result[3])
    }
    
    function setXY(x,y){
	$("#box").css("left", x+"px");
	$("#box").css("top", y+"px");
    }



    function typeText() {
	var id = $("#" + formattedLog[current].id);
	var e = jQuery.Event("keyup");
	var typed = String(formattedLog[current].text);
	var length = typed.length;
	if ((/\\-\d/).test(typed)) {
	    length = typed.match(/(\d)$/);
	    for (var i = 0; i < length[1]; i++) {
		var previousText = id.text().substring(0, id.text().length - 1);
		id.text(previousText);
		id.val(previousText);
	    }
	} else {
	    for (var i = 0; i < length; i++) {
		var previousText = id.text();
		id.text(previousText + typed.charAt(i));
		id.val(previousText + typed.charAt(i));
	    }
	}
    }

    function moveMouse() {
	var x = formattedLog[current]['x'] + "px";
	var y = formattedLog[current]['y'] + "px";
	box.style.left = x;
	box.style.top = y;
    }

    function clickById() {
	var id = "#" + formattedLog[current].id;
	$(id).focus();
	$(id).trigger("click");
    }
    
    function getFirstMouseCoordinates() {
	for(var i = 1; i < formattedLog.length; i++){
	    if (formattedLog[i].type == 'mc') {
		return{
		    x:formattedLog[i].x,
		    y:formattedLog[i].y
		}
	    }
	}
	return {x:0,y:0};
    }

    function resetCurrent() {
	timer = null;
	delay = 500;
	current = 1;
    }
    
    function pause() {
	pauseMarker = current;
	isPaused = true;
	clearInterval(timer);
    }
    

    function instuction(type, delay, id, text, x, y) {
	this.type = type;
	this.delay = delay;
	this.id = id;
	this.text = text;
	this.x = x;
	this.y = y;
    }