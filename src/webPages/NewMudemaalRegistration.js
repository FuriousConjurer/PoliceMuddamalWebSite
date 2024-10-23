import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Modal, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import policeLogo from '../mumbai_logo.png';
import '../cssModules/NewMudemaalRegistration.css';
import axios from 'axios'; // Make sure axios is installed and imported

const NewMudemaalRegistration = () => {
  const [formData, setFormData] = useState({
    foldNo: '',           // Changed from crimeNo
    dateOfSeizure: '',     // Changed from crimeDate
    subjectNo: '',         // Changed from muddamaalNo
    subjectType: '',       // Changed from muddamaalType, dropdown now
    details: '',
    officerName: '',
    quantity: '',          // Changed from orderNo
    price: '',             // New field for price
    presentStatusOfIssue: '',     // New field for Present Status of Issue (dropdown)
    policeStation: '',      // New field for Police Station
    reasonOfImpounding: '', // New field for "Reason of impounding the vehicle"
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval); 
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the input is quantity or price and parse it as an integer
    if (name === 'quantity') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? parseInt(value, 10) : 0, // Convert to integer or set to 0 if empty
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // For other fields, just update as is
      }));
    }
    
  };

  // Function to handle form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.foldNo) {
      newErrors.foldNo = 'Fold No is required';
    }
    if (!formData.dateOfSeizure) {
      newErrors.dateOfSeizure = 'Date of Seizure is required';
    }
    if (!formData.subjectNo) {
      newErrors.subjectNo = 'Subject No is required';
    }
    if (!formData.subjectType) {
      newErrors.subjectType = 'Subject Type is required';
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!formData.presentStatusOfIssue) {
      newErrors.presentStatusOfIssue = 'Present Status is required';
    }
    if (!formData.policeStation) {
      newErrors.policeStation = 'Police Station is required';
    }

    // New validation for the Reason of impounding
    if (formData.subjectType === "Vehicle" && !formData.reasonOfImpounding) {
      newErrors.reasonOfImpounding = 'Reason of impounding the vehicle is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const formatDateForStorage = (date) => {  
    const options = {  
      day: '2-digit',  
      month: '2-digit',  
      year: 'numeric',  
      hour: '2-digit',  
      minute: '2-digit',  
      hour12: false,  
    };  
    return new Intl.DateTimeFormat('en-GB', options).format(date);  
  };  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return; // If the form is not valid, stop here
    }

    // Add custodyDate to the formData  
    const formDataWithCustodyDate = {  
      ...formData,  
      custodyDate: formatDateForStorage(new Date()), // Add current date and time  
    }; 

    // Submit the form data to the backend
    axios.post('/api/muddamaal', formDataWithCustodyDate)
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
        navigate('/MudemaalList'); // Redirect to Mudemaal list page after successful submission
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <Container fluid>
      {/* Header */}
      <Row className="header-row align-items-center">
        <Col md={2} className="logo-container">
          <img src={policeLogo} alt="Maharastra Police Logo" className="police-logo" />
        </Col>
        <Col md={8} className="text-center title-container">
          <h1 className="website-title">Mumbai Police - Mudemaal Management</h1>
          <p className="current-time">{currentTime.toLocaleString()}</p>
        </Col>
        <Col md={1}>
          <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </Col>
      </Row>

      {/* Navigation */}
      <Nav variant="tabs" defaultActiveKey="/MudemaalRegistration" className="my-3">
        <Nav.Item>
          <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/MudemaalList" eventKey="list">Mudemaal List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/MudemaalRegistration" eventKey="register">New Mudemaal Registration</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Form */}
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="foldNo">
                  <Form.Label>Fold No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter fold number"
                    name="foldNo"
                    value={formData.foldNo}
                    onChange={handleChange}
                    isInvalid={!!errors.foldNo}
                  />
                  <Form.Control.Feedback type="invalid">{errors.foldNo}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="dateOfSeizure">
                  <Form.Label>Date of Seizure</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfSeizure"
                    value={formData.dateOfSeizure}
                    onChange={handleChange}
                    isInvalid={!!errors.dateOfSeizure}
                  />
                  <Form.Control.Feedback type="invalid">{errors.dateOfSeizure}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="subjectNo">
                  <Form.Label>Subject No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subject number"
                    name="subjectNo"
                    value={formData.subjectNo}
                    onChange={handleChange}
                    isInvalid={!!errors.subjectNo}
                  />
                  <Form.Control.Feedback type="invalid">{errors.subjectNo}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="subjectType">
                  <Form.Label>Subject Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="subjectType"
                    value={formData.subjectType}
                    onChange={handleChange}
                    className="form-select"
                    isInvalid={!!errors.subjectType}
                    aria-label="Select subject type"
                  >
                    <option value="" disabled>
                      -- Select Subject Type --
                    </option>
                    <option value="Drug and narcotics">Drug and Narcotics</option>
                    <option value="Cultural property">Cultural Property</option>
                    <option value="Currency">Currency</option>
                    <option value="Agni Shastra">Agni Shastra</option>
                    <option value="Other scriptures">Other Scriptures</option>
                    <option value="Prohibition">Prohibition</option>
                    <option value="Gold">Gold</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Non inherited issue">Non-Inherited Issue</option>
                    <option value="Counterfeit notes">Counterfeit Notes</option>
                    <option value="Mobile and electronics equipment">Mobile and Electronics Equipment</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Others">Others</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.subjectType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Conditional "Reason of impounding the vehicle" */}
            {formData.subjectType === 'Vehicle' && (
              <Row>
                <Col md={6}>
                  <Form.Group controlId="reasonOfImpounding">
                    <Form.Label>Reason of Impounding</Form.Label>
                    <Form.Control
                      as="select"
                      name="reasonOfImpounding"
                      value={formData.reasonOfImpounding}
                      onChange={handleChange}
                      className="form-select"
                      isInvalid={!!errors.reasonOfImpounding}
                      aria-label="Select reason of impounding"
                    >
                      <option value="" disabled>
                        -- Select Reason of Impounding --
                      </option>
                      <option value="None">None</option>
                      <option value="Detained">Detained</option>
                      <option value="Crime Work">Crime Work</option>
                      <option value="Stay . Dr. based on the note in">Stay . Dr. based on the note in</option>
                      <option value="Disinherited">Disinherited</option>
                      <option value="Others">Others</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.reasonOfImpounding}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              <Col md={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    isInvalid={!!errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* New Present Status of Issue Field */}
            <Form.Group controlId="presentStatusOfIssue">
              <Form.Label>Present Status of Issue</Form.Label>
              <Form.Control
                as="select"
                name="presentStatusOfIssue"
                value={formData.presentStatusOfIssue}
                onChange={handleChange}
                className="form-select"
                isInvalid={!!errors.presentStatusOfIssue}
                aria-label="Select present status"
              >
                <option value="" disabled>
                  -- Select Present Status --
                </option>
                <option value="PO Stays at">PO Stays At</option>
                <option value="Has been returned">Has Been Returned</option>
                <option value="Sent in FSL">Sent in FSL</option>
                <option value="Done in court">Done in Court</option>
                <option value="Deposited in the bank">Deposited in the Bank</option>
                <option value="Destroyed/Disposed of">Destroyed/Disposed Of</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.presentStatus}
              </Form.Control.Feedback>
            </Form.Group>


            {/* New Police Station Field */}
            <Form.Group controlId="policeStation">
              <Form.Label>Police Station</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter police station"
                name="policeStation"
                value={formData.policeStation}
                onChange={handleChange}
                isInvalid={!!errors.policeStation}
              />
              <Form.Control.Feedback type="invalid">{errors.policeStation}</Form.Control.Feedback>
            </Form.Group>

            {/* Mudemaal Details */}
            <Form.Group controlId="details">
              <Form.Label>Mudemaal Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                placeholder="Enter details"
                value={formData.details}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="officerName" className="mb-3">
              <Form.Label>Officer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter officer name"
                name="officerName"
                value={formData.officerName}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-inline-block">
              <Button variant="primary" type="submit" className="me-3">
                Submit
              </Button>
            </div>
            <div className="d-inline-block">
              <Button
                variant="secondary"
                onClick={() => navigate('/MudemaalList')}
              >
                Cancel
              </Button>
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewMudemaalRegistration;
