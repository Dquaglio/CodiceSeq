package com.sirius.sequenziatore.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.UserStep;

@Service
public class UserProcessService {
	@Autowired
	private ProcessDao processDao;
	@Autowired
	private StepDao stepDao; 
	
	//metodo che gestisce l' iscrizione o la disiscrizione di u utente da un processo
	public boolean subscribeUser(boolean subscribe,int processId, String username){
		boolean operationResult=false;
		if(subscribe==true)
			operationResult=processDao.subscribe(username, processId);
		else
			operationResult=processDao.unsubscribe(username, processId);
		return operationResult;
	}
	public List<UserStep> retrieveUserStatus(int processId, String username){
		List<UserStep> userStatus=new ArrayList<UserStep>();
		userStatus=stepDao.userProcessSteps(username, processId);
		return userStatus;
	}
}
