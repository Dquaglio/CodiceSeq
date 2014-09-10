package com.sirius.sequenziatore.server.controller.processowner;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.controller.utilities.ProcessWrapper;
import com.sirius.sequenziatore.server.service.ProcessService;

@Controller
@RequestMapping(value="/process/processowner")
public class ProcessController {
	@Autowired
	ProcessService processService;
	
	//metodo che gestisce la comunicazione con il client e affida al service il salvataggio di un nuovo processo, in caso di fallimento lancia un errore 500
	@RequestMapping(method=RequestMethod.POST,consumes = "application/json", produces = "application/json")
	@ResponseBody
	public void createProcess(@RequestBody ProcessWrapper processToBeCreated){
		boolean result;
		result=processService.createProcess(processToBeCreated);
		if(result==false)
			throw new IllegalStateException("errore nella creazione del processo");
	}
	
	//gestore delle eccezioni
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR,   reason = "impossibile salvare il processo")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 500
	}

}
