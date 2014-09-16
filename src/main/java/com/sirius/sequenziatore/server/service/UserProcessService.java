package com.sirius.sequenziatore.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.UserStep;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.model.UserStep.StepStates;

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
	//metodo che ritorna ottiene lo status dell utente
	public List<UserStep> retrieveUserStatus(int processId, String username){
		List<UserStep> userStatus=new ArrayList<UserStep>();
		userStatus=stepDao.userProcessSteps(username, processId);
		return userStatus;
	}
	//metodo che ottiene la lista di processi richiesta all utente
	public List<Process> getProcessList(String username,boolean iscritto){
		List<Process> processList=new ArrayList<Process>();
		if(iscritto==true)//controllo se il client mi chiede quelli a cui l utente è iscritto o meno
			processList=processDao.getProcesses(username);//ottieni tutti i processi a cui l utente è iscritto
		else
			processList=processDao.getSubscribableProcesses(username);//ottieni i processi a cui l utente non è iscritto
		return processList;//ritorno la lista corretta
		
	}
	public List<UserStep> getDataSentList(String username) {
		List<UserStep> dataSentList=new ArrayList<UserStep>();
		dataSentList=stepDao.getApprovedOrRejected(username);
		if(dataSentList!=null)
			for(int i=0;i<dataSentList.size();i++){
				UserStep toBeChecked;
				toBeChecked=dataSentList.get(i);
				if(toBeChecked.getState().equals(StepStates.APPROVED))
					//stepDao
					System.out.println("fof");
				else{
					toBeChecked.setState(StepStates.ONGOING);
					stepDao.updateUserStep(toBeChecked);
				}
			}
		return dataSentList;
	}
	
}
