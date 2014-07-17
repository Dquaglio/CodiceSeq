package com.sirius.sequenziatore.server.presenter.utilities;

import java.util.List;

import com.sirius.sequenziatore.server.model.Block;

public class ListBlock {
	List<Block> block;
	ListBlock(){};
	public List<Block> getBlock() {
		return block;
	}

	public void setBlock(List<Block> block) {
		this.block = block;
	}
}