package com.sirius.sequenziatore.server.model;

public class NumericValue implements IDataValue
{
	//Fields
	private double value;
	private DataTypes type;
	
	//Constructor
	public NumericValue()	{
		this.type=DataTypes.NUMERIC;
	}
	
	//Getter & Setter
	public DataTypes getType()	{
		return type;
	}
	public void setType(DataTypes type)	{
		this.type=type;
	}
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
}
