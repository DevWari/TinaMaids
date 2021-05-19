import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, Linking} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import Icon from 'react-native-vector-icons/AntDesign'
import SimpleAccordion from 'react-native-simple-accordian';
import {connect} from 'react-redux'

const sampleAccordianData = [
  {
    title: 'How soon can you guys come and clean my house?',
    content: 'If we have any available spots, we can come by and take a look at your home the same day you call or as soon as a spot is available. Once your initial appointment is done and you agree to your estimate, we can schedule your home to be cleaned as soon as possible. In a lot of cases, we can give you an estimate and clean your home the very next day.'
  },
  {
    title: 'Do I need to be home during my cleaning?',
    content: 'You don’t have to be home during your cleaning. Many clients choose to leave us with a key or a door code. If you provide us with a key, it will be returned to our office at the end of our work day, where its secured in our safe until your next appointment. We suggest you being home during your first consultation appointment, so you can meet the team and explain to us about any special requests.'
  },
  {
    title: 'What if your maids missed a spot?',
    content: 'No problem. Please notify us within 24 hours of your cleaning and we will make sure someone goes back and re-clean that area without any additional charges being added to your invoice. At the end of every cleaning, you will receive an email requesting your feedback and to rate your maids. We care about your opinion and level of satisfaction.'
  },
  {
    title: 'I have pets, how does that work?',
    content: 'We love pets! We advise to notify us prior to your appointment about your pets. We also advise that you secure them in case any of your pets are shy around new people.'
  },
  {
    title: 'Are the maids trained and/or supervised?',
    content: 'All our our maids are properly trained and observed by a supervisor or team leader prior to entering your home. Every team of maids consists of 1 maid/staff member and 1 team leader and training is a fun and ongoing activity here at Tina Maids.'
  },
  {
    title: 'Does Tina Maids employees go through a background check?',
    content: 'We offer a variety of customized cleaning services, and our trained staff pay close attention to detail to ensure excellent customer satisfaction and superior cleaning. All of our employees undergo extensive background checks and all of our employees are legally permitted to work in the United States.'
  },
  {
    title: 'What is your safety policy?',
    content: 'The safety of our employees is extremely important to us. To decrease the risk of injury to employees we are unable to move heavy objects, flip mattresses, etc. Our employees cannot touch or pick up vomit, blood, pet/human urine or excrement, including emptying/cleaning litter boxes. If an employee feels that their personal safety is in danger, and the employee must leave the job site, the client is still responsible for the full cost of the job. For more information, click here.'
  },
  {
    title: 'Are you insured? Are your maids insured when they work in my home?',
    content: 'Yes we are. All of our maids and staff members are insured by us (workers compensation) and you’re not reliable for work related injuries that might happen during a visit to your home. Your home is also insured by our limited liability insurance for any work related incidents that might occur.'
  },
  {
    title: 'Can I cancel an appointment or scheduled cleaning?',
    content: 'Yes you can. We believe in good customer service and charging a client for a job that was not started, for us, it’s not fair! If you need to reschedule or cancel your cleaning or appointment, please call us at (904) 753-9031 and we will be more than happy to assist you.'
  },
  {
    title: 'Do you offer gift certificates?',
    content: 'We offer gift certificates and credit. This is a great idea for friends and family for any occasion! Let them take a break from cleaning. Click here to get started!'
  },
  {
    title: 'What is your policy for one time cleanings and first time clients?',
    content: 'If you are a new client or if you need a one-time cleaning, we require a credit/debit card on file or if you wish to pay by cash or check, the total amount is due upon arrival and prior to the start of your cleaning. If you are paying using a saved credit/debit card on file, then the amount due will be charged immediately at the end of your cleaning.'
  },
  {
    title: 'How can I pay for your services?',
    content: 'We accept credit/debit cards, checks, and cash. Please note, if you are paying with a check or cash, payment is due at the time of arrival. If no cash or check is provided at the time of arrival we cannot start the cleaning. If you have a credit/debit card on file prior to your appointment, your card will be charged immediately after the cleaning is completed.'
  },
  {
    title: 'Do you switch maids every cleaning? Is it the same maid every time?',
    content: 'We like to build a good and long lasting relationship with all our clients. We believe that sending the same maids to your home will help build that relationship.'
  },
  {
    title: 'How many maids will come to my home?',
    content: 'We work in teams of 2 maids per job, however, some jobs will require a larger number of staff.'
  },
  {
    title: 'Do you bring your own materials and tools?',
    content: 'Yes we do. All products used by us in our services are provided by us. We also use our own equipment and tools such as mops, vacuums, dusters, steam machines and others.'
  },
  {
    title: 'How do you price your services? Can I pay by the hour?',
    content: 'We base our prices on a “per-job” basis and not by the hour. Many factors go into pricing a job, such as clutter, pets, the size of your home, cleaning frequency and distance.'
  },
  {
    title: 'Can I get a price/quote over the phone?',
    content: 'We may be able to give you a very wide range that takes into account all the possibilities of cleaning your home, however, to give you a final price, we like to meet you at your home before sending you a formal estimate. Every home is different, and we price our services based on clutter, pets, home size and distance.'
  },
];
const Support = (props) => {

  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if (!props.token) navigate('LoginScreen')
  },[])
  
  function renderHeader(section, i, isOpen) {
    return (
      <HeaderContainer>
        <HeaderContent>{section.title}</HeaderContent>
        <Icon name="right" style={{marginTop: 5}}/>
      </HeaderContainer>
    );
  }
 
  function renderContent(section, i, isOpen) {
    return (
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Text>{section.content}</Text>
      </View>
    );
  }
  function onChangeAccordian(section) {
    setOpen(section)
  }
  function openDialScreen () {
    let number = '';
      if (Platform.OS === 'ios') {
        number = 'telprompt:${18664962437}';
      }
      else {
        number = 'tel:${18664962437}'; 
      }
      Linking.openURL(number);
  }
  return (
    <ScrollView>
        <Container>      
          <Menu title="Get Help"/>
          <Image 
            source={require('src/assets/img/support/support.png')} 
            style={{width: '100%'}}  
            resizeMode="stretch"
          />
          <Separator />
          <Title>Call Us(Mon-Fri 9am-5pm EST)</Title>
          <TouchableOpacity 
            onPress={openDialScreen}
          >
            <Description textColor={Colors.textColor}>1(866) 49MAIDS</Description>
          </TouchableOpacity>
          <SpeakerButton 
            bgColor={Colors.textColor}
            onPress={()=>navigate('SpeakScreen')}
          >
            <Image source={require('src/assets/img/support/speaker.png')} />
            <ButtonTitle>I need to speak to someone</ButtonTitle>
          </SpeakerButton>
          <CalendarButton 
            bgColor={Colors.textColor}
            onPress={()=>navigate('MyEstimate')}
          >
            <Image source={require('src/assets/img/support/calendar.png')} />
            <ButtonTitle>I want to book a cleaning</ButtonTitle>
          </CalendarButton>
          <Content>You can also browse through our Frequently Asked Questions </Content>
          <ScrollView style={{marginTop: 20}}>    
            <SimpleAccordion
              style= {{
                borderWidth: .3,
                borderColor: 'gray',
                margin:10,
                marginRight: 20,
                marginLeft: 12,
                padding:10,
                backgroundColor: '#f5f5f5'
              }}
              activeSection={open}
              sections={sampleAccordianData}
              touchableComponent={TouchableOpacity}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={500}
              onChange={section => onChangeAccordian(section)}
            />
          </ScrollView>
          
          <Footer />
        </Container>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
  };
};

export default connect(mapStateToProps, null)(Support);

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Separator = styled(View)`
  width: 90%;
  height: 50px;
  border-bottom-width: 1px;
  border-color: grey;
`;
const Title = styled(Text)`
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
`;
const Description = styled(Text)`
  font-size: 25px;
  margin-top: 20px;
  color: ${props=>props.textColor};
  text-align: center;
`;
const SpeakerButton = styled(TouchableOpacity)`
  width: 90%;
  height: 50px;
  background-color: ${props=>props.bgColor};
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`
const CalendarButton = styled(TouchableOpacity)`
  width: 85%;
  height: 50px;
  background-color: ${props=>props.bgColor};
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`
const ButtonTitle = styled(Text)`
  font-size: 20px;
  color: white;
  text-align: center;
  margin-left: 10px;
  font-weight: 700;
`
const Content = styled(Text)`
  font-size: 16px;
  color: grey;
  text-align: center;
  margin-top: 30px;
`
const Footer = styled(View)`
 height: 20px;
`
const HeaderContainer = styled(View)`
  
  flex-direction: row;
  justify-content: space-between;
`
const HeaderContent = styled (Text)`
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
  
`
