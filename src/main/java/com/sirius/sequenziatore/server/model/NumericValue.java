package com.sirius.sequenziatore.server.model;

public class NumericValue implements IDataValue
{
	//Fields
	private double value;
	private DataTypes type;
	private int dataId;
	
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
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
}
