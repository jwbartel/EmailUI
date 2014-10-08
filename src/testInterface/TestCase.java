package testInterface;

import java.util.Arrays;

public class TestCase {
	private Email[] inbox;
	private Email[] sent;
	private Contact[] contacts;
	private PredictionGroup predictionGroup;
	private String predictionInterface;
	private String instructions;
	private Contact[] correctSet;
	
	public void setPredictionGroup(PredictionGroup predictionGroup) {
		this.predictionGroup = predictionGroup;
	}
	public TestCase(Email[] inbox, Email[] sent, Contact[] contacts,
			PredictionGroup predictionGroup, String predictionInterface, String instructions, Contact[] correctSet) {
		this.inbox = inbox;
		this.sent = sent;
		this.contacts = contacts;
		this.predictionGroup = predictionGroup;
		this.predictionInterface = predictionInterface;
		this.instructions = instructions;
		this.correctSet = correctSet;
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
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public PredictionGroup getPredictionGroup() {
		return predictionGroup;
	}
	
	public String getPredictionInterface() {
		return predictionInterface;
	}
	public void setPredictionInterface(String prediction_interface) {
		this.predictionInterface = prediction_interface;
	}
	
	public Contact[] getCorrectSet() {
		return correctSet;
	}
	public void setCorrectSet(Contact[] correctSet) {
		this.correctSet = correctSet;
	}
	@Override
	public String toString() {
		return "TestCase [inbox=" + Arrays.toString(inbox) + "sent=" + Arrays.toString(sent) + ", contacts="
				+ Arrays.toString(contacts) + ", predictionGroup="
				+ predictionGroup +  "]";
	}
		
}
