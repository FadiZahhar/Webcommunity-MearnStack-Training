import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const CPassword = ({ password, onChange, label, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormGroup>
      <Label htmlFor="password">{label ? label : "Password"}</Label>
      <div
        style={{ position: "relative" }}
        className="d-flex align-items-center"
      >
        <Input
          id={name ? name : "password"}
          type={showPassword ? "text" : "password"}
          name={name ? name : "password"}
          value={password}
          onChange={onChange}
          required
          className="bg-dark text-white"
        />
        <Button
          style={{
            position: "absolute",
            right: ".1rem",
          }}
          color="link"
          className="text-white ml-2"
          onClick={(event) => {
            event.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          <i className={`fa${showPassword ? "s" : "r"} fa-eye`}></i>
        </Button>
      </div>
    </FormGroup>
  );
};

export default CPassword;
