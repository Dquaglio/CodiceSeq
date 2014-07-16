package com.sirius.sequenziatore.server.model;

import java.util.Date;

public class Process  implements ITransferObject
{
	//Fields
	private String name;
	private String description;
	private int completionsMax;
	private Date dateOfTermination;
	private boolean terminated;
	private boolean eliminated;
	private String imageUrl;
	private int id;
	
	//Getter & Setter
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getCompletionsMax() {
		return completionsMax;
	}
	public void setCompletionsMax(int completionsMax) {
		this.completionsMax = completionsMax;
	}
	public Date getDateOfTermination() {
		return dateOfTermination;
	}
	public void setDateOfTermination(Date dateOfTermination) {
		this.dateOfTermination = dateOfTermination;
	}
	public boolean isTerminated() {
		return terminated;
	}
	public void setTerminated(boolean terminated) {
		this.terminated = terminated;
	}
	public boolean isEliminated() {
		return eliminated;
	}
	public void setEliminated(boolean eliminated) {
		this.eliminated = eliminated;
	}
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
