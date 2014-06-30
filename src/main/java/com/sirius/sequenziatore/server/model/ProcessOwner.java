package com.sirius.sequenziatore.server.model;

public class ProcessOwner
{
	private static ProcessOwner processOwner; //Instance (singleton)
	
	//Fields
	private String userName;
	private String password;
	
	//Private constructor (singleton)
	private ProcessOwner(){}
	
	//Get instance (singleton)
	public static ProcessOwner getInstance()
	{
		if(processOwner==null)
		{
			processOwner=new ProcessOwner();
		}
		return processOwner;
	}

	//Getter & Setter
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
