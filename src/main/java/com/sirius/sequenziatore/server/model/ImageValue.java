package com.sirius.sequenziatore.server.model;

public class ImageValue implements IDataValue 
{
	//Fields
	private int id;
	private String imageUrl;
	
	//Getter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
