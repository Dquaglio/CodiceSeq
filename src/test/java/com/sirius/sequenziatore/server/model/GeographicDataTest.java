package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class GeographicDataTest {

	private GeographicData classprova;

	@Before
	public void setup() throws Exception {
		classprova = new GeographicData();
		classprova.setAltitude(2);
		classprova.setDescription("prova");
		classprova.setLatitude(2);
		classprova.setLongitude(2);
		classprova.setRadius(2);
	}

	@Test
	public final void testGetDescription() {
		assertEquals("testok", "prova", classprova.getDescription());
	}

	@Test
	public final void testGetLatitude() {
		assertEquals("testok", 2, classprova.getLatitude(), 0.1);
	}

	@Test
	public final void testGetLongitude() {
		assertEquals("testok", 2, classprova.getLatitude(), 0.1);
	}

	@Test
	public final void testGetAltitude() {
		assertEquals("testok", 2, classprova.getAltitude(), 0.1);
	}

	@Test
	public final void testGetRadius() {
		assertEquals("testok", 2, classprova.getRadius(), 0.1);
	}
}
