import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

export const ButtonPrimary = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.primary};
  border-color: ${(props) => props.theme.Colors.ui.primary};
`;

export const ButtonSecondary = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.secondary};
  border-color: ${(props) => props.theme.Colors.ui.secondary};
`;
export const ButtonInfo = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.info};
  border-color: ${(props) => props.theme.Colors.ui.info};
`;

export const ButtonDisabled = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.disabled};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonStatusAlta = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.status.alta};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonFrench = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.pastel.french};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonPolar = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.pastel.polar};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonSandy = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.pastel.sandy};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonRomantic = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.pastel.romantic};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonMandys = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.pastel.mandys};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const ButtonMine = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.bandw.mine};
  border-color: ${(props) => props.theme.Colors.ui.disabled};
`;


