package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.sirius.sequenziatore.server.model.NumericData;

public class NumericDataTest {

	private NumericData classprova;

	@Before
	public void setup() throws Exception {
		classprova = new NumericData();
		classprova.setDecimal(true);
		classprova.setDescription("descrizione test");
		classprova.setMaxValue(4);
		classprova.setMinValue(4);
	}

	@Test
	public final void testGetDescription() {
		// fail("Not yet implemented");
		assertEquals("testok", "descrizione test", classprova.getDescription());
	}

	@Test
	public final void testSetDescription() {
		fail("Not yet implemented");
		// metodo di set non implementato

	}

	@Test
	public final void testGetMaxValue() {
		// fail("Not yet implemented");
		assertEquals(4, classprova.getMaxValue(), 0.1);
	}

	@Test
	public final void testSetMaxValue() {
		fail("Not yet implemented");
		// metodo di set non implementato
	}

	@Test
	public final void testGetMinValue() {
		// fail("Not yet implemented");
		assertEquals(4, classprova.getMinValue(), 0.1);
	}

	@Test
	public final void testSetMinValue() {
		fail("Not yet implemented");
		// metodo di set non implementato
	}

	@Test
	public final void testIsDecimal() {
		// fail("Not yet implemented");
		assertEquals("testok", true, classprova.isDecimal());
	}

	@Test
	public final void testSetDecimal() {
		fail("Not yet implemented");
		// metodo di set non implementato
	}

}
