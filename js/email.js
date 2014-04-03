
var StringBuilder = function (value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}


/* Global index value assigned to every prediction group so it can
 * be easily indexed out of the 'all' array */
var index = 0;

var PredictionGroup = function() {
    this.contacts = new Array();
    this.subgroups = new Array();
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
            sb.append(this.subgroups[i].buildFlatInterface());
        }

        for (var i = 0; i < this.contacts.length; i++) {
            var c = this.contacts[i];
            sb.append('<a href="#" class="prediction tracked click" id="'+c.email+'">'+c.name+'</a>&nbsp');
        }

        return sb.toString();
    }

    this.buildHierarchicalInterface = function() {
        var sb = new StringBuilder();
        //Each parenthesis will have a class name group<id> for easy selection on jQuery
        sb.append('<a href="#" class="prediction_group tracked click group'+this.index+'" data-group_id="'+this.index+'"> ( </a>');
        
        for (var i = 0; i < this.subgroups.length; i++) {
            sb.append(this.subgroups[i].buildHierarchicalInterface());
        }

        for (var j = 0; j < this.contacts.length; j++) {
            var c = this.contacts[j];
            sb.append('<span class="contact_wrapper">')
            sb.append('<a href="#"><span class="label label-info">');
            sb.append('<span class="prediction tracked click" id="'+c.email+'">'+c.name+'</span>');
            //sb.append('<button class="close deleteContact" type="button">×</button></span>&nbsp;');
            sb.append('<span class="glyphicon glyphicon-remove remove tracked click" data-group_id="'+this.index+'" data-contact_id="'+j+'"></span>');
            sb.append('</span></a>');
            sb.append('</span>&nbsp;');
        }

        sb.append('<a href="#" class="prediction_group tracked click group'+this.index+'" data-group_id="'+this.index+'"> ) </a>');
        return sb.toString();
    }

    PredictionGroup.all.push(this);
    index++;    
}
PredictionGroup.all = new Array();


var Contact = function(name, email) {
	this.name = name;
	this.email = email;

	Contact.all.push(this);
}

Contact.all = new Array();

var Email = function(sender, receivers, date, subject, content) {
	this.sender = sender;
	this.receivers = receivers;
	this.date = date;
	this.content = content;
	this.subject = subject;

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



