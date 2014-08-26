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
	@Autowired
	ApproveStepService approveStepService;
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<DataSent> getStepToApprove(){
		List<DataSent> stepToBeApproved=new ArrayList<DataSent>();
		stepToBeApproved=approveStepService.getStepToBeApproved();
		if(stepToBeApproved!=null)
			return stepToBeApproved;
		throw new IllegalStateException("Passi in attesa di approvazione non trovati");
	}
	
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	//classe che gestisce il risultato della moderazione di un passo da parte del process owner
	public void approveResponse(@RequestParam String username,@RequestParam int stepId,@RequestParam boolean response){
		boolean result=approveStepService.manageResponse(username ,stepId, response);
		if(result==false){
			throw new IllegalStateException("errore nell' approvazione del passo");
		}
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Passi in attesa di approvazione non trovati")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
