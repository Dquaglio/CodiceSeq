package com.sirius.sequenziatore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.Step;
import com.sirius.sequenziatore.server.model.StepDao;

@Service
public class StepInfoService {
	@Autowired
	StepDao stepDao;
	public Step retrieveStepInfo(int idstep){
		Step toBeReturned=stepDao.getStep(idstep);
		return toBeReturned;
	}
}
