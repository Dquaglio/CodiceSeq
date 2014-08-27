package com.sirius.sequenziatore.server.controller.utilities;

import java.util.List;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.model.Block;

public class ProcessWrapper {
	Process process;//processo da creare
	List<Block> blockList; //lista di blocchi di cui è composto il processo
	
	public Process getProcess() {
		return process;
	}
	public void setProcess(Process process) {
		this.process = process;
	}
	public List<Block> getBlockList() {
		return blockList;
	}
	public void setBlockList(List<Block> blockList) {
		this.blockList = blockList;
	}
}
