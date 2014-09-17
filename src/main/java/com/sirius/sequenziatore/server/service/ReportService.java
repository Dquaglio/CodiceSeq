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
