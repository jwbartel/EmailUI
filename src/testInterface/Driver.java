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
			
			prop.setProperty("jsonConfig", json);
			prop.setProperty("interface", "flat");
			
			String instructions = "For this first test, email your friends that have made it" +
								  " into the NBA playoffs and wish them good luck! Make sure you message all " +
								  " of them, but careful about including someone who did not make it to the postseason";
			
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
			String json = prop.getProperty("jsonConfig");
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
		
		PredictionGroup group = new PredictionGroup(c, null); //flat list
		
		Email[] inbox = new Email[1];
		Contact sender = new Contact("Eli Encarnacion","eliezer@gmail.com");
		Date dateSent = new Date();
		String subject = "Wanna play basketball today?";
		String content = "Hey guys,\n Just wanted to see if any of you were up " +
						"for a pickup game today. Let me know if you're available\n";
		
		inbox[0] = new Email(sender, c, dateSent, subject, content);
 							 
		TestCase t = new TestCase(inbox,c,group);
		
		return t;
		
							 
	}

}
