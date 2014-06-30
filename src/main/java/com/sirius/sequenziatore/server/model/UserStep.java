package com.sirius.sequenziatore.server.model;

public class UserStep implements ITransferObject
{
	//Enumeration Process States
	public enum stepStates{ONGOING, EXPECTANT, REJECTED, APPROVED};  
	
	//Other fields
	private int currentStepId;
	private String user;
	private stepStates state;
	private int completedSteps;
	
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
	public int getCompletedSteps() {
		return completedSteps;
	}
	public void setCompletedSteps(int completedSteps) {
		this.completedSteps = completedSteps;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
}
