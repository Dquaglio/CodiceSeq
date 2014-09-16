package com.sirius.sequenziatore.server.model;

public class NumericData 
{
	//Fields
	private String description;
	private double maxValue;
	private double minValue;
	private boolean decimal;
	private int dataId;
	
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
	//Getter & Setter
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(double maxValue) {
		this.maxValue = maxValue;
	}
	public double getMinValue() {
		return minValue;
	}
	public void setMinValue(double minValue) {
		this.minValue = minValue;
	}
	public boolean isDecimal() {
		return decimal;
	}
	public void setDecimal(boolean decimal) {
		this.decimal = decimal;
	}
}
