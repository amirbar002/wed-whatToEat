import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "./UserContext";

function SingIn() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [alldata, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { vacations, setvacations } = useContext(UserContext);
  const { singInPage, setsingInPage } = useContext(UserContext);
  const { navbar, setnavbar } = useContext(UserContext);
  const { value, setValue } = useContext(UserContext);
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const { username, setusername } = useContext(UserContext);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const onSubmit = (data) => {
    if (loading === true) {
      return console.log("hahahaah");
    }
    setData(data);
    setLoading(true);
  };

  useEffect(() => {
    if (!loading) return;

    const postData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8888/person/login`,
          alldata,
          config
        );
        console.log(res.data, "singin data");
        console.log(res.data.id);
        setValue(res.data.id);
        setusername(res.data.email)
        if(res.data.id === 1){
          setisAdmin(true)
          console.log('is admin');
        }
        setsingInPage(false);
        setvacations(true);
        setnavbar(true);
        return setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);

        return alert("Wrong username or password");
      }
    };

    postData();
  }, [loading]);

  return (
    <div className="divSIngIn">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  );
}

export default SingIn;
