package com.sirius.sequenziatore.server.model;

public class UserStep implements ITransferObject
{
	//Enumeration Process States
	public enum StepStates{ONGOING, EXPECTANT, REJECTED, APPROVED};  
	
	//Other fields
	private int currentStepId;
	private String userName;
	private StepStates state;
	
	//Getter & Setter
	public int getCurrentStepId() {
		return currentStepId;
	}
	public void setCurrentStepId(int currentStepId) {
		this.currentStepId = currentStepId;
	}
	public StepStates getState() {
		return state;
	}
	public void setState(StepStates state) {
		this.state = state;
	}
	public String getUserName() {
		return userName;
	}
	public void setUser(String userName) {
		this.userName = userName;
	}
}