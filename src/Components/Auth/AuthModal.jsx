import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import UploadFileService from "../../Services/UploadFileService";
import AuthService from "../../Services/AuthService";
import UserService from "../../Services/UserService";

const uploader = new UploadFileService();

const AuthModal = ({ isOpen, onClose }) => {
  const [signinFocused, setSigninFocused] = useState(true);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const toggleFocus = () => {
    setSigninFocused(!signinFocused);
  };

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      if (signinFocused) {
        const response = await AuthService.login(values.email, values.password);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("accessToken", response.accessToken);
        message.success("Welcome back");
        onClose();
        form.resetFields();
      } else {
        //check user exists from this username
        const exists = await UserService.checkIfUserExists(values.username);
        if (exists) {
          message.error("User already exists with this username");
          return;
        } else {
          const response = await AuthService.register(
            values.username,
            values.password
          );
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("accessToken", response.accessToken);
        }

        let imageUrl = "";
        if (values.file) {
          imageUrl = await uploader.uploadFile(
            values.file[0].originFileObj,
            "userImages"
          );
        }
        const body = {
          userId: localStorage.getItem("userId"),
          biography: values.biography,
          fitnessGoals: values.fitnessGoals,
          image: imageUrl,
          email: values.email,
        };
        await UserService.createProfile(body);
        message.success("Welcome " + values.username);
        onClose();
        form.resetFields();
      }
    } catch (err) {
      message.error("Error creating your profile");
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Sign In or Sign Up"
      open={isOpen}
      footer={null}
      onCancel={onClose}
    >
      <Form
        name="authForm"
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Username"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {!signinFocused && (
          <>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
              label="Username"
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="biography"
              rules={[
                { required: true, message: "Please input your biography!" },
              ]}
              label="Biography"
            >
              <Input placeholder="biography" />
            </Form.Item>
            <Form.Item
              name="fitnessGoals"
              rules={[
                { required: true, message: "Please input your fitness goals!" },
              ]}
              label="Fitness Goals"
            >
              <Input placeholder="Fitness Goals" />
            </Form.Item>
            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Optional: Upload an image for your profile"
            >
              <Upload.Dragger beforeUpload={() => false} multiple={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            {signinFocused ? "Sign In" : "Sign Up"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={toggleFocus}>
            {signinFocused
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
