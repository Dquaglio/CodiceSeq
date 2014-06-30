package com.sirius.sequenziatore.server.model;

import java.util.List;

public class DataSent implements ITransferObject
{
	//Fields
	private String username;
	private int stepId;
	private List<IDataValue> data;
	
	public DataSent(){}
	//Getter & Setter
	public String getUsername() {
		return username;
	}
	public void setUsername(String user) {
		this.username = user;
	}
	public List<IDataValue> getData() {
		return data;
	}
	public void setData(List<IDataValue> values) {
		this.data = values;
	}
	public int getStepId() {
		return stepId;
	}
	public void setStepId(int stepId) {
		this.stepId = stepId;
	}
}
