    var delay = 500;
    var input = "";
    var formattedLog = [];
    var timer;
    var current = 1;
    var pauseMarker;
    var isPaused = false;
    var description = "Replaying Log";
    var isFirstMC = true;
    var fileName = "";
    var browserHeight = $(document).height(),
        browswerWidth = $(document).height();
    var standardHeight = 1286,
        standardWidth = 677;
    var usingAuto = false;


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

    function startReplay() {
        fileName = prompt('full name of file?');
        loadData();
        var mouseCoord = getFirstMouseCoordinates(); // start coordiantes of the mouse pointer
        alert("Press OK to Begin.");
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
                alert("Press OK to start replay.");
                break;
            case 'Contacts':
                addtoAutoComplete(currentline);
                break;
            default:
                break;
        }

        parsedText.delay = (time2 - parsedText.delay) * 1300;

        return parsedText;

    }

    function startHover() {
        //console.log("#"+formattedLog[current].id + " " + formattedLog[current].hover + ' added');
        //$("#"+formattedLog[current].id).toggle(formattedLog[current].hover, true);

    }

    function stopHover() {
        //console.log("#"+formattedLog[current].id + " " + formattedLog[current].hover + ' removed');
        //$("#"+formattedLog[current].id).toggle(formattedLog[current].hover, false);
    }


    function add() {

        console.log('Current Person: ' + formattedLog[current].text);

        if (usingAuto) {
            //code	

            $('#' + formattedLog[current].id).text("");
            $('#' + formattedLog[current].id).val("");
            $('.ui-corner-all').each(function(index) {
                console.log($(this).text());
                if ($(this).text() == formattedLog[current].text) {

                    var id = $(this).attr('id');
                    $('#' + id).trigger("click");

                    console.log(id);
                }
            });
        } else { // if(formattedLog[current].id.spilt(' ').length != 1)
            //	 $('.prediction').each(function(index) {
            //            console.log("Prediction Class: " + $(this).text());
            //            if ($(this).text() == formattedLog[current].text) {
            //
            //                $(this).trigger("click");
            //
            //               
            //            }
            //       });
        }

        usingAuto = false;

    }

    function addPerson(line) {

        var re = /(\w*.)(\w+.\w+)(.\w*.)(\w+)(;\w*:.)(\d*.\d*)/;
        var result = line.match(re);

        //(type, delay, id, text, x, y)

        //alert(esult[6] + " " + result[4] + " " +  result[2] );
        return new instuction('add', result[6], result[4], null, result[2], null, null);
    }

    function addtoAutoComplete(line) {
        var contacts = line.substring(10, line.length);

        contacts = contacts.split(';');
        contacts.pop();
        $("#to_field").autocomplete(contacts);


    }

    function enterArea(line) {
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
        var hover = null;


        //(type, delay, id, text, x, y)
        return new instuction('enter', result[5], result[2], hover, null, null, null);
    }

    function clickArea(line) {
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
        //(type, delay, id, text, x, y)




        return new instuction('click', result[5], result[2], null, null, null, null);
    }

    function leaveArea(line) {
        var re = /(\w*\s\w*\s)((.*(?=;)))(.\s\w*.\s)(\d+.\d+)/;
        var result = line.match(re);
        //(type, delay, id, text, x, y)
        var hover = null;

        return new instuction('leave', result[5], result[2], hover, null, null, null);

    }

    function typing(before, line, next) {
        var re = /(\w*)\s\w*(.{4})(\w*)(.{4})(.*(?=;))(.\w*.\s)(\d*.\d*)/;
        var result = line.match(re);
        var text = "";
        var firstChange = false,
            lastChange = false;

        if (String(before.match(/^\w+/)) != "Changed") {
           
            firstChange = true;
        }

        if (String(next.match(/^\w+/)) != "Changed") {
            lastChange = true;
        }

        if (String(next.match(/^\w+/)) != "Changed") {
            lastChange = true;
        }
        if (firstChange && lastChange) {
            text = result[5];

        } else {
            var characters;
            if (firstChange) {
                characters = next.match(re);
                if (characters[3] == result[3]) {
                    text = getCharFragments(result[5], characters[5], true, false);
                }

            } else if (!lastChange) {
                characters = next.match(re);
                if (characters[3] == result[3]) {
                    text = getCharFragments(result[5], characters[5], false, false);
                }

            } else if (lastChange) {
                characters = before.match(re);
                if (characters[3] != null && characters[3] == result[3]) {
                    text = getCharFragments(characters[5], result[5], false, true);
                }
            }
        }
        //(type, delay, id, text, x, y)
        return new instuction('change', result[7], result[3], null, text, null, null);
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

        } else if (currentLine.length > next.length && !lastChange) {
            charsTyped = "\\-" + (currentLine.length - next.length); // '\\-#' indicates backspace
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
        return new instuction('mc', result[5], null, null, null, result[2], result[3]);
    }

    function setXY(x, y) {
        $("#box").css("left", x + "px");
        $("#box").css("top", y + "px");
    }



    function typeText() {

     clickById(formattedLog[current].id);

        var id = "#" + formattedLog[current].id;
        var e = jQuery.Event("keyup");

        var typed = String(formattedLog[current].text);
        var length = typed.length;
        var previousText;
        if ((/\\-\d/).test(typed)) {
            length = typed.match(/(\d)$/);
            for (var i = 0; i < length[1]; i++) {
                previousText = $(id).text().substring(0, id.text().length - 1);
                $(id).text(previousText);
                $(id).val(previousText);
            }
        } else {
            for (var i = 0; i < length; i++) {
                previousText = $(id).text();
                $(id).text(previousText + typed.charAt(i));
                if (id == '#to_field') {
                    $("#to_field").autocomplete('search', previousText);
                    usingAuto = true;

                }
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


    function instuction(type, delay, id, hoverClass, text, x, y) {
        this.type = type;
        this.delay = delay;
        this.id = id;
        this.hoverClass = hoverClass;
        this.text = text;
        this.x = x;
        this.y = y;
    }

    function addContact() {

    }

    function stop() {
        clearInvterval(timer);
    }