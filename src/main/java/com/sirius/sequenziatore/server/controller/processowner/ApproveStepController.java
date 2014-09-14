package com.sirius.sequenziatore.server.controller.processowner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.service.ApproveStepService;

@Controller
@RequestMapping(value="/approvedata")
public class ApproveStepController {
	@Autowired//service per gestire tutte le operazioni
	private ApproveStepService approveStepService;
	
	//metodo che ritorna tutti i passi in attesa di essere approvati
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<DataSent> getStepToApprove(){
		List<DataSent> stepToBeApproved=new ArrayList<DataSent>();//variabile che conterrà la lista di passi in attesa di approvazione
		stepToBeApproved=approveStepService.getStepToBeApproved();
		if(stepToBeApproved!=null)
			return stepToBeApproved;
		throw new IllegalStateException("Passi in attesa di approvazione non trovati");
	}
	
	//metodo che comunica con il client e affida al service l' elaborazione del passo
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void approveResponse(@RequestParam(value="username") String username,@RequestParam(value="stepId") int stepId,@RequestParam(value="state") String response){
		boolean result;//dichiaro la variabile che conterrà il risultato dell' elaborazione
		result=approveStepService.manageResponse(username ,stepId, response);
		if(result==false){//se result è false allora ci sono stati problemi nella elaborazione del passo
			throw new IllegalStateException("errore nell' approvazione del passo");//lancio eccezione
		}
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Passi in attesa di approvazione non trovati")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
