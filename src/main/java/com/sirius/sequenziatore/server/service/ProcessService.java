package com.sirius.sequenziatore.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.controller.utilities.ProcessWrapper;
import com.sirius.sequenziatore.server.model.Block;
import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.Process;

@Service
public class ProcessService {
	ProcessDao processDao;
	public boolean createProcess(ProcessWrapper processWrapper){
		Process process;
		List<Block> blocks;
		process=processWrapper.getProcess();//recupero il processo
		blocks=processWrapper.getBlockList();//recupero la lista di blocchi
		boolean result=processDao.insertProcess(process, blocks);//inserisco nel database il processo e lo salvo
		return result;			
	}
}
