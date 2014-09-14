package com.sirius.sequenziatore.server.controller.user;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.UserStep;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.service.UserProcessService;

@Controller
@RequestMapping(value="/user/{username}")
public class UserProcessController {
	@Autowired
	private UserProcessService userProcessService;
	
	//metodo che permette ad un utente di iscriversi e disiscriversi da un pr
	@RequestMapping(method=RequestMethod.POST, produces = "application/json",value="/subscribe/{processId}")
	@ResponseBody
	public void processSubscribe(@RequestParam boolean subscribe,@PathVariable String username,@PathVariable int processId){
		boolean result;
		result=userProcessService.subscribeUser(subscribe, processId, username);
		if(result==false){
			throw new IllegalStateException("Errore nell' iscrizione o disiscrizione al processo");
		}
	}
	//metodo che ritorna ad un utente una lista di userstep al client, quindi tutti i passi che possono essere eseguiti dall utente
	@RequestMapping(method=RequestMethod.GET,produces="application/json",value="/subscribe/{processId}")
	@ResponseBody
	public List<UserStep> getProcessStatus(@PathVariable String username,@PathVariable int processId){
		List<UserStep> userStatus=new ArrayList<UserStep>();
		userStatus=userProcessService.retrieveUserStatus(processId, username);
		if(userStatus!=null){//se non sono stati ottenuti passi allora lancio un eccezione al client
			return userStatus;
		}
		throw new IllegalStateException("Errore nel trovare la lista");
	}
	//metodo che ritorna la lista di processi ad un utente
	@RequestMapping(method=RequestMethod.GET,produces="application/json",value="/processlist/{iscritto}")
	@ResponseBody
	public List<Process> getListProcess(@PathVariable String username,@PathVariable boolean iscritto){
		List<Process> processList=new ArrayList<Process>();
		processList=userProcessService.getProcessList(username, iscritto);
		if(processList!=null)
			return processList;
		throw new IllegalStateException("Impossibile trovare la lista di processi");
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Passi in attesa di approvazione non trovati")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
