package com.sirius.sequenziatore.server.model;

public class NumericConstraint extends Constraint
{
	//Fields
	private int id;
	private int minDigits;
	private int maxDigits;
	private boolean decimal;
	private double minValue;
	private double maxValue;
	
	//Geter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMinDigits() {
		return minDigits;
	}
	public void setMinDigits(int minDigits) {
		this.minDigits = minDigits;
	}
	public int getMaxDigits() {
		return maxDigits;
	}
	public void setMaxDigits(int maxDigits) {
		this.maxDigits = maxDigits;
	}
	public boolean isDecimal() {
		return decimal;
	}
	public void setDecimal(boolean decimal) {
		this.decimal = decimal;
	}
	public double getMinValue() {
		return minValue;
	}
	public void setMinValue(double minValue) {
		this.minValue = minValue;
	}
	public double getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(double maxValue) {
		this.maxValue = maxValue;
	}
}
