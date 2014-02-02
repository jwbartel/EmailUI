var Contact = function(name, email) {
	this.name = name;
	this.email = email;
}

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


    for(var i=0; i<50; i++) {
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



