package com.sirius.sequenziatore.server.model;

import java.util.List;

public class Condition
{
	//Fields
	private int id;
	private int nextStepId;
	private boolean requiresApproval;
	private List<Constraint> constraints;
	private boolean optional;
	
	//Getter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isRequiresApproval() {
		return requiresApproval;
	}
	public void setRequiresApproval(boolean requiresApproval) {
		this.requiresApproval = requiresApproval;
	}
	public List<Constraint> getConstraints() {
		return constraints;
	}
	public void setConstraints(List<Constraint> constraints) {
		this.constraints = constraints;
	}
	public boolean isOptional() {
		return optional;
	}
	public void setOptional(boolean optional) {
		this.optional = optional;
	}
	public int getNextStepId() {
		return nextStepId;
	}
	public void setNextStepId(int nextStepId) {
		this.nextStepId = nextStepId;
	}
}
