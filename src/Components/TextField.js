import React from "react";
import { Input, Form } from "antd";

const TextField = ({ label, name, rules, placeholder, onChange, value }) => {
  return (
    <Form.Item label={label} name={label} rules={rules}>
      <Input
        onChange={(e) => {
          onChange(label, e.target.value);
        }}
        value={value}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default TextField;
