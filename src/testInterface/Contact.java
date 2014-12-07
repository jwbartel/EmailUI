package testInterface;

public class Contact {
	private String name;
	private String emailAddress;
	
	public Contact(String name, String email) {
		this.name = name;
		this.emailAddress = email;
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmailAddress() {
		return emailAddress;	
	}
	
	public String toString() {
		return "{name:"+ name + "," + "emailAddress:"+emailAddress+"}";
	}
}
