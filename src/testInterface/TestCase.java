package testInterface;

import java.util.Arrays;

public class TestCase {
	private Email[] inbox;
	private Contact[] contacts;
	private PredictionGroup predictionGroup;
	private String instructions;
	public TestCase(Email[] inbox, Contact[] contacts,
			PredictionGroup predictionGroup, String instructions) {
		super();
		this.inbox = inbox;
		this.contacts = contacts;
		this.predictionGroup = predictionGroup;
		this.instructions = instructions;
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
	public String getInstructions() {
		return instructions;
	}
	@Override
	public String toString() {
		return "TestCase [inbox=" + Arrays.toString(inbox) + ", contacts="
				+ Arrays.toString(contacts) + ", predictionGroup="
				+ predictionGroup + ", instructions=" + instructions + "]";
	}
	
	
	
}
