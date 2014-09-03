package com.sirius.sequenziatore.server.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProcessOwnerDao implements IDataAcessObject 
{
	private JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate=jdbcTemplate;
	}
	
	public ProcessOwner getProcessOwner()
	{
		try
		{
			ProcessOwner processOwner=new ProcessOwner();
			String selQuery="SELECT * FROM processowner";
			Map<String,Object> row=jdbcTemplate.queryForMap(selQuery);
			processOwner.setUserName((String)row.get("userName"));
			processOwner.setPassword((String)row.get("password"));
			return processOwner;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}

	public List<ITransferObject> getAll() 
	{
		List<ITransferObject> all=new ArrayList<ITransferObject>();
		all.add((ITransferObject)getProcessOwner());
		return all;
	}
}
