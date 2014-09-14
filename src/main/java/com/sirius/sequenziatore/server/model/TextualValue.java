package com.sirius.sequenziatore.server.model;

public class TextualValue implements IDataValue
{
	//Fields
	private String value;
	private DataTypes type;
	private int dataId;
	
	//Constructor
	public TextualValue()	{
		this.type=DataTypes.TEXTUAL;
	}
	
	//Getter & Setter
	public DataTypes getType()	{
		return type;
	}
	public void setType(DataTypes type)	{
		this.type=type;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
}
