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

export const TitlePrimary = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.primary};
`;

export const TitleSecondary = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.secondary};
`;

export const TitleInfo = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.info};
`;

export const TitleDisabled = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.disabled};
`;

export const TitleAlta = styled(Text)`
  color: ${(props) => props.theme.Colors.ui.alta};
`;
