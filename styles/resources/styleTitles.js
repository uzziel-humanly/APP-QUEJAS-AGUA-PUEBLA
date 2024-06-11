import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

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

export const TitleMine = styled(Text)`
  color: ${(props) => props.theme.Colors.bandw.mine};
`;

export const TitleGray = styled(Text)`
  color: ${(props) => props.theme.Colors.bandw.gray};
`;


