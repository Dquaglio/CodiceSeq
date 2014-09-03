package com.sirius.sequenziatore.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.UserStep;
import com.sirius.sequenziatore.server.model.UserStep.StepStates;

@Service
public class ApproveStepService {
	@Autowired
	private StepDao stepDao;
	//metodo che permette di ottenere la lista dei passi da approvare
	public List<DataSent> getStepToBeApproved(){
		List<DataSent> stepToBeApproved;
		stepToBeApproved=stepDao.getWaitingData();
		return stepToBeApproved;
	}
	public boolean manageResponse(String username,int stepId,boolean response){
		StepStates stepState;
		if(response==true){
			stepState=StepStates.APPROVED;
		}
		else{
			stepState=StepStates.REJECTED;
		}
		UserStep userStep=new UserStep();//dichiaro l'oggetto da salvare
		userStep.setCurrentStepId(stepId);
		userStep.setState(stepState);
		userStep.setUser(username);
		boolean result=stepDao.updateUserStep(userStep);
		return result;
	}
}
