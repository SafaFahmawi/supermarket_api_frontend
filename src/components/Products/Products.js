import React, { useState, useEffect } from "react";
import { Link, Outlet } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import './Products.css';
import { Grid, Card, CardContent, Typography, CardActionArea, CardActions, Button, Alert } from "@mui/material";
import Container from "@mui/material/Container";

function Products() {
  const [itemsets, setItemsets] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setItemsets(data.itemsets);
        // Hide the warning after 3 seconds (adjust the time as needed)
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching itemsets:', error);
        // Optionally, you can handle the error and show a different warning
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Products">
      <Sidebar />
      <div className="ProductContent">
        {/* Use MUI Alert to show a warning while the dataset is loading */}
        {showWarning && (
          <Alert severity="info" style={{ marginBottom: "15px", background: "pink", fontWeight: "bold" }}>
            Please wait while the dataset is loading...
          </Alert>
        )}
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {itemsets.map((item, index) => (
              <Grid item xs={12} sm={4} md={2} key={index}>
                <Card sx={{ maxWidth: 150 }}>
                  <CardActionArea sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" style={{ marginTop: "13px", marginBottom: "0px" }}>
                        {item}
                      </Typography>
                      {/* Additional content for each item */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: "center" }}>
                    {/* Use Link from react-router-dom to navigate to nested route */}
                    <Button
                      component={Link}
                      to={`/products/${item}/predict`}
                      variant="contained"
                      size="small"
                      color="success"
                    >
                      Predict
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      {/* Use Outlet to render nested routes */}
      <Outlet />
    </div>
  );
}

export default Products;