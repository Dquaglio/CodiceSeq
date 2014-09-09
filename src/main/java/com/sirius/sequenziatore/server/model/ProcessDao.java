package com.sirius.sequenziatore.server.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.sirius.sequenziatore.server.model.Block.BlockTypes;

@Repository
public class ProcessDao implements IDataAcessObject 
{
	private JdbcTemplate jdbcTemplate; //Origine dati

	//Setta origine dati
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate=jdbcTemplate;
	}

	public Process getProcess(int id)
	{
		try
		{
			//Dati della tabella process
			String selQuery="SELECT * FROM process where id=?";
			ParameterizedRowMapper<Process> mapper = new ParameterizedRowMapper<Process>()
			{
				public Process mapRow(ResultSet rs, int rowNum) throws SQLException
				{
					Process process=new Process();
					process.setName(rs.getString("name"));
					process.setDescription(rs.getString("description"));
					process.setCompletionsMax(rs.getInt("completionsMax"));
					process.setDateOfTermination(rs.getDate("dateOfTermination"));
					process.setTerminated(rs.getBoolean("isTerminated"));
					process.setId(rs.getInt("id"));
					process.setEliminated(rs.getBoolean("isEliminated"));
					process.setImageUrl(rs.getString("imageUrl"));					
					return process;
				}
			};
			Process process=jdbcTemplate.queryForObject(selQuery, mapper, new Object[] {id});
			return process;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<Process> getAllProcess()
	{
		try
		{
			String selQuery="SELECT * FROM process";
			List<Process> processes = new ArrayList<Process>();
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery);
			for (Map<String, Object> row : rows)
			{
				Process process=new Process();
				process.setName((String)row.get("name"));
				process.setDescription((String)row.get("description"));
				process.setCompletionsMax((int)row.get("completionsMax"));
				process.setDateOfTermination((Date)row.get("dateOfTermination"));
				process.setTerminated((boolean)row.get("isTerminated"));
				process.setEliminated((boolean) row.get("isEliminated"));
				process.setId((int)row.get("id"));
				process.setImageUrl((String) row.get("imageUrl"));
				processes.add(process);
			}
			return processes;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	//Ritorna tutti i processi come ITransferObject
	public List<ITransferObject> getAll() 
	{
		List<ITransferObject> all=new ArrayList<ITransferObject>();
		List<Process> processes=getAllProcess();
		for(Process process:processes)
		{
			all.add(process);
		}
		return all;
	}
	
	public boolean insertProcess(Process process, List<Block> blocks)
	{
		try
		{
			//Processo
			SimpleJdbcInsert sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("process").usingGeneratedKeyColumns("id");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("name", process.getName());
			params.put("description", process.getDescription());
			params.put("completionsMax", process.getCompletionsMax());
			params.put("dateOfTermination", process.getDateOfTermination());
			params.put("isTerminated", process.isTerminated());
			params.put("isEliminated", process.isEliminated());
			String imgUrl=process.getImageUrl();
			if((imgUrl==null)||(imgUrl==""))
			{
				imgUrl="Default";
			}
			params.put("imageUrl", imgUrl);
			int processId=sji.executeAndReturnKey(params).intValue();
			//Blocchi del processo
			Collections.reverse(blocks); //Dall'ultimo al primo
			sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("block").usingGeneratedKeyColumns("id");
			SimpleJdbcInsert stepsji=new SimpleJdbcInsert(jdbcTemplate).withTableName("step").usingGeneratedKeyColumns("id");
			SimpleJdbcInsert datasji=new SimpleJdbcInsert(jdbcTemplate).withTableName("data").usingGeneratedKeyColumns("id");
			SimpleJdbcInsert bondsji=new SimpleJdbcInsert(jdbcTemplate).withTableName("bond").usingGeneratedKeyColumns("id");
			int blockId=0;
			for(Block block:blocks)
			{
				params.clear();
				params.put("idProcess", processId);
				BlockTypes blockType=block.getType();
				params.put("type", blockType.toString());
				if(block.getRequiredSteps()!=0)
				{
					params.put("requiredStep", block.getRequiredSteps());
				}
				params.put("isFirst", block.isFirst());
				if(blockId!=0)
				{
					params.put("nextBlockId", blockId); //Blocco successivo precedentemente inserito
				}
				blockId = sji.executeAndReturnKey(params).intValue();
				//Passi del blocco
				List<Step> steps=block.getSteps();
				Collections.reverse(steps); //Dall'ultimo al primo
				int stepId=0;
				for(Step step:steps)
				{
					params.clear();
					params.put("idBlock", blockId);
					params.put("isFirst", step.isFirst());
					params.put("description", step.getDescription());
					if((stepId!=0)&&(blockType==Block.BlockTypes.SEQUENTIAL))
					{
						params.put("nextStepId", stepId); //Passo successivo precedentemente inserito
					}
					params.put("requiresApproval", step.requiresApproval());
					params.put("optional", step.isOptional());
					params.put("processId", processId);
					stepId=stepsji.executeAndReturnKey(params).intValue();
					//Dati e vincoli del passo
					List<NumericData> numerics=step.getNumericData();
					List<TextualData> textuals=step.getTextualData();
					List<ImageData> images=step.getImageData();
					GeographicData geographic=step.getRequiredPosition();
					int dataId=0;
					//Dati Numerici
					if(numerics!=null)
					{
						for(NumericData numeric:numerics)
						{
							params.clear();
							params.put("currentStepId", stepId);
							params.put("description", numeric.getDescription());
							params.put("type", "NUMERIC");
							dataId=datasji.executeAndReturnKey(params).intValue();
							//Vincoli dato numerico
							params.clear();
							params.put("associatedDataId", dataId);
							params.put("associatedStepId", stepId);
							params.put("type", "NUMERIC");
							params.put("isDecimal", numeric.isDecimal());
							params.put("minValue", numeric.getMinValue());
							params.put("masValue", numeric.getMaxValue());
							bondsji.execute(params);
						}
					}
					//Dati testuali
					if(textuals!=null)
					{
						for(TextualData textual:textuals)
						{
							params.clear();
							params.put("currentStepId", stepId);
							params.put("description", textual.getDescription());
							params.put("type", "TEXTUAL");
							datasji.executeAndReturnKey(params);
						}
					}
					//Dati immagine
					if(images!=null)
					{
						for(ImageData image:images)
						{
							params.clear();
							params.put("currentStepId", stepId);
							params.put("description", image.getDescription());
							params.put("type", "IMAGE");
							datasji.executeAndReturnKey(params);
						}
					}
					//Dato geografico
					if(geographic!=null)
					{
						params.clear();
						params.put("currentStepId", stepId);
						params.put("description", geographic.getDescription());
						params.put("type", "GEOGRAPHIC");
						dataId=datasji.executeAndReturnKey(params).intValue();
						//Vincoli dato geografico
						params.clear();
						params.put("associatedDataId", dataId);
						params.put("associatedStepId", stepId);
						params.put("type", "GEOGRAPHIC");
						params.put("latitude",geographic.getLatitude());
						params.put("longitude", geographic.getLongitude());
						params.put("altitude", geographic.getAltitude());
						params.put("radius", geographic.getRadius());
						bondsji.executeAndReturnKey(params);
					}
				}
			}
			//Fine
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	public boolean updateProcess(Process process)
	{
		try
		{
			String upQuery="UPDATE process SET name=?, description=?, completionsMax=?, dateOfTermination=?, isTerminated=?, isEliminated=?, imageUrl=? WHERE id=?";
			Object[] params=new Object[] {process.getName(), process.getDescription(), process.getCompletionsMax(), process.getDateOfTermination(), process.isTerminated(), process.isEliminated(), process.getImageUrl(), process.getId()};
			jdbcTemplate.update(upQuery, params);
			//Fine
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	public List<Process> getNotEliminated()
	{
		try
		{
			List<Process> notEliminated=new ArrayList<Process>();
			String selQuery="SELECT * FROM process WHERE isEliminated=0";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery);
			for (Map<String, Object> row : rows)
			{
				Process process=new Process();
				process.setName((String)row.get("name"));
				process.setDescription((String)row.get("description"));
				process.setCompletionsMax((int)row.get("completionsMax"));
				process.setDateOfTermination((Date)row.get("dateOfTermination"));
				process.setTerminated((boolean)row.get("isTerminated"));
				process.setEliminated((boolean) row.get("isEliminated"));
				process.setId((int)row.get("id"));
				process.setImageUrl((String) row.get("imageUrl"));
				notEliminated.add(process);
			}
			//Fine
			return notEliminated;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	List<Process> getProcesses(String username)
	{
		try
		{
			List<Process> processes=new ArrayList<Process>();
			String selQuery="SELECT DISTINCT p.id , p.name, p.description, p.completionsMax, p.dateOfTermination, p.isTerminated, p.isEliminated, p.id, p.imageUrl FROM process p JOIN ((userstep u JOIN step s ON u.currentStepId=s.id) JOIN block b ON s.idBlock=b.id) ON p.id=b.idProcess WHERE u.userName=?";
			Object[] params=new Object[] {username};
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, params);
			for (Map<String, Object> row : rows)
			{
				Process process=new Process();
				process.setName((String)row.get("name"));
				process.setDescription((String)row.get("description"));
				process.setCompletionsMax((int)row.get("completionsMax"));
				process.setDateOfTermination((Date)row.get("dateOfTermination"));
				process.setTerminated((boolean)row.get("isTerminated"));
				process.setEliminated((boolean) row.get("isEliminated"));
				process.setId((int)row.get("id"));
				process.setImageUrl((String) row.get("imageUrl"));
				processes.add(process);
			}
			//Fine
			return processes;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public boolean subscribe(String username, int processId)
	{
		try
		{
			//Trovare primo blocco del processo
			String selQuery="SELECT id, type FROM block WHERE isFirst=1 AND idProcess=?";
			Object[] params=new Object[] {processId};
			ParameterizedRowMapper<Block> mapper = new ParameterizedRowMapper<Block>()
			{
				public Block mapRow(ResultSet rs, int rowNum) throws SQLException
				{
					Block block=new Block();
					//Solo campi necessari
					block.setId(rs.getInt("id"));
					block.setType(BlockTypes.valueOf(rs.getString("type")));
					return block;
				}
			};
			Block firstBlock=jdbcTemplate.queryForObject(selQuery, mapper, params);
			SimpleJdbcInsert sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("userstep");
			if(firstBlock.getType()==BlockTypes.SEQUENTIAL)
			{
				//Se è sequenziale
				selQuery="SELECT id FROM step WHERE isFirst=1 AND idBlock=?";
				params=new Object[] {firstBlock.getId()};
				int firstStepId=jdbcTemplate.queryForInt(selQuery, params);
				Map<String, Object> args = new HashMap<String, Object>();
				args.put("currentStepId", firstStepId);
				args.put("userName", username);
				args.put("state","ONGOING");
				sji.execute(args);
			}
			else
			{
				//Se è non ordinato
				selQuery="SELECT id FROM step WHERE idBlock=?";
				params=new Object[] {firstBlock.getId()};
				Map<String, Object> args = new HashMap<String, Object>();
				List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, params);
				for (Map<String, Object> row : rows)
				{
					int stepId=(int)row.get("id");
					args.clear();
					args.put("currentStepId", stepId);
					args.put("userName", username);
					args.put("state","ONGOING");
					sji.execute(args);
				}
			}
			//Fine
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	public boolean unsubscribe(String username, int processId)
	{
		try
		{
			String delQuery="DELETE FROM userstep WHERE userName=? AND currentStepId IN(SELECT id FROM step WHERE processId=?)";
			jdbcTemplate.update(delQuery, new Object[]{username, processId});
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
}