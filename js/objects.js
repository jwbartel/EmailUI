
var StringBuilder = function (value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value)
    {
        this.strings.push(value);
    }

}
// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}
// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

var Contact = function(json) {
    this.name = json.name;
    this.emailAddress = json.emailAddress;

    Contact.all[this.name] = this;
}

Contact.all = {}; 

/* Global index value assigned to every prediction group so it can
 * be easily indexed out of the 'all' array */
//var colors = new Array();

var index = 0;
var colors = new Array("#4D4D4D","#9933FF","#FF0000", "#00CC66", "#CC9900");
var PredictionGroup = function(json) {
    this.contacts = json.contacts;
    this.subgroups = json.subgroups;
    var deleted = false; //a flag used to do lazy deletion
    this.index = index;

    this.addContact = function(contact) {
        this.contacts.push(contact);
    }

    this.addSubgroup = function(group) {
        this.subgroups.push(group);
    }

    this.deleteContact = function(index) {
        this.contacts[index].deleted = true;
    }

    this.buildFlatInterface = function() {
        var sb = new StringBuilder();
        for (var i = 0; i < this.subgroups.length; i++) {
            var sg = new PredictionGroup(this.subgroups[i]);
			var sgstr = sg.buildFlatInterface();
			sb.append(sgstr);
        }
        
        for (var i = 0; i < this.contacts.length; i++) {
            var c = this.contacts[i];
            sb.append('<a href="#" class="prediction tracked click" id="'+c.emailAddress+'">'+c.name+'</a>&nbsp');
        }

        return sb.toString();
    }

    this.buildHierarchicalInterface = function(recur) {
        var sb = new StringBuilder();
		var parencolor = colors[this.index];
        //Each parenthesis will have a class name group<id> for easy selection on jQuery
        sb.append('<a href="#" class="prediction_group tracked click group'+this.index+'" id="group'+this.index+'" data-group_id="'+this.index+'" style="color:'+parencolor+';font-weight:bold"> [ </a>');
        
        for (var i = 0; i < this.subgroups.length; i++) {
			var sg = new PredictionGroup(this.subgroups[i]);
            //sb.append(this.subgroups[i].buildHierarchicalInterface());
			var sgstr = sg.buildHierarchicalInterface(this.index);
			sb.append(sgstr);
        }

        for (var j = 0; j < this.contacts.length; j++) {
            var c = this.contacts[j];
			sb.append('<a href="#" id="'+c.emailAddress+'"');
//			if(recur==-1){
//				sb.append('data-group_id="0"');
//				}
//			else if(recur==0){
//				sb.append('data-group_id="0 '+this.index+'"');
//				}
//			else{
//				sb.append('data-group_id="0 '+recur+' '+this.index+'"');
//				}
			if(recur==-1){
				sb.append('class="prediction tracked click 0"');
			}
			else if(recur == 0){
				sb.append('class="prediction tracked click 0 '+this.index+'"');
			}
			else{
				sb.append('class="prediction tracked click 0 '+this.index+' '+recur+'"');
			}	
			sb.append('class="prediction tracked click" >'+c.name+'</a>&nbsp');
        }

       sb.append('<a href="#" class="prediction_group tracked click group'+this.index+'" id="group'+this.index+'" data-group_id="'+this.index+'" style="color:'+parencolor+';font-weight:bold"> ] </a>');
        return sb.toString();
    }

	this.buildTimeInterface = function() {
		var sb = new StringBuilder();
        for (var i = 0; i < this.subgroups.length; i++) {
            var sg = new PredictionGroup(this.subgroups[i]);
			var sgstr = sg.buildTimeInterface();
			sb.append(sgstr);
        }
        
        for (var i = 0; i < this.contacts.length; i++) {
            var c = this.contacts[i];
            var split = c.time.split(" ");
            // time is split into two parts, value of time and the unit of time. split[1] is the days, minutes hours, ect.
            if(split[1]=="Days" || split[1]=="days" || split[1] =="mo" || split[1] == "day" || split[1] == "Day"){
                sb.append('<a href="#" class=" kak prediction tracked click" id="'+c.emailAddress+'">' + c.name  +'<span class="longResponse">'+ " [" + c.time + "]" + " " +'</span>');
            }else{
                sb.append('<a href="#" class="yay prediction tracked click" id="'+c.emailAddress+'">' + c.name  +'<span class="fastResponse">'+ " [" + c.time + "]" +" " +'</span>');
		   }
		}
        return sb.toString();
	}
	
	this.buildHierachTimeInterface = function(recur)  {
		var sb = new StringBuilder();
		var parencolor = colors[this.index];
        //Each parenthesis will have a class name group<id> for easy selection on jQuery
        sb.append('<a href="#" class=" LOLO prediction_group tracked click group'+this.index+'" data-group_id="'+this.index+'" style="color:'+parencolor+';font-weight:bold"> [ </a>');
        for (var i = 0; i < this.subgroups.length; i++) {
            var sg = new PredictionGroup(this.subgroups[i]);
			var sgstr = sg.buildHierachTimeInterface();
			sb.append(sgstr);
        }
		 for (var i = 0; i < this.contacts.length; i++) {
            var c = this.contacts[i];
            var split = c.time.split(" ");
			sb.append('<a href="#" id="'+c.emailAddress+'"');
			if(recur==-1){
				sb.append('class="prediction tracked click 0">');
			}
			else if(recur == 0){
				sb.append('class="prediction tracked click 0 '+this.index+'">');
			}
			else{
				sb.append('class="prediction tracked click 0 '+this.index+' '+recur+'">');
				}
            // time is split into two parts, value of time and the unit of time. split[1] is the days, minutes hours, ect.
            if(split[1]=="Days" || split[1]=="days" || split[1] =="mo" || split[1] == "day" || split[1] == "Day"){
                sb.append('' + c.name  +'<span class="longResponse">'+ " [" + c.time + "]" + " " +'</span>');
            }else{
                sb.append('' + c.name  +'<span class="fastResponse">'+ " [" + c.time + "]" +" " +'</span>');
		   }
		}
		sb.append('<a href="#" class="prediction_group tracked click group'+this.index+'" data-group_id="'+this.index+'" style="color:'+parencolor+';font-weight:bold">] </a>');
		
        return sb.toString();
	}

    PredictionGroup.all.push(this);
    index++;    
}
PredictionGroup.all = new Array();

var Email = function(json) {
	this.sender = json.sender;
    this.receivers = new Array();   
    
    for (var i = 0; i < json.receivers.length; i++) {
        this.receivers.push(Contact.all[json.receivers[i].emailAddress]);
    }
    
	this.date = new Date(json.dateSent);
	this.content = json.content;
	this.subject = json.subject;

	this.formattedDate = function() {
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    	return (monthNames[this.date.getMonth()] + " " + this.date.getDate());
	}

	Email.all.push(this);
}

Email.all = new Array();


Email.generate = function() {
    var contacts = [new Contact("Prasun Dewan","dewan@cs.unc.edu"), 
    			   new Contact("John Doe", "foo@bar.com"),
    			   new Contact("Alex Smith", "qb@chiefs.com"),
    			   new Contact("Peyton Manning", "omaha@broncos.com"),
    			   new Contact("LeBron James", "goat@heat.com"),
    			   new Contact("Alan Turing", "turing@cs.unc.edu"),
    			   new Contact("Daniel Bryan", "yes@wwe.com")]

    var subject_part1 = ["Write", "Consider", "Develop", "Assess", "Delete", "Read"];
    var subject_part2 = ["preliminary", "primary", "secondary", "penultimate", "backup", "final"];
    var subject_part3 = ["report", "proposal", "plan", "manual", "book", "article"];
    var subject_part4 = ["notes", "outline", "index", "table of contents", "references", "footnotes"];


    for(var i=0; i<10; i++) {
		var subject = subject_part1[Math.floor(6*Math.random())] + " " +
	            subject_part2[Math.floor(6*Math.random())] + " " +
	            subject_part3[Math.floor(6*Math.random())] + " " +
	            subject_part4[Math.floor(6*Math.random())];
		var sender = contacts[Math.floor(6*Math.random())];

		//Receivers
		var receivers = new Array();
		var loop_end = Math.floor(6*Math.random());
		for (var j = 0; j<= loop_end; j++) {
			receivers.push(contacts)
		}
	
		var content = "This is just bogus content for ther item \"" + subject + "\". The rest of this text is";
		content += " here just to make it a little longer. I thought about creating a ";
		content += "note generator, but then got tired.";

		var date = new Date();
		

		
		new Email(sender, receivers, date, subject, content);
	}

}



