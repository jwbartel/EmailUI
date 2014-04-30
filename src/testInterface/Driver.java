package testInterface;


import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.Properties;
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
	public static void write(String file) {
		
		Properties prop = new Properties();
		Gson gson = new Gson();
		OutputStream output = null;
		
		TestCase t1 = generateTest();
		
		try {
			
			output = new FileOutputStream(file);
			String json = gson.toJson(t1);			
			String instructions = "For this first test, email your friends that have made it" +
								  " into the NBA playoffs and wish them good luck! Make sure you message all " +
								  " of them, but careful about including someone who did not make it to the postseason";
			
			
			prop.setProperty("test_objects", json);
			prop.setProperty("interface", "flat");
			prop.setProperty("instructions"	, instructions);
			
			prop.store(output, null);

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
		
		try {
			
			input = new FileInputStream(file);
			prop.load(input);
			String json = prop.getProperty("test_objects");
			String instructions = prop.getProperty("instructions");
			String ui = prop.getProperty("interface");
			System.out.println(instructions + ";" + ui +";" + json);

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
	
	public static TestCase generateTest() {
		Contact[] c = new Contact[3];
		c[0] = new Contact("LeBron James", "goat@heat.com");
		c[1] = new Contact("Kevin Durant", "kd@ock.com");
		c[2] = new Contact("Carmelo Anthony", "melo@nyk.com");
		
		Contact[] self = {new Contact("Eliezer Encarnacion", "encarnae@live.unc.edu")};
		
		PredictionGroup group = new PredictionGroup(c, null); //flat list
		
		Email[] sentMessages = new Email[1];
		Email[] inbox = new Email[2];
		
		Date dateSent = new Date();
		String subject = "Wanna play basketball today?";
		String content = "Hey guys, Just wanted to see if any of you were up " +
						"for a pickup game today. Let me know if you're available";
		
		sentMessages[0] = new Email(self[0], c, dateSent, subject, content);
 		
		subject = "RE: Wanna play basketball today?";
 		content = "Eli, I'd love to but I have to get ready for the postseason!";
 		inbox[0] = new Email(c[0], self, dateSent, subject, content);
 		
 		content = "Hey man, I'll be flying to Memphis for the playoffs, sorry!";
 		inbox[1] = new Email(c[1], self, dateSent, subject, content);
		
		TestCase t = new TestCase(inbox, sentMessages, c,group);
		
		return t;
		
							 
	}

}
