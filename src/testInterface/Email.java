package testInterface;

import java.util.Arrays;
import java.util.Date;

public class Email {
	private Contact sender;
	private Contact[] receivers;
	private Date dateSent;
	private String content;
	private String subject;
	public Email(Contact sender, Contact[] receivers, Date dateSent,
			String subject, String content) {
		super();
		this.sender = sender;
		this.receivers = receivers;
		this.dateSent = dateSent;
		this.content = content;
		this.subject = subject;
	}
	public Contact getSender() {
		return sender;
	}
	public Contact[] getReceivers() {
		return receivers;
	}
	public Date getDateSent() {
		return dateSent;
	}
	public String getContent() {
		return content;
	}
	public String getSubject() {
		return subject;
	}
	@Override
	public String toString() {
		return "{sender:" + sender + ", receivers:"
				+ Arrays.toString(receivers) + ", dateSent:" + dateSent
				+ ", content:" + content + ", subject:" + subject + "}";
	}
	
	
	
}
