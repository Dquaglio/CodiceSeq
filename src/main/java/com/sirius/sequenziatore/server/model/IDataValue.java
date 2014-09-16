package com.sirius.sequenziatore.server.model;

public interface IDataValue 
{
	public enum DataTypes{NUMERIC, TEXTUAL, IMAGE, GEOGRAPHIC};
	public DataTypes getType();
	public void setType(DataTypes type);
	public void setDataId(int dataId);
	public int getDataId();
}
