package testInterface;

import java.util.Arrays;

public class TestCase {
	private Email[] inbox;
	private Email[] sent;
	private Contact[] contacts;
	private PredictionGroup predictionGroup;
	
	public TestCase(Email[] inbox, Email[] sent, Contact[] contacts,
			PredictionGroup predictionGroup) {
		super();
		this.inbox = inbox;
		this.sent = sent;
		this.contacts = contacts;
		this.predictionGroup = predictionGroup;
	}
	public Email[] getInbox() {
		return inbox;
	}
	
	public Email[] getSent() {
		return sent;
	}
	public Contact[] getContacts() {
		return contacts;
	}
	public PredictionGroup getPredictionGroup() {
		return predictionGroup;
	}
	@Override
	public String toString() {
		return "TestCase [inbox=" + Arrays.toString(inbox) + "sent=" + Arrays.toString(sent) + ", contacts="
				+ Arrays.toString(contacts) + ", predictionGroup="
				+ predictionGroup +  "]";
	}
	
	
	
}
