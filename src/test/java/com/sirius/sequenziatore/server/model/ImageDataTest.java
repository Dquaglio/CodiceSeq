package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.sirius.sequenziatore.server.model.ImageData;
import com.sirius.sequenziatore.server.model.NumericData;

public class ImageDataTest {
	private ImageData classprova;

	@Before
	public void setup() throws Exception {
		classprova = new ImageData();
		classprova.setDescription("prova");
	}

	@Test
	public final void testGetDescription() {
		// fail("Not yet implemented");
		assertEquals("testok", "prova", classprova.getDescription());
	}

	@Test
	public final void testSetDescription() {
		fail("Not yet implemented");
	}

}
