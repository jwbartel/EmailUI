    var delay = 500;
    var input = "";
    var formattedLog = [];
    var timer;
    var current = 1;
    var isPaused = false;
    var description = "Replaying Log";
    var isFirstMC = true;
    var fileName = "";
    var browserHeight = $(document).height(),
        browswerWidth = $(document).height();
    var standardHeight = 1286,
        standardWidth = 677;
    var usingAuto = false;
    var btnClicks = 0, keyStrokes = 0, mouseDistance = 0, time = 0;
    var first = true;
    var predictionIDs = ['group0', 'group1', 'nprasad@cs.unc.edu', 'cphamlet@cs.unc.edu', 'galagali@cs.unc.edu', 'siedleck@cs.unc.edu'];
    var navigationIDs = ['nav_new_message','nav_inbox','nav_sent','play','nav_contacts', 'nav_trash', 'nav_instructions', 'save_session', 'end_session'];

    $(document).ready(function() {
        $('#replayMenu').hide();
	$('#stats').hide();
	if (![].contains) {
            try {
                Object.defineProperty(Array.prototype, 'contains', {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: function(searchElement /*, fromIndex*/ ) {
                        if (this === undefined || this === null) {
                            throw new TypeError('Cannot convert this value to object');
                        }
                        var O = Object(this);
                        var len = parseInt(O.length) || 0;
                        if (len === 0) {
                            return false;
                        }
                        var n = parseInt(arguments[1]) || 0;
                        if (n >= len) {
                            return false;
                        }
                        var k;
                        if (n >= 0) {
                            k = n;
                        } else {
                            k = len + n;
                            if (k < 0) k = 0;
                        }
                        while (k < len) {
                            var currentElement = O[k];
                            if (searchElement === currentElement ||
                                searchElement !== searchElement && currentElement !== currentElement
                            ) {
                                return true;
                            }
                            k++;
                        }
                        return false;
                    }
                });
            } catch (e) {
                // IE 8 : catch "Object doesn't support this property or method" error
                Array.prototype.contains = function(searchElement /*, fromIndex*/ ) {
                    if (this === undefined || this === null) {
                        throw new TypeError('Cannot convert this value to object');
                    }
                    var O = Object(this);
                    var len = parseInt(O.length) || 0;
                    if (len === 0) {
                        return false;
                    }
                    var n = parseInt(arguments[1]) || 0;
                    if (n >= len) {
                        return false;
                    }
                    var k;
                    if (n >= 0) {
                        k = n;
                    } else {
                        k = len + n;
                        if (k < 0) k = 0;
                    }
                    while (k < len) {
                        var currentElement = O[k];
                        if (searchElement === currentElement ||
                            searchElement !== searchElement && currentElement !== currentElement
                        ) {
                            return true;
                        }
                        k++;
                    }
                    return false;
                }
            }
        }
    });
    
    function showReplay() {
        $('#replayMenu').fadeIn(300);
	$('#stats').fadeIn(300);
    }
    
    function hide(){
	$('#replayMenu').fadeOut(300);
	$('#stats').fadeOut(300);
    }

    function startReplay(){
        fileName = prompt('Enter the name of the file.');
	if (!fileName.match(/.txt$/)) {
	   fileName += '.txt';
	}
        loadData();
        var mouseCoord = getFirstMouseCoordinates(); // start coordiantes of the mouse pointer
        setUpCursor(mouseCoord.x, mouseCoord.y);
        executeTimer();
    }

    function setUpCursor(x, y) {
        $("body").append("<div id='box'></div>");
        $("#box").css("width", "20px");
        $("#box").css("height", "20px");
        $("#box").css("position", "absolute");
        $("#box").css("background-image", "url('play/cursor.png')");
        $("#box").css("background-size", "20px 20px");
        $("#box").css("z-index", "999");

    }

    function executeTimer() {
        if (!timer) {
            timer = setTimeout(function() {
                replay();
            }, delay);
        }
    }

    function replay() {
        if (current < formattedLog.length - 1) {
	    if (!isNaN(formattedLog[current].delay)) {
		  updateStat('time', formattedLog[current].delay);
	    }
            var type = formattedLog[current].type;
            if (type == "mc") {
                moveMouse();
            }
            if (type == "enter") {
                startHover();
            }
            if (type == "click") {
                clickById();
            }
            if (type == "change") {
                typeText();
            }
            if (type == "leave") {
                stopHover();
            }
            if (type == 'add') {
                add();
            }
            delay = formattedLog[current].delay;
            current++;
            setTimeout(function() {
                replay();
            }, delay);
        } else {
            setTimeout(function() {
                $("#box").hide();
                $("*").css("cursor", "default");
                alert("End of Replay");
            }, 1000);
            return;
        }
    }

    function loadData() {

        var file = "play/" + fileName;

        jQuery.get(file, function(data) {
            var oReq = new XMLHttpRequest();
            oReq.open("GET", file, true);
            oReq.onload = function(e) {
                data = oReq.responseText;
                var lines = splitLines(data);
                formattedLog = toArray(lines);
            };
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
        }
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
                parsedText = addPerson(currentline);
                break;
            case "Suggested":
                break;
            case "Changed":
                parsedText = typing(before, currentline, next);
                break;
            case "Mouse":
                parsedText = mouseMovement(currentline);
                break;
            case "Ended":
                break;
            case 'Contacts':
                addtoAutoComplete(currentline);
                break;
            default:
                break;
        }

        parsedText.delay = (time2 - parsedText.delay) * 500;
	
	if (!isNaN(parsedText) && !first) {
	    time = parsedText.delay;
	    first = false;
	}

        return parsedText;

    }

    function startHover() {
//alert($("[id*='" + formattedLog[current].id + "']").attr('class'));
        if (predictionIDs.contains(formattedLog[current].id)) {
	    console.log("#"+formattedLog[current].id);
	     $("[id*='" + formattedLog[current].id + "']").css('color','#F0AD4E');
	} else if (navigationIDs.contains(formattedLog[current].id)) {
	     $("[id*='" + formattedLog[current].id + "']").css('background-color','#D3D3D3');
	} else if ($("[id*='" + formattedLog[current].id + "']").attr('class').indexOf('email') > -1) {
	     $("[id*='" + formattedLog[current].id + "']").css('background-color','#CEE7FF');
	}

    }

    function stopHover() {
         if (predictionIDs.contains(formattedLog[current].id)) {
	     console.log("#"+formattedLog[current].id);
	     $("[id*='" + formattedLog[current].id + "']").css('color','#428BCA');
	} else if (navigationIDs.contains(formattedLog[current].id)) {
	    $("[id*='" + formattedLog[current].id + "']").css('background-color','#FFF');
	} else if ($("[id*='" + formattedLog[current].id + "']").attr('class').indexOf('email') > -1) {
	     $("[id*='" + formattedLog[current].id + "']").css('background-color','#CADCE3');
	}
    }


    function add() {

        console.log('Current Person: ' + formattedLog[current].text);

            $('#' + formattedLog[current].id).text("");
            $('#' + formattedLog[current].id).val("");
            $('.ui-corner-all').each(function(index) {
                console.log($(this).text());
		
                if ($(this).text().contains(formattedLog[current].text)) {

                    var id = $(this).attr('id');
		    $('#'+id).css('background-color', '#ffff7f');
                    $('#' + id).trigger("click");
		    $('#'+id).css('background-color', '#333333');
                    
                }
            });


    }

    function addPerson(line) {

        var re = /(\w*.)(\w+.\w+)(.\w*.)(\w+)(;\w*:.)(\d*.\d*)/;
        var result = line.match(re);

        //(type, delay, id, text, x, y)

        //alert(esult[6] + " " + result[4] + " " +  result[2] );
        return new instuction('add', result[6], result[4], result[6], result[2], null, null);
    }

    function addtoAutoComplete(line) {
        var contacts = line.substring(10, line.length);
        contacts = contacts.split(';');
        contacts.pop();
        $("#to_field").autocomplete(contacts);


    }

    function enterArea(line) {
	console.log(line);
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
	console.log(result);
        var hover = null;


        //(type, delay, id, text, x, y)
        return new instuction('enter', result[5], result[2], result[4], null, null, null);
    }

    function clickArea(line) {
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
	console.log(result);
        //(type, delay, id, text, x, y)




        return new instuction('click', result[5], result[2], result[4], null, null, null);
    }

    function leaveArea(line) {
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
	console.log(result);
        //(type, delay, id, text, x, y)
        var hover = null;

        return new instuction('leave', result[5], result[2], result[5], null, null, null);

    }

    function typing(before, line, next) {
        var re = /(\w*)\s\w*(.{4})(\w*)(.{4})(.*(?=;))(.\w*.\s)(\d*.\d*)/;
        var result = line.match(re);
	console.log(result);
        var text = "";
        var firstChange = false,
            lastChange = false;
	 //   console.log("** " +before + " " + line);
        // console.log("***" + result[4] + " " + String(before.match(re)[4]));
        if (String(before.match(/^\w+/)) != "Changed") {
            firstChange = true;
        } else if (result[3] != String(before.match(re)[3])) {
	     firstChange = true;
        
	}

        if (String(next.match(/^\w+/)) != "Changed") {
            lastChange = true;
        }

        if (String(next.match(/^\w+/)) != "Changed") {
            lastChange = true;
        }
	
        if ((firstChange && lastChange)) {
            text = result[5];

        } else {
            var characters;
            if (firstChange && !lastChange) {
                characters = next.match(re);
                if (characters[3] == result[3]) {
                    text = getCharFragments(result[5], characters[5], true, false);
                }

            } else if (!lastChange && !firstChange) {
                characters = next.match(re);
                if (characters[3] == result[3]) {
                    text = getCharFragments(result[5], characters[5], false, false);
                }

            } else if (lastChange && !firstChange) {
                characters = before.match(re);
                if (characters[3] != null && characters[3] == result[3]) {
                    text = getCharFragments(characters[5], result[5], false, true);
                }
            }
        }
        //(type, delay, id, text, x, y)
        return new instuction('change', result[7], result[3], result[8], text, null, null);
    }

    function getCharFragments(currentLine, next, isFirst, isLast) {
        var charsTyped = "";

        console.log("here: " + currentLine + " " + next + " " + isFirst);

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

        } else if (currentLine.length > next.length && !isLast) {
            charsTyped = "\\-" + (currentLine.length - next.length); // '\\-#' indicates backspace
        }

        return charsTyped;
    }

    function mouseMovement(line) {
        var re = /(^Mouse Coordinates\s)(\d*)\s(\d*)(.\s\w*.\s)(\d*.\d*)/;
        var result = line.match(re);
	console.log(result);

        if (isFirstMC) {
            setXY(result[2], result[3]);
            isFirstMC = false;
        }
        //(type, delay, id, text, x, y)
        return new instuction('mc', result[5], null, result[6], null, result[2], result[3]);
    }

    function setXY(x, y) {
        $("#box").css("left", x + "px");
        $("#box").css("top", y + "px");
    }



    function typeText() {

      $('#'+formattedLog[current].id).focus();

        var id = "#" + formattedLog[current].id;
        var e = jQuery.Event("keyup");

        var typed = String(formattedLog[current].text);
        var length = typed.length;
        var previousText;
        if ((/\\-\d/).test(typed)) {
            length = typed.match(/(\d)$/);
            for (var i = 0; i < length[1]; i++) {
                previousText = $(id).text().substring(0, $(id).text().length - 1);
                $(id).text(previousText);
                $(id).val(previousText);
		updateStat('key');
            }
        } else {
	    if ($(id).text() == typed) {
		return;
	    }
            for (var i = 0; i < length; i++) {
                previousText = $(id).text();
                $(id).text(previousText + typed.charAt(i));
                if (id == '#to_field') {
                    $("#to_field").autocomplete('search', previousText+typed.charAt(i));
                    usingAuto = true;

                }
		updateStat('key');
                console.log(previousText);
                $(id).val(previousText + typed.charAt(i));
            }
        }
    }

    function moveMouse() {
        var x = formattedLog[current].x + "px";
        var y = formattedLog[current].y + "px";
        box.style.left = x;
        box.style.top = y;
    }

    function clickById() {
        var id = '#' + formattedLog[current].id;
        $("[id*='" + formattedLog[current].id + "']").focus();
        $("[id*='" + formattedLog[current].id + "']").trigger("click");
	updateStat('click');
    }

    function getFirstMouseCoordinates() {
        for (var i = 1; i < formattedLog.length; i++) {
            if (formattedLog[i].type == 'mc') {
                return {
                    x: formattedLog[i].x,
                    y: formattedLog[i].y
                };
            }
        }
        return {
            x: 0,
            y: 0
        };
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


    function instuction(type, delay, id, timeStamp, text, x, y) {
        this.type = type;
        this.delay = delay;
        this.id = id;
        this.timeStamp = timeStamp;
        this.text = text;
        this.x = x;
        this.y = y;
    }

    function addContact() {

    }

    function stop() {
	//if (isPaused) {
	//    executeTimer();
	//    isPaused = false;
	//} else{
	//     clearInterval(timer);
	//     isPaused = true;
	//}
	
	
    }
    
    function restart(){
		
		$("#nav_inbox").trigger('click');
		$('.preview').show();
		$('#email_expanded_col').attr('class', 'col-md-10');
		$('#email_list').attr('class','col-md-10');
		$('#new_message_editor').hide();
		resetCurrent();
    }
    
    function updateStat(type, data){
	 switch (type) {
            case "time":
		data = data/1000;
		time = time + parseFloat(data);
		$("#time").html(time.toFixed(2));
                break;
	    case 'click':
		btnClicks++;
		$("#btn_clicks").html(String(btnClicks));
		break;
	    case 'key':
		keyStrokes++;
		$("#key_stokes").html(String(keyStrokes));
	    case 'distance':
		break;
	 }
    }
    
$(document).on('keydown', function(e) {
    
console.log(e.createEventObject);
    
}, true);