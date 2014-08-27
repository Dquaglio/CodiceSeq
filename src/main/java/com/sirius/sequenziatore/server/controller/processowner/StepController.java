package com.sirius.sequenziatore.server.controller.processowner;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.service.StepService;

@Controller
@RequestMapping(value="/stepdata/{idstep}/processowner")
public class StepController {
	StepService stepService;
	@RequestMapping(method=RequestMethod.GET,produces = "application/json")
	@ResponseBody
	public List<DataSent> getStepData(@PathVariable int idStep){
		List<DataSent> toBeReturned;
		toBeReturned=stepService.getData(idStep);
		if(toBeReturned!=null) 
			return toBeReturned;
		throw new IllegalStateException("errore nessun dato trovato");
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Dati non trovati")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
