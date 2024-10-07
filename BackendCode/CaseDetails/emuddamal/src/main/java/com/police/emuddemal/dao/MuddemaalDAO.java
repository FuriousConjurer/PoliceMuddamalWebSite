package com.police.emuddemal.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.police.emuddamal.objects.Muddemaal;
import com.police.emuddemal.exception.MuddemalException;

@Component
public class MuddemaalDAO {

    public void insertNewMuddemaal(Muddemaal muddemaal) throws MuddemalException {
        String sql = "INSERT INTO muddemaal (serialNumber, crimeNumber, dateOfSeizure, " +
                     "muddemaalReceiptNumber, typeOfMuddemaal, description, quantity, price, presentStatus,correlationId) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        List<Muddemaal> md=getMuddemaal(muddemaal.getSerialNumber());
        if(md!=null || !md.isEmpty()) {
        	throw new MuddemalException("Serial Number Already exist");
        }
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, muddemaal.getSerialNumber());
            statement.setString(2, muddemaal.getCrimeNumber());
            statement.setDate(3, Date.valueOf(muddemaal.getDateOfSeizure()));
            statement.setString(4, muddemaal.getMuddemaalReceiptNumber());
            statement.setString(5, muddemaal.getTypeOfMuddemaal());
            statement.setString(6, muddemaal.getDescription());
            statement.setInt(7, muddemaal.getQuantity());
            statement.setDouble(8, muddemaal.getPrice());
            statement.setString(9, muddemaal.getPresentStatus());
            statement.setString(10,UUID.randomUUID().toString());
            
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void insertMuddemaal(Muddemaal muddemaal) throws MuddemalException {
        String sql = "INSERT INTO muddemaal (serialNumber, crimeNumber, dateOfSeizure, " +
                     "muddemaalReceiptNumber, typeOfMuddemaal, description, quantity, price, presentStatus,correlationId) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        List<Muddemaal> md=getMuddemaal(muddemaal.getSerialNumber());
        if(md!=null || !md.isEmpty()) {
	        for(Muddemaal mud:md) {
	        	if(mud.getPresentStatus().equalsIgnoreCase("Released")) {
	        		throw new  MuddemalException("Muddemal is release or does not exist!!");
	        	}
	        }
        }
        else {
        	throw new MuddemalException("Muddemal does not exist||");
        }
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, muddemaal.getSerialNumber());
            statement.setString(2, muddemaal.getCrimeNumber());
            statement.setDate(3, Date.valueOf(muddemaal.getDateOfSeizure()));
            statement.setString(4, muddemaal.getMuddemaalReceiptNumber());
            statement.setString(5, muddemaal.getTypeOfMuddemaal());
            statement.setString(6, muddemaal.getDescription());
            statement.setInt(7, muddemaal.getQuantity());
            statement.setDouble(8, muddemaal.getPrice());
            statement.setString(9, muddemaal.getPresentStatus());
            statement.setString(10,UUID.randomUUID().toString());
            
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Muddemaal> getMuddemaal(int serialNumber) {
    	List<Muddemaal> muddemaals = new ArrayList<>();
        String sql = "SELECT * FROM muddemaal WHERE serialNumber = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, serialNumber);
            ResultSet resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
                Muddemaal muddemaal = new Muddemaal();
                muddemaal.setSerialNumber(resultSet.getInt("serialNumber"));
                muddemaal.setCrimeNumber(resultSet.getString("crimeNumber"));
                muddemaal.setDateOfSeizure(resultSet.getDate("dateOfSeizure").toLocalDate());
                muddemaal.setMuddemaalReceiptNumber(resultSet.getString("muddemaalReceiptNumber"));
                muddemaal.setTypeOfMuddemaal(resultSet.getString("typeOfMuddemaal"));
                muddemaal.setDescription(resultSet.getString("description"));
                muddemaal.setQuantity(resultSet.getInt("quantity"));
                muddemaal.setPrice(resultSet.getDouble("price"));
                muddemaal.setPresentStatus(resultSet.getString("presentStatus"));
                muddemaal.setCorrelationId(resultSet.getString("correlationId"));
                
                muddemaals.add(muddemaal);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return muddemaals;
    }

    public List<Muddemaal> getAllMuddemaals() {
        List<Muddemaal> muddemaals = new ArrayList<>();
        String sql = "SELECT * FROM muddemaal";

        try (Connection connection = DatabaseConnection.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
             
            while (resultSet.next()) {
                Muddemaal muddemaal = new Muddemaal();
                muddemaal.setSerialNumber(resultSet.getInt("serialNumber"));
                muddemaal.setCrimeNumber(resultSet.getString("crimeNumber"));
                muddemaal.setDateOfSeizure(resultSet.getDate("dateOfSeizure").toLocalDate());
                muddemaal.setMuddemaalReceiptNumber(resultSet.getString("muddemaalReceiptNumber"));
                muddemaal.setTypeOfMuddemaal(resultSet.getString("typeOfMuddemaal"));
                muddemaal.setDescription(resultSet.getString("description"));
                muddemaal.setQuantity(resultSet.getInt("quantity"));
                muddemaal.setPrice(resultSet.getDouble("price"));
                muddemaal.setPresentStatus(resultSet.getString("presentStatus"));
                muddemaal.setCorrelationId(resultSet.getString("correlationId"));
                
                muddemaals.add(muddemaal);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return muddemaals;
    }

    public void updateMuddemaal(Muddemaal muddemaal) {
        String sql = "UPDATE muddemaal SET crimeNumber = ?, dateOfSeizure = ?, " +
                     "muddemaalReceiptNumber = ?, typeOfMuddemaal = ?, description = ?, " +
                     "quantity = ?, price = ?, presentStatus = ? WHERE serialNumber = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setString(1, muddemaal.getCrimeNumber());
            statement.setDate(2, Date.valueOf(muddemaal.getDateOfSeizure()));
            statement.setString(3, muddemaal.getMuddemaalReceiptNumber());
            statement.setString(4, muddemaal.getTypeOfMuddemaal());
            statement.setString(5, muddemaal.getDescription());
            statement.setInt(6, muddemaal.getQuantity());
            statement.setDouble(7, muddemaal.getPrice());
            statement.setString(8, muddemaal.getPresentStatus());
            statement.setInt(9, muddemaal.getSerialNumber());
            
            
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteMuddemaal(int serialNumber) {
        String sql = "DELETE FROM muddemaal WHERE serialNumber = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, serialNumber);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
