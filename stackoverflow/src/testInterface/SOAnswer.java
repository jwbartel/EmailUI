package testInterface;

import java.util.Date;

public class SOAnswer {
	private String bodyText;
	private Contact poster;
	private int score;
	private Date date;
	
	public SOAnswer(String bodyText, Contact poster, int score, Date date) {
		this.bodyText = bodyText;
		this.poster = poster;
		this.score = score;
		this.date = date;
	}

	public String getBodyText() {
		return bodyText;
	}

	public Contact getPoster() {
		return poster;
	}

	public int getScore() {
		return score;
	}

	public Date getDate() {
		return date;
	}
	
	@Override
	public String toString() {
		return "{bodyText:"+ bodyText + ", poster:"+ poster +", score:" + score + ", date:" + date +"}";
	}
}
