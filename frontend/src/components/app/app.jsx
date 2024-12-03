import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import Container from "../container/container";
import Form from "../form/form";
import TransactionsList from "../transactionsList/transactionsList";

import "./app.css";

const StyledH1Title = styled.h1`
  margin: 0 auto;
  margin-bottom: 20px;
`;

const StyledH2Title = styled(StyledH1Title).attrs({
  as: "h2",
})``;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем список транзакций при первом рендере компонента
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Функция для получения списка транзакций с сервера
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/api/transactions"
      );
      setTransactions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке транзакций:", error);
    }
  };

  return (
    <>
      <header>
        <Container>
          <StyledH1Title>Форма ввода расходов</StyledH1Title>
          <Form onAddTransaction={fetchTransactions} />
        </Container>
      </header>
      <main>
        <Container>
          <StyledH2Title>Список транзакций</StyledH2Title>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <TransactionsList
              transactions={transactions}
              onDeleteTransaction={fetchTransactions}
            />
          )}
        </Container>
      </main>
    </>
  );
};

export default App;
