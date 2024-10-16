import React, { useState } from "react";
import { Select, Form, Input, Space, Button } from "antd";

const { Option } = Select;

const Dropdown = ({ label, name, rules, placeholder, onChange }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value as a string
  };

  const handleAddOption = () => {
    if (inputValue && !options.some((option) => option.value === inputValue)) {
      setOptions([...options, { value: inputValue, label: inputValue }]); // Add new option to the array
      setInputValue(""); // Clear the input field after adding the option
    }
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        // onChange={(e) => {
        //   console.log("e", e);
        //   // onChange(label, e);
        // }}
        onSelect={(e) => {
          // console.log("selected:", e);
          onChange(label, e);
        }}
        placeholder={placeholder}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Space style={{ padding: 8 }}>
              <Input
                placeholder="Enter new option"
                value={inputValue}
                onChange={handleInputChange}
                style={{ flex: "auto" }}
              />
              <Button type="primary" onClick={handleAddOption}>
                Add
              </Button>
            </Space>
          </>
        )}
      >
        {options &&
          options?.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
      </Select>
      {/* <Space>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter new option"
          style={{ width: 200 }}
        />
        <Button onClick={handleAddOption} type="primary">
          Add Option
        </Button>
      </Space> */}
    </Form.Item>
  );
};

export default Dropdown;
