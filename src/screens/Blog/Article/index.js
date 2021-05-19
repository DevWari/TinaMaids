import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components/native'
import {Colors} from 'src/theme'

const Article = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <DateTitle>{props.date}</DateTitle>
        <MyImage source={{uri: props.url}} />
        <Content>{props.content}</Content>
        <TouchableOpacity style={{marginTop: 15}}>
          <ButtonTitle textColor={Colors.textColor}>Read More</ButtonTitle>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 15}}>
          <ButtonTitle textColor={Colors.textColor}>Read Less</ButtonTitle>
        </TouchableOpacity>
    </Container>
  )
}
export default Article

const Container = styled(View)`
  flex: 1;
  padding-horizontal: 20px;
  margin-top: 20px;
`
const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
`
const DateTitle = styled(Text)`
  font-size: 22px;
  color: gray;
  margin-top: 15px;
`
const MyImage = styled(Image)`
  margin-top: 15px;
`
const Content = styled(Text)`
  margin-top: 15px;
  font-size: 20px;
  color: gray;
`
const ButtonTitle = styled(Text)`
  font-size: 19px;
  color: ${props=>props.textColor};
`