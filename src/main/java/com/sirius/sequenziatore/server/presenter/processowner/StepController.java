package com.sirius.sequenziatore.server.presenter.processowner;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sirius.sequenziatore.server.model.DataSent;

@Controller
@RequestMapping(value="/stepdata/{idstep}/processowner")
public class StepController {
	@RequestMapping(method=RequestMethod.GET,produces = "application/json")
	public List<DataSent> getStepData(){
		return null;
		
	}

}
