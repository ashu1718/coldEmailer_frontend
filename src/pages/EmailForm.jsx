// EmailForm.jsx
import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Editor from "react-simple-wysiwyg";
import { Form, Input, Button, Select, Typography, message, Card, Upload, Result } from "antd";
import { MailOutlined, SendOutlined, LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import api from "../api/axios";
import msg from "../utils/toast";
const { TextArea } = Input;
const { Title } = Typography;
/* --- Animations --- */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* --- Styled Components --- */
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #eff6ff, #fff);
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 520px;
  margin: auto;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.5s ease;
  @media (max-width: 480px) {
    padding: 0.5rem;
    border-radius: 12px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 46px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.25s ease;
  background: linear-gradient(to right, #1677ff, #6ba8ff);
  border: none;
  &:hover {
    background: linear-gradient(to right, #165df7, #4f90ff);
    transform: translateY(-1px);
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 8px !important;
    min-height: 44px;
  }
`;

/* --- Main Component --- */
const EmailForm = () => {

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] =useState(false);
  const [form] =Form.useForm();
  const [resultStatus,setResultStatus] =useState("");
  const [resultTitle, setResultTitle] =useState("");
  const handleFinish = async (values) => {
    setLoading(true);
   
    let formdata=new FormData();
    const {file,...data}= values;
    
    Object.keys(data).forEach((k)=> formdata.append(k,data[k]));
    // formdata.append("data",data);
    const fileObj = file && file.length > 0 ? file[0].originFileObj : null;
    if (fileObj) {
      formdata.append("file", fileObj);
    }

    try {
      await api.post("/api/v1/cold-emailer/send-email/", 
        formdata);
        form.resetFields();
        msg.success("Mails sent successfully!");
        setResultStatus("success");
        setResultTitle("Mails sent successfully!");
        setShowResult(true);
      
    } catch (err) {
      msg.error("Failed to send Emails. Please try again later.");
      setResultStatus("error");
      setResultTitle("Failed to send Emails....");
      setShowResult(true);
     
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      {showResult ? (
        <Result
          status={resultStatus}
          title={resultTitle}
          extra={
            <Button
              onClick={() => {
                setShowResult(false);
                setResultStatus("");
                setResultTitle("");
              }}
            >
              Back to Email Form
            </Button>
          }
        />
      ) : (
        <StyledCard>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            <MailOutlined style={{ marginRight: 8, color: "#1677ff" }} />
            Send a Cold Email
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            style={{ fontSize: 15 }}
            autoComplete="off"
          >
            <Form.Item
              label="Recipients"
              name="to"
              rules={[
                {
                  required: true,
                  message: "Please enter at least one recipient",
                },
              ]}
            >
              <StyledSelect
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type an email and press Enter"
                tokenSeparators={[","]}
              />
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                { required: true, message: "Please enter the email subject" },
              ]}
            >
              <Input
                size="large"
                placeholder="e.g. Let's collaborate on a project"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item
              label="Message"
              name="body"
              rules={[
                { required: true, message: "Please enter the email content" },
              ]}
            >
              <Editor style={{ height: "150px" }}></Editor>
            </Form.Item>

            <Form.Item
              label="File"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                return Array.isArray(e) ? e : e?.fileList;
              }}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <StyledButton
                type="primary"
                htmlType="submit"
                icon={loading ? <LoadingOutlined /> : <SendOutlined />}
                loading={loading}
              >
                {loading ? "Sending..." : "Send Email"}
              </StyledButton>
            </Form.Item>
          </Form>
        </StyledCard>
      )}
    </PageWrapper>
  );
};

export default EmailForm;
