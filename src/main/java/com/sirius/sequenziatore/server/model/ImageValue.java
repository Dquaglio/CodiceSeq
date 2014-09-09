package com.sirius.sequenziatore.server.model;

public class ImageValue implements IDataValue 
{
	//Fields
	private String imageUrl;
	private DataTypes type;
	private int dataId;
	
	//Constructor
	public ImageValue()	{
		this.type=DataTypes.IMAGE;
	}
	
	//Getter & Setter
	public DataTypes getType()	{
		return type;
	}
	public void setType(DataTypes type)	{
		this.type=type;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
}
