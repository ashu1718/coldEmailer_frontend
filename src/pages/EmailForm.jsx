import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import api from "../api/axios"; // axios instance with interceptors

const EmailForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/v1/cold-emailer/send-email/",
        values
      );
      message.success("Email sent successfully!");
      console.log("Email result:", response.data);
    } catch (err) {
      console.error("Error sending email:", err);
      message.error("Failed to send the email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Send a Cold Email</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Recipients"
          name="to"
          rules={[
            { required: true, message: "Please enter at least one email" },
          ]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter email and press Enter"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Message"
          name="body"
          rules={[{ required: true, message: "Please enter the email body" }]}
        >
          <Input.TextArea rows={6} placeholder="Write your message..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EmailForm;
