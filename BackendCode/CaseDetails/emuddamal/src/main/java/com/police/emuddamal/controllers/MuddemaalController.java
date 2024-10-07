package com.police.emuddamal.controllers;

import com.police.emuddemal.dao.MuddemaalDAO;
import com.police.emuddamal.objects.Muddemaal;
import com.police.emuddamal.objects.MuddemalResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/muddemaal")
public class MuddemaalController {

    private final MuddemaalDAO muddemaalDAO = new MuddemaalDAO();
    

    // Get all muddemaal items
    @GetMapping
    public ResponseEntity<List<Muddemaal>> getAllMuddemaals() {
    	
        MuddemalResponse res=new MuddemalResponse();
    	List<Muddemaal> muddemaals = muddemaalDAO.getAllMuddemaals();
        res.setSuccess(true);
        res.setResponseMessage("");
        res.setBody(null);
        return ResponseEntity.ok(muddemaals);
    }

    // Get muddemaal by serial number
    @GetMapping("/{serialNumber}")
    public ResponseEntity<List<List<Muddemaal>>> getMuddemaalBySerialNumber(@PathVariable int serialNumber) {
        List<Muddemaal> muddemaal = muddemaalDAO.getMuddemaal(serialNumber);
        
        if (muddemaal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            // Returning the item wrapped in a list for uniform response type
            return ResponseEntity.ok(List.of(muddemaal));
        }
    }

    // Create a new muddemaal
    @PostMapping("/createnew")
    public ResponseEntity<Muddemaal> createMuddemaal(@RequestBody Muddemaal muddemaal) {
        try{muddemaalDAO.insertNewMuddemaal(muddemaal);}
        catch (Exception e) {
        	
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(muddemaal);
    }
    @PostMapping("/createMuddemalEntry")
    public ResponseEntity<Muddemaal> createMuddemalEntry(@RequestBody Muddemaal muddemaal) {
        try{muddemaalDAO.insertNewMuddemaal(muddemaal);}
        catch (Exception e) {
        	
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(muddemaal);
    }
    // Update a muddemaal by serial number
    @PutMapping("/{serialNumber}")
    public ResponseEntity<Muddemaal> updateMuddemaal(@PathVariable int serialNumber, @RequestBody Muddemaal muddemaal) {
        List<Muddemaal> existingMuddemaal = muddemaalDAO.getMuddemaal(serialNumber);
        if (existingMuddemaal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        muddemaal.setSerialNumber(serialNumber); // Ensure serialNumber matches
        muddemaalDAO.updateMuddemaal(muddemaal);
        return ResponseEntity.ok(muddemaal);
    }

    // Delete a muddemaal by serial number
    @DeleteMapping("/{serialNumber}")
    public ResponseEntity<Void> deleteMuddemaal(@PathVariable int serialNumber) {
        List<Muddemaal> existingMuddemaal = muddemaalDAO.getMuddemaal(serialNumber);
        if (existingMuddemaal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        muddemaalDAO.deleteMuddemaal(serialNumber);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
