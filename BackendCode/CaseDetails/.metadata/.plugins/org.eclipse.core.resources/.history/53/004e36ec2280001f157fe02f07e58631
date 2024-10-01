package com.police.emuddemal.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.police.emuddamal.objects.Muddemaal;

public class MuddemaalDAO {

    public void insertMuddemaal(Muddemaal muddemaal) {
        String sql = "INSERT INTO muddemaal (serial_number, crime_number, date_of_seizure, " +
                     "muddemaal_receipt_number, type_of_muddemaal, description, quantity, price, present_status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
            
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Muddemaal getMuddemaal(int serialNumber) {
        Muddemaal muddemaal = null;
        String sql = "SELECT * FROM muddemaal WHERE serial_number = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, serialNumber);
            ResultSet resultSet = statement.executeQuery();
            
            if (resultSet.next()) {
                muddemaal = new Muddemaal();
                muddemaal.setSerialNumber(resultSet.getInt("serial_number"));
                muddemaal.setCrimeNumber(resultSet.getString("crime_number"));
                muddemaal.setDateOfSeizure(resultSet.getDate("date_of_seizure").toLocalDate());
                muddemaal.setMuddemaalReceiptNumber(resultSet.getString("muddemaal_receipt_number"));
                muddemaal.setTypeOfMuddemaal(resultSet.getString("type_of_muddemaal"));
                muddemaal.setDescription(resultSet.getString("description"));
                muddemaal.setQuantity(resultSet.getInt("quantity"));
                muddemaal.setPrice(resultSet.getDouble("price"));
                muddemaal.setPresentStatus(resultSet.getString("present_status"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return muddemaal;
    }

    public List<Muddemaal> getAllMuddemaals() {
        List<Muddemaal> muddemaals = new ArrayList<>();
        String sql = "SELECT * FROM muddemaal";

        try (Connection connection = DatabaseConnection.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
             
            while (resultSet.next()) {
                Muddemaal muddemaal = new Muddemaal();
                muddemaal.setSerialNumber(resultSet.getInt("serial_number"));
                muddemaal.setCrimeNumber(resultSet.getString("crime_number"));
                muddemaal.setDateOfSeizure(resultSet.getDate("date_of_seizure").toLocalDate());
                muddemaal.setMuddemaalReceiptNumber(resultSet.getString("muddemaal_receipt_number"));
                muddemaal.setTypeOfMuddemaal(resultSet.getString("type_of_muddemaal"));
                muddemaal.setDescription(resultSet.getString("description"));
                muddemaal.setQuantity(resultSet.getInt("quantity"));
                muddemaal.setPrice(resultSet.getDouble("price"));
                muddemaal.setPresentStatus(resultSet.getString("present_status"));
                
                muddemaals.add(muddemaal);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return muddemaals;
    }

    public void updateMuddemaal(Muddemaal muddemaal) {
        String sql = "UPDATE muddemaal SET crime_number = ?, date_of_seizure = ?, " +
                     "muddemaal_receipt_number = ?, type_of_muddemaal = ?, description = ?, " +
                     "quantity = ?, price = ?, present_status = ? WHERE serial_number = ?";

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
        String sql = "DELETE FROM muddemaal WHERE serial_number = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             
            statement.setInt(1, serialNumber);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
