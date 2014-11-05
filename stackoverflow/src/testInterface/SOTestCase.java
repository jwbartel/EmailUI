package testInterface;

import java.util.Arrays;

public class SOTestCase {
	private SOQuestion[] questions;
	private String[] tags;
	private String instructions;
	private int[] tagTimes;
	private String algorithm;
	
	public SOTestCase(SOQuestion[] questions, String[] tags, int[] tagTimes, String instructions, String algorithm) {
		this.questions = questions;
		this.tags = tags;
		this.instructions = instructions;
		this.tagTimes = tagTimes;
		this.algorithm = algorithm;
	}
	
	public int[] getTagTimes() {
		return tagTimes;
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
