package com.sirius.sequenziatore.server.presenter.processowner;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sirius.sequenziatore.server.model.DataSent;

@Controller
@RequestMapping(value="approvedata")
public class ApproveStepController {
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	public List<DataSent> getStepToApprove(){
		return null;
	}
	@RequestMapping(method=RequestMethod.POST, consumes = "application/json")
	public void approveResponse(@RequestParam(value="idStep") int idStep,@RequestParam(value="username") String username){
		
	}
}
