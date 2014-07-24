package com.sirius.sequenziatore.server.controller.utilities;

import java.util.List;

import com.sirius.sequenziatore.server.model.Block;

public class ListBlock {
	List<Block> blocks;
	ListBlock(){};
	public List<Block> getBlocks() {
		return blocks;
	}

	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}
}