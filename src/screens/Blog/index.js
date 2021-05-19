import React from 'react'
import {View, FlatList} from 'react-native'
import styled from 'styled-components/native'
import Menu from 'src/components/Menu'
import Article from './Article'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      content: "abcdfdsfasdfa",
      date: "4 August 2020",
      url: "",
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      content: "abcdfdsfasdfa",
      date: "4 August 2020",
      url: "",
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      content: "abcdfdsfasdfa",
      date: "4 August 2020",
      url: "",  
    },
];
const renderItem = ({ item }) => (
  <Article 
    title={item.title} 
    content={item.content}
    date={item.date}
    url={item.url}
  />
);

const Blog = () => {
  return (
    <Container>
      <Menu title="Our Blog"/>
      <View style={{height: 20}} />
      <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
      />
    </Container>
  )
}

export default Blog
const Container = styled(View)`
  flex: 1;
`
