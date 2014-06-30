package com.sirius.sequenziatore.server.model;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public interface IDataAcessObject 
{
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate);
	public List<ITransferObject> getAll();
}
