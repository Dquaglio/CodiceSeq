package com.sirius.sequenziatore.server.model;

import java.util.List;

public class Block implements ITransferObject
{
	//Enumeration Block Types
	public enum BlockTypes{SEQUENTIAL, UNORDERED};
	
	//Other fields
	private int id;
	private BlockTypes type;
	private int requiredSteps;
	private boolean first;
	private int nextBlockId;
	private List<Step> steps;
	
	//Getter & Setter
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public BlockTypes getType() {
		return type;
	}
	public void setType(BlockTypes type) {
		this.type = type;
	}
	public int getRequiredSteps() {
		return requiredSteps;
	}
	public void setRequiredSteps(int requiredSteps) {
		this.requiredSteps = requiredSteps;
	}
	public int getNextBlockId() {
		return nextBlockId;
	}
	public void setNextBlockId(int nextBlockId) {
		this.nextBlockId = nextBlockId;
	}
	public List<Step> getSteps() {
		return steps;
	}
	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}
	public boolean isFirst() {
		return first;
	}
	public void setFirst(boolean first) {
		this.first = first;
	}
}
