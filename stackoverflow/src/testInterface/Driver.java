package testInterface;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

import com.google.gson.Gson;

public class Driver {

	public static void main(String[] args) {
		if (args.length <= 0) {
			System.out.println("Not enough arguments");
			return;
		}
		
		String file = args[1];
		if (args[0].equals("write")) 
			write(file);
		
		else if (args[0].equals("read")) 
			read(file);	
	}
	public static void write(String folder) {
		
		Properties prop = new Properties();
		Gson gson = new Gson();
		OutputStream output = null;
		
		SOTestCase t1 = generateTest();
		
		try {
		
			output = new FileOutputStream(folder+"/test1");
			String json = gson.toJson(t1);			
			prop.setProperty("json", json);
			prop.store(output, null);
			
			/*output = new FileOutputStream(folder+"/test2");
			json = gson.toJson(t1);			
			prop.setProperty("json", json);
			prop.store(output, null);*/

		} catch (IOException e) {
			e.printStackTrace();
			
		} finally {
			if (output != null) {
				try {
					output.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}

	public static void read(String file) {
		
		Properties prop = new Properties();
		InputStream input = null;
		String testFolder;
		String[] testFiles;
		try {
			
			input = new FileInputStream(file);
			prop.load(input);
			String configTests = prop.getProperty("testFiles");
			testFolder = prop.getProperty("testFolder");
			testFiles = configTests.split(",");
			
			for (int i = 0; i < testFiles.length;i++) {
				try{
					input = new FileInputStream(testFolder+ "/" +testFiles[i]);
					prop.load(input);
					System.out.print(prop.getProperty("json"));
					System.out.print(";");
				}
				catch (IOException e) {
					e.printStackTrace();
				}
			}
			

		} catch (IOException e) {
			e.printStackTrace();
			
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	
	public static SOTestCase generateTest() {
		int numQuestions = 2;
		String[] tagSet = {"java",
						"php",
						"javascript",
						"perl",
						"ruby",
						"python-2",
						"python-3",
						"asp",
						"c",
						"c++",
						"css",
						"html",
						"assembly",
						"prolog",
						"SAS",
						"R",
						"OOP",
						"hadoop",
						"inheritance",
						"memory",
						"c#",
						"android",
						"jquery",
						"ios",
						"mysql",
						"objective-c",
						"iphone",
						".net",
						"ruby-on-rails",
						"ruby",
						"sql-server",
						"ajax",
						"xml",
						"bash"};
		
		int[] tagTimeSet = {1,
							1,
							3,
							3,
							2,
							2,
							4,
							5,
							4,
							2,
							1,
							18,
							100,
							34,
							56,
							29,
							23,
							53,
							18,
							99,
							12,
							5,
							9,
							10,
							84,
							35,
							201,
							88,
							29,
							46,
							64,
							92,
							13,
							43};

		Random r = new Random();
		
		Contact[] posters = new Contact[numQuestions];
		posters[0] = new Contact("James Gosling","james.gosling@java.com");
		posters[1] = new Contact("Bill Gates", "bill.gates@microsoft.com");
		
		String[] titles = {"I need help with making an array!",
							"Does anyone know about HashMaps?"};
		
		String[] bodyTexts = {"I don't know how to make an array in Java. Any ideas?",
								"I'm confused about what a HashMap is. Anybody care to explain this to me?"};
		
		String[][] tags = new String[numQuestions][];
		tags[0] = new String[2];
		tags[1] = new String[3];
		tags[0][0] = tagSet[r.nextInt(tagSet.length)];
		tags[0][1] = tagSet[r.nextInt(tagSet.length)];
		tags[1][0] = tagSet[r.nextInt(tagSet.length)];
		tags[1][1] = tagSet[r.nextInt(tagSet.length)];
		tags[1][2] = tagSet[r.nextInt(tagSet.length)];
		
		Contact[] responders = new Contact[5];
		responders[0] = new Contact("Tim Cook", "tim.cook@apple.com");
		responders[1] = new Contact("Linus Torvalds","linus.torvalds@linux.org");
		responders[2] = new Contact("Sergey Brin","sergey.brin@google.com");
		responders[3] = new Contact("Larry Page", "larry.page@google.com");
		responders[4] = new Contact("Mark Zuckerberg", "mark.zuckerberg@facebook.com");
		
		SOAnswer[][] answerSet = new SOAnswer[numQuestions][];
		answerSet[0] = new SOAnswer[3];
		answerSet[1] = new SOAnswer[1];
		answerSet[0][0] = new SOAnswer("Just add me as a friend and I'll give you the answer.", responders[4], 14, new Date(1072915260L + (long) (Math.random() * (new Date().getTime() - 1072915260L))));
		answerSet[0][1] = new SOAnswer("iMessage me at 555-123-456", responders[0], 20, new Date(1072915260L + (long) (Math.random() * (new Date().getTime() - 1072915260L))));
		answerSet[0][2] = new SOAnswer("Try running `man array`.", responders[1], 2, new Date(1072915260L + (long) (Math.random() * (new Date().getTime() - 1072915260L))));
		answerSet[1][0] = new SOAnswer("+1 me and then we'll talk.", responders[2], 23, new Date(1072915260L + (long) (Math.random() * (new Date().getTime() - 1072915260L))));
		
		
		
		SOQuestion[] questions = new SOQuestion[numQuestions];
		for(int i = 0; i < numQuestions; i++) {
			long generatedLong = 1072915260L + (long) (Math.random() * (new Date().getTime() - 1072915260L));
			questions[i] = new SOQuestion(posters[i], answerSet[i], new Date(generatedLong), titles[i], bodyTexts[i], tags[i], r.nextInt(50));
		}
		
		
		
		
		
		String instructions = "I don't know what I should put here so this is just place holder text.";
		SOTestCase testCase = new SOTestCase(questions, tagSet, tagTimeSet, instructions);
		
		return testCase;
		
							 
	}

}
