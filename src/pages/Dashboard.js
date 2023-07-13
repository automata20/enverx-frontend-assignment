/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import VisualChart from 'components/VisualChart';
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useSelector } from 'react-redux';

import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { type } from '@testing-library/user-event/dist/type';
import { db } from '../firebase.config';

function Dashboard() {
  const transactionsCollectionRef = collection(db, 'transactions');

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);

  const [transactions, setTransactions] = useState(null);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [data, setData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('INCOME');
  const [comment, setComment] = useState('');

  const totalBalance = income + expenses;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInput2Change = (e) => {
    setComment(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getTransactionsList = () => {
    getDocs(transactionsCollectionRef)
      .then((res) => {
        const filteredData = res.docs.map((d) => ({ ...d.data(), id: d.id }));
        console.log(filteredData);
        setTransactions(filteredData);
        let inc = 0;
        let e = 0;
        filteredData.forEach((i) => {
          console.log(i);
          if (i.type === 'INCOME') {
            inc += parseInt(i.amount, 10);
          }

          if (i.type === 'EXPENSE') {
            e += parseInt(i.amount, 10);
          }
          setIncome(inc);
          setExpenses(e);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmitTransaction = (d) => {
    addDoc(transactionsCollectionRef, d)
      .then((res) => {
        console.log(res);
        getTransactionsList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTransaction = async (id) => {
    const transactionDoc = doc(db, 'transactions', id);
    deleteDoc(transactionDoc)
      .then((res) => {
        console.log(res);
        getTransactionsList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateTransaction = async (id, d) => {
    const transactionDoc = doc(db, 'transactions', id);
    updateDoc(transactionDoc, d)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted with value:', inputValue, selectedOption, comment);

    const a = {
      amount: parseInt(inputValue, 10),
      category: comment,
      created_at: Date.now(),
      type: selectedOption,
      userId: user.uid
    };

    onSubmitTransaction(a);
  };

  useEffect(() => {
    getTransactionsList();
  }, []);

  useEffect(() => {
    setData({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Amount ₹',
          data: [income, expenses],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }
      ]
    });
  }, [income, expenses]);

  return (
    <>
      <h1>Enverx Expense Tracker</h1>
      {user && isLoggedIn === true ? (
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Box display="flex" gap={2}>
                  <Card variant="outlined" sx={{ width: 200, backgroundColor: '#e6f7ff' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Income
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹ {income}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ width: 200, backgroundColor: '#ffe6e6' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Expenses
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹ {expenses}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ width: 200, backgroundColor: '#f5f5f5' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Total Balance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹ {totalBalance}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <InputLabel>Note: Use "-" for expenses.</InputLabel>
                    <Box display="flex" alignItems="center" gap={2}>
                      <TextField
                        label="Amount"
                        value={inputValue}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                      <Select
                        labelId="select-label"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        label="Select an option"
                        size="small"
                      >
                        <MenuItem value="INCOME">Income</MenuItem>
                        <MenuItem value="EXPENSE">Expense</MenuItem>
                      </Select>
                      <TextField
                        label="Comment"
                        value={comment}
                        onChange={handleInput2Change}
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                        sx={{ marginLeft: '10px', height: '100%' }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </form>
                </Box>
                {transactions.length != null && (
                  <Box>
                    <div>
                      {transactions.map((card, index) => (
                        <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              ₹ {card.amount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {card.category}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" onClick={() => deleteTransaction(card.id)}>
                              DELETE
                            </Button>
                          </CardActions>
                        </Card>
                      ))}
                    </div>
                  </Box>
                )}
              </Grid>
              <Grid xs={2}>{Object.keys(data).length > 0 && <VisualChart data={data} />}</Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <p>Sign in with google to use this app</p>
      )}
    </>
  );
}

export default Dashboard;
