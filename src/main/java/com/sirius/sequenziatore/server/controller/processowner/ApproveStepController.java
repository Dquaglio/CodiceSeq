package com.sirius.sequenziatore.server.controller.processowner;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.DataSent;

@Controller
@RequestMapping(value="/approvedata")
public class ApproveStepController {
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<DataSent> getStepToApprove(){
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADASDASDADS");
		 List<DataSent> ritorno=new ArrayList<DataSent>();
		 
		return ritorno;
	}
	
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	//classe che gestisce il risultato della moderazione di un passo da parte del process owner
	public void approveResponse(String a){
	}
}
