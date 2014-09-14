package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

public class StepDaoTest {
	@Mock private StepDao mstep;
	private static Step stp1;
	private static Step stp2;

	@Before
	public void setup(){
		//creazione campo mockato
		MockitoAnnotations.initMocks(this);
		//creazione stp1 e stp2 per test
		Step stp1=new Step();
		stp1.setDescription("descrizione step uno");
		Step stp2=new Step();
		stp2.setDescription("descrizione step due");
		//setto oggetto di ritorno
		when(mstep.getStep(1)).thenReturn(stp1);
	} 
	@Test
	public void testGetStep() {
		//chiamata al metodo da testare
		Step result=mstep.getStep(1);
		//test
		assertEquals(result.getDescription() , "descrizione step uno");
	}

	@Test
	public void testGetAll() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetStespOf() {
		fail("Not yet implemented");
	}

	@Test
	public void testUserSteps() {
		fail("Not yet implemented");
	}

	@Test
	public void testUserProcessSteps() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateUserStep() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetDataStringInt() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetDataInt() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetProcessData() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetWaitingData() {
		fail("Not yet implemented");
	}

	@Test
	public void testCompleteStep() {
		fail("Not yet implemented");
	}

}
