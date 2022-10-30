import { classes } from "@/lib/helpers/common";
import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Container = styled.div`
  .switch {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .switch-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100px;
    height: 50px;
    background: grey;
    border-radius: 100px;
    position: relative;
    transition: background-color 0.2s;
  }

  .switch-container .switch-btn {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }

  .switch:checked + .switch-container .switch-btn {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .switch-container:active .switch-btn {
    width: 60px;
  }
`;

export default function Switch(props: Props) {
  const { checked, onChange, className, ...rest } = props;

  return (
    <Container className="flex items-center">
      <input
        type="checkbox"
        className={classes("switch h-5 w-9 rounded-full bg-gray-300", className)}
        checked={checked}
        onChange={onChange}
      />
      <div className="switch-container">
        <div className="switch-btn"></div>
      </div>
    </Container>
  );
}
