package com.sirius.sequenziatore.server.model;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public class StepDao implements IDataAcessObject 
{
	private JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate=jdbcTemplate;
	}

	@Override
	public List<ITransferObject> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
