package com.sirius.sequenziatore.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.UserStep;
import com.sirius.sequenziatore.server.model.UserStep.StepStates;

@Service
public class ApproveStepService {
	//metodo che permette di ottenere la lista dei passi da approvare
	public List<DataSent> getStepToBeApproved(){
		StepDao stepDao;
		List<DataSent> stepToBeApproved;
		stepToBeApproved=stepDao.getWaitingData();
		return stepToBeApproved;
	}
	public boolean manageResponse(String userId,int stepId,boolean response){
		StepDao stepDao;
		StepStates stepState;
		if(response==true){
			stepState=StepStates.APPROVED;
		}
		else{
			stepState=StepStates.REJECTED;
		}
		UserStep userStep=new UserStep(userId,stepId,stepState);
		boolean result=stepDao.updateUserStep(userStep);
		return result;
	}
}
