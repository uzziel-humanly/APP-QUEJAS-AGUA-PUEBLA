import React from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";


const screenWidth = Dimensions.get("window").width;

export const ButtonPrimary = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.info};
  padding-vertical: 15px;
  padding-horizontal: 10px;
  border-radius: 10px;
  width: 50%;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  flex-direction: row;
  justify-content: center;
`;


export const ButtonSecondary = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.secondary};
  padding-vertical: 15px;
  padding-horizontal: 10px;
  border-radius: 10px;
  width: 50%;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  flex-direction: row;
  justify-content: center;
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.Colors.ui.primary};
  padding: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 27px;
  text-align: left;
  margin-left: 20px;
  color: ${(props) => props.theme.Colors.ui.dark};
`;

export const NeutralButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.Colors.ui.info};
  padding-vertical: 15px;
  padding-horizontal: 10px;
  border-radius: 10px;
  width: ${screenWidth - 40}px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  flex-direction: row;
  justify-content: center;
  margin: 20px 20px 0 20px;
`;

export const TextNeutral = styled.Text`
  color: ${(props) => props.theme.Colors.ui.white};
  font-size: 16px;
  font-weight: bold;
`;