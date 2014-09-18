/*!
* \File: ReportService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: ReportService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione report
* */
package com.sirius.sequenziatore.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.StepDao;

@Service
public class ReportService {
	@Autowired
	StepDao stepDao;
	public List<DataSent> getReportData(String username, int idprocess) {
		List<DataSent> dataList=new ArrayList<DataSent>();
		dataList=stepDao.getProcessData(username, idprocess);
		return dataList;
	}

}
