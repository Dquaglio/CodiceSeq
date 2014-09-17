package com.sirius.sequenziatore.server.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DataSent implements ITransferObject
{
	//Fields
	private String username;
	private int stepId;
	private Date sentTime;
	private List<IDataValue> values = new ArrayList<IDataValue>();
	
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
	public void setNumericValues(List<NumericValue> numericValues) {
		for( int i=0; i<numericValues.size(); i++ )
			this.values.add( numericValues.get(i) );
	}
	public void setImageValues(List<ImageValue> imageValues) {
		for( int i=0; i<imageValues.size(); i++ )
			this.values.add( imageValues.get(i) );
	}
	public void setTextualValues(List<TextualValue> textualValues) {
		for( int i=0; i<textualValues.size(); i++ )
			this.values.add( textualValues.get(i) );
	}
	public void setGeographicValues(List<GeographicValue> geographicValues) {
		for( int i=0; i<geographicValues.size(); i++ )
			this.values.add( geographicValues.get(i) );
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
