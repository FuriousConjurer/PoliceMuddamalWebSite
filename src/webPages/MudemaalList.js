import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Dropdown, Modal, Nav } from 'react-bootstrap';
import axios from 'axios'; // Use axios directly for API calls
import '../cssModules/MudemaalList.css'; // Import the CSS file
import policeLogo from '../mumbai_logo.png'; // Import your police logo image
import { Link, useNavigate } from 'react-router-dom';

const MudemaalList = () => {
  const [muddamaalList, setMuddamaalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false); // For handling modal
  const [selectedMuddamaal, setSelectedMuddamaal] = useState(null); // New state for selected item
  const [showDetailsModal, setShowDetailsModal] = useState(false);  // New state for details modal
  const navigate = useNavigate(); // For navigation

  // Fetch muddamaal data from the MySQL API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/muddamaal'); // Replace with your actual API URL
        setMuddamaalList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching muddamaal data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Set interval to update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval); // Clear interval on component unmount
  }, []);

  // Function to show the logout confirmation modal
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // Function to confirm the logout
  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/'); // Navigate back to login screen
  };

  // Function to cancel the logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleViewDetails = (item) => {
    setSelectedMuddamaal(item);
    setShowDetailsModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/muddamaal/${id}`);
        // Fetch the updated list from the API
        const response = await axios.get('/api/muddamaal');
        setMuddamaalList(response.data); // Set the updated list
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };
  

  const formatDate = (dateString) => {  
    const [year, month, day] = dateString.split('-');  
    return `${day}-${month}-${year}`;  
  };    

  return (
    <Container fluid>
      {/* Header Section */}
      <Row className="header-row align-items-center">
        <Col md={2} className="logo-container">
          <img src={policeLogo} alt="Maharastra Police Logo" className="police-logo" />
        </Col>
        <Col md={8} className="text-center title-container">
          <h1 className="website-title">Mumbai Police - Muddamaal Management</h1>
          <p className="current-time">{currentTime.toLocaleString()}</p>
        </Col>
        <Col md={1} className="action-buttons">
          <Button variant="danger" className="logout-btn" onClick={handleLogout}>Log Out</Button>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Nav variant="tabs" defaultActiveKey="/MudemaalList" className="my-3">
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

      {/* Action Buttons */}
      <Row className="action-buttons-row my-3">
        <Col md={9}>
          <h2>List of Muddamaal</h2>
        </Col>
      </Row>

      {/* Logout Confirmation Modal */}
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

      {/* Filters Row */}
      <Row className="filters-row my-3">
        <Col md={6}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Sort by latest
            </Dropdown.Toggle>
          </Dropdown>
        </Col>
        <Col md={6} className="text-right">
          <input type="text" placeholder="Search..." className="search-input" />
        </Col>
      </Row>

      {/* Muddamaal Table */}
      <Row>
        <Col>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <Table striped bordered hover responsive className="muddamaal-table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Fold No</th>                          {/* Changed from Crime No */}
                  <th>Date of Seizure</th>                   {/* Changed from Crime Date */}
                  <th>Subject No</th>                       {/* Changed from Muddamaal No */}
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>                            {/* New price field */}
                  <th>Present Status of Issue</th>          {/* New Present Status of Issue field */}
                  <th>Police Station</th>                    {/* New Police Station field */}
                  <th>Custody Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {muddamaalList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.foldNo}</td>                   {/* Updated field */}
                    <td>{item.dateOfSeizure}</td>            {/* Updated field */}
                    <td>{item.subjectNo}</td>                 {/* Updated field */}
                    <td className={item.subjectType === 'Other' ? 'red-label' : 'green-label'}>
                      {item.subjectType}
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>                      {/* Updated field */}
                    <td>{item.presentStatusOfIssue}</td>     {/* Updated field */}
                    <td>{item.policeStation}</td>             {/* Updated field */}
                    <td>{item.custodyDate}</td>
                    <td>
                      <div className="button-group">
                        <Button variant="info" className="action-btn" onClick={() => handleViewDetails(item)}>
                          View
                        </Button>
                        <Button variant="warning" className="action-btn">
                          Edit
                        </Button>
                        <Button variant="danger" className="action-btn" onClick={() => handleDelete(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details of Muddamaal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMuddamaal ? (
            <Table bordered responsive>
              <tbody>
                <tr>
                  <td><strong>Fold No:</strong></td>
                  <td>{selectedMuddamaal.foldNo}</td>
                </tr>
                <tr>
                  <td><strong>Date of Seizure:</strong></td>
                  <td>{formatDate(selectedMuddamaal.dateOfSeizure)}</td>
                </tr>
                <tr>
                  <td><strong>Subject No:</strong></td>
                  <td>{selectedMuddamaal.subjectNo}</td>
                </tr>
                <tr>
                  <td><strong>Category:</strong></td>
                  <td>{selectedMuddamaal.subjectType}</td>
                </tr>
                <tr>
                  <td><strong>Reason of Impounding:</strong></td>
                  <td>{selectedMuddamaal.reasonOfImpounding}</td>
                </tr>
                <tr>
                  <td><strong>Quantity:</strong></td>
                  <td>{selectedMuddamaal.quantity}</td>
                </tr>
                <tr>
                  <td><strong>Price:</strong></td>
                  <td>{selectedMuddamaal.price}</td>
                </tr>
                <tr>
                  <td><strong>Present Status of Issue:</strong></td>
                  <td>{selectedMuddamaal.presentStatusOfIssue}</td>
                </tr>
                <tr>
                  <td><strong>Police Station:</strong></td>
                  <td>{selectedMuddamaal.policeStation}</td>
                </tr>
                <tr>
                  <td><strong>Custody Date:</strong></td>
                  <td>{new Date(selectedMuddamaal.custodyDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Details:</strong></td>
                  <td>{selectedMuddamaal.details}</td>
                </tr>
                <tr>
                  <td><strong>Officer Incharge:</strong></td>
                  <td>{selectedMuddamaal.officerName}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>No details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <Row>
        <Col className="text-center">
          <p>Developed by Your Company</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MudemaalList;
