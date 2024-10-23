import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Tab, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Chart from 'chart.js';
import policeLogo from '../mumbai_logo.png';
import '../cssModules/Dashboard.css';
import axios from '../mockApi'; // Import the mock API

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mudemaalData, setMudemaalData] = useState([]); // State to store mudemaal data
  const [totalCost, setTotalCost] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [poStayCount, setPoStayCount] = useState(0);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [currentLocationCount, setCurrentLocationCount] = useState({});
  const [groupedReasons, setGroupedReasons] = useState([]); // New state for reason of impounding
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Fetch mudemaal data from mock API
  useEffect(() => {
    const fetchMudemaalData = async () => {
      try {
        const response = await axios.get('/api/muddamaal');
        const data = response.data;
        setMudemaalData(data);

        // Calculate total cost
        const totalCost = data.reduce((sum, item) => {
          // Parse the value, removing any non-numeric characters like ₹ or commas
          const itemValue = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
          return sum + itemValue;
        }, 0);
        setTotalCost(totalCost);

        // Count total vehicles
        const totalVehicles = data.filter(item => item.subjectType.toLowerCase().includes('vehicle')).length;
        setVehicleCount(totalVehicles);

        // Count "P.O. Stay. at" occurrences
        const poStayAtCount = data.filter(item => item.presentStatusOfIssue === 'P.O. Stay. at').length;
        setPoStayCount(poStayAtCount);

        // Consolidate categories and their quantities
        const consolidatedCategories = data.reduce((acc, item) => {
          const category = item.subjectType.toLowerCase(); // Make case-insensitive
          if (acc[category]) {
            acc[category] += item.quantity;
          } else {
            acc[category] = item.quantity;
          }
          return acc;
        }, {});

        // Convert the consolidatedCategories object to an array to be used in your table
        const groupedCategories = Object.entries(consolidatedCategories).map(([category, quantity]) => ({
          category,
          quantity,
        }));
        setGroupedCategories(groupedCategories);
        // Count occurrences of current location
        const locationCount = data.reduce((acc, item) => {
          const location = item.presentStatusOfIssue;
          acc[location] = acc[location] ? acc[location] + 1 : 1;
          return acc;
        }, {});
        setCurrentLocationCount(locationCount);
        // Group and count reasons for impounding, ignoring blank or missing values
        const reasonCounts = data.reduce((acc, item) => {
          const reason = item.reasonOfImpounding ? item.reasonOfImpounding.trim() : '';

          // Skip if reasonOfImpounding is empty or not present
          if (reason) {
            acc[reason] = (acc[reason] || 0) + 1;
          }
          return acc;
        }, {});

        setGroupedReasons(
          Object.entries(reasonCounts).map(([reason, count]) => ({
            reason,
            count,
          }))
        );

      } catch (error) {
        console.error('Error fetching mudemaal data:', error);
      }
    };
    fetchMudemaalData();
  }, []);

  // Calculate stats for the 4 boxes
  const totalIssues = mudemaalData.length;

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize chart with fetched data
  useEffect(() => {
    if (mudemaalData.length > 0) {
      const categoryCounts = mudemaalData.reduce((acc, item) => {
        acc[item.subjectType] = (acc[item.subjectType] || 0) + item.quantity; // Count by quantity
        return acc;
      }, {});

      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              data: Object.values(categoryCounts),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        },
      });
    }
  }, [mudemaalData]);

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
          <h1 className="website-title">Mumbai Police - Muddamaal Management</h1>
          <p className="current-time">{currentTime.toLocaleString()}</p>
        </Col>
        <Col md={1}>
          <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </Col>
      </Row>

      {/* Tab Navigation */}
      <Row className="nav-row my-3">
        <Col>
          <Tab.Container defaultActiveKey="Dashboard">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link as={Link} to="/Dashboard" eventKey="Dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/MudemaalList" eventKey="MudemaalList">Mudemaal List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/MudemaalRegistration" eventKey="MudemaalRegistration">New Mudemaal Registration</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              <Tab.Pane eventKey="Dashboard">
                {/* Dashboard Content */}
                <Row className="chart-section">
                  <Col md={6}>
                    <h2>Consolidated Data</h2>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="MudemaalList">
                {/* Mudemaal List Content */}
                <h2>Mudemaal List Page</h2>
              </Tab.Pane>

              <Tab.Pane eventKey="MudemaalRegistration">
                {/* Mudemaal Registration Content */}
                <h2>New Mudemaal Registration Page</h2>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      {/* Four Boxes */}
      <Row className="info-box-row text-center my-4">
        <Col md={3}>
          <div className="info-box">
            <h3>Total Issues</h3>
            <p>{totalIssues}</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="info-box">
            <h3>Total Cost</h3>
            <p>₹{totalCost}</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="info-box">
            <h3>Total Vehicles</h3>
            <p>{vehicleCount}</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="info-box">
            <h3>P.O. Stays At</h3>
            <p>{poStayCount}</p>
          </div>
        </Col>
      </Row>

      {/* Two Flex Sections */}
      <Row className="flex-section">
        {/* First Flex (2 parts) */}
        <Col md={6}>
          {/* First part (Type of Issues Table) */}
          <Row className="mb-3">
            <Col>
              <h4>Types of Issues</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedCategories.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>

          {/* Second part (2 Tables: Current Location and Reason of Impounding) */}
          <Row>
          <Col md={6}>
              <h4>Current Location of Item</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(currentLocationCount).map(([location, count], index) => (
                    <tr key={index}>
                      <td>{location}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
            <Col md={6}>
              <h4>Reason of Impounding</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Reason</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedReasons.map((item, index) => (
                    <tr key={index}>
                      <td>{item.reason}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>

        {/* Second Flex */}
        <Col md={6}>
          <h4>Category Breakdown (Chart)</h4>
          <canvas id="myChart"></canvas>
        </Col>
      </Row>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cancelLogout}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmLogout}>
            Log Out
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
