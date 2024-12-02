import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { transformDateToMysqlFormat } from "../../utils";

const StyledForm = styled.form`
  display: flex;
`;

const StyledInput = styled.input`
  height: 40px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;

  &:nth-child(1) {
    cursor: pointer;
  }

  &:nth-child(2) {
    width: 180px;
  }

  &:nth-child(3) {
    width: 85px;
  }

  &:hover {
    border-color: #c6d8f7;
  }
`;

const StyledSelect = styled.select`
  height: 40px;
  padding: 10px;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;
  cursor: pointer;

  &:hover {
    border-color: #c6d8f7;
  }
`;

const StyledTextarea = styled.textarea`
  height: 40px;
  width: 100%;
  margin-right: 20px;
  resize: none;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;

  &:hover {
    border-color: #c6d8f7;
  }
`;

const StyledButton = styled.button`
  background-color: #d7e4fa;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #c6d8f7;
  }
`;

const Form = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    dateTime: "",
    author: "",
    sum: "",
    category: "",
    comment: "",
  });

  // Синхронизация вводимых значений со стейтом
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Отправка данных на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      dateTime: transformDateToMysqlFormat(formData.dateTime), // Переводим из формата date пикера в формат БД
      sum: Number(formData.sum),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/transactions",
        data
      );

      alert(`Транзакция добавлена с ID: ${response.data.id}`);
      console.log(`Транзакция добавлена с ID: ${response.data.id}`);

      // Обновляем таблицу расходов, получая новые данные с сервера
      onAddTransaction();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Ошибка при добавлении транзакции");
    }

    // Очищаем форму ввода данных
    setFormData({
      dateTime: "",
      author: "",
      sum: "",
      category: "",
      comment: "",
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="date"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="text"
        placeholder="Имя Фамилия"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="number"
        placeholder="Сумма"
        name="sum"
        min="0"
        value={formData.sum}
        onChange={handleChange}
        required
      />

      <StyledSelect
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Выберите категорию
        </option>
        <option value="Продукты">Продукты</option>
        <option value="Книги">Книги</option>
        <option value="Транспорт">Транспорт</option>
      </StyledSelect>
      <StyledTextarea
        name="comment"
        placeholder="Комментарий"
        maxLength="150"
        value={formData.comment}
        onChange={handleChange}
      />

      <StyledButton type="submit">Сохранить</StyledButton>
    </StyledForm>
  );
};

export default Form;
