package com.sirius.sequenziatore.server.controller.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.UserStep;
import com.sirius.sequenziatore.server.service.UserProcessService;

@Controller
@RequestMapping(value="/user/{username}")
public class UserProcessController {
	@Autowired
	private UserProcessService userProcessService;
	@RequestMapping(method=RequestMethod.POST, produces = "application/json",value="/subscribe/{processId}")
	@ResponseBody
	public void processSubscribe(@RequestParam boolean subscribe,@PathVariable String username,@PathVariable int processId){
		boolean result;
		result=userProcessService.subscribeUser(subscribe, processId, username);
		if(result==false){
			//se c'è stato un errore lancio un eccezione al client
		}
	}
	//metodo che ritorna ad un utente una lista di userstep al client, quindi tutti i passi che possono essere eseguiti dall utente
	@RequestMapping(method=RequestMethod.GET,produces="application/json",value="/subscribe/{processId}")
	@ResponseBody
	public List<UserStep> getProcessStatus(@PathVariable String username,@PathVariable int processId){
		System.out.println("TEST AFNOAFNEAFJPF"+username+processId);
		List<UserStep> userStatus=new ArrayList<UserStep>();
		userStatus=userProcessService.retrieveUserStatus(processId, username);
		if(userStatus!=null){//se non sono stati ottenuti passi allora lancio un eccezione al client
			return userStatus;
		}
		return userStatus;//lancia l eccezione
	}
	//metodo che ritorna la lista di processi ad un utente
	@RequestMapping(method=RequestMethod.GET,produces="application/json",value="/processlist")
	@ResponseBody
	public List<Process> getListProcess(@PathVariable String username){
		List<Process> processList=new ArrayList<Process>();
		return processList;
	}
}
