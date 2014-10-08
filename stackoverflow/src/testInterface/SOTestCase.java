package testInterface;

import java.util.Arrays;

public class SOTestCase {
	private SOQuestion[] questions;
	private String[] tags;
	private String instructions;
	
	public SOTestCase(SOQuestion[] questions, String[] tags, String instructions) {
		this.questions = questions;
		this.tags = tags;
		this.instructions = instructions;
	}
	public SOQuestion[] getQuestions() {
		return questions;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	
	public String[] getTags() {
		return tags;
	}
	
	public void setTags(String[] tags) {
		this.tags = tags;
	}
	
	@Override
	public String toString() {
		return "TestCase [questions=" + Arrays.toString(questions) + ", tagSet=" + Arrays.toString(tags) + ", instructions=" + instructions + "]";
	}
		
}
