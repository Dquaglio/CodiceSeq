package com.sirius.sequenziatore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.UserDao;

@Service
public class UserStepService {
	@Autowired
	StepDao stepDao;
	public boolean saveDataSent(String username,DataSent step) {
		boolean result=stepDao.completeStep(username, step);
		return result;
	}

}
