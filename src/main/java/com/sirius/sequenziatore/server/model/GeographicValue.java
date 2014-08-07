package com.sirius.sequenziatore.server.model;

public class GeographicValue implements IDataValue
{
	//Fields
	private double latitude;
	private double longitude;
	private double altitude;
	private DataTypes type;
	
	//Constructor
	public GeographicValue()	{
		this.type=DataTypes.GEOGRAPHIC;
	}
	
	//Getter & Setter
	public DataTypes getType()	{
		return type;
	}
	public void setType(DataTypes type)	{
		this.type=type;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getAltitude() {
		return altitude;
	}
	public void setAltitude(double altitude) {
		this.altitude = altitude;
	}
}
