package com.sirius.sequenziatore.server.presenter.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.Step;

@Controller
@RequestMapping(value="/step/{idstep}")
public class StepInfoController {
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public Step getStepInformation(@PathVariable int idstep){
		return null;
		
	}
}
