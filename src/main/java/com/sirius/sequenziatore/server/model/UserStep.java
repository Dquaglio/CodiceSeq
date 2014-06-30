package com.sirius.sequenziatore.server.model;

public class UserStep implements ITransferObject
{
	//Enumeration Process States
	public enum stepStates{ONGOING, EXPECTANT, REJECTED, APPROVED};  
	
	//Other fields
	private int currentStepId;
	private String userName;
	private stepStates state;
	
	//Getter & Setter
	public int getCurrentStepId() {
		return currentStepId;
	}
	public void setCurrentStepId(int currentStepId) {
		this.currentStepId = currentStepId;
	}
	public stepStates getState() {
		return state;
	}
	public void setState(stepStates state) {
		this.state = state;
	}
	public String getUserName() {
		return userName;
	}
	public void setUser(String userName) {
		this.userName = userName;
	}
}
