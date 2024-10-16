import React, { useState, useMemo } from "react";
import { Table, Input, Space } from "antd";
import { useSelector } from "react-redux";

// const formsData = {
//   Fahad_Form: [
//     {
//       Name: "This is Name",
//     },
//   ],
//   Testing_Form: [
//     {
//       Age: 3254,
//       CheckBox: true,
//     },
//   ],
// };

const FormsTable = () => {
  const formsData = useSelector((state) => state.data);

  const [searchTerm, setSearchTerm] = useState("");

  const formsArray = useMemo(() => {
    return Object.keys(formsData).map((formName, index) => {
      const fieldsData = formsData[formName]
        .map((formItem) => {
          return Object.entries(formItem)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
        })
        .join(" | "); // Join all form items with a separator if there are multiple

      return {
        key: index,
        formName,
        fields: fieldsData,
      };
    });
  }, [formsData]);

  // Filter forms based on the search term
  const filteredForms = formsArray.filter((form) =>
    form.formName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for the table
  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
    {
      title: "Fields",
      dataIndex: "fields",
      key: "fields",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        placeholder="Search by form name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        columns={columns}
        dataSource={filteredForms}
        pagination={{
          pageSize: 5, // Display 5 forms per page
        }}
      />
    </Space>
  );
};

export default FormsTable;
