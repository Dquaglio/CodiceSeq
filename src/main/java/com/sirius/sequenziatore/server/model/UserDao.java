package com.sirius.sequenziatore.server.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;

public class UserDao implements IDataAcessObject 
{
	private JdbcTemplate jdbcTemplate; //Origine dati
		
	//Setta origine dati
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate=jdbcTemplate;
	}
	
	//Ritorna l'utente con il nome utente specificato
	public User getUser(String userName)
	{
		try
		{
			String selQuery="SELECT * FROM user where userName=?";
			ParameterizedRowMapper<User> mapper = new ParameterizedRowMapper<User>()
			{
				public User mapRow(ResultSet rs, int rowNum) throws SQLException
				{
					User user=new User();
					user.setUserName(rs.getString("userName"));
					user.setPassword(rs.getString("password"));
					user.setName(rs.getString("name"));
					user.setSurname(rs.getString("surName"));
					user.setDateOfBirth(rs.getDate("dateOfBirth"));
					user.setEmail(rs.getString("email"));
					return user;
				}
			};
			User user=jdbcTemplate.queryForObject(selQuery, mapper, new Object[] {userName});
			return user;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	//Ritorna tutti gli utenti
	public List<User> getAllUser()
	{
		try
		{
			String selQuery="SELECT * FROM user";
			List<User> users=new ArrayList<User>();
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery);
			for (Map<String, Object> row : rows)
			{
				User user=new User();
				user.setUserName((String)row.get("userName"));
				user.setPassword((String)row.get("password"));
				user.setName((String)row.get("name"));
				user.setSurname((String)row.get("surName"));
				user.setDateOfBirth((Date)row.get("dateOfBirth"));
				user.setEmail((String)row.get("email"));
				users.add(user);
			}
			return users;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}

	//Ritorna tutti gli utenti come ITransferObject
	public List<ITransferObject> getAll() 
	{
		List<ITransferObject> all=new ArrayList<ITransferObject>();
		List<User> users=getAllUser();
		for(User user:users)
		{
			all.add(user);
		}
		return all;
	}
	
	//Aggiunge l'utente passato
	public boolean insertUser(User user)
	{
		try
		{
			String inserQuery="INSERT INTO user (userName, password, name, surName, dateOfBirth, email) VALUES (?, ?, ?, ?, ?, ?);";
			Object[] params=new Object[] {user.getUserName(),user.getPassword(),user.getName(),user.getSurname(),user.getDateOfBirth(),user.getEmail()};
			jdbcTemplate.update(inserQuery, params);
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	//Aggiorna l'utente passato
	public boolean updateUser(User user)
	{
		try
		{
			String upQuery="UPDATE user SET password=?, name=?, surName=?, dateOfBirth=?, email=? WHERE userName=?";
			Object[] params=new Object[] {user.getPassword(),user.getName(),user.getSurname(),user.getDateOfBirth(),user.getEmail(),user.getUserName()};
			jdbcTemplate.update(upQuery, params);
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
}
