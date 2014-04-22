package testInterface;

import java.util.Arrays;

public class TestCase {
	private Email[] inbox;
	private Contact[] contacts;
	private PredictionGroup predictionGroup;
	
	public TestCase(Email[] inbox, Contact[] contacts,
			PredictionGroup predictionGroup) {
		super();
		this.inbox = inbox;
		this.contacts = contacts;
		this.predictionGroup = predictionGroup;
	}
	public Email[] getInbox() {
		return inbox;
	}
	public Contact[] getContacts() {
		return contacts;
	}
	public PredictionGroup getPredictionGroup() {
		return predictionGroup;
	}
	@Override
	public String toString() {
		return "TestCase [inbox=" + Arrays.toString(inbox) + ", contacts="
				+ Arrays.toString(contacts) + ", predictionGroup="
				+ predictionGroup +  "]";
	}
	
	
	
}
