package com.sirius.sequenziatore.server.model;

import java.util.Date;

public class TemporalConstraint extends Constraint 
{
	//Fields
	private int id;
	private Date begin;
	private Date end;
		
	//Getter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getBegin() {
		return begin;
	}
	public void setBegin(Date begin) {
		this.begin = begin;
	}
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
	}
}