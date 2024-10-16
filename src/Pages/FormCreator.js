// //React
// import React, { useState } from "react";
// //Dispatch
// import { useDispatch } from "react-redux";
// //Redux
// import { addForm } from "../Redux/formSlice";
// //Antd
// import { Input, Button, Select, Form, Space } from "antd";
// //Constants
// import { DropDownOptions } from "../Constants/Constants";
// //Navigation
// import { useNavigate } from "react-router-dom";

// const { Option } = Select;

// const FormCreation = () => {
//   const [formName, setFormName] = useState("");
//   const [fields, setFields] = useState([DropDownOptions[0]]);
//   const dispatch = useDispatch();

//   const addField = () => {
//     setFields([...fields, DropDownOptions[0]]);
//   };

//   const removeField = () => {
//     setFields(fields.slice(0, -1));
//   };

//   const handleChange = (index, e) => {
//     const newFields = fields.map((field, i) =>
//       i === index ? { ...field, [e.target.name]: e.target.value } : field
//     );
//     setFields(newFields);
//   };

//   const handleSubmit = () => {
//     dispatch(addForm({ formName, fields }));
//     setFormName("");
//     setFields([{ type: "text", label: "" }]);
//   };

//   return (
//     <>
//       <Form>
//         <Form.Item label="Form Name">
//           <Input
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//           />
//         </Form.Item>
//         {fields?.map((field, index) => (
//           // <Space key={index} style={{ width: "100%" }}>
//           <>
//             <Form.Item>
//               <Select
//                 name="type"
//                 value={field.type}
//                 onChange={(value) => {
//                   console.log("Value:", value);
//                   handleChange(index, { target: { name: "type", value } });
//                 }}
//               >
//                 {DropDownOptions.map((option) => (
//                   <Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item>
//               <Input
//                 name="label"
//                 placeholder="Field Label"
//                 value={field.label}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </Form.Item>
//           </>
//           // </Space>
//         ))}
//         <Button type="dashed" onClick={addField}>
//           Add Field
//         </Button>
//         <Button type="dashed" onClick={removeField}>
//           Remove Field
//         </Button>
//         <Button type="primary" onClick={handleSubmit} style={{ marginLeft: 8 }}>
//           Save Form
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default FormCreation;

// src/pages/FormCreationPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addForm } from "../Redux/formSlice";
import { Button, Input, Select, Form, Row, Col } from "antd";
import { DropDownOptions } from "../Constants/Constants";

const { Option } = Select;

function FormCreation() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const dispatch = useDispatch();

  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, { type: "text", label: "" }]);
    }
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = () => {
    setFields(fields.slice(0, -1));
  };

  const handleSaveForm = () => {
    if (formName && fields.length) {
      dispatch(addForm({ name: formName, fields }));
      setFormName("");
      setFields([]);
    }
  };

  return (
    <div>
      <h2>Create a New Form</h2>
      <Form layout="vertical">
        <Form.Item label="Form Name">
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </Form.Item>
        {fields.map((field, index) => (
          <Row key={index} gutter={16}>
            <Col span={12}>
              <Form.Item label="Field Label">
                <Input
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Field Type">
                <Select
                  value={field.type}
                  onChange={(value) => handleFieldChange(index, "type", value)}
                >
                  {DropDownOptions.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Button type="dashed" onClick={removeField}>
          Remove Field
        </Button>
        <Button type="dashed" onClick={addField}>
          Add Field
        </Button>
        <Button
          type="primary"
          onClick={handleSaveForm}
          style={{ marginTop: "16px" }}
        >
          Save Form
        </Button>
      </Form>
    </div>
  );
}

export default FormCreation;
