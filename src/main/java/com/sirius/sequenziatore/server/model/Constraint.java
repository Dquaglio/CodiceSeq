package com.sirius.sequenziatore.server.model; 

public abstract class Constraint 
{
	//Fields
	private Data associatedData;
	
	//Getter & Setter
	public Data getAssociatedData() {
		return associatedData;
	}
	public void setAssociatedData(Data associatedData) {
		this.associatedData = associatedData;
	}
}
