package com.sirius.sequenziatore.server.model;

public class GeographicConstraint extends Constraint
{
	//Minimun Radius
	private final static double MIN_RADIUS=50;
	
	//Other fields
	private int id;
	private double latitude;
	private double longitude;
	private double altitude;
	private double radius;
	
	//Getter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public double getRadius() {
		return radius;
	}
	public void setRadius(double radius) 
	{
		if(radius<MIN_RADIUS)
		{
			this.radius = MIN_RADIUS;
		}
		else
		{
			this.radius = radius;
		}
	}
}
