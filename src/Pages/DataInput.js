//FormData

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../Redux/dataSlice";
import { Form, Input, Button, Select } from "antd";
import DynamicFieldGenerator from "../Components/DynamicFieldsGenerator";

const { Option } = Select;

const DataInput = () => {
  const forms = useSelector((state) => state.forms);
  const [form] = Form.useForm();
  const [selectedForm, setSelectedForm] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (label, value) => {
    console.log("handleInputChange : ", label);
    setFormData({ ...formData, [label]: value });
  };

  const handleSubmit = () => {
    dispatch(addData({ formName: selectedForm, formData }));
    form.resetFields();
    setFormData({});
  };

  return (
    <Form form={form} onFinish={handleSubmit} name="dynamic_ruleEdit">
      <Form.Item label="Select Form">
        <Select
          value={selectedForm}
          onChange={(value) => setSelectedForm(value)}
        >
          {forms.map((form) => (
            <Option key={form.name} value={form.name}>
              {form.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {forms
        .find((form) => form.name === selectedForm)
        ?.fields.map((field, index) => (
          <>
            {/* <Form.Item key={index} label={field.label}> */}
            <DynamicFieldGenerator
              field={field}
              handleInputChange={handleInputChange}
            ></DynamicFieldGenerator>
          </>
        ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Data
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DataInput;
