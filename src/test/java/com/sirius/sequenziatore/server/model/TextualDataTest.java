package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.sirius.sequenziatore.server.model.NumericData;
import com.sirius.sequenziatore.server.model.TextualData;

public class TextualDataTest {

	private TextualData classprova;

	@Before
	public void setup() {// throws Exception {
		classprova = new TextualData();
		classprova.setDescription("test descrizione");

	}

	@Test
	public final void testGetDescription() {
		// fail("Not yet implemented");
		assertEquals("testok", "test descrizione", classprova.getDescription());
	}

	@Test
	public final void testSetDescription() {
		fail("Not yet implemented");
	}

}
