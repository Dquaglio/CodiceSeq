package com.sirius.sequenziatore.server.model;

public class NumericValue implements IDataValue
{
	//Fields
	
	private double numericValue;
	
	//Getter & Setter
	
	public double getNumericValue() {
		return numericValue;
	}
	public void setNumericValue(double value) {
		this.numericValue = value;
	}
}
