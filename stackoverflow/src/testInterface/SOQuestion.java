package testInterface;

import java.util.Arrays;
import java.util.Date;

public class SOQuestion {
	private Contact poster;
	private SOAnswer[] answers;
	private Date date;
	private String bodyText;
	private String title;
	private String[] tags;
	public SOQuestion(Contact poster, SOAnswer[] answers, Date date, String title, String bodyText, String[] tags) {
		super();
		this.poster = poster;
		this.answers = answers;
		this.date = date;
		this.bodyText = bodyText;
		this.title = title;
		this.tags = tags;
	}
	public Contact getPoster() {
		return poster;
	}
	public SOAnswer[] getAnswers() {
		return answers;
	}
	public Date getDate() {
		return date;
	}
	public String getBodyText() {
		return bodyText;
	}
	public String getTitle() {
		return title;
	}
	public String[] getTags() {
		return tags;
	}
	@Override
	public String toString() {
		return "{poster:" + poster + ", answers:"
				+ Arrays.toString(answers) + ", date:" + date
				+ ", bodyText:" + bodyText + ", title:" + title + ", tags:" + Arrays.toString(tags) + "}";
	}
	
	
	
}
