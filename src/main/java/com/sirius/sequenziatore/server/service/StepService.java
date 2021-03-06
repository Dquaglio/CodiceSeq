/*!
* \File: StepService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: StepService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione dei passi
* */
package com.sirius.sequenziatore.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.Step;
import com.sirius.sequenziatore.server.model.StepDao;

@Service
public class StepService {
	@Autowired
	private StepDao stepDao;
	//metodo che ottiene dal dao la lista di tutti i dati inviati per un dato passo
	public List<DataSent> getData(int stepId){	
		List<DataSent> dataList=stepDao.getData(stepId);
		return dataList;
	}
	public List<Step> getAllStep(int processId) {
		List<Step> stepList=new ArrayList<Step>();
		stepList=stepDao.getStespOf(processId);
		return stepList;
	}
}
