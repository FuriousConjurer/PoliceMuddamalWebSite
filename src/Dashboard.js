// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Dropdown } from 'react-bootstrap';
import axios from './mockApi'; // Import axios from mockapi.js
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [muddamaalList, setMuddamaalList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/muddamaal');
        setMuddamaalList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching muddamaal data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row className="header-row">
        <Col md={9}>
          <h1>List Of Muddamaal</h1>
        </Col>
        <Col md={3} className="text-right">
          <Button variant="success" className="add-btn">
            + Add Muddamaal
          </Button>
          <Button variant="danger" className="logout-btn">
            Log Out
          </Button>
        </Col>
      </Row>

      <Row className="filters-row">
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

      <Row>
        <Col>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <Table striped bordered hover responsive className="muddamaal-table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Crime No</th>
                  <th>Crime Date</th>
                  <th>Muddamaal No</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Custody Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {muddamaalList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.crimeNo}</td>
                    <td>{item.crimeDate}</td>
                    <td>{item.muddamaalNo}</td>
                    <td className={item.category === 'Other' ? 'red-label' : 'green-label'}>
                      {item.category}
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.value}</td>
                    <td>{item.status}</td>
                    <td>{item.custodyDate}</td>
                    <td>
                      <Button variant="info" className="action-btn">
                        View
                      </Button>
                      <Button variant="warning" className="action-btn">
                        Edit
                      </Button>
                      <Button variant="danger" className="action-btn">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <p>Developed by Your Company</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
