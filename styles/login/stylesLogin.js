import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

export const ButtonPrimary = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.primary};
  border-radius: 8px;
  padding-vertical: 12px;
  padding-horizontal: 24px;
  margin-bottom: 16px;
`;

export const Title = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.primary};
  font-weight: 700;
  font-size: 27px;
  text-align: center;
`;