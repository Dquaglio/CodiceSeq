/*!
* \File: UserStepService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: UserStepService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione dei passi per utenti
* */
package com.sirius.sequenziatore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.StepDao;

@Service
public class UserStepService {
	@Autowired
	StepDao stepDao;
	public boolean saveDataSent(String username,DataSent step) {
		boolean result=stepDao.completeStep(username, step);
		return result;
	}

}
