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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.Step;
import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.service.StepService;

@Controller
@RequestMapping(value="/stepdata")
public class StepController {//classe che gestisce la comunicazione con il client per quanto riguarda 
	@Autowired
	StepService stepService;
	
	//metodo che ritorna una lista di dati inviati dagli utenti al process owner dato un certo passo
	@RequestMapping(method=RequestMethod.GET,produces = "application/json",value="/{idStep}/processowner")
	@ResponseBody
	public List<DataSent> getStepData(@PathVariable int idStep){
		List<DataSent> toBeReturned=new ArrayList<DataSent>();
		toBeReturned=stepService.getData(idStep);
		if(toBeReturned!=null) 
			return toBeReturned;
		throw new IllegalStateException("errore nessun dato trovato");
	}
	@RequestMapping(method=RequestMethod.GET,produces = "application/json",value="/allstep/{processId}")
	@ResponseBody
	public List<Step> getAllStep(@PathVariable int processId){
		List<Step> stepList=new ArrayList<Step>();
		stepList=stepService.getAllStep(processId);
		if(stepList!=null)
			return stepList;
		throw new IllegalStateException("impossibile recuperare la lista di passi");
	}
	
	//gestore delle eccezioni
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Dati non trovati")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
