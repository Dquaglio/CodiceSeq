package com.sirius.sequenziatore.server.model;

import java.util.List;

public class DataSent implements ITransferObject
{
	//Fields
	private String userName;
	private int stepId;
	private List<IDataValue> data;
	
	public DataSent(){}
	//Getter & Setter
	public String getUserName() {
		return userName;
	}
	public void setUser(String userName) {
		this.userName = userName;
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
