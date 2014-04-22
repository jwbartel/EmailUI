package testInterface;

import java.util.Arrays;

public class PredictionGroup {
	private Contact[] contacts;
	private PredictionGroup subgroups;
	
	public Contact[] getContacts() {
		return contacts;
	}

	public void setContacts(Contact[] contacts) {
		this.contacts = contacts;
	}

	public PredictionGroup getSubgroups() {
		return subgroups;
	}

	public void setSubgroups(PredictionGroup subgroups) {
		this.subgroups = subgroups;
	}

	public PredictionGroup(Contact[] contacts, PredictionGroup subgroups) {
		super();
		this.contacts = contacts;
		this.subgroups = subgroups;
	}

	@Override
	public String toString() {
		return "{contacts:" + Arrays.toString(contacts)
				+ ", subgroups:" + subgroups + "}";
	}
	
}
