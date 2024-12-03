import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { transformDateToTableFormat } from "../../utils";

const StyledTransactionsList = styled.table`
  border-collapse: collapse;
`;

const StyledHead = styled.thead`
  tr {
    height: 45px;
    color: #b0b0b0;
  }

  th {
    font-weight: 400;
    vertical-align: middle;
    text-align: left;
    padding-left: 10px;

    &:nth-child(1) {
      width: 100px;
    }

    &:nth-child(2) {
      width: 250px;
    }

    &:nth-child(3) {
      width: 120px;
    }

    &:nth-child(4) {
      width: 150px;
    }

    &:nth-child(5) {
      width: 300px;
    }
  }
`;

const StyledList = styled.tbody``;

const StyledItem = styled.tr`
  background-color: #ffffff;
  border-bottom: 2px solid #f5f5f5;
  border-radius: 5px;

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;

    &:last-of-type {
      padding-right: 10px;
    }

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &:hover {
    background-color: #e3ecfa;
  }
`;

const StyledButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: #ffe0e0;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #f7c8c8;
  }
`;

const TransactionsList = ({ transactions, onDeleteTransaction }) => {
  // Удаление транзакции
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      onDeleteTransaction();
      alert("Транзакция успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении транзакции:", error);
      alert("Не удалось удалить транзакцию");
    }
  };

  return (
    <StyledTransactionsList>
      <StyledHead>
        <tr>
          <th>Дата</th>
          <th>Автор</th>
          <th>Сумма</th>
          <th>Категория</th>
          <th>Комментарий</th>
        </tr>
      </StyledHead>
      <StyledList>
        {transactions.map((transaction) => (
          <StyledItem key={transaction.id}>
            <td>{transformDateToTableFormat(transaction.dateTime)}</td>
            <td>{transaction.author}</td>
            <td>{transaction.sum} ₸</td>
            <td>{transaction.category}</td>
            <td>{transaction.comment}</td>
            <td>
              <StyledButton onClick={() => handleDelete(transaction.id)}>
                Удалить
              </StyledButton>
            </td>
          </StyledItem>
        ))}
      </StyledList>
    </StyledTransactionsList>
  );
};

export default TransactionsList;
