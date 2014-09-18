/*!
* \File: StepinfoService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: StepInfoService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione dei passi
* */
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
