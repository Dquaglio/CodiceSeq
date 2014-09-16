package com.sirius.sequenziatore.server.model;

public class UserStep implements ITransferObject
{
	//Enumeration Process States
	public enum StepStates{ONGOING, EXPECTANT, REJECTED, APPROVED};  
	
	//Other fields
	private int currentStepId;
	private String username;
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
	public String getUsername() {
		return username;
	}
	public void setUser(String username) {
		this.username = username;
	}
}