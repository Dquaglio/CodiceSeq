package com.sirius.sequenziatore.server.model;

import java.util.List;

public class DataSent implements ITransferObject
{
	//Fields
	private String user;
	private int stepId;
	private List<IDataValue> values;
	
	//Getter & Setter
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public List<IDataValue> getValues() {
		return values;
	}
	public void setValues(List<IDataValue> values) {
		this.values = values;
	}
	public int getStepId() {
		return stepId;
	}
	public void setStepId(int stepId) {
		this.stepId = stepId;
	}
}
