/*!
* \File: ProcessController.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: ProcessController
* \Package: com.sirius.sequenziatore.server.controller.processowner
* \Brief: Gestione dell approvazione dei passi
* */
package com.sirius.sequenziatore.server.controller.processowner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.controller.utilities.ProcessWrapper;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.service.ProcessService;

@Controller
@RequestMapping(value="/process/processowner")
public class ProcessController {
	@Autowired
	ProcessService processService;
	
	//metodo che gestisce la comunicazione con il client e affida al service il salvataggio di un nuovo processo, in caso di fallimento lancia un errore 500
	@RequestMapping(method=RequestMethod.POST,consumes = "application/json", produces = "application/json")
	@ResponseBody
	public boolean createProcess(@RequestBody ProcessWrapper processToBeCreated){
		boolean result;
		result=processService.createProcess(processToBeCreated);
		if(result==false)
			throw new IllegalStateException("errore nella creazione del processo");
		return result;
	}
	
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<Process> getProcessList(){
		List<Process> processList=new ArrayList<Process>();
		processList=processService.getProcessList();
		if(processList==null)
			throw new IllegalStateException("errore nella ricerca della lista dei processi");
		return processList;
	}
	@RequestMapping(method=RequestMethod.POST, produces = "application/json",value="/terminate/{processId}")
	@ResponseBody
	public void terminateProcess(@PathVariable int processId){
		boolean result=processService.terminateProcess(processId);
		if(result==false)
			throw new IllegalStateException("errore nella terminazione del processo");
	}
	@RequestMapping(method=RequestMethod.POST, produces = "application/json",value="/delete/{processId}")
	@ResponseBody
	public void deleteProcess(@PathVariable int processId){
		boolean result=processService.deleteProcess(processId);
		if(result==false)
			throw new IllegalStateException("errore nella eliminazione del processo");
	}
	@RequestMapping(method=RequestMethod.GET, produces = "application/json",value="/userlist/{processId}")
	@ResponseBody
	public List<User> getUserList(@PathVariable int processId){
		List<User> userList=new ArrayList<User>();
		userList=processService.getUserList(processId);
		if(userList!=null){
			return userList;
		}
		throw new IllegalStateException("errore nel recuperare la lista di utenti");
	}
	//gestore delle eccezioni
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR,   reason = "impossibile salvare il processo")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 500
	}
}
