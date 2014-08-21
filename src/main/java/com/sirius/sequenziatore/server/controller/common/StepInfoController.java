package com.sirius.sequenziatore.server.controller.common;

import java.io.IOException;

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

import com.sirius.sequenziatore.server.model.Step;
import com.sirius.sequenziatore.server.service.StepInfoService;

@Controller
@RequestMapping(value="/step/{idstep}")
public class StepInfoController {
	
	@Autowired
	StepInfoService stepInfoService;
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public Step getStepInformation(@PathVariable int idstep){
		Step toBeReturned;
		toBeReturned=stepInfoService.retrieveStepInfo(idstep);
		if(toBeReturned!=null)
			return toBeReturned;
		throw new IllegalStateException("passo non trovato");
		
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Errore passo non trovato")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 404
	}
}
