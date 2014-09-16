package com.sirius.sequenziatore.server.model;

import java.util.Date;
import java.util.List;

public class DataSent implements ITransferObject
{
	//Fields
	private String username;
	private int stepId;
	private Date sentTime;
	private List<IDataValue> values;
	
	//Getter & Setter
	public String getUsername() {
		return username;
	}
	public void setUser(String username) {
		this.username = username;
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
	public Date getSentTime() {
		return sentTime;
	}
	public void setSentTime(Date sentTime) {
		this.sentTime = sentTime;
	}
}
