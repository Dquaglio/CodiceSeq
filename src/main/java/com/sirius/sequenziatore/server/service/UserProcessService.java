/*!
* \File: UserProcessService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: UserProcessService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione dei processi per utenti
* */
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
	//metodo che ritorna ad un utente la lista di passi approvati o non approvati dal PO
	public List<UserStep> getDataSentList(String username) {
		List<UserStep> dataSentList=new ArrayList<UserStep>();//dichiaro la lista che ritornerò
		dataSentList=stepDao.getApprovedOrRejected(username);//ottengo la lista di tutti i passi approvati o meno
		if(dataSentList!=null)
			for(int i=0;i<dataSentList.size();i++){//scorro tutta la lista
				UserStep toBeChecked;
				toBeChecked=dataSentList.get(i);//semplifico ottenendo un singolo passo
				if(toBeChecked.getState().equals(StepStates.REJECTED)){//se il passo è stato approvato
				//else{//altrimenti il passo non è stato approvato
					toBeChecked.setState(StepStates.ONGOING);//lo rimetto a ONGOING quindi è ancora da eseguire
					stepDao.updateUserStep(toBeChecked);
				}
				else {
					//stepDao.deleteUserStep(toBeChecked);//rimuovo il passo in quanto l utente vedrà che è stato approvato
				}
			}
		return dataSentList;
	}
	
}
