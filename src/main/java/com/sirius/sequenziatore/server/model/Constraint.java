package com.sirius.sequenziatore.server.model; 

public abstract class Constraint 
{
	//Fields
	private int associatedDataId;
	
	//Getter & Setter
	public int getAssociatedData() {
		return associatedDataId;
	}
	public void setAssociatedData(int associatedDataId) {
		this.associatedDataId = associatedDataId;
	}
}
