package com.sirius.sequenziatore.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
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
}
