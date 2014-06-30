package com.sirius.sequenziatore.server.model;

public class NumericValue implements IDataValue
{
	//Fields
	private int id;
	private double value;
	private int dataId;
	
	//Getter & Setter
	
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
}
