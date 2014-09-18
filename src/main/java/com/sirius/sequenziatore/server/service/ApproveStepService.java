/*!
* \File: ApproveStepService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: ApproveStepService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: approvazione passi
* */
package com.sirius.sequenziatore.server.service;

import java.util.ArrayList;
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
		List<DataSent> stepToBeApproved=new ArrayList<DataSent>();
		stepToBeApproved=stepDao.getWaitingData();
		return stepToBeApproved;
	}
	//metodo che permette di gestire l esito della moderazione del processOwner
	public boolean manageResponse(String username,int stepId,String response){
		StepStates stepState;
		stepState=StepStates.valueOf(response);//ottengo il valore del responso del PO
		UserStep userStep=new UserStep();//dichiaro l'oggetto da salvare
		userStep.setCurrentStepId(stepId);//setto i vari campi per comporre l oggetto
		userStep.setState(stepState);
		userStep.setUser(username);
		boolean result=stepDao.updateUserStep(userStep);//aggiorno con l esito del PO
		return result;
	}
}
