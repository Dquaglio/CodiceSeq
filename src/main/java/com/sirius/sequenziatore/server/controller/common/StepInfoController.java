/*!
* \File: StepInfoController.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: StepInfoController
* \Package: com.sirius.sequenziatore.server.controller.common
* \Brief: Gestione dei passi
*/
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
	private StepInfoService stepInfoService;
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
